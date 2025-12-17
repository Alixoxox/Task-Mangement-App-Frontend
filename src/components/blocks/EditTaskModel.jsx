import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, AlertCircle, AlignLeft, Type, CheckCircle2 } from 'lucide-react';

export default function EditTaskModal({ isOpen, onClose, task, onUpdate }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Pending',
        dueDate: ''
    });

    // Populate form when task changes or modal opens
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                priority: task.priority || 'Medium',
                status: task.status || 'Pending',
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
            });
        }
    }, [task, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create updated task object
        const updatedTask = {
            ...task,
            ...formData,
            // Ensure date is stored consistently
            dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
        };
        
        onUpdate(updatedTask);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Edit Task</h2>
                        <p className="text-xs text-gray-500 mt-1">Update task details below</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <Type className="w-4 h-4 text-gray-400" /> Title
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm"
                            placeholder="Enter task title"
                        />
                    </div>

                    {/* Row: Priority & Status & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Priority */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-gray-400" /> Priority
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none text-sm bg-white"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-gray-400" /> Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none text-sm bg-white"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            
                        </div>

                        {/* Due Date */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" /> Due Date
                            </label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none text-sm text-gray-600"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <AlignLeft className="w-4 h-4 text-gray-400" /> Description
                        </label>
                        <textarea
                            rows="4"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm resize-none"
                            placeholder="Add details about this task..."
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-100 transition-all flex items-center gap-2 shadow-sm"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}