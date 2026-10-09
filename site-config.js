/* =========================================================
   site-config.js
   Firestore থেকে সাইট কনফিগ লোড করে। যদি কোনো ফিল্ড না থাকে,
   ডিফল্ট মান ব্যবহার করে। সব পেজ এই ফাইল থেকে কনফিগ নেবে।
   ========================================================= */

import { db, doc, getDoc, setDoc, serverTimestamp } from './firebase-config.js';

/* =========================================================
   ডিফল্ট কনফিগ — অ্যাডমিন কিছু সেট না করলে এটাই দেখাবে।
   এখানে যা আছে সবই বাংলায়। ইংরেজি ভার্সনও দেওয়া আছে।
   ========================================================= */
export const DEFAULT_CONFIG = {
  /* ব্র্যান্ড */
  brand_name_bn: 'বন্ধু কুইজ',
  brand_name_en: 'Bondhu Quiz',
  brand_tag_bn: 'বন্ধুত্বের মজার পরীক্ষা',
  brand_tag_en: 'Fun friendship test',
  logo_image: 'images/logo.png',
  default_lang: 'bn',

  /* হোম — হিরো */
  hero_title_bn: 'তুই আমাকে কতটা চিনিস?',
  hero_title_en: 'How well do you really know me?',
  hero_subtitle_bn: 'বন্ধুত্বের মজার পরীক্ষা! নিজের কুইজ বানিয়ে বন্ধুকে পাঠিয়ে দে।',
  hero_subtitle_en: 'A fun friendship test! Make a quiz about yourself and send it to your friends.',
  hero_badge_bn: '১০০% ফ্রি • বন্ধুত্বের মজা',
  hero_badge_en: '100% free • Made for fun',
  hero_image: 'images/hero-friends.png',
  hero_emoji_1: '🍛',
  hero_emoji_2: '🎵',
  hero_emoji_3: '🎂',
  hero_fact1_bn: '২ মিনিটে তৈরি',
  hero_fact1_en: 'Ready in 2 minutes',
  hero_fact2_bn: 'লিংক শেয়ার করো',
  hero_fact2_en: 'Share the link',
  hero_fact3_bn: 'স্কোরবোর্ড দেখো',
  hero_fact3_en: 'See the scoreboard',

  /* হোম — ৩টি ধাপ */
  steps_title_bn: 'কীভাবে কাজ করে?',
  steps_title_en: 'How it works',
  step1_title_bn: 'নিজের নাম দিয়ে কুইজ বানাও।',
  step1_title_en: 'Create a quiz with your name.',
  step1_emoji: '✍️',
  step1_text_bn: 'তোর নাম বা ডাকনাম দিয়ে কুইজ শুরু কর।',
  step1_text_en: 'Start with your name or nickname.',
  step2_title_bn: 'সঠিক উত্তরগুলো নির্বাচন করো।',
  step2_title_en: 'Pick the correct answers.',
  step2_emoji: '✅',
  step2_text_bn: 'যেটা তোর সম্পর্কে সত্যি, সেটাই সঠিক উত্তর।',
  step2_text_en: 'The truth about you is the correct answer.',
  step3_title_bn: 'লিংক বন্ধুকে পাঠাও।',
  step3_title_en: 'Send the link to your friends.',
  step3_emoji: '📤',
  step3_text_bn: 'শেয়ার লিংক কপি করে বন্ধুকে পাঠা।',
  step3_text_en: 'Copy the share link and send it to your friend.',

  /* কীভাবে খেলতে হয় */
  howto_title_bn: 'কীভাবে খেলতে হয়?',
  howto_title_en: 'How to play?',
  howto_image: 'images/friendship.png',

  /* ছবি/ইমোজি ছাড়া ক্যাটাগরির ডিফল্ট */
  default_category_image: 'images/default-question.png',
  default_category_emoji: '❓',

  /* ক্যাটাগরি — প্রতিটার ছবি, ইমোজি, লেবেল কাস্টমাইজ করা যায় */
  categories: {
    food:     { label_bn: 'খাবার',      label_en: 'Food',            image: 'images/food-biryani.png',  emoji: '🍛' },
    colour:   { label_bn: 'প্রিয় রং',    label_en: 'Favourite colour',image: 'images/colour.png',        emoji: '🎨' },
    music:    { label_bn: 'প্রিয় গান',   label_en: 'Favourite song',  image: 'images/music.png',         emoji: '🎵' },
    movie:    { label_bn: 'প্রিয় সিনেমা',label_en: 'Favourite movie', image: 'images/movie.png',         emoji: '🎬' },
    travel:   { label_bn: 'ভ্রমণ',       label_en: 'Travel',          image: 'images/travel.png',        emoji: '✈️' },
    birthday: { label_bn: 'জন্মদিন',     label_en: 'Birthday',        image: 'images/birthday.png',      emoji: '🎂' },
    sport:    { label_bn: 'খেলা',        label_en: 'Sports',          image: 'images/football.png',      emoji: '⚽' },
    books:    { label_bn: 'বই',          label_en: 'Books',           image: 'images/books.png',         emoji: '📚' }
  },

  /* প্রশ্নের টেমপ্লেট — প্রতিটার লেখা, ছবি, ইমোজি, ৪টি অপশন কাস্টমাইজ করা যায় */
  templates: {
    food: {
      q_bn: '{name}ের পছন্দের খাবার কী?',
      q_en: 'What is {name}’s favourite food?',
      image: 'images/food-biryani.png',
      emoji: '🍛',
      options: [
        { text_bn: 'বিরিয়ানি', text_en: 'Biryani', image: 'images/food-biryani.png'  },
        { text_bn: 'পিৎজা',    text_en: 'Pizza',   image: 'images/food-pizza.png'    },
        { text_bn: 'চাউমিন',   text_en: 'Chowmein',image: 'images/food-chowmein.png' },
        { text_bn: 'ভাত-মাছ',  text_en: 'Rice & fish', image: 'images/default-question.png' }
      ]
    },
    colour: {
      q_bn: '{name}ের প্রিয় রং কী?',
      q_en: 'What is {name}’s favourite colour?',
      image: 'images/colour.png',
      emoji: '🎨',
      options: [
        { text_bn: 'নীল',  text_en: 'Blue',  image: 'images/colour.png' },
        { text_bn: 'লাল',  text_en: 'Red',   image: 'images/colour.png' },
        { text_bn: 'সবুজ', text_en: 'Green', image: 'images/colour.png' },
        { text_bn: 'কালো', text_en: 'Black', image: 'images/colour.png' }
      ]
    },
    music: {
      q_bn: '{name}ের প্রিয় গান কোনটি?',
      q_en: 'Which song does {name} love the most?',
      image: 'images/music.png',
      emoji: '🎵',
      options: [
        { text_bn: 'গান ১', text_en: 'Song A', image: 'images/music.png' },
        { text_bn: 'গান ২', text_en: 'Song B', image: 'images/music.png' },
        { text_bn: 'গান ৩', text_en: 'Song C', image: 'images/music.png' },
        { text_bn: 'গান ৪', text_en: 'Song D', image: 'images/music.png' }
      ]
    },
    movie: {
      q_bn: '{name}ের প্রিয় সিনেমা কোনটি?',
      q_en: 'What is {name}’s favourite movie?',
      image: 'images/movie.png',
      emoji: '🎬',
      options: [
        { text_bn: 'সিনেমা ১', text_en: 'Movie 1', image: 'images/movie.png' },
        { text_bn: 'সিনেমা ২', text_en: 'Movie 2', image: 'images/movie.png' },
        { text_bn: 'সিনেমা ৩', text_en: 'Movie 3', image: 'images/movie.png' },
        { text_bn: 'সিনেমা ৪', text_en: 'Movie 4', image: 'images/movie.png' }
      ]
    },
    travel: {
      q_bn: '{name}ের প্রিয় জায়গা কোনটি?',
      q_en: 'Where does {name} love to travel?',
      image: 'images/travel.png',
      emoji: '✈️',
      options: [
        { text_bn: 'পাহাড়', text_en: 'Mountains', image: 'images/travel.png' },
        { text_bn: 'সমুদ্র', text_en: 'Beach',     image: 'images/travel.png' },
        { text_bn: 'গ্রাম',  text_en: 'Village',   image: 'images/travel.png' },
        { text_bn: 'বিদেশ', text_en: 'Abroad',    image: 'images/travel.png' }
      ]
    },
    birthday: {
      q_bn: '{name}ের জন্মদিন কবে?',
      q_en: 'When is {name}’s birthday?',
      image: 'images/birthday.png',
      emoji: '🎂',
      options: [
        { text_bn: '১ জানুয়ারি',  text_en: '1 Jan',  image: 'images/birthday.png' },
        { text_bn: '১৫ আগস্ট',    text_en: '15 Aug', image: 'images/birthday.png' },
        { text_bn: '১০ ডিসেম্বর', text_en: '10 Dec', image: 'images/birthday.png' },
        { text_bn: '২৫ মার্চ',     text_en: '25 Mar', image: 'images/birthday.png' }
      ]
    },
    sport: {
      q_bn: '{name}ের প্রিয় খেলা কী?',
      q_en: 'What is {name}’s favourite sport?',
      image: 'images/football.png',
      emoji: '⚽',
      options: [
        { text_bn: 'ফুটবল',      text_en: 'Football',  image: 'images/football.png' },
        { text_bn: 'ক্রিকেট',     text_en: 'Cricket',   image: 'images/cricket.png'  },
        { text_bn: 'ব্যাডমিন্টন', text_en: 'Badminton', image: 'images/default-question.png' },
        { text_bn: 'দাবা',       text_en: 'Chess',     image: 'images/default-question.png' }
      ]
    },
    books: {
      q_bn: '{name}ের প্রিয় বই কোনটি?',
      q_en: 'What is {name}’s favourite book?',
      image: 'images/books.png',
      emoji: '📚',
      options: [
        { text_bn: 'উপন্যাস',  text_en: 'Novel',        image: 'images/books.png' },
        { text_bn: 'কবিতা',     text_en: 'Poetry',       image: 'images/books.png' },
        { text_bn: 'গল্পের বই', text_en: 'Short stories',image: 'images/books.png' },
        { text_bn: 'বিজ্ঞান',   text_en: 'Science',      image: 'images/books.png' }
      ]
    }
  },

  /* কুইজ পেজের লেখা */
  quiz_intro_eyebrow_bn: 'বন্ধুত্বের মজার পরীক্ষা',
  quiz_intro_eyebrow_en: 'A fun friendship test',
  quiz_nick_label_bn: 'তোমার ডাকনাম',
  quiz_nick_label_en: 'Your nickname',
  quiz_start_button_bn: 'খেলা শুরু করো',
  quiz_start_button_en: 'Start playing',

  /* রেজাল্ট মেসেজ — ৪টি স্তর */
  tier_perfect_bn: 'তুই তো {name}র মনের কথাও জানিস! 💖',
  tier_perfect_en: 'You know {name} so well, even their deepest thoughts! 💖',
  tier_great_bn: 'ওয়াও! তুই ওকে বেশ ভালোই চিনিস! 🥰',
  tier_great_en: 'Wow! You really know them well! 🥰',
  tier_mid_bn: 'আরও একটু জান, বন্ধু! 😄',
  tier_mid_en: 'Keep learning, friend! 😄',
  tier_low_bn: 'বন্ধুত্বের ক্লাসে আবার ভর্তি হ! 😂',
  tier_low_en: 'Sign up for Friendship 101! 😂',

  /* যোগাযোগ পেজ */
  contact_title_bn: 'আমাদের কিছু বলতে চাস?',
  contact_title_en: 'Got something to tell us?',
  contact_sub_bn: 'বাগ পেলে বা নতুন ফিচার চাইলে আমাদের জানাও।',
  contact_sub_en: 'Found a bug or want a new feature? Let us know.',

  /* প্রাইভেসি পেজ */
  privacy_title_bn: 'প্রাইভেসি পলিসি',
  privacy_title_en: 'Privacy Policy',

  /* শর্তাবলি পেজ */
  terms_title_bn: 'শর্তাবলি',
  terms_title_en: 'Terms & Conditions',

  /* মেটা */
  config_version: 1
};

