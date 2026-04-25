import { useEffect, useState } from 'react';
import { Wind, Sun, Cloud, CloudRain } from 'lucide-react';

interface WeatherData {
  temp: number;
  feelsLike: number;
  min: number;
  max: number;
  wind: number;
  humidity: number;
  condition: string;
}

export default function InfoBar() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=27.2579&longitude=33.8116&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_min,temperature_2m_max&timezone=Africa/Cairo'
        );
        const data = await res.json();

        const code = data.current.weather_code;
        let condition = 'Napos';
        if (code >= 1 && code <= 3) condition = 'Részben felhős';
        else if (code >= 51 && code <= 67) condition = 'Esős';
        else if (code >= 95) condition = 'Zivatar';

        setWeather({
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          min: Math.round(data.daily.temperature_2m_min[0]),
          max: Math.round(data.daily.temperature_2m_max[0]),
          wind: Math.round(data.current.wind_speed_10m),
          humidity: data.current.relative_humidity_2m,
          condition,
        });
      } catch {
        setWeather({
          temp: 30, feelsLike: 32, min: 24, max: 33,
          wind: 12, humidity: 45, condition: 'Napos',
        });
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  const getConditionIcon = () => {
    if (!weather) return <Sun size={16} className="text-[#f59e0b]" />;
    if (weather.condition.includes('Eső')) return <CloudRain size={16} className="text-[#0284c7]" />;
    if (weather.condition.includes('felhő')) return <Cloud size={16} className="text-[#94a3b8]" />;
    return <Sun size={16} className="text-[#f59e0b]" />;
  };

  return (
    <section className="bg-[#fff7ed] py-3 border-y border-[#fed7aa]/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          
          {/* Weather - compact */}
          {weather && (
            <div className="flex items-center gap-2 text-[#64748b] text-xs sm:text-sm bg-white/60 rounded-full px-3 py-1">
              {getConditionIcon()}
              <span className="font-semibold text-[#1e293b]">{weather.temp}°C</span>
              <span className="hidden sm:inline">{weather.condition}</span>
              <span className="text-[#94a3b8] mx-1">|</span>
              <Wind size={12} className="text-[#64748b]" />
              <span>{weather.wind} km/h</span>
            </div>
          )}

          <span className="hidden sm:inline text-[#cbd5e1]">|</span>

          {/* WhatsApp */}
          <div className="flex items-center gap-2 text-[#64748b] text-xs sm:text-sm">
            <span className="font-semibold text-[#0284c7]">WhatsApp:</span>
            <span>+20 127 655 1571</span>
          </div>

          <span className="hidden sm:inline text-[#cbd5e1]">|</span>

          {/* Payment */}
          <div className="flex items-center gap-2 text-[#64748b] text-xs sm:text-sm">
            <span>Fizetés: EUR / USD / Revolut / Wise</span>
          </div>

          <span className="hidden sm:inline text-[#cbd5e1]">|</span>

          {/* Timing - HIGHLIGHTED */}
          <div className="w-full sm:w-auto mt-1 sm:mt-0">
            <p className="text-[#1e293b] font-bold text-sm sm:text-base leading-snug bg-[#fef3c7] rounded-lg px-3 py-2 border border-[#fcd34d] inline-block">
              A pontos transzfer érkezési időpontot mindig a program előtti este 20:00 körül küldjük
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
