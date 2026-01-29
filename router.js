// Simple Router System
const routes = {
    '': 'pages/intro.html',
    'intro': 'pages/intro.html',
    // 'sounds' and 'visuals' are rendered in JS via buildSoundsPageHtml() and buildVisualsPageHtml()
    'logic': 'pages/logic.html',
    'crossword': 'pages/crossword.html',
    'quiz': 'pages/quiz.html',
    'message-final': 'pages/message-final.html',
    'final-result': 'pages/final-result.html'
};

function getSoundCarouselHtml() {
    try {
        if (!window.soundSlides || !window.createSoundSlide) return '';
        return window.soundSlides.map((s, i) => window.createSoundSlide(s, i)).join('');
    } catch (e) {
        console.error('getSoundCarouselHtml:', e);
        return '';
    }
}

function getSoundIndicatorsHtml() {
    const n = window.totalSlides || 4;
    return Array(n).fill(0).map((_, i) =>
        `<span id="dot-${i}" class="w-2 h-2 rounded-full ${i === 0 ? 'bg-festive-red' : 'bg-gray-300'} transition-all"></span>`
    ).join('');
}

function getVisualCarouselHtml() {
    try {
        if (!window.visualSlides || !window.createVisualSlide) return '';
        return window.visualSlides.map((s, i) => window.createVisualSlide(s, i)).join('');
    } catch (e) {
        console.error('getVisualCarouselHtml:', e);
        return '';
    }
}

function getVisualIndicatorsHtml() {
    const n = window.totalVisualSlides || 4;
    return Array(n).fill(0).map((_, i) =>
        `<span id="v-dot-${i}" class="w-2 h-2 rounded-full ${i === 0 ? 'bg-festive-red' : 'bg-gray-300'} transition-all"></span>`
    ).join('');
}

