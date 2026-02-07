
export enum MaterialType {
  PET = 'PET',
  PAPEL = 'PAPEL',
  CARTON = 'CARTÓN',
  ALUMINIO = 'ALUMINIO',
  VIDRIO = 'VIDRIO',
  OTROS = 'OTROS'
}

export interface RecyclingActivity {
  id: string;
  date: string;
  material: MaterialType;
  quantity: number; // in kg
  pointsEarned: number;
}

export interface EcoLocation {
  id: string;
  name: string;
  type: 'centro_reciclaje' | 'negocio_sostenible' | 'espacio_verde';
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  rating: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  provider: string;
  image: string;
}

export interface UserProfile {
  name: string;
  points: number;
  totalRecycled: number; // total kg
  level: number;
}
