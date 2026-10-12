import type { CitizenService } from '../types';

export const servicesData: CitizenService[] = [
  {
    id: 'srv-tree-felling',
    titleEn: 'Permission for Tree Felling on Non-Forest Private Land',
    titleHi: 'निजी भूमि पर वृक्ष पातन एवं अभिवहन अनुमति',
    shortDescEn: 'Statutory application procedure to cut dead, diseased, or hazardous trees on non-forest private holdings under State Tree Preservation Act.',
    shortDescHi: 'राज्य वृक्ष संरक्षण अधिनियम के तहत निजी भूखंडों पर सूखे, रोगग्रस्त या खतरनाक वृक्षों को काटने हेतु वैधानिक अनुमति प्रक्रिया।',
    fullDescEn: 'Under the Tree Preservation Act, landholders must obtain prior sanction from the Tree Officer / Divisional Forest Officer before felling specified species of trees. The procedure involves on-site inspection by the Beat Officer/Range Officer, verification of ownership records, and compensatory planting commitment.',
    fullDescHi: 'वृक्ष संरक्षण अधिनियम के अंतर्गत निजी भूमि स्वामियों को निर्धारित प्रजातियों के वृक्ष काटने से पूर्व संबंधित प्रभागीय वन अधिकारी से अनुमति प्राप्त करना अनिवार्य है। इसके तहत वन कर्मियों द्वारा स्थलीय निरीक्षण एवं क्षतिपूरक वृक्षारोपण का शपथ-पत्र आवश्यक है।',
    iconName: 'Trees',
    category: 'permits',
    timeframe: '30 Working Days',
    fee: '₹100 Application Fee + Compensatory Deposit',
    onlineAvailable: false,
    documentsEn: [
      'Proof of Land Ownership (Latest Jamabandi / 7/12 extract / Khasra-Khatauni)',
      'Site plan showing exact location of trees to be felled',
      'No Objection Certificate (NOC) from co-owners if applicable',
      'Affidavit agreeing to plant 3 saplings for every 1 tree felled',
      'Colored photograph of each tree proposed for felling'
    ],
    documentsHi: [
      'भूमि स्वामित्व प्रमाण (नवीनतम खसरा-खतौनी / जमाबंदी प्रति)',
      'वृक्षों की स्थिति दर्शाने वाला भूखंड नक्शा',
      'सह-स्वामियों का अनापत्ति प्रमाण पत्र (NOC), यदि लागू हो',
      'प्रत्येक काटे गए वृक्ष के बदले 3 पौधे लगाने का शपथ-पत्र',
      'काटे जाने हेतु प्रस्तावित प्रत्येक वृक्ष का स्पष्ट रंगीन फोटो'
    ],
    procedureStepsEn: [
      'Submit Form-A in duplicate to the local Range Forest Office (RFO).',
      'Range Officer conducts physical verification within 15 days.',
      'Public notice period of 15 days for objections from neighbors.',
      'Tree Officer issues Tree Transit and Felling Pass with timber marking hammer.'
    ],
    procedureStepsHi: [
      'स्थानीय परिक्षेत्र वन कार्यालय (RFO) में प्रपत्र-ए दो प्रतियों में प्रस्तुत करें।',
      'परिक्षेत्र अधिकारी 15 दिनों के भीतर स्थलीय भौतिक सत्यापन करेंगे।',
      'पड़ोसियों या जनता से आपत्तियों हेतु 15 दिनों की सूचना अवधि।',
      'वृक्ष अधिकारी द्वारा पातन अनुमति एवं काष्ठ अभिवहन पास (Transit Pass) जारी किया जाएगा।'
    ]
  },
  {
    id: 'srv-wildlife-rescue',
    titleEn: 'Wildlife Rescue, Injured Animal Reporting & Conflict Assistance',
    titleHi: 'वन्यजीव बचाव, घायल प्राणी सूचना एवं मानव-वन्यजीव संघर्ष सहायता',
    shortDescEn: 'Immediate emergency alert dispatch for wild animals straying into human habitats, leopard/elephant encounters, or injured wildlife.',
    shortDescHi: 'मानव बस्तियों में वन्यजीवों के प्रवेश, तेंदुए/हाथी की आमद अथवा घायल वन्यजीवों के तत्काल बचाव हेतु आपातकालीन सहायता।',
    fullDescEn: 'The Wildlife Wing operates rapid rescue teams in every sensitive division equipped with tranquilizing gear, animal ambulances, and cages. Citizens can report sightings or injuries 24x7 to activate the nearest forest flying squad.',
    fullDescHi: 'वन्यजीव प्रभाग प्रत्येक संवेदनशील क्षेत्र में पशु एम्बुलेंस, पिंजरे एवं ट्रैंकुलाइजिंग गन से सुसज्जित त्वरित राहत दल (RRT) संचालित करता है। नागरिक सहायता हेतु 24x7 सूचना दर्ज करा सकते हैं।',
    iconName: 'ShieldAlert',
    category: 'emergency',
    timeframe: 'Immediate Response (< 60 minutes)',
    fee: 'Free Public Service (शून्य शुल्क)',
    onlineAvailable: true,
    helpline: 'Toll-Free 1926 or (011) 2436-0000',
    documentsEn: [
      'No formal documents required for emergency alert',
      'Accurate GPS location or village/landmark landmark name',
      'Photograph/video from safe distance if safely possible'
    ],
    documentsHi: [
      'आपातकालीन सूचना हेतु किसी कागजात की आवश्यकता नहीं',
      'सटीक जीपीएस लोकेशन अथवा निकटतम ग्राम/लैंडमार्क का नाम',
      'सुरक्षित दूरी से ली गई फोटो या वीडियो यदि संभव हो'
    ],
    procedureStepsEn: [
      'Dial Toll-Free Forest Control Room: 1926.',
      'Provide exact location and behavior of animal (e.g. injured, stuck in well, cornered).',
      'Do not crowd or provoke the animal; maintain a safe perimeter of at least 100 meters.',
      'Forest Rapid Response Team (RRT) reaches the spot for tranquilization and rescue.'
    ],
    procedureStepsHi: [
      'टोल-फ्री वन नियंत्रण कक्ष 1926 पर तत्काल कॉल करें।',
      'सटीक स्थान एवं पशु की स्थिति बताएं (जैसे कुएं में गिरा, घायल, आबादी में प्रवेश)।',
      'भीड़ न लगाएं और पशु को न उकसाएं; कम से कम 100 मीटर की सुरक्षित दूरी बनाए रखें।',
      'वन विभाग की त्वरित प्रतिक्रिया टीम (RRT) मौके पर पहुंचकर बचाव कार्य संपन्न करेगी।'
    ]
  },
  {
    id: 'srv-fire-reporting',
    titleEn: 'Forest Fire Incident Reporting & FSI Van-Agni Alert Portal',
    titleHi: 'वनाग्नि घटना सूचना एवं वनाग्नि अलर्ट पंजीकरण प्रणाली',
    shortDescEn: 'Report smoke or wild fire outbreaks in reserve forests or sign up for automated satellite thermal hotspot SMS alerts.',
    shortDescHi: 'आरक्षित वनों में आग या धुएं की सूचना दें अथवा उपग्रह आधारित वनाग्नि अलर्ट एसएमएस हेतु पंजीकरण करें।',
    fullDescEn: 'Forest fires devastate dry deciduous and pine ecosystems during summer. Our control rooms receive MODIS/SNPP VIIRS satellite alerts from Forest Survey of India (FSI) and coordinate with ground beat guards and local Van Suraksha Samitis.',
    fullDescHi: 'गर्मियों में वनाग्नि से भारी क्षति होती है। हमारे नियंत्रण कक्ष भारतीय वन सर्वेक्षण (FSI) के उपग्रह डेटा से समन्वय कर क्षेत्रीय बीट प्रहरियों व ग्राम वन सुरक्षा समितियों को तत्काल सक्रिय करते हैं।',
    iconName: 'Flame',
    category: 'emergency',
    timeframe: 'Priority 1 Emergency (< 30 minutes)',
    fee: 'Free Public Service (शून्य शुल्क)',
    onlineAvailable: true,
    helpline: 'Toll-Free 1926 (Fire Control Desk)',
    documentsEn: [
      'No documents needed for reporting fire incidents',
      'Coordinates / Forest Compartment Number if known'
    ],
    documentsHi: [
      'घटना सूचना हेतु किसी दस्तावेज की आवश्यकता नहीं',
      'स्थान के निर्देशांक अथवा वन कक्ष (Compartment) संख्या'
    ],
    procedureStepsEn: [
      'Call emergency desk at 1926 or inform nearest Forest Beat Guard.',
      'Specify compartment name, hill ridge location, and wind direction.',
      'Forest Fire Squads mobilized with air blowers and counter-fire equipment.'
    ],
    procedureStepsHi: [
      '1926 पर सूचना दें अथवा निकटतम वन रक्षक को सूचित करें।',
      'पहाड़ी या क्षेत्र का नाम तथा हवा की दिशा बताएं।',
      'वन अग्निशमन दस्ता एयर ब्लोअर एवं सुरक्षा उपकरणों सहित मौके पर रवाना होगा।'
    ]
  },
  {
    id: 'srv-saplings',
    titleEn: 'Forest Nursery Sapling Availability & Online Booking Information',
    titleHi: 'विभागीय पौधशाला से पौधे प्राप्त करने व बुकिंग संबंधी जानकारी',
    shortDescEn: 'Subsidized and free saplings of indigenous timber, medicinal, and fruit-bearing trees distributed for institutional and personal planting.',
    shortDescHi: 'पर्यावरण संवर्धन हेतु स्वदेशी इमारती, औषधीय एवं फलदार पौधों का रियायती दरों एवं निःशुल्क वितरण विवरण।',
    fullDescEn: 'Over 120 departmental nurseries propagate quality tall saplings of Neem, Peepal, Arjun, Amla, Mahua, Teak, and Jamun. Citizens and institutions can check stock availability by nursery location.',
    fullDescHi: 'विभाग की 120 से अधिक पौधशालाओं में नीम, पीपल, अर्जुन, आंवला, महुआ, सागौन व जामुन के उन्नत पौधे तैयार किए जाते हैं। नागरिक व संस्थाएं अपनी निकटतम पौधशाला में उपलब्धता जांच सकते हैं।',
    iconName: 'Sprout',
    category: 'community',
    timeframe: 'Same Day at Nursery Counter',
    fee: 'Subsidized rates (₹5 - ₹15 per sapling / Free for schools)',
    onlineAvailable: false,
    documentsEn: [
      'Aadhaar / Photo ID proof of applicant',
      'For Institutions: Official requisition letter on letterhead'
    ],
    documentsHi: [
      'आवेदक का आधार कार्ड अथवा फोटो पहचान पत्र',
      'संस्थाओं हेतु: लेटरहेड पर आधिकारिक मांग पत्र'
    ],
    procedureStepsEn: [
      'Locate the nearest Divisional / Range Forest Nursery.',
      'Check stock list for indigenous varieties suited for your local agro-climatic zone.',
      'Fill Nursery Requisition Slip at the counter and receive stamped delivery challan.'
    ],
    procedureStepsHi: [
      'निकटतम प्रभागीय या परिक्षेत्रीय वन पौधशाला का चयन करें।',
      'अपनी जलवायु के अनुकूल स्थानीय प्रजातियों की उपलब्धता सूची देखें।',
      'काउंटर पर मांग पर्ची भरें और मुहरबंद चालान प्राप्त कर पौधे ले जाएं।'
    ]
  },
  {
    id: 'srv-grievance',
    titleEn: 'Public Grievance Redressal (Samadhan) & Encroachment Complaints',
    titleHi: 'जन शिकायत निवारण प्रणाली (समाधान) एवं वन भूमि अतिक्रमण शिकायत',
    shortDescEn: 'Lodge formal complaints regarding forest boundary disputes, corruption, wildlife compensation delays, or illegal felling.',
    shortDescHi: 'वन सीमा विवाद, भ्रष्टाचार, वन्यजीव क्षति मुआवजा में देरी अथवा अवैध कटाई संबंधी औपचारिक शिकायत दर्ज करें।',
    fullDescEn: 'Dedicated grievance redressal cell overseen by a senior Indian Forest Service (IFS) officer to monitor citizen petitions and deliver time-bound resolutions within 30 days under the Citizen Charter.',
    fullDescHi: 'नागरिक अधिकार पत्र के तहत 30 दिनों के भीतर शिकायतों के समयबद्ध निस्तारण हेतु भारतीय वन सेवा (IFS) के वरिष्ठ अधिकारी की देखरेख में शिकायत प्रकोष्ठ।',
    iconName: 'FileText',
    category: 'grievance',
    timeframe: 'Maximum 30 Working Days',
    fee: 'Free of Cost (शून्य शुल्क)',
    onlineAvailable: true,
    documentsEn: [
      'Identity proof of complainant',
      'Supporting documentary evidence (photos, GPS location, past correspondence)'
    ],
    documentsHi: [
      'शिकायतकर्ता का पहचान पत्र',
      'समर्थनकारी साक्ष्य (फोटो, जीपीएस लोकेशन, पूर्व पत्राचार प्रति)'
    ],
    procedureStepsEn: [
      'Submit grievance via online form or by registered post to Nodal Officer.',
      'Unique Registration Token generated for status tracking.',
      'Inquiry report submitted by Assistant Conservator of Forests within 21 days.',
      'Action Taken Report (ATR) communicated to citizen.'
    ],
    procedureStepsHi: [
      'ऑनलाइन पोर्टल या पंजीकृत डाक द्वारा नोडल अधिकारी को शिकायत प्रेषित करें।',
      'स्थिति की जांच हेतु विशिष्ट टोकन संख्या जारी की जाएगी।',
      'सहायक वन संरक्षक द्वारा 21 दिनों में स्थलीय जांच रिपोर्ट प्रस्तुत की जाएगी।',
      'की गई कार्रवाई का अंतिम विवरण (ATR) नागरिक को उपलब्ध कराया जाएगा।'
    ]
  },
  {
    id: 'srv-rti',
    titleEn: 'Right to Information (RTI) Cell & Public Information Officers',
    titleHi: 'सूचना का अधिकार (RTI) प्रकोष्ठ एवं लोक सूचना अधिकारी (PIO) विवरण',
    shortDescEn: 'Directory of Central & State Public Information Officers (CPIO/SPIO) and First Appellate Authorities under RTI Act 2005.',
    shortDescHi: 'सूचना का अधिकार अधिनियम 2005 के अंतर्गत लोक सूचना अधिकारियों (PIO) एवं प्रथम अपीलीय अधिकारियों की विवरण सूची।',
    fullDescEn: 'Citizens can seek information regarding departmental schemes, budget expenditure, forest land diversion, and plantation survival audits under the statutory provisions of RTI Act 2005.',
    fullDescHi: 'नागरिक आरटीआई अधिनियम 2005 के वैधानिक प्रावधानों के अंतर्गत विभागीय योजनाओं, बजट व्यय, वन भूमि प्रत्यावर्तन एवं वृक्षारोपण संबंधी जानकारी प्राप्त कर सकते हैं।',
    iconName: 'BookOpen',
    category: 'information',
    timeframe: '30 Days as per RTI Act 2005',
    fee: '₹10 Statutory Postal Order / Court Fee Stamp',
    onlineAvailable: true,
    documentsEn: [
      'RTI Application in prescribed Form-A format',
      'Fee receipt of ₹10 (Postal Order / Treasury Challan / Demand Draft)',
      'BPL certificate if claiming exemption from application fee'
    ],
    documentsHi: [
      'निर्धारित प्रपत्र-क में स्पष्ट आरटीआई आवेदन',
      '₹10 का शुल्क प्रमाण (पोस्टल ऑर्डर / ट्रेजरी चालान / डीडी)',
      'बीपीएल कार्ड की प्रति, यदि शुल्क छूट के पात्र हों'
    ],
    procedureStepsEn: [
      'Address application to the designated Public Information Officer (PIO) of concerned division.',
      'Specify precise details of records or documents requested.',
      'PIO dispatches formal response within 30 days.'
    ],
    procedureStepsHi: [
      'संबंधित प्रभाग के नामित लोक सूचना अधिकारी (PIO) को आवेदन प्रेषित करें।',
      'वांछित अभिलेखों या दस्तावेजों का स्पष्ट विवरण दें।',
      'अधिकारी 30 दिनों के भीतर सूचना उपलब्ध कराएंगे अथवा उचित कारण सहित निर्णय देंगे।'
    ]
  },
  {
    id: 'srv-ecotourism',
    titleEn: 'Forest Eco-Tourism, Nature Trails & Wildlife Safari Booking Guidelines',
    titleHi: 'पर्यावरण-पर्यटन, प्रकृति पथ एवं वन्यजीव सफारी दिशा-निर्देश',
    shortDescEn: 'Guidelines, entry permits, and eco-rest house booking information for authorized wildlife sanctuaries and national parks.',
    shortDescHi: 'राज्य के अधिकृत वन्यजीव अभयारण्यों एवं राष्ट्रीय उद्यानों में भ्रमण अनुमति व विश्राम गृह (FRH) दिशा-निर्देश।',
    fullDescEn: 'Sustainable eco-tourism promotes nature conservation while providing livelihoods to fringe village communities through trained eco-guides and regulated vehicle safaris.',
    fullDescHi: 'पारिस्थितिक पर्यटन के माध्यम से वन संरक्षण को प्रोत्साहन और वन सीमावर्ती ग्रामीणों को प्रशिक्षित गाइड के रूप में रोजगार उपलब्ध कराया जाता है।',
    iconName: 'Compass',
    category: 'information',
    timeframe: 'Advance Booking Open 30 Days Prior',
    fee: 'Regulated Gate Entry Fee as per Sanctuary Schedule',
    onlineAvailable: false,
    documentsEn: [
      'Government Photo ID proof of all visitors',
      'Vehicle fitness and pollution certificate for private tourist gypsy vehicles'
    ],
    documentsHi: [
      'सभी पर्यटकों का सरकार द्वारा मान्य फोटो पहचान पत्र',
      'पर्यटन वाहनों हेतु फिटनेस एवं प्रदूषण नियंत्रण प्रमाण पत्र'
    ],
    procedureStepsEn: [
      'Check seasonal sanctuary opening dates (Typically October 15 to June 15).',
      'Obtain gate permit at forest entry reception center.',
      'Mandatory accompaniment by registered Eco-Development Committee (EDC) nature guide.'
    ],
    procedureStepsHi: [
      'अभयारण्य खुलने की मौसमी तिथियां जांचें (साधारणतः 15 अक्टूबर से 15 जून)।',
      'प्रवेश द्वार स्थित स्वागत केंद्र से अधिकृत प्रवेश पर्ची लें।',
      'पंजीकृत ग्राम पर्यावरण विकास समिति (EDC) के गाइड के साथ ही भ्रमण करें।'
    ]
  },
  {
    id: 'srv-forms',
    titleEn: 'Download Official Application Forms, Proformas & Gazettes',
    titleHi: 'आधिकारिक आवेदन प्रपत्र, प्रारूप एवं राजपत्र डाउनलोड',
    shortDescEn: 'Standard forms for timber transit, wildlife crop damage compensation, nursery indent, and forest clearance proposals.',
    shortDescHi: 'काष्ठ अभिवहन, वन्यजीव द्वारा फसल क्षति मुआवजा, पौधशाला मांग पत्र एवं वन स्वीकृति हेतु मानक प्रपत्र।',
    fullDescEn: 'Access official statutory proformas approved under State Forest Manuals to facilitate offline submission at divisional range offices.',
    fullDescHi: 'प्रभागीय वन कार्यालयों में प्रत्यक्ष जमा करने हेतु राज्य वन मैनुअल के अंतर्गत अनुमोदित वैधानिक प्रपत्रों का संग्रह।',
    iconName: 'Download',
    category: 'permits',
    timeframe: 'Instant Download',
    fee: 'Free Download (शून्य शुल्क)',
    onlineAvailable: true,
    documentsEn: [
      'Standard Form 1: Tree Felling Sanction (PDF)',
      'Standard Form 2: Wild Animal Ex-Gratia Claim for Crop/Cattle Loss',
      'Standard Form 3: Forest Transit Pass (TP) for Timber / Bamboo',
      'Standard Form 4: Right to Information Form-A'
    ],
    documentsHi: [
      'प्रपत्र 1: वृक्ष पातन अनुमति आवेदन (PDF)',
      'प्रपत्र 2: वन्यजीव द्वारा फसल/पशु क्षति अनुग्रह राशि दावा',
      'प्रपत्र 3: काष्ठ एवं बांस हेतु वन अभिवहन पास (Transit Pass)',
      'प्रपत्र 4: सूचना का अधिकार प्रपत्र-क'
    ],
    procedureStepsEn: [
      'Download relevant PDF form.',
      'Fill required details in block letters.',
      'Attach photocopies of land ownership and submit to Range Forest Officer.'
    ],
    procedureStepsHi: [
      'वांछित पीडीएफ प्रपत्र डाउनलोड करें।',
      'साफ अक्षरों में विवरण भरें।',
      'भूमि अभिलेख संलग्न कर परिक्षेत्र वन अधिकारी को प्रस्तुत करें।'
    ]
  }
];
