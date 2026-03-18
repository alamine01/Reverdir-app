import { useState } from 'react';
import { Sprout, Trophy, MapPin, Calendar, Users, ArrowRight, Leaf, ExternalLink, FileText, TrendingUp } from 'lucide-react';

// Types
interface Tab {
  id: string;
  label: string;
}

interface Challenge {
  tag: string;
  emoji: string;
  title: string;
  cities: {
    name: string;
    progress: number;
    trees: number;
    color: string;
  }[];
  userCity: string;
}

interface Workshop {
  id: number;
  type: 'microforet' | 'foret';
  label: string;
  emoji: string;
  title: string;
  organizer: string;
  organizerLogo?: string;
  info: string;
  points?: number;
  buttonText: string;
  backgroundColor: string;
}

interface Petition {
  id: number;
  title: string;
  description: string;
  signatures: number;
  goal: number;
  category: string;
  emoji: string;
  trending?: boolean;
}

// Data
const tabs: Tab[] = [
  { id: 'defis', label: 'Défis' },
  { id: 'petitions', label: 'Pétitions' }
];

const challenge: Challenge = {
  tag: 'Défi du printemps 2026',
  emoji: '🏆',
  title: 'Montpellier VS Nîmes',
  cities: [
    {
      name: 'Montpellier',
      progress: 65,
      trees: 1450,
      color: '#2E7D32'
    },
    {
      name: 'Nîmes',
      progress: 42,
      trees: 980,
      color: '#A5D6A7'
    }
  ],
  userCity: 'Montpellier'
};

const workshops: Workshop[] = [
  {
    id: 1,
    type: 'microforet',
    label: 'Micro-forêt',
    emoji: '🌱',
    title: 'Oasis Urbaine - Port Marianne',
    organizer: 'Reforest\'Action',
    info: 'Samedi prochain',
    points: 500,
    buttonText: 'S\'inscrire',
    backgroundColor: '#E8F5E9'
  },
  {
    id: 2,
    type: 'foret',
    label: 'Forêt',
    emoji: '🌳',
    title: 'Reboisement Garrigue',
    organizer: 'EcoTree',
    info: 'Avril 2026 • Chênes verts',
    buttonText: 'Voir détails',
    backgroundColor: '#F1F8E9'
  }
];

const petitions: Petition[] = [
  {
    id: 1,
    title: 'Créer une micro-forêt dans chaque quartier de Montpellier',
    description: 'Demandez à la mairie de Montpellier de créer des micro-forêts urbaines dans tous les quartiers pour améliorer la qualité de l\'air et la biodiversité.',
    signatures: 8450,
    goal: 10000,
    category: 'Urbanisme',
    emoji: '🌳',
    trending: true
  },
  {
    id: 2,
    title: 'Protéger les forêts méditerranéennes contre les incendies',
    description: 'Signez pour renforcer les moyens de prévention et de lutte contre les feux de forêt dans le sud de la France.',
    signatures: 12350,
    goal: 15000,
    category: 'Protection',
    emoji: '🔥'
  },
  {
    id: 3,
    title: 'Planter 1 million d\'arbres en Occitanie d\'ici 2027',
    description: 'Soutenez l\'initiative régionale pour planter massivement des arbres locaux et lutter contre le réchauffement climatique.',
    signatures: 23680,
    goal: 50000,
    category: 'Climat',
    emoji: '🌱',
    trending: true
  }
];

