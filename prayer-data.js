/* =====================================================================
 *  مواقيت الصلاة - الأقصر
 *  Prayer Times Luxor — All 12 Months Data
 *  Author: عبد الرحمن ياسر الاسيوطي
 *  Tel/WhatsApp: 01064106070 (Intl: +201064106070)
 *  Note: All times are in 24-hour format (HH:MM).
 *  Default base = Summer Time (التوقيت الصيفي). The app applies a -1h
 *  offset to most prayers when the user toggles "التوقيت الشتوي".
 * ===================================================================== */

const PrayerData = (function () {
  'use strict';

  // ---------------- January ----------------
  const januaryTimes = [
    {"day":1,"fajr":"06:13","sunrise":"07:41","dhuhr":"13:09","asr":"15:57","maghrib":"18:15","isha":"19:34"},
    {"day":2,"fajr":"06:13","sunrise":"07:41","dhuhr":"13:10","asr":"15:58","maghrib":"18:16","isha":"19:35"},
    {"day":3,"fajr":"06:14","sunrise":"07:42","dhuhr":"13:10","asr":"15:59","maghrib":"18:17","isha":"19:36"},
    {"day":4,"fajr":"06:14","sunrise":"07:42","dhuhr":"13:10","asr":"15:59","maghrib":"18:18","isha":"19:37"},
    {"day":5,"fajr":"06:15","sunrise":"07:43","dhuhr":"13:10","asr":"16:00","maghrib":"18:19","isha":"19:38"},
    {"day":6,"fajr":"06:15","sunrise":"07:43","dhuhr":"13:10","asr":"16:00","maghrib":"18:19","isha":"19:38"},
    {"day":7,"fajr":"06:15","sunrise":"07:43","dhuhr":"13:11","asr":"16:01","maghrib":"18:20","isha":"19:39"},
    {"day":8,"fajr":"06:15","sunrise":"07:43","dhuhr":"13:11","asr":"16:01","maghrib":"18:20","isha":"19:39"},
    {"day":9,"fajr":"06:15","sunrise":"07:43","dhuhr":"13:12","asr":"16:02","maghrib":"18:21","isha":"19:40"},
    {"day":10,"fajr":"06:15","sunrise":"07:43","dhuhr":"13:12","asr":"16:03","maghrib":"18:22","isha":"19:41"},
    {"day":11,"fajr":"06:15","sunrise":"07:43","dhuhr":"13:12","asr":"16:03","maghrib":"18:23","isha":"19:41"},
    {"day":12,"fajr":"06:16","sunrise":"07:43","dhuhr":"13:12","asr":"16:04","maghrib":"18:24","isha":"19:42"},
    {"day":13,"fajr":"06:16","sunrise":"07:43","dhuhr":"13:12","asr":"16:06","maghrib":"18:24","isha":"19:43"},
    {"day":14,"fajr":"06:16","sunrise":"07:43","dhuhr":"13:12","asr":"16:06","maghrib":"18:24","isha":"19:43"},
    {"day":15,"fajr":"06:16","sunrise":"07:43","dhuhr":"13:13","asr":"16:07","maghrib":"18:25","isha":"19:44"},
    {"day":16,"fajr":"06:16","sunrise":"07:43","dhuhr":"13:13","asr":"16:08","maghrib":"18:26","isha":"19:45"},
    {"day":17,"fajr":"06:16","sunrise":"07:43","dhuhr":"13:14","asr":"16:09","maghrib":"18:27","isha":"19:46"},
    {"day":18,"fajr":"06:16","sunrise":"07:42","dhuhr":"13:15","asr":"16:10","maghrib":"18:28","isha":"19:47"},
    {"day":19,"fajr":"06:17","sunrise":"07:42","dhuhr":"13:15","asr":"16:10","maghrib":"18:29","isha":"19:47"},
    {"day":20,"fajr":"06:17","sunrise":"07:42","dhuhr":"13:16","asr":"16:11","maghrib":"18:30","isha":"19:48"},
    {"day":21,"fajr":"06:17","sunrise":"07:42","dhuhr":"13:16","asr":"16:12","maghrib":"18:31","isha":"19:48"},
    {"day":22,"fajr":"06:17","sunrise":"07:42","dhuhr":"13:16","asr":"16:13","maghrib":"18:32","isha":"19:48"},
    {"day":23,"fajr":"06:17","sunrise":"07:42","dhuhr":"13:16","asr":"16:13","maghrib":"18:32","isha":"19:49"},
    {"day":24,"fajr":"06:17","sunrise":"07:41","dhuhr":"13:16","asr":"16:14","maghrib":"18:33","isha":"19:50"},
    {"day":25,"fajr":"06:17","sunrise":"07:41","dhuhr":"13:16","asr":"16:15","maghrib":"18:34","isha":"19:51"},
    {"day":26,"fajr":"06:17","sunrise":"07:41","dhuhr":"13:16","asr":"16:15","maghrib":"18:35","isha":"19:52"},
    {"day":27,"fajr":"06:16","sunrise":"07:41","dhuhr":"13:16","asr":"16:15","maghrib":"18:35","isha":"19:53"},
    {"day":28,"fajr":"06:16","sunrise":"07:40","dhuhr":"13:16","asr":"16:16","maghrib":"18:36","isha":"19:53"},
    {"day":29,"fajr":"06:16","sunrise":"07:40","dhuhr":"13:16","asr":"16:17","maghrib":"18:37","isha":"19:54"},
    {"day":30,"fajr":"06:16","sunrise":"07:39","dhuhr":"13:16","asr":"16:17","maghrib":"18:37","isha":"19:54"},
    {"day":31,"fajr":"06:15","sunrise":"07:39","dhuhr":"13:15","asr":"16:18","maghrib":"18:38","isha":"19:55"}
  ];

  // ---------------- February ----------------
  const februaryTimes = [
    {"day":1,"fajr":"06:14","sunrise":"07:38","dhuhr":"13:15","asr":"16:18","maghrib":"18:38","isha":"19:55"},
    {"day":2,"fajr":"06:14","sunrise":"07:38","dhuhr":"13:15","asr":"16:18","maghrib":"18:39","isha":"19:56"},
    {"day":3,"fajr":"06:14","sunrise":"07:38","dhuhr":"13:15","asr":"16:19","maghrib":"18:40","isha":"19:57"},
    {"day":4,"fajr":"06:13","sunrise":"07:37","dhuhr":"13:15","asr":"16:19","maghrib":"18:40","isha":"19:57"},
    {"day":5,"fajr":"06:13","sunrise":"07:37","dhuhr":"13:15","asr":"16:20","maghrib":"18:41","isha":"19:58"},
    {"day":6,"fajr":"06:12","sunrise":"07:36","dhuhr":"13:15","asr":"16:21","maghrib":"18:42","isha":"19:59"},
    {"day":7,"fajr":"06:12","sunrise":"07:36","dhuhr":"13:15","asr":"16:21","maghrib":"18:43","isha":"20:00"},
    {"day":8,"fajr":"06:11","sunrise":"07:35","dhuhr":"13:15","asr":"16:21","maghrib":"18:43","isha":"20:00"},
    {"day":9,"fajr":"06:10","sunrise":"07:35","dhuhr":"13:15","asr":"16:22","maghrib":"18:44","isha":"20:00"},
    {"day":10,"fajr":"06:09","sunrise":"07:34","dhuhr":"13:15","asr":"16:22","maghrib":"18:44","isha":"20:00"},
    {"day":11,"fajr":"06:08","sunrise":"07:33","dhuhr":"13:15","asr":"16:22","maghrib":"18:45","isha":"20:01"},
    {"day":12,"fajr":"06:08","sunrise":"07:32","dhuhr":"13:14","asr":"16:23","maghrib":"18:46","isha":"20:02"},
    {"day":13,"fajr":"06:08","sunrise":"07:32","dhuhr":"13:14","asr":"16:24","maghrib":"18:47","isha":"20:03"},
    {"day":14,"fajr":"06:08","sunrise":"07:31","dhuhr":"13:14","asr":"16:24","maghrib":"18:48","isha":"20:04"},
    {"day":15,"fajr":"06:06","sunrise":"07:30","dhuhr":"13:14","asr":"16:25","maghrib":"18:48","isha":"20:05"},
    {"day":16,"fajr":"06:06","sunrise":"07:29","dhuhr":"13:14","asr":"16:25","maghrib":"18:49","isha":"20:05"},
    {"day":17,"fajr":"06:05","sunrise":"07:29","dhuhr":"13:13","asr":"16:25","maghrib":"18:49","isha":"20:05"},
    {"day":18,"fajr":"06:05","sunrise":"07:28","dhuhr":"13:13","asr":"16:25","maghrib":"18:50","isha":"20:06"},
    {"day":19,"fajr":"06:03","sunrise":"07:28","dhuhr":"13:13","asr":"16:26","maghrib":"18:50","isha":"20:06"},
    {"day":20,"fajr":"06:02","sunrise":"07:27","dhuhr":"13:13","asr":"16:27","maghrib":"18:50","isha":"20:06"},
    {"day":21,"fajr":"06:02","sunrise":"07:26","dhuhr":"13:13","asr":"16:27","maghrib":"18:51","isha":"20:07"},
    {"day":22,"fajr":"06:01","sunrise":"07:25","dhuhr":"13:13","asr":"16:27","maghrib":"18:52","isha":"20:08"},
    {"day":23,"fajr":"06:00","sunrise":"07:24","dhuhr":"13:13","asr":"16:28","maghrib":"18:52","isha":"20:08"},
    {"day":24,"fajr":"06:00","sunrise":"07:23","dhuhr":"13:12","asr":"16:28","maghrib":"18:53","isha":"20:09"},
    {"day":25,"fajr":"05:58","sunrise":"07:22","dhuhr":"13:12","asr":"16:28","maghrib":"18:53","isha":"20:09"},
    {"day":26,"fajr":"05:58","sunrise":"07:21","dhuhr":"13:12","asr":"16:28","maghrib":"18:54","isha":"20:10"},
    {"day":27,"fajr":"05:56","sunrise":"07:19","dhuhr":"13:12","asr":"16:28","maghrib":"18:55","isha":"20:10"},
    {"day":28,"fajr":"05:56","sunrise":"07:18","dhuhr":"13:12","asr":"16:28","maghrib":"18:55","isha":"20:10"},
    {"day":29,"fajr":"05:55","sunrise":"07:18","dhuhr":"13:12","asr":"16:28","maghrib":"18:55","isha":"20:10"}
  ];

  // ---------------- March ----------------
  const marchTimes = [
    {"day":1,"fajr":"05:55","sunrise":"07:18","dhuhr":"13:12","asr":"16:29","maghrib":"18:56","isha":"20:11"},
    {"day":2,"fajr":"05:54","sunrise":"07:16","dhuhr":"13:11","asr":"16:29","maghrib":"18:56","isha":"20:11"},
    {"day":3,"fajr":"05:53","sunrise":"07:16","dhuhr":"13:11","asr":"16:29","maghrib":"18:57","isha":"20:12"},
    {"day":4,"fajr":"05:52","sunrise":"07:14","dhuhr":"13:11","asr":"16:29","maghrib":"18:57","isha":"20:12"},
    {"day":5,"fajr":"05:51","sunrise":"07:13","dhuhr":"13:11","asr":"16:30","maghrib":"18:58","isha":"20:13"},
    {"day":6,"fajr":"05:50","sunrise":"07:12","dhuhr":"13:10","asr":"16:30","maghrib":"18:58","isha":"20:13"},
    {"day":7,"fajr":"05:49","sunrise":"07:11","dhuhr":"13:10","asr":"16:30","maghrib":"18:59","isha":"20:14"},
    {"day":8,"fajr":"05:49","sunrise":"07:11","dhuhr":"13:10","asr":"16:31","maghrib":"19:00","isha":"20:15"},
    {"day":9,"fajr":"05:47","sunrise":"07:10","dhuhr":"13:09","asr":"16:31","maghrib":"19:00","isha":"20:15"},
    {"day":10,"fajr":"05:46","sunrise":"07:09","dhuhr":"13:08","asr":"16:31","maghrib":"19:01","isha":"20:15"},
    {"day":11,"fajr":"05:45","sunrise":"07:07","dhuhr":"13:08","asr":"16:31","maghrib":"19:01","isha":"20:15"},
    {"day":12,"fajr":"05:44","sunrise":"07:06","dhuhr":"13:08","asr":"16:31","maghrib":"19:01","isha":"20:15"},
    {"day":13,"fajr":"05:42","sunrise":"07:05","dhuhr":"13:08","asr":"16:31","maghrib":"19:01","isha":"20:15"},
    {"day":14,"fajr":"05:41","sunrise":"07:04","dhuhr":"13:07","asr":"16:31","maghrib":"19:02","isha":"20:16"},
    {"day":15,"fajr":"05:40","sunrise":"07:03","dhuhr":"13:07","asr":"16:31","maghrib":"19:03","isha":"20:17"},
    {"day":16,"fajr":"05:39","sunrise":"07:02","dhuhr":"13:07","asr":"16:31","maghrib":"19:03","isha":"20:17"},
    {"day":17,"fajr":"05:37","sunrise":"07:01","dhuhr":"13:06","asr":"16:31","maghrib":"19:03","isha":"20:17"},
    {"day":18,"fajr":"05:37","sunrise":"07:00","dhuhr":"13:06","asr":"16:32","maghrib":"19:04","isha":"20:18"},
    {"day":19,"fajr":"05:35","sunrise":"06:59","dhuhr":"13:05","asr":"16:32","maghrib":"19:04","isha":"20:18"},
    {"day":20,"fajr":"05:34","sunrise":"06:58","dhuhr":"13:05","asr":"16:32","maghrib":"19:05","isha":"20:19"},
    {"day":21,"fajr":"05:32","sunrise":"06:56","dhuhr":"13:04","asr":"16:32","maghrib":"19:05","isha":"20:19"},
    {"day":22,"fajr":"05:32","sunrise":"06:55","dhuhr":"13:04","asr":"16:32","maghrib":"19:06","isha":"20:20"},
    {"day":23,"fajr":"05:30","sunrise":"06:54","dhuhr":"13:04","asr":"16:32","maghrib":"19:06","isha":"20:20"},
    {"day":24,"fajr":"05:29","sunrise":"06:53","dhuhr":"13:03","asr":"16:32","maghrib":"19:07","isha":"20:21"},
    {"day":25,"fajr":"05:29","sunrise":"06:52","dhuhr":"13:03","asr":"16:32","maghrib":"19:08","isha":"20:22"},
    {"day":26,"fajr":"05:27","sunrise":"06:50","dhuhr":"13:03","asr":"16:32","maghrib":"19:08","isha":"20:22"},
    {"day":27,"fajr":"05:27","sunrise":"06:49","dhuhr":"13:03","asr":"16:32","maghrib":"19:09","isha":"20:23"},
    {"day":28,"fajr":"05:26","sunrise":"06:48","dhuhr":"13:02","asr":"16:32","maghrib":"19:10","isha":"20:24"},
    {"day":29,"fajr":"05:24","sunrise":"06:46","dhuhr":"13:02","asr":"16:32","maghrib":"19:10","isha":"20:24"},
    {"day":30,"fajr":"05:23","sunrise":"06:45","dhuhr":"13:01","asr":"16:31","maghrib":"19:10","isha":"20:24"},
    {"day":31,"fajr":"05:21","sunrise":"06:44","dhuhr":"13:00","asr":"16:31","maghrib":"19:10","isha":"20:24"}
  ];

  // ---------------- April ----------------
  const aprilTimes = [
    {"day":1,"fajr":"05:20","sunrise":"06:44","dhuhr":"13:00","asr":"16:31","maghrib":"19:11","isha":"20:25"},
    {"day":2,"fajr":"05:19","sunrise":"06:43","dhuhr":"13:00","asr":"16:31","maghrib":"19:11","isha":"20:25"},
    {"day":3,"fajr":"05:17","sunrise":"06:41","dhuhr":"12:59","asr":"16:31","maghrib":"19:11","isha":"20:25"},
    {"day":4,"fajr":"05:16","sunrise":"06:41","dhuhr":"12:59","asr":"16:31","maghrib":"19:12","isha":"20:26"},
    {"day":5,"fajr":"05:14","sunrise":"06:40","dhuhr":"12:59","asr":"16:31","maghrib":"19:12","isha":"20:26"},
    {"day":6,"fajr":"05:13","sunrise":"06:38","dhuhr":"12:58","asr":"16:30","maghrib":"19:12","isha":"20:26"},
    {"day":7,"fajr":"05:12","sunrise":"06:37","dhuhr":"12:58","asr":"16:30","maghrib":"19:13","isha":"20:28"},
    {"day":8,"fajr":"05:10","sunrise":"06:36","dhuhr":"12:58","asr":"16:30","maghrib":"19:13","isha":"20:28"},
    {"day":9,"fajr":"05:10","sunrise":"06:36","dhuhr":"12:58","asr":"16:30","maghrib":"19:14","isha":"20:29"},
    {"day":10,"fajr":"05:08","sunrise":"06:34","dhuhr":"12:57","asr":"16:30","maghrib":"19:14","isha":"20:29"},
    {"day":11,"fajr":"05:07","sunrise":"06:33","dhuhr":"12:57","asr":"16:30","maghrib":"19:15","isha":"20:30"},
    {"day":12,"fajr":"05:06","sunrise":"06:32","dhuhr":"12:56","asr":"16:30","maghrib":"19:15","isha":"20:30"},
    {"day":13,"fajr":"05:04","sunrise":"06:31","dhuhr":"12:56","asr":"16:30","maghrib":"19:15","isha":"20:30"},
    {"day":14,"fajr":"05:03","sunrise":"06:30","dhuhr":"12:55","asr":"16:30","maghrib":"19:16","isha":"20:31"},
    {"day":15,"fajr":"05:01","sunrise":"06:29","dhuhr":"12:55","asr":"16:30","maghrib":"19:16","isha":"20:31"},
    {"day":16,"fajr":"05:01","sunrise":"06:28","dhuhr":"12:55","asr":"16:30","maghrib":"19:17","isha":"20:32"},
    {"day":17,"fajr":"05:00","sunrise":"06:28","dhuhr":"12:55","asr":"16:30","maghrib":"19:18","isha":"20:34"},
    {"day":18,"fajr":"04:59","sunrise":"06:26","dhuhr":"12:54","asr":"16:30","maghrib":"19:18","isha":"20:34"},
    {"day":19,"fajr":"04:58","sunrise":"06:25","dhuhr":"12:54","asr":"16:30","maghrib":"19:19","isha":"20:35"},
    {"day":20,"fajr":"04:57","sunrise":"06:25","dhuhr":"12:54","asr":"16:30","maghrib":"19:20","isha":"20:36"},
    {"day":21,"fajr":"04:55","sunrise":"06:23","dhuhr":"12:54","asr":"16:30","maghrib":"19:20","isha":"20:36"},
    {"day":22,"fajr":"04:55","sunrise":"06:22","dhuhr":"12:54","asr":"16:30","maghrib":"19:21","isha":"20:38"},
    {"day":23,"fajr":"04:53","sunrise":"06:22","dhuhr":"12:53","asr":"16:29","maghrib":"19:21","isha":"20:38"},
    {"day":24,"fajr":"04:51","sunrise":"06:20","dhuhr":"12:52","asr":"16:29","maghrib":"19:21","isha":"20:38"},
    {"day":25,"fajr":"04:50","sunrise":"06:20","dhuhr":"12:52","asr":"16:28","maghrib":"19:22","isha":"20:39"},
    {"day":26,"fajr":"04:49","sunrise":"06:19","dhuhr":"12:52","asr":"16:28","maghrib":"19:22","isha":"20:39"},
    {"day":27,"fajr":"04:48","sunrise":"06:18","dhuhr":"12:52","asr":"16:28","maghrib":"19:23","isha":"20:39"},
    {"day":28,"fajr":"04:46","sunrise":"06:17","dhuhr":"12:52","asr":"16:28","maghrib":"19:23","isha":"20:41"},
    {"day":29,"fajr":"04:45","sunrise":"06:16","dhuhr":"12:52","asr":"16:28","maghrib":"19:24","isha":"20:42"},
    {"day":30,"fajr":"04:44","sunrise":"06:15","dhuhr":"12:52","asr":"16:27","maghrib":"19:24","isha":"20:42"}
  ];

  // ---------------- May ----------------
  const mayTimes = [
    {"day":1,"fajr":"04:43","sunrise":"06:15","dhuhr":"12:52","asr":"16:27","maghrib":"19:25","isha":"20:43"},
    {"day":2,"fajr":"04:42","sunrise":"06:14","dhuhr":"12:52","asr":"16:27","maghrib":"19:25","isha":"20:43"},
    {"day":3,"fajr":"04:41","sunrise":"06:13","dhuhr":"12:52","asr":"16:27","maghrib":"19:26","isha":"20:45"},
    {"day":4,"fajr":"04:40","sunrise":"06:13","dhuhr":"12:52","asr":"16:26","maghrib":"19:26","isha":"20:45"},
    {"day":5,"fajr":"04:38","sunrise":"06:11","dhuhr":"12:52","asr":"16:25","maghrib":"19:27","isha":"20:46"},
    {"day":6,"fajr":"04:38","sunrise":"06:11","dhuhr":"12:52","asr":"16:25","maghrib":"19:27","isha":"20:46"},
    {"day":7,"fajr":"04:37","sunrise":"06:10","dhuhr":"12:51","asr":"16:25","maghrib":"19:27","isha":"20:46"},
    {"day":8,"fajr":"04:36","sunrise":"06:10","dhuhr":"12:51","asr":"16:25","maghrib":"19:28","isha":"20:48"},
    {"day":9,"fajr":"04:35","sunrise":"06:08","dhuhr":"12:51","asr":"16:25","maghrib":"19:29","isha":"20:50"},
    {"day":10,"fajr":"04:34","sunrise":"06:08","dhuhr":"12:51","asr":"16:25","maghrib":"19:30","isha":"20:51"},
    {"day":11,"fajr":"04:34","sunrise":"06:08","dhuhr":"12:51","asr":"16:25","maghrib":"19:30","isha":"20:52"},
    {"day":12,"fajr":"04:33","sunrise":"06:07","dhuhr":"12:51","asr":"16:25","maghrib":"19:30","isha":"20:52"},
    {"day":13,"fajr":"04:32","sunrise":"06:07","dhuhr":"12:50","asr":"16:25","maghrib":"19:31","isha":"20:52"},
    {"day":14,"fajr":"04:31","sunrise":"06:06","dhuhr":"12:51","asr":"16:25","maghrib":"19:31","isha":"20:54"},
    {"day":15,"fajr":"04:29","sunrise":"06:05","dhuhr":"12:51","asr":"16:24","maghrib":"19:31","isha":"20:54"},
    {"day":16,"fajr":"04:29","sunrise":"06:05","dhuhr":"12:51","asr":"16:24","maghrib":"19:32","isha":"20:55"},
    {"day":17,"fajr":"04:28","sunrise":"06:04","dhuhr":"12:51","asr":"16:24","maghrib":"19:32","isha":"20:55"},
    {"day":18,"fajr":"04:27","sunrise":"06:04","dhuhr":"12:51","asr":"16:23","maghrib":"19:32","isha":"20:56"},
    {"day":19,"fajr":"04:27","sunrise":"06:03","dhuhr":"12:51","asr":"16:23","maghrib":"19:33","isha":"20:57"},
    {"day":20,"fajr":"04:26","sunrise":"06:03","dhuhr":"12:51","asr":"16:22","maghrib":"19:33","isha":"20:57"},
    {"day":21,"fajr":"04:25","sunrise":"06:02","dhuhr":"12:51","asr":"16:22","maghrib":"19:33","isha":"20:57"},
    {"day":22,"fajr":"04:25","sunrise":"06:02","dhuhr":"12:51","asr":"16:22","maghrib":"19:34","isha":"20:58"},
    {"day":23,"fajr":"04:24","sunrise":"06:02","dhuhr":"12:52","asr":"16:21","maghrib":"19:34","isha":"20:59"},
    {"day":24,"fajr":"04:23","sunrise":"06:01","dhuhr":"12:52","asr":"16:21","maghrib":"19:34","isha":"20:59"},
    {"day":25,"fajr":"04:22","sunrise":"06:01","dhuhr":"12:52","asr":"16:21","maghrib":"19:35","isha":"21:00"},
    {"day":26,"fajr":"04:21","sunrise":"06:01","dhuhr":"12:52","asr":"16:21","maghrib":"19:35","isha":"21:00"},
    {"day":27,"fajr":"04:21","sunrise":"06:01","dhuhr":"12:52","asr":"16:21","maghrib":"19:36","isha":"21:01"},
    {"day":28,"fajr":"04:20","sunrise":"06:00","dhuhr":"12:52","asr":"16:21","maghrib":"19:36","isha":"21:01"},
    {"day":29,"fajr":"04:20","sunrise":"06:00","dhuhr":"12:52","asr":"16:21","maghrib":"19:37","isha":"21:02"},
    {"day":30,"fajr":"04:20","sunrise":"06:00","dhuhr":"12:52","asr":"16:21","maghrib":"19:38","isha":"21:03"},
    {"day":31,"fajr":"04:19","sunrise":"05:59","dhuhr":"12:52","asr":"16:21","maghrib":"19:38","isha":"21:04"}
  ];

  // ---------------- June ----------------
  const juneTimes = [
    {"day":1,"fajr":"04:19","sunrise":"05:59","dhuhr":"12:52","asr":"16:21","maghrib":"19:38","isha":"21:05"},
    {"day":2,"fajr":"04:18","sunrise":"05:59","dhuhr":"12:52","asr":"16:21","maghrib":"19:39","isha":"21:05"},
    {"day":3,"fajr":"04:18","sunrise":"05:59","dhuhr":"12:52","asr":"16:22","maghrib":"19:39","isha":"21:05"},
    {"day":4,"fajr":"04:18","sunrise":"05:59","dhuhr":"12:52","asr":"16:22","maghrib":"19:40","isha":"21:05"},
    {"day":5,"fajr":"04:18","sunrise":"05:59","dhuhr":"12:52","asr":"16:22","maghrib":"19:40","isha":"21:06"},
    {"day":6,"fajr":"04:18","sunrise":"05:59","dhuhr":"12:52","asr":"16:22","maghrib":"19:40","isha":"21:07"},
    {"day":7,"fajr":"04:18","sunrise":"05:59","dhuhr":"12:53","asr":"16:23","maghrib":"19:41","isha":"21:08"},
    {"day":8,"fajr":"04:18","sunrise":"05:58","dhuhr":"12:53","asr":"16:23","maghrib":"19:41","isha":"21:08"},
    {"day":9,"fajr":"04:18","sunrise":"05:58","dhuhr":"12:53","asr":"16:23","maghrib":"19:42","isha":"21:09"},
    {"day":10,"fajr":"04:18","sunrise":"05:58","dhuhr":"12:53","asr":"16:23","maghrib":"19:42","isha":"21:09"},
    {"day":11,"fajr":"04:18","sunrise":"05:58","dhuhr":"12:53","asr":"16:23","maghrib":"19:42","isha":"21:09"},
    {"day":12,"fajr":"04:18","sunrise":"05:58","dhuhr":"12:54","asr":"16:23","maghrib":"19:43","isha":"21:10"},
    {"day":13,"fajr":"04:18","sunrise":"05:58","dhuhr":"12:54","asr":"16:23","maghrib":"19:43","isha":"21:10"},
    {"day":14,"fajr":"04:19","sunrise":"05:58","dhuhr":"12:54","asr":"16:24","maghrib":"19:44","isha":"21:11"},
    {"day":15,"fajr":"04:19","sunrise":"05:58","dhuhr":"12:54","asr":"16:24","maghrib":"19:44","isha":"21:11"},
    {"day":16,"fajr":"04:19","sunrise":"05:58","dhuhr":"12:54","asr":"16:24","maghrib":"19:44","isha":"21:12"},
    {"day":17,"fajr":"04:20","sunrise":"05:59","dhuhr":"12:55","asr":"16:24","maghrib":"19:45","isha":"21:13"},
    {"day":18,"fajr":"04:20","sunrise":"05:59","dhuhr":"12:55","asr":"16:24","maghrib":"19:45","isha":"21:13"},
    {"day":19,"fajr":"04:20","sunrise":"05:59","dhuhr":"12:55","asr":"16:24","maghrib":"19:45","isha":"21:13"},
    {"day":20,"fajr":"04:20","sunrise":"05:59","dhuhr":"12:55","asr":"16:24","maghrib":"19:45","isha":"21:13"},
    {"day":21,"fajr":"04:20","sunrise":"05:59","dhuhr":"12:55","asr":"16:24","maghrib":"19:45","isha":"21:13"},
    {"day":22,"fajr":"04:21","sunrise":"06:00","dhuhr":"12:56","asr":"16:25","maghrib":"19:46","isha":"21:14"},
    {"day":23,"fajr":"04:21","sunrise":"06:00","dhuhr":"12:56","asr":"16:25","maghrib":"19:46","isha":"21:14"},
    {"day":24,"fajr":"04:21","sunrise":"06:00","dhuhr":"12:56","asr":"16:25","maghrib":"19:46","isha":"21:14"},
    {"day":25,"fajr":"04:21","sunrise":"06:00","dhuhr":"12:56","asr":"16:25","maghrib":"19:46","isha":"21:14"},
    {"day":26,"fajr":"04:21","sunrise":"06:00","dhuhr":"12:56","asr":"16:26","maghrib":"19:46","isha":"21:15"},
    {"day":27,"fajr":"04:23","sunrise":"06:01","dhuhr":"12:57","asr":"16:27","maghrib":"19:47","isha":"21:15"},
    {"day":28,"fajr":"04:23","sunrise":"06:01","dhuhr":"12:57","asr":"16:27","maghrib":"19:47","isha":"21:15"},
    {"day":29,"fajr":"04:23","sunrise":"06:01","dhuhr":"12:57","asr":"16:27","maghrib":"19:47","isha":"21:15"},
    {"day":30,"fajr":"04:23","sunrise":"06:02","dhuhr":"12:57","asr":"16:27","maghrib":"19:47","isha":"21:15"}
  ];

  // ---------------- July ----------------
  const julyTimes = [
    {"day":1,"fajr":"04:23","sunrise":"06:02","dhuhr":"12:58","asr":"16:27","maghrib":"19:47","isha":"21:15"},
    {"day":2,"fajr":"04:24","sunrise":"06:03","dhuhr":"12:58","asr":"16:28","maghrib":"19:47","isha":"21:15"},
    {"day":3,"fajr":"04:25","sunrise":"06:03","dhuhr":"12:58","asr":"16:28","maghrib":"19:47","isha":"21:15"},
    {"day":4,"fajr":"04:26","sunrise":"06:04","dhuhr":"12:58","asr":"16:28","maghrib":"19:47","isha":"21:15"},
    {"day":5,"fajr":"04:26","sunrise":"06:04","dhuhr":"12:58","asr":"16:28","maghrib":"19:47","isha":"21:14"},
    {"day":6,"fajr":"04:26","sunrise":"06:04","dhuhr":"12:58","asr":"16:29","maghrib":"19:47","isha":"21:14"},
    {"day":7,"fajr":"04:27","sunrise":"06:04","dhuhr":"12:59","asr":"16:29","maghrib":"19:47","isha":"21:14"},
    {"day":8,"fajr":"04:28","sunrise":"06:04","dhuhr":"13:00","asr":"16:29","maghrib":"19:47","isha":"21:14"},
    {"day":9,"fajr":"04:29","sunrise":"06:05","dhuhr":"13:00","asr":"16:29","maghrib":"19:47","isha":"21:14"},
    {"day":10,"fajr":"04:30","sunrise":"06:05","dhuhr":"13:00","asr":"16:29","maghrib":"19:47","isha":"21:14"},
    {"day":11,"fajr":"04:30","sunrise":"06:05","dhuhr":"13:00","asr":"16:29","maghrib":"19:46","isha":"21:14"},
    {"day":12,"fajr":"04:30","sunrise":"06:06","dhuhr":"13:00","asr":"16:29","maghrib":"19:46","isha":"21:13"},
    {"day":13,"fajr":"04:30","sunrise":"06:06","dhuhr":"13:00","asr":"16:30","maghrib":"19:46","isha":"21:13"},
    {"day":14,"fajr":"04:31","sunrise":"06:07","dhuhr":"13:01","asr":"16:30","maghrib":"19:46","isha":"21:13"},
    {"day":15,"fajr":"04:32","sunrise":"06:08","dhuhr":"13:01","asr":"16:31","maghrib":"19:46","isha":"21:13"},
    {"day":16,"fajr":"04:33","sunrise":"06:08","dhuhr":"13:01","asr":"16:31","maghrib":"19:46","isha":"21:12"},
    {"day":17,"fajr":"04:34","sunrise":"06:09","dhuhr":"13:01","asr":"16:31","maghrib":"19:46","isha":"21:12"},
    {"day":18,"fajr":"04:34","sunrise":"06:09","dhuhr":"13:01","asr":"16:31","maghrib":"19:45","isha":"21:11"},
    {"day":19,"fajr":"04:35","sunrise":"06:10","dhuhr":"13:01","asr":"16:31","maghrib":"19:45","isha":"21:11"},
    {"day":20,"fajr":"04:35","sunrise":"06:10","dhuhr":"13:01","asr":"16:31","maghrib":"19:44","isha":"21:10"},
    {"day":21,"fajr":"04:36","sunrise":"06:10","dhuhr":"13:01","asr":"16:31","maghrib":"19:44","isha":"21:10"},
    {"day":22,"fajr":"04:37","sunrise":"06:11","dhuhr":"13:01","asr":"16:32","maghrib":"19:44","isha":"21:10"},
    {"day":23,"fajr":"04:38","sunrise":"06:12","dhuhr":"13:01","asr":"16:32","maghrib":"19:44","isha":"21:10"},
    {"day":24,"fajr":"04:38","sunrise":"06:12","dhuhr":"13:01","asr":"16:33","maghrib":"19:43","isha":"21:09"},
    {"day":25,"fajr":"04:39","sunrise":"06:13","dhuhr":"13:01","asr":"16:33","maghrib":"19:43","isha":"21:08"},
    {"day":26,"fajr":"04:40","sunrise":"06:14","dhuhr":"13:01","asr":"16:34","maghrib":"19:43","isha":"21:08"},
    {"day":27,"fajr":"04:41","sunrise":"06:14","dhuhr":"13:01","asr":"16:34","maghrib":"19:43","isha":"21:08"},
    {"day":28,"fajr":"04:42","sunrise":"06:15","dhuhr":"13:01","asr":"16:35","maghrib":"19:43","isha":"21:08"},
    {"day":29,"fajr":"04:42","sunrise":"06:15","dhuhr":"13:01","asr":"16:35","maghrib":"19:42","isha":"21:07"},
    {"day":30,"fajr":"04:43","sunrise":"06:16","dhuhr":"13:01","asr":"16:35","maghrib":"19:42","isha":"21:07"},
    {"day":31,"fajr":"04:43","sunrise":"06:17","dhuhr":"13:01","asr":"16:35","maghrib":"19:41","isha":"21:05"}
  ];

  // ---------------- August ----------------
  const augustTimes = [
    {"day":1,"fajr":"04:44","sunrise":"06:17","dhuhr":"13:01","asr":"16:36","maghrib":"19:41","isha":"21:05"},
    {"day":2,"fajr":"04:45","sunrise":"06:18","dhuhr":"13:01","asr":"16:36","maghrib":"19:41","isha":"21:05"},
    {"day":3,"fajr":"04:46","sunrise":"06:18","dhuhr":"13:01","asr":"16:36","maghrib":"19:40","isha":"21:03"},
    {"day":4,"fajr":"04:47","sunrise":"06:18","dhuhr":"13:01","asr":"16:36","maghrib":"19:39","isha":"21:02"},
    {"day":5,"fajr":"04:48","sunrise":"06:19","dhuhr":"13:01","asr":"16:36","maghrib":"19:39","isha":"21:02"},
    {"day":6,"fajr":"04:48","sunrise":"06:20","dhuhr":"13:01","asr":"16:36","maghrib":"19:38","isha":"21:02"},
    {"day":7,"fajr":"04:50","sunrise":"06:20","dhuhr":"13:00","asr":"16:36","maghrib":"19:38","isha":"21:00"},
    {"day":8,"fajr":"04:51","sunrise":"06:21","dhuhr":"13:00","asr":"16:36","maghrib":"19:37","isha":"20:59"},
    {"day":9,"fajr":"04:52","sunrise":"06:22","dhuhr":"13:00","asr":"16:36","maghrib":"19:37","isha":"20:59"},
    {"day":10,"fajr":"04:53","sunrise":"06:22","dhuhr":"13:00","asr":"16:36","maghrib":"19:36","isha":"20:58"},
    {"day":11,"fajr":"04:54","sunrise":"06:23","dhuhr":"13:00","asr":"16:36","maghrib":"19:35","isha":"20:57"},
    {"day":12,"fajr":"04:54","sunrise":"06:23","dhuhr":"13:00","asr":"16:36","maghrib":"19:34","isha":"20:56"},
    {"day":13,"fajr":"04:54","sunrise":"06:24","dhuhr":"13:00","asr":"16:36","maghrib":"19:33","isha":"20:54"},
    {"day":14,"fajr":"04:55","sunrise":"06:24","dhuhr":"13:00","asr":"16:35","maghrib":"19:32","isha":"20:53"},
    {"day":15,"fajr":"04:56","sunrise":"06:24","dhuhr":"13:00","asr":"16:35","maghrib":"19:31","isha":"20:52"},
    {"day":16,"fajr":"04:56","sunrise":"06:25","dhuhr":"13:00","asr":"16:35","maghrib":"19:30","isha":"20:51"},
    {"day":17,"fajr":"04:58","sunrise":"06:25","dhuhr":"13:00","asr":"16:35","maghrib":"19:30","isha":"20:51"},
    {"day":18,"fajr":"04:59","sunrise":"06:25","dhuhr":"13:00","asr":"16:35","maghrib":"19:29","isha":"20:49"},
    {"day":19,"fajr":"05:00","sunrise":"06:26","dhuhr":"13:00","asr":"16:35","maghrib":"19:29","isha":"20:49"},
    {"day":20,"fajr":"05:01","sunrise":"06:26","dhuhr":"12:59","asr":"16:35","maghrib":"19:28","isha":"20:48"},
    {"day":21,"fajr":"05:02","sunrise":"06:27","dhuhr":"12:59","asr":"16:34","maghrib":"19:27","isha":"20:47"},
    {"day":22,"fajr":"05:02","sunrise":"06:27","dhuhr":"12:59","asr":"16:34","maghrib":"19:26","isha":"20:46"},
    {"day":23,"fajr":"05:03","sunrise":"06:28","dhuhr":"12:59","asr":"16:34","maghrib":"19:25","isha":"20:44"},
    {"day":24,"fajr":"05:04","sunrise":"06:29","dhuhr":"12:58","asr":"16:33","maghrib":"19:24","isha":"20:43"},
    {"day":25,"fajr":"05:04","sunrise":"06:29","dhuhr":"12:58","asr":"16:33","maghrib":"19:23","isha":"20:42"},
    {"day":26,"fajr":"05:05","sunrise":"06:29","dhuhr":"12:58","asr":"16:33","maghrib":"19:22","isha":"20:41"},
    {"day":27,"fajr":"05:05","sunrise":"06:30","dhuhr":"12:57","asr":"16:32","maghrib":"19:21","isha":"20:40"},
    {"day":28,"fajr":"05:06","sunrise":"06:30","dhuhr":"12:57","asr":"16:32","maghrib":"19:20","isha":"20:38"},
    {"day":29,"fajr":"05:07","sunrise":"06:31","dhuhr":"12:57","asr":"16:32","maghrib":"19:19","isha":"20:37"},
    {"day":30,"fajr":"05:08","sunrise":"06:31","dhuhr":"12:57","asr":"16:32","maghrib":"19:18","isha":"20:36"},
    {"day":31,"fajr":"05:08","sunrise":"06:31","dhuhr":"12:56","asr":"16:31","maghrib":"19:16","isha":"20:34"}
  ];

  // ---------------- September ----------------
  const septemberTimes = [
    {"day":1,"fajr":"05:08","sunrise":"06:32","dhuhr":"12:56","asr":"16:30","maghrib":"19:15","isha":"20:33"},
    {"day":2,"fajr":"05:08","sunrise":"06:32","dhuhr":"12:56","asr":"16:29","maghrib":"19:14","isha":"20:31"},
    {"day":3,"fajr":"05:09","sunrise":"06:33","dhuhr":"12:56","asr":"16:29","maghrib":"19:13","isha":"20:30"},
    {"day":4,"fajr":"05:10","sunrise":"06:33","dhuhr":"12:56","asr":"16:28","maghrib":"19:12","isha":"20:29"},
    {"day":5,"fajr":"05:11","sunrise":"06:34","dhuhr":"12:56","asr":"16:27","maghrib":"19:11","isha":"20:28"},
    {"day":6,"fajr":"05:12","sunrise":"06:34","dhuhr":"12:55","asr":"16:27","maghrib":"19:10","isha":"20:27"},
    {"day":7,"fajr":"05:13","sunrise":"06:35","dhuhr":"12:55","asr":"16:27","maghrib":"19:09","isha":"20:25"},
    {"day":8,"fajr":"05:14","sunrise":"06:35","dhuhr":"12:55","asr":"16:26","maghrib":"19:08","isha":"20:24"},
    {"day":9,"fajr":"05:14","sunrise":"06:36","dhuhr":"12:55","asr":"16:26","maghrib":"19:07","isha":"20:23"},
    {"day":10,"fajr":"05:15","sunrise":"06:37","dhuhr":"12:54","asr":"16:25","maghrib":"19:06","isha":"20:22"},
    {"day":11,"fajr":"05:16","sunrise":"06:37","dhuhr":"12:54","asr":"16:25","maghrib":"19:05","isha":"20:22"},
    {"day":12,"fajr":"05:17","sunrise":"06:37","dhuhr":"12:54","asr":"16:25","maghrib":"19:05","isha":"20:20"},
    {"day":13,"fajr":"05:19","sunrise":"06:37","dhuhr":"12:54","asr":"16:25","maghrib":"19:04","isha":"20:19"},
    {"day":14,"fajr":"05:19","sunrise":"06:37","dhuhr":"12:53","asr":"16:23","maghrib":"19:02","isha":"20:17"},
    {"day":15,"fajr":"05:19","sunrise":"06:38","dhuhr":"12:53","asr":"16:22","maghrib":"19:01","isha":"20:16"},
    {"day":16,"fajr":"05:20","sunrise":"06:38","dhuhr":"12:53","asr":"16:22","maghrib":"19:00","isha":"20:15"},
    {"day":17,"fajr":"05:20","sunrise":"06:39","dhuhr":"12:52","asr":"16:21","maghrib":"18:59","isha":"20:14"},
    {"day":18,"fajr":"05:20","sunrise":"06:39","dhuhr":"12:52","asr":"16:20","maghrib":"18:57","isha":"20:12"},
    {"day":19,"fajr":"05:20","sunrise":"06:39","dhuhr":"12:52","asr":"16:20","maghrib":"18:56","isha":"20:11"},
    {"day":20,"fajr":"05:21","sunrise":"06:40","dhuhr":"12:51","asr":"16:20","maghrib":"18:55","isha":"20:10"},
    {"day":21,"fajr":"05:21","sunrise":"06:40","dhuhr":"12:51","asr":"16:18","maghrib":"18:53","isha":"20:08"},
    {"day":22,"fajr":"05:21","sunrise":"06:40","dhuhr":"12:51","asr":"16:18","maghrib":"18:52","isha":"20:06"},
    {"day":23,"fajr":"05:21","sunrise":"06:41","dhuhr":"12:51","asr":"16:17","maghrib":"18:51","isha":"20:05"},
    {"day":24,"fajr":"05:21","sunrise":"06:41","dhuhr":"12:50","asr":"16:16","maghrib":"18:50","isha":"20:04"},
    {"day":25,"fajr":"05:22","sunrise":"06:42","dhuhr":"12:50","asr":"16:16","maghrib":"18:49","isha":"20:03"},
    {"day":26,"fajr":"05:22","sunrise":"06:42","dhuhr":"12:50","asr":"16:16","maghrib":"18:48","isha":"20:02"},
    {"day":27,"fajr":"05:22","sunrise":"06:43","dhuhr":"12:50","asr":"16:15","maghrib":"18:47","isha":"20:01"},
    {"day":28,"fajr":"05:23","sunrise":"06:43","dhuhr":"12:49","asr":"16:14","maghrib":"18:46","isha":"20:00"},
    {"day":29,"fajr":"05:23","sunrise":"06:43","dhuhr":"12:49","asr":"16:13","maghrib":"18:45","isha":"19:59"},
    {"day":30,"fajr":"05:23","sunrise":"06:44","dhuhr":"12:49","asr":"16:12","maghrib":"18:44","isha":"19:58"}
  ];

  // ---------------- October ----------------
  const octoberTimes = [
    {"day":1,"fajr":"05:24","sunrise":"06:44","dhuhr":"12:49","asr":"16:11","maghrib":"18:43","isha":"19:57"},
    {"day":2,"fajr":"05:24","sunrise":"06:44","dhuhr":"12:48","asr":"16:11","maghrib":"18:42","isha":"19:56"},
    {"day":3,"fajr":"05:25","sunrise":"06:45","dhuhr":"12:48","asr":"16:10","maghrib":"18:41","isha":"19:55"},
    {"day":4,"fajr":"05:26","sunrise":"06:45","dhuhr":"12:48","asr":"16:10","maghrib":"18:40","isha":"19:54"},
    {"day":5,"fajr":"05:26","sunrise":"06:46","dhuhr":"12:47","asr":"16:09","maghrib":"18:39","isha":"19:53"},
    {"day":6,"fajr":"05:26","sunrise":"06:47","dhuhr":"12:47","asr":"16:08","maghrib":"18:38","isha":"19:52"},
    {"day":7,"fajr":"05:27","sunrise":"06:47","dhuhr":"12:47","asr":"16:08","maghrib":"18:37","isha":"19:51"},
    {"day":8,"fajr":"05:28","sunrise":"06:48","dhuhr":"12:47","asr":"16:07","maghrib":"18:36","isha":"19:50"},
    {"day":9,"fajr":"05:28","sunrise":"06:48","dhuhr":"12:47","asr":"16:06","maghrib":"18:35","isha":"19:49"},
    {"day":10,"fajr":"05:30","sunrise":"06:49","dhuhr":"12:47","asr":"16:06","maghrib":"18:35","isha":"19:49"},
    {"day":11,"fajr":"05:31","sunrise":"06:49","dhuhr":"12:47","asr":"16:05","maghrib":"18:34","isha":"19:48"},
    {"day":12,"fajr":"05:31","sunrise":"06:49","dhuhr":"12:47","asr":"16:05","maghrib":"18:32","isha":"19:47"},
    {"day":13,"fajr":"05:31","sunrise":"06:50","dhuhr":"12:46","asr":"16:04","maghrib":"18:31","isha":"19:46"},
    {"day":14,"fajr":"05:32","sunrise":"06:51","dhuhr":"12:46","asr":"16:03","maghrib":"18:31","isha":"19:45"},
    {"day":15,"fajr":"05:33","sunrise":"06:52","dhuhr":"12:46","asr":"16:03","maghrib":"18:30","isha":"19:44"},
    {"day":16,"fajr":"05:33","sunrise":"06:52","dhuhr":"12:46","asr":"16:02","maghrib":"18:29","isha":"19:43"},
    {"day":17,"fajr":"05:33","sunrise":"06:54","dhuhr":"12:46","asr":"16:01","maghrib":"18:28","isha":"19:43"},
    {"day":18,"fajr":"05:33","sunrise":"06:54","dhuhr":"12:46","asr":"16:01","maghrib":"18:27","isha":"19:42"},
    {"day":19,"fajr":"05:33","sunrise":"06:55","dhuhr":"12:46","asr":"16:00","maghrib":"18:26","isha":"19:41"},
    {"day":20,"fajr":"05:34","sunrise":"06:55","dhuhr":"12:46","asr":"16:00","maghrib":"18:25","isha":"19:40"},
    {"day":21,"fajr":"05:35","sunrise":"06:56","dhuhr":"12:46","asr":"15:59","maghrib":"18:24","isha":"19:39"},
    {"day":22,"fajr":"05:36","sunrise":"06:56","dhuhr":"12:46","asr":"15:59","maghrib":"18:24","isha":"19:39"},
    {"day":23,"fajr":"05:37","sunrise":"06:57","dhuhr":"12:46","asr":"15:58","maghrib":"18:23","isha":"19:38"},
    {"day":24,"fajr":"05:37","sunrise":"06:57","dhuhr":"12:46","asr":"15:57","maghrib":"18:22","isha":"19:37"},
    {"day":25,"fajr":"05:38","sunrise":"06:58","dhuhr":"12:46","asr":"15:56","maghrib":"18:21","isha":"19:36"},
    {"day":26,"fajr":"05:38","sunrise":"06:58","dhuhr":"12:46","asr":"15:56","maghrib":"18:20","isha":"19:35"},
    {"day":27,"fajr":"05:38","sunrise":"06:59","dhuhr":"12:46","asr":"15:55","maghrib":"18:19","isha":"19:34"},
    {"day":28,"fajr":"05:40","sunrise":"07:00","dhuhr":"12:46","asr":"15:54","maghrib":"18:19","isha":"19:34"},
    {"day":29,"fajr":"05:40","sunrise":"07:00","dhuhr":"12:46","asr":"15:54","maghrib":"18:18","isha":"19:33"},
    {"day":30,"fajr":"05:41","sunrise":"07:01","dhuhr":"12:46","asr":"15:54","maghrib":"18:17","isha":"19:32"},
    {"day":31,"fajr":"05:41","sunrise":"07:02","dhuhr":"12:46","asr":"15:53","maghrib":"18:16","isha":"19:31"}
  ];

  // ---------------- November ----------------
  const novemberTimes = [
    {"day":1,"fajr":"05:41","sunrise":"07:03","dhuhr":"12:46","asr":"15:52","maghrib":"18:15","isha":"19:30"},
    {"day":2,"fajr":"05:42","sunrise":"07:03","dhuhr":"12:46","asr":"15:52","maghrib":"18:15","isha":"19:30"},
    {"day":3,"fajr":"05:42","sunrise":"07:04","dhuhr":"12:46","asr":"15:52","maghrib":"18:14","isha":"19:29"},
    {"day":4,"fajr":"05:42","sunrise":"07:04","dhuhr":"12:46","asr":"15:51","maghrib":"18:13","isha":"19:28"},
    {"day":5,"fajr":"05:43","sunrise":"07:05","dhuhr":"12:46","asr":"15:50","maghrib":"18:12","isha":"19:27"},
    {"day":6,"fajr":"05:44","sunrise":"07:05","dhuhr":"12:46","asr":"15:50","maghrib":"18:12","isha":"19:27"},
    {"day":7,"fajr":"05:44","sunrise":"07:05","dhuhr":"12:46","asr":"15:49","maghrib":"18:11","isha":"19:26"},
    {"day":8,"fajr":"05:45","sunrise":"07:06","dhuhr":"12:47","asr":"15:49","maghrib":"18:11","isha":"19:26"},
    {"day":9,"fajr":"05:45","sunrise":"07:07","dhuhr":"12:47","asr":"15:48","maghrib":"18:10","isha":"19:25"},
    {"day":10,"fajr":"05:46","sunrise":"07:08","dhuhr":"12:48","asr":"15:48","maghrib":"18:10","isha":"19:25"},
    {"day":11,"fajr":"05:48","sunrise":"07:09","dhuhr":"12:48","asr":"15:48","maghrib":"18:10","isha":"19:25"},
    {"day":12,"fajr":"05:48","sunrise":"07:10","dhuhr":"12:48","asr":"15:48","maghrib":"18:09","isha":"19:24"},
    {"day":13,"fajr":"05:49","sunrise":"07:11","dhuhr":"12:49","asr":"15:47","maghrib":"18:09","isha":"19:24"},
    {"day":14,"fajr":"05:49","sunrise":"07:11","dhuhr":"12:49","asr":"15:47","maghrib":"18:08","isha":"19:23"},
    {"day":15,"fajr":"05:50","sunrise":"07:12","dhuhr":"12:49","asr":"15:47","maghrib":"18:08","isha":"19:23"},
    {"day":16,"fajr":"05:50","sunrise":"07:13","dhuhr":"12:49","asr":"15:47","maghrib":"18:07","isha":"19:22"},
    {"day":17,"fajr":"05:51","sunrise":"07:14","dhuhr":"12:49","asr":"15:47","maghrib":"18:07","isha":"19:22"},
    {"day":18,"fajr":"05:52","sunrise":"07:15","dhuhr":"12:50","asr":"15:47","maghrib":"18:07","isha":"19:22"},
    {"day":19,"fajr":"05:52","sunrise":"07:16","dhuhr":"12:51","asr":"15:47","maghrib":"18:07","isha":"19:22"},
    {"day":20,"fajr":"05:53","sunrise":"07:16","dhuhr":"12:51","asr":"15:47","maghrib":"18:07","isha":"19:22"},
    {"day":21,"fajr":"05:53","sunrise":"07:17","dhuhr":"12:51","asr":"15:46","maghrib":"18:06","isha":"19:22"},
    {"day":22,"fajr":"05:54","sunrise":"07:18","dhuhr":"12:51","asr":"15:46","maghrib":"18:06","isha":"19:22"},
    {"day":23,"fajr":"05:54","sunrise":"07:18","dhuhr":"12:52","asr":"15:46","maghrib":"18:06","isha":"19:22"},
    {"day":24,"fajr":"05:54","sunrise":"07:18","dhuhr":"12:52","asr":"15:46","maghrib":"18:05","isha":"19:21"},
    {"day":25,"fajr":"05:55","sunrise":"07:19","dhuhr":"12:52","asr":"15:46","maghrib":"18:05","isha":"19:21"},
    {"day":26,"fajr":"05:56","sunrise":"07:20","dhuhr":"12:53","asr":"15:46","maghrib":"18:05","isha":"19:21"},
    {"day":27,"fajr":"05:57","sunrise":"07:21","dhuhr":"12:53","asr":"15:46","maghrib":"18:05","isha":"19:21"},
    {"day":28,"fajr":"05:57","sunrise":"07:22","dhuhr":"12:53","asr":"15:46","maghrib":"18:05","isha":"19:21"},
    {"day":29,"fajr":"05:58","sunrise":"07:22","dhuhr":"12:54","asr":"15:46","maghrib":"18:05","isha":"19:21"},
    {"day":30,"fajr":"05:58","sunrise":"07:23","dhuhr":"12:54","asr":"15:46","maghrib":"18:05","isha":"19:22"}
  ];

  // ---------------- December ----------------
  const decemberTimes = [
    {"day":1,"fajr":"05:59","sunrise":"07:23","dhuhr":"12:54","asr":"15:46","maghrib":"18:05","isha":"19:22"},
    {"day":2,"fajr":"05:59","sunrise":"07:24","dhuhr":"12:55","asr":"15:46","maghrib":"18:05","isha":"19:22"},
    {"day":3,"fajr":"06:00","sunrise":"07:25","dhuhr":"12:55","asr":"15:46","maghrib":"18:05","isha":"19:22"},
    {"day":4,"fajr":"06:00","sunrise":"07:26","dhuhr":"12:56","asr":"15:46","maghrib":"18:05","isha":"19:22"},
    {"day":5,"fajr":"06:01","sunrise":"07:26","dhuhr":"12:56","asr":"15:46","maghrib":"18:05","isha":"19:22"},
    {"day":6,"fajr":"06:02","sunrise":"07:27","dhuhr":"12:57","asr":"15:46","maghrib":"18:05","isha":"19:22"},
    {"day":7,"fajr":"06:02","sunrise":"07:28","dhuhr":"12:57","asr":"15:47","maghrib":"18:05","isha":"19:22"},
    {"day":8,"fajr":"06:02","sunrise":"07:29","dhuhr":"12:57","asr":"15:47","maghrib":"18:05","isha":"19:22"},
    {"day":9,"fajr":"06:03","sunrise":"07:30","dhuhr":"12:58","asr":"15:47","maghrib":"18:05","isha":"19:22"},
    {"day":10,"fajr":"06:04","sunrise":"07:31","dhuhr":"12:59","asr":"15:48","maghrib":"18:06","isha":"19:24"},
    {"day":11,"fajr":"06:04","sunrise":"07:31","dhuhr":"12:59","asr":"15:48","maghrib":"18:06","isha":"19:24"},
    {"day":12,"fajr":"06:04","sunrise":"07:31","dhuhr":"12:59","asr":"15:48","maghrib":"18:06","isha":"19:24"},
    {"day":13,"fajr":"06:05","sunrise":"07:32","dhuhr":"13:00","asr":"15:48","maghrib":"18:06","isha":"19:24"},
    {"day":14,"fajr":"06:06","sunrise":"07:33","dhuhr":"13:01","asr":"15:49","maghrib":"18:07","isha":"19:25"},
    {"day":15,"fajr":"06:06","sunrise":"07:33","dhuhr":"13:01","asr":"15:49","maghrib":"18:07","isha":"19:25"},
    {"day":16,"fajr":"06:07","sunrise":"07:34","dhuhr":"13:01","asr":"15:49","maghrib":"18:07","isha":"19:25"},
    {"day":17,"fajr":"06:08","sunrise":"07:35","dhuhr":"13:02","asr":"15:50","maghrib":"18:08","isha":"19:26"},
    {"day":18,"fajr":"06:08","sunrise":"07:35","dhuhr":"13:03","asr":"15:50","maghrib":"18:08","isha":"19:26"},
    {"day":19,"fajr":"06:08","sunrise":"07:35","dhuhr":"13:03","asr":"15:50","maghrib":"18:08","isha":"19:26"},
    {"day":20,"fajr":"06:08","sunrise":"07:35","dhuhr":"13:03","asr":"15:51","maghrib":"18:08","isha":"19:27"},
    {"day":21,"fajr":"06:09","sunrise":"07:36","dhuhr":"13:04","asr":"15:51","maghrib":"18:09","isha":"19:28"},
    {"day":22,"fajr":"06:09","sunrise":"07:36","dhuhr":"13:04","asr":"15:51","maghrib":"18:09","isha":"19:28"},
    {"day":23,"fajr":"06:10","sunrise":"07:37","dhuhr":"13:05","asr":"15:52","maghrib":"18:10","isha":"19:29"},
    {"day":24,"fajr":"06:10","sunrise":"07:37","dhuhr":"13:05","asr":"15:52","maghrib":"18:10","isha":"19:29"},
    {"day":25,"fajr":"06:11","sunrise":"07:38","dhuhr":"13:05","asr":"15:53","maghrib":"18:11","isha":"19:30"},
    {"day":26,"fajr":"06:12","sunrise":"07:39","dhuhr":"13:06","asr":"15:54","maghrib":"18:12","isha":"19:31"},
    {"day":27,"fajr":"06:12","sunrise":"07:39","dhuhr":"13:06","asr":"15:54","maghrib":"18:12","isha":"19:31"},
    {"day":28,"fajr":"06:12","sunrise":"07:40","dhuhr":"13:07","asr":"15:55","maghrib":"18:13","isha":"19:32"},
    {"day":29,"fajr":"06:13","sunrise":"07:40","dhuhr":"13:08","asr":"15:56","maghrib":"18:14","isha":"19:33"},
    {"day":30,"fajr":"06:13","sunrise":"07:40","dhuhr":"13:08","asr":"15:56","maghrib":"18:14","isha":"19:33"},
    {"day":31,"fajr":"06:13","sunrise":"07:41","dhuhr":"13:09","asr":"15:57","maghrib":"18:15","isha":"19:34"}
  ];

  const allMonthsTimes = {
    1: januaryTimes, 2: februaryTimes, 3: marchTimes,
    4: aprilTimes, 5: mayTimes, 6: juneTimes,
    7: julyTimes, 8: augustTimes, 9: septemberTimes,
    10: octoberTimes, 11: novemberTimes, 12: decemberTimes
  };

  const monthNames = {
    1: "يناير", 2: "فبراير", 3: "مارس", 4: "إبريل",
    5: "مايو", 6: "يونيو", 7: "يوليو", 8: "أغسطس",
    9: "سبتمبر", 10: "أكتوبر", 11: "نوفمبر", 12: "ديسمبر"
  };

  // الإقامة بالدقائق
  const iqamaMinutes = {
    fajr: 20, sunrise: 0, dhuhr: 15, asr: 15,
    maghrib: 5, isha: 15
  };

  const prayerMeta = [
    { key: "fajr",    name: "صلاة الفجر" },
    { key: "sunrise", name: "الشروق" },
    { key: "dhuhr",   name: "صلاة الظهر" },
    { key: "asr",     name: "صلاة العصر" },
    { key: "maghrib", name: "صلاة المغرب" },
    { key: "isha",    name: "صلاة العشاء" }
  ];

  return {
    allMonthsTimes,
    monthNames,
    iqamaMinutes,
    prayerMeta
  };
}
)();

// Expose globally for browser scripts (safe-guarded for Node tooling)
if (typeof window !== 'undefined') {
  window.PrayerData = PrayerData;
}