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
  const navigate = useNavigate();

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
    if (confirm("Are you sure you want to delete this address?")) {
      try {
        const { data } = await axios.delete(`${server}/address/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchAddress();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="font-semibold text-2xl tracking-wide text-gray-800">
        Choose Address
      </h1>

      {error && <div className="text-red-500">{error}</div>}

      {/* Address List */}
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {address.length > 0 ? (
          address.map((addr, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow-md space-y-3">
              <p className="font-semibold">USER ID: {addr.user}</p>
              <p className="font-semibold">Name: {user.name}</p>
              <p className="font-semibold">Email: {user.email}</p>
              <p className="font-semibold">Address: {addr.address}</p>
              <p className="font-semibold">Phone: {addr.phone}</p>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="flex items-center gap-2 p-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none transform transition-transform active:scale-95"
                  onClick={() => deleteHandler(addr._id)}
                >
                  <MdDelete /> Delete
                </button>
                <button
                  onClick={() => navigate(`/payment/${addr._id}`)}
                  className="p-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none transform transition-transform active:scale-95"
                >
                  Use Address
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No addresses found</div>
        )}
      </div>

      <button
        onClick={handleOpen}
        className="mt-4 p-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none transform transition-transform active:scale-95"
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
      fetchAddress();
      handleClose();
    } catch (error) {
      setError("Failed to add address");
      console.error(error);
    }
  };

  return (
    <div>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">Add Address</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              {error && <div className="text-red-500">{error}</div>}

              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  required
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium">
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
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleClose}
                  className="p-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
