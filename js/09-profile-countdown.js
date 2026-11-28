
// ======================================================
// UI LAYER: profile menu, dark mode, countdown (no Firebase logic here)
// ======================================================
(function(){
  var html=document.documentElement, body=document.body;
  var $=function(i){return document.getElementById(i)};
  var p2=function(n){return String(n).padStart(2,'0')};

  document.querySelectorAll('.main-tab').forEach(function(b){
    b.addEventListener('click',function(){body.dataset.tool=b.dataset.tool;window.scrollTo(0,0);b.scrollIntoView({inline:'nearest',block:'nearest'})});
  });

  /* profile menu */
  var pm=$('profile-menu'), pb=$('profile-btn');
  function closeProfile(){pm.hidden=true;pb.setAttribute('aria-expanded','false')}
  pb.addEventListener('click',function(e){e.stopPropagation();pm.hidden=!pm.hidden;pb.setAttribute('aria-expanded',String(!pm.hidden))});
  document.addEventListener('click',function(e){if(!pm.hidden&&!pm.contains(e.target))closeProfile()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeProfile()});
  new MutationObserver(function(){
    var ch=(($('user-email').textContent||'U').trim().charAt(0)||'U').toUpperCase();
    $('avatar-letter').textContent=ch;$('pm-avatar-letter').textContent=ch;
  }).observe($('user-email'),{childList:true,characterData:true,subtree:true});

  /* dark mode */
  var dt=$('dark-toggle');
  dt.checked=html.dataset.theme==='dark';
  dt.addEventListener('change',function(){
    var t=dt.checked?'dark':'light'; html.dataset.theme=t;
    try{localStorage.setItem('upscTheme',t)}catch(e){}
  });
  var prevTheme=null;
  window.addEventListener('beforeprint',function(){prevTheme=html.dataset.theme;html.dataset.theme='light'});
  window.addEventListener('afterprint',function(){if(prevTheme){html.dataset.theme=prevTheme;prevTheme=null}});

  /* countdown (header timer + dashboard rings) */
  var target=new Date("2027-04-23T09:30:00+05:30").getTime(), last=-1, C=289;
  function ring(id,f){$(id).style.strokeDashoffset=C*(1-Math.min(1,Math.max(0,f)))}
  function tick(){
    var now=Date.now(), diff=target-now;
    if(diff<=0){
      $('hdr-timer').innerHTML='<span class="ht-done">Exam day 🍀</span>';
      $('cd-clock').style.display='none'; $('cd-done').style.display='block'; return;
    }
    var secs=Math.floor(diff/1000);
    if(secs!==last){
      last=secs;
      var d=Math.floor(secs/86400),h=Math.floor(secs%86400/3600),m=Math.floor(secs%3600/60),s=secs%60;
      $('ht-d').textContent=String(d).padStart(3,'0');$('ht-h').textContent=p2(h);$('ht-m').textContent=p2(m);$('ht-s').textContent=p2(s);
      $('cd-d').textContent=String(d).padStart(3,'0');$('cd-h').textContent=p2(h);$('cd-m').textContent=p2(m);$('cd-s').textContent=p2(s);
      ring('rd',d/365);ring('rh',h/24);ring('rm',m/60);ring('rs',s/60);
    }
    setTimeout(tick,1000-(now%1000)+5);
  }
  document.addEventListener('visibilitychange',function(){if(!document.hidden){last=-1;tick()}});
  tick();


  /* overall progress blocks (PNP · Prelims Revision · Mains Revision): built once, then updated in place */
  var DP=[
    {k:'pnp',tab:'pnp',icon:'📚',title:'PNP 2027',c:'#ff9a3c',c2:'#ffcf6b'},
    {k:'rev',tab:'revision',icon:'📖',title:'Prelims Revision',c:'#7c5cf0',c2:'#b79cff'},
    {k:'mains',tab:'mains',icon:'✍️',title:'Mains Revision',c:'#12b5b5',c2:'#6fe3d6'}
  ];
  (function buildDP(){
    var el=$('dprog'); if(!el) return;
    el.innerHTML=DP.map(function(d){
      return '<div class="glass pbox" id="pb-'+d.k+'" style="--c:'+d.c+';--c2:'+d.c2+'" data-go="'+d.tab+'" role="button" tabindex="0" aria-label="Open '+d.title+'">'+
        '<div class="top"><div class="gauge"><svg viewBox="0 0 80 80"><defs><linearGradient id="pg-'+d.k+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+d.c+'"/><stop offset="1" stop-color="'+d.c2+'"/></linearGradient></defs><circle class="gt" cx="40" cy="40" r="36"/><circle class="gp" cx="40" cy="40" r="36" stroke="url(#pg-'+d.k+')"/></svg><b><span class="gv">0</span><small>%</small></b></div>'+
        '<div class="info"><div class="pt"><span>'+d.icon+' '+d.title+'</span><span class="go">Open →</span></div><div class="pm"></div><div class="tags"></div></div></div>'+
        (d.k==='mains'?'<div class="pl"></div>':'')+'</div>';
    }).join('');
    el.addEventListener('click',function(e){var b=e.target.closest('[data-go]');if(!b)return;var t=document.querySelector('.main-tab[data-tool="'+b.dataset.go+'"]');if(t)t.click()});
    el.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.dataset&&e.target.dataset.go){e.preventDefault();e.target.click()}});
  })();
  function dpSafe(f,d){try{return f()}catch(e){return d}}
  function dpTag(cls,txt){return '<span class="tg '+cls+'">'+txt+'</span>'}
  function dpPace(remaining){
    var days=Math.ceil((target-Date.now())/864e5); if(days<=0||remaining<=0) return '';
    var v=remaining/days; return dpTag('pace','🎯 '+(v>=10?Math.round(v):v.toFixed(1))+'/day to finish by exam');
  }
  function dpSet(k,pct,line,tags){
    var b=$('pb-'+k); if(!b) return;
    var gp=b.querySelector('.gp'); gp.style.strokeDashoffset=226.2*(1-Math.min(1,Math.max(0,pct/100)));
    b.querySelector('.gv').textContent=pct;
    b.querySelector('.pm').innerHTML=line;
    b.querySelector('.tags').innerHTML=tags;
  }
  function revTags(s){
    var t=''; if(!s.total) return dpTag('','No topics yet');
    if(s.overdue) t+=dpTag('bad','⚠ '+s.overdue+' overdue'); else if(s.started) t+=dpTag('ok','✓ nothing overdue');
    if(s.soon) t+=dpTag('warn','⏳ '+s.soon+' due soon');
    if(!s.started) t+=dpTag('','Not started');
    return t+dpPace(s.total-s.started);
  }
  function dashProgress(){
    if(!$('pb-pnp')) return;
    var z={pct:0,total:0};
    var pn=dpSafe(function(){return PnpTool.summary()},z), rv=dpSafe(function(){return RevisionTool.summary()},z), mn=dpSafe(function(){return MainsTool.summary()},z);
    var pt=''; 
    if(pn.notStarted) pt=dpTag('','Starts soon'); else if(pn.back>0) pt=dpTag(pn.back>2?'bad':'warn','⚠ '+pn.back+' behind schedule'); else pt=dpTag('ok','✓ on track');
    pt+=dpTag('pace',(pn.due||0)+' tests due so far');
    dpSet('pnp',pn.pct||0,'<b>'+(pn.done||0)+'</b> of <b>'+(pn.total||108)+'</b> tests completed',pt);
    dpSet('rev',rv.pct||0,'<b>'+(rv.started||0)+'</b> of <b>'+(rv.total||0)+'</b> topics started',revTags(rv));
    dpSet('mains',mn.pct||0,'<b>'+(mn.started||0)+'</b> of <b>'+(mn.total||0)+'</b> topics started',revTags(mn));
    var pl=document.querySelector('#pb-mains .pl');
    if(pl) pl.innerHTML=(mn.papers||[]).map(function(x){return '<div class="pr" style="--cc:'+x.color+'" title="'+x.name+': '+x.started+'/'+x.total+'"><div class="rt"><span>'+x.name+'</span><span>'+x.pct+'%</span></div><div class="rb"><i style="width:'+x.pct+'%"></i></div></div>'}).join('');
  }
  document.querySelectorAll('.main-tab').forEach(function(b){b.addEventListener('click',function(){if(b.dataset.tool==='dashboard')dashProgress()})});
  dashProgress(); setTimeout(dashProgress,600); setInterval(function(){if(!document.hidden&&document.getElementById('tool-dashboard').classList.contains('active'))dashProgress()},2000);

  /* quotes */
  var Q=[["It always seems impossible until it’s done.","Nelson Mandela"],["Arise, awake, and stop not till the goal is reached.","Swami Vivekananda"],["You have the right to work, but never to the fruit of work.","Bhagavad Gita"],["Small daily improvements lead to stunning results.","Robin Sharma"],["The expert in anything was once a beginner.","Helen Hayes"],["Discipline is the bridge between goals and accomplishment.","Jim Rohn"]];
  var T=["Stay consistent.","One chapter at a time.","Revise, then revise again.","You are closer than yesterday."];
  var qi=0;
  setInterval(function(){
    qi=(qi+1)%Q.length; var q=$('cd-q'); q.style.opacity=0;
    setTimeout(function(){q.textContent="“"+Q[qi][0]+"”";$('cd-qa').textContent=Q[qi][1];$('cd-tag').textContent=T[qi%T.length];q.style.opacity=1},500);
  },8000);
})();
