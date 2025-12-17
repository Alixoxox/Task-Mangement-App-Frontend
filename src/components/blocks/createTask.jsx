import React, { useContext, useState } from 'react';
import {
  ArrowRight,
  ClipboardList,
  AlertTriangle,
  Calendar,
  Activity
} from 'lucide-react';
import { OverallContext } from '../context/Overall';
import { createTask } from '../utils/demo_data';

const CreateTaskModal = () => {
  const { openCTaskModal, setOpenCTaskModal, saveTask } = useContext(OverallContext);

  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    priority: 'Medium',
    status: 'To Do',
    description: ''
  });

  const close = () => setOpenCTaskModal(false);

  const updateField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async() => {
    if (!formData.title) return alert("Title is required");

    const formattedTask = {
      title: formData.title,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
      description: formData.description,
    };    
    saveTask(formattedTask);
    await createTask(formattedTask)
    close();
  };

  if (!openCTaskModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-800">Create New Task</h2>
          </div>
          <button onClick={close} className="p-1 hover:bg-gray-100 rounded-full">
            <ArrowRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* --- Form Body --- */}
        <div className="p-6 space-y-6">
          
          {/* 1. Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input 
              type="text"
              placeholder="E.g. Fix Navigation Bar"
              className="w-full text-lg font-semibold border-b-2 border-gray-200 focus:border-red-500 outline-none py-2 px-1 transition-colors"
              value={formData.title}
              onChange={updateField('title')}
            />
          </div>

          {/* 2. Grid for Date, Priority, Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Due Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4" /> Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={updateField('dueDate')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <AlertTriangle className="w-4 h-4" /> Priority
              </label>
              <select
                value={formData.priority}
                onChange={updateField('priority')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-100"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Activity className="w-4 h-4" /> Status
              </label>
              <select
                value={formData.status}
                onChange={updateField('status')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-100"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {/* 3. Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={updateField('description')}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-red-100"
              placeholder="Add details about this task..."
            />
          </div>

        </div>

        {/* --- Footer --- */}
        <div className="flex justify-end px-6 py-4 bg-gray-50 border-t gap-3">
          <button
            onClick={close}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition shadow-md"
          >
            Create Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateTaskModal;