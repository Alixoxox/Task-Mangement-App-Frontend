import React from 'react'
import { createContext, useState } from "react";
import { myTasks } from '../utils/demo_data';
export const OverallContext = createContext();
export const OverallContextProvider = ({ children }) => {
    const [user,setUser] = useState({
        name: "",
        email: "",
        role: "admin",
        id: ""
    });
    const [tasks, setTasks] = useState(myTasks);
    const saveTask = (newTaskData) => {
      const newTask = {
        ...newTaskData,
        id: Date.now(), // Generate a unique ID
        status: newTaskData.status || "To Do",
        priority: newTaskData.priority || "Medium"
      };
      setTasks([newTask, ...tasks]); 
      console.log("New Task Added:", newTask);
    };
    const deleteTask = (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    };
  
    // --- 3. Implement Update Task ---
    const updateTask = (updatedTask) => {
      setTasks((prev) => 
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    };
    const [selected, setSelected] = useState("overview"); 
    const [isModalOpen, setIsModalOpen] = useState(false); // for user update profile
    const [openCTaskModal, setOpenCTaskModal] = useState(false); // Modal for creating new task
    const [viewTask, setViewTask] = useState(false); // for viewing task details
    const [taskData, setTaskData] = useState({}); // for storing task data
  return (
    <OverallContext.Provider value={{viewTask, setViewTask,user,setUser,selected,tasks, setTasks,deleteTask ,updateTask,
      saveTask, setSelected,isModalOpen, setIsModalOpen,openCTaskModal, setOpenCTaskModal,taskData, setTaskData}}>
      {children}
    </OverallContext.Provider>
  );
};
export default OverallContextProvider;
