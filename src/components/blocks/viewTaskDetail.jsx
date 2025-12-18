import React from 'react';
import { X, Calendar, AlertCircle, CheckCircle2, AlignLeft, Trash2, Pencil } from 'lucide-react';
import { getPriorityColor, getStatusColor } from '../../components/utils/fuctions';

const TaskDetailsModal = ({ task, onClose, onEdit, onDelete }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Task ID: #{task._id||task.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Status & Priority Row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-500 uppercase">Status</span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    <CheckCircle2 className="w-3 h-3" /> {task.status}
                </span>
            </div>
            
            <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-500 uppercase">Priority</span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    <AlertCircle className="w-3 h-3" /> {task.priority}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-500 uppercase">Due Date</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    <Calendar className="w-3 h-3" /> 
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}
                </span>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
              <AlignLeft className="w-4 h-4 text-gray-500" /> Description
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 max-h-60 overflow-y-auto">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {task.description || "No description provided for this task."}
              </p>
            </div>
          </div>
          
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            {/* Left Side: Edit/Delete */}
            <div className="flex gap-2">
                <button 
                    onClick={() => onDelete(task._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </button>
                <button 
                    onClick={() => onEdit(task)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all shadow-sm"
                >
                    <Pencil className="w-4 h-4" />
                    Edit
                </button>
            </div>

            {/* Right Side: Close */}
            <button 
                onClick={onClose}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
            >
                Close
            </button>
        </div>

      </div>
    </div>
  );
};

export default TaskDetailsModal;