import React from 'react';
import { useSelector } from 'react-redux';
import FarmerDashboard from '../components/farmer/FarmerDashboard';

const FarmerPage = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <p>Please login as Farmer</p>;

  return <FarmerDashboard uid={user.uid} />;
};

export default FarmerPage;
