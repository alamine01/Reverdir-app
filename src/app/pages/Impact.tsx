import { useState } from 'react';
import { Leaf, Cloud, Trees, Sprout, Globe, BookOpen, ExternalLink, Trash2, Recycle } from 'lucide-react';
import { toast } from 'sonner';

// Types
interface Tab {
  id: string;
  label: string;
}

interface EducationalCard {
  id: number;
  icon: 'leaf' | 'cloud' | 'trees' | 'sprout' | 'globe';
  emoji: string;
  title: string;
  mainText: string;
  secondaryText: string;
  backgroundColor: string;
  iconColor: string;
}

// Tabs
const tabs: Tab[] = [
  { id: 'forets', label: 'Forêts' },
  { id: 'recyclage', label: 'Recyclage' }
];

// Cartes éducatives
const educationalCards: EducationalCard[] = [
  {
    id: 1,
    icon: 'trees',
    emoji: '🌳',
    title: 'Le pouvoir d\'un arbre',
    mainText: 'Un arbre mature absorbe en moyenne 25 kg de CO₂ par an.',
    secondaryText: 'Il libère également l\'oxygène nécessaire à 4 personnes.',
    backgroundColor: '#F1F8E9',
    iconColor: '#2E7D32'
  },
  {
    id: 2,
    icon: 'sprout',
    emoji: '🌱',
    title: 'La méthode Miyawaki',
    mainText: 'Une micro-forêt pousse 10 fois plus vite qu\'une plantation classique.',
    secondaryText: 'Elle atteint sa maturité en seulement 20 ans au lieu de 200.',
    backgroundColor: '#E8F5E9',
    iconColor: '#A5D6A7'
  },
  {
    id: 3,
    icon: 'cloud',
    emoji: '☁️',
    title: 'Votre empreinte carbone',
    mainText: 'Un Français émet en moyenne 10 tonnes de CO₂ par an.',
    secondaryText: 'Il faudrait 400 arbres pour compenser cette empreinte.',
    backgroundColor: '#E3F2FD',
    iconColor: '#1976D2'
  },
  {
    id: 4,
    icon: 'globe',
    emoji: '🌍',
    title: 'Biodiversité urbaine',
    mainText: 'Une micro-forêt abrite jusqu\'à 30 fois plus d\'espèces animales.',
    secondaryText: 'Elle devient un refuge pour oiseaux, insectes et petits mammifères.',
    backgroundColor: '#FFF3E0',
    iconColor: '#F57C00'
  },
  {
    id: 5,
    icon: 'leaf',
    emoji: '🍃',
    title: 'Qualité de l\'air',
    mainText: 'Les arbres filtrent les particules fines et réduisent la pollution.',
    secondaryText: 'Ils peuvent diminuer la pollution de l\'air urbain jusqu\'à 30%.',
    backgroundColor: '#F3E5F5',
    iconColor: '#7B1FA2'
  }
];

// Icônes mapping
const iconComponents = {
  leaf: Leaf,
  cloud: Cloud,
  trees: Trees,
  sprout: Sprout,
  globe: Globe
};

