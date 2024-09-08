import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../Server"; // Ensure your server URL is correctly imported
import { UserData } from "../Context/UserContext";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


const Checkout = () => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState([]);
  const [error, setError] = useState(null);

  const { user } = UserData();

  const navigate = useNavigate()

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const fetchAddress = async () => {
    try {
      const { data } = await axios.get(`${server}/address/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setAddress(data.allAddress);
    } catch (error) {
      setError("Failed to load addresses");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const deleteHandler = async (id) => {
    try{
   
      const {data} = await axios.delete(`${server}/address/${id}`,{
        headers:{  
          token:localStorage.getItem("token"),
        }
      })
      toast.success(data.message)
      fetchAddress()
    }catch(error){
      toast.error(error.response.data.message)
    }

  }

  return (
    <div className="p-4">
      <h1 className="font-semibold text-2xl tracking-wide">Choose Address</h1>

      {error && <div className="text-red-500">{error}</div>}

      {/* Address List */}
      <div className="mt-4 space-y-2">
        {address.length > 0 ? (
          address.map((addr, index) => (
            <div key={index} className="p-2 bg-gray-200 rounded-md shadow-sm space-y-2">
              <p className="font-semibold ">USERID : {addr.user}</p>
              <p className="p-2 font-semibold bg-gray-300 rounded-md">Name : {user.name}</p>
              <p className="p-2 font-semibold bg-gray-300 rounded-md">Email : {user.email}</p>
              <p className="p-2 font-semibold bg-gray-300 rounded-md" >Address : {addr.address}</p>
              <p className="p-2 font-semibold bg-gray-300 rounded-md">Phone : {addr.phone}</p>
              <div className="flex gap-3 justify-end ">
              <button className="p-2 bg-red-500 text-white tracking-wider font-semibold flex items-center gap-2 rounded-md px-4 transform transition duration-200 ease-in-out active:scale-95 active:bg-blue-600 focus:outline-none shadow-lg active:shadow-none" onClick={()=>deleteHandler(addr._id)}><MdDelete />Delete</button>
              
               <button onClick={() => navigate('/payment')}  className="p-2 text-white bg-blue-500 rounded-md tracking-wide font-semibold transform transition duration-200 ease-in-out active:scale-95 active:bg-blue-600 focus:outline-none shadow-lg active:shadow-none" >Use Address</button>
              
              </div>
            </div>
          ))
        ) : (
          <div>No addresses found</div>
        )}
      </div>

      <button
        onClick={handleOpen}
        className="mt-4 p-3 bg-blue-500 text-white font-semibold rounded-md transform transition duration-200 ease-in-out active:scale-95 active:bg-blue-600 focus:outline-none shadow-lg active:shadow-none"
      >
        Add Address
      </button>

      <AddressMod handleClose={handleClose} show={show} />
    </div>
  );
};

export default Checkout;

export const AddressMod = ({ handleClose, show }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/address/add`,
        { address, phone },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Address added successfully");
      handleClose(); 
      fetchAddress(); 
    } catch (error) {
      setError("Failed to add address");
      console.error(error);
    }
  };
  

  return (
    <div>
      {/* Only render the modal if 'show' is true */}
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-5">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Your Address
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-500">{error}</div>}
              <div>
                <label
                  htmlFor="address"
                  className="block font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  required
                  className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  maxLength={10}
                  className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-4 pt-3 border-t">
                <button
                  onClick={handleClose}
                  className="p-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none w-32"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-3 bg-blue-500 text-white font-semibold rounded-md w-32 tracking-wider hover:bg-blue-600 focus:outline-none"
                >
                  Add  Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
