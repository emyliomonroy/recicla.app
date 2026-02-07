
import React from 'react';
import StatsCard from '../components/StatsCard';
import { UserProfile, RecyclingActivity, MaterialType } from '../types';
import { MATERIAL_ICONS } from '../constants';

interface DashboardProps {
  profile: UserProfile;
  history: RecyclingActivity[];
}

const Dashboard: React.FC<DashboardProps> = ({ profile, history }) => {
  // Aggregate data for chart
  const materialData = [
    { name: 'PET', value: 12, color: '#3b82f6' },
    { name: 'Papel', value: 15, color: '#eab308' },
    { name: 'Aluminio', value: 8, color: '#94a3b8' },
    { name: 'Cartón', value: 10, color: '#ea580c' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">¡Hola, {profile.name.split(' ')[0]}! 👋</h1>
        <p className="text-gray-500 text-sm">Estás haciendo un gran trabajo por el planeta.</p>
      </div>

      <StatsCard data={materialData} totalPoints={profile.points} />

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Actividad Reciente</h2>
          <button className="text-green-600 text-sm font-semibold">Ver Todo</button>
        </div>
        <div className="space-y-3">
          {history.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-50">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl">
                {MATERIAL_ICONS[item.material]}
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-800 capitalize">{item.material.toLowerCase()}</h4>
                <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} • {item.quantity}kg</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold">+{item.pointsEarned}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Puntos</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Acciones Eco</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex flex-col gap-2">
            <i className="fas fa-handshake text-blue-500 text-xl"></i>
            <span className="text-sm font-bold text-blue-900">Donar Puntos</span>
            <span className="text-[10px] text-blue-700">A causas ambientales</span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex flex-col gap-2">
            <i className="fas fa-certificate text-emerald-500 text-xl"></i>
            <span className="text-sm font-bold text-emerald-900">Certificados</span>
            <span className="text-[10px] text-emerald-700">Valida tu impacto</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
