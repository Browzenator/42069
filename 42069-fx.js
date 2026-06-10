/* ═══════════════════════════════════════════════════════════════════
   $42069 · fx layer — smoke, weed/$$ cursor, chaos
   ═══════════════════════════════════════════════════════════════════ */
(function(){

  // ─── Cursor trail: cannabis leaves + money, ONLY ──────────
  // Cannabis leaf as inline SVG (no proper unicode glyph exists)
  const WEED_SVG = '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">'
    + '<g fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round">'
    + '<path d="M32 60 L32 8"/>'
    + '<path d="M32 30 C 30 20, 22 8, 14 6  C 16 14, 18 22, 24 28  C 16 24, 8 22, 4 26  C 10 30, 18 34, 26 34  C 20 38, 16 44, 16 50  C 22 46, 28 40, 30 34 Z"/>'
    + '<path d="M32 30 C 34 20, 42 8, 50 6  C 48 14, 46 22, 40 28  C 48 24, 56 22, 60 26  C 54 30, 46 34, 38 34  C 44 38, 48 44, 48 50  C 42 46, 36 40, 34 34 Z"/>'
    + '<path d="M32 44 C 30 38, 24 32, 18 32  C 22 38, 26 44, 30 48 Z"/>'
    + '<path d="M32 44 C 34 38, 40 32, 46 32  C 42 38, 38 44, 34 48 Z"/>'
    + '<circle cx="32" cy="58" r="2.5"/>'
    + '</g></svg>';
  const MONEY = ['$','$','$','💵','💰','💸'];
  const trailRoot = document.getElementById('cursor-trail');
  let lastTrail = 0;
  let trailIdx = 0;
  if (trailRoot) {
    document.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastTrail < 40) return;
      lastTrail = now;
      if (window.__schizo_no_stickers) return;

      // sometimes spawn 2 at once for density
      const burst = Math.random() > .7 ? 2 : 1;
      for (let i = 0; i < burst; i++) {
        const el = document.createElement('div');
        const isWeed = ((trailIdx++ + i) % 2) === 0;
        const jx = (Math.random()*22 - 11);
        const jy = (Math.random()*22 - 11);
        el.style.left = (e.clientX + jx) + 'px';
        el.style.top  = (e.clientY + jy) + 'px';

        if (isWeed) {
          el.className = 'ct leaf';
          const size = 22 + Math.random()*18;
          el.style.width  = size + 'px';
          el.style.height = size + 'px';
          el.innerHTML = WEED_SVG;
        } else {
          el.className = 'ct dollar';
          el.textContent = MONEY[Math.floor(Math.random()*MONEY.length)];
          el.style.fontSize = (22 + Math.random()*18) + 'px';
        }
        trailRoot.appendChild(el);
        setTimeout(() => el.remove(), 1300);
      }
    }, { passive: true });
  }

  // ─── Floating stickers disabled — cursor trail carries the chaos ──

  // ─── System error toasts (420 themed) ───────────────────────
  const sysRoot = document.getElementById('sys-errors');
  const SYS_MSGS = [
    'BLAZE 4:20 · LINK ESTABLISHED',
    'PACKET LOSS: 69%',
    'STASH OVERFLOW · 0x42069',
    'WALLET SMOKED · KEYS LOGGED',
    'BUDS NOT FOUND · TRY AGAIN',
    'GRINDER CALIBRATION: OK',
    'CASH DETECTED · COUNTING…',
    'ROLLING TRAY · CLEAN',
    'SESSION 4:20 · ACTIVE',
    'LIGHTER FLUID LOW',
    'PURPLE HAZE STREAMING · 144p',
    'BAG SECURED · BAG SECURED · BAG',
    'COUGH BUFFER OVERFLOW',
    'DEX HEAT · NEW WALLET +1',
    'FUEGO INDEX: ' + (Math.floor(Math.random()*100)) + '/100',
    'HIGHSCORE: $69,420',
  ];
  function spawnSysError() {
    if (!sysRoot || window.__schizo_no_popups) return;
    const el = document.createElement('div');
    el.className = 'sys-error';
    el.textContent = SYS_MSGS[Math.floor(Math.random()*SYS_MSGS.length)];
    el.style.top  = (5 + Math.random()*80) + 'vh';
    el.style.left = (Math.random() > .5 ? 'auto' : (4 + Math.random()*30) + 'vw');
    el.style.right = el.style.left === 'auto' ? (4 + Math.random()*30) + 'vw' : 'auto';
    sysRoot.appendChild(el);
    setTimeout(() => el.remove(), 6500);
  }
  setInterval(spawnSysError, 3000);
  setTimeout(spawnSysError, 1200);

  // ─── Intrusive popups ───────────────────────────────────────
  const POPUP_MSGS = [
    ['BLAZE IT',                   "4:20 detected · light it up · don't be a narc"],
    ['$42069 TRUMPS ALL',          'every other coin is a soyjak. this is the gigachad bag'],
    ['HOLDER LEVEL UP',            'congrats. you went from degen → certified stoner billionaire'],
    ['PASS THE BLUNT',             "puff puff PASS. don't be that guy. we see you."],
    ['$42069 SAYS NO',             'paperhanded? back to the wagecage with you'],
    ['DEALER ON THE LINE',         '"yeah man · same spot · bring the bag · 6:20 sharp"'],
    ['SMOKE BREAK NOW',            "your boss thinks you're in the bathroom · stay there"],
    ['CULT EXPANSION',             '+1 idiot just bought · welcome to the haze'],
    ['CHART REPORT',               'green candle confirmed · cope · seethe · dilate · mald'],
    ['THE BLUNT TURNS',            "rotation broken · who's hogging it · name and shame"],
    ['42069 SUPREMACY',            'bitcoin maxis seething · eth holders crying · we just blazing'],
    ['HALL OF SHAME',              'a paperhand sold the bottom · we honor his sacrifice'],
    ['LIGHTER STOLEN',             'check pockets · check couch · check the dog · it was you'],
    ['HOLDER GENESIS',             'newborn degen detected · cradle them · corrupt them'],
    ['MUNCHIES ACQUIRED',          'doritos · taco bell · 3am · you know the drill'],
    ['$42069 PROPHECY',            "your portfolio is a joke. ours is too. but ours is green."],
    ['CRY ABOUT IT',               'midcurve coper just called us a ponzi · ngmi · buy higher'],
    ['DEX SEETHING',               'every red candle is a personal attack on you specifically'],
    ['BLAZE OR BE BLAZED',         'you either smoke the bag or the bag smokes you'],
    ['MOM CALLED',                 "she's worried · you should call her back · right after this puff"],
  ];
  function spawnPopup(head, body) {
    if (window.__schizo_no_popups) return;
    const el = document.createElement('div');
    el.className = 'intrusive-popup';
    el.style.top = (10 + Math.random()*65) + 'vh';
    el.style.left = (4 + Math.random()*70) + 'vw';
    el.innerHTML =
      '<div class="pp-head"><div class="pp-h">' + escapeHtml(head) + '</div>' +
      '<button class="pp-x" aria-label="close">×</button></div>' +
      '<div class="pp-body">' + escapeHtml(body) + '</div>';
    document.body.appendChild(el);
    el.querySelector('.pp-x').addEventListener('click', () => el.remove());
    setTimeout(()=>{ if (el.parentNode) el.remove(); }, 9000);
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  window.spawnPopup = spawnPopup;
  setTimeout(() => { if (!window.__schizo_no_popups) spawnPopup(POPUP_MSGS[0][0], POPUP_MSGS[0][1]); }, 12000);
  setInterval(() => {
    if (window.__schizo_no_popups) return;
    const [h,b] = POPUP_MSGS[Math.floor(Math.random()*POPUP_MSGS.length)];
    spawnPopup(h, b);
  }, 22000);

  // ─── Text scramble ──────────────────────────────────────────
  const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#░▒▓█一二三四五六七八九十$420697710%';
  function scrambleEl(el, duration) {
    if (!el || el.dataset.scrambling === '1') return;
    const original = el.dataset.original || el.textContent;
    el.dataset.original = original;
    el.dataset.scrambling = '1';
    const chars = original.split('');
    const total = duration || 600;
    const start = performance.now();
    function step(now) {
      const t = (now - start) / total;
      if (t >= 1) {
        el.textContent = original;
        el.dataset.scrambling = '0';
        return;
      }
      let out = '';
      for (let i = 0; i < chars.length; i++) {
        if (i / chars.length < t) out += chars[i];
        else if (chars[i] === ' ') out += ' ';
        else out += SCRAMBLE_CHARS[Math.floor(Math.random()*SCRAMBLE_CHARS.length)];
      }
      el.textContent = out;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function getScrambleTargets() {
    return document.querySelectorAll('.hero-tag, .tile-title, .scripture p, .tiles-eyebrow');
  }
  setInterval(() => {
    if (window.__schizo_no_popups && window.__schizo_no_stickers) return;
    const els = getScrambleTargets();
    if (!els.length) return;
    const pick = els[Math.floor(Math.random()*els.length)];
    scrambleEl(pick, 500 + Math.random()*600);
  }, 3800);
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest && e.target.closest('.tile-title, .hero-tag');
    if (t) scrambleEl(t, 380);
  });

  // ─── Random body shake bursts ───────────────────────────────
  setInterval(() => {
    if (window.__schizo_no_popups) return;
    if (Math.random() > .8) {
      document.body.classList.add('shake-now');
      setTimeout(() => document.body.classList.remove('shake-now'), 500);
    }
  }, 5200);

  // ─── Scroll-driven chaos amplification ──────────────────────
  let lastScroll = 0, scrollVel = 0;
  window.addEventListener('scroll', () => {
    const dy = Math.abs(window.scrollY - lastScroll);
    lastScroll = window.scrollY;
    scrollVel = Math.min(3, scrollVel + dy*0.01);
  }, { passive: true });
  setInterval(() => {
    if (scrollVel > 0.05) {
      const v = 1 + Math.min(2, scrollVel*0.4);
      document.documentElement.style.setProperty('--chaos', v.toFixed(2));
      scrollVel *= 0.85;
    } else {
      const cur = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--chaos')) || 1;
      if (Math.abs(cur - 1) > 0.02) {
        document.documentElement.style.setProperty('--chaos', (cur + (1-cur)*0.2).toFixed(2));
      }
    }
  }, 120);

  // ─── CA copy ────────────────────────────────────────────────
  window.copyCA = function() {
    const el = document.getElementById('ca-text');
    const ic = document.getElementById('ca-icon');
    if (!el) return;
    const ca = el.textContent.trim();
    if (navigator.clipboard) navigator.clipboard.writeText(ca).catch(()=>{});
    if (ic) {
      const old = ic.textContent;
      ic.textContent = '✓';
      setTimeout(()=>{ ic.textContent = old; }, 1400);
    }
    spawnPopup('BAG SECURED', "contract copied · pass it · don't bogart");
    document.body.classList.add('invert-flash');
    setTimeout(()=>document.body.classList.remove('invert-flash'), 500);
  };

  // ─── Reduce flashing ────────────────────────────────────────
  window.reduceFlashing = function() {
    window.__schizo_no_popups = true;
    window.__schizo_no_stickers = true;
    const fs = document.getElementById('floating-stickers');
    if (fs) fs.innerHTML = '';
    const ew = document.getElementById('epilepsy-warning');
    if (ew) ew.classList.add('dismissed');
    const ms = document.querySelector('.mood-strobe');
    if (ms) ms.style.display = 'none';
  };

})();

