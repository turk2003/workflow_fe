"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  ID: number;
  title: string;
  quantity: number;
  amount: number;
  status: string;
}

const ApprovalPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`,  {
           headers: {
        Authorization: `Bearer ${token}`,
    },
        });
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  const updateStatus = async (ID: number, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/${ID}`, { status },  {
           headers: {
        Authorization: `Bearer ${token}`,
        
    },
   
        });
     
        
      setItems((prevItems) =>
        prevItems.map((item) => (item.ID === ID ? { ...item, status } : item))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">Approval</h1>
      <table className="min-w-full bg-white shadow-md rounded mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-black">ID</th>
            <th className="py-2 px-4 border-b text-black">Title</th>
            <th className="py-2 px-4 border-b text-black">Budget</th>
            <th className="py-2 px-4 border-b text-black">Status</th>
            <th className="py-2 px-4 border-b text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.ID}>
              <td className="py-2 px-4 border-b text-black text-center">{item.ID}</td>
              <td className="py-2 px-4 border-b text-black text-center">{item.title} x {item.quantity} Units</td>
              <td className="py-2 px-4 border-b text-black text-center">{item.amount.toFixed(2)}</td>
              <td className="py-2 px-4 border-b text-black text-center">{item.status}</td>
              <td className="py-2 px-4 border-b text-black text-center">
                <button
                  onClick={() => updateStatus(item.ID, 'APPROVED')}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(item.ID, 'REJECTED')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalPage;
