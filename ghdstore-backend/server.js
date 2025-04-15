require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const fs = require('fs');

// المسار الكامل للمجلد uploads
const uploadDir = path.join(__dirname, 'uploads');

// تحقق مما إذا كان المجلد موجودًا
if (!fs.existsSync(uploadDir)) {
  // إذا لم يكن موجودًا، أنشئه
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('تم إنشاء مجلد uploads');
} else {
  console.log('مجلد uploads موجود');
}


const app = express();
const port = process.env.PORT || 5000;

// إعداد الاتصال بقاعدة البيانات
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD || 'Ahmed2005',
  database: 'ghdstore'
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// إعداد الـ middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إعداد Multer لتخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage:storage});

// Routes

// تسجيل المستخدمين
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Error saving user" });
      }
      res.status(201).json({ message: "User created successfully" });
    });
  });
});

// تسجيل الدخول
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching user" });
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Error comparing passwords" });
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
      
      res.json({ 
        message: "Login successful", 
        success: true, 
        user: { id: user.id, username: user.username } 
      });
    });
  });
});

// جلب المنتجات
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching products' });
    // تعديل الرابط الكامل للصورة إذا كانت موجودة
    const products = results.map(product => ({
      ...product,
      image: product.image ? `${req.protocol}://${req.get('host')}/uploads/${product.image}` : null
    }));
    res.json(products);
  });
});

// إضافة منتج
app.post('/products', upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.filename : null;

  const query = "INSERT INTO products (name, description, image, price) VALUES (?, ?, ?, ?)";
  
  db.query(query, [name, description, image, price], (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding product" });
    res.status(201).json({ message: "Product added successfully" });
  });
});

// تعديل منتج
app.put('/products/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const image = req.file ? req.file.filename : null;

  let query = "";
  let values = [];

  if (image) {
    query = "UPDATE products SET name = ?, description = ?, image = ?, price = ? WHERE id = ?";
    values = [name, description, image, price, id];
  } else {
    query = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
    values = [name, description, price, id];
  }

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating product" });
    res.json({ message: "Product updated successfully" });
  });
});

// حذف منتج
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting product" });
    res.json({ message: "Product deleted successfully" });
  });
});

// عملية الشراء (Checkout)
app.post('/checkout', (req, res) => {
  const { userId, products, totalPrice, address, paymentMethod } = req.body;

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ message: 'Transaction error' });

    const orderQuery = `
      INSERT INTO orders (user_id, total_price, address, payment_method)
      VALUES (?, ?, ?, ?)
    `;
    db.query(orderQuery, [userId, totalPrice, address, paymentMethod], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ message: 'Error saving order' });
        });
      }

      const orderId = result.insertId;
      const itemsQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ?
      `;
      const itemsData = products.map(p => [orderId, p.id, p.quantity, p.price]);

      db.query(itemsQuery, [itemsData], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ message: 'Error saving order items' });
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ message: 'Transaction commit error' });
            });
          }
          res.status(201).json({ message: 'Order created successfully' });
        });
      });
    });
  });
});

// ======= Endpoints لسلة المشتريات (Cart) =======

// إضافة عنصر إلى سلة المشتريات
router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.execute(`
      SELECT c.id, p.id AS productId, p.name, p.price, p.image, c.quantity
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ في جلب السلة" });
  }
});

// إضافة منتج للسلة
router.post('/cart', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // التحقق إذا كان المنتج موجود مسبقاً
    const [existing] = await db.execute(`
      SELECT * FROM cart WHERE user_id = ? AND product_id = ?
    `, [userId, productId]);

    if (existing.length > 0) {
      await db.execute(`
        UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?
      `, [userId, productId]);
    } else {
      await db.execute(`
        INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)
      `, [userId, productId]);
    }

    res.json({ message: "تمت الإضافة إلى السلة" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "فشل في الإضافة إلى السلة" });
  }
});

// إزالة منتج من السلة
router.delete('/cart', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    await db.execute(`
      DELETE FROM cart WHERE user_id = ? AND product_id = ?
    `, [userId, productId]);

    res.json({ message: "تم الحذف من السلة" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ أثناء الحذف" });
  }
});

module.exports = router;

// جلب سلة المشتريات لمستخدم معين
app.get("/cart/:user_id", (req, res) => {
  const { user_id } = req.params;
  const query = "SELECT * FROM cart WHERE user_id = ?";
  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching cart" });
    res.json(results);
  });
});

// حذف عنصر من سلة المشتريات
app.delete("/cart/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM cart WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting cart item" });
    res.json({ message: "Item removed from cart successfully" });
  });
});



// تشغيل الخادم
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
