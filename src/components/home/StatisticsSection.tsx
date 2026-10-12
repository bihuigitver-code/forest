import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { statsData } from '../../data/department';
import { MapPin, Shield, Building, Trees, Users, BarChart3, Info } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const { lang, t } = useLanguage();

  const getIcon = (name: string) => {
    switch (name) {
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-[#B79A52]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#B79A52]" />;
      case 'Building':
        return <Building className="w-5 h-5 text-[#B79A52]" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-[#B79A52]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#B79A52]" />;
      default:
        return <BarChart3 className="w-5 h-5 text-[#B79A52]" />;
    }
  };

  return (
    <section className="py-9 bg-[#F5F4EC] border-b border-[#D7DED8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-5 border-b border-[#D7DED8] gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-6 bg-[#174A32] rounded-xs" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-devanagari text-[#174A32] leading-tight">
                {t('statsHeading')}
              </h2>
              <p className="text-xs text-slate-600">
                {t('statsSubheading')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 bg-white px-2.5 py-1 border border-[#D7DED8] rounded-xs self-start sm:self-auto">
            <Info className="w-3 h-3 text-[#B79A52]" />
            <span>
              {lang === 'hi' ? 'सांख्यिकी: सांकेतिक प्रारूप आंकड़े' : 'Statistics: Demonstration Inventory Values'}
            </span>
          </div>
        </div>

        {/* 5 Information Blocks: Traditional bordered government style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-white border border-[#D7DED8] rounded-xs p-4 shadow-gov-sm hover:border-[#174A32] transition flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-[#183153] uppercase tracking-wide">
                  {lang === 'hi' ? stat.labelHi : stat.labelEn}
                </span>
                <div className="p-1.5 bg-[#F5F4EC] rounded-xs border border-[#D7DED8] flex-shrink-0 ml-2">
                  {getIcon(stat.iconName)}
                </div>
              </div>

              <div className="my-3">
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#174A32] tracking-tight font-mono">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-[#B79A52]">
                    {lang === 'hi' ? stat.unitHi : stat.unitEn}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                {lang === 'hi' ? stat.subtextHi : stat.subtextEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
