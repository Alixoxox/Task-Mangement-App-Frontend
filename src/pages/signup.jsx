import React, { useState } from 'react';
import signupImg from '../assets/signup.jpg'; 

export default function SignupComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('intern'); // Default role
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Now creates a user with the specific role selected
    console.log('Signup attempted with:', { name, email, password, role, agreeTerms });
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left side - Illustration */}
        <div className="hidden lg:flex flex-1 bg-white relative p-6 sm:p-8 lg:p-12 items-center justify-center order-2 lg:order-1">
          <div className="w-full max-w-md lg:max-w-none">
            <img 
              src={signupImg} 
              alt="Signup illustration" 
              className="w-full h-auto object-contain max-h-64 sm:max-h-80 lg:max-h-none" 
            />
          </div>
        </div>

        {/* Right side - Signup form */}
        <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center max-w-full lg:max-w-md order-1 lg:order-2">
          <div className="w-full max-w-sm mx-auto lg:max-w-none lg:mx-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center lg:text-left">
              Create Account
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                />
              </div>

              {/* Confirm Password field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                />
              </div>

              {/* --- NEW ROLE DROPDOWN --- */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base appearance-none bg-white"
                  >
                    <option value="intern">Intern</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                  {/* Custom Arrow Icon for consistent UI */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Agree to Terms checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                />
                <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600 select-none">
                  I agree to the Terms and Conditions
                </label>
              </div>

              {/* Sign Up button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 text-sm sm:text-base active:bg-blue-800"
              >
                Sign Up
              </button>

              <div className="pt-4 sm:pt-0 text-center text-sm text-gray-500">
                Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}