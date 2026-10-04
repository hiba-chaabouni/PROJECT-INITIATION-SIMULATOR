const CONFIG={
  projectName:'Barista Mourouj Branch Opening Project',
  authorizationDate:'04 Jan 2027',
  startDate:'2027-01-04',
  targetDate:'2027-07-01',
  budgetCeiling:650000,
  budgetTolerance:715000,
  maxDelayDays:28,
  brandTarget:90
};

const decisions=[
  {id:'D1',stage:'Pre-initiation',title:'Who should sponsor the project?',hint:'Select the role with enough authority to champion the project and resolve escalation issues.',facts:'GIVEN · Mourouj is fixed. Target opening: 01 Jul 2027. Budget ceiling: 650,000 TND. The project has passed formal selection; sponsor is not yet assigned.',opts:[
    ['General Manager','Highest authority and strong escalation power, but limited time.','gm'],
    ['Head of Development','Strong expansion and investment focus, but less involved in daily operations.','dev'],
    ['Operations Director','Strong service and brand-standard knowledge, but less investment experience.','ops']
  ],effect:(s,o)=>({support:o==='gm'?4:o==='ops'?3:2,risk:o==='dev'?1:0}),conseq:o=>`Sponsor selected: ${label(o)}. The sponsor now becomes the project champion and authorization voice.`},
  {id:'D2',stage:'Pre-initiation',title:'Who should be Project Manager?',hint:'The PM must coordinate the project while meeting the organization’s reporting and governance expectations.',facts:'CHAPTER 3 · Select the PM and review organizational expectations before formal initiation. Simulation expectation: monthly reporting to a steering committee.',opts:[
    ['Existing branch manager','Strong operating and brand knowledge, but limited spare capacity.','branch'],
    ['External project consultant','Neutral and methodical, but needs to learn Barista culture and standards.','consult'],
    ['Area manager','Authority across branches, but divided attention.','area']
  ],effect:(s,o)=>({support:o==='branch'?2:0,risk:o==='consult'?2:1,schedule:o==='consult'?2:0}),conseq:o=>`Project Manager selected: ${label(o)}. The choice balances direct brand knowledge, authority and available project capacity.`},
  {id:'D3',stage:'Pre-initiation',title:'Should the project be divided into smaller projects?',hint:'Chapter 3 asks senior managers to decide whether a project should be divided into smaller projects.',facts:'The initiation team can manage the branch opening as one integrated project, or separate study, fit-out and readiness work.',opts:[
    ['One integrated project','One accountable project from initiation through opening.','one'],
    ['Study then opening','Phase I Mourouj study (3 months / 40,000 TND), followed by fit-out and opening.','two'],
    ['Three coordinated projects','Separate study, fit-out and operations-readiness work.','three']
  ],effect:(s,o)=>({structureCost:o==='two'?40000:o==='three'?55000:0,schedule:o==='two'?10:o==='three'?18:0,support:o==='two'?2:o==='three'?1:0,risk:o==='three'?2:o==='two'?1:0}),conseq:o=>`Project structure: ${label(o)}. More separation can improve control, but coordination creates additional management overhead.`},
  {id:'D4',stage:'Business case',title:'Which option should the business case recommend?',hint:'Compare alternatives using control, investment exposure, capacity and brand consistency.',facts:'SIMULATION ASSUMPTIONS · Company-owned: 650,000 TND / 3.5-year payback. Franchisee: 400,000 TND / 2.5-year payback. Smaller-format: 450,000 TND / 2.8-year payback. Fictional figures only.',opts:[
    ['Company-owned branch','Maximum direct control over quality and customer experience; highest investment.','own'],
    ['Franchisee branch','Lower direct investment and faster assumed payback; less direct control.','franchise'],
    ['Smaller-format branch','Lower assumed investment and risk; lower capacity and proposition breadth.','small']
  ],effect:(s,o)=>({baseCost:o==='own'?650000:o==='franchise'?400000:450000,support:o==='own'?3:o==='franchise'?-2:1,risk:o==='franchise'?2:o==='small'?-1:0}),conseq:o=>`Business-case recommendation: ${label(o)}. The financial baseline changes, while the 650,000 TND approval ceiling remains a project constraint.`},
  {id:'D5',stage:'Business case',title:'What should be the secondary objective?',hint:'The primary objective is fixed: open on time, within budget and to Barista-standard quality.',facts:'CHAPTER 3 · A business case should explain objectives and the business need. Choose one secondary objective to shape later trade-offs.',opts:[
    ['Strengthen presence among young customers','Prioritizes local reach and customer appeal.','young'],
    ['Protect brand consistency','Prioritizes consistency across the customer experience.','brand'],
    ['Fastest payback','Prioritizes investment recovery.','payback']
  ],effect:(s,o)=>({support:o==='young'?5:o==='brand'?2:-1,risk:o==='payback'?1:0}),conseq:o=>`Secondary objective: ${label(o)}. It becomes a lens for interpreting later scope and stakeholder choices.`},
  {id:'D6',stage:'Stakeholders',title:'How broadly should stakeholders be engaged now?',hint:'Identify and understand stakeholders before the project moves forward.',facts:'Stakeholders include HQ/top management, project roles, future branch staff, Mourouj customers, suppliers, municipality/permit officials and neighbours.',opts:[
    ['Broad early engagement','Engage users, local stakeholders and key internal functions from the start.','broad'],
    ['Targeted engagement','Prioritize high-influence/high-interest stakeholders first.','targeted'],
    ['Minimal engagement','Keep the initiation group small and consult others later.','minimal']
  ],effect:(s,o)=>({support:o==='broad'?8:o==='targeted'?4:-5,risk:o==='broad'?-2:o==='minimal'?2:0}),conseq:o=>`Stakeholder strategy: ${label(o)}. The Stakeholder Register and Management Strategy now reflect the selected engagement level.`},
  {id:'D7',stage:'Scope',title:'Which optional scope components should be included?',hint:'Vote Yes or No for each optional component. The mandatory core branch is already fixed.',facts:'FIXED CORE · Brand-standard fit-out, primary coffee equipment, staff recruitment/core training and all required permits. Each optional component adds cost, time and risk.',multi:true,opts:[
    ['Hot Kitchen','Warm-food preparation facilities.','kitchen'],
    ['Outdoor Terrace','Exterior customer seating.','terrace'],
    ['Glovo Delivery Setup','Delivery operations and packaging.','glovo'],
    ['Grand Launch Campaign','Social-media and opening promotion.','campaign']
  ],effect:(s,scope)=>{const costs={kitchen:35000,terrace:25000,glovo:15000,campaign:10000};const days={kitchen:10,terrace:7,glovo:4,campaign:2};let c=0,d=0,n=0;Object.keys(scope).forEach(k=>{if(scope[k]){c+=costs[k];d+=days[k];n++}});return {optionalCost:c,schedule:d,scopeCount:n,risk:n>=3?2:n>=1?1:0,support:n>=2?2:0}},conseq:(scope)=>{const names=Object.keys(scope).filter(k=>scope[k]).map(label).join(', ');return names?`Selected optional scope: ${names}. The additions increase estimated cost and execution duration; the mandatory core remains unchanged.`:'Core branch only. The project protects the minimum feasible scope and preserves more budget and schedule capacity.'}},
  {id:'D8',stage:'Constraints',title:'Which constraint should receive priority when trade-offs occur?',hint:'There is no universally correct answer. The class is choosing what the project protects first.',facts:'CONSTRAINTS · Budget ceiling 650,000 TND; tolerance 715,000 TND. Target opening 01 Jul 2027; maximum acceptable delay 4 weeks / 29 Jul 2027. Scope is the most flexible when time and cost are fixed.',opts:[
    ['Protect opening date','Expedite execution and decisions; cost may rise or scope may be reduced.','time'],
    ['Protect budget','Prevent overspend; scope may be cut or the target date may move.','budget'],
    ['Protect planned scope','Preserve the selected proposition; budget and schedule carry more pressure.','scope']
  ],effect:(s,o)=>({priorityCost:o==='time'?15000:o==='scope'?10000:0,schedule:o==='budget'?5:o==='scope'?3:-3,risk:o==='time'?1:o==='scope'?2:0,support:o==='scope'?2:0}),conseq:o=>`Constraint priority: ${label(o)}. This rule becomes part of the charter and is used when scope, cost and schedule come into tension.`},
  {id:'D9',stage:'Approach',title:'Which project approach should the charter record?',hint:'Choose how internal expertise and external capacity will be balanced.',facts:'The approach affects time, cost, scope, stakeholders and risk. The three options are all plausible project-management choices.',opts:[
    ['Internal-led','Internal operations handles design, fit-out, recruitment and training. Strong brand control; slower capacity.','internal'],
    ['Outsourced fit-out','Specialized contractors execute fit-out under Barista supervision; Barista handles recruitment/training.','outsource'],
    ['Mixed / hybrid','Internal management oversight combined with specialized external subcontractors.','mixed']
  ],effect:(s,o)=>({approachCost:o==='outsource'?30000:o==='mixed'?15000:0,schedule:o==='outsource'?-5:o==='mixed'?-2:4,brandQuality:o==='internal'?10:o==='mixed'?5:-5,risk:o==='outsource'?2:0,support:o==='internal'?3:o==='mixed'?2:0}),conseq:o=>`Approach recorded: ${label(o)}. ${approachSummary(o)}`},
  {id:'D10',stage:'Kick-off',title:'At kick-off, should the class confirm the current scope?',hint:'The kick-off reviews the business case, charter, organization and scope/time/cost goals.',facts:'CHAPTER 3 · The kick-off is used to review project goals, documents, organization, scope/time/cost and future plans.',opts:[
    ['Confirm current scope','Proceed with the current charter boundary.','confirm'],
    ['Reduce scope before approval','Remove optional elements to restore feasibility.','reduce'],
    ['Pause for clarification','Return to the charter and resolve the main conflict first.','pause']
  ],effect:(s,o)=>{if(o==='reduce')return {risk:-2,support:1};if(o==='pause')return {schedule:7,risk:-1};return {support:2,risk:currentWarnings(s).length?1:0}},conseq:o=>`Kick-off scope decision: ${label(o)}. ${o==='pause'?'The charter remains open until the main conflict is clarified.':o==='reduce'?'The project gives up optional scope to restore feasibility.':'The current scope is carried forward into formal authorization.'}`},
  {id:'D11',stage:'Kick-off',title:'What should be clarified before the meeting closes?',hint:'The kick-off should clarify organization, roles and responsibilities and leave the project with concrete next actions.',facts:'The champion speaks first and introduces the sponsor and PM. The meeting reviews the business case, charter, organizational structure, scope/time/cost and action items.',opts:[
    ['Roles + responsibilities','Confirm ownership, reporting and key deliverables.','roles'],
    ['Immediate action items','Leave the meeting with tasks, owners and deadlines as the first priority.','actions'],
    ['Both, with roles first','Align ownership, then convert gaps into action items.','both']
  ],effect:(s,o)=>({support:o==='both'?4:o==='roles'?3:1,risk:o==='both'?-2:o==='roles'?-1:0}),conseq:o=>`Kick-off emphasis: ${label(o)}. The final charter will show role ownership and the generated action-item structure.`},
  {id:'D12',stage:'Kick-off',title:'Should a brand audit be added before opening?',hint:'This fictional governance gate operationalizes the chapter-based quality and approval discussion.',facts:'SIMULATION ASSUMPTION · Mandatory brand-compliance target is ≥90%. The audit gate is a classroom mechanism, not a statement about Barista’s actual process.',opts:[
    ['Yes — add the audit gate','Add a pre-opening quality check; it can require a small schedule buffer.','yes'],
    ['No — rely on standard controls','Avoid a new gate and keep the current opening path.','no']
  ],effect:(s,o)=>({schedule:o==='yes'?3:0,risk:o==='yes'?-2:1,support:o==='yes'?3:0}),conseq:o=>`Brand-audit decision: ${label(o)}. The final evaluation now reports the brand-control criterion and the decisions that influenced it.`}
];

