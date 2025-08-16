import { CountrySelector } from "./CountrySelector";
import { IndicatorSelector } from "./IndicatorSelector";

interface SidebarProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  selectedCountries: string[];
  onCountryChange: (updatedCountries: string[]) => void;
  selectedIndicator: string;
  onIndicatorChange: (indicatorCode: string) => void;
}

const AVAILABLE_YEARS = ['2022', '2021', '2020'];

export function Sidebar({ selectedYear, onYearChange, selectedCountries, onCountryChange, selectedIndicator, onIndicatorChange }: SidebarProps) {
  return (
    <aside className="w-72 bg-surface p-6 flex flex-col space-y-6"> 
      <h2 className="text-lg font-semibold text-text-primary">Filtros</h2>

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
            className={`p-2 rounded-md text-left font-semibold transition-colors ${
              selectedYear === year 
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
    </aside>
  )
}