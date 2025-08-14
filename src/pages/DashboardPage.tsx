import { useState, useEffect } from 'react';

//components
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { BarChart } from '../components/BarChart';
import { LineChart } from '../components/LineChart';
import { ChartSkeleton } from '../components/ChartSkeleton';
import { WorldMap } from '../components/WorldMap';

//services
import { fetchGdpData } from '../services/worldBankApi';
import { countryNameMap } from '../lib/translations'


function formatLargeNumber(value: number) {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + 'T';
  }
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  }
  return value.toString();
}

export function DashboardPage() {
  const [gdpData, setGdpData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCountries, setSelectedCountries] = useState<string[]>(['BR', 'US', 'CN', 'IN', 'DE']);
  const [selectedYear, setSelectedYear] = useState('2022');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'map'>('bar');

  useEffect(() => {
    if (selectedCountries.length > 0) {
      async function loadData() {
        setIsLoading(true);
        try {
          const data = await fetchGdpData(selectedCountries);
          setGdpData(data);
        } catch (error) {
          console.error("Falha ao carregar dados", error);
        } finally {
          setIsLoading(false);
        }
      }
      loadData();
    } else {
      setGdpData([]);
    }
  }, [selectedCountries]);

  useEffect(() => {
    if (gdpData && gdpData.length > 0) {
      if (chartType === 'bar' || chartType === 'map') {
        const filteredData = gdpData.filter(item => item.date === selectedYear && item.value !== null);
        setChartData({
          labels: filteredData.map(item => countryNameMap[item.country.id] || item.country.value),
          rawData: filteredData.map(item => ({ 
            countryCode: item.country.id, 
            value: item.value,
            name: countryNameMap[item.country.id] || item.country.value
          })),
          datasets: [{
            label: `PIB em ${selectedYear} (US$)`,
            data: filteredData.map(item => item.value),
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 1,
            borderRadius: 4,
          }],
        });
      } else {
        const years = [...new Set(gdpData.map(item => item.date))].sort((a, b) => Number(a) - Number(b));

        const datasets = selectedCountries.map(countryCode => {
          const countryName = countryNameMap[countryCode] || countryCode;
          const color = `rgba(${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55}, ${Math.floor(Math.random() * 200) + 55}, 1)`;

          return {
            label: countryName,
            data: years.map(year => {
              const dataPoint = gdpData.find(d => d.country.id === countryCode && d.date === year);
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
  }, [gdpData, selectedYear, chartType, selectedCountries]);



  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          color: 'rgb(156, 163, 175)',
          callback: function (value: string | number) {
            return formatLargeNumber(Number(value));
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
        text: chartType === 'bar'
          ? `PIB por País em ${selectedYear} (US$)`
          : 'Tendência do PIB ao Longo dos Anos',
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
            const formattedValue = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              maximumFractionDigits: 2
            }).format(value);
            let label = context.dataset.label || '';
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
    <div className="h-screen bg-slate-900 text-white flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          selectedCountries={selectedCountries}
          onCountryChange={setSelectedCountries}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setChartType('bar')}
                className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors ${chartType === 'bar' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'
                  }`}
              >
                Comparação
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors ${chartType === 'line' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'
                  }`}
              >
                Tendência
              </button>
              <button
                onClick={() => setChartType('map')}
                className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors ${
                  chartType === 'map' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'
                }`}
              >
                Mapa
              </button>
            </div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg h-[500px] relative">
            {isLoading ? <ChartSkeleton /> : (
              chartData ? (
                <> 
                  {chartType === 'bar' && <BarChart options={chartOptions} data={chartData} />}
                  {chartType === 'line' && <LineChart options={chartOptions} data={chartData} />}
                  {chartType === 'map' && <WorldMap data={chartData.rawData} />}
                </>
              ) : (
                <p className="text-slate-400">Dados não disponíveis para a seleção atual.</p>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}