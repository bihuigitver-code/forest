import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { administrativeHierarchy } from '../../data/department';
import { 
  Building2, 
  Target, 
  Eye, 
  Network, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

export const DepartmentOverviewSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [showFullHierarchy, setShowFullHierarchy] = useState(false);

  return (
    <section id="about-section" className="py-12 bg-white border-b border-[#D7DED8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#174A32] pb-3 mb-8">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#B79A52] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#24563B]" />
            <span>{lang === 'hi' ? 'विभाग का स्वरूप व अधिदेश' : 'Institutional Mandate & Structure'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-devanagari text-[#174A32] mt-0.5">
            {t('aboutHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            {t('aboutSubheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Department Overview, Vision & Mission (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#FAFAF7] border border-[#D7DED8] p-5 sm:p-6 rounded-xs shadow-gov-sm">
              <h3 className="text-sm sm:text-base font-bold text-[#183153] uppercase tracking-wide border-b border-slate-200 pb-2 mb-3">
                {lang === 'hi' ? 'विभागीय पृष्ठभूमि एवं संवैधानिक अधिदेश' : 'Departmental Background & Mandate'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {lang === 'hi'
                  ? 'वन विभाग राज्य की समृद्ध प्राकृतिक विरासत, जैव विविधता, वन्यजीव अभयारण्यों और जल ग्रहण क्षेत्रों के संरक्षण हेतु उत्तरदायी प्रमुख प्रशासनिक अभिकरण है। विभाग संविधान के अनुच्छेद 48(क) एवं 51(क)(छ) के अनुरूप वनों एवं वन्यजीवों की सुरक्षा, अवैधानिक कटाई पर नियंत्रण, और समाज के निर्बल वर्गों के अधिकारों का सम्मान करते हुए वैज्ञानिक वानिकी प्रबंधन सुनिश्चित करता है।'
                  : 'The Forest Department serves as the principal statutory authority responsible for the stewardship of the State’s forest estates, wildlife sanctuaries, vital river catchments, and biodiversity assets. In harmony with Articles 48A and 51A(g) of the Constitution of India, the department is tasked with enforcing conservation statutes, preventing forest crimes, and advancing scientific silviculture while empowering fringe tribal communities.'}
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vision Card */}
              <div className="bg-[#F5F4EC] border-l-4 border-l-[#24563B] border-y border-r border-[#D7DED8] p-4 rounded-xs shadow-gov-sm">
                <div className="flex items-center space-x-2 text-[#174A32] font-bold text-xs uppercase tracking-wider mb-2">
                  <Eye className="w-4 h-4 text-[#B79A52]" />
                  <span>{t('visionTitle')}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {t('visionText')}
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-[#F5F4EC] border-l-4 border-l-[#B79A52] border-y border-r border-[#D7DED8] p-4 rounded-xs shadow-gov-sm">
                <div className="flex items-center space-x-2 text-[#183153] font-bold text-xs uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4 text-[#B79A52]" />
                  <span>{t('missionTitle')}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {t('missionText')}
                </p>
              </div>
            </div>

            {/* Core Commitments Checklist */}
            <div className="bg-white border border-[#D7DED8] p-4 rounded-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#174A32] mb-3">
                {lang === 'hi' ? 'नागरिकों एवं पर्यावरण के प्रति प्रमुख संकल्प' : 'Core Statutory Commitments'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#24563B] flex-shrink-0" />
                  <span>{lang === 'hi' ? 'शून्य वनाग्नि विस्तार नीति' : 'Zero Forest Fire Spread Target'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#24563B] flex-shrink-0" />
                  <span>{lang === 'hi' ? '30 कार्यदिवसों में वृक्ष पातन अनुमति' : 'Time-bound Felling Disposals (30 Days)'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#24563B] flex-shrink-0" />
                  <span>{lang === 'hi' ? 'स्वदेशी प्रजातियों का प्राथमिकता रोपण' : '100% Native Species in Nurseries'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#24563B] flex-shrink-0" />
                  <span>{lang === 'hi' ? 'डीबीटी से त्वरित वन्यजीव मुआवजा' : 'DBT Wildlife Ex-Gratia Settlement'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Administrative Setup & Hierarchy (5 cols) */}
          <div id="hierarchy-section" className="lg:col-span-5 space-y-4">
            <div className="bg-[#FAFAF7] border border-[#D7DED8] p-4 sm:p-5 rounded-xs shadow-gov-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                <div className="flex items-center space-x-2">
                  <Network className="w-4 h-4 text-[#174A32]" />
                  <h3 className="text-xs sm:text-sm font-bold text-[#183153] uppercase tracking-wide">
                    {lang === 'hi' ? 'प्रशासनिक संरचना व पदानुक्रम' : 'Administrative Hierarchy'}
                  </h3>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">
                  {lang === 'hi' ? 'प्रारूप कैडर' : 'Cadre Hierarchy'}
                </span>
              </div>

              <p className="text-[11px] text-slate-600 mb-3">
                {lang === 'hi'
                  ? 'भारतीय वन सेवा (IFS), राज्य वन सेवा (SFS) एवं अधीनस्थ क्षेत्रीय संवर्ग का प्रशासनिक ढांचा:'
                  : 'Chain of command across Indian Forest Service (IFS), State Forest Service (SFS), and Field Beats:'}
              </p>

              {/* Hierarchy Tree List */}
              <div className="space-y-1.5 font-mono text-xs">
                {(showFullHierarchy ? administrativeHierarchy : administrativeHierarchy.slice(0, 7)).map((level) => (
                  <div
                    key={level.level}
                    className="flex items-center justify-between p-2 bg-white border border-[#D7DED8] rounded-xs hover:border-[#174A32] transition"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="w-5 h-5 rounded-full bg-[#174A32] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {level.level}
                      </span>
                      <span className="font-sans text-xs font-semibold text-slate-800 truncate">
                        {lang === 'hi' ? level.titleHi : level.titleEn}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#B79A52] font-bold bg-[#F5F4EC] px-1.5 py-0.5 rounded border border-[#D7DED8] flex-shrink-0 ml-1">
                      {level.code}
                    </span>
                  </div>
                ))}
              </div>

              {/* Expand / Collapse Button */}
              <button
                onClick={() => setShowFullHierarchy(!showFullHierarchy)}
                className="w-full mt-3 py-1.5 text-xs font-semibold text-[#174A32] hover:text-[#B79A52] bg-white border border-[#D7DED8] hover:border-[#174A32] rounded-xs transition flex items-center justify-center space-x-1"
              >
                <span>
                  {showFullHierarchy
                    ? (lang === 'hi' ? 'संक्षिप्त सूची दिखाएं' : 'Show Compact Cadre')
                    : (lang === 'hi' ? 'सम्पूर्ण 11-स्तरीय पदानुक्रम देखें' : 'View Full 11-Tier Hierarchy')}
                </span>
                {showFullHierarchy ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
