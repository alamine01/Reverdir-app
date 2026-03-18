import { User, TreeDeciduous, Cloud, HandHeart, Shovel, Coins, Lock, ChevronRight, Users as TeamIcon, FileText } from 'lucide-react';
import { toast } from 'sonner';

// Types
interface UserStats {
  treesPlanted: number;
  co2Compensated: number;
  projectsSupported: number;
  petitionsSigned: number;
  teamCity: string;
}

interface Action {
  id: number;
  type: 'plantation' | 'funding' | 'petition';
  title: string;
  location: string;
  date: string;
  impact?: number;
  icon: 'shovel' | 'coins' | 'file-text';
}

interface Badge {
  id: number;
  emoji: string;
  name: string;
  unlocked: boolean;
  progress?: number;
}

// Mock data
const userStats: UserStats = {
  treesPlanted: 12,
  co2Compensated: 300,
  projectsSupported: 2,
  petitionsSigned: 5,
  teamCity: 'Montpellier'
};

const recentActions: Action[] = [
  {
    id: 1,
    type: 'plantation',
    title: 'Plantation Micro-forêt',
    location: 'Montpellier Centre',
    date: '2 Mars 2026',
    impact: 3,
    icon: 'shovel'
  },
  {
    id: 2,
    type: 'funding',
    title: 'Financement de projet',
    location: 'Forêt des Landes',
    date: 'Février 2026',
    impact: 9,
    icon: 'coins'
  },
  {
    id: 3,
    type: 'petition',
    title: 'Signature de pétition',
    location: 'Montpellier',
    date: 'Janvier 2026',
    icon: 'file-text'
  }
];

const badges: Badge[] = [
  {
    id: 1,
    emoji: '🌱',
    name: 'Débutant',
    unlocked: true
  },
  {
    id: 2,
    emoji: '🌿',
    name: 'Contributeur',
    unlocked: true
  },
  {
    id: 3,
    emoji: '🌳',
    name: 'Éco-acteur',
    unlocked: false,
    progress: 60
  }
];

export function Profil() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="w-full max-w-[430px] mx-auto">
        
        {/* Header - Profil utilisateur */}
        <header className="px-6 pt-8 pb-6">
          {/* Photo de profil */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#2E7D32] to-[#A5D6A7] rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-3xl font-semibold text-white">TL</span>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Thomas L.
            </h1>
            <p className="text-sm text-gray-600 mb-3">
              Membre depuis janvier 2025
            </p>
            
            {/* Badge actuel */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8F5E9] rounded-full border border-[#A5D6A7]/30">
              <span className="text-base">🌿</span>
              <span className="text-sm font-medium text-[#2E7D32]">Contributeur</span>
            </div>
          </div>
        </header>

        {/* Tableau de bord personnel - Statistiques */}
        <div className="px-6 mb-8">
          {/* Carte compacte avec équipe et pétitions */}
          <div className="bg-gradient-to-br from-[#2E7D32]/5 to-[#A5D6A7]/10 rounded-2xl p-4 mb-4 border border-[#A5D6A7]/30 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {/* Équipe */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                  <TeamIcon className="w-5 h-5 text-[#2E7D32]" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Équipe</div>
                  <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
                    {userStats.teamCity} <span className="text-xs">🌿</span>
                  </div>
                </div>
              </div>

              {/* Pétitions signées */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#2E7D32]" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Pétitions</div>
                  <div className="text-sm font-bold text-gray-900">
                    {userStats.petitionsSigned} signées
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques compactes */}
          <div className="grid grid-cols-3 gap-3">
            {/* Arbres plantés */}
            <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-2xl p-4 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {userStats.treesPlanted}
                </div>
                <p className="text-xs text-white/90 font-medium">
                  Arbres 🌳
                </p>
              </div>
            </div>

            {/* CO2 compensé */}
            <div className="bg-gradient-to-br from-[#A5D6A7]/20 to-[#2E7D32]/10 rounded-2xl p-4 border border-[#A5D6A7]/30 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2E7D32] mb-1">
                  {userStats.co2Compensated}
                </div>
                <p className="text-xs text-gray-700 font-medium">
                  kg CO₂ ☁️
                </p>
              </div>
            </div>

            {/* Projets soutenus */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2E7D32] mb-1">
                  {userStats.projectsSupported}
                </div>
                <p className="text-xs text-gray-700 font-medium">
                  Projets 🤝
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Historique d'impact */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Vos dernières actions
            </h2>
            <button 
              onClick={() => toast.info("Affichage de votre historique complet d'impact...")}
              className="text-sm text-[#2E7D32] font-medium hover:underline"
            >
              Voir tout
            </button>
          </div>

          <div className="space-y-3">
            {recentActions.map((action) => {
              const IconComponent = action.icon === 'shovel' ? Shovel : action.icon === 'coins' ? Coins : FileText;
              return (
                <div
                  key={action.id}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Icône */}
                    <div className="flex-shrink-0 w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#2E7D32]" strokeWidth={2} />
                    </div>
                    
                    {/* Contenu */}
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {action.location} • {action.date}
                      </p>
                      {action.impact && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#E8F5E9] rounded-full">
                          <span className="text-sm font-semibold text-[#2E7D32]">
                            +{action.impact} arbres
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Badges - Gamification */}
        <div className="px-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Progression
          </h2>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-around mb-6">
              {badges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-2 transition-all ${
                      badge.unlocked
                        ? 'bg-gradient-to-br from-[#2E7D32]/10 to-[#A5D6A7]/20 border-2 border-[#2E7D32] shadow-md'
                        : 'bg-gray-100 border-2 border-gray-300 opacity-50'
                    }`}
                  >
                    {badge.unlocked ? (
                      <span>{badge.emoji}</span>
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      badge.unlocked ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Barre de progression pour le prochain badge */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Prochain badge</span>
                <span className="text-xs font-semibold text-[#2E7D32]">
                  {badges[2].progress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2E7D32] to-[#A5D6A7] rounded-full transition-all duration-500"
                  style={{ width: `${badges[2].progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Plantez 8 arbres de plus pour débloquer "���� Éco-acteur"
              </p>
            </div>
          </div>
        </div>

        {/* Section Paramètres (optionnelle) */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <button 
              onClick={() => toast.info("Ouverture des paramètres du profil...")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <span className="text-sm font-medium text-gray-900">Modifier le profil</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={() => toast.info("Gestion des notifications...")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <span className="text-sm font-medium text-gray-900">Notifications</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={() => toast.info("Accès aux paramètres globaux...")}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900">Paramètres</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}