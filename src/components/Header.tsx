import logo from '../assets/logo.webp';

export function Header() {
  return (
    <header className="bg-surface p-4 border-b border-border">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Polo Logo" className="h-8 w-8" />
        <h1 className="text-2xl font-bold text-text-primary font-serif">Polo</h1>
      </div>
    </header>
  )
}