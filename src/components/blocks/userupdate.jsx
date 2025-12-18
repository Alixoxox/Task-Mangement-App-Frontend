import React, { useContext, useState, useEffect } from 'react';
import { User, Mail, Lock, X, Loader2, LogOut, CheckCircle } from 'lucide-react';
import { OverallContext } from '../context/Overall';
import { UpdateUser } from '../utils/demo_data';

const UserUpdate = () => {
  const { isModalOpen, setIsModalOpen, setUser, user, showToast } = useContext(OverallContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync state with current user data when modal opens
  useEffect(() => {
    if (isModalOpen && user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPassword(''); 
    }
  }, [isModalOpen, user]);

  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser({ name: "", email: "", id: "" });
    showToast("Logged out successfully", "success");
    closeModal();
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const updatedUser = await UpdateUser({ name, email, password });
      setUser(updatedUser);
      showToast("Profile updated successfully!", "success");
      closeModal();
    } catch (error) {
      showToast("Failed to update profile", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 transform transition-all scale-100">
        
        {/* Header */}
        <div className="relative p-6 bg-gray-50/50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
              <p className="text-xs text-gray-500">View or update your profile details</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
              placeholder="email@example.com"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
              placeholder="Leave blank to keep current"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-gray-50 flex items-center justify-between border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>

          <div className="flex gap-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleUpdate}
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200 disabled:opacity-70 transition-all active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;