const labels={
  gm:'General Manager',dev:'Head of Development',ops:'Operations Director',branch:'Existing branch manager',consult:'External project consultant',area:'Area manager',one:'One integrated project',two:'Study then opening',three:'Three coordinated projects',own:'Company-owned branch',franchise:'Franchisee branch',small:'Smaller-format branch',young:'Strengthen presence among young customers',brand:'Protect brand consistency',payback:'Fastest payback',broad:'Broad early engagement',targeted:'Targeted engagement',minimal:'Minimal engagement',kitchen:'Hot Kitchen',terrace:'Outdoor Terrace',glovo:'Glovo Delivery Setup',campaign:'Grand Launch Campaign',time:'Protect opening date',budget:'Protect budget',scope:'Protect planned scope',internal:'Internal-led',outsource:'Outsourced fit-out',mixed:'Mixed / hybrid',confirm:'Confirm current scope',reduce:'Reduce scope before approval',pause:'Pause for clarification',roles:'Roles + responsibilities',actions:'Immediate action items',both:'Both, with roles first',yes:'Yes — add the audit gate',no:'No — rely on standard controls'
};
function label(x){return labels[x]||x}
function approachSummary(o){return o==='internal'?'Strongest internal brand knowledge, but slower execution and higher internal workload.':o==='outsource'?'Faster external capacity, with +30,000 TND simulated contractor cost and higher contractor/quality risk.':'Balances brand control and external capacity, with +15,000 TND simulated cost and a balanced schedule/risk profile.'}

