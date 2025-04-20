import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "./Footer";

const AjouterProduit = () => {
  const [produits, setProduits] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', image: null, price: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProduits();
  }, []);

  // جلب المنتجات من الـ API
  const fetchProduits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProduits(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits', error);
    }
  };

  // تغيير حالة النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // التعامل مع ملف الصورة
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // إرسال النموذج (إضافة أو تعديل)
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   data.append('name', formData.name);
  //   data.append('description', formData.description);
  //   data.append('image', formData.image);
  //   data.append('price', formData.price);

  //   try {
  //     if (editingId) {
  //       // تعديل منتج موجود
  //       await axios.put(`http://localhost:5000/products/${editingId}`, data, {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       });
  //     } else {
  //       // إضافة منتج جديد
  //       await axios.post('http://localhost:5000/products', data, {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       });
  //     }

  //     // إعادة تعيين النموذج وتحديث القائمة
  //     setFormData({ name: '', description: '', image: null, price: '' });
  //     setEditingId(null);
  //     fetchProduits();
  //   } catch (error) {
  //     console.error("Erreur lors de l'ajout ou de la modification", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    
    // إضافة الصورة فقط إذا كانت موجودة
    if (formData.image) {
      data.append('image', formData.image);
    }
  
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/products/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:5000/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
  
      setFormData({ name: '', description: '', image: null, price: '' });
      setEditingId(null);
      fetchProduits();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification", error);
    }
  };

  // تعبئة النموذج للتعديل
  const handleEdit = (produit) => {
    setFormData({
      name: produit.name,
      description: produit.description,
      image: null, // المستخدم يختار صورة جديدة إذا بغى يبدلها
      price: produit.price,
    });
    setEditingId(produit.id);
  };

  // حذف منتج
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProduits();
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  return (
    <>
    <div className="container mt-4">
      <h2>Gestion des Produits</h2>

      <form onSubmit={handleSubmit} className="mb-3" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
  type="file"
  name="image"
  accept="image/*"
  onChange={handleFileChange}
  className="form-control mb-2"
  required={!editingId} // مطلوب فقط عند الإضافة
/>
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={formData.price}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-success">
          {editingId ? 'Modifier' : 'Ajouter'}
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Image</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td>{produit.name}</td>
              <td>{produit.description}</td>
              <td>
  {produit.image && (
    <img
      src={`http://localhost:5000/${produit.image}`} // إضافة المسار الكامل للصورة
      alt={produit.name}
      style={{ width: '50px' }}
    />
  )}
</td>
              <td>{produit.price} €</td>
              <td>
                <button
                  onClick={() => handleEdit(produit)}
                  className="btn btn-warning me-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(produit.id)}
                  className="btn btn-danger"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
};

export default AjouterProduit;
