import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import './WelcomePage.css';

export function WelcomePage() {
  return (
    <div className="welcome-page-container">
      <div className="galaxy-background" />

      <div className="welcome-content">
        <img src={logo} alt="Polo Logo" className="h-20 w-20 mb-6 animate-smooth-pulse" />
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold mb-4 text-text-primary tracking-wider text-shadow">
          Polo
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mb-8 sm:mb-10 leading-relaxed text-shadow">
          Navegue pelos dados do mundo.
        </p>
        
        <Link
          to="/dashboard"
          className="bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-transform transform hover:scale-105 shadow-lg shadow-accent/20"
        >
          Iniciar Exploração
        </Link>
      </div>
    </div>
  );
}