import { useState, useEffect } from 'react';

//components
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { BarChart } from '../components/BarChart';
import { LineChart } from '../components/LineChart';
import { ChartSkeleton } from '../components/ChartSkeleton';
import { WorldMap } from '../components/WorldMap';

//services and libs
import { fetchWorldBankData } from '../services/worldBankApi';
import { countryNameMap } from '../lib/translations';
import { INDICATORS } from '../lib/indicators';
import type { Indicator } from '../lib/indicators';


function formatValue(value: number, unit: string) {
  if (value === null) return 'N/A';
  if (unit === 'US$') {
    if (value >= 1e12) return (value / 1e12).toFixed(2) + 'T';
    if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B';
  }
  if (unit === 'Anos') {
    return value.toFixed(1);
  }
  return new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(value);
}

function getCssVariable(variable: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

export function DashboardPage() {
  const [apiData, setApiData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCountries, setSelectedCountries] = useState<string[]>(['BR', 'US', 'CN', 'IN', 'DE']);
  const [selectedYear, setSelectedYear] = useState('2022');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'map'>('bar');
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator>(INDICATORS[0]);

  useEffect(() => {
    if (selectedCountries.length > 0) {
      async function loadData() {
        setIsLoading(true);
        try {
          const data = await fetchWorldBankData(selectedCountries, selectedIndicator.code);
          setApiData(data);
        } catch (error) {
          console.error("Falha ao carregar dados", error);
        } finally {
          setIsLoading(false);
        }
      }
      loadData();
    } else {
      setApiData([]);
    }
  }, [selectedCountries, selectedIndicator]);

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      if (chartType === 'bar' || chartType === 'map') {
        const filteredData = apiData.filter(item => item.date === selectedYear && item.value !== null);
        setChartData({
          labels: filteredData.map(item => countryNameMap[item.country.id] || item.country.value),
          rawData: filteredData.map(item => ({
            countryCode: item.country.id,
            value: item.value,
            name: countryNameMap[item.country.id] || item.country.value
          })),
          datasets: [{
            label: `${selectedIndicator.label} em ${selectedYear}`,
            data: filteredData.map(item => item.value),
            backgroundColor: getCssVariable('--accent') + 'B3',
            borderColor: getCssVariable('--accent'),
            borderWidth: 1,
            borderRadius: 4,
          }],
        });
      } else {
        const years = [...new Set(apiData.map(item => item.date))].sort((a, b) => Number(a) - Number(b));

        const datasets = selectedCountries.map(countryCode => {
          const countryName = countryNameMap[countryCode] || countryCode;
          const color = `rgba(${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55}, 1)`;

          return {
            label: countryName,
            data: years.map(year => {
              const dataPoint = apiData.find(d => d.country.id === countryCode && d.date === year);
              return dataPoint ? dataPoint.value : null;
            }),
            borderColor: color,
            backgroundColor: color,
            fill: false,
            tension: 0.2
          };
        });
        setChartData({ labels: years, datasets });
      }
    } else {
      setChartData(null);
    }
  }, [apiData, selectedYear, chartType, selectedCountries, selectedIndicator]);



  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          color: 'rgb(156, 163, 175)',
          callback: function (value: string | number) {
            return formatValue(Number(value), selectedIndicator.unit);
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: chartType === 'line',
        position: 'top' as const,
        labels: {
          color: 'rgb(156, 163, 175)'
        }
      },
      title: {
        display: true,
        text: chartType === 'bar' || chartType === 'map'
          ? `${selectedIndicator.label} em ${selectedYear}`
          : `Tendência de ${selectedIndicator.label}`,
        color: 'rgb(255, 255, 255)',
        font: {
          size: 18
        }
      },
      tooltip: {
        backgroundColor: 'rgb(15, 23, 42)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y;
            if (value === null) return '';
            const formattedValue = formatValue(value, selectedIndicator.unit);
            let label = context.dataset.label || '';
            if (chartType !== 'line' && label) {
              label = context.label || '';
            }

            if (label) {
              label += ': ';
            }
            return `${label}${formattedValue}`;
          }
        }
      }
    },
  };

  return (
    <div className="h-screen bg-background text-text-primary flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          selectedCountries={selectedCountries}
          onCountryChange={setSelectedCountries}
          selectedIndicator={selectedIndicator.code}
          onIndicatorChange={(indicatorCode) => {
            const newIndicator = INDICATORS.find(ind => ind.code === indicatorCode);
            if (newIndicator) setSelectedIndicator(newIndicator);
          }}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center bg-surface rounded-lg p-1">
              <button
                onClick={() => setChartType('bar')}
                className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors ${chartType === 'bar' ? 'bg-accent text-white' : 'text-slate-400 hover:bg-slate-700'
                  }`}
              >
                Comparação
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors ${chartType === 'line' ? 'bg-accent text-white' : 'text-slate-400 hover:bg-slate-700'
                  }`}
              >
                Tendência
              </button>
              <button
                onClick={() => setChartType('map')}
                className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors ${chartType === 'map' ? 'bg-accent text-white' : 'text-slate-400 hover:bg-slate-700'
                  }`}
              >
                Mapa
              </button>
            </div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg h-[500px] relative flex justify-center items-center">
            {isLoading ? <ChartSkeleton /> : (
              chartData ? (
                <>
                  {(chartType === 'bar') && <BarChart options={chartOptions} data={chartData} />}
                  {chartType === 'line' && <LineChart options={chartOptions} data={chartData} />}
                  {chartType === 'map' && <WorldMap data={chartData.rawData} selectedIndicator={selectedIndicator} />}                </>
              ) : (
                <p className="text-slate-400">Dados não disponíveis para a seleção atual ou nenhum país selecionado.</p>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}