/* =====================================================================
 *  مواقيت الصلاة - الأقصر — Web App
 *  Prayer Times Luxor — Full JS controller
 *  Author: عبد الرحمن ياسر الاسيوطي
 *  Tel/WhatsApp: 01064106070 (Intl: +201064106070)
 *
 *  Time model
 *  ----------
 *  - All times in prayer-data.js are stored in Egypt SUMMER time (UTC+3).
 *  - Every prayer is converted to an absolute instant (UTC ms) and then
 *    displayed in Luxor's wall-clock time (UTC+3 in summer, UTC+2 in winter).
 *  - The clock always shows LUXOR time (not the visitor's device time), so
 *    the countdown is correct even for visitors outside Egypt.
 *  - Summer/winter time is detected automatically from Egypt's DST law
 *    (starts last Friday of April 00:00, ends last Thursday of October 24:00).
 *    The user can still force a mode with the toggle button.
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
  //  CONSTANTS
  // ---------------------------------------------------------------
  const HOUR_MS = 3600000;
  const DAY_MS = 86400000;
  const DATA_OFFSET_HOURS = 3;      // prayer-data.js is stored in UTC+3 (summer time)
  const SUMMER_OFFSET_HOURS = 3;    // Egypt summer time  (EEST)
  const WINTER_OFFSET_HOURS = 2;    // Egypt standard time (EET)
  const OVERRIDE_MAX_AGE_MS = 200 * DAY_MS;
  const DEFAULT_NAME = 'عبد الرحمن ياسر الاسيوطي';

  const STORAGE_KEYS = {
    customName: 'lux_customName',
    isSummerTime: 'lux_isSummerTime',
    seasonSetAt: 'lux_seasonSetAt',
    showIqama: 'lux_showIqama'
  };

  // ---------------------------------------------------------------
  //  SAFE STORAGE (localStorage may be unavailable in private mode)
  // ---------------------------------------------------------------
  const storage = {
    get(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } },
    set(key, val) { try { window.localStorage.setItem(key, String(val)); } catch (e) { /* ignore */ } },
    remove(key) { try { window.localStorage.removeItem(key); } catch (e) { /* ignore */ } }
  };

  function readBool(key, fallback) {
    const v = storage.get(key);
    if (v === null) return fallback;
    return v === 'true';
  }

  // ---------------------------------------------------------------
  //  EGYPT DAYLIGHT SAVING TIME RULES
  //  Summer time starts on the last Friday of April at 00:00 local (EET)
  //  and ends on the last Thursday of October at 24:00 local (EEST).
  // ---------------------------------------------------------------
  function lastWeekdayOfMonth(year, monthIdx, weekday) {
    const last = new Date(Date.UTC(year, monthIdx + 1, 0));
    const diff = (last.getUTCDay() - weekday + 7) % 7;
    return last.getUTCDate() - diff;
  }

  function egyptDstBounds(year) {
    const startDay = lastWeekdayOfMonth(year, 3, 5);  // last Friday of April
    const endDay = lastWeekdayOfMonth(year, 9, 4);    // last Thursday of October
    return {
      start: Date.UTC(year, 3, startDay, 0, 0) - WINTER_OFFSET_HOURS * HOUR_MS,  // 00:00 EET
      end: Date.UTC(year, 9, endDay, 24, 0) - SUMMER_OFFSET_HOURS * HOUR_MS      // 24:00 EEST
    };
  }

  /** Is Egypt on summer time at this absolute instant? */
  function isEgyptSummerTime(date) {
    const t = date.getTime();
    const { start, end } = egyptDstBounds(new Date(t).getUTCFullYear());
    return t >= start && t < end;
  }

  /** Is a given Luxor calendar day (year, month 1-12, day) in summer time? */
  function isSummerForDay(year, month, day) {
    return isEgyptSummerTime(new Date(Date.UTC(year, month - 1, day, 12, 0)));
  }

  function offsetHours(summer) { return summer ? SUMMER_OFFSET_HOURS : WINTER_OFFSET_HOURS; }

  // ---------------------------------------------------------------
  //  STATE
  // ---------------------------------------------------------------
  const state = {
    realNow: new Date(),       // real instant
    now: null,                 // Luxor wall clock (read with getUTC* helpers below)
    seasonOverride: null,      // null = automatic, true/false = forced by the user
    isSummerTime: true,        // effective mode
    showIqama: readBool(STORAGE_KEYS.showIqama, true),
    customName: storage.get(STORAGE_KEYS.customName) || DEFAULT_NAME,
    tableMonth: new Date().getMonth() + 1,
    lastTriggeredKey: '',
    listSignature: '',
    npIconKey: '',
    dateSignature: ''
  };

  /** Luxor wall-clock date for an instant. Components are read with getUTC*(). */
  function wallClock(instant, summer) {
    return new Date(instant + offsetHours(summer) * HOUR_MS);
  }
  const W = {
    year: d => d.getUTCFullYear(),
    month: d => d.getUTCMonth() + 1,
    day: d => d.getUTCDate(),
    hours: d => d.getUTCHours(),
    minutes: d => d.getUTCMinutes(),
    seconds: d => d.getUTCSeconds()
  };

  function effectiveSeason(realDate) {
    if (state.seasonOverride !== null) return state.seasonOverride;
    return isEgyptSummerTime(realDate);
  }

  function seasonForDay(year, month, day) {
    if (state.seasonOverride !== null) return state.seasonOverride;
    return isSummerForDay(year, month, day);
  }

  /** Refresh realNow / now / isSummerTime. Returns true when the season flipped. */
  function syncClock() {
    state.realNow = new Date();
    const summer = effectiveSeason(state.realNow);
    const flipped = summer !== state.isSummerTime;
    state.isSummerTime = summer;
    state.now = wallClock(state.realNow.getTime(), summer);
    return flipped;
  }

  function loadSeasonOverride() {
    const stored = storage.get(STORAGE_KEYS.isSummerTime);
    if (stored === null) return null;
    const setAt = parseInt(storage.get(STORAGE_KEYS.seasonSetAt), 10);
    const nowMs = Date.now();
    const value = stored === 'true';
    const auto = isEgyptSummerTime(new Date(nowMs));
    const stale =
      !Number.isFinite(setAt) ||                              // legacy value without timestamp
      nowMs - setAt > OVERRIDE_MAX_AGE_MS ||                  // very old choice
      isEgyptSummerTime(new Date(setAt)) !== auto ||          // a DST transition happened since
      value === auto;                                         // override equals automatic mode
    if (stale) {
      clearSeasonOverride();
      return null;
    }
    return value;
  }

  function clearSeasonOverride() {
    storage.remove(STORAGE_KEYS.isSummerTime);
    storage.remove(STORAGE_KEYS.seasonSetAt);
  }

  // ---------------------------------------------------------------
  //  HELPERS
  // ---------------------------------------------------------------
  function pad2(n) { return String(n).padStart(2, '0'); }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function format12(time24) {
    if (!time24 || !time24.includes(':')) return time24;
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'م' : 'ص';
    let hh = h % 12;
    if (hh === 0) hh = 12;
    return `${hh}:${pad2(m)} ${period}`;
  }

  /** Format duration (seconds → HH:MM:SS) */
  function formatDuration(totalSeconds) {
    if (totalSeconds < 0) totalSeconds = 0;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  }

  function isLeapYear(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }

  function daysInMonth(year, month) {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  }

  /** Data row for a month/day (with graceful fallbacks). */
  function getRow(month, day) {
    const list = PrayerData.allMonthsTimes[month] || PrayerData.allMonthsTimes[9] || [];
    return list.find(d => d.day === day) || list[Math.min(day, list.length) - 1] || list[0];
  }

  /**
   * Build the full prayer schedule for a Luxor calendar day.
   * Each entry has an absolute `instant` (UTC ms) plus display strings
   * in the wall-clock mode (`summer`) that applies to that day.
   */
  function getSchedule(year, month, day, summer) {
    const row = getRow(month, day);
    if (!row) return [];
    return PrayerData.prayerMeta.map(meta => {
      const [h, mi] = row[meta.key].split(':').map(Number);
      const instant = Date.UTC(year, month - 1, day, h, mi) - DATA_OFFSET_HOURS * HOUR_MS;
      const wall = wallClock(instant, summer);
      const time24 = `${pad2(W.hours(wall))}:${pad2(W.minutes(wall))}`;
      const iqamaMins = PrayerData.iqamaMinutes[meta.key] || 0;
      let iqama12 = '';
      if (iqamaMins > 0) {
        const iq = wallClock(instant + iqamaMins * 60000, summer);
        iqama12 = format12(`${pad2(W.hours(iq))}:${pad2(W.minutes(iq))}`);
      }
      return {
        key: meta.key,
        name: meta.name,
        instant,
        time24,
        time12: format12(time24),
        iqama12
      };
    });
  }

  function shiftDay(year, month, day, deltaDays) {
    const d = new Date(Date.UTC(year, month - 1, day) + deltaDays * DAY_MS);
    return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
  }

  function getTodaySchedule() {
    const n = state.now;
    return getSchedule(W.year(n), W.month(n), W.day(n), state.isSummerTime);
  }

  function getAdjacentSchedule(deltaDays) {
    const n = state.now;
    const d = shiftDay(W.year(n), W.month(n), W.day(n), deltaDays);
    return getSchedule(d.year, d.month, d.day, seasonForDay(d.year, d.month, d.day));
  }

  /** Get next prayer info (plus the previous prayer instant for the progress bar). */
  function getNextPrayerInfo() {
    const nowMs = state.realNow.getTime();
    const today = getTodaySchedule();

    for (let i = 0; i < today.length; i++) {
      const p = today[i];
      if (p.instant > nowMs) {
        let prevInstant;
        if (i > 0) {
          prevInstant = today[i - 1].instant;
        } else {
          const yesterday = getAdjacentSchedule(-1);
          prevInstant = yesterday.length ? yesterday[yesterday.length - 1].instant : p.instant - 8 * HOUR_MS;
        }
        return {
          key: p.key,
          name: p.name,
          time24: p.time24,
          time12: p.time12,
          instant: p.instant,
          prevInstant,
          remainingSeconds: Math.max(0, Math.ceil((p.instant - nowMs) / 1000)),
          isTomorrow: false
        };
      }
    }

    // All of today's prayers have passed → tomorrow's Fajr
    const tomorrow = getAdjacentSchedule(1);
    const tf = tomorrow[0];
    const lastToday = today.length ? today[today.length - 1].instant : nowMs;
    return {
      key: 'fajr',
      name: 'صلاة الفجر (غداً)',
      time24: tf.time24,
      time12: tf.time12,
      instant: tf.instant,
      prevInstant: lastToday,
      remainingSeconds: Math.max(0, Math.ceil((tf.instant - nowMs) / 1000)),
      isTomorrow: true
    };
  }

  // ---------------------------------------------------------------
  //  DATE FORMATTERS (created once — Intl objects are expensive)
  // ---------------------------------------------------------------
  let gregFormatter = null;
  let hijriFormatter = null;
  try {
    gregFormatter = new Intl.DateTimeFormat('ar-EG', {
      timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch (e) { gregFormatter = null; }
  try {
    hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch (e) { hijriFormatter = null; }

  /** Hijri date (Umm Al-Qura) for a Luxor wall-clock date */
  function toHijri(wallDate) {
    if (!hijriFormatter) return '';
    try { return hijriFormatter.format(wallDate); } catch (e) { return ''; }
  }

  /** Arabic gregorian date for a Luxor wall-clock date */
  function toArabicGregorian(wallDate) {
    if (gregFormatter) {
      try { return gregFormatter.format(wallDate); } catch (e) { /* fall through */ }
    }
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return `${days[wallDate.getUTCDay()]} ${W.day(wallDate)}/${W.month(wallDate)}/${W.year(wallDate)}`;
  }

  // ---------------------------------------------------------------
  //  RENDER — Clock
  // ---------------------------------------------------------------
  function renderClock() {
    const n = state.now;
    // 12-hour clock (ص / م) — same convention as every other time on the page
    const h24 = W.hours(n);
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    const period = h24 >= 12 ? 'م' : 'ص';
    document.querySelectorAll('.clock__h').forEach(el => setNodeText(el, String(h12)));
    document.querySelectorAll('.clock__m').forEach(el => setNodeText(el, pad2(W.minutes(n))));
    document.querySelectorAll('.clock__s').forEach(el => setNodeText(el, pad2(W.seconds(n))));
    document.querySelectorAll('.clock__period').forEach(el => setNodeText(el, period));
    const clockEl = document.getElementById('clock');
    if (clockEl) {
      const label = `الساعة الآن ${h12}:${pad2(W.minutes(n))} ${period} بتوقيت الأقصر`;
      if (clockEl.getAttribute('aria-label') !== label) clockEl.setAttribute('aria-label', label);
    }

    // Dates only change once a day
    const sig = `${W.year(n)}-${W.month(n)}-${W.day(n)}`;
    if (sig !== state.dateSignature) {
      state.dateSignature = sig;
      const g = document.getElementById('gregorianDate');
      if (g) g.textContent = toArabicGregorian(n);
      const h = document.getElementById('hijriDate');
      if (h) h.textContent = toHijri(n) || '';
      const yearEl = document.getElementById('year');
      if (yearEl) yearEl.textContent = W.year(n);
    }
  }

  // ---------------------------------------------------------------
  //  RENDER — Next Prayer
  // ---------------------------------------------------------------
  function renderNextPrayer() {
    const np = getNextPrayerInfo();
    const iconEl = document.getElementById('npIcon');
    if (iconEl && state.npIconKey !== np.key) {
      iconEl.innerHTML = ICONS[np.key] || ICONS.fajr;
      state.npIconKey = np.key;
    }
    setText('npName', np.name);
    setText('npTime', np.time12);
    setText('npCountdown', formatDuration(np.remainingSeconds));

    // Progress between the previous prayer and the next one
    const interval = np.instant - np.prevInstant;
    const elapsed = state.realNow.getTime() - np.prevInstant;
    const progress = interval > 0 ? Math.max(0, Math.min(100, (elapsed / interval) * 100)) : 0;
    const bar = document.getElementById('npProgress');
    if (bar) bar.style.width = `${progress.toFixed(2)}%`;

    return np;
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && el.textContent !== text) el.textContent = text;
  }

  function setNodeText(el, text) {
    if (el && el.textContent !== text) el.textContent = text;
  }

  // ---------------------------------------------------------------
  //  RENDER — Prayer list
  //  The DOM is built once per day/mode and only updated every second
  //  (avoids re-creating the whole list 60 times a minute).
  // ---------------------------------------------------------------
  function renderPrayerList() {
    const container = document.getElementById('prayerList');
    if (!container) return;

    const today = getTodaySchedule();
    const np = getNextPrayerInfo();
    const n = state.now;
    const signature = [W.year(n), W.month(n), W.day(n), state.isSummerTime, state.showIqama].join('|');

    if (signature !== state.listSignature) {
      state.listSignature = signature;
      container.innerHTML = '';
      today.forEach(p => {
        const item = document.createElement('div');
        item.className = 'prayer-item';
        item.dataset.key = p.key;
        item.innerHTML = `
          <div class="prayer-item__icon">${ICONS[p.key] || ''}</div>
          <div class="prayer-item__info">
            <div class="prayer-item__name">${p.name}</div>
            ${state.showIqama && p.iqama12 ? `<div class="prayer-item__iqama">إقامة: ${p.iqama12}</div>` : ''}
          </div>
          <div class="prayer-item__time">${p.time12}</div>
          <span class="prayer-item__countdown-tag"></span>
        `;
        container.appendChild(item);
      });
    }

    const nowMs = state.realNow.getTime();
    today.forEach(p => {
      const item = container.querySelector(`.prayer-item[data-key="${p.key}"]`);
      if (!item) return;
      const past = p.instant <= nowMs;
      const isNext = !np.isTomorrow && p.key === np.key;
      item.classList.toggle('prayer-item--past', past);
      item.classList.toggle('prayer-item--next', isNext);
      const tag = item.querySelector('.prayer-item__countdown-tag');
      if (tag) {
        const text = isNext ? `متبقي ${formatDuration(np.remainingSeconds)}` : '';
        if (tag.textContent !== text) tag.textContent = text;
      }
    });
  }

  // ---------------------------------------------------------------
  //  CONTROLS
  // ---------------------------------------------------------------
  function renderControls() {
    // Season toggle
    const seasonIcon = document.getElementById('seasonIcon');
    if (seasonIcon) seasonIcon.innerHTML = state.isSummerTime ? ICONS.sun : ICONS.snowflake;
    setText('seasonLabel', state.isSummerTime ? 'التوقيت الصيفي' : 'التوقيت الشتوي');
    const seasonBtn = document.getElementById('toggleSeasonBtn');
    if (seasonBtn) {
      seasonBtn.classList.toggle('ctrl-btn--active', state.isSummerTime);
      seasonBtn.title = state.seasonOverride === null
        ? 'تبديل التوقيت الصيفي/الشتوي (يتم تحديده تلقائياً)'
        : 'تبديل التوقيت الصيفي/الشتوي (تم تثبيته يدوياً)';
    }

    // Iqama toggle
    setText('iqamaLabel', state.showIqama ? 'إخفاء الإقامة' : 'إظهار الإقامة');
    const iqamaBtn = document.getElementById('toggleIqamaBtn');
    if (iqamaBtn) iqamaBtn.classList.toggle('ctrl-btn--active', state.showIqama);

    // Custom name
    setText('customName', state.customName);
  }

  // ---------------------------------------------------------------
  //  SILENT PRAYER REMINDER (No audio playback)
  //  Fires within the first minute after a prayer time, even if the
  //  browser throttled our timer while the tab was in the background.
  // ---------------------------------------------------------------
  function checkAndTriggerPrayerReminder() {
    const nowMs = state.realNow.getTime();
    const n = state.now;
    const today = getTodaySchedule();
    for (const p of today) {
      if (p.key === 'sunrise') continue;
      if (nowMs >= p.instant && nowMs - p.instant < 60000) {
        const token = `${W.year(n)}_${W.month(n)}_${W.day(n)}_${p.key}`;
        if (state.lastTriggeredKey !== token) {
          state.lastTriggeredKey = token;
          showPrayerReminder(p.name, p.key, p.time12);
        }
      }
    }
  }

  function showPrayerReminder(name, key, time12) {
    const circle = document.getElementById('reminderModalIconCircle');
    if (circle) circle.innerHTML = ICONS[key] || ICONS.mosque;
    setText('reminderModalName', name);
    setText('reminderModalTime', time12);
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
    if (!document.querySelector('.modal.open')) document.body.style.overflow = '';
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
      if (m === state.tableMonth) opt.selected = true;
      sel.appendChild(opt);
    }
  }

  function renderMonthTable(month) {
    const body = document.getElementById('monthTableBody');
    if (!body) return;
    body.innerHTML = '';

    const n = state.now;
    const year = W.year(n);
    const todayMonth = W.month(n);
    const todayDay = W.day(n);
    const maxDay = daysInMonth(year, month);
    const list = (PrayerData.allMonthsTimes[month] || []).filter(d => d.day >= 1 && d.day <= maxDay);

    let summerDays = 0;
    let winterDays = 0;
    let transitionDay = null;
    let prevSummer = null;

    list.forEach(dayRow => {
      const summer = seasonForDay(year, month, dayRow.day);
      if (summer) summerDays++; else winterDays++;
      if (prevSummer !== null && prevSummer !== summer) transitionDay = dayRow.day;
      prevSummer = summer;

      const sched = getSchedule(year, month, dayRow.day, summer);
      const byKey = {};
      sched.forEach(p => { byKey[p.key] = p.time12; });

      const tr = document.createElement('tr');
      if (month === todayMonth && dayRow.day === todayDay) tr.classList.add('today');
      tr.classList.add(summer ? 'season-summer' : 'season-winter');
      tr.innerHTML = `
        <td class="day-cell">${dayRow.day}</td>
        <td>${byKey.fajr || '—'}</td>
        <td>${byKey.sunrise || '—'}</td>
        <td>${byKey.dhuhr || '—'}</td>
        <td>${byKey.asr || '—'}</td>
        <td>${byKey.maghrib || '—'}</td>
        <td>${byKey.isha || '—'}</td>
      `;
      body.appendChild(tr);
    });

    // Explanatory note under the picker
    const note = document.getElementById('monthNote');
    if (note) {
      const monthName = PrayerData.monthNames[month];
      let text;
      if (state.seasonOverride !== null) {
        text = `الأوقات معروضة حسب ${state.seasonOverride ? 'التوقيت الصيفي' : 'التوقيت الشتوي'} (تم تثبيته يدوياً من زر التوقيت).`;
      } else if (transitionDay && summerDays && winterDays) {
        const toSummer = seasonForDay(year, month, transitionDay);
        text = toSummer
          ? `يبدأ التوقيت الصيفي (+ ساعة) من يوم ${transitionDay} ${monthName} ${year}؛ الأيام السابقة بالتوقيت الشتوي.`
          : `يبدأ التوقيت الشتوي (- ساعة) من يوم ${transitionDay} ${monthName} ${year}؛ الأيام السابقة بالتوقيت الصيفي.`;
      } else {
        text = `الأوقات معروضة حسب ${summerDays ? 'التوقيت الصيفي' : 'التوقيت الشتوي'} لشهر ${monthName} ${year}.`;
      }
      note.textContent = text;
    }
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

    // Make sure the web fonts are ready so the card renders with them
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (e) { /* ignore */ }
    }

    const today = getTodaySchedule();
    const n = state.now;
    const safeName = escapeHtml(state.customName);
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
          ${safeName}
        </p>
        <p style="margin:0 0 20px; color:rgba(255,255,255,0.7); font-size:14px; font-weight:500;">
          ${toArabicGregorian(n)} • ${toHijri(n)}
        </p>
        <table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:18px;">
          ${today.map(p => `
            <tr style="border-bottom:1px solid rgba(255,215,0,0.18);">
              <td style="padding:14px 12px; text-align:right; color:#FFFFFF; font-family:'Amiri',serif; font-size:22px; font-weight:700;">
                ${p.name}
              </td>
              <td style="padding:14px 12px; text-align:left; color:#FFE082; font-weight:700; font-family:'Cairo',sans-serif; font-size:20px; direction:ltr;">
                ${p.time12}
              </td>
            </tr>
          `).join('')}
        </table>
        <p style="margin-top:18px; color:rgba(255,255,255,0.55); font-size:12px; font-weight:600;">
          ${state.isSummerTime ? 'بالتوقيت الصيفي' : 'بالتوقيت الشتوي'} • بتوقيت محافظة الأقصر
        </p>
        <p style="margin-top:8px; color:rgba(255,255,255,0.6); font-size:13px; font-weight:600;">
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
      const stamp = `${W.year(n)}-${pad2(W.month(n))}-${pad2(W.day(n))}`;
      const fileName = `moaakit-luxor-${stamp}.png`;
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('toBlob failed');

      // On iOS the download attribute is unreliable → use the native share sheet
      const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      if (isIOS && navigator.share && navigator.canShare) {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: 'مواقيت الصلاة - الأقصر' });
            showToast('تم تجهيز كارت المواقيت');
            return;
          } catch (e) {
            if (e && e.name === 'AbortError') return; // user cancelled
          }
        }
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = fileName;
      a.href = url;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
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
  //  FULL REFRESH (after settings change)
  // ---------------------------------------------------------------
  function refreshAll() {
    syncClock();
    state.listSignature = '';
    state.dateSignature = '';
    renderControls();
    renderClock();
    renderNextPrayer();
    renderPrayerList();
    const monthModal = document.getElementById('monthModal');
    if (monthModal && monthModal.classList.contains('open')) renderMonthTable(state.tableMonth);
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
        if (inp) inp.value = state.customName;
        openModal('editNameModal');
        setTimeout(() => inp && inp.focus(), 100);
      });
    }

    const saveNameBtn = document.getElementById('saveNameBtn');
    if (saveNameBtn) {
      saveNameBtn.addEventListener('click', () => {
        const inp = document.getElementById('customNameInput');
        const v = inp ? inp.value.trim().slice(0, 50) : '';
        if (v) {
          state.customName = v;
          storage.set(STORAGE_KEYS.customName, v);
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

    // Season toggle (manual override of the automatic detection)
    const toggleSeasonBtn = document.getElementById('toggleSeasonBtn');
    if (toggleSeasonBtn) {
      toggleSeasonBtn.addEventListener('click', () => {
        const auto = isEgyptSummerTime(new Date());
        const next = !state.isSummerTime;
        if (next === auto) {
          state.seasonOverride = null;      // back to automatic mode
          clearSeasonOverride();
        } else {
          state.seasonOverride = next;
          storage.set(STORAGE_KEYS.isSummerTime, next);
          storage.set(STORAGE_KEYS.seasonSetAt, Date.now());
        }
        refreshAll();
        showToast(
          (next ? 'تم التحويل إلى التوقيت الصيفي' : 'تم التحويل إلى التوقيت الشتوي') +
          (state.seasonOverride === null ? ' (تلقائي)' : '')
        );
      });
    }

    // Iqama toggle
    const toggleIqamaBtn = document.getElementById('toggleIqamaBtn');
    if (toggleIqamaBtn) {
      toggleIqamaBtn.addEventListener('click', () => {
        state.showIqama = !state.showIqama;
        storage.set(STORAGE_KEYS.showIqama, state.showIqama);
        state.listSignature = '';
        renderControls();
        renderPrayerList();
        showToast(state.showIqama ? 'تم إظهار أوقات الإقامة' : 'تم إخفاء أوقات الإقامة');
      });
    }

    // Month modal (the picker only affects the table, never the main page)
    const openMonthBtn = document.getElementById('openMonthBtn');
    if (openMonthBtn) {
      openMonthBtn.addEventListener('click', () => {
        state.tableMonth = W.month(state.now);
        renderMonthPicker();
        renderMonthTable(state.tableMonth);
        openModal('monthModal');
      });
    }

    const monthSelect = document.getElementById('monthSelect');
    if (monthSelect) {
      monthSelect.addEventListener('change', e => {
        const m = parseInt(e.target.value, 10);
        if (!PrayerData.allMonthsTimes[m]) return;
        state.tableMonth = m;
        renderMonthTable(m);
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
        if (e.key === 'Enter') {
          const btn = document.getElementById('saveNameBtn');
          if (btn) btn.click();
        }
      });
    }

    // Catch up immediately when the tab becomes visible again
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') tick();
    });
  }

  // ---------------------------------------------------------------
  //  MAIN TICK
  // ---------------------------------------------------------------
  function tick() {
    const flipped = syncClock();
    if (flipped) {
      // Automatic DST transition happened while the page was open
      state.listSignature = '';
      renderControls();
    }
    renderClock();
    renderNextPrayer();
    renderPrayerList();
    checkAndTriggerPrayerReminder();
  }

  // ---------------------------------------------------------------
  //  INIT
  // ---------------------------------------------------------------
  function init() {
    if (typeof PrayerData === 'undefined' || !PrayerData.allMonthsTimes) {
      console.error('PrayerData is missing — prayer-data.js did not load.');
      showToast('تعذر تحميل بيانات المواقيت، أعد تحميل الصفحة');
      return;
    }
    state.seasonOverride = loadSeasonOverride();
    syncClock();
    state.tableMonth = W.month(state.now);

    // Set initial UI
    renderControls();
    renderClock();
    renderNextPrayer();
    renderPrayerList();
    checkAndTriggerPrayerReminder();

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
