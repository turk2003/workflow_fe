"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Item {
  ID: number;
  title: string;
  quantity: number;
  amount: number;
}

const HomePage = () => {

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-black" >Items</h1>
      <Link className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-600 mr-4" href="/add">
        Add New Item
      </Link>
       <Link className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-600" href="/approval">
        approval
      </Link>
      
      <table className=" w-full bg-white shadow-md rounded mt-4 ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-black">Id</th>
            <th className="py-2 px-4 border-b text-black">Title</th>
            <th className="py-2 px-4 border-b text-black">Quantity</th>
            <th className="py-2 px-4 border-b text-black">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.ID}>
              
              <td className="py-2 px-4 border-b text-black text-center" >  <Link className='text-black  '  href={`edit/${item.ID}`}>
        ✒️
      </Link> {item.ID}</td>
              <td className="py-2 px-4 border-b text-black text-center">{item.title}</td>
              <td className="py-2 px-4 border-b text-black text-center">{item.quantity}</td>
              <td className="py-2 px-4 border-b text-black text-center">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
   
  );
};

export default HomePage;
