
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MaterialType } from '../types';

interface StatsCardProps {
  data: { name: string; value: number; color: string }[];
  totalPoints: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ data, totalPoints }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Balance Actual</h3>
          <p className="text-3xl font-bold text-gray-900">{totalPoints.toLocaleString()} <span className="text-sm font-normal text-green-600">PTS</span></p>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
          Nivel 4: Guardián
        </div>
      </div>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs text-gray-600 font-medium">{item.name}: {item.value}kg</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
