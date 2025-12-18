import React, { useContext, useEffect } from 'react';
import { OverallContext } from '../components/context/Overall';

import UserDashboard from '../components/blocks/TaskManagement';
import LoginComponent from './login';
import { fetchTasks } from '../components/utils/demo_data';
import { Users } from 'lucide-react';

export default function Dashboard() {
  const { user,setTasks } = useContext(OverallContext);
  useEffect(() => {
    const fetchData = async () => {
      const data=await fetchTasks();
      setTasks(Array.isArray(data)? data:[]);
    };
    fetchData();
  }, [Users]);
  useEffect(() => {
  document.title = "Aykays | Task Dashboard";
  },[])
  if(user) {
    return <UserDashboard />;
  }else{
    return <LoginComponent />;
  }
}