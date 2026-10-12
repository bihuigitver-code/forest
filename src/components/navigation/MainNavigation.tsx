import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronDown, Menu, X } from 'lucide-react';

interface SubMenuItem {
  labelEn: string;
  labelHi: string;
  targetId: string;
}

interface NavItem {
  id: string;
  labelEn: string;
  labelHi: string;
  targetId: string;
  items?: SubMenuItem[];
}

export const MainNavigation: React.FC = () => {
  const { lang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const navigationStructure: NavItem[] = [
    {
      id: 'home',
      labelEn: 'Home',
      labelHi: 'मुख्य पृष्ठ',
      targetId: 'top'
    },
    {
      id: 'about',
      labelEn: 'About Us',
      labelHi: 'विभाग के बारे में',
      targetId: 'about-section',
      items: [
        { labelEn: 'Department Overview', labelHi: 'विभाग का परिचय', targetId: 'about-section' },
        { labelEn: 'Vision & Mission', labelHi: 'दृष्टि एवं मिशन', targetId: 'about-section' },
        { labelEn: 'Administrative Hierarchy', labelHi: 'प्रशासनिक संरचना', targetId: 'hierarchy-section' },
        { labelEn: 'Leadership Messages', labelHi: 'विभागीय नेतृत्व', targetId: 'leadership-section' }
      ]
    },
    {
      id: 'conservation',
      labelEn: 'Forest & Wildlife',
      labelHi: 'वन एवं वन्यजीव',
      targetId: 'conservation-section',
      items: [
        { labelEn: 'Forest Conservation', labelHi: 'वन संरक्षण', targetId: 'conservation-section' },
        { labelEn: 'Wildlife Protection & Sanctuaries', labelHi: 'वन्यजीव अभयारण्य', targetId: 'conservation-section' },
        { labelEn: 'Afforestation & Nurseries', labelHi: 'वृक्षारोपण अभियान', targetId: 'conservation-section' },
        { labelEn: 'Forest Fire Prevention', labelHi: 'वनाग्नि रोकथाम', targetId: 'conservation-section' },
        { labelEn: 'Joint Forest Management (JFMC)', labelHi: 'वन सुरक्षा समितियां', targetId: 'conservation-section' }
      ]
    },
    {
      id: 'services',
      labelEn: 'Citizen Services',
      labelHi: 'नागरिक सेवाएं',
      targetId: 'services-section',
      items: [
        { labelEn: 'Tree Felling Permission', labelHi: 'वृक्ष पातन अनुमति', targetId: 'services-section' },
        { labelEn: 'Wildlife Rescue 24x7', labelHi: 'वन्यजीव बचाव सहायता', targetId: 'services-section' },
        { labelEn: 'Forest Fire Alert Reporting', labelHi: 'वनाग्नि सूचना दर्ज करें', targetId: 'services-section' },
        { labelEn: 'Nursery Sapling Availability', labelHi: 'पौधशाला पौध वितरण', targetId: 'services-section' },
        { labelEn: 'Public Grievance Redressal', labelHi: 'जन शिकायत निवारण', targetId: 'contact-section' }
      ]
    },
    {
      id: 'notices',
      labelEn: 'Notices & Tenders',
      labelHi: 'सूचनाएं एवं निविदाएं',
      targetId: 'notices-section',
      items: [
        { labelEn: 'Latest Circulars & Orders', labelHi: 'नवीनतम परिपत्र एवं आदेश', targetId: 'notices-section' },
        { labelEn: 'Tenders & e-Procurement', labelHi: 'निविदाएं एवं कोटेशन', targetId: 'notices-section' },
        { labelEn: 'Recruitment & Results', labelHi: 'भर्ती एवं चयन परिणाम', targetId: 'notices-section' }
      ]
    },
    {
      id: 'acts',
      labelEn: 'Acts & Rules',
      labelHi: 'अधिनियम एवं नियम',
      targetId: 'documents-section',
      items: [
        { labelEn: 'Wildlife Protection Act', labelHi: 'वन्यजीव संरक्षण अधिनियम', targetId: 'documents-section' },
        { labelEn: 'Forest Conservation Act', labelHi: 'वन संरक्षण अधिनियम', targetId: 'documents-section' },
        { labelEn: 'State Tree Rules', labelHi: 'राज्य वृक्ष संरक्षण नियम', targetId: 'documents-section' },
        { labelEn: 'Citizen Charter', labelHi: 'नागरिक अधिकार पत्र', targetId: 'documents-section' }
      ]
    },
    {
      id: 'publications',
      labelEn: 'Publications',
      labelHi: 'प्रकाशन व रिपोर्ट',
      targetId: 'documents-section'
    },
    {
      id: 'gallery',
      labelEn: 'Photo Gallery',
      labelHi: 'चित्र वीथिका',
      targetId: 'gallery-section'
    },
    {
      id: 'contact',
      labelEn: 'Contact Us',
      labelHi: 'संपर्क सूत्र',
      targetId: 'contact-section'
    }
  ];

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToTarget = (targetId: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const elem = document.getElementById(targetId);
    if (elem) {
      const headerOffset = 110;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      ref={navRef} 
      className="bg-[#174A32] text-white border-b-2 border-[#B79A52] sticky top-0 z-30 shadow-gov"
      aria-label="Main Department Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {navigationStructure.map((item) => {
              const hasDropdown = Boolean(item.items && item.items.length > 0);
              const isOpen = activeDropdown === item.id;

              return (
                <div 
                  key={item.id} 
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(item.id)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (!hasDropdown) {
                        scrollToTarget(item.targetId);
                      } else {
                        setActiveDropdown(isOpen ? null : item.id);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (hasDropdown) {
                          setActiveDropdown(isOpen ? null : item.id);
                        } else {
                          scrollToTarget(item.targetId);
                        }
                      } else if (e.key === 'Escape') {
                        setActiveDropdown(null);
                      }
                    }}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                    aria-haspopup={hasDropdown ? 'true' : undefined}
                    className={`flex items-center space-x-1 px-3 py-3 text-xs xl:text-sm font-semibold transition border-b-2 ${
                      isOpen
                        ? 'bg-[#24563B] text-[#E8DFB8] border-[#B79A52]'
                        : 'border-transparent hover:bg-[#24563B] hover:text-amber-100'
                    }`}
                  >
                    <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                    {hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#B79A52]' : 'text-slate-300'}`} />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {hasDropdown && (
                    <div
                      className={`absolute left-0 w-64 bg-white text-slate-800 shadow-gov-md border-t-2 border-[#B79A52] border-x border-b border-[#D7DED8] transition-all duration-150 py-1 ${
                        isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
                      }`}
                      role="menu"
                    >
                      {item.items?.map((sub, idx) => (
                        <button
                          key={idx}
                          role="menuitem"
                          onClick={() => scrollToTarget(sub.targetId)}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-[#F5F4EC] hover:text-[#174A32] border-b border-slate-100 last:border-b-0 flex items-center justify-between group/sub"
                        >
                          <span>{lang === 'hi' ? sub.labelHi : sub.labelEn}</span>
                          <span className="text-[#B79A52] opacity-0 group-hover/sub:opacity-100 transition-opacity text-[10px]">
                            →
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center justify-between w-full py-2.5">
            <span className="text-xs font-bold text-amber-200 tracking-wide uppercase">
              {lang === 'hi' ? 'विभाग नेविगेशन' : 'Menu Navigation'}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded bg-[#24563B] hover:bg-[#2E6F4C] text-white focus:outline-none focus:ring-2 focus:ring-[#B79A52]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1E3B2B] border-t border-[#24563B] py-2 px-1 max-h-[80vh] overflow-y-auto">
            {navigationStructure.map((item) => (
              <div key={item.id} className="border-b border-[#2A523C] last:border-0 py-1">
                <button
                  onClick={() => scrollToTarget(item.targetId)}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-white hover:bg-[#24563B] rounded flex items-center justify-between"
                >
                  <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                  {item.items && (
                    <span className="text-[10px] text-amber-300 bg-[#174A32] px-1.5 py-0.5 rounded">
                      {item.items.length}
                    </span>
                  )}
                </button>
                {item.items && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-[#152C20]">
                    {item.items.map((sub, sidx) => (
                      <button
                        key={sidx}
                        onClick={() => scrollToTarget(sub.targetId)}
                        className="w-full text-left px-3 py-1.5 text-[11px] text-slate-300 hover:text-white hover:bg-[#24563B] rounded block"
                      >
                        • {lang === 'hi' ? sub.labelHi : sub.labelEn}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
