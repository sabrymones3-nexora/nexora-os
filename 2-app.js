(function(){
'use strict';
var KEY='nexora.v1';
var MODS=['المكتب التنفيذي','المسار المهني','المالية','الأعمال','التعلم','نمط الحياة','الاستخبارات'];
var PRI=['عالية','متوسطة','منخفضة'];
var ST=['مفتوحة','قيد التنفيذ','بانتظار موافقتك','متوقفة','مكتملة'];
var LEVELS=[['المستوى 1: محو أمية الذكاء الاصطناعي','LLMs، هندسة الأوامر، وكلاء الذكاء الاصطناعي'],['المستوى 2: أتمتة الذكاء الاصطناعي','Make وn8n وZapier وAPIs وWebhooks'],['المستوى 3: البيانات وذكاء الأعمال','Excel المتقدم، Power Query، SQL، Power BI'],['المستوى 4: أساسيات البرمجة','Python، Git، HTML/CSS/JS، قواعد البيانات'],['المستوى 5: هندسة الذكاء الاصطناعي المتقدمة','Agents، RAG، قواعد المتجهات، التقييم'],['المستوى 6: التكنولوجيا الصناعية','ERP وOdoo وMES وWMS وتحسين العمليات'],['المستوى 7: القيادة التقنية','إدارة المنتجات، المعمارية، حوكمة الذكاء الاصطناعي']];
function uid(){return Math.random().toString(36).slice(2,9)}
function today(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function seed(){
 return {v:1,created:today(),
 tasks:[
 {id:uid(),title:'ابدأ من هنا: أضف أول مهمة لك من زر الإضافة',module:MODS[0],priority:'متوسطة',due:'',status:'مفتوحة',evidence:'',notes:'يمكنك حذف هذه المهمة. المهمة لا تُغلق دون دليل.'},
 {id:uid(),title:'سجّل بياناتك المالية يدويا عند الاستعداد',module:MODS[2],priority:'متوسطة',due:'',status:'مفتوحة',evidence:'',notes:'لا أرقام تقديرية على أنها حقيقية.'},
 {id:uid(),title:'اختر أول مسار للتعلم من قسم التعلم',module:MODS[4],priority:'متوسطة',due:'',status:'مفتوحة',evidence:'',notes:''}],
 decisions:[],
 projects:[],
 career:[],finance:[],ventures:[],opportunities:[],intel:[],lifestyle:[],english:[],progress:{},
 learning:LEVELS.map(function(l,i){return {id:uid(),level:i+1,name:l[0],topics:l[1],quiz:'',project:false,notes:''}}),
 audit:[{t:new Date().toISOString(),a:'تم إنشاء النظام'}]};
}
var S;
function load(){try{var r=localStorage.getItem(KEY);S=r?JSON.parse(r):seed()}catch(e){S=seed()} if(!r_ok())S=seed(); if(!S.lifestyle)S.lifestyle=[]; if(!S.english)S.english=[]; if(!S.progress)S.progress={}; save()}
function r_ok(){return S&&S.tasks&&S.decisions&&S.learning}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('تعذر الحفظ على الجهاز')}if(typeof scheduleSync==='function')scheduleSync()}
function log(a){S.audit.unshift({t:new Date().toISOString(),a:a}); if(S.audit.length>200)S.audit.length=200}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function $(s,r){return (r||document).querySelector(s)}
function toast(m){[].forEach.call(document.querySelectorAll('.toast'),function(x){x.remove()});var t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(function(){t.remove()},2200)}
function fmtDate(d){if(!d)return '';var p=d.split('-');return p[2]+'/'+p[1]+'/'+p[0]}
function money(n){return Number(n||0).toLocaleString('en-US',{maximumFractionDigits:2})}

/* ---- collections ---- */
var C={
tasks:{title:'المهام',icon:'',add:'مهمة جديدة',fields:[
 {k:'title',l:'المهمة',t:'textarea',req:1},{k:'module',l:'القسم',t:'select',o:MODS},{k:'priority',l:'الأولوية',t:'select',o:PRI},
 {k:'due',l:'تاريخ الاستحقاق',t:'date'},{k:'status',l:'الحالة',t:'select',o:ST},{k:'evidence',l:'دليل الإنجاز (مطلوب عند الإكمال)',t:'textarea'},{k:'notes',l:'ملاحظات',t:'textarea'}],
 def:function(){return {title:'',module:MODS[0],priority:'متوسطة',due:'',status:'مفتوحة',evidence:'',notes:''}},
 validate:function(o){if(o.status==='مكتملة'&&!o.evidence.trim())return 'لا تُسجَّل مهمة مكتملة بدون دليل إنجاز'},
 item:function(o){var od=isOverdue(o);return '<div class="title">'+esc(o.title)+'</div><div>'+chip(o.priority,o.priority==='عالية'?'hi':'')+chip(o.status,o.status==='مكتملة'?'ok':(o.status==='بانتظار موافقتك'||o.status==='متوقفة'?'warn':''))+chip(o.module)+(o.due?chip('الاستحقاق '+fmtDate(o.due),od?'hi':''):'')+'</div>'+(od?'<div class="meta" style="color:var(--red)">متأخرة</div>':'')}},
decisions:{title:'القرارات',icon:'',add:'قرار جديد',fields:[{k:'title',l:'القرار المطلوب',t:'textarea',req:1},{k:'recommendation',l:'التوصية',t:'textarea'},{k:'status',l:'الحالة',t:'select',o:['معلّق','موافق','مرفوض']}],
 def:function(){return {title:'',recommendation:'',status:'معلّق'}},
 item:function(o){return '<div class="title">'+esc(o.title)+'</div><div class="meta">توصيتي: '+esc(o.recommendation)+'</div>'+chip(o.status,o.status==='معلّق'?'warn':(o.status==='موافق'?'ok':'hi'))}},
projects:{title:'المشروعات',icon:'',add:'مشروع جديد',fields:[{k:'name',l:'اسم المشروع',t:'text',req:1},{k:'stage',l:'المرحلة',t:'text'},{k:'next',l:'الخطوة التالية',t:'textarea'},{k:'status',l:'الحالة',t:'select',o:['فكرة','قيد التنفيذ','متوقف','مكتمل']}],
 def:function(){return {name:'',stage:'',next:'',status:'قيد التنفيذ'}},
 item:function(o){return '<div class="title">'+esc(o.name)+'</div><div class="meta">'+esc(o.stage)+'</div>'+chip(o.status,o.status==='مكتمل'?'ok':(o.status==='متوقف'?'warn':''))+(o.next?'<div class="meta">التالي: '+esc(o.next)+'</div>':'')}},
career:{title:'المسار المهني',icon:'',add:'وظيفة / شركة',fields:[{k:'company',l:'الشركة',t:'text',req:1},{k:'role',l:'المسمى',t:'text',req:1},{k:'where',l:'المنطقة',t:'select',o:['الخليج','مصر','دولي']},{k:'stage',l:'المرحلة',t:'select',o:['مرشحة','جاهز للتقديم (بانتظار موافقتك)','تم التقديم فعلا','مقابلة','عرض','مرفوض']},{k:'applied',l:'تاريخ التقديم الفعلي (فقط إن حدث)',t:'date'},{k:'notes',l:'ملاحظات',t:'textarea'}],
 def:function(){return {company:'',role:'',where:'الخليج',stage:'مرشحة',applied:'',notes:''}},
 validate:function(o){if(/storekeeper|stock controller|أمين مخزن|امين مخزن/i.test(o.role))return 'هذه الوظيفة مستبعدة (وظائف المخازن التقليدية)'; if(/amazon|أمازون|امازون/i.test(o.company))return 'تم استبعاد Amazon بحسب تعليماتك'; var dup=S.career.filter(function(x){return x.id!==o.id&&x.company.trim().toLowerCase()===o.company.trim().toLowerCase()&&x.role.trim().toLowerCase()===o.role.trim().toLowerCase()}); if(dup.length)return 'مكررة: هذه الوظيفة مسجلة بالفعل'},
 item:function(o){return '<div class="title">'+esc(o.role)+' | '+esc(o.company)+'</div><div>'+chip(o.stage)+chip(o.where)+(o.applied?chip('قُدّم '+fmtDate(o.applied),'ok'):'')+'</div>'}},
finance:{title:'المالية',icon:'',add:'قيد مالي',fields:[{k:'date',l:'التاريخ',t:'date'},{k:'type',l:'النوع',t:'select',o:['دخل','مصروف','ادخار','التزام شهري']},{k:'cat',l:'التصنيف',t:'text'},{k:'amount',l:'المبلغ (جنيه)',t:'number',req:1},{k:'notes',l:'ملاحظة',t:'text'}],
 def:function(){return {date:today(),type:'مصروف',cat:'',amount:'',notes:''}},
 validate:function(o){if(!(Number(o.amount)>0))return 'أدخل مبلغا صحيحا أكبر من صفر'},
 item:function(o){return '<div class="row"><div><div class="title">'+esc(o.cat||o.type)+'</div><div class="meta">'+fmtDate(o.date)+' '+esc(o.notes)+'</div></div><div class="title" style="color:'+(o.type==='دخل'||o.type==='ادخار'?'var(--grn)':'var(--red)')+'">'+money(o.amount)+'</div></div>'+chip(o.type)}},
ventures:{title:'المشروعات والدخل',icon:'',add:'مشروع دخل',fields:[{k:'name',l:'الاسم',t:'text',req:1},{k:'stage',l:'المرحلة',t:'select',o:['فكرة','فرصة تم التحقق منها','تجربة MVP','قيد التشغيل','يحقق إيرادات فعلية','مصدر دخل مستقر']},{k:'model',l:'نموذج الدخل',t:'text'},{k:'revenue',l:'الإيرادات الفعلية الموثقة (جنيه)',t:'number'},{k:'expenses',l:'المصروفات (جنيه)',t:'number'},{k:'customers',l:'عدد العملاء الفعليين',t:'number'},{k:'next',l:'الخطوة التالية',t:'textarea'}],
 def:function(){return {name:'',stage:'فكرة',model:'',revenue:'',expenses:'',customers:'',next:''}},
 validate:function(o){if((o.stage==='يحقق إيرادات فعلية'||o.stage==='مصدر دخل مستقر')&&!(Number(o.revenue)>0))return 'لا يُوصف أي مشروع بأنه مصدر دخل قبل وجود إيرادات فعلية موثقة'},
 item:function(o){var net=(Number(o.revenue)||0)-(Number(o.expenses)||0);return '<div class="title">'+esc(o.name)+'</div><div>'+chip(o.stage)+chip(esc(o.model))+'</div><div class="meta">صافي الربح الفعلي: '+money(net)+' | عملاء: '+(o.customers||0)+'</div>'}},
opportunities:{title:'الفرص',icon:'',add:'فرصة جديدة',fields:[{k:'name',l:'الفرصة',t:'text',req:1}].concat(['الطلب','قوة المشكلة','استعداد العميل للدفع','المنافسة (10=قليلة)','هامش الربح','تكلفة البدء (10=منخفضة)','سرعة أول عميل','إمكانية الأتمتة','قابلية التوسع','المخاطر (10=منخفضة)','ملاءمتها لمهاراتي'].map(function(l,i){return {k:'s'+i,l:l+' (1-10)',t:'number',min:1,max:10}})).concat([{k:'notes',l:'ملاحظات وافتراضات',t:'textarea'}]),
 def:function(){var o={name:'',notes:''};for(var i=0;i<11;i++)o['s'+i]='';return o},
 validate:function(o){for(var i=0;i<11;i++){var v=o['s'+i];if(v!==''&&(Number(v)<1||Number(v)>10))return 'التقييم من 1 إلى 10 فقط'}},
 item:function(o){var t=0;for(var i=0;i<11;i++)t+=Number(o['s'+i])||0;return '<div class="row"><div class="title">'+esc(o.name)+'</div><div class="title" style="color:var(--teal)">'+t+' من 110</div></div><div class="bar"><i style="width:'+(t/110*100)+'%"></i></div>'}},
english:{title:'سجل الإنجليزي',icon:'',add:'جلسة جديدة',fields:[{k:'date',l:'التاريخ',t:'date'},{k:'level',l:'المستوى',t:'select',o:['A1','A2','B1','B2','C1']},{k:'minutes',l:'المدة بالدقائق',t:'number',req:1},{k:'activity',l:'ماذا فعلت',t:'text',req:1},{k:'evidence',l:'الدليل (جملك المكتوبة أو وصف التسجيل)',t:'textarea'}],
 def:function(){return {date:today(),level:'A1',minutes:'30',activity:'',evidence:''}},
 validate:function(o){if(!(Number(o.minutes)>0))return 'أدخل مدة صحيحة'},
 item:function(o){return '<div class="title">'+esc(o.activity)+'</div><div>'+chip(o.level)+chip(fmtDate(o.date))+chip(o.minutes+' دقيقة')+'</div>'+(o.evidence?'<div class="meta">'+esc(o.evidence)+'</div>':'<div class="meta">بدون دليل مسجل</div>')}},
lifestyle:{title:'نمط الحياة',icon:'',add:'تسجيل جديد',fields:[{k:'date',l:'التاريخ',t:'date'},{k:'kind',l:'النوع',t:'select',o:['عادة يومية','تمرين','نوم','هدف شخصي','التزام مهم','وقت عائلي']},{k:'title',l:'العنوان',t:'text',req:1},{k:'value',l:'القيمة (اختياري، مثال: 30 دقيقة)',t:'text'},{k:'notes',l:'ملاحظات (اختياري)',t:'textarea'}],
 def:function(){return {date:today(),kind:'عادة يومية',title:'',value:'',notes:''}},
 item:function(o){return '<div class="title">'+esc(o.title)+'</div><div>'+chip(o.kind)+chip(fmtDate(o.date))+(o.value?chip(esc(o.value)):'')+'</div>'+(o.notes?'<div class="meta">'+esc(o.notes)+'</div>':'')}},
intel:{title:'الاستخبارات',icon:'',add:'عنصر جديد',fields:[{k:'date',l:'تاريخ النشر',t:'date'},{k:'area',l:'المجال',t:'select',o:['الاقتصاد المصري','الذكاء الاصطناعي والتقنية','أسواق الأعمال B2B','برامج ومنح وفرص']},{k:'kind',l:'النوع',t:'select',o:['خبر','تحليل','توقع']},{k:'source',l:'المصدر والرابط',t:'text',req:1},{k:'summary',l:'ملخص التغيير ولماذا يهم',t:'textarea'},{k:'action',l:'الإجراء المقترح',t:'textarea'}],
 def:function(){return {date:today(),area:'الاقتصاد المصري',kind:'خبر',source:'',summary:'',action:''}},
 item:function(o){return '<div class="title">'+esc(o.summary||o.source)+'</div><div>'+chip(o.kind)+chip(o.area)+chip(fmtDate(o.date))+'</div><div class="meta">المصدر: '+esc(o.source)+'</div>'}}
};
function chip(t,c){return t?'<span class="chip '+(c||'')+'">'+t+'</span>':''}
function isOverdue(o){return o.due&&o.status!=='مكتملة'&&o.due<today()}

/* ---- ui helpers ---- */
function sheet(html){var bg=document.createElement('div');bg.className='sheet-bg';bg.innerHTML='<div class="sheet">'+html+'</div>';bg.addEventListener('click',function(e){if(e.target===bg)bg.remove()});document.body.appendChild(bg);return bg}
function form(col,obj,isNew){
 var c=C[col],h='<h3 style="margin:0 0 4px">'+(isNew?c.add:'تعديل')+'</h3>';
 c.fields.forEach(function(f){var v=obj[f.k]==null?'':obj[f.k];h+='<label>'+f.l+'</label>';
  if(f.t==='textarea')h+='<textarea rows="3" data-k="'+f.k+'">'+esc(v)+'</textarea>';
  else if(f.t==='select')h+='<select data-k="'+f.k+'">'+f.o.map(function(o){return '<option'+(o===v?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>';
  else h+='<input data-k="'+f.k+'" type="'+f.t+'" '+(f.t==='number'?'inputmode="decimal" step="any" ':'')+(f.min!=null?'min="'+f.min+'" max="'+f.max+'" ':'')+'value="'+esc(v)+'">';});
 h+='<div id="err" style="color:var(--red);margin-top:8px;font-size:14px"></div><div class="acts"><button id="sv">حفظ</button><button class="sec" id="cn">إلغاء</button>'+(isNew?'':'<button class="dng" id="dl">حذف</button>')+'</div>';
 var bg=sheet(h);
 $('#cn',bg).onclick=function(){bg.remove()};
 $('#sv',bg).onclick=function(){
  var o=isNew?{id:uid()}:obj, n={};
  Object.keys(obj).forEach(function(k){n[k]=obj[k]});n.id=o.id;
  [].forEach.call(bg.querySelectorAll('[data-k]'),function(el){n[el.getAttribute('data-k')]=el.value});
  for(var i=0;i<c.fields.length;i++){var f=c.fields[i];if(f.req&&!String(n[f.k]).trim()){$('#err',bg).textContent='الحقل مطلوب: '+f.l;return}}
  if(c.validate){var m=c.validate(n);if(m){$('#err',bg).textContent=m;return}}
  if(isNew)S[col].unshift(n);else{var ix=S[col].findIndex(function(x){return x.id===n.id});S[col][ix]=n}
  log((isNew?'إضافة: ':'تعديل: ')+c.title);save();bg.remove();render();toast('تم الحفظ')};
 var d=$('#dl',bg);if(d)d.onclick=function(){if(d.dataset.s){S[col]=S[col].filter(function(x){return x.id!==obj.id});log('حذف: '+c.title);save();bg.remove();render();toast('تم الحذف')}else{d.dataset.s=1;d.textContent='اضغط للتأكيد'}};
}
function listView(col){
 var c=C[col],arr=S[col],h='<h2>'+c.title+' ('+arr.length+')</h2>';
 if(col==='tasks'){arr=arr.slice().sort(function(a,b){return rank(b)-rank(a)})}
 if(col==='finance')h+=financeSummary();
 if(!arr.length)h+='<div class="empty">لا توجد بيانات بعد.<br>اضغط + للإضافة. لن أضيف أرقاما أو بيانات من عندي.</div>';
 arr.forEach(function(o){h+='<div class="card" data-id="'+o.id+'">'+c.item(o)+(col==='decisions'&&o.status==='معلّق'?'<div class="acts"><button class="sm" data-a="ok">موافق</button><button class="sm dng" data-a="no">رفض</button></div>':'')+(col==='tasks'&&o.status!=='مكتملة'?'<div class="acts"><button class="sm sec" data-a="done">إنجاز</button></div>':'')+'</div>'});
 h+='<button class="fab" id="add" aria-label="إضافة">+</button>';
 return h;
}
function financeSummary(){
 var t={'دخل':0,'مصروف':0,'ادخار':0,'التزام شهري':0};S.finance.forEach(function(o){t[o.type]+=Number(o.amount)||0});
 return '<div class="card"><div class="sum"><span>الدخل</span><b>'+money(t['دخل'])+'</b></div><div class="sum"><span>المصروفات</span><b>'+money(t['مصروف'])+'</b></div><div class="sum"><span>الالتزامات الشهرية</span><b>'+money(t['التزام شهري'])+'</b></div><div class="sum"><span>الادخار</span><b>'+money(t['ادخار'])+'</b></div><div class="sum"><span>الصافي (دخل - مصروف - التزامات)</span><b>'+money(t['دخل']-t['مصروف']-t['التزام شهري'])+'</b></div></div><div class="note">إدخال يدوي فقط، لا يوجد ربط بنوك. المعاملات المتوافقة مع الضوابط الشرعية، ولا تنفيذ لأي معاملة بدون موافقتك.</div>'}
function rank(o){if(o.status==='مكتملة')return -1;var p=o.priority==='عالية'?3:o.priority==='متوسطة'?2:1;var d=0;if(o.due){d=Math.max(0,500-Math.round((new Date(o.due)-new Date(today()))/864e5))}return p*1000+d}

/* ---- screens ---- */
function home(){
 var open=S.tasks.filter(function(t){return t.status!=='مكتملة'}),top=open.sort(function(a,b){return rank(b)-rank(a)}).slice(0,3);
 var od=S.tasks.filter(isOverdue).length,pend=S.decisions.filter(function(d){return d.status==='معلّق'}),blk=S.tasks.filter(function(t){return t.status==='متوقفة'}).length+S.projects.filter(function(p){return p.status==='متوقف'}).length;
 var apps=S.career.filter(function(c){return c.applied}).length,rev=S.ventures.filter(function(v){return Number(v.revenue)>0}).length,mast=S.learning.filter(mastered).length;
 var d=new Date().toLocaleDateString('ar-EG-u-nu-latn',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
 var h='<h2>'+d+'</h2><h2>أهم 3 أولويات</h2>';
 if(!top.length)h+='<div class="empty">لا مهام مفتوحة. أضف مهمة من تبويب المهام.</div>';
 top.forEach(function(o,i){h+='<div class="card" data-id="'+o.id+'" data-c="tasks"><div class="row"><div style="font-weight:800;color:var(--teal);font-size:20px">'+(i+1)+'</div><div style="flex:1">'+C.tasks.item(o)+'</div></div><div class="acts"><button class="sm sec" data-a="done">إنجاز</button></div></div>'});
 h+='<h2>نظرة سريعة</h2><div class="grid">'+kpi(open.length,'مهام مفتوحة')+kpi(od,'متأخرة',od>0)+kpi(pend.length,'تنتظر موافقتك',pend.length>0)+kpi(blk,'متوقفة')+kpi(apps,'تقديمات فعلية')+kpi(rev,'مشروعات بإيراد فعلي')+kpi(mast,'مستويات متقنة')+kpi(S.projects.filter(function(p){return p.status==='قيد التنفيذ'}).length,'مشروعات نشطة')+kpi(money(finNet()),'صافي المالية')+'</div>';
 h+='<h2>قرارات تنتظرك</h2>';
 if(!pend.length)h+='<div class="empty">لا قرارات معلّقة.</div>';
 pend.forEach(function(o){h+='<div class="card" data-id="'+o.id+'" data-c="decisions">'+C.decisions.item(o)+'<div class="acts"><button class="sm" data-a="ok">موافق</button><button class="sm dng" data-a="no">رفض</button></div></div>'});
 h+='<div class="note">القاعدة: الأرقام هنا من بياناتك فقط. الصفر يعني لم تُدخَل بيانات بعد. لا يتم إرسال أو تقديم أو إنفاق أو حذف بدون موافقتك.</div>';
 return h;
}
function kpi(v,l,al){return '<div class="kpi'+(al?' alert':'')+'"><b>'+v+'</b><span>'+l+'</span></div>'}
function finNet(){var n=0;S.finance.forEach(function(o){var a=Number(o.amount)||0;if(o.type==='دخل')n+=a;else if(o.type==='مصروف'||o.type==='التزام شهري')n-=a});return n}
function mastered(l){return Number(l.quiz)>=80&&l.project}
function learning(){
 var h='<h2>أكاديمية الذكاء الاصطناعي والتقنية</h2><div class="note">لا ينتقل المستوى التالي إلا بعد إثبات الإتقان: اختبار 80% أو أكثر + مشروع صغير منجز. مشاهدة فيديو لا تُحسب إتقانا.</div>';
 S.learning.forEach(function(l,i){var prev=i===0||mastered(S.learning[i-1]),m=mastered(l);
  h+='<div class="card" data-id="'+l.id+'" data-c="learning"><div class="title">'+esc(l.name)+'</div><div class="meta">'+esc(l.topics)+'</div><div>'+(m?chip('متقن ','ok'):prev?chip('متاح','warn'):chip('مقفول حتى إتقان السابق'))+(l.quiz!==''?chip('الاختبار '+l.quiz+'%'):'')+(l.project?chip('المشروع منجز','ok'):'')+'</div>'+(prev?'<div class="acts"><button class="sm sec" data-a="edit">تسجيل نتيجة</button></div>':'')+lessonsOf(l.level).map(function(x){var p=S.progress[x.id];return '<div class="meta"><a href="#/lesson/'+x.id+'" style="color:var(--teal);font-weight:700">'+esc(x.title)+'</a>'+(p?' ('+p.best+'%)':'')+'</div>'}).join('')+'</div>'});
 return h;
}

var SEARCH_Q='';
function searchView(){
 var h='<h2>بحث شامل</h2><input id="sq" type="search" placeholder="ابحث في المهام والقرارات والمشروعات والمسار المهني والمالية والفرص والتعلم..." value="'+esc(SEARCH_Q)+'" style="width:100%;font-size:17px;padding:12px;border-radius:12px;border:1px solid #cfd6e4;box-sizing:border-box"><div id="sr">'+searchResults(SEARCH_Q)+'</div>';
 return h;
}
function searchResults(q){
 q=(q||'').trim().toLowerCase();if(!q)return '<div class="empty">اكتب كلمة للبحث في كل بياناتك.</div>';
 var h='',n=0;
 ['tasks','decisions','projects','career','finance','ventures','opportunities','intel','lifestyle','english'].forEach(function(col){
  if(!C[col]||!S[col])return;
  var m=S[col].filter(function(o){return JSON.stringify(o).toLowerCase().indexOf(q)>-1});
  if(!m.length)return;n+=m.length;
  h+='<h2>'+C[col].title+' ('+m.length+')</h2>'+m.slice(0,20).map(function(o){return '<div class="card" data-id="'+o.id+'" data-c="'+col+'">'+C[col].item(o)+'</div>'}).join('');
 });
 var lm=S.learning.filter(function(o){return JSON.stringify(o).toLowerCase().indexOf(q)>-1});
 if(lm.length){n+=lm.length;h+='<h2>الأكاديمية ('+lm.length+')</h2>'+lm.map(function(o){return '<div class="card" data-id="'+o.id+'" data-c="learning"><div class="title">'+esc(o.name)+'</div><div class="meta">'+esc(o.topics)+'</div></div>'}).join('')}
 return n?h:'<div class="empty">لا نتائج.</div>';
}
function reportView(){
 var T=S.tasks,done=T.filter(function(t){return t.status==='مكتملة'}),open=T.filter(function(t){return t.status!=='مكتملة'});
 var apps=S.career.filter(function(c){return c.applied}),iv=S.career.filter(function(c){return c.stage==='مقابلة'}),of=S.career.filter(function(c){return c.stage==='عرض'});
 var V=S.ventures,rev=0,cost=0;V.forEach(function(v){rev+=Number(v.revenue)||0;cost+=Number(v.expenses||v.cost)||0});
 var mast=S.learning.filter(mastered).length;
 function row(l,v,note){return '<div class="sum"><span>'+l+(note?'<small style="display:block;color:#7a8499">'+note+'</small>':'')+'</span><b>'+v+'</b></div>'}
 var h='<h2>لوحة المؤشرات</h2><div class="note">كل رقم هنا محسوب من بياناتك المسجلة فقط. لا تقديرات. "لا بيانات" تعني أنك لم تسجل شيئا بعد.</div>';
 h+='<h2>الأداء الشخصي</h2><div class="card">'+row('مهام مكتملة بدليل',done.length+' من '+T.length)+row('مهام متأخرة',T.filter(isOverdue).length)+row('سجلات نمط الحياة',S.lifestyle.length||'لا بيانات')+'</div>';
 h+='<h2>المسار المهني</h2><div class="card">'+row('وظائف مرصودة',S.career.length||'لا بيانات')+row('تقديمات فعلية',apps.length)+row('مقابلات',iv.length)+row('عروض',of.length)+'</div>';
 h+='<h2>الأعمال والدخل</h2><div class="card">'+row('فرص مسجلة',S.opportunities.length||'لا بيانات')+row('مشروعات دخل مسجلة',V.length||'لا بيانات')+row('إيراد فعلي موثق',rev>0?money(rev):'لا بيانات')+row('مصروفات المشروعات',cost>0?money(cost):'لا بيانات')+'</div>';
 h+='<h2>الذكاء الاصطناعي والتقنية</h2><div class="card">'+row('مستويات متقنة',mast+' من 7','الإتقان = اختبار 80% أو أكثر + مشروع')+row('مشروعات تعلم منجزة',S.learning.filter(function(l){return l.project}).length)+'</div>';
 h+='<h2>النظام</h2><div class="card">'+row('عمليات مسجلة في السجل',S.audit.length)+row('الوقت الموفر','لا يُقاس بعد','لا يوجد قياس تلقائي، ولن أعرض رقما تقديريا')+row('نسبة نجاح الأتمتة','لا يوجد','لا أتمتة مفعلة بعد')+'</div>';
 return h;
}

function shuf(a){var b=a.map(function(x,i){return {x:x,i:i}});for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=b[i];b[i]=b[j];b[j]=t}return b}
var QZ={};
function lessonsOf(lv){return LESSONS.filter(function(l){return l.lv===lv})}
function lessonView(id){
 var L=LESSONS.filter(function(x){return x.id===id})[0];if(!L)return '<div class="empty">الدرس غير موجود.</div>';
 var p=S.progress[id],lvName=S.learning[L.lv-1].name;
 var h='<h2>'+esc(L.title)+'</h2><div class="meta">المستوى '+L.lv+': '+esc(lvName)+'</div>';
 h+='<div class="card"><div class="title">الشرح</div><div class="meta" style="font-size:16px;line-height:1.8;color:#1b2540">'+esc(L.ar)+'</div><div style="margin-top:8px">'+L.terms.map(function(t){return '<span class="chip" dir="ltr">'+esc(t)+'</span>'}).join('')+'</div></div>';
 h+='<div class="card"><div class="title">المصدر (تم التحقق من الرابط في '+VERIFIED+')</div><div class="meta"><a href="'+L.src.u+'" target="_blank" rel="noopener" style="color:var(--teal)">'+esc(L.src.n)+'</a></div>'+(L.alt?'<div class="meta"><a href="'+L.alt.u+'" target="_blank" rel="noopener" style="color:var(--teal)">'+esc(L.alt.n)+'</a></div>':'')+'<div class="meta">مصادر رسمية ودورات. لا توجد فيديوهات مرتبطة لأنها لم تُتحقق بعد.</div></div>';
 h+='<div class="card"><div class="title">تطبيق عملي</div><div class="meta">'+esc(L.practice)+'</div></div><div class="card"><div class="title">مشروع صغير</div><div class="meta">'+esc(L.project)+'</div></div>';
 h+='<h2>اختبار قصير</h2>'+(p?'<div class="note">أفضل نتيجة: '+p.best+'% ، آخر نتيجة: '+p.last+'% ('+fmtDate(p.date)+')</div>':'');
 var q=QZ[id];if(!q||!q.length){q=QZ[id]=L.quiz.map(function(qq){return {q:qq.q,o:shuf(qq.o.map(function(t,i){return t})) ,a:qq.o[qq.a]}})}
 h+='<div class="card" id="quiz">'+q.map(function(qq,i){return '<div style="margin-bottom:14px"><div class="title">'+(i+1)+'. '+esc(qq.q)+'</div>'+qq.o.map(function(ob,j){return '<label style="display:block;padding:8px 4px"><input type="radio" name="q'+i+'" value="'+j+'"> '+esc(ob.x)+'</label>'}).join('')+'</div>'}).join('')+'<div id="qres" class="meta"></div><div class="acts"><button id="qgo">تصحيح</button></div></div>';
 return h;
}
function gradeQuiz(id){
 var L=LESSONS.filter(function(x){return x.id===id})[0],q=QZ[id],ok=0,miss=[];
 q.forEach(function(qq,i){var sel=document.querySelector('input[name=q'+i+']:checked');if(sel&&qq.o[Number(sel.value)].x===qq.a)ok++;else miss.push((i+1)+') '+qq.a)});
 var score=Math.round(ok*100/q.length),prev=S.progress[id];
 S.progress[id]={best:Math.max(score,prev?prev.best:0),last:score,date:today()};
 var ls=lessonsOf(L.lv),all=ls.every(function(x){return S.progress[x.id]});
 if(all){S.learning[L.lv-1].quiz=Math.round(ls.reduce(function(a,x){return a+S.progress[x.id].best},0)/ls.length)}
 log('اختبار '+id+': '+score+'%');save();
 $('#qres').innerHTML='النتيجة: '+score+'%'+(miss.length?'<br>الإجابات الصحيحة للأسئلة الخاطئة أو المتروكة:<br>'+miss.map(esc).join('<br>'):'<br>كل الإجابات صحيحة.')+(all?'<br>درجة المستوى حُدّثت من أفضل نتائج دروسه. الإتقان يحتاج أيضا مشروعا منجزا.':'');
 var b=$('#qgo');b.textContent='إعادة الاختبار';b.onclick=function(){QZ[id]=null;render()};
}
function englishView(){
 var E=ENGLISH,h='<h2>خطة الإنجليزي من A1 إلى C1</h2><div class="note">'+esc(E.note)+'</div>';
 h+='<div class="card"><div class="title">الخطوة الأولى</div><div class="meta">اعمل اختبار تحديد المستوى ثم ابدأ من المستوى الذي ينتج عنه.</div><div class="meta"><a href="'+E.start.u+'" target="_blank" rel="noopener" style="color:var(--teal)">'+esc(E.start.n)+'</a></div><div class="meta"><a href="'+E.framework.u+'" target="_blank" rel="noopener" style="color:var(--teal)">'+esc(E.framework.n)+'</a></div></div>';
 h+='<div class="card"><div class="title">شكل الجلسة (30 دقيقة)</div>'+E.session.map(function(x){return '<div class="meta">• '+esc(x)+'</div>'}).join('')+'<div class="meta">مصادر الجلسات:</div>'+E.sources.map(function(x){return '<div class="meta"><a href="'+x.u+'" target="_blank" rel="noopener" style="color:var(--teal)">'+esc(x.n)+'</a></div>'}).join('')+'<div class="meta">الروابط تم التحقق منها في '+VERIFIED+'.</div></div>';
 E.levels.forEach(function(l){h+='<div class="card"><div class="title">'+l.c+': '+esc(l.goal)+'</div>'+l.can.map(function(x){return '<div class="meta">• '+esc(x)+'</div>'}).join('')+'<div class="meta">التركيز: '+esc(l.focus)+'</div><div class="meta">شرط الانتقال: '+esc(l.exit)+'</div></div>'});
 var tot=S.english.reduce(function(a,x){return a+(Number(x.minutes)||0)},0);
 h+='<div class="card"><div class="title">سجلك</div><div class="meta">'+S.english.length+' جلسة، '+tot+' دقيقة مسجلة</div><div class="acts"><a href="#/english_log" style="text-decoration:none"><button class="sm">فتح السجل وإضافة جلسة</button></a></div></div>';
 return h;
}

function reportsView(){
 var h='<h2>تقارير الاستخبارات</h2><div class="note">الأخبار مفصولة عن التحليل. كل خبر بتاريخه ومصدره. التحليل رأيي وليس حقيقة. جُمعت في '+REPORTS_ASOF+'. لم أتحقق من كل تفصيلة في المصادر الأصلية، فراجع المصدر قبل أي قرار. التقارير ثابتة وقت الإعداد، والتحديث اليومي يأتي من الموجز المجدول.</div>';
 REPORTS.forEach(function(r){
  h+='<div class="card"><div class="title">'+esc(r.title)+'</div><div class="meta"><b>الأخبار</b></div>'+r.news.map(function(n){return '<div class="meta" style="margin:6px 0">• <span dir="ltr">'+esc(n.d)+'</span>: '+esc(n.t)+' <a href="'+n.u+'" target="_blank" rel="noopener" style="color:var(--teal)">'+esc(n.s)+'</a></div>'}).join('');
  if(r.forecasts.length)h+='<div class="meta"><b>توقعات جهات أخرى (ليست حقائق)</b></div>'+r.forecasts.map(function(n){return '<div class="meta" style="margin:6px 0">• <span dir="ltr">'+esc(n.d)+'</span>: '+esc(n.t)+' <a href="'+n.u+'" target="_blank" rel="noopener" style="color:var(--teal)">'+esc(n.s)+'</a></div>'}).join('');
  h+='<div class="meta"><b>التحليل (رأي)</b></div>'+r.analysis.map(function(a){return '<div class="meta" style="margin:6px 0">• '+esc(a)+'</div>'}).join('')+'<div class="meta"><b>ما يُراقب</b>: '+r.watch.map(esc).join('، ')+'</div></div>'});
 return h;
}
function more(){
 return '<h2>المزيد</h2><div class="menu"><a href="#/search"> بحث شامل</a><a href="#/report"> لوحة المؤشرات</a><a href="#/lifestyle"> نمط الحياة<small>'+S.lifestyle.length+'</small></a><a href="#/career"> المسار المهني<small>'+S.career.length+'</small></a><a href="#/finance"> المالية<small>'+S.finance.length+'</small></a><a href="#/ventures"> المشروعات والدخل<small>'+S.ventures.length+'</small></a><a href="#/opportunities"> الفرص<small>'+S.opportunities.length+'</small></a><a href="#/reports"> تقارير الاستخبارات</a><a href="#/english"> خطة الإنجليزي<small>'+S.english.length+'</small></a><a href="#/learning"> أكاديمية التعلم<small>'+S.learning.filter(mastered).length+'/7 متقن</small></a><a href="#/intel"> الاستخبارات<small>'+S.intel.length+'</small></a><a href="#/settings"> النسخ الاحتياطي والإعدادات</a></div>';
}

/* ===== Cloud sync (Supabase, free tier). Public key only; data protected by row-level security ===== */
var SB={url:'https://nvpaleosqdvbgseenfdj.supabase.co',key:'sb_publishable_2F6Rr4PVteNPUgKg8uTMTw_RrNyqS-l'};
var AUTHK='nexora.auth',SYNCK='nexora.sync',SYNC_MSG='',SYNC_BUSY=false,SYNC_T=null;
function jget(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function hashS(){var t=JSON.stringify(S),h=5381;for(var i=0;i<t.length;i++)h=((h<<5)+h+t.charCodeAt(i))|0;return String(h)+':'+t.length}
function sbReq(path,opt,tok){opt=opt||{};var hd={'apikey':SB.key,'Content-Type':'application/json'};if(tok)hd['Authorization']='Bearer '+tok;for(var k in (opt.headers||{}))hd[k]=opt.headers[k];
 return fetch(SB.url+path,{method:opt.method||'GET',headers:hd,body:opt.body}).then(function(r){return r.text().then(function(t){var j=null;try{j=t?JSON.parse(t):null}catch(e){}return {ok:r.ok,status:r.status,j:j}})})}
function authErr(r){var m=(r.j&&(r.j.msg||r.j.error_description||r.j.message||r.j.error))||('خطأ '+r.status);
 if(/Invalid login/i.test(m))return 'البريد أو كلمة المرور غير صحيحة، أو لم يُؤكَّد البريد بعد.';
 if(/already registered/i.test(m))return 'هذا البريد مسجل. استخدم تسجيل الدخول.';
 if(/Password should/i.test(m))return 'كلمة المرور ضعيفة: 8 أحرف على الأقل.';
 if(/rate limit/i.test(m))return 'تم تجاوز حد الرسائل مؤقتا. حاول بعد قليل.';
 if(/not confirmed/i.test(m))return 'أكّد بريدك من الرسالة المرسلة إلى صندوقك أولا.';
 return m}
function saveAuth(j){var a={access_token:j.access_token,refresh_token:j.refresh_token,expires_at:Math.floor(Date.now()/1000)+(j.expires_in||3600),email:j.user&&j.user.email,uid:j.user&&j.user.id};localStorage.setItem(AUTHK,JSON.stringify(a));return a}
function getTok(){var a=jget(AUTHK);if(!a)return Promise.resolve(null);if(a.expires_at-60>Date.now()/1000)return Promise.resolve(a);
 return sbReq('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:a.refresh_token})}).then(function(r){if(r.ok&&r.j&&r.j.access_token)return saveAuth(r.j);if(r.status===400||r.status===401){localStorage.removeItem(AUTHK);return null}throw new Error('net')})}
function canon(v){if(Array.isArray(v))return '['+v.map(canon).join(',')+']';if(v&&typeof v==='object')return '{'+Object.keys(v).sort().map(function(k){return JSON.stringify(k)+':'+canon(v[k])}).join(',')+'}';return JSON.stringify(v)}
function sg(x){if(!x||typeof x!=='object')return canon(x);var c={};Object.keys(x).forEach(function(k){if(k!=='id')c[k]=x[k]});return canon(c)}
function mergeById(local,remote){var o=JSON.parse(JSON.stringify(remote));Object.keys(local).forEach(function(k){var lv=local[k];if(Array.isArray(lv)){var rv=Array.isArray(o[k])?o[k]:[];var ids={};rv.forEach(function(x){if(x&&x.id)ids[x.id]=1});var sig={};rv.forEach(function(y){sig[sg(y)]=1});lv.forEach(function(x){if(x&&x.id&&ids[x.id]){rv=rv.map(function(y){return y&&y.id===x.id?x:y})}else if(!sig[sg(x)])rv.push(x)});var seen={};o[k]=rv.filter(function(y){if(!y||!y.id)return true;if(seen[y.id])return false;seen[y.id]=1;return true})}else if(lv&&typeof lv==='object'&&k==='progress'){o[k]=Object.assign({},o[k]||{},lv)}else if(!(k in o))o[k]=lv});return o}
function adopt(d){localStorage.setItem('nexora.prebackup',JSON.stringify({t:new Date().toISOString(),data:S}));S=d;if(!S.lifestyle)S.lifestyle=[];if(!S.english)S.english=[];if(!S.progress)S.progress={};try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function syncNow(again){
 if(SYNC_BUSY)return Promise.resolve();SYNC_BUSY=true;
 return getTok().then(function(a){
  if(!a){SYNC_MSG='سجّل الدخول أولا.';return}
  var st=jget(SYNCK)||{},uid=a.uid;
  return sbReq('/rest/v1/nexora_state?select=data,updated_at&user_id=eq.'+uid,{},a.access_token).then(function(r){
   if(!r.ok)throw new Error('read '+r.status);
   var rem=r.j&&r.j[0],lh=hashS(),dirty=st.hash!==lh;
   function push(data,msg){var ts=rem?rem.updated_at:null,now=new Date().toISOString(),body=JSON.stringify({user_id:uid,data:data,updated_at:now});
    var p=rem?sbReq('/rest/v1/nexora_state?user_id=eq.'+uid+'&updated_at=eq.'+encodeURIComponent(ts),{method:'PATCH',headers:{'Prefer':'return=representation'},body:JSON.stringify({data:data,updated_at:now})},a.access_token)
             :sbReq('/rest/v1/nexora_state',{method:'POST',headers:{'Prefer':'return=representation'},body:body},a.access_token);
    return p.then(function(w){
     if(rem&&w.ok&&Array.isArray(w.j)&&w.j.length===0){if(!again){SYNC_BUSY=false;return syncNow(true)}throw new Error('conflict')}
     if(!w.ok){if(w.status===409&&!again){SYNC_BUSY=false;return syncNow(true)}throw new Error('write '+w.status)}
     var row=Array.isArray(w.j)?w.j[0]:w.j;localStorage.setItem(SYNCK,JSON.stringify({hash:hashS(),remote:row&&row.updated_at,last:new Date().toISOString()}));SYNC_MSG=msg})}
   if(!rem){return push(S,'رُفعت بياناتك إلى حسابك.')}
   var remoteChanged=st.remote!==rem.updated_at;
   if(!remoteChanged){if(!dirty){localStorage.setItem(SYNCK,JSON.stringify({hash:lh,remote:rem.updated_at,last:new Date().toISOString()}));SYNC_MSG='كل شيء محدّث.';return}return push(S,'رُفعت تغييراتك.')}
   if(!dirty&&st.hash){adopt(rem.data);localStorage.setItem(SYNCK,JSON.stringify({hash:hashS(),remote:rem.updated_at,last:new Date().toISOString()}));SYNC_MSG='سُحبت أحدث بيانات من حسابك.';return}
   var m=mergeById(S,rem.data);adopt(m);rem=rem;return push(m,'تم دمج بيانات الجهاز مع بيانات الحساب (نسخة من بيانات الجهاز محفوظة احتياطيا).')
  })}).catch(function(e){SYNC_MSG=(e&&e.message==='conflict')?'تعارض مع جهاز آخر. أعد المزامنة.':'تعذرت المزامنة (الاتصال أو الخادم). بياناتك سليمة على الجهاز، أعد المحاولة.'})
 .then(function(){SYNC_BUSY=false;if(location.hash==='#/settings')render()})}
function scheduleSync(){if(!jget(AUTHK))return;clearTimeout(SYNC_T);SYNC_T=setTimeout(function(){syncNow()},4000)}
function doAuth(kind){var em=($('#au_email').value||'').trim().toLowerCase(),pw=$('#au_pw').value||'';
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){SYNC_MSG='أدخل بريدا صحيحا.';render();return}
 if(pw.length<8){SYNC_MSG='كلمة المرور 8 أحرف على الأقل.';render();return}
 SYNC_MSG='جارٍ الاتصال...';render();
 var path=kind==='up'?'/auth/v1/signup':'/auth/v1/token?grant_type=password';
 sbReq(path,{method:'POST',body:JSON.stringify({email:em,password:pw})}).then(function(r){
  if(!r.ok){SYNC_MSG=authErr(r);render();return}
  if(r.j&&r.j.access_token){saveAuth(r.j);log('تسجيل دخول للمزامنة');save();SYNC_MSG='تم تسجيل الدخول.';render();return syncNow()}
  SYNC_MSG='أُرسلت رسالة تأكيد إلى بريدك. افتح الرابط فيها ثم ارجع وسجّل الدخول.';render()
 }).catch(function(){SYNC_MSG='تعذر الاتصال بالخادم. تأكد من الإنترنت وأعد المحاولة. بياناتك المحلية سليمة.';render()})}
function doOut(){var a=jget(AUTHK);if(a)sbReq('/auth/v1/logout',{method:'POST'},a.access_token).catch(function(){});localStorage.removeItem(AUTHK);localStorage.removeItem(SYNCK);SYNC_MSG='تم تسجيل الخروج. بياناتك باقية على الجهاز.';render()}
function syncCard(){var a=jget(AUTHK),st=jget(SYNCK)||{};
 var h='<div class="card"><div class="title">الحساب والمزامنة (سحابة مجانية)</div>';
 if(a){h+='<div class="meta">مسجل الدخول: <span dir="ltr">'+esc(a.email||'')+'</span></div><div class="meta">آخر مزامنة: '+(st.last?new Date(st.last).toLocaleString('ar-EG-u-nu-latn'):'لم تتم بعد')+'</div><div class="acts"><button id="au_sync">مزامنة الآن</button><button class="sec" id="au_out">تسجيل الخروج</button></div>'}
 else{h+='<div class="meta">اختياري. بياناتك تعمل على الجهاز دون حساب. الحساب يتيح نسخة سحابية وفتحها من جهاز آخر. كلمة المرور لا تُخزَّن في التطبيق.</div><label class="meta">البريد</label><input id="au_email" type="email" dir="ltr" autocomplete="email" style="width:100%;padding:10px;margin:4px 0"><label class="meta">كلمة المرور (8 أحرف على الأقل)</label><input id="au_pw" type="password" dir="ltr" autocomplete="current-password" style="width:100%;padding:10px;margin:4px 0"><div class="acts"><button id="au_in">تسجيل الدخول</button><button class="sec" id="au_up">إنشاء حساب</button></div>'}
 if(SYNC_MSG)h+='<div class="note" id="au_msg">'+esc(SYNC_MSG)+'</div>';
 return h+'<div class="meta">عند اختلاف النسخ بين جهازين تُدمج السجلات بالمعرّف ويُحفظ احتياطي محلي. الحذف على جهاز قد لا ينتقل للآخر.</div></div>'}
function settings(){
 var h='<h2>النسخ الاحتياطي والإعدادات</h2><div class="card"><div class="title">بياناتك على هذا الجهاز فقط</div><div class="meta">تُحفظ داخل متصفح الآيفون. المزامنة السحابية اختيارية (بالأسفل). اعمل نسخة احتياطية بانتظام، فمسح بيانات Safari يمسحها.</div><div class="acts"><button id="ex">تصدير نسخة احتياطية</button><button class="sec" id="im">استيراد نسخة</button></div><input type="file" id="fi" accept=".json,application/json" style="display:none"></div>';
 h+=syncCard();
 h+='<div class="card"><div class="title">سجل العمليات</div>'+S.audit.slice(0,15).map(function(a){return '<div class="meta">'+new Date(a.t).toLocaleString('ar-EG-u-nu-latn')+' | '+esc(a.a)+'</div>'}).join('')+'</div>';
 h+='<div class="card"><div class="title">إعادة الضبط</div><div class="meta">يمسح كل البيانات ويعيد البيانات الأولية.</div><div class="acts"><button class="dng" id="rs">مسح كل شيء</button></div></div><div class="note">لم يُبنَ بعد: ربط جيميل والتقويم والبنك، والإشعارات.</div>';
 return h;
}
function render(){
 var r0=(location.hash||'#/home').replace('#/','')||'home',pr=r0.split('/'),r=pr[0],arg=pr[1],a=$('#app'),h;
 var SV={"home": "<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 11l9-8 9 8\"/><path d=\"M5 10v10h14V10\"/></svg>", "tasks": "<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"3\"/><path d=\"M8 12l3 3 5-6\"/></svg>", "decisions": "<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3v18M6 21h12M5 7h14\"/><path d=\"M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z\"/></svg>", "projects": "<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z\"/></svg>", "more": "<svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M4 7h16M4 12h16M4 17h16\"/></svg>"};var tabs=[['home','','اليوم'],['tasks','','المهام'],['decisions','','القرارات'],['projects','','المشروعات'],['more','','المزيد']];
 var sub={reports:1,english:1,english_log:1,lesson:1,search:1,report:1,lifestyle:1,career:1,finance:1,ventures:1,opportunities:1,learning:1,intel:1,settings:1};
 var active=sub[r]?'more':r;
 if(r==='home')h=home();else if(r==='more')h=more();else if(r==='learning')h=learning();else if(r==='settings')h=settings();else if(r==='search')h=searchView();else if(r==='english')h=englishView();else if(r==='reports')h=reportsView();else if(r==='english_log')h=listView('english');else if(r==='lesson')h=lessonView(arg);else if(r==='report')h=reportView();else if(C[r])h=listView(r);else{r='home';h=home()}
 if(sub[r])h='<a href="'+(r==='lesson'?'#/learning':(r==='english_log'?'#/english':'#/more'))+'" style="color:var(--teal);text-decoration:none;font-weight:700">‹ رجوع</a>'+h;
 a.innerHTML=h;$('#nav').innerHTML=tabs.map(function(t){return '<a href="#/'+t[0]+'" class="'+(t[0]===active?'on':'')+'"><i>'+SV[t[0]]+'</i>'+t[2]+'</a>'}).join('');
 wire(r==='english_log'?'english':r);window.scrollTo(0,0);
}
function bindCards(r,root){
 [].forEach.call((root||document).querySelectorAll('.card[data-id]:not([data-b])'),function(el){el.setAttribute('data-b','1');
  var col=el.getAttribute('data-c')||r,id=el.getAttribute('data-id');
  el.addEventListener('click',function(e){
   if(e.target.closest('a'))return;var b=e.target.closest('button');var o=S[col].find(function(x){return x.id===id});if(!o)return;
   if(b&&b.dataset.a){e.stopPropagation();act(col,o,b.dataset.a);return}
   if(col==='learning'){learnForm(o);return}
   form(col,o,false)})});
}
function arg0(){return (location.hash||'').replace('#/','').split('/')[1]}
function wire(r){
 var add=$('#add');if(add)add.onclick=function(){form(r,C[r].def(),true)};
 bindCards(r);
 var qg=$('#qgo');if(qg)qg.onclick=function(){gradeQuiz(arg0())};
 var sq=$('#sq');if(sq){sq.oninput=function(){SEARCH_Q=sq.value;$('#sr').innerHTML=searchResults(SEARCH_Q);bindCards('search',$('#sr'))};if(!SEARCH_Q)sq.focus()}
 ['au_in','au_up','au_sync','au_out'].forEach(function(id){var b=$('#'+id);if(!b)return;b.onclick=function(){if(id==='au_in')doAuth('in');else if(id==='au_up')doAuth('up');else if(id==='au_sync'){SYNC_MSG='جارٍ المزامنة...';render();syncNow()}else doOut()}});
 var ex=$('#ex');if(ex)ex.onclick=exportData;
 var im=$('#im');if(im)im.onclick=function(){$('#fi').click()};
 var fi=$('#fi');if(fi)fi.onchange=function(){var f=fi.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){try{var d=JSON.parse(rd.result);if(!d||!d.tasks||!d.decisions||!d.learning)throw 0;S=d;if(!S.lifestyle)S.lifestyle=[];if(!S.english)S.english=[];if(!S.progress)S.progress={};log('تم استيراد نسخة احتياطية');save();render();toast('تم الاستيراد')}catch(e){toast('الملف غير صالح')}};rd.readAsText(f)};
 var rs=$('#rs');if(rs)rs.onclick=function(){if(rs.dataset.s){S=seed();save();render();toast('تمت إعادة الضبط')}else{rs.dataset.s=1;rs.textContent='اضغط للتأكيد، سيُمسح كل شيء'}};
}
function act(col,o,a){
 if(col==='learning'){learnForm(o);return}
 if(col==='decisions'){o.status=a==='ok'?'موافق':'مرفوض';log('قرار '+o.status+': '+o.title.slice(0,40));save();render();toast('تم تسجيل قرارك. لن أنفذ شيئا خارجيا بدون أمرك.');return}
 if(col==='tasks'&&a==='done'){
  var bg=sheet('<h3 style="margin:0">دليل الإنجاز</h3><div class="meta">لا تُسجَّل المهمة مكتملة بدون دليل: ماذا تم وكيف تحققت؟</div><textarea rows="3" id="ev"></textarea><div id="err" style="color:var(--red);font-size:14px"></div><div class="acts"><button id="ok">تأكيد الإنجاز</button><button class="sec" id="cn">إلغاء</button></div>');
  $('#cn',bg).onclick=function(){bg.remove()};
  $('#ok',bg).onclick=function(){var v=$('#ev',bg).value.trim();if(!v){$('#err',bg).textContent='اكتب الدليل أولا';return}o.status='مكتملة';o.evidence=v;log('إنجاز: '+o.title.slice(0,40));save();bg.remove();render();toast('تم الإنجاز')}}
}
function learnForm(l){
 var bg=sheet('<h3 style="margin:0">'+esc(l.name)+'</h3><label>نتيجة الاختبار (0-100)</label><input id="q" type="number" inputmode="numeric" min="0" max="100" value="'+esc(l.quiz)+'"><label><input type="checkbox" id="p" style="width:auto"'+(l.project?' checked':'')+'> المشروع الصغير منجز فعلا</label><div class="meta">الإتقان = اختبار 80% أو أكثر + مشروع منجز.</div><div id="err" style="color:var(--red)"></div><div class="acts"><button id="sv">حفظ</button><button class="sec" id="cn">إلغاء</button></div>');
 $('#cn',bg).onclick=function(){bg.remove()};
 $('#sv',bg).onclick=function(){var q=$('#q',bg).value;if(q!==''&&(Number(q)<0||Number(q)>100)){$('#err',bg).textContent='النتيجة من 0 إلى 100';return}l.quiz=q;l.project=$('#p',bg).checked;log('تسجيل تعلم: '+l.name);save();bg.remove();render();toast(mastered(l)?'تم إثبات الإتقان':'تم الحفظ')}
}
function exportData(){
 var blob=new Blob([JSON.stringify(S,null,1)],{type:'application/json'}),name='nexora-backup-'+today()+'.json';
 try{var f=new File([blob],name,{type:'application/json'});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:'NEXORA backup'}).catch(function(){});return}}catch(e){}
 var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(u)},500);toast('تم تجهيز النسخة');
}
window.addEventListener('hashchange',render);
load();
(function(){var h=location.hash||'';if(/^#(access_token|error)=/.test(h)){var bad=/^#error=/.test(h);try{history.replaceState(null,'',location.pathname+'#/settings')}catch(e){location.hash='#/settings'}SYNC_MSG=bad?'رابط التأكيد منتهٍ أو غير صالح. أنشئ حسابا من جديد أو سجّل الدخول.':'تم تأكيد البريد. سجّل الدخول بكلمة المرور.'}})();
render();
window.__nexora={syncNow:syncNow,mergeById:mergeById,hashS:hashS,SB:SB,S:function(){return S},mastered:mastered,rank:rank,C:C,seed:seed,render:render,act:act};
})();
