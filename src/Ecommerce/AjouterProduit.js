import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AjouterProduit = () => {
  const [produits, setProduits] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', image: '', price: '' });
  const [editingId, setEditingId] = useState(null);

  // جلب المنتجات عند تحميل المكون
  useEffect(() => {
    fetchProduits();
  }, []);

  // دالة لجلب المنتجات من الـ API
  const fetchProduits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProduits(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits', error);
    }
  };

  // دالة لتحديث حالة النموذج عند تغيير الحقول
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // دالة لإرسال النموذج (إضافة أو تعديل منتج)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // إذا كان هناك منتج يتم تعديله، قم بتحديثه
        await axios.put(`http://localhost:5000/products/${editingId}`, formData);
      } else {
        // إذا لم يكن هناك منتج يتم تعديله، قم بإضافة منتج جديد
        await axios.post('http://localhost:5000/products', formData);
      }
      // إعادة تعيين النموذج وجلب المنتجات المحدثة
      setFormData({ name: '', description: '', image: '', price: '' });
      setEditingId(null);
      fetchProduits();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification", error);
    }
  };

  // دالة لتعبئة النموذج ببيانات المنتج المحدد للتعديل
  const handleEdit = (produit) => {
    setFormData(produit);
    setEditingId(produit.id);
  };

  // دالة لحذف منتج
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProduits();
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestion des Produits</h2>
      
      {/* نموذج إضافة/تعديل منتج */}
      <form onSubmit={handleSubmit} className="mb-3">
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
          type="text"
          name="image"
          placeholder="URL de l'image"
          value={formData.image}
          onChange={handleChange}
          className="form-control mb-2"
          required
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

      {/* جدول عرض المنتجات */}
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
                <img src={produit.image} alt={produit.name} style={{ width: '50px' }} />
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
  );
};

export default AjouterProduit;