/* =========================================================
   কনফিগ ক্যাশ
   ========================================================= */
let cached = null;
let loadingPromise = null;

/** Firestore থেকে কনফিগ লোড করে। ক্যাশ করা থাকে। */
export async function loadSiteConfig() {
  if (cached) return cached;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const ref = doc(db, 'site_config', 'main');
      const snap = await getDoc(ref);
      if (snap.exists()) {
        cached = deepMerge(structuredClone(DEFAULT_CONFIG), snap.data());
      } else {
        cached = structuredClone(DEFAULT_CONFIG);
      }
    } catch (err) {
      console.warn('[site-config] load failed, using defaults:', err);
      cached = structuredClone(DEFAULT_CONFIG);
    }
    loadingPromise = null;
    return cached;
  })();

  return loadingPromise;
}

/** ক্যাশ পরিষ্কার করো (অ্যাডমিন প্যানেল থেকে সেভ করার পরে দরকার হয়)। */
export function clearSiteConfigCache() {
  cached = null;
  loadingPromise = null;
}

/** অ্যাডমিন প্যানেল থেকে নতুন কনফিগ Firestore-এ সেভ করো। */
export async function saveSiteConfig(partialConfig) {
  const ref = doc(db, 'site_config', 'main');
  const current = cached || DEFAULT_CONFIG;
  const merged = deepMerge(structuredClone(current), partialConfig);
  merged.updatedAt = serverTimestamp();
  await setDoc(ref, merged, { merge: true });
  cached = merged;
  return merged;
}

/* =========================================================
   Helper: একটা string key-এর মান বের করো।
   বাংলা হলে `_bn`, ইংরেজি হলে `_en` অ্যাড করে খুঁজবে।
   ========================================================= */
export function cfgText(config, baseKey, lang) {
  if (!config) return '';
  const key = lang === 'en' ? `${baseKey}_en` : `${baseKey}_bn`;
  return config[key] || config[`${baseKey}_bn`] || '';
}

/* ---------- internals ---------- */
function deepMerge(target, source) {
  if (!source) return target;
  for (const k of Object.keys(source)) {
    const sv = source[k];
    if (sv && typeof sv === 'object' && !Array.isArray(sv) && !(sv instanceof Date)) {
      target[k] = deepMerge(target[k] || {}, sv);
    } else {
      target[k] = sv;
    }
  }
  return target;
}
