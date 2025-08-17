import logo from '../assets/logo.webp';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-surface p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Polo Logo" className="h-8 w-8" />
        <h1 className="text-2xl font-bold text-text-primary font-serif">Polo</h1>
      </div>
      
      <div className="md:hidden">
        <button 
          onClick={onMenuClick} 
          className="text-text-primary p-2 rounded-md hover:bg-slate-700"
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  )
}