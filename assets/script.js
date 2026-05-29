/* ================================================================
   MAHMOUD'S 24th BIRTHDAY · SYNTHWAVE EDITION · main script
   ================================================================ */

/* ---- Stars ---- */
(function () {
  var container = document.getElementById('stars');
  for (var i = 0; i < 220; i++) {
    var s = document.createElement('div');
    s.className = 'star';
    var size = Math.random() * 2.5 + 0.5;
    s.style.cssText =
      'width:' + size + 'px;height:' + size + 'px;' +
      'top:' + (Math.random() * 100) + '%;' +
      'left:' + (Math.random() * 100) + '%;' +
      '--d:' + (Math.random() * 3 + 1.5).toFixed(1) + 's;' +
      '--lo:' + (Math.random() * 0.15 + 0.05).toFixed(2) + ';' +
      '--hi:' + (Math.random() * 0.6 + 0.35).toFixed(2) + ';' +
      '--delay:-' + (Math.random() * 3).toFixed(2) + 's;';
    container.appendChild(s);
  }
})();

/* ================================================================
   CONFETTI ENGINE
   ================================================================ */
var _confettiFrame = null;

function launchConfetti(count, originX, originY) {
  var canvas = document.getElementById('confetti-canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ox = (originX !== undefined) ? originX : canvas.width / 2;
  var oy = (originY !== undefined) ? originY : canvas.height * 0.4;
  var COLORS = ['#ff2d78','#00f5ff','#b200ff','#ffd700','#00ff88','#ff8800','#ffffff'];
  var n = count || 80;
  var particles = [];

  for (var i = 0; i < n; i++) {
    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * 8 + 3;
    particles.push({
      x: ox, y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      w: Math.random() * 10 + 5,
      h: Math.random() * 5 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 9,
      opacity: 1,
      gravity: 0.18 + Math.random() * 0.1
    });
  }

  cancelAnimationFrame(_confettiFrame);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var alive = false;
    for (var j = 0; j < particles.length; j++) {
      var p = particles[j];
      if (p.y < canvas.height + 40) {
        alive = true;
        p.x += p.vx; p.y += p.vy;
        p.vy += p.gravity;
        p.rot += p.rotV;
        if (p.y > canvas.height * 0.65) p.opacity -= 0.018;
        p.opacity = Math.max(0, p.opacity);
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    }
    if (alive) _confettiFrame = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

window.addEventListener('resize', function () {
  var c = document.getElementById('confetti-canvas');
  c.width = window.innerWidth;
  c.height = window.innerHeight;
});

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
(function () {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
})();

/* ================================================================
   HERO TERMINAL TYPING
   ================================================================ */
(function () {
  var body = document.getElementById('termBody');
  var lines = [
    { type: 'cmd',     text: 'whoami' },
    { type: 'out',     text: 'mahmoud · computer_engineer · level_24' },
    { type: 'cmd',     text: 'sudo celebrate --birthday --age=24' },
    { type: 'out',     text: '[sudo] password for mahmoud: ████████' },
    { type: 'success', text: '✓  Confetti        loaded' },
    { type: 'success', text: '✓  Cake (24 candles) ready' },
    { type: 'success', text: '✓  Wishes          queued' },
    { type: 'bday',    text: '🎉  Happy Birthday, Mahmoud! Level 24 Achieved! 🚀' },
  ];

  var lineIdx = 0;
  var charIdx = 0;
  var currentEl = null;

  function addLine(line) {
    var el = document.createElement('div');
    el.className = 'tl';
    if (line.type === 'cmd') {
      el.innerHTML =
        '<span class="tl-prompt">➜</span> ' +
        '<span class="tl-dir">~</span> ' +
        '<span class="tl-cmd"></span>' +
        '<span class="tl-cursor"></span>';
    } else {
      el.className = 'tl tl-' + line.type;
      el.innerHTML = '<span></span>';
    }
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function typeNext() {
    if (lineIdx >= lines.length) return;
    var line = lines[lineIdx];

    if (!currentEl) {
      currentEl = addLine(line);
      charIdx = 0;
    }

    var span = line.type === 'cmd'
      ? currentEl.querySelector('.tl-cmd')
      : currentEl.querySelector('span');
    var cursor = currentEl.querySelector('.tl-cursor');

    if (charIdx < line.text.length) {
      span.textContent += line.text[charIdx];
      charIdx++;
      var delay = line.type === 'cmd' ? 38 + Math.random() * 38 : 12;
      setTimeout(typeNext, delay);
    } else {
      if (cursor) cursor.remove();
      lineIdx++;
      currentEl = null;
      var pause = lineIdx === 2 ? 350 : (lineIdx === 4 ? 500 : 250);
      setTimeout(typeNext, pause);
    }
  }

  setTimeout(typeNext, 900);
})();

/* ================================================================
   CAKE — 24 CANDLES
   ================================================================ */
(function () {
  var NUM = 24;
  var container  = document.getElementById('candles');
  var statusEl   = document.getElementById('cakeStatus');
  var revealEl   = document.getElementById('cakeReveal');
  var micBtn     = document.getElementById('micBtn');
  var blowAllBtn = document.getElementById('blowAll');
  var relightBtn = document.getElementById('relight');
  var micWrap    = document.getElementById('micWrap');
  var micMeterEl = document.getElementById('micMeter');

  var candles = [];
  var outCount = 0;
  var micActive = false;
  var audioCtx = null, analyser = null, micStream = null;

  function build() {
    container.innerHTML = '';
    candles = [];
    outCount = 0;
    revealEl.classList.add('hidden');
    updateStatus();

    for (var i = 0; i < NUM; i++) {
      var el = document.createElement('div');
      el.className = 'candle';
      el.innerHTML =
        '<div class="flame-wrap">' +
          '<div class="flame"></div>' +
          '<div class="flame-inner"></div>' +
        '</div>' +
        '<div class="candle-stick"></div>';
      (function (idx) {
        el.addEventListener('click', function () { blow(idx); });
      })(i);
      container.appendChild(el);
      candles.push({ el: el, out: false });
    }
  }

  function blow(i) {
    if (!candles[i] || candles[i].out) return;
    candles[i].out = true;
    candles[i].el.classList.add('out');
    outCount++;
    updateStatus();
    if (outCount === NUM) onAllOut();
  }

  function updateStatus() {
    var rem = NUM - outCount;
    statusEl.textContent = rem > 0
      ? rem + ' candle' + (rem !== 1 ? 's' : '') + ' remaining…'
      : '🌟 All 24 candles out!';
  }

  function onAllOut() {
    revealEl.classList.remove('hidden');
    launchConfetti(180);
    if (micActive) stopMic();
  }

  blowAllBtn.addEventListener('click', function () {
    for (var i = 0; i < NUM; i++) blow(i);
  });

  relightBtn.addEventListener('click', function () {
    stopMic();
    build();
  });

  micBtn.addEventListener('click', async function () {
    if (micActive) { stopMic(); return; }
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtx  = new (window.AudioContext || window.webkitAudioContext)();
      var src   = audioCtx.createMediaStreamSource(micStream);
      analyser  = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
      micActive = true;
      micBtn.textContent = '🎤 Stop Mic';
      micWrap.hidden = false;
      tickMic();
    } catch (e) {
      alert('Mic access denied — please allow microphone permission and try again.');
    }
  });

  function stopMic() {
    if (!micActive) return;
    micActive = false;
    if (micStream) micStream.getTracks().forEach(function (t) { t.stop(); });
    if (audioCtx) audioCtx.close();
    analyser = null;
    micWrap.hidden = true;
    micBtn.textContent = '🎤 Blow with Mic';
  }

  function tickMic() {
    if (!micActive || !analyser) return;
    var data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    var sum = 0;
    for (var k = 0; k < data.length; k++) sum += data[k];
    var pct = Math.min(100, (sum / data.length) * 3.2);
    micMeterEl.style.width = pct + '%';

    if (pct > 28) {
      var unblown = [];
      for (var i = 0; i < candles.length; i++) {
        if (!candles[i].out) unblown.push(i);
      }
      if (unblown.length > 0) {
        blow(unblown[Math.floor(Math.random() * unblown.length)]);
      }
    }
    requestAnimationFrame(tickMic);
  }

  build();
})();

/* ================================================================
   MEMORY MATCH GAME
   ================================================================ */
(function () {
  var ICONS = [
    { icon: '🐍', label: 'Python' },
    { icon: '⚛️', label: 'React' },
    { icon: '🐳', label: 'Docker' },
    { icon: '🔧', label: 'Git' },
    { icon: '☁️', label: 'Cloud' },
    { icon: '🔐', label: 'Security' },
    { icon: '🦀', label: 'Rust' },
    { icon: '🐧', label: 'Linux' },
  ];

  var grid       = document.getElementById('memoryGrid');
  var startBtn   = document.getElementById('memStart');
  var restartBtn = document.getElementById('memRestart');
  var moveEl     = document.getElementById('moveCount');
  var pairsEl    = document.getElementById('pairsFound');
  var timerEl    = document.getElementById('memTimer');
  var winBox     = document.getElementById('memWin');
  var winMovesEl = document.getElementById('winMoves');
  var winTimeEl  = document.getElementById('winTime');

  var cards = [], flipped = [], matched = 0, moves = 0;
  var seconds = 0, timerInt = null;
  var active = false, locked = false;

  function buildGrid() {
    grid.innerHTML = '';
    cards = []; flipped = []; matched = 0; moves = 0; seconds = 0; locked = false;
    moveEl.textContent = '0';
    pairsEl.textContent = '0/8';
    timerEl.textContent = '00:00';
    winBox.classList.add('hidden');

    var pairs = ICONS.concat(ICONS).sort(function () { return Math.random() - 0.5; });

    pairs.forEach(function (item, i) {
      var card = document.createElement('div');
      card.className = 'mem-card';
      card.dataset.icon = item.icon;
      card.innerHTML =
        '<div class="mem-inner">' +
          '<div class="mem-face mem-back"></div>' +
          '<div class="mem-face mem-front">' +
            item.icon +
            '<span class="mem-label">' + item.label + '</span>' +
          '</div>' +
        '</div>';
      card.addEventListener('click', function () { flip(card); });
      grid.appendChild(card);
      cards.push(card);
    });
  }

  function startTimer() {
    clearInterval(timerInt);
    seconds = 0;
    timerInt = setInterval(function () {
      seconds++;
      timerEl.textContent = pad(Math.floor(seconds / 60)) + ':' + pad(seconds % 60);
    }, 1000);
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function flip(card) {
    if (!active || locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    flipped.push(card);
    if (flipped.length === 2) {
      locked = true;
      moves++;
      moveEl.textContent = moves;
      checkMatch();
    }
  }

  function checkMatch() {
    var a = flipped[0], b = flipped[1];
    if (a.dataset.icon === b.dataset.icon) {
      a.classList.add('matched');
      b.classList.add('matched');
      matched++;
      pairsEl.textContent = matched + '/8';
      flipped = [];
      locked = false;
      if (matched === ICONS.length) onWin();
    } else {
      setTimeout(function () {
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        flipped = [];
        locked = false;
      }, 850);
    }
  }

  function onWin() {
    clearInterval(timerInt);
    active = false;
    winMovesEl.textContent = moves;
    winTimeEl.textContent  = pad(Math.floor(seconds / 60)) + ':' + pad(seconds % 60);
    winBox.classList.remove('hidden');
    launchConfetti(130);
  }

  startBtn.addEventListener('click', function () {
    buildGrid();
    active = true;
    startTimer();
    startBtn.disabled = true;
    restartBtn.disabled = false;
  });

  restartBtn.addEventListener('click', function () {
    clearInterval(timerInt);
    buildGrid();
    active = true;
    startTimer();
  });

  buildGrid();
})();

/* ================================================================
   CODE TYPER CHALLENGE
   ================================================================ */
(function () {
  var CODE =
    'function happyBirthday(name, age) {\n' +
    '  const wishes = Array(age).fill("🎉");\n' +
    '  console.log(`Happy Birthday, ${name}!`);\n' +
    '  console.log(`Level ${age} unlocked! 🚀`);\n' +
    '  return wishes.join(" ");\n' +
    '}\n\n' +
    'happyBirthday("Mahmoud", 24);';

  var RATINGS = [
    [90, '🔥 Insane speed! You type like the machine you are.'],
    [70, '🚀 Blazing fast. Mahmoud approves.'],
    [50, '⚡ Solid WPM, Computer Engineer!'],
    [30, '👍 Decent speed — keep grinding.'],
    [0,  '😅 Slow and steady... but at least you finished! 🎉'],
  ];

  var displayEl  = document.getElementById('codeDisplay');
  var inputEl    = document.getElementById('codeInput');
  var startBtn   = document.getElementById('typerStart');
  var resetBtn   = document.getElementById('typerReset');
  var wpmEl      = document.getElementById('wpmDisplay');
  var accEl      = document.getElementById('accDisplay');
  var timerElT   = document.getElementById('typerTimerEl');
  var completeEl = document.getElementById('typerComplete');
  var finalWPM   = document.getElementById('finalWPM');
  var finalAcc   = document.getElementById('finalAcc');
  var finalTime  = document.getElementById('finalTime');
  var tcMsgEl    = document.getElementById('tcMsg');

  var started = false, startTime = null, timerInt = null, seconds = 0;
  var totalTyped = 0, errors = 0;

  function esc(ch) {
    if (ch === '<') return '&lt;';
    if (ch === '>') return '&gt;';
    if (ch === '&') return '&amp;';
    return ch;
  }

  function renderDisplay(typed) {
    var html = '';
    for (var i = 0; i < CODE.length; i++) {
      var ch = CODE[i];
      var t  = typed[i];
      var display = ch === '\n' ? '↵\n' : ch === ' ' ? '·' : esc(ch);

      if (i === typed.length) {
        html += '<span class="ch-cursor">' + (ch === '\n' ? '↵\n' : ch === ' ' ? ' ' : esc(ch)) + '</span>';
      } else if (t === undefined) {
        html += '<span class="ch-pending">' + display + '</span>';
      } else if (t === ch) {
        html += '<span class="ch-correct">' + display + '</span>';
      } else {
        html += '<span class="ch-wrong">' + display + '</span>';
      }
    }
    displayEl.innerHTML = html;
  }

  function calcWPM() {
    var elapsed = (Date.now() - startTime) / 60000;
    return elapsed > 0 ? Math.round((totalTyped / 5) / elapsed) : 0;
  }

  function calcAcc() {
    if (totalTyped === 0) return 100;
    return Math.max(0, Math.round(((totalTyped - errors) / totalTyped) * 100));
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  inputEl.addEventListener('input', function () {
    if (!started) return;
    var typed = inputEl.value;
    totalTyped = typed.length;
    errors = 0;
    for (var i = 0; i < typed.length; i++) {
      if (typed[i] !== CODE[i]) errors++;
    }
    renderDisplay(typed);
    wpmEl.textContent = calcWPM();
    accEl.textContent = calcAcc() + '%';

    if (typed === CODE) onComplete();
  });

  function onComplete() {
    clearInterval(timerInt);
    started = false;
    inputEl.disabled = true;
    var wpm = calcWPM(), acc = calcAcc();
    finalWPM.textContent  = wpm;
    finalAcc.textContent  = acc;
    finalTime.textContent = pad(Math.floor(seconds / 60)) + ':' + pad(seconds % 60);
    var rating = RATINGS.find(function (r) { return wpm >= r[0]; });
    tcMsgEl.textContent = rating ? rating[1] : RATINGS[RATINGS.length - 1][1];
    completeEl.classList.remove('hidden');
    launchConfetti(90);
  }

  function reset() {
    clearInterval(timerInt);
    started = false;
    inputEl.value = '';
    inputEl.disabled = true;
    startBtn.disabled = false;
    seconds = 0;
    totalTyped = 0; errors = 0;
    wpmEl.textContent = '—';
    accEl.textContent = '—';
    timerElT.textContent = '00:00';
    completeEl.classList.add('hidden');
    renderDisplay('');
  }

  startBtn.addEventListener('click', function () {
    reset();
    started = true;
    startTime = Date.now();
    inputEl.disabled = false;
    inputEl.focus();
    startBtn.disabled = true;
    timerInt = setInterval(function () {
      seconds++;
      timerElT.textContent = pad(Math.floor(seconds / 60)) + ':' + pad(seconds % 60);
    }, 1000);
  });

  resetBtn.addEventListener('click', reset);

  reset();
})();

/* ================================================================
   SURPRISE / FORTUNES
   ================================================================ */
(function () {
  var FORTUNES = [
    'May your code compile on the first try. Every single time. 🙏',
    'May your PRs be approved within the hour — no change requests. ⚡',
    'May you never again see a merge conflict in your life. 🕊️',
    'May your coffee always be hot and your bugs always be minor. ☕',
    'May every API you call return 200 OK for eternity. 🟢',
    'May your stack traces be short and your solutions be obvious. 🧠',
    'May you find the bug in under 5 minutes. Every time. 🔍',
    'May your WiFi be 5G and your latency be single-digit. 📡',
    'May your memory never leak and your pointers never dangle. 💎',
    'May you always push to the right branch on the first try. 🌿',
    'May Allah bless you with health, love, and clean architecture. 🌙',
    'May every `npm install` finish in under 10 seconds. ✅',
    'May your regex work on the very first attempt. 🪄',
    'May your deployments never touch production on a Friday. 🚀',
    'May your code be so clean it shames linters into silence. ✨',
    'May you write the perfect README on the first draft. 📝',
    'May your `git stash pop` never cause a conflict. 🎯',
    'May production always match your local environment. 💻',
    'May you always have great mentors and equally great juniors to teach. 🤝',
    'May every interview question be something you actually studied. 📚',
  ];

  var btn      = document.getElementById('surpriseBtn');
  var fortuneEl = document.getElementById('fortune');
  var countEl  = document.getElementById('popCount');
  var count = 0, lastIdx = -1;

  btn.addEventListener('click', function (e) {
    count++;
    countEl.textContent = count;

    var idx;
    do { idx = Math.floor(Math.random() * FORTUNES.length); } while (idx === lastIdx);
    lastIdx = idx;

    fortuneEl.style.opacity = '0';
    setTimeout(function () {
      fortuneEl.innerHTML =
        '<div class="fortune-tag">// fortune_' + String(count).padStart(3, '0') + '.sh</div>' +
        FORTUNES[idx];
      fortuneEl.style.opacity = '1';
    }, 200);

    var rect = btn.getBoundingClientRect();
    launchConfetti(65, rect.left + rect.width / 2, rect.top + rect.height / 2);

    btn.style.transform = 'scale(0.93)';
    setTimeout(function () { btn.style.transform = ''; }, 140);
  });
})();
