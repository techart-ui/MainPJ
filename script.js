// ===== Translations =====
const translations = {
    ko: {
        intro: "사이트와 툴을 만들고 있습니다",
        title: "Playground",
        project1: "지구는 돈다",
        project1_desc: "지구의 자전을 시각적으로 표현",
        project2: "글자수 계산기",
        project2_desc: "텍스트의 글자 수를 계산",
        coming_soon: "준비 중",
        coming_soon_desc: "새로운 프로젝트",
        lang_name: "한국어"
    },
    en: {
        intro: "Creating websites and tools",
        title: "Playground",
        project1: "The Earth Rotates",
        project1_desc: "Visualizing Earth's rotation",
        project2: "Character Counter",
        project2_desc: "Count characters in text",
        coming_soon: "Coming Soon",
        coming_soon_desc: "New project",
        lang_name: "English"
    },
    ja: {
        intro: "サイトとツールを作っています",
        title: "Playground",
        project1: "地球は回る",
        project1_desc: "地球の自転を視覚的に表現",
        project2: "文字数カウンター",
        project2_desc: "テキストの文字数を計算",
        coming_soon: "準備中",
        coming_soon_desc: "新しいプロジェクト",
        lang_name: "日本語"
    },
    zh: {
        intro: "正在制作网站和工具",
        title: "Playground",
        project1: "地球在转动",
        project1_desc: "可视化地球自转",
        project2: "字数计算器",
        project2_desc: "计算文本字数",
        coming_soon: "即将推出",
        coming_soon_desc: "新项目",
        lang_name: "中文"
    },
    fr: {
        intro: "Je crée des sites et des outils",
        title: "Playground",
        project1: "La Terre tourne",
        project1_desc: "Visualisation de la rotation terrestre",
        project2: "Compteur de caractères",
        project2_desc: "Compter les caractères du texte",
        coming_soon: "Bientôt",
        coming_soon_desc: "Nouveau projet",
        lang_name: "Français"
    },
    de: {
        intro: "Ich erstelle Websites und Tools",
        title: "Playground",
        project1: "Die Erde dreht sich",
        project1_desc: "Visualisierung der Erdrotation",
        project2: "Zeichenzähler",
        project2_desc: "Zeichen im Text zählen",
        coming_soon: "Demnächst",
        coming_soon_desc: "Neues Projekt",
        lang_name: "Deutsch"
    },
    es: {
        intro: "Creando sitios web y herramientas",
        title: "Playground",
        project1: "La Tierra gira",
        project1_desc: "Visualización de la rotación terrestre",
        project2: "Contador de caracteres",
        project2_desc: "Contar caracteres del texto",
        coming_soon: "Próximamente",
        coming_soon_desc: "Nuevo proyecto",
        lang_name: "Español"
    },
    ru: {
        intro: "Создаю сайты и инструменты",
        title: "Playground",
        project1: "Земля вращается",
        project1_desc: "Визуализация вращения Земли",
        project2: "Счётчик символов",
        project2_desc: "Подсчёт символов в тексте",
        coming_soon: "Скоро",
        coming_soon_desc: "Новый проект",
        lang_name: "Русский"
    },
    ar: {
        intro: "أقوم بإنشاء مواقع وأدوات",
        title: "Playground",
        project1: "الأرض تدور",
        project1_desc: "تصور دوران الأرض",
        project2: "عداد الأحرف",
        project2_desc: "حساب عدد الأحرف في النص",
        coming_soon: "قريباً",
        coming_soon_desc: "مشروع جديد",
        lang_name: "العربية"
    }
};

// ===== DOM Elements =====
const html = document.documentElement;
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const currentLangSpan = document.getElementById('currentLang');
const themeBtn = document.getElementById('themeBtn');

// ===== Language Functions =====
function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    
    // Update current language display
    currentLangSpan.textContent = t.lang_name;
    
    // Set RTL for Arabic
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);
    
    // Save preference
    localStorage.setItem('lang', lang);
    
    // Close dropdown
    langDropdown.classList.remove('active');
}

// Language dropdown toggle
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
});

// Language selection
langDropdown.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const lang = e.target.getAttribute('data-lang');
        setLanguage(lang);
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    langDropdown.classList.remove('active');
});

// ===== Theme Functions =====
function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
}

themeBtn.addEventListener('click', toggleTheme);

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Escape to close dropdown
    if (e.key === 'Escape') {
        langDropdown.classList.remove('active');
    }
});

// ===== Initialize =====
function init() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    
    // Load saved language
    const savedLang = localStorage.getItem('lang') || 
        navigator.language.split('-')[0] || 'ko';
    
    // Check if saved language is supported
    const supportedLang = translations[savedLang] ? savedLang : 'ko';
    setLanguage(supportedLang);
}

init();

// ===== Console Message =====
console.log('%c✦ Playground ✦', 'font-size: 20px; font-weight: bold;');
