import { useState, useEffect } from 'react';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { fetchGdpData } from '../services/worldBankApi';
import { BarChart } from '../components/BarChart';
import { ChartSkeleton } from '../components/ChartSkeleton';

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
  const [selectedYear, setSelectedYear] = useState('2022'); 

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchGdpData();
        setGdpData(data);
      } catch (error) {
        console.error("Falha ao carregar dados", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (gdpData && gdpData.length > 0) {
      const filteredData = gdpData.filter(item => item.date === selectedYear && item.value !== null);

      const processedData = {
        labels: filteredData.map(item => item.country.value),
        datasets: [
          {
            label: `PIB em ${selectedYear} (US$)`,
            data: filteredData.map(item => item.value),
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      };
      setChartData(processedData);
    }
  }, [gdpData, selectedYear]); 

  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        ticks: {
          color: 'rgb(156, 163, 175)', 
          callback: function(value: string | number) {
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
        display: false,
      },
      title: {
        display: true,
        text: `PIB por País em ${selectedYear} (US$)`,
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
          label: function(context: any) {
            const value = context.parsed.y;
            const formattedValue = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              maximumFractionDigits: 2
            }).format(value);
            return `PIB: ${formattedValue}`;
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
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="bg-slate-800 p-6 rounded-lg h-[500px] relative"> 
            {isLoading ? (
              <ChartSkeleton />
            ) : chartData ? (
              <BarChart options={chartOptions} data={chartData} />
            ) : (
              <p className="text-slate-400">Não foi possível carregar os dados do gráfico.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}