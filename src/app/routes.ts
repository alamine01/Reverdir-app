import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Projets } from './pages/Projets';
import { Planter } from './pages/Planter';
import { Impact } from './pages/Impact';
import { Profil } from './pages/Profil';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'projets', Component: Projets },
      { path: 'planter', Component: Planter },
      { path: 'impact', Component: Impact },
      { path: 'profil', Component: Profil },
    ],
  },
]);
