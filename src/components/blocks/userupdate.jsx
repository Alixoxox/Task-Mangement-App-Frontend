import React, { useContext, useState } from 'react';
import { User, ArrowRight, Mail, Lock } from 'lucide-react';
import { OverallContext } from '../context/Overall';
import { UpdateUser } from '../utils/demo_data';

const UserUpdate = () => {
  // Added state for Name and Email

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { isModalOpen, setIsModalOpen,setUser,showToast } = useContext(OverallContext);
  const closeModal = () => setIsModalOpen(false);
  const Logout=() => {
    localStorage.removeItem('user');
      setUser({name:"",email:"",id:""});
      showToast("Account Logged Out successfully!", "success");
      closeModal()
  }
  const UpdateProfile=async() => {
   const userD=await UpdateUser({name,email,password});
    showToast("Profile updated successfully!", "success");
    setUser(userD);
    closeModal();
  }
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative p-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-black" />
                <h2 className="text-xl font-bold text-black">Update Profile</h2>
              </div>
              <ArrowRight className="h-6 w-6 text-black font-extrabold cursor-pointer hover:text-gray-600 transition" onClick={closeModal} />
            </div>

            {/* Form Fields Container */}
            <div className="flex flex-col gap-5">
              
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Eg. john Doe"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Eg. john@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
              <button
                onClick={Logout}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm px-5 py-2.5 rounded-xl font-medium transition"
              >
                Logout
              </button>

              <button
                onClick={UpdateProfile}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 transition"
              >
                Update Profile
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default UserUpdate;