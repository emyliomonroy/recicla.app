
import React from 'react';
import { UserProfile, RecyclingActivity } from '../types';
import { MATERIAL_ICONS } from '../constants';

interface ProfileProps {
  profile: UserProfile;
  history: RecyclingActivity[];
}

const Profile: React.FC<ProfileProps> = ({ profile, history }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-center py-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-green-100 border-4 border-white shadow-xl overflow-hidden mb-4">
            <img src="https://picsum.photos/seed/profile/200" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-4 right-0 w-8 h-8 bg-green-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
            <i className="fas fa-camera"></i>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
        <p className="text-gray-500 text-sm">Guardián del Planeta • Nivel {profile.level}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-gray-900">{profile.totalRecycled.toFixed(1)}kg</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Reciclado Total</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-green-600">{profile.points}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Puntos Disponibles</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-800 px-1">Historial Completo</h3>
        {history.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-50">
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-lg">
              {MATERIAL_ICONS[item.material]}
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold text-gray-800 text-sm capitalize">{item.material.toLowerCase()}</h4>
              <p className="text-[10px] text-gray-400">{new Date(item.date).toLocaleDateString('es-ES')}</p>
            </div>
            <div className="text-right">
              <p className="text-green-600 text-sm font-bold">+{item.pointsEarned} pts</p>
              <p className="text-[10px] text-gray-400">{item.quantity} kg</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-2">
        <button className="w-full py-4 px-6 bg-white rounded-2xl text-left font-bold text-gray-700 flex justify-between items-center border border-gray-100">
          <span>Configuración de Cuenta</span>
          <i className="fas fa-chevron-right text-gray-300"></i>
        </button>
        <button className="w-full py-4 px-6 bg-white rounded-2xl text-left font-bold text-red-500 flex justify-between items-center border border-gray-100">
          <span>Cerrar Sesión</span>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Profile;
