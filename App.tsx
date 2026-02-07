
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import RecycleScanner from './views/RecycleScanner';
import MapView from './views/MapView';
import RewardsStore from './views/RewardsStore';
import Profile from './views/Profile';
import { RecyclingActivity, MaterialType, UserProfile } from './types';

const INITIAL_PROFILE: UserProfile = {
  name: "Sofía Rodríguez",
  points: 1250,
  totalRecycled: 45.5,
  level: 4
};

const INITIAL_HISTORY: RecyclingActivity[] = [
  { id: '1', date: '2023-10-25', material: MaterialType.PET, quantity: 2.5, pointsEarned: 38 },
  { id: '2', date: '2023-10-22', material: MaterialType.ALUMINIO, quantity: 1.2, pointsEarned: 36 },
  { id: '3', date: '2023-10-18', material: MaterialType.CARTON, quantity: 5.0, pointsEarned: 50 },
];

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [history, setHistory] = useState<RecyclingActivity[]>(INITIAL_HISTORY);

  const addActivity = (activity: RecyclingActivity) => {
    setHistory([activity, ...history]);
    setProfile(prev => ({
      ...prev,
      points: prev.points + activity.pointsEarned,
      totalRecycled: prev.totalRecycled + activity.quantity
    }));
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard profile={profile} history={history} />} />
          <Route path="/reciclar" element={<RecycleScanner onRecycle={addActivity} />} />
          <Route path="/mapa" element={<MapView />} />
          <Route path="/tienda" element={<RewardsStore points={profile.points} />} />
          <Route path="/perfil" element={<Profile profile={profile} history={history} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
