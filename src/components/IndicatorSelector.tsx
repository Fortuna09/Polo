import { INDICATORS, Indicator } from '../lib/indicators';

interface IndicatorSelectorProps {
  selectedIndicator: string;
  onIndicatorChange: (indicatorCode: string) => void;
}

export function IndicatorSelector({ selectedIndicator, onIndicatorChange }: IndicatorSelectorProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="indicator-select" className="text-sm text-slate-400">
        Indicador
      </label>
      <select
        id="indicator-select"
        value={selectedIndicator}
        onChange={(e) => onIndicatorChange(e.target.value)}
        className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {INDICATORS.map((indicator: Indicator) => (
          <option key={indicator.code} value={indicator.code}>
            {indicator.label}
          </option>
        ))}
      </select>
    </div>
  );
}