interface SidebarProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const AVAILABLE_YEARS = ['2022', '2021', '2020'];

export function Sidebar({ selectedYear, onYearChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-800 p-6 flex flex-col">
      <h2 className="text-lg font-semibold text-white mb-4">Filtros</h2>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-slate-400">Ano</label>
        {AVAILABLE_YEARS.map(year => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={`
              p-2 rounded-md text-left font-semibold transition-colors
              ${selectedYear === year 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}
            `}
          >
            {year}
          </button>
        ))}
      </div>
    </aside>
  )
}