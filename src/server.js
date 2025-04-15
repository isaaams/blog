const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

// إعداد اتصال قاعدة البيانات
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce',
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ متصل بقاعدة البيانات');
});

// مسار تسجيل المستخدم
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ message: 'خطأ في التسجيل' });
    res.json({ message: 'تم التسجيل بنجاح' });
  });
});

app.listen(5000, () => console.log('🚀 السيرفر يعمل على المنفذ 5000'));
