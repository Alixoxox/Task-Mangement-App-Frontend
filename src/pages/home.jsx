import React, { useContext } from 'react';
import { OverallContext } from '../components/context/Overall';

import UserDashboard from '../components/blocks/intern';
import LoginComponent from './login';

export default function Dashboard() {
  const { user } = useContext(OverallContext);
  if(user) {
    return <UserDashboard />;
  }else{
    return <LoginComponent />;
  }
}