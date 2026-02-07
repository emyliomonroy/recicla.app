
import React from 'react';

interface RewardsStoreProps {
  points: number;
}

const REWARDS = [
  { id: '1', name: 'Descuento en Café Orgánico', cost: 500, provider: 'EcoCafe', icon: 'fa-coffee', color: 'bg-orange-100 text-orange-600' },
  { id: '2', name: 'Kit de Popotes de Acero', cost: 1200, provider: 'Tienda Zero', icon: 'fa-box-open', color: 'bg-blue-100 text-blue-600' },
  { id: '3', name: '1 Mes de Suscripción Eco', cost: 3000, provider: 'EcoStreaming', icon: 'fa-video', color: 'bg-purple-100 text-purple-600' },
  { id: '4', name: 'Bolsa de Tela Reutilizable', cost: 300, provider: 'Market Sostenible', icon: 'fa-bag-shopping', color: 'bg-green-100 text-green-600' },
  { id: '5', name: 'Donación de Árbol', cost: 1000, provider: 'Reforesta MX', icon: 'fa-tree', color: 'bg-emerald-100 text-emerald-600' },
];

const RewardsStore: React.FC<RewardsStoreProps> = ({ points }) => {
  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-6 text-white mb-6 shadow-lg shadow-green-200">
        <p className="text-green-100 text-sm font-medium">Tus EcoPuntos</p>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold">{points.toLocaleString()}</span>
          <span className="text-lg font-medium opacity-80 mb-1">PTS</span>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {['Todos', 'Descuentos', 'Productos', 'Donaciones'].map((cat, i) => (
          <button 
            key={cat} 
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border ${
              i === 0 ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-2">
        {REWARDS.map((reward) => (
          <div key={reward.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-50">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${reward.color}`}>
              <i className={`fas ${reward.icon}`}></i>
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-gray-800 text-sm">{reward.name}</h4>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{reward.provider}</p>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <span className="text-green-600 font-bold">{reward.cost} <span className="text-[8px]">PTS</span></span>
              <button 
                disabled={points < reward.cost}
                className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase transition-colors ${
                  points >= reward.cost 
                    ? 'bg-gray-900 text-white active:scale-95' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Canjear
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsStore;
