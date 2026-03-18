import { NavLink, Outlet } from 'react-router';
import { Home, Map, Sprout, BookOpen, User } from 'lucide-react';

export function Layout() {
  const navItems = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/projets', icon: Map, label: 'Projets' },
    { to: '/planter', icon: Sprout, label: 'Planter' },
    { to: '/impact', icon: BookOpen, label: 'Impact' },
    { to: '/profil', icon: User, label: 'Profil' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Contenu principal */}
      <main className="flex-1 overflow-auto pb-20">
        <Outlet />
      </main>

      {/* Navigation inférieure */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-[430px] mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#2E7D32]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className="w-6 h-6"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