let state=initialState();
function initialState(){return {estimatedCost:CONFIG.budgetCeiling,baseCost:CONFIG.budgetCeiling,structureCost:0,priorityCost:0,optionalCost:0,optionalDays:0,approachCost:0,schedule:0,support:50,risk:0,scopeCount:0,brandQuality:CONFIG.brandTarget,answers:{},scopeChoices:{kitchen:false,terrace:false,glovo:false,campaign:false},logs:[],selected:null,current:0,warnings:[]}}
const $=id=>document.getElementById(id);
function money(n){return `${Math.round(n).toLocaleString('en-US')} TND`}
function formatDate(offset){const d=new Date(CONFIG.targetDate+'T00:00:00');d.setDate(d.getDate()+Math.round(offset));return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}
function scheduleFinish(){return formatDate(state.schedule)}
function riskLevel(){if(state.risk>=7)return ['High','high'];if(state.risk>=3)return ['Medium','medium'];return ['Low','low']}
function selectedScopeNames(){const n=Object.keys(state.scopeChoices).filter(k=>state.scopeChoices[k]).map(label);return n.length?n:['Core Branch Setup']}
function currentWarnings(s=state){const w=[];const allOptional=Object.values(s.scopeChoices).every(Boolean);if(allOptional&&s.answers.D8==='budget')w.push('Full optional scope is inconsistent with a strict budget priority.');if(s.scopeChoices.kitchen&&s.scopeChoices.terrace&&s.schedule>20)w.push('Kitchen + terrace are creating a narrow schedule buffer.');if(s.answers.D2==='consult'&&s.answers.D9==='outsource')w.push('External PM + outsourced fit-out increases the need for explicit internal brand oversight.');if(s.estimatedCost>CONFIG.budgetTolerance)w.push('Estimated cost exceeds the +10% tolerance threshold.');if(s.schedule>CONFIG.maxDelayDays)w.push('Calculated opening date exceeds the maximum 4-week delay threshold.');return w}
function recalc(){state.estimatedCost=state.baseCost+state.structureCost+state.priorityCost+state.optionalCost+state.approachCost;state.warnings=currentWarnings();}
function render(){
  recalc();
  const d=decisions[Math.min(state.current,decisions.length-1)];
  const stageOrder=['Pre-initiation','Business case','Stakeholders','Scope','Constraints','Approach','Kick-off'];
  const stage=stageOrder.indexOf(d.stage)+1;
  $('stageLabel').textContent=`STAGE ${stage}`;$('stageTitle').textContent=d.stage;$('stageCount').textContent=`DECISION ${Math.min(state.current+1,decisions.length)} / ${decisions.length}`;$('progressBar').style.width=`${Math.min(100,(state.current/decisions.length)*100)}%`;
  const notes={"Pre-initiation":'Determine constraints, sponsor, project manager and organizational expectations before formal initiation.',"Business case":'Define the business need, alternatives, assumptions, risks and recommendation.',Stakeholders:'Identify people affected by the project and build a stakeholder management strategy.',Scope:'Turn the business need into a realistic project boundary.',Constraints:'Make the scope–time–cost trade-off explicit.',Approach:'Choose how the project will be organized and executed.',"Kick-off":'Use the business case and charter to align stakeholders, roles, scope, time and cost.'};$('chapterNote').textContent=notes[d.stage]||'';
  $('questionNumber').textContent=d.id;$('question').textContent=d.title;$('questionHint').textContent=d.hint;$('givenFacts').textContent=d.facts;
  if(d.multi){renderScopeOptions(d)}else{$('options').innerHTML=d.opts.map((o,i)=>`<div class="option ${state.selected===o[2]?'selected':''}" data-v="${o[2]}"><div class="option-title">${String.fromCharCode(65+i)} · ${o[0]}</div><div class="option-copy">${o[1]}</div></div>`).join('');document.querySelectorAll('.option').forEach(el=>el.onclick=()=>{state.selected=el.dataset.v;render()})}
  $('voteBtn').disabled=d.multi?!scopeReady():!state.selected||state.current>=decisions.length;$('voteBtn').textContent=d.multi?'Record scope votes →':'Record class majority →';
  $('decisionMini').textContent=`${Math.min(state.current,decisions.length)} / ${decisions.length}`;
  $('scopeMetric').textContent=state.scopeCount===0?'Core':`${state.scopeCount} add-on${state.scopeCount>1?'s':''}`;$('scopeBar').style.width=`${Math.min(100,30+state.scopeCount*15)}%`;
  $('budgetMetric').textContent=money(state.estimatedCost);$('budgetBar').style.width=`${Math.min(100,Math.max(5,(state.estimatedCost/CONFIG.budgetTolerance)*100))}%`;
  $('scheduleMetric').textContent=scheduleFinish();$('scheduleBar').style.width=`${Math.max(5,Math.min(100,70-state.schedule*2.2))}%`;
  $('supportMetric').textContent=`${Math.round(state.support)} / 100`;$('supportBar').style.width=`${Math.max(0,Math.min(100,state.support))}%`;const [rl,rc]=riskLevel();$('riskMetric').textContent=rl;$('riskPill').textContent=rl.toUpperCase();$('riskPill').className=`risk-pill ${rc}`;
  $('decisionLog').innerHTML=state.logs.length?state.logs.map(x=>`<div class="log-item"><span class="log-id">${x.id}</span><b>${escapeHtml(x.choice)}</b><small>${escapeHtml(x.consequence)}</small></div>`).join(''):'<div class="empty">Decisions will appear here as the class progresses.</div>';
  $('docBusiness').textContent=state.current>=4?'Built from scenario decisions':'In progress';$('docStake').textContent=state.current>=6?'Generated':'Not generated';$('docStrategy').textContent=state.current>=6?'Generated':'Not generated';$('docRisk').textContent=state.current?'Updating from decisions':'Initial risks loaded';$('docCharter').textContent=state.current>=10?'Ready for kick-off review':'Progressive';
  if(state.current>=10){$('charterSection').classList.remove('hidden');renderCharter()}else $('charterSection').classList.add('hidden');
  if(state.current>=decisions.length){renderFinal()}else $('finalSection').classList.add('hidden');
}
function scopeReady(){return Object.keys(state.scopeChoices).every(k=>typeof state.scopeChoices[k]==='boolean'&&state.scopeChoices[k]!==null)}
function renderScopeOptions(d){$('options').innerHTML=d.opts.map(o=>`<div class="scope-choice"><div><div class="option-title">${o[0]}</div><div class="option-copy">${o[1]}</div></div><div class="scope-buttons"><button type="button" class="scope-btn ${state.scopeChoices[o[2]]?'active':''}" data-scope="${o[2]}" data-value="true">YES</button><button type="button" class="scope-btn ${!state.scopeChoices[o[2]]?'active no':''}" data-scope="${o[2]}" data-value="false">NO</button></div></div>`).join('');document.querySelectorAll('.scope-btn').forEach(btn=>btn.onclick=()=>{state.scopeChoices[btn.dataset.scope]=btn.dataset.value==='true';state.selected='scope';render()})}
function apply(choice){
  if(state.current>=decisions.length)return;
  const d=decisions[state.current];
  let effect={};
  let consequence='';
  if(d.multi){
    state.answers.D7={...state.scopeChoices};
    effect=d.effect(state,state.scopeChoices);
    consequence=d.conseq(state.scopeChoices);
  }else{
    effect=d.effect(state,choice);
    consequence=d.conseq(choice);
    state.answers[d.id]=choice;
  }

  if(d.id==='D7'){
    state.optionalCost=effect.optionalCost||0;
    state.optionalDays=effect.schedule||0;
    state.schedule+=state.optionalDays;
    state.scopeCount=effect.scopeCount||0;
    delete effect.optionalCost;delete effect.optionalDays;delete effect.scopeCount;delete effect.schedule;
  }

  if(d.id==='D10' && choice==='reduce'){
    const costs={kitchen:35000,terrace:25000,glovo:15000,campaign:10000};
    const days={kitchen:10,terrace:7,glovo:4,campaign:2};
    const order=['campaign','glovo','terrace','kitchen'];
    const remove=order.find(k=>state.scopeChoices[k]);
    if(remove){
      state.scopeChoices[remove]=false;
      state.optionalCost-=costs[remove];
      state.optionalDays-=days[remove];
      state.scopeCount-=1;
      state.schedule-=days[remove];
      state.answers.D7={...state.scopeChoices};
      consequence=`${label(remove)} was removed from the optional scope to improve feasibility. The charter now reflects the reduced scope.`;
    }
  }

  for(const [k,v] of Object.entries(effect)){
    if(k==='baseCost'||k==='brandQuality')state[k]=v;
    else if(k==='estimatedCost')state.estimatedCost+=v;
    else state[k]=(state[k]||0)+v;
  }
  recalc();
  state.logs.push({id:d.id,choice:d.multi?selectedScopeNames().join(', '):label(choice),consequence});
  state.current++;
  state.selected=null;
  render();
  showConsequence(consequence);
}
function showConsequence(text){$('consequence').classList.remove('hidden');$('consequence').innerHTML=`<b>CONSEQUENCE</b><br>${escapeHtml(text)}`;if(state.current<decisions.length)$('consequence').scrollIntoView({behavior:'smooth',block:'nearest'});else $('finalSection').scrollIntoView({behavior:'smooth',block:'start'})}
$('voteBtn').onclick=()=>{const d=decisions[state.current];if(d.multi){if(!scopeReady())return;apply(state.scopeChoices)}else{if(!state.selected)return;const c=state.selected;state.selected=null;apply(c)}};
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');document.querySelectorAll('.tab-content').forEach(x=>x.classList.add('hidden'));$(`tab-${t.dataset.tab}`).classList.remove('hidden')});
$('restartBtn').onclick=()=>{state=initialState();$('consequence').classList.add('hidden');render();window.scrollTo({top:0,behavior:'smooth'})};
$('printCharterBtn').onclick=()=>window.print();

