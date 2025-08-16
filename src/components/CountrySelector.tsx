import { countryNameMap } from '../lib/translations';

const AVAILABLE_COUNTRIES = [
  { code: 'BR', name: 'Brasil' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'Índia' },
  { code: 'DE', name: 'Alemanha' },
  { code: 'JP', name: 'Japão' },
  { code: 'GB', name: 'Reino Unido' },
];

interface CountrySelectorProps {
  selectedCountries: string[];
  onCountryChange: (updatedCountries: string[]) => void;
}

export function CountrySelector({ selectedCountries, onCountryChange }: CountrySelectorProps) {
  const handleCheckboxChange = (countryCode: string) => {
    const newSelection = selectedCountries.includes(countryCode)
      ? selectedCountries.filter(code => code !== countryCode)
      : [...selectedCountries, countryCode];

    onCountryChange(newSelection);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-slate-400">Países</label>
      <div className="max-h-60 overflow-y-auto pr-2">
        {AVAILABLE_COUNTRIES.map(country => (
          <label key={country.code} className="flex items-center space-x-2 p-1 rounded-md hover:bg-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCountries.includes(country.code)}
              onChange={() => handleCheckboxChange(country.code)}
              className="form-checkbox h-4 w-4 bg-slate-600 border-slate-500 rounded text-blue-500 focus:ring-blue-500"
            />
            <span className="text-text-primary">{countryNameMap[country.code] || country.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}