import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import GeneratePDFButton from '../../components/groceryManagement/GeneratePDFButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GroceryListView() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: 1, quantityType: 'pcs', category: 'Fruits', status: 'Pending' });
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', quantity: 1, quantityType: 'pcs', category: 'Fruits', status: 'Pending' });
  const [errors, setErrors] = useState({});

  const fetchListData = async () => {
    const res = await axios.get(`http://localhost:3001/api/lists/${listId}`);
    setList(res.data.list);
    setItems(res.data.items);
  };

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required.';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
      newErrors.name = 'Item name can only contain letters, numbers, and spaces.';
    }
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0.';
    }
    if (!formData.quantityType) {
      newErrors.quantityType = 'Please select a quantity type.';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }
    if (!formData.status) {
      newErrors.status = 'Please select a status.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addItem = async () => {
    if (validateForm(form)) {
      try {
        await axios.post(`http://localhost:3001/api/groceryitems/${listId}`, form);
        setForm({ name: '', quantity: 1, quantityType: 'pcs', category: 'Fruits', status: 'Pending' });
        fetchListData();
        toast.success('Item added successfully!', { position: 'top-center', autoClose: 2000 });
      } catch (error) {
        console.error("Error adding item:", error);
        toast.error('Failed to add item.', { position: 'top-center', autoClose: 2000 });
      }
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/groceryitems/${id}`);
      fetchListData();
      toast.success('Item deleted successfully!', { position: 'top-center', autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error('Failed to delete item.', { position: 'top-center', autoClose: 2000 });
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
    if (validateForm(editForm)) {
      try {
        await axios.put(`http://localhost:3001/api/groceryitems/${id}`, editForm);
        setEditingItemId(null);
        fetchListData();
        toast.success('Item updated successfully!', { position: 'top-center', autoClose: 2000 });
      } catch (error) {
        console.error("Error updating item:", error);
        toast.error('Failed to update item.', { position: 'top-center', autoClose: 2000 });
      }
    }
  };

  useEffect(() => {
    fetchListData();
  }, [listId]);

  if (!list) return <div className="p-4">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <ToastContainer />
        <div className="bg-gradient-to-br from-[#95C7A7] to-green-100 rounded-lg p-6 space-y-6 shadow-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/list-dashboard')}
              className="bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-2 rounded-md hover:from-green-800 hover:to-green-900 transition duration-200 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-md"></span>
              ← Back
            </button>
            <h1 className="text-2xl font-extrabold text-green-900 drop-shadow-sm">{list.title}</h1>
            <GeneratePDFButton list={list} items={items} className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-4 py-2 rounded-md hover:from-green-700 hover:to-teal-600 transition duration-200 relative overflow-hidden group" />
          </div>

          {/* Add Item Form */}
          <div className="bg-gradient-to-br from-green-300 to-green-200 rounded-lg shadow-md p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-800">Item Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="border border-green-600 p-2.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    placeholder="Item Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-800">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                    required
                    className="border border-green-600 p-2.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  />
                  {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-800">Quantity Type</label>
                  <select
                    value={form.quantityType}
                    onChange={(e) => setForm({ ...form, quantityType: e.target.value })}
                    className="border border-green-600 p-2.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  >
                    {['pcs', 'kg', 'grams', 'liters', 'ml', 'packs', 'bottles'].map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                  {errors.quantityType && <p className="text-red-500 text-xs mt-1">{errors.quantityType}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-800">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="border border-green-600 p-2.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  >
                    {['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Other'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-800">Status</label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="status" checked={form.status === 'Pending'} onChange={() => setForm({ ...form, status: 'Pending' })} className="accent-green-600" />
                      <span className="text-gray-700">Pending</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="status" checked={form.status === 'Purchased'} onChange={() => setForm({ ...form, status: 'Purchased' })} className="accent-green-600" />
                      <span className="text-gray-700">Purchased</span>
                    </label>
                  </div>
                  {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                </div>
              </div>
              <div className="text-right">
                <button type="submit" className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-6 py-2.5 rounded-md shadow-md hover:from-green-700 hover:to-teal-600 transition duration-200 relative overflow-hidden group disabled:opacity-50" disabled={Object.keys(errors).length > 0}>
                  <span className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-md"></span>
                  Add Item
                </button>
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gradient-to-r from-green-800 to-green-300 text-white">
                <tr>
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">Quantity</th>
                  <th className="p-3 font-semibold">Category</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id} className={`text-center border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-green-50 transition duration-200`}>
                    {editingItemId === item._id ? (
                      <>
                        <td><input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="border border-green-600 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" /></td>
                        <td>
                          <input type="number" value={editForm.quantity} onChange={e => setEditForm({ ...editForm, quantity: Number(e.target.value) })} className="border border-green-600 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                          <select value={editForm.quantityType} onChange={e => setEditForm({ ...editForm, quantityType: e.target.value })} className="border border-green-600 p-2 w-full rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                            {['pcs', 'kg', 'liters', 'packs', 'bottles', 'grams', 'ml'].map(unit => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} className="border border-green-600 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            {['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Other'].map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })} className="border border-green-600 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="Pending">Pending</option>
                            <option value="Purchased">Purchased</option>
                          </select>
                        </td>
                        <td className="p-3 flex justify-center items-center gap-2">
                          <button
                            onClick={() => updateItem(item._id)}
                            className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-3 py-1.5 rounded-md hover:from-green-700 hover:to-teal-600 transition duration-200 relative overflow-hidden group disabled:opacity-50"
                            disabled={Object.keys(errors).length > 0}
                          >
                            <span className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-md"></span>
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-1.5 rounded-md hover:from-gray-500 hover:to-gray-600 transition duration-200 relative overflow-hidden group"
                          >
                            <span className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-md"></span>
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.quantity} {item.quantityType}</td>
                        <td className="p-3">{item.category}</td>
                        <td className="p-3">{item.status}</td>
                        <td className="p-3">
                          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1.5 rounded-md hover:from-yellow-500 hover:to-yellow-600 transition duration-200 mr-2 relative overflow-hidden group" onClick={() => startEditing(item)}>
                            <span className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-md"></span>
                            Edit
                          </button>
                          <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-md hover:from-red-600 hover:to-pink-600 transition duration-200 relative overflow-hidden group" onClick={() => deleteItem(item._id)}>
                            <span className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 transition-transform duration-200 rounded-md"></span>
                            Delete
                          </button>
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