/* ═══════════════════════════════════════════════════════════════════
   V2 ADDITIONS — 4:20 countdown, haze terminal, swap modal, reveals
   ═══════════════════════════════════════════════════════════════════ */
(function(){
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── NEXT 4:20 COUNTDOWN ─────────────────────────────────── */
  const segH = document.getElementById('c420-h');
  const segM = document.getElementById('c420-m');
  const segS = document.getElementById('c420-s');
  const c420 = document.querySelector('.clock420');
  const c420Label = document.getElementById('c420-label');
  const c420Sub = document.getElementById('c420-sub');
  let partyFired = false;

  function next420(from) {
    // candidates: today 4:20 AM, today 4:20 PM, tomorrow 4:20 AM
    const c = [];
    for (let addDay = 0; addDay <= 1; addDay++) {
      for (const h of [4, 16]) {
        const d = new Date(from);
        d.setDate(d.getDate() + addDay);
        d.setHours(h, 20, 0, 0);
        if (d > from) c.push(d);
      }
    }
    c.sort((a, b) => a - b);
    return c[0];
  }

  function pad(n){ return String(n).padStart(2, '0'); }

  function tick420() {
    if (!segH) return;
    const now = new Date();
    const isTime = (now.getHours() === 4 || now.getHours() === 16) && now.getMinutes() === 20;

    if (isTime) {
      c420.classList.add('its-time');
      c420Label.textContent = 'IT IS 4:20';
      segH.textContent = '04'; segM.textContent = '20';
      segS.textContent = pad(now.getSeconds());
      c420Sub.textContent = 'light it. now. this is not a drill.';
      if (!partyFired && !window.__schizo_no_popups && typeof window.spawnPopup === 'function') {
        partyFired = true;
        window.spawnPopup('🚨 4:20 ALERT 🚨', 'the prophecy fulfills itself · spark it · pass it · blessed be the bag');
      }
      return;
    }

    partyFired = false;
    c420.classList.remove('its-time');
    c420Label.textContent = 'NEXT 4:20 IN';
    c420Sub.textContent = 'local time · the blunt waits for no one';
    const diff = next420(now) - now;
    const s = Math.floor(diff / 1000);
    segH.textContent = pad(Math.floor(s / 3600));
    segM.textContent = pad(Math.floor((s % 3600) / 60));
    segS.textContent = pad(s % 60);
  }
  tick420();
  setInterval(tick420, 1000);

  /* ─── HAZE TERMINAL — typed status lines ──────────────────── */
  const htLine = document.getElementById('ht-line');
  const HT_MSGS = [
    'uplink established · haze.net node 0x42069',
    'LP status: BURNED · ashes verified on-chain',
    'tax scan complete: 0/0 · narc-free zone',
    'supply audit: 1,000,000,000 · no mint authority',
    'diamond hand integrity: 100% · grip secured',
    'rotation protocol: puff puff PASS · enforced',
    'cypher 4:20 broadcasting · do not extinguish',
    'paperhand firewall: ACTIVE · weak sells rejected',
    'munchie reserves: critical · resupply at 3am',
    'chart cathedral doors: OPEN · candles lit',
  ];
  let htIdx = 0;
  function typeLine(text, done) {
    if (!htLine) return;
    if (reducedMotion) { htLine.textContent = text; if (done) setTimeout(done, 4200); return; }
    htLine.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
      htLine.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(iv);
        if (done) setTimeout(done, 3400);
      }
    }, 28);
  }
  function htCycle() {
    typeLine(HT_MSGS[htIdx % HT_MSGS.length], htCycle);
    htIdx++;
  }
  if (htLine) setTimeout(htCycle, 900);

  /* ─── SWAP MODAL ──────────────────────────────────────────── */
  const overlay = document.getElementById('swap-overlay');
  let lastFocus = null;
  window.openSwap = function() {
    if (!overlay) return;
    lastFocus = document.activeElement;
    overlay.hidden = false;
    const first = overlay.querySelector('.sw-opt');
    if (first) first.focus();
    if (!window.__schizo_no_popups && typeof window.spawnPopup === 'function' && Math.random() > .6) {
      window.spawnPopup('DEALER MENU OPEN', 'three plugs · all legit · pick one · no haggling');
    }
  };
  window.closeSwap = function() {
    if (!overlay) return;
    overlay.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };
  if (overlay) {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) window.closeSwap(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) window.closeSwap();
    });
  }

  /* ─── SCROLL REVEALS ──────────────────────────────────────── */
  const rvEls = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && rvEls.length && !reducedMotion) {
    document.documentElement.classList.add('rv-armed');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    rvEls.forEach(el => io.observe(el));
    // belt + suspenders: if anything is still hidden after 4s, show everything
    setTimeout(() => {
      rvEls.forEach(el => el.classList.add('in'));
    }, 4000);
  }

  /* ─── HOTBOX EASTER EGG — tap the bud to thicken the haze ─── */
  const bud = document.getElementById('hero-bud');
  let puffs = 0;
  if (bud) {
    bud.style.cursor = 'pointer';
    bud.addEventListener('click', () => {
      puffs++;
      const op = Math.min(2.2, 1 + puffs * 0.18);
      document.documentElement.style.setProperty('--smoke-opacity', op.toFixed(2));
      document.documentElement.style.setProperty('--grain-opacity', Math.min(.7, .45 + puffs * .03).toFixed(2));
      if (puffs === 4 && typeof window.spawnPopup === 'function' && !window.__schizo_no_popups) {
        window.spawnPopup('HOTBOX INITIATED', 'windows up · towels down · visibility dropping');
      }
      if (puffs >= 9) {
        puffs = 0;
        document.documentElement.style.setProperty('--smoke-opacity', '1');
        document.documentElement.style.setProperty('--grain-opacity', '.45');
        if (typeof window.spawnPopup === 'function' && !window.__schizo_no_popups) {
          window.spawnPopup('AIRED OUT', 'someone opened a window · haze reset · run it back');
        }
      }
    });
  }

  /* ─── TOUCH DEVICES — kill cursor trail, keep the chaos ───── */
  if (window.matchMedia('(pointer: coarse)').matches) {
    window.__schizo_no_stickers = true;
  }
})();
