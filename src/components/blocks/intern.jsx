import React, { useContext, useState, useMemo } from 'react';
import Footer from '../../components/footer';
import { getPriorityColor, getStatusColor } from '../../components/utils/fuctions';
import { OverallContext } from '../../components/context/Overall';
import { Plus, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import CreateTaskModal from '../../components/blocks/createTask';
import TaskDetailsModal from '../../components/blocks/viewTaskDetail';
import EditTaskModal from '../../components/blocks/EditTaskModel'; 
import { deleteTaskById } from '../utils/demo_data';

export default function InternDashboard() {
    // 1. Destructure logic from Context
    const { tasks, setOpenCTaskModal, deleteTask, updateTask } = useContext(OverallContext);

    // --- UI States ---
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [showFutureOnly, setShowFutureOnly] = useState(false);
    
    // --- Modal States ---
    const [selectedTask, setSelectedTask] = useState(null); // Viewing
    const [editingTask, setEditingTask] = useState(null);   // Editing
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // --- Sorting/Pagination States ---
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'default' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // --- Handlers ---

    // 1. Delete Logic
    const handleDeleteTask = async(taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            if (deleteTask) {
                deleteTask(taskId);
                await deleteTaskById(taskId);
            }
            setSelectedTask(null); // Close the detail modal
        }
    };

    // 2. Edit Logic (Opens the Edit Modal)
    const handleEditClick = (task) => {
        setEditingTask(task);      // Load task into state
        setSelectedTask(null);     // Close Detail Modal
        setIsEditModalOpen(true);  // Open Edit Modal
    };

    // 3. Update Logic (Called from Edit Modal)
    const handleUpdateTask = (updatedTaskObj) => {
        if (updateTask) {
            updateTask(updatedTaskObj);
        }
        setIsEditModalOpen(false);
        setEditingTask(null);
    };

    // --- Data Processing (Filter -> Sort -> Paginate) ---
    const paginatedTasks = useMemo(() => {
        // A. Filter
        let filtered = tasks.filter((task) => {
            const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const matchesDate = !showFutureOnly || (task.dueDate && new Date(task.dueDate) > today);
            return matchesPriority && matchesDate;
        });

        // B. Sort
        if (sortConfig.key && sortConfig.direction !== 'default') {
            filtered.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'priority') {
                    const priorityWeight = { High: 3, Medium: 2, Low: 1 };
                    aValue = priorityWeight[aValue] ?? 0;
                    bValue = priorityWeight[bValue] ?? 0;
                }

                if (sortConfig.key === 'dueDate') {
                    aValue = aValue ? new Date(aValue).getTime() : Infinity;
                    bValue = bValue ? new Date(bValue).getTime() : Infinity;
                }

                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        // C. Paginate
        const start = (currentPage - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    }, [tasks, priorityFilter, showFutureOnly, sortConfig, currentPage]);

    // Calculate Totals for Pagination UI
    const totalFilteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const matchesDate = !showFutureOnly || (task.dueDate && new Date(task.dueDate) > today);
            return matchesPriority && matchesDate;
        }).length;
    }, [tasks, priorityFilter, showFutureOnly]);

    const totalPages = Math.ceil(totalFilteredTasks / itemsPerPage);

    // --- Sort/Page Helpers ---
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') direction = 'descending';
            else if (sortConfig.direction === 'descending') {
                key = null;
                direction = 'default';
            }
        }
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown className="w-4 h-4 text-gray-400 opacity-50" />;
        if (sortConfig.direction === 'ascending') return <ArrowUp className="w-4 h-4 text-red-600" />;
        if (sortConfig.direction === 'descending') return <ArrowDown className="w-4 h-4 text-red-600" />;
        return <ArrowUpDown className="w-4 h-4 text-gray-400 opacity-50" />;
    };

    const paginate = (page) => setCurrentPage(page);
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = Math.min(indexOfFirstItem + itemsPerPage, totalFilteredTasks);
    return (
        <div>
            <CreateTaskModal />
            
            <TaskDetailsModal 
                task={selectedTask} 
                onClose={() => setSelectedTask(null)} 
                onDelete={handleDeleteTask}
                onEdit={handleEditClick}
            />

            <EditTaskModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                task={editingTask}
                onUpdate={handleUpdateTask}
            />

            <div className="min-h-screen p-4 sm:p-6 lg:p-8 overflow-x-auto">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">

                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
                                <p className="text-sm text-gray-600 mt-1">Tasks Assigned By You</p>
                            </div>
                            <button
                                onClick={() => setOpenCTaskModal(true)}
                                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Create Task
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        {['title', 'priority', 'status', 'dueDate'].map((key) => (
                                            <th
                                                key={key}
                                                className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors select-none"
                                                onClick={() => requestSort(key)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)} {getSortIcon(key)}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedTasks.length > 0 ? (
                                        paginatedTasks.map((task) => (
                                            <tr
                                                key={task._id}
                                                onClick={() => setSelectedTask(task)}
                                                className="hover:bg-red-50 cursor-pointer transition-colors"
                                            >
                                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{task.title}</td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                                        {task.priority}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                                        {task.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-8 text-gray-500 text-sm">
                                                No tasks found matching your filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalFilteredTasks > 0 && (
                            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{indexOfLastItem}</span> of <span className="font-medium">{totalFilteredTasks}</span> results
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className={`p-2 rounded-md border ${currentPage === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <div className="hidden sm:flex gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => paginate(i + 1)}
                                                className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 rounded-md border ${currentPage === totalPages ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}