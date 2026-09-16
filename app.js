/* =====================================================================
 *  مواقيت الصلاة - الأقصر — Web App
 *  Prayer Times Luxor — Full JS controller
 *  Author: عبد الرحمن ياسر الاسيوطي
 *  Tel/WhatsApp: 01064106070 (Intl: +201064106070)
 * ===================================================================== */

(function () {
  'use strict';

  // ---------------------------------------------------------------
  //  STATE
  // ---------------------------------------------------------------
  const STORAGE_KEYS = {
    customName: 'lux_customName',
    isSummerTime: 'lux_isSummerTime',
    showIqama: 'lux_showIqama',
    athanEnabled: 'lux_athanEnabled',
    selectedMonth: 'lux_selectedMonth'
  };

  const state = {
    now: new Date(),
    isSummerTime: readBool(STORAGE_KEYS.isSummerTime, true),
    showIqama: readBool(STORAGE_KEYS.showIqama, true),
    athanEnabled: readBool(STORAGE_KEYS.athanEnabled, true),
    customName: localStorage.getItem(STORAGE_KEYS.customName) || 'عبد الرحمن ياسر الاسيوطي',
    selectedMonth: parseInt(localStorage.getItem(STORAGE_KEYS.selectedMonth), 10) || (new Date().getMonth() + 1),
    athanAudio: null,
    isPlayingAthan: false,
    lastTriggeredKey: '',
    lastReminderKey: ''
  };

  function readBool(key, fallback) {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return v === 'true';
  }
  function writeBool(key, val) { localStorage.setItem(key, String(val)); }

  // ---------------------------------------------------------------
  //  HELPERS
  // ---------------------------------------------------------------
  function pad2(n) { return String(n).padStart(2, '0'); }

  function format12(time24) {
    if (!time24 || !time24.includes(':')) return time24;
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'م' : 'ص';
    let hh = h % 12;
    if (hh === 0) hh = 12;
    return `${hh}:${pad2(m)} ${period}`;
  }

  /** Adjust time based on summer/winter mode */
  function adjustTime(prayerKey, time24) {
    if (!state.isSummerTime && prayerKey !== 'dhuhr') {
      const [h, m] = time24.split(':').map(Number);
      let nh = (h - 1 + 24) % 24;
      return `${pad2(nh)}:${pad2(m)}`;
    }
    return time24;
  }

  /** Add minutes (HH:MM) */
  function addMinutes(time24, mins) {
    const [h, m] = time24.split(':').map(Number);
    const total = h * 60 + m + mins;
    const nh = Math.floor((total / 60) % 24);
    const nm = total % 60;
    return `${pad2(nh)}:${pad2(nm)}`;
  }

  /** Time HH:MM to total seconds */
  function toSeconds(time24) {
    const [h, m] = time24.split(':').map(Number);
    return h * 3600 + m * 60;
  }

  /** Format duration (seconds → HH:MM:SS) */
  function formatDuration(totalSeconds) {
    if (totalSeconds < 0) totalSeconds = 0;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  }

  /** Current real-time now-seconds since midnight */
  function nowSeconds() {
    const n = state.now;
    return n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds();
  }

  /** Get today's prayer data (from selected month) */
  function getTodayData() {
    const list = PrayerData.allMonthsTimes[state.selectedMonth] || PrayerData.allMonthsTimes[9];
    let day = state.now.getDate();
    if (day < 1 || day > list.length) day = 1;
    return list.find(d => d.day === day) || list[0];
  }

  /** Get tomorrow's fajr */
  function getTomorrowFajr() {
    const list = PrayerData.allMonthsTimes[state.selectedMonth] || PrayerData.allMonthsTimes[9];
    let tomorrow = state.now.getDate() + 1;
    if (tomorrow > list.length) {
      const nextMonth = state.selectedMonth === 12 ? 1 : state.selectedMonth + 1;
      const nextList = PrayerData.allMonthsTimes[nextMonth] || list;
      return adjustTime('fajr', nextList[0].fajr);
    }
    const td = list.find(d => d.day === tomorrow) || list[0];
    return adjustTime('fajr', td.fajr);
  }

  /** Get next prayer info */
  function getNextPrayerInfo() {
    const today = getTodayData();
    const nowSecs = nowSeconds();

    for (const meta of PrayerData.prayerMeta) {
      const key = meta.key;
      const t = adjustTime(key, today[key]);
      const ps = toSeconds(t);
      if (ps > nowSecs) {
        return {
          key,
          name: meta.name,
          icon: meta.icon,
          time24: t,
          time12: format12(t),
          remainingSeconds: ps - nowSecs,
          isTomorrow: false
        };
      }
    }

    // Past today's prayers → tomorrow fajr
    const tf = getTomorrowFajr();
    const tfSecs = toSeconds(tf);
    const secsToMidnight = (24 * 3600) - nowSecs;
    return {
      key: 'fajr',
      name: 'صلاة الفجر (غداً)',
      icon: '🌙',
      time24: tf,
      time12: format12(tf),
      remainingSeconds: secsToMidnight + tfSecs,
      isTomorrow: true
    };
  }

  /** Hijri date conversion (Umm Al-Qura approximation) */
  function toHijri(date) {
    try {
      const fmt = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      return fmt.format(date);
    } catch (e) {
      return '';
    }
  }

  /** Arabic gregorian date */
  function toArabicGregorian(date) {
    try {
      const fmt = new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      });
      return fmt.format(date);
    } catch (e) {
      const days = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
      return `${days[date.getDay()]} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }
  }

  // ---------------------------------------------------------------
  //  RENDER — Clock
  // ---------------------------------------------------------------
  function renderClock() {
    const n = state.now;
    document.querySelectorAll('.clock__h').forEach(el => el.textContent = pad2(n.getHours()));
    document.querySelectorAll('.clock__m').forEach(el => el.textContent = pad2(n.getMinutes()));
    document.querySelectorAll('.clock__s').forEach(el => el.textContent = pad2(n.getSeconds()));
    document.getElementById('gregorianDate').textContent = toArabicGregorian(n);
    document.getElementById('hijriDate').textContent = toHijri(n) || '';
    document.getElementById('year').textContent = n.getFullYear();
  }

  // ---------------------------------------------------------------
  //  RENDER — Next Prayer
  // ---------------------------------------------------------------
  function renderNextPrayer() {
    const np = getNextPrayerInfo();
    document.getElementById('npIcon').textContent = np.icon;
    document.getElementById('npName').textContent = np.name;
    document.getElementById('npTime').textContent = np.time12;
    document.getElementById('npCountdown').textContent = formatDuration(np.remainingSeconds);

    // Progress: estimate based on remaining vs interval to previous prayer
    const today = getTodayData();
    const list = PrayerData.prayerMeta.map(m => toSeconds(adjustTime(m.key, today[m.key])));
    const idx = list.findIndex(s => s > nowSeconds());
    let progress = 0;
    if (idx > 0) {
      const interval = list[idx] - list[idx - 1];
      const elapsed = nowSeconds() - list[idx - 1];
      progress = Math.max(0, Math.min(100, (elapsed / interval) * 100));
    } else if (idx === 0) {
      progress = (nowSeconds() / list[0]) * 100;
    }
    document.getElementById('npProgress').style.width = `${progress}%`;

    return np;
  }

  // ---------------------------------------------------------------
  //  RENDER — Prayer list
  // ---------------------------------------------------------------
  function renderPrayerList() {
    const today = getTodayData();
    const np = getNextPrayerInfo();
    const container = document.getElementById('prayerList');
    container.innerHTML = '';

    PrayerData.prayerMeta.forEach(meta => {
      const t = adjustTime(meta.key, today[meta.key]);
      const t12 = format12(t);
      const iqamaMins = PrayerData.iqamaMinutes[meta.key] || 0;
      const iqamaTime = iqamaMins > 0 ? format12(addMinutes(t, iqamaMins)) : '';
      const pastTime = toSeconds(t) < nowSeconds();
      const isNext = meta.key === np.key && !pastTime;

      const item = document.createElement('div');
      item.className = `prayer-item ${isNext ? 'prayer-item--next' : ''} ${pastTime ? 'prayer-item--past' : ''}`;
      item.innerHTML = `
        <div class="prayer-item__icon">${meta.icon}</div>
        <div class="prayer-item__info">
          <div class="prayer-item__name">${meta.name}</div>
          ${state.showIqama && iqamaTime ? `<div class="prayer-item__iqama">إقامة: ${iqamaTime}</div>` : ''}
        </div>
        <div class="prayer-item__time">${t12}</div>
        ${isNext ? `<span class="prayer-item__countdown-tag">متبقي ${formatDuration(np.remainingSeconds)}</span>` : ''}
      `;
      container.appendChild(item);
    });
  }

  // ---------------------------------------------------------------
  //  CONTROLS
  // ---------------------------------------------------------------
  function renderControls() {
    // Season toggle
    document.getElementById('seasonIcon').textContent = state.isSummerTime ? '☀️' : '❄️';
    document.getElementById('seasonLabel').textContent = state.isSummerTime ? 'التوقيت الصيفي' : 'التوقيت الشتوي';
    document.getElementById('toggleSeasonBtn').classList.toggle('ctrl-btn--active', state.isSummerTime);

    // Iqama toggle
    document.getElementById('iqamaLabel').textContent = state.showIqama ? 'إخفاء الإقامة' : 'إظهار الإقامة';
    document.getElementById('toggleIqamaBtn').classList.toggle('ctrl-btn--active', state.showIqama);

    // Athan toggle
    document.getElementById('athanIcon').textContent = state.athanEnabled ? '🔊' : '🔇';
    document.getElementById('athanLabel').textContent = state.athanEnabled ? 'صوت الأذان: تشغيل' : 'صوت الأذان: إيقاف';
    document.getElementById('toggleAthanBtn').classList.toggle('ctrl-btn--active', state.athanEnabled);

    // Custom name
    document.getElementById('customName').textContent = state.customName;
    document.getElementById('splashSubtitle').textContent = `⭐ ${state.customName} ⭐`;
  }

  // ---------------------------------------------------------------
  //  ATHAN ALARM
  // ---------------------------------------------------------------
  function checkAndTriggerAthan() {
    if (!state.athanEnabled) return;
    const today = getTodayData();
    const n = state.now;
    const hh = n.getHours();
    const mm = n.getMinutes();
    const ss = n.getSeconds();

    for (const meta of PrayerData.prayerMeta) {
      if (meta.key === 'sunrise') continue;
      const t = adjustTime(meta.key, today[meta.key]);
      const [ph, pm] = t.split(':').map(Number);
      if (hh === ph && mm === pm && ss <= 3) {
        const token = `${n.getMonth() + 1}_${n.getDate()}_${meta.key}`;
        if (state.lastTriggeredKey !== token) {
          state.lastTriggeredKey = token;
          playAthan(meta.name, meta.icon, format12(t));
        }
      }
    }
  }

  function playAthan(name, icon, time12) {
    showAthanModal(name, icon, time12);
    if (!state.athanEnabled) return;
    state.athanAudio = state.athanAudio || document.getElementById('athanAudio');
    try {
      state.athanAudio.currentTime = 0;
      state.athanAudio.volume = 1;
      const p = state.athanAudio.play();
      if (p && p.catch) p.catch(() => {/* autoplay blocked, user needs to tap */});
      state.isPlayingAthan = true;
    } catch (e) {
      console.warn('Athan play error:', e);
    }
  }

  function stopAthan() {
    if (state.athanAudio) {
      try { state.athanAudio.pause(); state.athanAudio.currentTime = 0; } catch (_) {}
    }
    state.isPlayingAthan = false;
    closeModal('athanModal');
  }

  // ---------------------------------------------------------------
  //  MODALS
  // ---------------------------------------------------------------
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showAthanModal(name, icon, time12) {
    document.getElementById('athanModalIcon').textContent = icon;
    document.getElementById('athanModalName').textContent = name;
    document.getElementById('athanModalTime').textContent = time12;
    openModal('athanModal');
  }

  // ---------------------------------------------------------------
  //  MONTH TABLE
  // ---------------------------------------------------------------
  function renderMonthPicker() {
    const sel = document.getElementById('monthSelect');
    sel.innerHTML = '';
    for (let m = 1; m <= 12; m++) {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = PrayerData.monthNames[m];
      if (m === state.selectedMonth) opt.selected = true;
      sel.appendChild(opt);
    }
  }

  function renderMonthTable(month) {
    const list = PrayerData.allMonthsTimes[month] || [];
    const body = document.getElementById('monthTableBody');
    body.innerHTML = '';
    const today = new Date();
    list.forEach(day => {
      const tr = document.createElement('tr');
      if (month === today.getMonth() + 1 && day.day === today.getDate()) tr.classList.add('today');
      tr.innerHTML = `
        <td class="day-cell">${day.day}</td>
        <td>${format12(day.fajr)}</td>
        <td>${format12(day.sunrise)}</td>
        <td>${format12(day.dhuhr)}</td>
        <td>${format12(day.asr)}</td>
        <td>${format12(day.maghrib)}</td>
        <td>${format12(day.isha)}</td>
      `;
      body.appendChild(tr);
    });
  }

  // ---------------------------------------------------------------
  //  DOWNLOAD AS IMAGE
  // ---------------------------------------------------------------
  async function downloadCardAsImage() {
    if (typeof html2canvas === 'undefined') {
      showToast('مكتبة الصور قيد التحميل، حاول بعد لحظة');
      return;
    }
    showToast('⏳ جاري تجهيز الصورة...');
    // Build a clean card offscreen
    const today = getTodayData();
    const wrap = document.createElement('div');
    wrap.style.cssText = `
      position: fixed; left: -99999px; top: 0;
      width: 720px; padding: 32px;
      background: linear-gradient(180deg, #0A0A1A 0%, #14142B 100%);
      color: #fff; font-family: 'Cairo', Tahoma, sans-serif;
      direction: rtl;
    `;
    wrap.innerHTML = `
      <div style="text-align:center; padding:24px; border:2px solid #FFD700; border-radius:22px; background:linear-gradient(135deg,#1E1738,#0F0A1F);">
        <h1 style="margin:0; font-family:'Amiri',serif; color:#FFD700; font-size:38px; text-shadow:0 0 14px rgba(255,215,0,0.45);">
          مواقيت الصلاة - الأقصر
        </h1>
        <p style="margin:6px 0 4px; color:#FFE082; font-size:18px; font-weight:700;">
          ⭐ ${state.customName} ⭐
        </p>
        <p style="margin:0 0 20px; color:rgba(255,255,255,0.65); font-size:14px;">
          ${toArabicGregorian(state.now)} • ${toHijri(state.now)}
        </p>
        <table style="width:100%; border-collapse:collapse; margin-top:14px; font-size:18px;">
          ${PrayerData.prayerMeta.map(m => `
            <tr style="border-bottom:1px solid rgba(255,215,0,0.18);">
              <td style="padding:12px 8px; text-align:right; color:#fff; font-family:'Amiri',serif; font-size:20px;">
                ${m.icon} ${m.name}
              </td>
              <td style="padding:12px 8px; text-align:left; color:#FFE082; font-weight:700; font-family:'Cairo',sans-serif;">
                ${format12(adjustTime(m.key, today[m.key]))}
              </td>
            </tr>
          `).join('')}
        </table>
        <p style="margin-top:24px; color:rgba(255,255,255,0.55); font-size:13px;">
          📱 +201064106070 • تطوير: عبد الرحمن ياسر الاسيوطي
        </p>
      </div>
    `;
    document.body.appendChild(wrap);
    try {
      const canvas = await html2canvas(wrap.firstElementChild, {
        backgroundColor: '#0A0A1A',
        scale: 2,
        useCORS: true
      });
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const stamp = state.now.toISOString().split('T')[0];
      a.download = `moaakit-luxor-${stamp}.png`;
      a.href = dataUrl;
      a.click();
      showToast('✅ تم تحميل الصورة بنجاح');
    } catch (e) {
      console.error('Image gen error:', e);
      showToast('❌ تعذر إنشاء الصورة، حاول مرة أخرى');
    } finally {
      wrap.remove();
    }
  }

  // ---------------------------------------------------------------
  //  TOAST
  // ---------------------------------------------------------------
  let toastTimer = null;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }

  // ---------------------------------------------------------------
  //  EVENT WIRING
  // ---------------------------------------------------------------
  function wireEvents() {
    // Edit name
    document.getElementById('editNameBtn').addEventListener('click', () => {
      const inp = document.getElementById('customNameInput');
      inp.value = state.customName;
      openModal('editNameModal');
      setTimeout(() => inp.focus(), 100);
    });
    document.getElementById('saveNameBtn').addEventListener('click', () => {
      const v = document.getElementById('customNameInput').value.trim();
      if (v) {
        state.customName = v;
        localStorage.setItem(STORAGE_KEYS.customName, v);
        renderControls();
        showToast('✅ تم تحديث الاسم بنجاح');
      }
      closeModal('editNameModal');
    });

    // Close modal on overlay click & X
    document.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', () => closeModal(el.getAttribute('data-close')));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(m => closeModal(m.id));
      }
    });

    // Season toggle
    document.getElementById('toggleSeasonBtn').addEventListener('click', () => {
      state.isSummerTime = !state.isSummerTime;
      writeBool(STORAGE_KEYS.isSummerTime, state.isSummerTime);
      renderControls();
      renderNextPrayer();
      renderPrayerList();
      showToast(state.isSummerTime ? '☀️ تم التحويل للتوقيت الصيفي' : '❄️ تم التحويل للتوقيت الشتوي');
    });

    // Iqama toggle
    document.getElementById('toggleIqamaBtn').addEventListener('click', () => {
      state.showIqama = !state.showIqama;
      writeBool(STORAGE_KEYS.showIqama, state.showIqama);
      renderControls();
      renderPrayerList();
      showToast(state.showIqama ? '⏱️ تم إظهار الإقامة' : '⏱️ تم إخفاء الإقامة');
    });

    // Athan toggle
    document.getElementById('toggleAthanBtn').addEventListener('click', () => {
      state.athanEnabled = !state.athanEnabled;
      writeBool(STORAGE_KEYS.athanEnabled, state.athanEnabled);
      if (!state.athanEnabled) stopAthan();
      renderControls();
      showToast(state.athanEnabled ? '🔊 تم تشغيل صوت الأذان' : '🔇 تم إيقاف صوت الأذان');
    });

    // Month modal
    document.getElementById('openMonthBtn').addEventListener('click', () => {
      renderMonthPicker();
      renderMonthTable(state.selectedMonth);
      openModal('monthModal');
    });
    document.getElementById('monthSelect').addEventListener('change', e => {
      const m = parseInt(e.target.value, 10);
      state.selectedMonth = m;
      localStorage.setItem(STORAGE_KEYS.selectedMonth, String(m));
      renderMonthTable(m);
      renderPrayerList();
      renderNextPrayer();
    });

    // Download image
    document.getElementById('downloadImgBtn').addEventListener('click', downloadCardAsImage);

    // Stop athan
    document.getElementById('stopAthanBtn').addEventListener('click', stopAthan);

    // Enter key in name input
    document.getElementById('customNameInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('saveNameBtn').click();
    });
  }

  // ---------------------------------------------------------------
  //  MAIN TICK
  // ---------------------------------------------------------------
  function tick() {
    state.now = new Date();
    renderClock();
    // Re-render every second is fine for clock + countdown
    renderNextPrayer();
    renderPrayerList();
    checkAndTriggerAthan();
  }

  // ---------------------------------------------------------------
  //  SPLASH
  // ---------------------------------------------------------------
  function hideSplash() {
    const s = document.getElementById('splash');
    if (!s) return;
    s.classList.add('fade-out');
    setTimeout(() => {
      s.style.display = 'none';
      const app = document.getElementById('app');
      app.hidden = false;
      app.style.opacity = 0;
      requestAnimationFrame(() => { app.style.transition = 'opacity 0.6s ease'; app.style.opacity = 1; });
    }, 800);
  }

  // ---------------------------------------------------------------
  //  INIT
  // ---------------------------------------------------------------
  function init() {
    // Sync selected month to current month
    const currentMonth = new Date().getMonth() + 1;
    if (PrayerData.allMonthsTimes[currentMonth]) state.selectedMonth = currentMonth;

    // Set initial UI
    renderControls();
    renderClock();
    renderNextPrayer();
    renderPrayerList();

    // Events
    wireEvents();

    // Hide splash after 2.6s
    setTimeout(hideSplash, 2600);

    // Continuous tick
    setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();