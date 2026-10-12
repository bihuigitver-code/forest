import type { StatItem, ConservationTopic, OfficialProfile, DivisionalOffice } from '../types';

export const statsData: StatItem[] = [
  {
    id: 'stat-01',
    value: '31,842',
    unitEn: 'sq. km',
    unitHi: 'वर्ग किमी',
    labelEn: 'Recorded Forest Area',
    labelHi: 'अभिलेखित वन क्षेत्र',
    subtextEn: '26.4% of State Geographical Area',
    subtextHi: 'कुल राज्य क्षेत्रफल का 26.4%',
    iconName: 'MapPin'
  },
  {
    id: 'stat-02',
    value: '14',
    unitEn: 'Protected Reserves',
    unitHi: 'संरक्षित अभयारण्य',
    labelEn: 'Wildlife Sanctuaries & Parks',
    labelHi: 'राष्ट्रीय उद्यान एवं वन्यजीव अभयारण्य',
    subtextEn: 'Core & buffer wildlife zones',
    subtextHi: 'कोर एवं बफर वन्यजीव क्षेत्र',
    iconName: 'Shield'
  },
  {
    id: 'stat-03',
    value: '38',
    unitEn: 'Territorial & Wildlife',
    unitHi: 'प्रादेशिक एवं वन्यजीव',
    labelEn: 'Forest Divisions (DFO)',
    labelHi: 'प्रभागीय वन कार्यालय (DFO)',
    subtextEn: 'Spanning 184 Range Offices',
    subtextHi: '184 परिक्षेत्र (रेंज) कार्यालय',
    iconName: 'Building'
  },
  {
    id: 'stat-04',
    value: '4.85',
    unitEn: 'Crore Saplings',
    unitHi: 'करोड़ पौधे',
    labelEn: 'Annual Plantation Target',
    labelHi: 'वार्षिक वृक्षारोपण लक्ष्य',
    subtextEn: 'Across 120 Model Nurseries',
    subtextHi: '120 आदर्श पौधशालाओं द्वारा',
    iconName: 'Trees'
  },
  {
    id: 'stat-05',
    value: '3,450+',
    unitEn: 'Active JFMCs',
    unitHi: 'सक्रिय वन समितियां',
    labelEn: 'Joint Forest Committees',
    labelHi: 'संयुक्त वन सुरक्षा समितियां',
    subtextEn: 'Covering 4.2 Lakh Rural Families',
    subtextHi: '4.2 लाख ग्रामीण परिवार सहभागिता',
    iconName: 'Users'
  }
];