export function Planter() {
  const [activeTab, setActiveTab] = useState('defis');

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="w-full max-w-[430px] mx-auto">
        
        {/* Header */}
        <header className="px-6 pt-8 pb-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Passer à l'action
          </h1>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#2E7D32] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Contenu basé sur le filtre actif */}
        {activeTab === 'defis' && (
          <>
            {/* Bloc 1 : Le Derby de la Biodiversité */}
            <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-[#2E7D32]/5 to-[#A5D6A7]/10 rounded-2xl p-6 border border-[#2E7D32]/20 shadow-md">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full mb-4 shadow-sm">
              <span className="text-base">{challenge.emoji}</span>
              <span className="text-xs font-semibold text-[#2E7D32]">
                {challenge.tag}
              </span>
            </div>

            {/* Titre */}
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              {challenge.title}
            </h2>

            {/* Jauges de progression */}
            <div className="space-y-4 mb-4">
              {challenge.cities.map((city, index) => (
                <div key={city.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {city.name}
                      </span>
                      {city.name === challenge.userCity && (
                        <span className="text-xs">🌿</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold" style={{ color: city.color }}>
                        {city.progress}%
                      </span>
                      <span className="text-xs text-gray-600 ml-2">
                        {city.trees} arbres
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-500 shadow-sm"
                      style={{
                        width: `${city.progress}%`,
                        backgroundColor: city.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Info utilisateur */}
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-white/60 rounded-xl px-4 py-2.5 mt-4">
              <Trophy className="w-4 h-4 text-[#2E7D32]" />
              <span>Votre équipe : <span className="font-semibold">{challenge.userCity}</span> 🌿</span>
            </div>
          </div>
        </div>

        {/* Bloc 2 : Action Rapide */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-[#E8F5E9] to-[#F1F8E9] rounded-2xl p-6 border border-[#A5D6A7]/30 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
                <Leaf className="w-6 h-6 text-[#2E7D32]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Compensez votre mois
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Financez 3 arbres pour annuler vos émissions récentes et faire gagner <span className="font-semibold text-[#2E7D32]">300 pts</span> à Montpellier.
                </p>
              </div>
            </div>

            <button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2">
              <span>Financer (15€)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bloc 3 : Chantiers Locaux & Associations */}
        <div className="mb-6">
          <div className="px-6 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Rejoindre le terrain
            </h2>
          </div>

          {/* Carrousel horizontal */}
          <div 
            className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6"
            style={{ 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="flex-shrink-0 w-[85%]"
              >
                <div 
                  className="rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all h-full flex flex-col"
                  style={{ backgroundColor: workshop.backgroundColor }}
                >
                  {/* Label */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full mb-3 self-start shadow-sm">
                    <span className="text-sm">{workshop.emoji}</span>
                    <span className="text-xs font-semibold text-gray-900">
                      {workshop.label}
                    </span>
                  </div>

                  {/* Titre */}
                  <h3 className="text-base font-bold text-gray-900 mb-3">
                    {workshop.title}
                  </h3>

                  {/* Organisateur */}
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      Organisé par <span className="font-medium">{workshop.organizer}</span>
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      {workshop.info}
                    </span>
                  </div>

                  {/* Points si applicable */}
                  {workshop.points && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2E7D32]/10 rounded-full mb-4 self-start">
                      <Trophy className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span className="text-xs font-semibold text-[#2E7D32]">
                        +{workshop.points} pts équipe
                      </span>
                    </div>
                  )}

                  {/* Bouton */}
                  <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-xl border border-gray-200 shadow-sm transition-all mt-auto flex items-center justify-center gap-2">
                    <span>{workshop.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bloc 4 : Éducation rapide */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                <Sprout className="w-5 h-5 text-[#2E7D32]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Essences locales méditerranéennes
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Découvrez les espèces adaptées au climat méditerranéen : Pin d'Alep, Micocoulier, Chêne vert, Arbousier...
                </p>
                <button className="flex items-center gap-1.5 text-xs font-medium text-[#2E7D32] hover:underline">
                  <span>Voir le catalogue</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section supplémentaire : Chiffres en temps réel */}
        <div className="px-6 mb-6">
          <div className="bg-[#2E7D32] rounded-2xl p-6 shadow-md text-white">
            <h3 className="text-sm font-semibold mb-4 opacity-90">
              En direct sur Reverdir
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold mb-1">247</div>
                <div className="text-xs opacity-80">Arbres plantés aujourd'hui</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">89</div>
                <div className="text-xs opacity-80">Participants actifs</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-xs opacity-80">Chantiers en cours</div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}

        {/* Onglet Pétitions */}
        {activeTab === 'petitions' && (
          <>
            <div className="px-6 mb-4">
              <p className="text-sm text-gray-600">
                Soutenez les initiatives locales et nationales pour planter plus d'arbres et protéger nos forêts.
              </p>
            </div>

            <div className="px-6 mb-6">
              <div className="space-y-4">
            {petitions.map((petition) => {
              const progressPercentage = (petition.signatures / petition.goal) * 100;
              return (
                <div
                  key={petition.id}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  {/* En-tête avec catégorie et trending */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                      <span className="text-sm">{petition.emoji}</span>
                      <span className="text-xs font-semibold text-gray-700">
                        {petition.category}
                      </span>
                    </div>
                    {petition.trending && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#2E7D32]/10 rounded-full">
                        <TrendingUp className="w-3 h-3 text-[#2E7D32]" />
                        <span className="text-xs font-semibold text-[#2E7D32]">
                          Tendance
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Titre */}
                  <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                    {petition.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {petition.description}
                  </p>

                  {/* Barre de progression */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {petition.signatures.toLocaleString('fr-FR')} signatures
                      </span>
                      <span className="text-xs text-gray-600">
                        Objectif : {petition.goal.toLocaleString('fr-FR')}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#2E7D32] to-[#A5D6A7] rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Bouton */}
                  <button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-all hover:shadow-md flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Signer la pétition</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
          </>
        )}

      </div>
    </div>
  );
}