import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  // جلب الطلبات عند تحميل المكون
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('خطأ في جلب الطلبات:', error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('خطأ في حذف الطلب:', error);
    }
  };

  const handleEdit = (orderId) => {
    // تنفيذ منطق التعديل هنا، مثل فتح نموذج تعديل
    console.log('تعديل الطلب:', orderId);
  };

  return (
    <div className="container mt-4">
      <h2>قائمة الطلبات</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>المستخدم</th>
            <th>المنتجات</th>
            <th>السعر الإجمالي</th>
            <th>العنوان</th>
            <th>طريقة الدفع</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>
                <ul>
                  {JSON.parse(order.products).map((product, index) => (
                    <li key={index}>{product.name} × {product.quantity}</li>
                  ))}
                </ul>
              </td>
              <td>{order.total_price} DH</td>
              <td>{order.address}</td>
              <td>{order.payment_method}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(order.id)}>تعديل</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(order.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