export const conservationTopics: ConservationTopic[] = [
  {
    id: 'topic-forest-protection',
    titleEn: 'Forest Conservation & Boundary Protection',
    titleHi: 'वन संरक्षण एवं सीमा सुरक्षा',
    taglineEn: 'Preserving pristine ecosystems through systematic boundary demarcation and beat vigilance.',
    taglineHi: 'वैज्ञानिक सीमांकन एवं निरंतर बीट गश्त द्वारा प्राचीन वन पारिस्थितिकी की सुरक्षा।',
    descEn: 'Our frontline guards patrol over 31,000 sq km of reserved and protected forests. Employing GPS-tagged boundary pillars, satellite remote sensing for encroachment detection, and rigorous enforcement of the Indian Forest Act.',
    descHi: 'हमारे अग्रिम पंक्ति के वनकर्मी 31,000 वर्ग किमी से अधिक आरक्षित वनों की निगरानी करते हैं। अतिक्रमण रोकथाम हेतु जीपीएस सीमा स्तंभ और उपग्रह रिमोट सेंसिंग तकनीक का उपयोग किया जाता है।',
    keyInitiativesEn: [
      'Digital boundary pillars with geo-spatial coordinates',
      'Anti-poaching mobile squads equipped with night-vision systems',
      'Drone surveillance of inaccessible hilly terrains'
    ],
    keyInitiativesHi: [
      'भू-स्थानिक निर्देशांकों सहित डिजिटल वन सीमा स्तंभ',
      'नाइट-विजन उपकरणों से सुसज्जित अवैध शिकार रोधी मोबाइल दल',
      'दुर्गम पहाड़ी क्षेत्रों में ड्रोन आधारित सुरक्षा निगरानी'
    ],
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    iconName: 'ShieldCheck'
  },
  {
    id: 'topic-wildlife',
    titleEn: 'Wildlife Protection & Conflict Management',
    titleHi: 'वन्यजीव संरक्षण एवं मानव-वन्यजीव संघर्ष प्रबंधन',
    taglineEn: 'Safeguarding endangered carnivores, elephants, and endemic birds with community corridors.',
    taglineHi: 'सामुदायिक गलियारों के साथ संकटग्रस्त मांसाहारी जीवों, हाथियों व पक्षियों का संरक्षण।',
    descEn: 'Comprehensive habitat management inside 14 protected sanctuaries. Specialized Rapid Response Teams (RRTs) defuse human-wildlife encounters and provide immediate medical care to distressed wildlife.',
    descHi: '14 संरक्षित अभयारण्यों में व्यापक वासस्थल प्रबंधन। त्वरित कार्रवाई दल (RRT) मानव-वन्यजीव संघर्ष को न्यूनतम करते हैं और घायल वन्यजीवों को उपचार प्रदान करते हैं।',
    keyInitiativesEn: [
      'Radio-collaring and camera-trap monitoring of big cats',
      'Establishment of artificial solar waterholes along migration routes',
      'Direct DBT disbursement of ex-gratia compensation for crop/cattle loss'
    ],
    keyInitiativesHi: [
      'रेडियो कॉलर एवं कैमरा-ट्रैप द्वारा वन्यजीवों की निगरानी',
      'प्रवास मार्गों पर सौर ऊर्जा चालित कृत्रिम पेयजल स्रोतों की स्थापना',
      'फसल एवं पशु क्षति हेतु प्रत्यक्ष लाभ अंतरण (DBT) से त्वरित मुआवजा'
    ],
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    iconName: 'HeartHandshake'
  },
  {
    id: 'topic-afforestation',
    titleEn: 'Afforestation, Social Forestry & Green Mission',
    titleHi: 'वनीकरण, सामाजिक वानिकी एवं हरित अभियान',
    taglineEn: 'Expanding tree canopy outside recorded forests through massive agro-forestry and institutional drives.',
    taglineHi: 'सघन कृषि-वानिकी एवं संस्थागत अभियानों के माध्यम से वन क्षेत्र से बाहर हरित आवरण का विस्तार।',
    descEn: 'Statewide afforestation efforts blend scientific silviculture with local native species like Neem, Banyan, Jamun, and Mahua. Decentralized departmental nurseries ensure quality seedling availability to farmers.',
    descHi: 'राज्यव्यापी वनीकरण में वैज्ञानिक वानिकी के साथ नीम, बरगद, जामुन व महुआ जैसी स्थानीय प्रजातियों को प्राथमिकता दी जाती है। विकेंद्रीकृत पौधशालाओं द्वारा किसानों को गुणवत्तापूर्ण पौधे मिलते हैं।',
    keyInitiativesEn: [
      'Miyawaki urban micro-forests in peri-urban belts',
      'Riverbank vegetative buffer plantations to check soil erosion',
      'Free distribution of agro-forestry saplings to rural landholders'
    ],
    keyInitiativesHi: [
      'शहरी क्षेत्रों में मियावाकी पद्धति से सघन सूक्ष्म वनों का विकास',
      'मृदा अपरदन रोकने हेतु नदी तटों पर वनस्पति पट्टी का रोपण',
      'ग्रामीण किसानों को कृषि-वानिकी हेतु निःशुल्क पौधों का वितरण'
    ],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sprout'
  },
  {
    id: 'topic-fire',
    titleEn: 'Forest Fire Prevention & Early Warning Response',
    titleHi: 'वनाग्नि रोकथाम एवं पूर्व चेतावनी त्वरित प्रतिक्रिया',
    taglineEn: 'Mitigating forest fire risks through seasonal fire-lines, satellite telemetry, and public watch.',
    taglineHi: 'मौसमी फायर-लाइनों, उपग्रह टेलीमेट्री एवं जन-जागरूकता द्वारा वनाग्नि जोखिम का शमन।',
    descEn: 'Dry summer months present severe fire threats to deciduous woodlands. The department works in synchronization with the Forest Survey of India (FSI) Van-Agni geo-portal for near real-time hotspot alerting.',
    descHi: 'ग्रीष्मकाल में शुष्क पतझड़ वनों में आग का खतरा बढ़ जाता है। विभाग भारतीय वन सर्वेक्षण (FSI) के वन-अग्नि पोर्टल के साथ वास्तविक समय में हॉटस्पॉट अलर्ट प्राप्त करता है।',
    keyInitiativesEn: [
      'Annual clearance of over 4,200 km of tactical forest fire lines',
      'Distribution of motorized air blowers and flame retardant kits',
      'Community fire incentive schemes for vigilant Van Samitis'
    ],
    keyInitiativesHi: [
      'प्रतिवर्ष 4,200 किमी से अधिक सुरक्षात्मक फायर लाइनों की सफाई',
      'मोटराइज्ड एयर ब्लोअर एवं अग्निरोधी सुरक्षा किट का वितरण',
      'सजग वन सुरक्षा समितियों के लिए सामुदायिक प्रोत्साहन पुरस्कार'
    ],
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
    iconName: 'Flame'
  },
  {
    id: 'topic-community',
    titleEn: 'Joint Forest Management & Van Suraksha Samitis',
    titleHi: 'संयुक्त वन प्रबंधन (JFM) एवं वन सुरक्षा समितियां',
    taglineEn: 'Empowering fringe forest communities as rightful partners in natural resource conservation.',
    taglineHi: 'प्राकृतिक संसाधनों के संरक्षण में वन सीमावर्ती समुदायों को समान भागीदार बनाना।',
    descEn: 'Over 3,450 Joint Forest Management Committees (JFMCs) protect local forests in exchange for rights to Non-Timber Forest Produce (NTFP), usufruct sharing, and employment in plantation works.',
    descHi: '3,450 से अधिक संयुक्त वन प्रबंधन समितियां स्थानीय वनों की रक्षा करती हैं, जिसके बदले उन्हें गैर-काष्ठ वनोपज (NTFP) संग्रहण अधिकार व वनीकरण कार्यों में रोजगार मिलता है।',
    keyInitiativesEn: [
      'Value-addition centers for Mahua, Chironji, and Lac produce',
      'Village eco-development funds managed directly by gram sabhas',
      'Capacity building workshops for tribal youth as eco-guides'
    ],
    keyInitiativesHi: [
      'महुआ, चिरौंजी व लाख के प्रसंस्करण हेतु मूल्य-संवर्धन केंद्र',
      'ग्राम सभाओं द्वारा सीधे संचालित ग्राम पारिस्थितिक विकास कोष',
      'स्थानीय युवाओं को प्रकृति गाइड के रूप में क्षमता विकास प्रशिक्षण'
    ],
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
    iconName: 'Users'
  }
];

