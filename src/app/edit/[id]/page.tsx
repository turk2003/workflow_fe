"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Item {
  ID: number;
  title: string;
  quantity: number;
  amount: number;
}


const EditPage =   ({ params }: { params: { id: number } })=>{
    const router = useRouter();
    const [item, setItem] = useState<Item | null>(null);
    const itemsID = params.id 
    const [title, setTitle] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemsID }`, {
           headers: {
        Authorization: `Bearer ${token}`,
    },
        });
        const data = response.data
        setItem(response.data);
        setTitle(data.title)
        setQuantity(data.quantity)
        setAmount(data.amount)
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [itemsID]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { title, quantity, amount };

    try {
        const token = localStorage.getItem('token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemsID }`, newItem, {
           headers: {
        Authorization: `Bearer ${token}`,
    },
        });
      alert('Item added successfully!');
      router.push('/');
    
    } catch (error) {
      console.error(error);
    }
  };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Edit Requirement</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div> 
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <Link href="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</Link>
            {/* <button
              type="button"
              onClick={() => router.push('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button> */}
          </div>
        </form>
      </div>
    </div>
    )

}
export default EditPage