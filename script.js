// =======================
// AOS INIT (kept, harmless)
// =======================
AOS.init({
  once: false,
  duration: 900,
  easing: "ease-out-cubic",
  mirror: true
});

// =======================
// THEME TOGGLE
// =======================
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark") ? "dark" : "light"
  );
});

// =======================
// LANGUAGE TRANSLATION
// =======================
const langToggle = document.getElementById("lang-toggle");
const langLabel = langToggle.querySelector(".lang-text");
const translatableEls = document.querySelectorAll("[data-key]");
const authorEl = document.getElementById("quote-author");

let currentLang = "en";

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_highlights: "Highlights",
    nav_stats: "Stats",
    nav_gallery: "Gallery",
    nav_timeline: "Timeline",

    hero_name: "Virat Kohli",
    hero_tagline: "Indian Cricketer • Former Captain • Global Icon",
    hero_matches: "Matches",
    hero_centuries: "Centuries",
    hero_fans: "M+ Fans",

    about_title: "About",
    about_p1: "Virat Kohli is one of the most influential cricketers of the modern era.",
    about_p2: "His journey reflects discipline, leadership and resilience.",

    trait_1: "Aggressive Mindset",
    trait_2: "Elite Consistency",
    trait_3: "Leadership",
    trait_4: "Discipline",

    highlights_title: "Career Highlights",
    hl_2011: "ICC Cricket World Cup Winner",
    hl_2013: "Champions Trophy Winner",
    hl_2017: "Full-time Captain",
    hl_2023: "World Cup Record Performance",

    stats_title: "Performance Overview",
    stat_avg: "Career Batting Average",
    stat_sr: "Strike Rate",
    stat_win: "Match Win Contribution",
    stat_mom: "Man of the Match Awards",

    timeline_title: "Career Timeline",
    tl_2008: "International debut for India",
    tl_desc_2008: "Made his ODI debut against Sri Lanka.",
    tl_2013: "Champions Trophy victory",
    tl_desc_2013: "Played a key role in India's unbeaten campaign.",
    tl_2017: "Became full-time captain",
    tl_desc_2017: "Transformed India's fitness culture and mindset.",
    tl_2023: "World Cup milestones & legacy",
    tl_desc_2023: "Finished as the highest run-scorer of the tournament.",

    quote_text: "Self-belief and hard work will always earn you success.",
    quote_author: "— Virat Kohli"
  },

  hi: {
    nav_home: "होम",
    nav_about: "परिचय",
    nav_highlights: "उपलब्धियाँ",
    nav_stats: "आँकड़े",
    nav_gallery: "गैलरी",
    nav_timeline: "समयरेखा",

    hero_name: "विराट कोहली",
    hero_tagline: "भारतीय क्रिकेटर • पूर्व कप्तान • वैश्विक आइकन",
    hero_matches: "मैच",
    hero_centuries: "शतक",
    hero_fans: "मिलियन+ प्रशंसक",

    about_title: "परिचय",
    about_p1: "विराट कोहली आधुनिक युग के सबसे प्रभावशाली क्रिकेटरों में से एक हैं।",
    about_p2: "उनकी यात्रा अनुशासन, नेतृत्व और दृढ़ संकल्प को दर्शाती है।",

    trait_1: "आक्रामक मानसिकता",
    trait_2: "असाधारण निरंतरता",
    trait_3: "नेतृत्व",
    trait_4: "अनुशासन",

    highlights_title: "करियर उपलब्धियाँ",
    hl_2011: "आईसीसी क्रिकेट विश्व कप विजेता",
    hl_2013: "चैंपियंस ट्रॉफी विजेता",
    hl_2017: "पूर्णकालिक कप्तान बने",
    hl_2023: "विश्व कप रिकॉर्ड प्रदर्शन",

    stats_title: "प्रदर्शन अवलोकन",
    stat_avg: "करियर बल्लेबाजी औसत",
    stat_sr: "स्ट्राइक रेट",
    stat_win: "मैच जीत योगदान",
    stat_mom: "मैन ऑफ द मैच पुरस्कार",

    timeline_title: "करियर समयरेखा",
    tl_2008: "भारत के लिए अंतरराष्ट्रीय पदार्पण",
    tl_desc_2008: "श्रीलंका के खिलाफ वनडे पदार्पण किया।",
    tl_2013: "चैंपियंस ट्रॉफी जीत",
    tl_desc_2013: "अपराजित अभियान में अहम भूमिका निभाई।",
    tl_2017: "पूर्णकालिक कप्तान बने",
    tl_desc_2017: "फिटनेस और आक्रामक संस्कृति को बदला।",
    tl_2023: "विश्व कप विरासत",
    tl_desc_2023: "टूर्नामेंट में सर्वाधिक रन बनाए।",

    quote_text: "खुद पर विश्वास और कड़ी मेहनत हमेशा सफलता दिलाती है।",
    quote_author: "— विराट कोहली"
  }
};

function updateLanguage() {
  translatableEls.forEach(el => {
    const key = el.dataset.key;
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  authorEl.textContent = translations[currentLang].quote_author;
  quoteTyped = false;
  typeQuote(getRandomQuote());

}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "hi" : "en";
  langLabel.textContent = currentLang.toUpperCase();
  updateLanguage();
});