export function Impact() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('forets');

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="w-full max-w-[430px] mx-auto">
        
        {/* Header */}
        <header className="px-6 pt-8 pb-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Comprendre notre impact
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

        {/* Onglet Forêts */}
        {activeTab === 'forets' && (
          <>
            {/* Carrousel Éducatif - Grandes cartes swipeable */}
            <div className="mb-8">
              <div 
                className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory"
                style={{ 
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {educationalCards.map((card, index) => {
                  const IconComponent = iconComponents[card.icon];
                  return (
                    <div
                      key={card.id}
                      className="flex-shrink-0 w-[85%] snap-center"
                      onClick={() => setActiveCardIndex(index)}
                    >
                      <div 
                        className="rounded-2xl p-6 shadow-md border border-gray-100 h-[340px] flex flex-col justify-between transition-transform hover:scale-[1.02]"
                        style={{ backgroundColor: card.backgroundColor }}
                      >
                        {/* Icône et titre */}
                        <div>
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/80 mb-5 shadow-sm">
                            <IconComponent 
                              className="w-8 h-8" 
                              style={{ color: card.iconColor }}
                              strokeWidth={2}
                            />
                          </div>
                          
                          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            {card.title} {card.emoji}
                          </h2>
                          
                          {/* Texte principal - Grand et impactant */}
                          <p className="text-lg font-medium text-gray-900 leading-relaxed mb-3">
                            {card.mainText}
                          </p>
                          
                          {/* Texte secondaire */}
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {card.secondaryText}
                          </p>
                        </div>

                        {/* Bouton en bas */}
                        <button 
                          onClick={() => toast.info(`L'article "${card.title}" sera bientôt disponible !`)}
                          className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline self-start"
                        >
                          <BookOpen className="w-4 h-4" />
                          Lire l'article complet
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Indicateurs de pagination */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {educationalCards.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeCardIndex 
                        ? 'w-8 bg-[#2E7D32]' 
                        : 'w-1.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Section Chiffres Clés en France */}
            <div className="px-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                La forêt française en bref
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Carte 1 */}
                <div className="bg-gradient-to-br from-[#2E7D32]/5 to-[#A5D6A7]/10 rounded-2xl p-5 border border-[#A5D6A7]/30">
                  <div className="text-4xl font-bold text-[#2E7D32] mb-2">31%</div>
                  <p className="text-sm text-gray-700 leading-snug">
                    du territoire français couvert par les forêts
                  </p>
                  <div className="mt-3 text-xs text-gray-500">
                    Source: ONF
                  </div>
                </div>

                {/* Carte 2 */}
                <div className="bg-gradient-to-br from-[#A5D6A7]/10 to-[#2E7D32]/5 rounded-2xl p-5 border border-[#2E7D32]/20">
                  <div className="text-3xl font-bold text-[#2E7D32] mb-2">10x</div>
                  <p className="text-sm text-gray-700 leading-snug">
                    plus de croissance avec la méthode Miyawaki
                  </p>
                  <div className="mt-3 text-xs text-gray-500">
                    Source: ADEME
                  </div>
                </div>

                {/* Carte 3 */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-200">
                  <div className="text-3xl font-bold text-[#2E7D32] mb-2">17M</div>
                  <p className="text-sm text-gray-700 leading-snug">
                    d'hectares de forêts en France métropolitaine
                  </p>
                  <div className="mt-3 text-xs text-gray-500">
                    Source: IGN
                  </div>
                </div>

                {/* Carte 4 */}
                <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-2xl p-5 text-white">
                  <div className="text-3xl font-bold mb-2">+70k</div>
                  <p className="text-sm leading-snug opacity-95">
                    hectares de forêts plantés chaque année
                  </p>
                  <div className="mt-3 text-xs opacity-75">
                    Source: Ministère
                  </div>
                </div>
              </div>
            </div>

            {/* Section Transparence & Sources */}
            <div className="px-6 mb-8">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <BookOpen className="w-5 h-5 text-[#2E7D32]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      📚 Nos données sont sourcées et vérifiées
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                      Toutes les informations présentées proviennent d'organismes officiels et d'études scientifiques reconnues.
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">
                        • <span className="font-medium">ADEME</span> — Agence de la transition écologique
                      </p>
                      <p className="text-xs text-gray-500">
                        • <span className="font-medium">ONF</span> — Office National des Forêts
                      </p>
                      <p className="text-xs text-gray-500">
                        • <span className="font-medium">Ministère</span> — Ministère de la Transition Écologique
                      </p>
                      <p className="text-xs text-gray-500">
                        • <span className="font-medium">IGN</span> — Institut National de l'Information Géographique
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section supplémentaire : Pourquoi c'est important */}
            <div className="px-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pourquoi c'est important ?
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                    <span className="text-xl">🌡️</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Régulation du climat
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Les forêts stockent du carbone et régulent les températures locales, réduisant les îlots de chaleur urbains.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                    <span className="text-xl">💧</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Gestion de l'eau
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Les arbres filtrent l'eau de pluie et préviennent l'érosion des sols, protégeant nos ressources en eau.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF3E0] flex items-center justify-center">
                    <span className="text-xl">🦋</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Biodiversité locale
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Chaque forêt crée un écosystème unique abritant insectes, oiseaux et mammifères essentiels à notre environnement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Onglet Recyclage */}
        {activeTab === 'recyclage' && (
          <>
            {/* Nouvelle Section : Guide du Tri des Déchets */}
            <div className="px-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Recycle className="w-6 h-6 text-[#2E7D32]" strokeWidth={2} />
                <h2 className="text-lg font-semibold text-gray-900">
                  Guide du tri des déchets
                </h2>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Bien trier, c'est réduire son empreinte carbone. Voici un rappel pour ne plus vous tromper :
              </p>

              {/* Poubelle Jaune */}
              <div className="bg-gradient-to-br from-[#FFF9C4] to-[#FFF59D] rounded-2xl p-5 mb-4 border border-[#FBC02D]/30 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#FBC02D] rounded-full flex items-center justify-center shadow-sm">
                    <Recycle className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Poubelle Jaune ♻️
                    </h3>
                    <p className="text-xs text-gray-700">Emballages recyclables</p>
                  </div>
                </div>
                <div className="bg-white/70 rounded-xl p-4">
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FBC02D] font-bold">✓</span>
                      <span>Bouteilles et flacons en plastique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FBC02D] font-bold">✓</span>
                      <span>Boîtes de conserve, canettes métalliques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FBC02D] font-bold">✓</span>
                      <span>Cartons (briques alimentaires, cartons d'emballage)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FBC02D] font-bold">✓</span>
                      <span>Papiers et journaux</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Poubelle Verte/Grise - Ordures ménagères */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-5 mb-4 border border-gray-300 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center shadow-sm">
                    <Trash2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Ordures Ménagères 🗑️
                    </h3>
                    <p className="text-xs text-gray-700">Déchets non recyclables</p>
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl p-4">
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 font-bold">•</span>
                      <span>Emballages sales ou gras (pizza, fromage...)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 font-bold">•</span>
                      <span>Films plastiques, sacs en plastique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 font-bold">•</span>
                      <span>Couches, mouchoirs, serviettes en papier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-600 font-bold">•</span>
                      <span>Vaisselle cassée, ampoules classiques</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Poubelle Verte - Verre */}
              <div className="bg-gradient-to-br from-[#C8E6C9] to-[#A5D6A7] rounded-2xl p-5 mb-4 border border-[#2E7D32]/30 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🍾</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Conteneur à Verre 🍾
                    </h3>
                    <p className="text-xs text-gray-700">Uniquement le verre</p>
                  </div>
                </div>
                <div className="bg-white/70 rounded-xl p-4">
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-[#2E7D32] font-bold">✓</span>
                      <span>Bouteilles en verre (vin, eau, jus...)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2E7D32] font-bold">✓</span>
                      <span>Bocaux et pots en verre (confiture, conserves...)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span className="text-gray-600">Pas de vaisselle, miroirs, ni ampoules</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Compost - Bonus */}
              <div className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-2xl p-5 border border-[#2E7D32]/20 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#2E7D32]/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Compost (si disponible) 🌱
                    </h3>
                    <p className="text-xs text-gray-700">Déchets organiques</p>
                  </div>
                </div>
                <div className="bg-white/70 rounded-xl p-4">
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-[#2E7D32] font-bold">✓</span>
                      <span>Épluchures de fruits et légumes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2E7D32] font-bold">✓</span>
                      <span>Marc de café, sachets de thé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2E7D32] font-bold">✓</span>
                      <span>Coquilles d'œufs, restes de repas (sans viande ni produits laitiers)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Astuce */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 mt-4">
                <div className="flex items-start gap-2">
                  <span className="text-xl flex-shrink-0">💡</span>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Astuce pour bien trier
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      En cas de doute, ne pas recycler. Un emballage sale dans la poubelle jaune peut contaminer toute la benne et rendre le recyclage impossible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}