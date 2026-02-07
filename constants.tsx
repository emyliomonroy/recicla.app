
import React from 'react';
import { MaterialType } from './types';

export const POINTS_PER_KG: Record<MaterialType, number> = {
  [MaterialType.PET]: 15,
  [MaterialType.ALUMINIO]: 30,
  [MaterialType.PAPEL]: 8,
  [MaterialType.CARTON]: 10,
  [MaterialType.VIDRIO]: 12,
  [MaterialType.OTROS]: 5
};

export const MATERIAL_ICONS: Record<MaterialType, React.ReactNode> = {
  [MaterialType.PET]: <i className="fas fa-bottle-water text-blue-500"></i>,
  [MaterialType.ALUMINIO]: <i className="fas fa-can-food text-gray-500"></i>,
  [MaterialType.PAPEL]: <i className="fas fa-file-lines text-yellow-500"></i>,
  [MaterialType.CARTON]: <i className="fas fa-box text-orange-600"></i>,
  [MaterialType.VIDRIO]: <i className="fas fa-wine-glass text-emerald-500"></i>,
  [MaterialType.OTROS]: <i className="fas fa-recycle text-green-500"></i>
};
