import { TrendingUp, Calculator, Users as UsersIcon, Leaf as LeafIcon, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import logo from '@/assets/bd9c242629bff985268a8aaaaaa8d8d2eef0be12.png';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/components/ui/dialog";

// Mock data pour les émissions sur 7 jours
const emissionsData = [
  { id: 1, day: 'Lun', emissions: 842 },
  { id: 2, day: 'Mar', emissions: 856 },
  { id: 3, day: 'Mer', emissions: 831 },
  { id: 4, day: 'Jeu', emissions: 867 },
  { id: 5, day: 'Ven', emissions: 849 },
  { id: 6, day: 'Sam', emissions: 823 },
  { id: 7, day: 'Auj', emissions: 875 },
];

// Mock data pour la qualité de l'air (μg/m³)
const airQualityDataToday = [
  { id: 1, hour: '0h', co2: 420, no2: 35, pm10: 28, pm25: 18 },
  { id: 2, hour: '3h', co2: 415, no2: 32, pm10: 25, pm25: 16 },
  { id: 3, hour: '6h', co2: 425, no2: 40, pm10: 32, pm25: 20 },
  { id: 4, hour: '9h', co2: 445, no2: 48, pm10: 38, pm25: 24 },
  { id: 5, hour: '12h', co2: 460, no2: 52, pm10: 42, pm25: 28 },
  { id: 6, hour: '15h', co2: 455, no2: 50, pm10: 40, pm25: 26 },
  { id: 7, hour: '18h', co2: 465, no2: 55, pm10: 45, pm25: 30 },
  { id: 8, hour: '21h', co2: 440, no2: 42, pm10: 35, pm25: 22 },
];

const airQualityDataTomorrow = [
  { id: 1, hour: '0h', co2: 418, no2: 33, pm10: 26, pm25: 17 },
  { id: 2, hour: '3h', co2: 412, no2: 30, pm10: 23, pm25: 15 },
  { id: 3, hour: '6h', co2: 422, no2: 38, pm10: 30, pm25: 19 },
  { id: 4, hour: '9h', co2: 442, no2: 46, pm10: 36, pm25: 23 },
  { id: 5, hour: '12h', co2: 458, no2: 50, pm10: 40, pm25: 27 },
  { id: 6, hour: '15h', co2: 453, no2: 48, pm10: 38, pm25: 25 },
  { id: 7, hour: '18h', co2: 462, no2: 53, pm10: 43, pm25: 29 },
  { id: 8, hour: '21h', co2: 438, no2: 40, pm10: 33, pm25: 21 },
];

const pollutantInfo = {
  co2: { label: 'CO₂', unit: 'ppm', color: '#2E7D32' },
  no2: { label: 'NO₂', unit: 'μg/m³', color: '#FF6B35' },
  pm10: { label: 'PM10', unit: 'μg/m³', color: '#4A90E2' },
  pm25: { label: 'PM2.5', unit: 'μg/m³', color: '#9B59B6' },
};

const cities = ['Béziers', 'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Montpellier'];

// Fonction pour déterminer la qualité de l'air
const getAirQuality = (pollutant: string, value: number) => {
  // Seuils simplifiés pour la démonstration
  if (pollutant === 'co2') {
    if (value < 430) return { label: 'Bon', color: '#2E7D32', bgColor: '#A5D6A7' };
    if (value < 450) return { label: 'Moyen', color: '#F57C00', bgColor: '#FFB74D' };
    return { label: 'Mauvais', color: '#D32F2F', bgColor: '#EF5350' };
  } else if (pollutant === 'no2') {
    if (value < 40) return { label: 'Bon', color: '#2E7D32', bgColor: '#A5D6A7' };
    if (value < 50) return { label: 'Moyen', color: '#F57C00', bgColor: '#FFB74D' };
    return { label: 'Mauvais', color: '#D32F2F', bgColor: '#EF5350' };
  } else if (pollutant === 'pm10') {
    if (value < 30) return { label: 'Bon', color: '#2E7D32', bgColor: '#A5D6A7' };
    if (value < 40) return { label: 'Moyen', color: '#F57C00', bgColor: '#FFB74D' };
    return { label: 'Mauvais', color: '#D32F2F', bgColor: '#EF5350' };
  } else { // pm25
    if (value < 20) return { label: 'Bon', color: '#2E7D32', bgColor: '#A5D6A7' };
    if (value < 25) return { label: 'Moyen', color: '#F57C00', bgColor: '#FFB74D' };
    return { label: 'Mauvais', color: '#D32F2F', bgColor: '#EF5350' };
  }
};

export function Home() {
  // Données actuelles
  const currentEmissions = 875; // tonnes de CO2
  const percentageChange = 2.3; // pourcentage par rapport à hier
  const treesNeeded = 43750; // arbres nécessaires (1 arbre absorbe ~20kg CO2/an)

  // États pour le toggle entre les graphiques
  const [selectedGraph, setSelectedGraph] = useState<'emissions' | 'airQuality'>('emissions');

  // États pour la section qualité de l'air
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow'>('today');
  const [selectedPollutant, setSelectedPollutant] = useState<'co2' | 'no2' | 'pm10' | 'pm25'>('co2');
  const [selectedCity, setSelectedCity] = useState('Béziers');

  // Données actives selon le jour sélectionné
  const activeData = selectedDay === 'today' ? airQualityDataToday : airQualityDataTomorrow;
  
  // Calcul de la moyenne pour le polluant sélectionné
  const averageValue = Math.round(
    activeData.reduce((sum, item) => sum + item[selectedPollutant], 0) / activeData.length
  );
  
  // Qualité de l'air actuelle
  const currentAirQuality = getAirQuality(selectedPollutant, averageValue);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Container mobile */}
      <div className="w-full max-w-[430px] mx-auto py-8 px-6">
        
        {/* 1. Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Reverdir Logo" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="text-3xl font-semibold text-[#2E7D32] mb-3">Reverdir</h1>
          <p className="text-lg text-gray-700 mb-2">Agir pour reverdir la France</p>
          <p className="text-sm text-gray-500">Comprendre et réduire son impact</p>
        </header>

        {/* 2. Section principale CO2 - Point focal */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
            Aujourd'hui en France
          </p>
          <div className="mb-2">
            <h2 className="text-6xl font-bold text-gray-900 mb-1">
              {currentEmissions.toLocaleString('fr-FR')}
            </h2>
            <p className="text-xl text-gray-600">tonnes de CO₂</p>
          </div>
          <div className="flex items-center justify-center gap-1 text-red-500">
            <TrendingUp className="w-4 h-4" />
            <p className="text-sm font-medium">+{percentageChange}% par rapport à hier</p>
          </div>
        </div>

        {/* 3. Toggle entre les graphiques */}
        <div className="mb-10">
          {/* Boutons de filtre */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSelectedGraph('emissions')}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                selectedGraph === 'emissions'
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
              }`}
            >
              Évolution des émissions
            </button>
            <button
              onClick={() => setSelectedGraph('airQuality')}
              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                selectedGraph === 'airQuality'
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
              }`}
            >
              Qualité de l'air
            </button>
          </div>

          {/* Graphique Évolution des émissions */}
          {selectedGraph === 'emissions' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={emissionsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    key="x-axis"
                  />
                  <YAxis 
                    hide 
                    key="y-axis"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`${value} tonnes`, 'CO₂']}
                    key="tooltip"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#2E7D32" 
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 4, fill: '#2E7D32' }}
                    key="emissions-line"
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Section qualité de l'air */}
          {selectedGraph === 'airQuality' && (
            <div>
              {/* Sélecteur de ville */}
              <div className="mb-4">
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Toggle Aujourd'hui / Demain */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSelectedDay('today')}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    selectedDay === 'today'
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                  }`}
                >
                  Aujourd'hui
                </button>
                <button
                  onClick={() => setSelectedDay('tomorrow')}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    selectedDay === 'tomorrow'
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                  }`}
                >
                  Demain
                </button>
              </div>

              {/* Sélecteur de polluant */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {Object.entries(pollutantInfo).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPollutant(key as any)}
                    className={`px-4 py-2 rounded-lg font-medium text-xs whitespace-nowrap transition-all ${
                      selectedPollutant === key
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                    }`}
                    style={{
                      backgroundColor: selectedPollutant === key ? info.color : undefined
                    }}
                  >
                    {info.label}
                  </button>
                ))}
              </div>

              {/* Graphique */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={activeData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis 
                      dataKey="hour" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 11 }}
                      key="air-x-axis"
                    />
                    <YAxis 
                      hide 
                      key="air-y-axis"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value) => [`${value} ${pollutantInfo[selectedPollutant].unit}`, pollutantInfo[selectedPollutant].label]}
                      key="air-tooltip"
                    />
                    <Bar 
                      dataKey={selectedPollutant}
                      fill={pollutantInfo[selectedPollutant].color}
                      radius={[8, 8, 0, 0]}
                      key="air-bar"
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Récapitulatif qualité de l'air */}
              <div 
                className="rounded-2xl p-5 border"
                style={{ 
                  backgroundColor: `${currentAirQuality.bgColor}30`,
                  borderColor: `${currentAirQuality.bgColor}80`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">
                      Qualité de l'air {selectedDay === 'today' ? "aujourd'hui" : 'demain'}
                    </p>
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: currentAirQuality.color }}
                    >
                      {currentAirQuality.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Moyenne</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {averageValue} <span className="text-sm">{pollutantInfo[selectedPollutant].unit}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Carte impact (CO2 → arbres) */}
        <div className="bg-gradient-to-br from-[#A5D6A7]/20 to-[#2E7D32]/10 rounded-2xl p-6 mb-8 border border-[#A5D6A7]/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🌳</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Impact environnemental
              </h3>
              <p className="text-2xl font-bold text-[#2E7D32] mb-1">
                {treesNeeded.toLocaleString('fr-FR')} arbres
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nombre d'arbres nécessaires pour absorber ces émissions
              </p>
            </div>
          </div>
        </div>

        {/* 5. Bouton principal CTA avec Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full bg-[#2E7D32] text-white py-4 rounded-full font-medium text-lg mb-6 hover:bg-[#1B5E20] transition-colors shadow-lg shadow-[#2E7D32]/20">
              Agir maintenant
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#2E7D32]">Agir pour la planète</DialogTitle>
              <DialogDescription>
                Choisissez comment vous souhaitez contribuer aujourd'hui.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <button 
                onClick={() => toast.info("Calculateur d'empreinte en cours de chargement...")}
                className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors text-left"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Calculer mon empreinte</h4>
                  <p className="text-xs text-blue-700">Comprendre votre impact réel</p>
                </div>
              </button>
              
              <button 
                onClick={() => toast.info("Recherche des chantiers participatifs...")}
                className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-100 hover:bg-green-100 transition-colors text-left"
              >
                <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center text-white">
                  <UsersIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">Rejoindre un chantier</h4>
                  <p className="text-xs text-green-700">Participer physiquement à une plantation</p>
                </div>
              </button>

              <button 
                onClick={() => toast.info("Ouverture du formulaire de don...")}
                className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-colors text-left"
              >
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <LeafIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-orange-900">Financer une forêt</h4>
                  <p className="text-xs text-orange-700">Soutenir des projets de reforestation</p>
                </div>
              </button>
            </div>
            <div className="flex justify-center">
              <DialogClose asChild>
                <button className="text-sm text-gray-400 hover:text-gray-600 font-medium">
                  Plus tard
                </button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        {/* 6. Carte secondaire */}
        <div 
          onClick={() => toast.info("Chargement des options de reforestation...")}
          className="bg-gray-50 rounded-2xl p-6 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            Passez à l'action
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Participez à des projets de reforestation près de chez vous ou financez la plantation d'arbres
          </p>
        </div>

      </div>
    </div>
  );
}