// =======================
// TYPING QUOTE (SLOW + REPEATABLE)
// =======================
const quoteEl = document.getElementById("typed-quote");
const cursorEl = document.getElementById("cursor");
let typingTimer;

const quotes = {
  en: [
    "Self-belief and hard work will always earn you success!",
    "Confidence and hard work are the best shots you can play!",
    "Pressure is something you feel when you don’t know what you’re doing!",
    "I love challenges because they push me to grow!",
    "You have to stay true to yourself and back yourself!"
  ],
  hi: [
    "खुद पर विश्वास और कड़ी मेहनत हमेशा सफलता दिलाती है!",
    "चुनौतियाँ आपको बेहतर बनाती हैं!",
    "आत्मविश्वास ही सबसे बड़ी ताकत है!",
    "मेहनत का कोई विकल्प नहीं होता!",
    "खुद को साबित करने से मत डरिए!"
  ]
};


function typeQuote(text) {
  clearInterval(typingTimer);

  quoteEl.textContent = "";
  authorEl.classList.remove("show");

  cursorEl.style.display = "inline";
  cursorEl.classList.add("blinking");

  let i = 0;

  typingTimer = setInterval(() => {
    if (i < text.length) {
      quoteEl.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingTimer);

      // stop cursor after typing
      cursorEl.classList.remove("blinking");
      cursorEl.style.display = "none";

      // show author
      authorEl.classList.add("show");
    }
  }, 80);
}
function getRandomQuote() {
  const list = quotes[currentLang] || quotes.en;
  return list[Math.floor(Math.random() * list.length)];
}

/// =======================
// QUOTE — TYPE ONLY AFTER USER SCROLLS INTO VIEW
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const quoteSection = document.querySelector(".quote");
  if (!quoteSection) return;

  let hasTyped = false;
  let userHasScrolled = false;

  // detect real user scroll
  window.addEventListener("scroll", () => {
    userHasScrolled = true;
  }, { once: true });

  const quoteObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        // 🚨 STRICT CONDITIONS
        if (
          entry.isIntersecting &&
          userHasScrolled &&   // 🔑 must scroll first
          !hasTyped
        ) {
          hasTyped = true;
          typeQuote(getRandomQuote());
        }

        // reset when leaving viewport
        if (!entry.isIntersecting) {
          hasTyped = false;
        }
      });
    },
    {
      threshold: 0.65 // only when clearly inside view
    }
  );

  quoteObserver.observe(quoteSection);
});

// =======================
// GLOBAL INTERSECTION OBSERVER (REPEATABLE)
// =======================
function observeElements(selector, className, threshold = 0.4) {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
      } else {
        entry.target.classList.remove(className);
      }
    });
  }, { threshold });

  elements.forEach(el => observer.observe(el));
}

// Highlights
observeElements(".highlight-item", "show", 0.35);
// =======================
// GALLERY – STAGGERED REVEAL ON SCROLL
// =======================
const galleryItems = document.querySelectorAll(".gallery-item");

const galleryObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        galleryItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("show");
          }, index * 150); // ⏱ stagger delay
        });
        galleryObserver.disconnect(); // animate only once
      }
    });
  },
  { threshold: 0.3 }
);

galleryItems.forEach(item => galleryObserver.observe(item));


// Timeline
observeElements(".timeline-item", "active", 0.4);

// =======================
// STATS COUNTERS + BARS (FINAL FIX)
// =======================
const statItems = document.querySelectorAll(".stat-item");

const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const item = entry.target;
      const valueEl = item.querySelector(".stat-value");
      const fill = item.querySelector(".stat-fill");

      if (!valueEl) return;

      const target = parseFloat(valueEl.dataset.target);
      const suffix = valueEl.dataset.suffix || "";

      if (entry.isIntersecting) {
        item.classList.add("show");

        let current = 0;
        const increment = target / 80;

        function animate() {
          current += increment;
          if (current < target) {
            valueEl.textContent =
              (Number.isInteger(target)
                ? Math.floor(current)
                : current.toFixed(1)) + suffix;
            requestAnimationFrame(animate);
          } else {
            valueEl.textContent = target + suffix;
          }
        }

        animate();

        if (fill) fill.style.width = fill.dataset.fill + "%";
      } else {
        item.classList.remove("show");
        valueEl.textContent = "0" + suffix;
        if (fill) fill.style.width = "0%";
      }
    });
  },
  { threshold: 0.45 }
);

statItems.forEach(item => statsObserver.observe(item));

// =======================
// HERO COUNTERS (FINAL FIX)
// =======================
const heroCounters = document.querySelectorAll(".hero-counter");

const heroCounterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);

      if (entry.isIntersecting) {
        let current = 0;
        const increment = Math.ceil(target / 80);

        function animate() {
          current += increment;
          if (current < target) {
            el.textContent = current;
            requestAnimationFrame(animate);
          } else {
            el.textContent = target;
          }
        }

        animate();
      } else {
        el.textContent = "0";
      }
    });
  },
  { threshold: 0.6 }
);

heroCounters.forEach(counter =>
  heroCounterObserver.observe(counter)
);

// =======================
// NAVBAR ACTIVE LINK
// =======================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    const height = section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// =======================
// INIT
// =======================
updateLanguage();