export const leadershipData: OfficialProfile[] = [
  {
    roleEn: "Minister for Forests & Environment",
    roleHi: "मा. मंत्री, वन एवं पर्यावरण",
    nameEn: "Shri Rajesh Kumar Sharma (Placeholder)",
    nameHi: "श्री राजेश कुमार शर्मा (प्रारूप)",
    designationEn: "Cabinet Minister, Department of Environment, Forests & Climate Change",
    designationHi: "कैबिनेट मंत्री, पर्यावरण, वन एवं जलवायु परिवर्तन विभाग",
    messageEn: "“Our forest wealth is the greatest legacy we leave for the coming generation. Through disciplined conservation, community partnership, and cutting-edge digital monitoring, we pledge to keep our state green, resilient, and thriving.”",
    messageHi: "“हमारी वन संपदा भावी पीढ़ियों के लिए हमारी सबसे अमूल्य धरोहर है। अनुशासित संरक्षण, जन सहभागिता एवं आधुनिक डिजिटल निगरानी के माध्यम से हम अपने राज्य को हरा-भरा और समृद्ध बनाने हेतु संकल्पित हैं।”",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    roleEn: "Principal Chief Conservator of Forests & HoFF",
    roleHi: "प्रधान मुख्य वन संरक्षक एवं वन बल प्रमुख",
    nameEn: "Dr. Arvind S. Varma, IFS (Placeholder)",
    nameHi: "डॉ. अरविंद एस. वर्मा, भा.व.से. (प्रारूप)",
    designationEn: "PCCF & Head of Forest Force (HoFF)",
    designationHi: "पीसीसीएफ एवं प्रमुख वन बल (HoFF)",
    messageEn: "“Scientific forestry, zero tolerance for wildlife crime, and uncompromised public service transparency form the bedrock of our departmental doctrine. We invite all citizens to be our eyes and ears in preserving our natural heritage.”",
    messageHi: "“वैज्ञानिक वानिकी, वन्यजीव अपराधों पर शून्य सहनशीलता और पारदर्शी जनसेवा हमारे विभाग के मूल सिद्धांत हैं। हम समस्त नागरिकों से आग्रह करते हैं कि वे हमारी प्राकृतिक धरोहर की रक्षा में सक्रिय सहभागी बनें।”",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  }
];

