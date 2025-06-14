import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css'

import LandingScreen from './screens/LandingScreen';
import SplashScreen from './screens/SplashScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import DashboardScreen from './screens/DashboardScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingScreen />,
  },
  {
    path: "/projects",
    element: <ProjectsScreen />,
  },
  {
    path: "/dashboard",
    element: <DashboardScreen />,
  },
]);

const App = () => {
  const [showSplashscreen, setShowSplashscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alreadyShown = JSON.parse(localStorage.getItem("showedSplashscreen") || "false");

    if (!alreadyShown) {
      setShowSplashscreen(true);
      setTimeout(() => {
        setShowSplashscreen(false);
        localStorage.setItem("showedSplashscreen", JSON.stringify(true));
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null;

  return showSplashscreen ? (
    <SplashScreen />
  ) : (
    <RouterProvider router={router} />
  );
};

export default App;
