import { useState } from 'react';
import { MapPin, X, TrendingUp, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import franceMapImg from '@/assets/43fe1f5b31aa5d80a299ec3da8432d0ccdb15610.png';

// Types - Page des projets de reforestation
interface Project {
  id: number;
  name: string;
  organization: string;
  type: 'forest' | 'microforest';
  location: { x: number; y: number }; // Position sur la carte (%)
  city: string;
  treesPlanted: number;
  treesGoal: number;
  date: string;
  available: boolean;
  region: string;
}

// Mock data - Projets de plantation
const projects: Project[] = [
  {
    id: 1,
    name: 'Forêt de Bretagne',
    organization: "Reforest'Action",
    type: 'forest',
    location: { x: 25, y: 40 },
    city: 'Brocéliande',
    treesPlanted: 12500,
    treesGoal: 20000,
    date: 'Mai 2026',
    available: true,
    region: 'Bretagne'
  },
  {
    id: 2,
    name: 'Micro-forêt Lyon',
    organization: 'EcoTree',
    type: 'microforest',
    location: { x: 62, y: 54 },
    city: 'Lyon',
    treesPlanted: 850,
    treesGoal: 1000,
    date: 'Avril 2026',
    available: true,
    region: 'Auvergne-Rhône-Alpes'
  },
  {
    id: 3,
    name: 'Forêt des Landes',
    organization: "Plantons pour l'avenir",
    type: 'forest',
    location: { x: 35, y: 60 },
    city: 'Bordeaux',
    treesPlanted: 18000,
    treesGoal: 25000,
    date: 'Juin 2026',
    available: true,
    region: 'Nouvelle-Aquitaine'
  },
  {
    id: 4,
    name: 'Micro-forêt Toulouse',
    organization: 'EcoTree',
    type: 'microforest',
    location: { x: 45, y: 73 },
    city: 'Toulouse',
    treesPlanted: 600,
    treesGoal: 800,
    date: 'Mars 2026',
    available: false,
    region: 'Occitanie'
  },
  {
    id: 5,
    name: 'Forêt Alsacienne',
    organization: "Reforest'Action",
    type: 'forest',
    location: { x: 78, y: 38 },
    city: 'Strasbourg',
    treesPlanted: 9200,
    treesGoal: 15000,
    date: 'Juillet 2026',
    available: true,
    region: 'Grand Est'
  },
  {
    id: 6,
    name: 'Micro-forêt Paris',
    organization: 'Plantons pour l\'avenir',
    type: 'microforest',
    location: { x: 52, y: 40 },
    city: 'Paris',
    treesPlanted: 950,
    treesGoal: 1200,
    date: 'Avril 2026',
    available: true,
    region: 'Île-de-France'
  },
  {
    id: 7,
    name: 'Forêt Normande',
    organization: "Reforest'Action",
    type: 'forest',
    location: { x: 40, y: 32 },
    city: 'Rouen',
    treesPlanted: 7500,
    treesGoal: 12000,
    date: 'Mai 2026',
    available: true,
    region: 'Normandie'
  },
  {
    id: 8,
    name: 'Micro-forêt Marseille',
    organization: 'EcoTree',
    type: 'microforest',
    location: { x: 70, y: 75 },
    city: 'Marseille',
    treesPlanted: 450,
    treesGoal: 800,
    date: 'Juin 2026',
    available: true,
    region: "Provence-Alpes-Côte d'Azur"
  }
];

export function Projets() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'forest' | 'microforest'>('all');

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.type === filter;
  });

  const progress = selectedProject 
    ? (selectedProject.treesPlanted / selectedProject.treesGoal) * 100 
    : 0;

  // Projets à la une (les 3 premiers disponibles)
  const featuredProjects = projects.filter(p => p.available).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-[430px] mx-auto">
        
        {/* Header */}
        <header className="px-6 pt-8 pb-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Projets</h1>
          <p className="text-sm text-gray-600">Découvrez où planter des arbres en France</p>
          
          {/* Filtres */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-[#2E7D32] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter('forest')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === 'forest'
                  ? 'bg-[#2E7D32] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌳 Forêt classique
            </button>
            <button
              onClick={() => setFilter('microforest')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === 'microforest'
                  ? 'bg-[#2E7D32] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌱 Micro-forêt
            </button>
          </div>
        </header>

        {/* Carte de France avec pins */}
        <div className="px-6 mb-6">
          <div className="relative bg-gradient-to-br from-gray-50 to-[#A5D6A7]/5 rounded-2xl p-6 border border-gray-100 shadow-sm">
            
            {/* Image de la carte de France */}
            <div className="relative w-full">
              <img 
                src={franceMapImg} 
                alt="Carte de France" 
                className="w-full h-auto"
                style={{ 
                  maxHeight: '450px',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Pins des projets */}
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="absolute transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform z-10"
                style={{
                  left: `${project.location.x}%`,
                  top: `${project.location.y}%`,
                }}
              >
                <div className="relative">
                  <MapPin
                    className={`w-9 h-9 drop-shadow-lg ${
                      project.type === 'forest'
                        ? 'text-[#2E7D32] fill-[#2E7D32]'
                        : 'text-[#A5D6A7] fill-[#A5D6A7]'
                    }`}
                    strokeWidth={1.5}
                  />
                  {selectedProject?.id === project.id && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2E7D32] rounded-full animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Légende */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#2E7D32] fill-[#2E7D32]" strokeWidth={1.5} />
              <span className="text-xs text-gray-600">Forêt classique</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#A5D6A7] fill-[#A5D6A7]" strokeWidth={1.5} />
              <span className="text-xs text-gray-600">Micro-forêt</span>
            </div>
          </div>
        </div>

        {/* Nouvelle section : Projets près de chez vous */}
        {!selectedProject && (
          <div className="px-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Projets près de chez vous</h2>
              <button 
                onClick={() => toast.info("Affichage de tous les projets à proximité...")}
                className="text-sm text-[#2E7D32] font-medium hover:underline"
              >
                Voir tout
              </button>
            </div>
            
            {/* Carrousel horizontal de projets */}
            <div 
              className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6"
              style={{ 
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {featuredProjects.map((project) => {
                const projectProgress = (project.treesPlanted / project.treesGoal) * 100;
                return (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="flex-shrink-0 w-72 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-gray-900 text-left">
                            {project.name}
                          </h3>
                          <span className="text-base">
                            {project.type === 'forest' ? '🌳' : '🌱'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 text-left">{project.city}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                    
                    {/* Barre de progression mini */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-gray-600">Progression</span>
                        <span className="text-xs font-semibold text-[#2E7D32]">
                          {Math.round(projectProgress)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#2E7D32] to-[#A5D6A7] rounded-full"
                          style={{ width: `${projectProgress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-600">{project.organization}</span>
                      <span className="text-xs font-medium text-[#2E7D32]">{project.date}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Sheet - Détails du projet */}
        {selectedProject && (
          <div className="fixed inset-x-0 bottom-20 bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 animate-in slide-in-from-bottom duration-300 z-50">
            <div className="max-w-[430px] mx-auto px-6 py-6">
              
              {/* En-tête avec bouton fermer */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedProject.name}
                    </h2>
                    {selectedProject.type === 'microforest' && (
                      <span className="text-lg">🌱</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{selectedProject.organization}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Type de projet */}
              {selectedProject.type === 'microforest' && (
                <div className="bg-gradient-to-r from-[#A5D6A7]/20 to-[#2E7D32]/10 rounded-xl p-4 mb-4 border border-[#A5D6A7]/30">
                  <p className="text-sm font-semibold text-[#2E7D32] mb-1">
                    Micro-forêt (Miyawaki)
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Méthode de plantation dense pour une croissance rapide et une biodiversité élevée
                  </p>
                </div>
              )}

              {/* Informations */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Localisation</span>
                  <span className="font-medium text-gray-900">{selectedProject.city}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Date de plantation</span>
                  <span className="font-medium text-gray-900">{selectedProject.date}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Statut</span>
                  <span className={`font-medium ${selectedProject.available ? 'text-[#2E7D32]' : 'text-gray-400'}`}>
                    {selectedProject.available ? 'Disponible' : 'Complet'}
                  </span>
                </div>
              </div>

              {/* Progression */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progression</span>
                  <span className="text-sm font-semibold text-[#2E7D32]">
                    {selectedProject.treesPlanted.toLocaleString('fr-FR')} / {selectedProject.treesGoal.toLocaleString('fr-FR')} arbres
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2E7D32] to-[#A5D6A7] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-[#2E7D32]" />
                  <span className="text-xs text-gray-600">{Math.round(progress)}% complété</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3">
                <button
                  disabled={!selectedProject.available}
                  onClick={() => toast.success(`Merci de votre participation au projet ${selectedProject.name} !`)}
                  className={`flex-1 py-3.5 rounded-full font-medium text-base transition-colors ${
                    selectedProject.available
                      ? 'bg-[#2E7D32] text-white hover:bg-[#1B5E20] shadow-lg shadow-[#2E7D32]/20'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Participer
                </button>
                <button
                  disabled={!selectedProject.available}
                  onClick={() => toast.success(`Ouverture de la fenêtre de financement pour ${selectedProject.name}...`)}
                  className={`flex-1 py-3.5 rounded-full font-medium text-base transition-colors ${
                    selectedProject.available
                      ? 'bg-white text-[#2E7D32] border-2 border-[#2E7D32] hover:bg-[#2E7D32]/5'
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                  }`}
                >
                  Financer
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}