// GroceryListView.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios';
import { jsPDF } from 'jspdf';

export default function GroceryListView() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: 1, quantityType: 'pcs', category: 'Fruits', status: 'Pending' });
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', quantity: 1, quantityType: 'pcs', category: 'Fruits', status: 'Pending' });

  const fetchListData = async () => {
    const res = await axios.get(`http://localhost:3001/api/lists/${listId}`);
    setList(res.data.list);
    setItems(res.data.items);
  };

  const addItem = async () => {
    try {
      await axios.post(`http://localhost:3001/api/groceryitems/${listId}`, form);
      setForm({ name: '', quantity: 1, quantityType: 'pcs', category: 'Fruits', status: 'Pending' });
      fetchListData();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/groceryitems/${id}`);
      fetchListData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const startEditing = (item) => {
    setEditingItemId(item._id);
    setEditForm({
      name: item.name,
      quantity: item.quantity,
      quantityType: item.quantityType,
      category: item.category,
      status: item.status,
    });
  };

  const cancelEditing = () => {
    setEditingItemId(null);
  };

  const updateItem = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/groceryitems/${id}`, editForm);
      setEditingItemId(null);
      fetchListData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`${list.title} Grocery List`, 20, 20);
    let y = 40;
    items.forEach(item => {
      doc.setFontSize(12);
      doc.text(`${item.name} (${item.quantity} ${item.quantityType}) - ${item.category} - ${item.status}`, 20, y);
      y += 10;
    });
    doc.save(`${list.title}-grocery-list.pdf`);
  };

  useEffect(() => {
    fetchListData();
  }, [listId]);

  if (!list) return <div className="p-4">Loading...</div>;

  return (
    <div>
      <Navbar />
    <div className="p-6 max-w-5xl mx-auto">
      <div className="border bg-[#95C7A7] rounded-lg p-6 space-y-6">

        {/* Header Section */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/list-dashboard')}
            className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold">{list.title}</h1>
          <button onClick={generatePDF} className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Download PDF
          </button>
        </div>

        {/* Add Item Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addItem();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Item Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="border border-green-600 p-2 rounded-md w-full"
                  placeholder="Item Name"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                  required
                  className="border border-green-600 p-2 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Quantity Type</label>
                <select
                  value={form.quantityType}
                  onChange={(e) => setForm({ ...form, quantityType: e.target.value })}
                  className="border border-green-600 p-2 rounded-md w-full"
                >
                  {['pcs', 'kg', 'grams', 'liters', 'ml', 'packs', 'bottles'].map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="border border-green-600 p-2 rounded-md w-full"
                >
                  {['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Other'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Status</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center gap-1">
                    <input type="radio" name="status" checked={form.status === 'Pending'} onChange={() => setForm({ ...form, status: 'Pending' })} />
                    <span>Pending</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="status" checked={form.status === 'Purchased'} onChange={() => setForm({ ...form, status: 'Purchased' })} />
                    <span>Purchased</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-sm">Add Item</button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Name</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className="text-center border-t">
                  {editingItemId === item._id ? (
                    <>
                      <td><input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="border p-1 w-full" /></td>
                      <td>
                        <input type="number" value={editForm.quantity} onChange={e => setEditForm({ ...editForm, quantity: Number(e.target.value) })} className="border p-1 w-full" />
                        <select value={editForm.quantityType} onChange={e => setEditForm({ ...editForm, quantityType: e.target.value })} className="border p-1 w-full mt-1">
                          {['pcs', 'kg', 'liters', 'packs', 'bottles', 'grams', 'ml'].map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} className="border p-1 w-full">
                          {['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Other'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })} className="border p-1 w-full">
                          <option value="Pending">Pending</option>
                          <option value="Purchased">Purchased</option>
                        </select>
                      </td>
                      <td className="flex justify-center items-center gap-2 py-2">
                      <button
                        onClick={() => updateItem(item._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>

                    </>
                  ) : (
                    <>
                      <td className="p-2">{item.name}</td>
                      <td>{item.quantity} {item.quantityType}</td>
                      <td>{item.category}</td>
                      <td>{item.status}</td>
                      <td>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-4" onClick={() => startEditing(item)}>Edit</button> {/* Increased margin */}
                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => deleteItem(item._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
    </div>
  );
}
