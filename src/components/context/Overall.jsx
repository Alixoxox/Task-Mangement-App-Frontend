import React, { createContext, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export const OverallContext = createContext();

export const OverallContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        id: ""
    });
    const showToast = (message, type = "success") => {
        if (type === "success") {
            toast.success(message);
        } else if (type === "error") {
            toast.error(message);
        } else {
            toast(message); // Info
        }
    };

    const [tasks, setTasks] = useState([]);

    const saveTask = (newTaskData) => {
      const newTask = {
        ...newTaskData,
        id: Date.now(), 
        status: newTaskData.status || "To Do",
        priority: newTaskData.priority || "Medium"
      };
      setTasks([newTask, ...tasks]); 
      toast.success("Task created successfully!");
    };

    const deleteTask = (id) => {
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.error("Task deleted.");
    };
  
    const updateTask = (updatedTask) => {
      setTasks((prev) => 
        prev.map((task) => (task._id === updatedTask.id ? updatedTask : task))
      );
      toast.success("Task updated successfully!");
    };
    const [selected, setSelected] = useState("overview"); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [openCTaskModal, setOpenCTaskModal] = useState(false); 
    const [viewTask, setViewTask] = useState(false); 
    const [taskData, setTaskData] = useState({}); 

  return (
    <OverallContext.Provider value={{
        viewTask, setViewTask,
        user, setUser,
        selected, setSelected,
        tasks, setTasks,
        deleteTask, updateTask, saveTask,
        isModalOpen, setIsModalOpen,
        openCTaskModal, setOpenCTaskModal,
        taskData, setTaskData,
        showToast
    }}>
      {children}
      {/* This is for Interactive Msg Popups */}
      <Toaster 
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
                background: '#333',
                color: '#fff',
                fontSize: '14px',
            },
            success: {
                style: {
                    background: 'white',
                    color: 'green',
                    border: '1px solid #d1fae5'
                },
            },
            error: {
                style: {
                    background: 'white',
                    color: 'red',
                    border: '1px solid #fee2e2'
                },
            },
          }} 
      />
    </OverallContext.Provider>
  );
};

export default OverallContextProvider;