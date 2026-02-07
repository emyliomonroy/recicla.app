
import React, { useState, useRef } from 'react';
import { verifyRecyclingImage } from '../services/geminiService';
import { RecyclingActivity, MaterialType } from '../types';
import { POINTS_PER_KG } from '../constants';

interface RecycleScannerProps {
  onRecycle: (activity: RecyclingActivity) => void;
}

const RecycleScanner: React.FC<RecycleScannerProps> = ({ onRecycle }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setPreview(reader.result as string);
        analyzeImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64: string) => {
    setLoading(true);
    const aiResult = await verifyRecyclingImage(base64);
    setResult(aiResult);
    setLoading(false);
  };

  const confirmRecycle = () => {
    if (result) {
      const material = result.material.toUpperCase() as MaterialType;
      const points = Math.round((POINTS_PER_KG[material] || 10) * result.pesoEstimado);
      
      const newActivity: RecyclingActivity = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        material: material,
        quantity: result.pesoEstimado,
        pointsEarned: points
      };
      
      onRecycle(newActivity);
      setPreview(null);
      setResult(null);
      alert(`¡Felicidades! Ganaste ${points} puntos por reciclar ${result.pesoEstimado}kg de ${result.material}.`);
    }
  };

  return (
    <div className="flex flex-col items-center py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Registrar Reciclaje</h1>
        <p className="text-gray-500">Sube una foto de lo que vas a reciclar para ganar puntos.</p>
      </div>

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-square max-w-sm bg-white border-2 border-dashed border-green-300 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-green-50 transition-colors"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl">
            <i className="fas fa-camera"></i>
          </div>
          <p className="font-semibold text-green-800">Tocar para tomar foto</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="w-full max-w-sm">
          <div className="relative rounded-3xl overflow-hidden shadow-xl mb-6">
            <img src={preview} alt="Vista previa" className="w-full h-auto" />
            {loading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold">Analizando material con IA...</p>
                <p className="text-xs opacity-80 mt-2">Nuestra IA está identificando el material y estimando el peso.</p>
              </div>
            )}
          </div>

          {result && !loading && (
            <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm animate-slide-up">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-check-circle text-green-500"></i>
                ¡Análisis Completado!
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Material</span>
                  <span className="font-bold text-gray-900 uppercase">{result.material}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Peso Estimado</span>
                  <span className="font-bold text-gray-900">{result.pesoEstimado} kg</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Puntos a ganar</span>
                  <span className="font-bold text-green-600">
                    +{Math.round((POINTS_PER_KG[result.material.toUpperCase() as MaterialType] || 10) * result.pesoEstimado)} pts
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setPreview(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Reintentar
                </button>
                <button 
                  onClick={confirmRecycle}
                  className="flex-1 py-3 px-4 rounded-xl bg-green-600 font-bold text-white hover:bg-green-700 shadow-lg shadow-green-100"
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3 max-w-sm">
        <i className="fas fa-lightbulb text-amber-500 mt-1"></i>
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Tip Pro:</strong> Asegúrate de que el material esté limpio y seco para obtener la mejor puntuación posible.
        </p>
      </div>
    </div>
  );
};

export default RecycleScanner;
