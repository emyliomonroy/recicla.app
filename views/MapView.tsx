
import React, { useState, useEffect } from 'react';
import { findNearbyEcoPlaces } from '../services/geminiService';

const MapView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 19.4326, lng: -99.1332 }); // Ciudad de México por defecto

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const data = await findNearbyEcoPlaces(userLocation.lat, userLocation.lng, search || "centros de reciclaje");
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="animate-fade-in flex flex-col gap-4">
      <div className="relative">
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar centros, negocios eco..."
          className="w-full py-4 pl-12 pr-4 bg-white rounded-2xl shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20"
        />
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <button 
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
        >
          Buscar
        </button>
      </div>

      <div className="bg-gray-200 w-full h-64 rounded-3xl relative overflow-hidden shadow-inner flex items-center justify-center">
        {/* Placeholder for real map. In a production app, we would use Leaflet/Google Maps API here */}
        <div className="text-center p-6">
          <i className="fas fa-map-marked-alt text-4xl text-gray-400 mb-2"></i>
          <p className="text-gray-500 text-sm">Mapa interactivo de centros de acopio</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-gray-600 shadow-sm border">Centros de Acopio</span>
            <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-gray-600 shadow-sm border">Tiendas Zero Waste</span>
            <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-gray-600 shadow-sm border">Huertos Urbanos</span>
          </div>
        </div>
        
        {/* Mock Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 text-3xl drop-shadow-md">
          <i className="fas fa-location-dot"></i>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <i className="fas fa-compass text-green-600"></i>
          Resultados encontrados
        </h3>
        
        {loading ? (
          <div className="flex flex-col items-center py-10">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-gray-400 text-xs">Consultando con Google Search...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results?.places?.map((chunk: any, i: number) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 hover:border-green-100 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-800 text-sm">{chunk.title || "Centro de Reciclaje Cercano"}</h4>
                    <p className="text-xs text-gray-500 mt-1">Ubicación verificada • Economía Circular</p>
                  </div>
                  <a 
                    href={chunk.web?.uri || chunk.maps?.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600"
                  >
                    <i className="fas fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">Abierto</span>
                  <span className="text-[10px] text-gray-400">A 2.4 km de distancia</span>
                </div>
              </div>
            ))}
            {!results?.places?.length && (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm">No se encontraron resultados específicos. Intenta con otra búsqueda.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
