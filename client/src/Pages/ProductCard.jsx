import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../Server";
import { ProductData } from "../Context/ProductContext";



const ProductCard = ({ product,admin }) => {
  const navigate = useNavigate();

  const { fetchAdminProducts} = ProductData()

  const deleteHandler = async () => {
   if(confirm("You want to Delete.?")){
    try{
      const {data} = await axios.delete(`${server}/product/${product._id}`,{
        headers:{
          token: localStorage.getItem("token")
        }
      })

    toast.success(data.message);
    fetchAdminProducts();
    }catch(error){
      toast.error(error.response.data.message)
    }
   }
  }


  return (
    <div className="flex-none bg-gray-600 shadow-md rounded-lg overflow-hidden ">
      <div>
        <img
          src={`http://localhost:8000/${product.image}`}
          alt={product.title}
          className="w-full h-44 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <h3 className="text-md text-gray-700">{product.price}</h3>
        
        <div className="space-x-4">
        <button 
          onClick={() => navigate(`/product/${product._id}`)} 
          className="mt-2 text-white bg-blue-600 w-28 px-4 py-2 rounded"
        >
          View Item
        </button>

        {admin && <button onClick={()=>deleteHandler()} className="mt-2 text-white w-28 bg-red-500 px-4 py-2 rounded">
          Delete
        </button>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