// Build full sounds page HTML in JS (no fetch) so carousel is guaranteed to render
function buildSoundsPageHtml() {
    const carousel = getSoundCarouselHtml();
    const indicators = getSoundIndicatorsHtml();
    return `<div class="page-container">
    <div class="container mx-auto w-full px-4 md:px-6 lg:px-8 max-w-7xl">
        <div class="card-modern p-6 md:p-8 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-400 via-orange-400 to-red-500"></div>
            <div class="text-center mb-6 md:mb-8">
                <span class="inline-block px-4 py-2 bg-gradient-to-r from-festive-gold to-orange-500 text-gray-900 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide shadow-md mb-3 md:mb-4">Hoạt Động 1</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 serif mb-3 md:mb-4 leading-tight">Thanh âm Di Sản</h2>
            </div>
            <div class="relative w-full min-h-[500px] md:min-h-[600px]">
                <button onclick="changeSlide(-1)" class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 glass p-4 md:p-5 rounded-full shadow-xl hover:shadow-2xl text-gray-700 transition-all hover:scale-110 hover:bg-white/90 min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 md:w-7 md:h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
                </button>
                <button onclick="changeSlide(1)" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 glass p-4 md:p-5 rounded-full shadow-xl hover:shadow-2xl text-gray-700 transition-all hover:scale-110 hover:bg-white/90 min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 md:w-7 md:h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </button>
                <div class="card-modern overflow-y-auto overflow-x-hidden min-h-[500px] md:min-h-[600px] max-h-[85vh] relative bg-white">
                    <div id="sound-carousel" class="min-h-full">${carousel}</div>
                    <div class="sticky bottom-4 left-0 right-0 flex justify-center gap-2 py-2 z-10" id="sound-indicators">${indicators}</div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

// Build full visuals page HTML in JS (no fetch)
function buildVisualsPageHtml() {
    const carousel = getVisualCarouselHtml();
    const indicators = getVisualIndicatorsHtml();
    return `<div class="page-container">
    <div class="container mx-auto w-full px-4 md:px-6 lg:px-8 max-w-7xl">
        <div class="card-modern p-6 md:p-8 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-400 via-orange-400 to-red-500"></div>
            <div class="text-center mb-6 md:mb-8">
                <span class="inline-block px-4 py-2 bg-gradient-to-r from-festive-gold to-orange-500 text-gray-900 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide shadow-md mb-3 md:mb-4">Vòng 1</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 serif mb-3 md:mb-4 leading-tight">Tinh Mắt - Nhìn Hình Đoán Lễ</h2>
                <p class="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">Quan sát hình ảnh và dự đoán tên lễ hội.</p>
            </div>
            <div class="relative w-full min-h-[500px] md:min-h-[600px]">
                <button onclick="changeVisualSlide(-1)" class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 glass p-4 md:p-5 rounded-full shadow-xl hover:shadow-2xl text-gray-700 transition-all hover:scale-110 hover:bg-white/90 min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 md:w-7 md:h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
                </button>
                <button onclick="changeVisualSlide(1)" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 glass p-4 md:p-5 rounded-full shadow-xl hover:shadow-2xl text-gray-700 transition-all hover:scale-110 hover:bg-white/90 min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 md:w-7 md:h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </button>
                <div class="card-modern overflow-y-auto overflow-x-hidden min-h-[500px] md:min-h-[600px] max-h-[85vh] relative bg-white">
                    <div id="visual-carousel" class="min-h-full">${carousel}</div>
                    <div class="sticky bottom-4 left-0 right-0 flex justify-center gap-2 py-2 z-10" id="visual-indicators">${indicators}</div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

function initSoundsPage(container) {
    window.currentSlideIndex = 0;
}

function initVisualsPage(container) {
    window.currentVisualSlideIndex = 0;
}

function initLogicPage(container) {
    const root = container || document;
    const el = root.querySelector ? root.querySelector('#logic-challenges') : document.getElementById('logic-challenges');
    if (el && window.logicChallenges && window.createLogicChallenge) {
        el.innerHTML = window.logicChallenges.map((c, i) => window.createLogicChallenge(c, i)).join('');
    }
}

function initCrosswordPage(container) {
    window.currentRowId = 0;
    const root = container || document;
    const gridContainer = root.querySelector ? root.querySelector('#crossword-grid') : document.getElementById('crossword-grid');
    
    if (gridContainer && window.crosswordRows && window.createCrosswordRow) {
        gridContainer.innerHTML = `<div class="flex flex-col gap-3">${window.crosswordRows.map(r => window.createCrosswordRow(r)).join('')}</div>`;
    }
    
    if (window.createQuestionsList) {
        window.createQuestionsList();
    }
    
    // Ẩn khối "Từ khóa của chương trình" cho đến khi user nhấn "Mở Từ Khóa Dọc"
    const keywordMessage = root.querySelector ? root.querySelector('#keyword-message') : document.getElementById('keyword-message');
    if (keywordMessage) keywordMessage.classList.add('hidden');
}

// Map of page names to initialization functions
const pageInitializers = {
    'sounds': initSoundsPage,
    'visuals': initVisualsPage,
    'logic': initLogicPage,
    'crossword': initCrosswordPage
};

function loadPage(page) {
    const appContent = document.getElementById('app-content');
    if (!appContent) return;

    // Sounds & Visuals: render full HTML in JS (no fetch). Guarantees carousel works.
    if (page === 'sounds') {
        appContent.innerHTML = buildSoundsPageHtml();
        initSoundsPage(appContent);
        updateNavActive(page);
        return;
    }
    if (page === 'visuals') {
        appContent.innerHTML = buildVisualsPageHtml();
        initVisualsPage(appContent);
        updateNavActive(page);
        return;
    }

    const route = routes[page] || routes['intro'];
    fetch(route)
        .then(response => {
            if (!response.ok) throw new Error('HTTP error ' + response.status);
            return response.text();
        })
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            tempDiv.querySelectorAll('script').forEach(s => s.remove());
            appContent.innerHTML = tempDiv.innerHTML;
            const initFunc = pageInitializers[page];
            if (initFunc) initFunc(appContent);
            updateNavActive(page);
        })
        .catch(error => {
            console.error('Error loading page:', error);
            appContent.innerHTML = `<div class="text-center p-10">
                <h2 class="text-2xl text-red-600">Lỗi tải trang</h2>
                <p class="mt-4 text-gray-600">Chi tiết: ${error.message}</p>
                <p class="mt-2 text-sm text-gray-500">Mở trang qua web server (vd. python3 -m http.server 8080) rồi truy cập http://localhost:8080</p>
            </div>`;
        });
}

function updateNavActive(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
}

function navigateTo(page) {
    window.history.pushState({ page }, '', `#${page}`);
    loadPage(page);
}

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
    const page = e.state?.page || getPageFromHash();
    loadPage(page);
});

function getPageFromHash() {
    const hash = window.location.hash.slice(1);
    return hash || 'intro';
}

// Make navigateTo available globally
window.navigateTo = navigateTo;

// Initialize router
document.addEventListener('DOMContentLoaded', () => {
    const initialPage = getPageFromHash();
    loadPage(initialPage);
});
