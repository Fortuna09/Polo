import { CountrySelector } from "./CountrySelector";
import { IndicatorSelector } from "./IndicatorSelector";
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  selectedCountries: string[];
  onCountryChange: (updatedCountries: string[]) => void;
  selectedIndicator: string;
  onIndicatorChange: (indicatorCode: string) => void;
}

const AVAILABLE_YEARS = ['2022', '2021', '2020'];

export function Sidebar({ isOpen, onClose, selectedYear, onYearChange, selectedCountries, onCountryChange, selectedIndicator, onIndicatorChange }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-surface z-40
                   transform transition-transform md:relative md:translate-x-0 md:w-72
                   ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full overflow-y-auto p-6 flex flex-col space-y-6">
          <div className="flex justify-between items-center md:hidden">
            <h2 className="text-lg font-semibold text-text-primary">Filtros</h2>
            <button onClick={onClose} className="p-2 text-text-secondary hover:text-text-primary">
              <X size={24} />
            </button>
          </div>

          <h2 className="hidden text-lg font-semibold text-text-primary md:block">Filtros</h2>

          <IndicatorSelector
            selectedIndicator={selectedIndicator}
            onIndicatorChange={onIndicatorChange}
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-text-secondary">Ano</label>
            {AVAILABLE_YEARS.map(year => (
              <button
                key={year}
                onClick={() => onYearChange(year)}
                className={`p-2 rounded-md text-left font-semibold transition-colors ${selectedYear === year
                    ? 'bg-accent text-text-primary'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
              >
                {year}
              </button>
            ))}
          </div>

          <CountrySelector
            selectedCountries={selectedCountries}
            onCountryChange={onCountryChange}
          />
        </div>
      </aside>
    </>
  )
}