export const divisionalOfficesData: DivisionalOffice[] = [
  {
    circleEn: "Central Forest Circle",
    circleHi: "केंद्रीय वन वृत्त",
    divisionEn: "Central Territorial Division",
    divisionHi: "केंद्रीय प्रादेशिक प्रभाग",
    dfoNameEn: "DFO Office, Aranya Complex",
    dfoNameHi: "डीएफओ कार्यालय, अरण्य संकुल",
    phone: "011-2338-4101",
    email: "dfo-central@forestdept.demo.gov.in",
    addressEn: "Civil Lines, Sector 4, Capital Zone - 110001",
    addressHi: "सिविल लाइंस, सेक्टर 4, राजधानी क्षेत्र - 110001"
  },
  {
    circleEn: "Northern Wildlife Circle",
    circleHi: "उत्तरी वन्यजीव वृत्त",
    divisionEn: "Valley Wildlife Division",
    divisionHi: "घाटी वन्यजीव प्रभाग",
    dfoNameEn: "Wildlife Warden Office",
    dfoNameHi: "वन्यजीव प्रतिपालक कार्यालय",
    phone: "011-2338-4102",
    email: "wl-valley@forestdept.demo.gov.in",
    addressEn: "Forest Gate, Sanctuary Road, North Sub-Division - 110045",
    addressHi: "वन गेट, अभयारण्य मार्ग, उत्तरी उप-प्रभाग - 110045"
  },
  {
    circleEn: "Southern Silviculture Circle",
    circleHi: "दक्षिणी वन संवर्धन वृत्त",
    divisionEn: "South Forest Division",
    divisionHi: "दक्षिण वन प्रभाग",
    dfoNameEn: "Divisional Forest Officer",
    dfoNameHi: "प्रभागीय वन अधिकारी",
    phone: "011-2338-4103",
    email: "dfo-south@forestdept.demo.gov.in",
    addressEn: "Old Forest Compound, Near Canal Road - 110088",
    addressHi: "पुरातन वन परिसर, निकट नहर मार्ग - 110088"
  },
  {
    circleEn: "Eastern Social Forestry Circle",
    circleHi: "पूर्वी सामाजिक वानिकी वृत्त",
    divisionEn: "Eastern Afforestation Division",
    divisionHi: "पूर्वी वनीकरण प्रभाग",
    dfoNameEn: "Deputy Conservator of Forests",
    dfoNameHi: "उप वन संरक्षक कार्यालय",
    phone: "011-2338-4104",
    email: "dfo-social-east@forestdept.demo.gov.in",
    addressEn: "Panchayat Bhavan Road, East District - 110092",
    addressHi: "पंचायत भवन मार्ग, पूर्वी जिला - 110092"
  }
];

export const administrativeHierarchy = [
  { level: 1, titleEn: "Minister for Forests & Environment", titleHi: "माननीय मंत्री, वन एवं पर्यावरण", code: "MINISTER" },
  { level: 2, titleEn: "Principal Secretary (Forests & Climate Change)", titleHi: "प्रमुख सचिव (वन एवं जलवायु परिवर्तन)", code: "ACS / PS" },
  { level: 3, titleEn: "Principal Chief Conservator of Forests (PCCF & HoFF)", titleHi: "प्रधान मुख्य वन संरक्षक (पीसीसीएफ एवं वन बल प्रमुख)", code: "PCCF & HoFF" },
  { level: 4, titleEn: "Additional Principal Chief Conservators of Forests (APCCF)", titleHi: "अपर प्रधान मुख्य वन संरक्षक (APCCF - वन्यजीव/सुरक्षा/विकास)", code: "APCCF" },
  { level: 5, titleEn: "Chief Conservator of Forests (CCF) - Circle Heads", titleHi: "मुख्य वन संरक्षक (CCF - वृत्त प्रमुख)", code: "CCF" },
  { level: 6, titleEn: "Conservator of Forests (CF)", titleHi: "वन संरक्षक (CF)", code: "CF" },
  { level: 7, titleEn: "Divisional Forest Officer (DFO / DCF)", titleHi: "प्रभागीय वन अधिकारी (DFO / उप वन संरक्षक)", code: "DFO / DCF" },
  { level: 8, titleEn: "Assistant Conservator of Forests (ACF / Sub-Divisional)", titleHi: "सहायक वन संरक्षक (ACF / उप-प्रभाग)", code: "ACF" },
  { level: 9, titleEn: "Range Forest Officer (RFO)", titleHi: "परिक्षेत्र वन अधिकारी (रेंजर - RFO)", code: "RFO" },
  { level: 10, titleEn: "Deputy Ranger & Forester (Van Pal)", titleHi: "उप-परिक्षेत्र अधिकारी एवं वनपाल (Forester)", code: "DR / FORESTER" },
  { level: 11, titleEn: "Forest Guard & Beat Watcher (Van Rakshak)", titleHi: "वन रक्षक एवं बीट प्रहरी (Van Rakshak)", code: "FG / BEAT" }
];
