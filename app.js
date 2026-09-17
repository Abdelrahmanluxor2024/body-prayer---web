/* =====================================================================
 *  مواقيت الصلاة - الأقصر — Web App
 *  Prayer Times Luxor — Full JS controller
 *  Author: عبد الرحمن ياسر الاسيوطي
 *  Tel/WhatsApp: 01064106070 (Intl: +201064106070)
 * ===================================================================== */

(function () {
  'use strict';

  // ---------------------------------------------------------------
  //  SVG ICONS (Crisp, modern, vector-sharp replacements for emojis)
  // ---------------------------------------------------------------
  const ICONS = {
    fajr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8A9 9 0 0 0 12 3z"/><polygon points="18 4 19 6.5 21.5 6.5 19.5 8 20.5 10.5 18 9 15.5 10.5 16.5 8 14.5 6.5 17 6.5 18 4" fill="currentColor" stroke="none"/></svg>`,
    sunrise: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>`,
    dhuhr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer"><circle cx="12" cy="12" r="5" fill="currentColor" fill-opacity="0.2"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>`,
    asr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer"><circle cx="10" cy="10" r="4.5" fill="currentColor" fill-opacity="0.2"/><line x1="10" y1="2" x2="10" y2="4.5"/><line x1="4.34" y1="4.34" x2="6.1" y2="6.1"/><line x1="2" y1="10" x2="4.5" y2="10"/><line x1="4.34" y1="15.66" x2="6.1" y2="13.9"/><line x1="15.66" y1="4.34" x2="13.9" y2="6.1"/><path d="M14 14l7 7M17 21h4v-4"/></svg>`,
    maghrib: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><polyline points="8 5 12 9 16 5"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/></svg>`,
    isha: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" fill-opacity="0.2"/><circle cx="19" cy="5" r="1.2" fill="currentColor"/><circle cx="14" cy="3" r="0.9" fill="currentColor"/><circle cx="21" cy="9" r="0.9" fill="currentColor"/></svg>`,
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-ctrl-icon"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="6.34" y1="17.66" x2="4.93" y2="19.07"/><line x1="19.07" y1="4.93" x2="17.66" y2="6.34"/></svg>`,
    snowflake: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-ctrl-icon"><line x1="12" y1="2" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"/><polyline points="10 4 12 2 14 4"/><polyline points="10 20 12 22 14 20"/><polyline points="4 10 2 12 4 14"/><polyline points="20 10 22 12 20 14"/></svg>`,
    mosque: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="svg-mosque"><path d="M12 3c-1.5 2-3.5 3.5-3.5 6.5A3.5 3.5 0 0 0 12 13a3.5 3.5 0 0 0 3.5-3.5C15.5 6.5 13.5 5 12 3z"/><path d="M4 10v10M20 10v10M2 20h20"/><path d="M4 10l2-2 2 2M16 10l2-2 2 2"/><path d="M9 20v-5a3 3 0 0 1 6 0v5"/></svg>`
  };

  // ---------------------------------------------------------------
  //  STATE
  // ---------------------------------------------------------------
  const STORAGE_KEYS = {
    customName: 'lux_customName',
    isSummerTime: 'lux_isSummerTime',
    showIqama: 'lux_showIqama',
    selectedMonth: 'lux_selectedMonth'
  };

  const state = {
    now: new Date(),
    isSummerTime: readBool(STORAGE_KEYS.isSummerTime, true),
    showIqama: readBool(STORAGE_KEYS.showIqama, true),
    customName: localStorage.getItem(STORAGE_KEYS.customName) || 'عبد الرحمن ياسر الاسيوطي',
    selectedMonth: parseInt(localStorage.getItem(STORAGE_KEYS.selectedMonth), 10) || (new Date().getMonth() + 1),
    lastTriggeredKey: ''
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
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = n.getFullYear();
  }

  // ---------------------------------------------------------------
  //  RENDER — Next Prayer
  // ---------------------------------------------------------------
  function renderNextPrayer() {
    const np = getNextPrayerInfo();
    const iconEl = document.getElementById('npIcon');
    if (iconEl) iconEl.innerHTML = ICONS[np.key] || ICONS.fajr;
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
    if (!container) return;
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
        <div class="prayer-item__icon">${ICONS[meta.key] || ''}</div>
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
    const seasonIcon = document.getElementById('seasonIcon');
    if (seasonIcon) seasonIcon.innerHTML = state.isSummerTime ? ICONS.sun : ICONS.snowflake;
    document.getElementById('seasonLabel').textContent = state.isSummerTime ? 'التوقيت الصيفي' : 'التوقيت الشتوي';
    const seasonBtn = document.getElementById('toggleSeasonBtn');
    if (seasonBtn) seasonBtn.classList.toggle('ctrl-btn--active', state.isSummerTime);

    // Iqama toggle
    document.getElementById('iqamaLabel').textContent = state.showIqama ? 'إخفاء الإقامة' : 'إظهار الإقامة';
    const iqamaBtn = document.getElementById('toggleIqamaBtn');
    if (iqamaBtn) iqamaBtn.classList.toggle('ctrl-btn--active', state.showIqama);

    // Custom name
    document.getElementById('customName').textContent = state.customName;
    const splashNameText = document.getElementById('splashNameText');
    if (splashNameText) splashNameText.textContent = state.customName;
  }

  // ---------------------------------------------------------------
  //  SILENT PRAYER REMINDER (No audio playback)
  // ---------------------------------------------------------------
  function checkAndTriggerPrayerReminder() {
    const today = getTodayData();
    const n = state.now;
    const hh = n.getHours();
    const mm = n.getMinutes();
    const ss = n.getSeconds();

    for (const meta of PrayerData.prayerMeta) {
      if (meta.key === 'sunrise') continue;
      const t = adjustTime(meta.key, today[meta.key]);
      const [ph, pm] = t.split(':').map(Number);
      if (hh === ph && mm === pm && ss <= 2) {
        const token = `${n.getMonth() + 1}_${n.getDate()}_${meta.key}`;
        if (state.lastTriggeredKey !== token) {
          state.lastTriggeredKey = token;
          showPrayerReminder(meta.name, meta.key, format12(t));
        }
      }
    }
  }

  function showPrayerReminder(name, key, time12) {
    const circle = document.getElementById('reminderModalIconCircle');
    if (circle) circle.innerHTML = ICONS[key] || ICONS.mosque;
    const nameEl = document.getElementById('reminderModalName');
    if (nameEl) nameEl.textContent = name;
    const timeEl = document.getElementById('reminderModalTime');
    if (timeEl) timeEl.textContent = time12;
    openModal('prayerReminderModal');
    showToast(`حان الآن موعد ${name}`);
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

  // ---------------------------------------------------------------
  //  MONTH TABLE
  // ---------------------------------------------------------------
  function renderMonthPicker() {
    const sel = document.getElementById('monthSelect');
    if (!sel) return;
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
    if (!body) return;
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
  //  DOWNLOAD AS IMAGE (Clean, high-end typography, zero emojis)
  // ---------------------------------------------------------------
  async function downloadCardAsImage() {
    if (typeof html2canvas === 'undefined') {
      showToast('مكتبة الصور قيد التحميل، حاول بعد لحظة');
      return;
    }
    showToast('جاري تجهيز الصورة بدقة فائقة...');

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
      <div style="text-align:center; padding:28px 24px; border:2px solid #FFD700; border-radius:24px; background:linear-gradient(145deg,#1C1535,#0D0B1C); box-shadow:0 12px 40px rgba(0,0,0,0.6);">
        <h1 style="margin:0; font-family:'Amiri',serif; color:#FFD700; font-size:36px; font-weight:700; text-shadow:0 0 14px rgba(255,215,0,0.45);">
          مواقيت الصلاة - الأقصر
        </h1>
        <p style="margin:8px 0 6px; color:#FFE082; font-size:18px; font-weight:700;">
          ${state.customName}
        </p>
        <p style="margin:0 0 20px; color:rgba(255,255,255,0.7); font-size:14px; font-weight:500;">
          ${toArabicGregorian(state.now)} • ${toHijri(state.now)}
        </p>
        <table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:18px;">
          ${PrayerData.prayerMeta.map(m => `
            <tr style="border-bottom:1px solid rgba(255,215,0,0.18);">
              <td style="padding:14px 12px; text-align:right; color:#FFFFFF; font-family:'Amiri',serif; font-size:22px; font-weight:700;">
                ${m.name}
              </td>
              <td style="padding:14px 12px; text-align:left; color:#FFE082; font-weight:700; font-family:'Cairo',sans-serif; font-size:20px; direction:ltr;">
                ${format12(adjustTime(m.key, today[m.key]))}
              </td>
            </tr>
          `).join('')}
        </table>
        <p style="margin-top:24px; color:rgba(255,255,255,0.6); font-size:13px; font-weight:600;">
          محافظة الأقصر • تطوير: عبد الرحمن ياسر الاسيوطي • 01064106070
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
      showToast('تم تحميل كارت المواقيت بنجاح');
    } catch (e) {
      console.error('Image gen error:', e);
      showToast('تعذر إنشاء الصورة، حاول مرة أخرى');
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
    if (!t) return;
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
    const editBtn = document.getElementById('editNameBtn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const inp = document.getElementById('customNameInput');
        inp.value = state.customName;
        openModal('editNameModal');
        setTimeout(() => inp.focus(), 100);
      });
    }

    const saveNameBtn = document.getElementById('saveNameBtn');
    if (saveNameBtn) {
      saveNameBtn.addEventListener('click', () => {
        const v = document.getElementById('customNameInput').value.trim();
        if (v) {
          state.customName = v;
          localStorage.setItem(STORAGE_KEYS.customName, v);
          renderControls();
          showToast('تم حفظ وتحديث الاسم بنجاح');
        }
        closeModal('editNameModal');
      });
    }

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
    const toggleSeasonBtn = document.getElementById('toggleSeasonBtn');
    if (toggleSeasonBtn) {
      toggleSeasonBtn.addEventListener('click', () => {
        state.isSummerTime = !state.isSummerTime;
        writeBool(STORAGE_KEYS.isSummerTime, state.isSummerTime);
        renderControls();
        renderNextPrayer();
        renderPrayerList();
        showToast(state.isSummerTime ? 'تم التحويل إلى التوقيت الصيفي' : 'تم التحويل إلى التوقيت الشتوي');
      });
    }

    // Iqama toggle
    const toggleIqamaBtn = document.getElementById('toggleIqamaBtn');
    if (toggleIqamaBtn) {
      toggleIqamaBtn.addEventListener('click', () => {
        state.showIqama = !state.showIqama;
        writeBool(STORAGE_KEYS.showIqama, state.showIqama);
        renderControls();
        renderPrayerList();
        showToast(state.showIqama ? 'تم إظهار أوقات الإقامة' : 'تم إخفاء أوقات الإقامة');
      });
    }

    // Month modal
    const openMonthBtn = document.getElementById('openMonthBtn');
    if (openMonthBtn) {
      openMonthBtn.addEventListener('click', () => {
        renderMonthPicker();
        renderMonthTable(state.selectedMonth);
        openModal('monthModal');
      });
    }

    const monthSelect = document.getElementById('monthSelect');
    if (monthSelect) {
      monthSelect.addEventListener('change', e => {
        const m = parseInt(e.target.value, 10);
        state.selectedMonth = m;
        localStorage.setItem(STORAGE_KEYS.selectedMonth, String(m));
        renderMonthTable(m);
        renderPrayerList();
        renderNextPrayer();
      });
    }

    // Download image
    const downloadImgBtn = document.getElementById('downloadImgBtn');
    if (downloadImgBtn) {
      downloadImgBtn.addEventListener('click', downloadCardAsImage);
    }

    // Enter key in name input
    const nameInput = document.getElementById('customNameInput');
    if (nameInput) {
      nameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('saveNameBtn').click();
      });
    }
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
    checkAndTriggerPrayerReminder();
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

    // Continuous tick
    setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();