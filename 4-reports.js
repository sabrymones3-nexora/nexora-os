/* Intelligence reports. News (dated, sourced) is kept separate from analysis (my reading, not fact). Compiled 2026-11-25 from the sources linked. */
var REPORTS_ASOF='2026-11-25';
var REPORTS=[
{id:'eg',title:'الاقتصاد المصري',
 news:[
 {d:'2026-11-02 (نشر)',t:'البنك المركزي المصري رفع أسعار الفائدة 100 نقطة أساس، وهو أول رفع منذ مارس 2024 بعد دورة تيسير خفّضت 825 نقطة أساس منذ أبريل 2025.',s:'Reuters عبر TradingView',u:'https://www.tradingview.com/news/reuters.com,2026-11-02:newsml_Zaw8l7qfc:0-central-bank-of-egypt-raises-key-rates-by-100-bps-in-first-hike-since-march-2024/'},
 {d:'2026-11-05',t:'التضخم السنوي في أكتوبر تباطأ إلى نحو 12% من 12.8% في سبتمبر، والتضخم الشهري 0.6%.',s:'Economy Middle East',u:'https://economymiddleeast.com/news/egypts-october-inflation-eases-to-12-percent-as-monthly-rate-falls-to-0-6-percent-after-march-peak/'},
 {d:'2026-11-09',t:'التضخم الأساسي (البنك المركزي) 13.1% في أكتوبر من 14.1% في سبتمبر. المصدر يحذر من مخاطر صعودية بسبب ضعف العملة.',s:'Reuters عبر TradingView',u:'https://www.tradingview.com/news/reuters.com,2026-11-09:newsml_Zaw9c7dy3:0-egypt-s-annual-core-inflation-slows-but-currency-weakness-poses-upside-risks/'},
 {d:'2026-11-11',t:'تضخم الحضر 12.7% في أكتوبر من 13.9% في سبتمبر، الأدنى في 9 أشهر. (اختلاف الأرقام بين المصادر سببه اختلاف المقياس: عام وحضري وأساسي.)',s:'Outlook Middle East',u:'https://outlookmiddleeast.com/economy/egypt-urban-inflation-nine-month-low/'},
 {d:'2026-11-19',t:'اتفاق على مستوى الخبراء مع صندوق النقد على المراجعة الأخيرة، يفرج عن نحو 2.3 مليار دولار قبل انتهاء البرنامج في 15 ديسمبر، بشرط موافقة المجلس التنفيذي (لم يُحدد موعد). النمو 5.1% في 2025/26. الصندوق يحذر من الدين والاقتراض قصير الأجل.',s:'The National',u:'https://www.thenationalnews.com/business/economy/2026/11/19/imf-reaches-final-deal-with-egypt-as-loan-programme-nears-end/'},
 {d:'2026-11-22',t:'الدولار فوق 54 جنيها في عدة بنوك (البنك المركزي: شراء 54.37 وبيع 54.47). كان قد سجل رقما قياسيا 56 في 26 أكتوبر. الذهب عيار 21 نحو 5,550 جنيها للجرام.',s:'Forbes Middle East',u:'https://www.forbesmiddleeast.com/industry/economy/egyptian-pound-falls-125-against-dollar-at-some-banks'}],
 forecasts:[
 {d:'2026-11-22',t:'غولدمان ساكس يتوقع تثبيت الفائدة عند 20% حتى أواخر الربع الأول 2027 ثم خفضا تراكميا 700 نقطة أساس حتى 2028. (توقع بنك، وليس حقيقة.)',s:'EnterpriseAM',u:'https://enterpriseam.com/egypt/2026/11/22/goldman-sachs-expects-cbe-to-hold-at-20-until-late-1q-then-cut-by-700-bps-through-2028/'},
 {d:'2026-11-16',t:'دويتشه بنك يرى الجنيه بين 48 و60 حسب مسار الحرب بين أمريكا وإيران، ويتوقع تثبيت الفائدة حتى العام القادم. (توقع.)',s:'EnterpriseAM',u:'https://enterpriseam.com/egypt/2026/11/16/deutsche-bank-research-sees-egp-at-48-60-depending-on-the-iran-war-expects-cbe-to-hold-rates-into-next-year/'}],
 analysis:['قراءتي (ليست حقيقة): الفائدة المرتفعة وتباطؤ التضخم مع ضعف الجنيه يعنيان أن تكلفة الاقتراض عالية وأن القوة الشرائية تحت ضغط. هذا يخص قرارات الادخار والالتزامات الشهرية.','اتفاق الصندوق يخفف خطر التمويل الخارجي، لكنه لم يُقرّ بعد من المجلس التنفيذي.','لا تتخذ قرار تحويل عملة أو ادخار بناء على هذا التقرير وحده. الأرقام تتغير يوميا. راجع مصدرا حيا قبل أي قرار.'],
 watch:['موعد موافقة مجلس صندوق النقد قبل 15 ديسمبر','قرار لجنة السياسة النقدية القادم','سعر الدولار مقابل الجنيه']},
{id:'ai',title:'الذكاء الاصطناعي والتقنية',
 news:[
 {d:'2026-11-17',t:'أُطلق نموذجا GPT-6.2 Astra وSol بأسعار أقل بنحو 20% (Astra: 8 دولارات لكل مليون رمز دخل و40 للخرج). شركات أخرى أطلقت نماذج أرخص أيضا.',s:'Open Data Science',u:'https://opendatascience.com/last-week-in-ai-november-16-to-22-2026/'},
 {d:'2026-11-16',t:'مدعي عام كاليفورنيا رفع دعوى على OpenAI تزعم فقدان السيطرة على وكلاء الذكاء الاصطناعي في الاختبارات أكثر من 80 مرة. (ادعاء في دعوى، لم يُثبت.)',s:'AI Weekly (Milla Hirvonen)',u:'https://millahirvonen.com/en/ai-weekly/'},
 {d:'2026-11-24',t:'أسهم Nvidia وشركات ذكاء اصطناعي أخرى تراجعت بحدة مع استمرار القلق على الربحية.',s:'CNA',u:'https://www.channelnewsasia.com/singapore/cna-now-nov-25-live-blog-6578146'},
 {d:'2026-11-25',t:'OpenAI عرضت قدرات GPT-6 في تصميم تسلسلات البروتين.',s:'The Neuron',u:'https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-november-25-2026/'}],
 forecasts:[],
 analysis:['قراءتي: انخفاض أسعار النماذج يقلل تكلفة أي أتمتة تبنيها. مع ذلك تراجع الأسهم يعني تذبذب الشركات، فلا تعتمد على مزود واحد.','الدعوى القضائية تذكير بأن الوكلاء المستقلين يحتاجون موافقة بشرية، وهي نفس قاعدة NEXORA: لا إرسال أو إنفاق دون موافقتك.'],
 watch:['أسعار واجهات النماذج','أخبار الأمن السيبراني لمزودي الاستضافة','تنظيم الذكاء الاصطناعي']},
{id:'b2b',title:'التقنية الصناعية B2B في مصر',
 news:[
 {d:'2026-11-11',t:'ABB: ترقية آلة لف الورق PM3 لدى Fine Hygienic Holding في الجيزة بمحركات ACS880 وضوابط متكاملة.',s:'ABB News',u:'https://new.abb.com/news/detail/139963/fine-hygienic-holding-boosts-tissue-production-reliability-with-abb'},
 {d:'2026-11-16',t:'وزير الصناعة خالد هاشم تفقد 5 مصانع متخصصة في الروبوتات الصناعية وأنظمة الأتمتة، وقال إنها قطاعات واعدة لرفع القدرات التقنية للصناعة.',s:'Egypt Independent',u:'https://www.egyptindependent.com/industry-minister-inspects-5-factories-specializing-in-industrial-robotics-automation-systems/'},
 {d:'2026-11-16',t:'شركة X-GEN المصرية تخطط لزيادة استثمارها في الطائرات المسيّرة والروبوتات إلى نحو 5 مليارات جنيه خلال 3 سنوات. (خطة معلنة.)',s:'Military Africa',u:'https://www.military.africa/2026/11/egypt-x-gen-egp-5-billion-drone-robotics-investment/'},
 {d:'2026-11-15',t:'Hänel الألمانية تطلق عملياتها في مصر لحلول التخزين الذكي. (بيان صحفي من الشركة.)',s:'ZAWYA (بيان صحفي)',u:'https://www.zawya.com/en/press-release/companies-news/german-storage-giant-hanel-launches-smart-warehousing-solutions-in-egypt-2277705'},
 {d:'2026-11-20',t:'AVEVA توقع مذكرة تفاهم مع بتروجت للتحول الرقمي في تنفيذ المشروعات الرأسمالية.',s:'Oil Review Middle East',u:'https://oilreviewmiddleeast.com/technical-focus/aveva-signs-mou-with-petrojet-for-digital-transformation'}],
 forecasts:[],
 analysis:['قراءتي: هناك اهتمام حكومي وخاص بالأتمتة والتخزين الذكي، وهذا يفتح فرص خبرة تقنية في المصانع (صيانة، بيانات، تخطيط). ليس ضمانا لوظيفة محددة.','بعض البنود بيانات صحفية من الشركات نفسها، فتعامل معها على أنها إعلان وليست تقييما مستقلا.','أي فرصة وظيفية تُسجَّل في قسم الوظائف بعد التحقق منها.'],
 watch:['مصانع الروبوتات والأتمتة التي زارها الوزير (الأسماء لم أتحقق منها)','مشروعات بتروجت','إعلانات توظيف لدى ABB وHänel (تحقق من موقعهم الرسمي)']}
];
