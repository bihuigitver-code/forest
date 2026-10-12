export type Language = 'en' | 'hi';

export type TextI18n = {
  en: string;
  hi: string;
};

export type NoticeCategory = 'notification' | 'tender' | 'recruitment' | 'circular';

export interface NoticeItem {
  id: string;
  titleEn: string;
  titleHi: string;
  date: string;
  category: NoticeCategory;
  refNo: string;
  isNew?: boolean;
  closingDate?: string;
  departmentEn: string;
  departmentHi: string;
  fileSize: string;
  summaryEn: string;
  summaryHi: string;
  isApplyOpen?: boolean;
  alsoInNotifications?: boolean;
}

export interface CitizenService {
  id: string;
  titleEn: string;
  titleHi: string;
  shortDescEn: string;
  shortDescHi: string;
  fullDescEn: string;
  fullDescHi: string;
  iconName: string;
  category: 'permits' | 'emergency' | 'community' | 'grievance' | 'information';
  timeframe: string;
  fee: string;
  onlineAvailable: boolean;
  documentsEn: string[];
  documentsHi: string[];
  procedureStepsEn: string[];
  procedureStepsHi: string[];
  helpline?: string;
}

export interface StatItem {
  id: string;
  value: string;
  unitEn: string;
  unitHi: string;
  labelEn: string;
  labelHi: string;
  subtextEn: string;
  subtextHi: string;
  iconName: string;
}

export interface ConservationTopic {
  id: string;
  titleEn: string;
  titleHi: string;
  taglineEn: string;
  taglineHi: string;
  descEn: string;
  descHi: string;
  keyInitiativesEn: string[];
  keyInitiativesHi: string[];
  image: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'wildlife' | 'conservation' | 'plantations' | 'patrol' | 'ecotourism';
  imageUrl: string;
  captionEn: string;
  captionHi: string;
  locationEn: string;
  locationHi: string;
  date: string;
}

export type DocumentCategory = 'act' | 'rule' | 'circular' | 'report' | 'charter' | 'form';

export interface DocumentItem {
  id: string;
  titleEn: string;
  titleHi: string;
  category: DocumentCategory;
  docNumber: string;
  publishedDate: string;
  fileSize: string;
  fileType: string;
  language: 'Bilingual' | 'English' | 'Hindi';
  downloadCount: number;
}

export interface OfficialProfile {
  roleEn: string;
  roleHi: string;
  nameEn: string;
  nameHi: string;
  designationEn: string;
  designationHi: string;
  messageEn: string;
  messageHi: string;
  image: string;
}

export interface DivisionalOffice {
  circleEn: string;
  circleHi: string;
  divisionEn: string;
  divisionHi: string;
  dfoNameEn: string;
  dfoNameHi: string;
  phone: string;
  email: string;
  addressEn: string;
  addressHi: string;
}