function charterData(){
  const warnings=currentWarnings();
  const primary='Open one Mourouj branch on time, within the approved budget limits, and to the required Barista-standard quality.';
  const secondary=label(state.answers.D5||'Not yet selected');
  const recommended=label(state.answers.D4||'Not yet selected');
  const inScope=`Opening of one Barista's branch in Mourouj including ${selectedScopeNames().join(', ')}.`;
  const outScope=['Renovations or modifications to other existing Barista locations','Corporate logo redesign or brand overhaul','Construction of a coffee roasting facility','Custom mobile app development',...Object.keys(state.scopeChoices).filter(k=>!state.scopeChoices[k]).map(label)];
  const mandatory=['Fully fitted-out retail branch venue','Recruited and trained store staff','Installed commercial equipment and operational menu','Municipal, hygiene and operating permits'];
  const optional=[];if(state.scopeChoices.kitchen)optional.push('Operational Hot Kitchen facility');if(state.scopeChoices.terrace)optional.push('Outdoor Terrace seating space');if(state.scopeChoices.glovo)optional.push('Integrated Glovo delivery channel');if(state.scopeChoices.campaign)optional.push('Executed Grand Launch marketing campaign');
  const risks=[['R03','Fit-out Delays','Supplier lead-time delays on imported espresso equipment.','Missed opening target.'],['R04','Cost Overrun','Uncontrolled scope expansion.','Financial deficit exceeding the approved cap.'],['R02','Quality Inconsistency','Rapid operational setup / insufficient brand oversight.','Brand and service-quality damage.']];
  return {warnings,primary,secondary,recommended,inScope,outScope,mandatory,optional,risks};
}
function renderCharter(){
  const c=charterData();
  $('charterProjectName').textContent=CONFIG.projectName;$('charterPM').textContent=label(state.answers.D2||'Not assigned');$('charterSponsor').textContent=label(state.answers.D1||'Not assigned');$('charterAuth').textContent=CONFIG.authorizationDate;$('charterPMContact').textContent='Role-based classroom simulation · contact not assigned';$('charterUnit').textContent='Barista Mourouj Project Team · Simulation';$('charterCost').textContent=money(state.estimatedCost)+' estimated';$('charterCeiling').textContent=money(CONFIG.budgetCeiling)+' ceiling';$('charterStart').textContent='04 Jan 2027';$('charterFinish').textContent=scheduleFinish();
  $('charterProblem').textContent='Opportunity: establish a fictional Barista branch in Mourouj where the class must balance demand, brand consistency, stakeholder needs and project constraints.';$('charterPurpose').textContent=c.primary;$('charterBusinessCase').textContent=`Recommended alternative: ${c.recommended}. Secondary objective: ${c.secondary}. Financial figures are simulation assumptions.`;$('charterGoals').innerHTML=`<ul><li>Open by 01 Jul 2027; maximum acceptable delay: 29 Jul 2027.</li><li>Keep total spend within 650,000 TND baseline and 715,000 TND tolerance.</li><li>Achieve brand compliance ≥90% and secure mandatory permits.</li><li>Meet sponsor approval and professional governance expectations.</li></ul>`;$('charterDeliverables').innerHTML=[...c.mandatory.map(x=>`<li><b>Mandatory</b> · ${escapeHtml(x)}</li>`),...c.optional.map(x=>`<li><b>Selected</b> · ${escapeHtml(x)}</li>`)].join('');$('charterIn').textContent=c.inScope;$('charterOut').innerHTML=c.outScope.map(x=>`<li>${escapeHtml(x)}</li>`).join('');
  $('charterSchedule').innerHTML=milestones().map(m=>`<tr><td>${escapeHtml(m.name)}</td><td>${escapeHtml(m.start)}</td><td>${escapeHtml(m.finish)}</td></tr>`).join('');$('charterApproach').textContent=`Approach: ${label(state.answers.D9||'Not selected')}. Stakeholder needs: ${label(state.answers.D6||'Not selected')}. Assumptions: fictional demand/supplier conditions and simulation figures. Constraints: ${label(state.answers.D8||'Not selected')} · ${money(CONFIG.budgetCeiling)} ceiling · target 01 Jul 2027.`;
  $('charterRisks').innerHTML=c.risks.map(r=>`<tr><td>${r[0]}</td><td>${escapeHtml(r[1])}</td><td>${escapeHtml(r[2])}</td><td>${escapeHtml(r[3])}</td></tr>`).join('');$('charterRoles').innerHTML=`<tr><td>${escapeHtml(label(state.answers.D1||'Sponsor'))}</td><td>Sponsor / Champion</td><td>Authorize, champion and escalate</td><td>Signature</td></tr><tr><td>${escapeHtml(label(state.answers.D2||'Project Manager'))}</td><td>Project Manager</td><td>Coordinate, report and manage resources</td><td>Signature</td></tr><tr><td>Project team & key stakeholders</td><td>Team / stakeholder roles</td><td>Deliver, review and support the project</td><td>Signature / acknowledgement</td></tr>`;
  $('charterComments').innerHTML=(c.warnings.length?c.warnings.map(w=>`<li>${escapeHtml(w)}</li>`).join(''):'<li>No automated inconsistency warning is active at this point.</li>')+`<li>Stakeholder strategy: ${escapeHtml(label(state.answers.D6||'Not selected'))}.</li><li>Kick-off emphasis: ${escapeHtml(label(state.answers.D11||'Not selected'))}.</li>`;
  $('charterSignoff').textContent='By signing this document, key stakeholders formally recognize the project and grant the Project Manager the authority to apply organizational resources to project activities.';$('statusChip').textContent=state.current>=decisions.length?'FINAL':'DRAFT';
}
function milestones(){const base=new Date(CONFIG.startDate+'T00:00:00');const finish=new Date(CONFIG.targetDate+'T00:00:00');const fmt=d=>d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});const add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};return [
  ['Authorization & kick-off',base,add(base,14)],
  ['Business case, stakeholder register & charter baseline',add(base,7),add(base,30)],
  ['Design, permits & procurement',add(base,31),add(base,95)],
  ['Fit-out & equipment installation',add(base,80),add(base,150)],
  ['Recruitment, training & operational readiness',add(base,125),add(base,165)],
  ['Brand audit & opening approval',add(finish,-10),add(finish,-2)],
  ['Target operational opening',finish,finish]
].map(x=>({name:x[0],start:fmt(x[1]),finish:fmt(x[2])}));}
function successCriteria(){const budget=state.estimatedCost;const schedule=state.schedule;const brand=state.brandQuality;return [
  ['Schedule',schedule<=0?'Met':schedule<=CONFIG.maxDelayDays?'At Risk':'Not Met',`Target 01 Jul 2027; calculated finish ${scheduleFinish()}. Decisions affecting this: scope, constraint priority, approach, kick-off choices.`],
  ['Budget',budget<=CONFIG.budgetCeiling?'Met':budget<=CONFIG.budgetTolerance?'At Risk':'Not Met',`Baseline ceiling ${money(CONFIG.budgetCeiling)}; tolerance ${money(CONFIG.budgetTolerance)}. Decisions affecting this: business option, scope, priority and approach.`],
  ['Brand compliance',brand>=CONFIG.brandTarget?'Met':brand>=85?'At Risk':'Not Met',`Target ≥90%. Approach: ${label(state.answers.D9||'Not selected')}; brand-audit gate: ${label(state.answers.D12||'Not selected')}.`],
  ['Legal compliance',(state.answers.D6==='broad'||state.answers.D6==='targeted')&&state.risk<7?'Met':state.answers.D6==='minimal'?'At Risk':'Not Met',`Mandatory municipal, health and hygiene permits remain required. Stakeholder engagement affects the permit-risk outlook.`],
  ['Governance / sponsor approval',state.answers.D11?'Met':'Not Met',`Kick-off role and action-item emphasis: ${label(state.answers.D11||'Not selected')}.`]
];}
function finalStatus(){const c=successCriteria();const hard=c.some(x=>x[1]==='Not Met')||state.estimatedCost>CONFIG.budgetTolerance||state.schedule>CONFIG.maxDelayDays;const atrisk=c.some(x=>x[1]==='At Risk')||state.warnings.length>0||state.risk>=7||state.support<45;if(hard)return ['REWORK REQUIRED','rework'];if(atrisk)return ['AT RISK','at-risk'];return ['ON TRACK','']}
function renderFinal(){const [st,cl]=finalStatus();$('finalSection').classList.remove('hidden');$('finalStatus').textContent=st;$('finalStatus').className=`final-status ${cl}`;$('finalTitle').textContent=st==='ON TRACK'?'Project evaluation: viable path':st==='AT RISK'?'Project evaluation: pressure is building':'Project evaluation: charter needs rework';$('finalNarrative').textContent='The outcome reflects the accumulated trade-offs between scope, budget, schedule, stakeholder support and risk. Each status below includes the decisions that contributed to it.';$('finalMetrics').innerHTML=[['Scope',selectedScopeNames().join(', ')],['Estimated cost',money(state.estimatedCost)],['Calculated finish',scheduleFinish()],['Stakeholder support',`${Math.round(state.support)}/100`],['Risk',riskLevel()[0]],['Brand quality',`${Math.round(state.brandQuality)}%`]].map(x=>`<div class="final-box"><small>${escapeHtml(x[0])}</small><b>${escapeHtml(x[1])}</b></div>`).join('');$('criteriaList').innerHTML=successCriteria().map(x=>`<div class="criterion"><div><b>${escapeHtml(x[0])}</b><p>${escapeHtml(x[2])}</p></div><span class="criterion-status ${x[1].toLowerCase().replace(' ','-')}">${x[1]}</span></div>`).join('');const driverData=[['D7',state.scopeCount*12],['D4',Math.abs(state.baseCost-CONFIG.budgetCeiling)/10000],['D8',Math.abs(state.schedule)*1.5],['D9',Math.abs(state.approachCost)/5000+(state.answers.D9==='outsource'?5:0)],['D6',Math.abs(state.support-50)],['D3',state.answers.D3==='three'?8:state.answers.D3==='two'?5:2],['D12',state.answers.D12==='yes'?7:4]];driverData.sort((a,b)=>b[1]-a[1]);$('driversList').innerHTML=driverData.slice(0,3).map(x=>`<li><b>${x[0]}</b> — ${escapeHtml(decisions.find(d=>d.id===x[0])?.title||x[0])}<br><span>${escapeHtml(decisionAnswerText(x[0]))}</span></li>`).join('');$('whatIfBtn').onclick=runWhatIf}
function decisionAnswerText(id){const a=state.answers[id];if(id==='D7')return selectedScopeNames().join(', ');return label(a||'Not selected')}
function runWhatIf(){const current=selectedScopeNames().join(', ');let alt=state.scopeCount===4?'Core only':state.scopeCount===0?'Core + Kitchen + Terrace':'Core only';$('whatIf').classList.remove('hidden');$('whatIf').innerHTML=`<b>What if the scope decision changed?</b><br>Current: ${escapeHtml(current)}. Alternate: ${escapeHtml(alt)}. In this classroom model, changing scope changes estimated cost, completion duration and related risk; it does not identify a universally correct choice.`}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

render();
