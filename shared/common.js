// Common JavaScript functions for the application

function getYoutubeEmbedUrl(url, useNocookie) {
    if (!url || !url.includes('youtube')) return '';
    const m = url.match(/[?&]v=([^&]+)/);
    if (!m) return '';
    const base = useNocookie ? 'https://www.youtube-nocookie.com/embed/' : 'https://www.youtube.com/embed/';
    return base + m[1];
}

// Global variables - exposed to window for page access
window.currentSlideIndex = 0;
window.currentVisualSlideIndex = 0;
window.currentRowId = 0;
window.currentAudio = null;
window.fadeInterval = null;
window.isPlaying = false;
window.playingSlideIndex = null;

// Bảng xếp hạng - Quản lý điểm số của 6 nhóm
let groupScores = {
    1: { name: '12A12', score: 0, color: 'bg-red-100 border-red-400' },
    2: { name: '12A13', score: 0, color: 'bg-blue-100 border-blue-400' },
    3: { name: '12A14', score: 0, color: 'bg-green-100 border-green-400' },
    4: { name: '12A15', score: 0, color: 'bg-yellow-100 border-yellow-400' },
    5: { name: '12A16', score: 0, color: 'bg-purple-100 border-purple-400' },
    6: { name: '12A17', score: 0, color: 'bg-pink-100 border-pink-400' }
};

// Local Storage Functions
function saveScoresToStorage() {
    try {
        const scoresData = {};
        Object.keys(groupScores).forEach(id => {
            scoresData[id] = {
                name: groupScores[id].name,
                score: groupScores[id].score,
                color: groupScores[id].color
            };
        });
        localStorage.setItem('groupScores', JSON.stringify(scoresData));
    } catch (e) {
        console.error('Lỗi lưu điểm:', e);
    }
}

function loadScoresFromStorage() {
    try {
        const saved = localStorage.getItem('groupScores');
        if (saved) {
            const scoresData = JSON.parse(saved);
            Object.keys(scoresData).forEach(id => {
                if (groupScores[id]) {
                    groupScores[id].score = scoresData[id].score || 0;
                }
            });
            return true;
        }
    } catch (e) {
        console.error('Lỗi đọc điểm:', e);
    }
    return false;
}

function updateLeaderboard() {
    const container = document.getElementById('leaderboard-groups');
    if (!container) return;
    
    // Sắp xếp nhóm theo điểm từ cao xuống thấp
    const sortedGroups = Object.entries(groupScores)
        .sort((a, b) => b[1].score - a[1].score);
    
    container.innerHTML = sortedGroups.map(([id, group]) => {
        const rank = sortedGroups.findIndex(g => g[0] === id) + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
        return `
            <div class="flex flex-col gap-2 p-2.5 rounded-lg border-2 ${group.color} transition-all hover:shadow-md ${rank === 1 ? 'ring-2 ring-festive-gold shadow-lg' : ''}">
                <div class="flex flex-col items-center gap-1.5">
                    <div class="flex items-center gap-1.5">
                        <span class="text-base">${medal}</span>
                        <span class="font-bold text-gray-800 text-xs lg:text-sm text-center">${group.name}</span>
                    </div>
                    <span class="font-black text-festive-red text-base lg:text-lg">${group.score}</span>
                </div>
                <div class="flex gap-1.5">
                    <button onclick="addScore(${id}, 10, 'sidebar')" class="flex-1 px-2 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded text-sm font-bold shadow-sm hover:from-green-700 hover:to-emerald-700 transition-all">+</button>
                    <button onclick="removeScore(${id}, 10, 'sidebar')" class="flex-1 px-2 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded text-sm font-bold shadow-sm hover:from-red-600 hover:to-red-700 transition-all">-</button>
                </div>
                ${rank === 1 ? '<div class="text-xs lg:text-sm text-festive-red font-semibold text-center">🏆 Dẫn đầu</div>' : ''}
            </div>
        `;
    }).join('');
}

function addScore(groupId, points = 10, activity = '') {
    if (!groupId || groupId < 1 || groupId > 6) {
        alert('Vui lòng chọn nhóm hợp lệ!');
        return;
    }
    if (points <= 0) {
        alert('Số điểm phải lớn hơn 0!');
        return;
    }
    
    groupScores[groupId].score += points;
    saveScoresToStorage();
    updateLeaderboard();
    updateFullLeaderboard();
    
    // Hiệu ứng animation
    const groupElement = document.querySelector(`[data-group-id="${groupId}"]`);
    if (groupElement) {
        groupElement.classList.add('animate-pulse');
        setTimeout(() => groupElement.classList.remove('animate-pulse'), 1000);
    }
    
    // Đóng modal nếu đang mở
    const scoreModal = document.getElementById('score-modal');
    if (scoreModal) {
        scoreModal.classList.add('hidden');
    }
    
    // Reset form
    const selectGroup = document.getElementById('select-group');
    const scoreInput = document.getElementById('score-input');
    if (selectGroup) selectGroup.value = '';
    if (scoreInput) scoreInput.value = 10;
}

function removeScore(groupId, points = 10, activity = '') {
    if (!groupId || groupId < 1 || groupId > 6) {
        alert('Vui lòng chọn nhóm hợp lệ!');
        return;
    }
    if (points <= 0) {
        alert('Số điểm phải lớn hơn 0!');
        return;
    }
    
    if (groupScores[groupId].score < points) {
        if (confirm(`${groupScores[groupId].name} chỉ có ${groupScores[groupId].score} điểm. Bạn có muốn đặt về 0 không?`)) {
            groupScores[groupId].score = 0;
        } else {
            return;
        }
    } else {
        groupScores[groupId].score -= points;
    }
    
    saveScoresToStorage();
    updateLeaderboard();
    updateFullLeaderboard();
    
    // Hiệu ứng animation
    const groupElement = document.querySelector(`[data-group-id="${groupId}"]`);
    if (groupElement) {
        groupElement.classList.add('score-pop');
        setTimeout(() => groupElement.classList.remove('score-pop'), 500);
    }
}

function updateFullLeaderboard() {
    const container = document.getElementById('full-leaderboard-content');
    if (!container) return;
    
    const sortedGroups = Object.entries(groupScores)
        .sort((a, b) => b[1].score - a[1].score);
    
    container.innerHTML = sortedGroups.map(([id, group], index) => {
        const rank = index + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
        const percentage = sortedGroups[0][1].score > 0 ? Math.round((group.score / sortedGroups[0][1].score) * 100) : 0;
        
        return `
            <div class="flex items-center gap-8 p-8 rounded-2xl border-2 ${group.color} ${rank === 1 ? 'ring-2 ring-festive-gold bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg' : 'shadow-md'} transition-all hover:shadow-xl">
                <div class="text-5xl font-bold w-20 text-center">${medal}</div>
                <div class="flex-1">
                    <div class="font-bold text-3xl text-gray-800 mb-2">${group.name}</div>
                    <div class="text-base text-gray-600">${percentage}% so với nhóm dẫn đầu</div>
                </div>
                <div class="text-6xl font-black text-festive-red">${group.score}</div>
            </div>
        `;
    }).join('');
}

function showFullLeaderboard() {
    updateFullLeaderboard();
    const modal = document.getElementById('full-leaderboard-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function showFinalResult() {
    const sortedGroups = Object.entries(groupScores)
        .sort((a, b) => b[1].score - a[1].score);
    
    const winner = sortedGroups[0];
    const winnerId = winner[0];
    const winnerData = winner[1];
    
    const winnerName = document.getElementById('winner-name');
    const winnerScore = document.getElementById('winner-score');
    if (winnerName) winnerName.textContent = winnerData.name;
    if (winnerScore) winnerScore.textContent = `${winnerData.score} điểm`;
    
    const fullLeaderboardModal = document.getElementById('full-leaderboard-modal');
    const finalResult = document.getElementById('final-result');
    if (fullLeaderboardModal) fullLeaderboardModal.classList.add('hidden');
    if (finalResult) {
        finalResult.classList.remove('hidden');
        finalResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function addScoreFromModal() {
    const selectGroup = document.getElementById('select-group');
    const scoreInput = document.getElementById('score-input');
    const selectActivity = document.getElementById('select-activity');
    
    if (!selectGroup || !scoreInput || !selectActivity) return;
    
    const groupId = parseInt(selectGroup.value);
    const points = parseInt(scoreInput.value);
    const activity = selectActivity.value;
    
    if (!groupId) {
        alert('Vui lòng chọn nhóm!');
        return;
    }
    
    addScore(groupId, points, activity);
}

function removeScoreFromModal() {
    const selectGroup = document.getElementById('select-group');
    const scoreInput = document.getElementById('score-input');
    const selectActivity = document.getElementById('select-activity');
    
    if (!selectGroup || !scoreInput || !selectActivity) return;
    
    const groupId = parseInt(selectGroup.value);
    const points = parseInt(scoreInput.value);
    const activity = selectActivity.value;
    
    if (!groupId) {
        alert('Vui lòng chọn nhóm!');
        return;
    }
    
    removeScore(groupId, points, activity);
}

function createSoundSlide(slide, index) {
    const num = String(index + 1).padStart(2, '0');
    const questionHtml = slide.question ? `<div class="w-full mb-6 px-4">
        <p class="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed serif">${slide.question}</p>
    </div>` : '';
    return `<div class="carousel-slide ${index===0?'slide-active':'slide-hidden'} flex flex-col items-center justify-start pt-8 px-8 pb-16 w-full min-h-0 text-center" id="slide-${index}">
        <div class="absolute top-4 left-6 text-5xl font-black text-gray-100 select-none">${num}</div>
        <h3 class="text-xl md:text-2xl font-bold text-gray-400 mb-6 tracking-widest uppercase">Thẻ Âm Thanh Số ${index+1}</h3>
        <button id="btn-sound-${index}" onclick="toggleAudio(${index}, '${slide.audio}')" class="group relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 ${slide.color} text-white rounded-full shadow-lg hover:opacity-90 transition-all mb-6 mx-auto">
            <svg id="icon-play-${index}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 md:w-14 md:h-14 ml-1"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></svg>
            <svg id="icon-stop-${index}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 md:w-14 md:h-14 hidden"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/></svg>
        </button>
        ${questionHtml}
        <div class="flex flex-wrap justify-center gap-4 mb-6">
            <button onclick="toggleContent('hint-${index+1}', 'img')" class="px-8 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-festive-gold hover:text-yellow-700 hover:bg-yellow-50 transition-all font-semibold text-base flex items-center gap-2 shadow-sm hover:shadow-md">🖼️ Gợi Ý</button>
            <button onclick="toggleContent('ans-${index+1}', 'txt')" class="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 shadow-md hover:shadow-lg transition-all font-semibold text-base flex items-center gap-2">✨ Đáp Án</button>
        </div>
        <div class="relative w-full flex-shrink-0 min-h-[260px]">
            <div id="hint-${index+1}" class="hidden absolute inset-0 flex items-center justify-center animation-fade-in z-20 bg-white p-6 rounded-lg min-h-[260px]">
                <button onclick="toggleContent('hint-${index+1}', 'img')" class="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-50 p-3 font-bold text-lg">✕ Đóng</button>
                <div class="w-full h-full flex items-center justify-center">
                    <img id="img-hint-${index}" src="${window.imageSources ? window.imageSources[index] : ''}" alt="Gợi ý" class="max-h-full max-w-full rounded-lg shadow-lg object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="hidden flex-col items-center justify-center text-gray-400 img-placeholder w-full h-full rounded-lg"><span class="text-6xl mb-2">${slide.emoji}</span><span class="text-base">[Ảnh chưa tải được]</span></div>
                </div>
            </div>
        </div>
        <div id="ans-${index+1}" class="hidden mt-6 w-full text-left animation-fade-in p-8 bg-white border-2 border-festive-red rounded-lg shadow-inner">
            <button onclick="toggleContent('ans-${index+1}', 'txt')" class="float-right ml-4 mb-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg transition-colors">✕</button>
            <h4 class="text-4xl md:text-5xl font-serif font-bold text-festive-red uppercase text-center mb-6 w-full">${slide.festival || slide.title}</h4>
            <div class="space-y-5 text-base text-gray-700 w-full pb-8">
                ${slide.supportingContent ? `<div class="bg-yellow-50 p-5 rounded-lg border border-yellow-200"><strong class="block text-yellow-800 mb-2 text-lg">🎯 ${slide.supportingLabel || 'Nội dung bổ trợ'}:</strong><p class="text-base font-medium text-yellow-900">${slide.supportingContent}</p></div>` : ''}
                <div class="bg-orange-50 p-5 rounded-lg border border-orange-100"><strong class="block text-orange-800 mb-2 text-lg">📝 Giới thiệu:</strong><p class="text-base">${slide.intro}</p></div>
                <div><strong class="block text-gray-800 mb-2 text-lg">🌸 Ý nghĩa:</strong><ul class="list-disc pl-6 space-y-2 marker:text-festive-red text-base">${slide.meaning.map(m=>`<li>${m}</li>`).join('')}</ul></div>
                <div class="bg-blue-50 p-5 rounded-lg border border-blue-100"><strong class="block text-blue-800 mb-2 flex items-center gap-2 text-lg">💡 Góc Khám Phá:</strong><p class="italic text-blue-900 text-base">${slide.discovery}</p></div>
                ${slide.videoUrl && getYoutubeEmbedUrl(slide.videoUrl) ? `<div class="w-full max-w-2xl mx-auto"><strong class="block text-gray-800 mb-2 text-lg">🎬 Video giới thiệu:</strong><div class="relative w-full rounded-xl overflow-hidden border border-gray-200" style="padding-bottom:56.25%"><iframe class="absolute top-0 left-0 w-full h-full" src="${getYoutubeEmbedUrl(slide.videoUrl, true)}" title="Video giới thiệu lễ hội" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div>` : ''}
            </div>
        </div>
    </div>`;
}

function createVisualSlide(slide, index) {
    const num = String(index + 1).padStart(2, '0');
    return `<div class="carousel-slide ${index===0?'slide-active':'slide-hidden'} flex flex-col items-center justify-start pt-8 px-8 pb-16 w-full min-h-0 text-center" id="visual-slide-${index}">
        <div class="absolute top-4 left-6 text-5xl font-black text-gray-100 select-none">${num}</div>
        <h3 class="text-xl md:text-2xl font-bold text-gray-400 mb-6 tracking-widest uppercase">Thẻ Hình Ảnh Số ${index+1}</h3>
        <div class="w-full max-w-md h-64 mx-auto mb-6 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
            <img id="visual-img-${index+1}" src="${window.visualGameImages ? window.visualGameImages[index+1] : ''}" alt="${slide.title}" class="w-full h-full object-contain">
        </div>
        <div class="flex flex-wrap justify-center gap-4 mb-6">
            <button onclick="toggleContent('visual-hint-${index+1}', 'txt')" class="px-8 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-festive-gold hover:text-yellow-700 hover:bg-yellow-50 transition-all font-semibold text-base flex items-center gap-2 shadow-sm hover:shadow-md">💡 Gợi Ý</button>
            <button onclick="toggleContent('visual-ans-${index+1}', 'txt')" class="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 shadow-md hover:shadow-lg transition-all font-semibold text-base flex items-center gap-2">✨ Đáp Án</button>
        </div>
        <div class="relative w-full flex-shrink-0 min-h-[180px]">
            <div id="visual-hint-${index+1}" class="hidden absolute inset-0 flex items-center justify-center animation-fade-in z-20 bg-white p-6 rounded-lg min-h-[180px]">
                <button onclick="toggleContent('visual-hint-${index+1}', 'txt')" class="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-50 p-3 font-bold text-lg">✕ Đóng</button>
                <div class="w-full max-w-md p-8 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                    <p class="text-yellow-800 font-medium italic text-lg">${slide.hint}</p>${slide.hintSub?`<p class="text-base text-gray-500 mt-3">${slide.hintSub}</p>`:''}
                </div>
            </div>
        </div>
        <div id="visual-ans-${index+1}" class="hidden mt-6 w-full text-left animation-fade-in p-8 bg-white border-2 border-festive-red rounded-lg shadow-inner">
            <button onclick="toggleContent('visual-ans-${index+1}', 'txt')" class="float-right ml-4 mb-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg transition-colors">✕</button>
            <h4 class="text-4xl md:text-5xl font-serif font-bold text-festive-red uppercase text-center mb-6 w-full">${slide.title}</h4>
            <div class="space-y-5 text-base text-gray-700 w-full pb-8">
                <div class="bg-orange-50 p-5 rounded-lg border border-orange-100"><strong class="block text-orange-800 mb-2 text-lg">📝 Giới thiệu:</strong><p class="text-base">${slide.intro}</p></div>
                <div><strong class="block text-gray-800 mb-2 text-lg">🌸 Ý nghĩa:</strong><ul class="list-disc pl-6 space-y-2 marker:text-festive-red text-base">${slide.meaning.map(m=>`<li>${m}</li>`).join('')}</ul></div>
                ${slide.discovery ? `<div class="bg-blue-50 p-5 rounded-lg border border-blue-100"><strong class="block text-blue-800 mb-2 flex items-center gap-2 text-lg">💡 Góc Khám Phá:</strong><p class="italic text-blue-900 text-base">${slide.discovery}</p></div>` : ''}
                ${slide.videoUrl && getYoutubeEmbedUrl(slide.videoUrl) ? `<div class="w-full max-w-2xl mx-auto"><strong class="block text-gray-800 mb-2 text-lg">🎬 Video giới thiệu:</strong><div class="relative w-full rounded-xl overflow-hidden border border-gray-200" style="padding-bottom:56.25%"><iframe class="absolute top-0 left-0 w-full h-full" src="${getYoutubeEmbedUrl(slide.videoUrl, true)}" title="Video giới thiệu lễ hội" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div>` : ''}
            </div>
        </div>
    </div>`;
}

function createLogicChallenge(challenge, index) {
    const borderColor = challenge.color === 'festive-red' ? 'border-festive-red' : 'border-blue-600';
    const textColor = challenge.color === 'festive-red' ? 'text-festive-red' : 'text-blue-600';
    return `<div class="bg-white p-8 rounded-xl shadow-lg border-t-8 ${borderColor}">
        <h3 class="text-2xl md:text-3xl font-bold text-gray-700 mb-5 border-b pb-3">Thử thách ${index+1}</h3>
        <div class="space-y-5">
            <div class="grid md:grid-cols-3 gap-5">
                ${challenge.clues.map((c,i)=>`<div class="bg-gray-50 p-6 rounded border border-gray-200"><span class="font-bold ${textColor} block mb-3 text-xl md:text-2xl">Dữ kiện ${i+1}</span><p class="text-lg md:text-xl leading-relaxed">${c.includes('🐃')||c.includes('🎋')?c:`"${c}"`}</p></div>`).join('')}
            </div>
            <div class="pt-4 text-center">
                <button onclick="document.getElementById('final-answer-${index+1}').classList.remove('hidden')" class="btn-primary text-lg py-4 px-10">HIỆN ĐÁP ÁN ${index+1}</button>
                <div id="final-answer-${index+1}" class="hidden mt-6 p-8 bg-white border-2 ${borderColor} rounded-lg animation-fade-in text-left shadow-inner">
                    <h3 class="text-4xl md:text-5xl font-serif font-bold ${textColor} uppercase text-center mb-6">${challenge.title}</h3>
                    <div class="space-y-5 text-base text-gray-700">
                        <div class="bg-orange-50 p-5 rounded-lg border border-orange-100"><strong class="block text-orange-800 mb-2 text-lg">📝 Giới thiệu:</strong><p class="text-base">${challenge.intro}</p></div>
                        <div><strong class="block text-gray-800 mb-2 text-lg">🌸 Ý nghĩa:</strong><ul class="list-disc pl-6 space-y-2 marker:${textColor} text-base">${challenge.meaning.map(m=>`<li>${m}</li>`).join('')}</ul></div>
                        <div class="bg-blue-50 p-5 rounded-lg border border-blue-100"><strong class="block text-blue-800 mb-2 flex items-center gap-2 text-lg">💡 Góc Khám Phá:</strong><p class="italic text-blue-900 text-base">${challenge.discovery}</p></div>
                        ${challenge.videoUrl && getYoutubeEmbedUrl(challenge.videoUrl) ? `<div class="w-full max-w-2xl mx-auto"><strong class="block text-gray-800 mb-2 text-lg">🎬 Video giới thiệu:</strong><div class="relative w-full rounded-xl overflow-hidden border border-gray-200" style="padding-bottom:56.25%"><iframe class="absolute top-0 left-0 w-full h-full" src="${getYoutubeEmbedUrl(challenge.videoUrl, true)}" title="Video giới thiệu lễ hội" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div>` : ''}
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function createCrosswordRow(row) {
    const offset = row.offset || 0;
    const emptyCells = offset > 0 ? Array(offset).fill('').map((_, i) => `<div class="crossword-cell opacity-0 pointer-events-none" style="visibility: hidden; border: none;"></div>`).join('') : '';
    
    return `<div class="flex items-center gap-1.5 cursor-pointer hover:bg-gray-100 p-1.5 rounded transition-colors group" onclick="selectRow(${row.num})">
        <span class="w-9 font-bold text-gray-400 group-hover:text-festive-red text-lg flex-shrink-0">${row.num}</span>
        ${emptyCells}
        ${row.cells.map((c,i)=>{
            const colIndex = offset + i + 1;
            const keywordCol = offset + (row.keyword || 5);
            const isKeyword = colIndex === keywordCol;
            return `<div class="crossword-cell ${isKeyword?'keyword-cell':''}" id="r${row.num}c${colIndex}"><span class="hidden-answer">${c}</span></div>`;
        }).join('')}
    </div>`;
}

function createQuestionsList() {
    const questionsContainer = document.getElementById('questions-list');
    if (!questionsContainer || !window.crosswordRows) return;
    
    questionsContainer.innerHTML = window.crosswordRows.map((row) => {
        return `
            <div class="crossword-q-item p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-festive-red transition-all cursor-pointer question-item" data-row-num="${row.num}" onclick="selectRow(${row.num})">
                <div class="flex items-start gap-2">
                    <span class="font-bold text-festive-red text-base lg:text-lg flex-shrink-0 min-w-[1.75rem]">${row.num}.</span>
                    <p class="text-base lg:text-lg text-gray-700 leading-snug flex-grow font-medium">${row.question}</p>
                </div>
            </div>
        `;
    }).join('');
}

function toggleContent(id, type) {
    const el = document.getElementById(id);
    if (!el) return;
    const isAnswerInFlow = id.startsWith('ans-') || id.startsWith('visual-ans-');
    if (el.classList.contains('hidden')) {
        if (!isAnswerInFlow) {
            const parent = el.parentElement;
            if (parent) {
                parent.querySelectorAll(':scope > div').forEach(sib => {
                    if (sib.id !== id && !sib.classList.contains('hidden')) sib.classList.add('hidden');
                });
            }
        }
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}

function changeSlide(direction) {
    if (window.isPlaying && window.playingSlideIndex === window.currentSlideIndex) {
        stopCurrentSound();
        updateAudioUI(window.currentSlideIndex, false);
        window.playingSlideIndex = null;
    }
    const currentContentIndex = window.currentSlideIndex + 1;
    ['hint', 'ans'].forEach(type => {
        const el = document.getElementById(`${type}-${currentContentIndex}`);
        if (el && !el.classList.contains('hidden')) el.classList.add('hidden');
    });
    const currentSlide = document.getElementById(`slide-${window.currentSlideIndex}`);
    const currentDot = document.getElementById(`dot-${window.currentSlideIndex}`);
    if (currentSlide) currentSlide.classList.replace('slide-active', 'slide-hidden');
    if (currentDot) currentDot.classList.replace('bg-festive-red', 'bg-gray-300');
    const total = window.totalSlides || 4;
    window.currentSlideIndex = (window.currentSlideIndex + direction + total) % total;
    const newSlide = document.getElementById(`slide-${window.currentSlideIndex}`);
    const newDot = document.getElementById(`dot-${window.currentSlideIndex}`);
    if (newSlide) newSlide.classList.replace('slide-hidden', 'slide-active');
    if (newDot) newDot.classList.replace('bg-gray-300', 'bg-festive-red');
}

function changeVisualSlide(direction) {
    const currentContentIndex = window.currentVisualSlideIndex + 1;
    ['visual-hint', 'visual-ans'].forEach(type => {
        const el = document.getElementById(`${type}-${currentContentIndex}`);
        if (el && !el.classList.contains('hidden')) el.classList.add('hidden');
    });
    const currentSlide = document.getElementById(`visual-slide-${window.currentVisualSlideIndex}`);
    const currentDot = document.getElementById(`v-dot-${window.currentVisualSlideIndex}`);
    if (currentSlide) currentSlide.classList.replace('slide-active', 'slide-hidden');
    if (currentDot) currentDot.classList.replace('bg-festive-red', 'bg-gray-300');
    const total = window.totalVisualSlides || 4;
    window.currentVisualSlideIndex = (window.currentVisualSlideIndex + direction + total) % total;
    const newSlide = document.getElementById(`visual-slide-${window.currentVisualSlideIndex}`);
    const newDot = document.getElementById(`v-dot-${window.currentVisualSlideIndex}`);
    if (newSlide) newSlide.classList.replace('slide-hidden', 'slide-active');
    if (newDot) newDot.classList.replace('bg-gray-300', 'bg-festive-red');
}

function playAudioSource(type) {
    if (!window.audioSources || !window.audioSources[type]) {
        alert("Chưa có file âm thanh!");
        return false;
    }
    const src = window.audioSources[type];
    const audio = new Audio(src);
    audio.volume = 0;
    audio.play().then(() => {
        let vol = 0;
        if (window.fadeInterval) clearInterval(window.fadeInterval);
        window.fadeInterval = setInterval(() => {
            if (vol < 1.0) {
                vol += 0.05;
                audio.volume = Math.min(vol, 1.0);
            } else {
                clearInterval(window.fadeInterval);
            }
        }, 100);
    }).catch(e => {
        console.error("Lỗi phát âm thanh:", e);
        alert("Không thể phát file âm thanh.");
    });
    window.currentAudio = audio;
    window.isPlaying = true;
    audio.onended = () => {
        window.isPlaying = false;
        window.playingSlideIndex = null;
        const total = window.totalSlides || 4;
        for (let i = 0; i < total; i++) updateAudioUI(i, false);
    };
    return true;
}

function stopCurrentSound(fadeOutDuration = 2000) {
    if (window.currentAudio && window.isPlaying) {
        const audioToStop = window.currentAudio;
        if (window.fadeInterval) clearInterval(window.fadeInterval);
        let vol = audioToStop.volume;
        const step = vol / (fadeOutDuration / 100);
        window.fadeInterval = setInterval(() => {
            if (vol > 0) {
                vol -= step;
                audioToStop.volume = Math.max(vol, 0);
            } else {
                clearInterval(window.fadeInterval);
                audioToStop.pause();
                audioToStop.currentTime = 0;
            }
        }, 100);
        window.isPlaying = false;
    }
}

function updateAudioUI(index, isPlayingState) {
    const btn = document.getElementById(`btn-sound-${index}`);
    const playIcon = document.getElementById(`icon-play-${index}`);
    const stopIcon = document.getElementById(`icon-stop-${index}`);
    if (!btn || !playIcon || !stopIcon) return;
    if (isPlayingState) {
        playIcon.classList.add('hidden');
        stopIcon.classList.remove('hidden');
        btn.classList.add('ring-pulse');
    } else {
        playIcon.classList.remove('hidden');
        stopIcon.classList.add('hidden');
        btn.classList.remove('ring-pulse');
    }
}

function toggleAudio(index, type) {
    if (window.playingSlideIndex === index && window.isPlaying) {
        stopCurrentSound();
        updateAudioUI(index, false);
        window.playingSlideIndex = null;
    } else {
        if (window.isPlaying) {
            stopCurrentSound(200);
            if (window.playingSlideIndex !== null) updateAudioUI(window.playingSlideIndex, false);
        }
        const success = playAudioSource(type);
        if (success) {
            updateAudioUI(index, true);
            window.playingSlideIndex = index;
        }
    }
}

function selectRow(rowNum, questionText) {
    window.currentRowId = rowNum;
    const questionsContainer = document.getElementById('questions-list');
    if (questionsContainer) {
        const questionItems = questionsContainer.querySelectorAll('.question-item');
        questionItems.forEach((item) => {
            const itemRowNum = parseInt(item.getAttribute('data-row-num'));
            if (itemRowNum === rowNum) {
                item.classList.add('border-festive-red', 'bg-red-50', 'ring-2', 'ring-festive-red');
                item.classList.remove('border-gray-200', 'bg-white');
            } else {
                item.classList.remove('border-festive-red', 'bg-red-50', 'ring-2', 'ring-festive-red');
                item.classList.add('border-gray-200', 'bg-white');
            }
        });
    }
    const crosswordContainer = document.getElementById('crossword-grid');
    if (crosswordContainer) {
        const rows = crosswordContainer.querySelectorAll('div[onclick*="selectRow"]');
        rows.forEach((rowEl) => {
            const onclickAttr = rowEl.getAttribute('onclick');
            const match = onclickAttr.match(/selectRow\((\d+)/);
            if (match && parseInt(match[1]) === rowNum) {
                rowEl.classList.add('bg-red-50', 'ring-2', 'ring-festive-red');
            } else {
                rowEl.classList.remove('bg-red-50', 'ring-2', 'ring-festive-red');
            }
        });
    }
    const revealBtn = document.getElementById('reveal-btn');
    if (revealBtn) revealBtn.classList.remove('hidden');
}

function revealRow() {
    if (!window.currentRowId || !window.rowData) return;
    if (!window.rowData[window.currentRowId]) return;
    window.rowData[window.currentRowId].ids.forEach((cellId, index) => {
        setTimeout(() => {
            const span = document.querySelector(`#${cellId} span`);
            if (span) {
                span.classList.remove('hidden-answer');
                span.classList.add('visible-answer');
            }
        }, index * 100);
    });
}

function revealKeyword() {
    const keywordCells = (window.crosswordRows || []).map(r => `r${r.num}c${(r.offset || 0) + r.keyword}`);
    
    keywordCells.forEach(id => {
        const span = document.querySelector(`#${id} span`);
        if(span) {
            span.classList.remove('hidden-answer');
            span.classList.add('visible-answer');
            if (span.parentElement) {
                span.parentElement.classList.add('bg-yellow-300', 'text-red-700');
            }
        }
    });
    const keywordMessage = document.getElementById('keyword-message');
    if (keywordMessage) keywordMessage.classList.remove('hidden');
}

function vote(index) {
    // Function kept for compatibility but vote section has been removed
    if (typeof actionChart !== 'undefined' && actionChart) {
        const currentVal = actionChart.data.datasets[0].data[index];
        actionChart.data.datasets[0].data[index] = currentVal + 1;
        actionChart.update();
    }
    const btn = document.querySelectorAll('#vote-buttons button')[index];
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = "✅ Đã ghi nhận!";
        setTimeout(() => { btn.innerHTML = originalText; }, 1000);
    }
}

// Background Music Control
let backgroundMusicPlaying = false;
let backgroundMusic, bgMusicBtn, bgMusicIcon, bgMusicLabel;

function loadMusicState() {
    backgroundMusic = document.getElementById('background-music');
    bgMusicBtn = document.getElementById('bg-music-btn');
    bgMusicIcon = document.getElementById('bg-music-icon');
    bgMusicLabel = document.getElementById('bg-music-label');
    
    if (!backgroundMusic || !bgMusicBtn || !bgMusicIcon || !bgMusicLabel) return;
    
    const savedState = localStorage.getItem('bgMusicPlaying');
    if (savedState === 'true') {
        backgroundMusicPlaying = true;
        bgMusicBtn.classList.add('playing');
        bgMusicIcon.textContent = '🎵';
        bgMusicLabel.textContent = 'Đang phát';
        try {
            backgroundMusic.play().catch(e => {
                console.log('Auto-play prevented:', e);
                backgroundMusicPlaying = false;
                bgMusicBtn.classList.remove('playing');
                bgMusicIcon.textContent = '🔇';
                bgMusicLabel.textContent = 'Nhạc nền';
            });
        } catch (e) {
            console.log('Error playing music:', e);
        }
    } else {
        bgMusicIcon.textContent = '🔇';
        bgMusicLabel.textContent = 'Nhạc nền';
    }
}

function toggleBackgroundMusic() {
    if (!backgroundMusic || !bgMusicBtn || !bgMusicIcon || !bgMusicLabel) return;
    
    if (backgroundMusicPlaying) {
        backgroundMusic.pause();
        backgroundMusicPlaying = false;
        bgMusicBtn.classList.remove('playing');
        bgMusicIcon.textContent = '🔇';
        bgMusicLabel.textContent = 'Nhạc nền';
        localStorage.setItem('bgMusicPlaying', 'false');
    } else {
        backgroundMusic.volume = 0.3;
        backgroundMusic.play().then(() => {
            backgroundMusicPlaying = true;
            bgMusicBtn.classList.add('playing');
            bgMusicIcon.textContent = '🎵';
            bgMusicLabel.textContent = 'Đang phát';
            localStorage.setItem('bgMusicPlaying', 'true');
        }).catch(e => {
            console.error('Error playing background music:', e);
            alert('Không thể phát nhạc nền. Vui lòng thử lại.');
        });
    }
}

// Initialize global elements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize leaderboard
    if (loadScoresFromStorage()) {
        console.log('Đã tải điểm từ localStorage');
    }
    updateLeaderboard();
    
    // Load background music state
    loadMusicState();
    
    // Set initial volume for background music
    const bgMusic = document.getElementById('background-music');
    if (bgMusic) {
        bgMusic.volume = 0.3;
    }
});

// Make functions available globally
window.addScore = addScore;
window.removeScore = removeScore;
window.updateLeaderboard = updateLeaderboard;
window.updateFullLeaderboard = updateFullLeaderboard;
window.showFullLeaderboard = showFullLeaderboard;
window.showFinalResult = showFinalResult;
window.addScoreFromModal = addScoreFromModal;
window.removeScoreFromModal = removeScoreFromModal;
window.createSoundSlide = createSoundSlide;
window.createVisualSlide = createVisualSlide;
window.createLogicChallenge = createLogicChallenge;
window.createCrosswordRow = createCrosswordRow;
window.createQuestionsList = createQuestionsList;
window.toggleContent = toggleContent;
window.changeSlide = changeSlide;
window.changeVisualSlide = changeVisualSlide;
window.toggleAudio = toggleAudio;
window.selectRow = selectRow;
window.revealRow = revealRow;
window.revealKeyword = revealKeyword;
window.toggleBackgroundMusic = toggleBackgroundMusic;
window.changeSlide = changeSlide;
window.changeVisualSlide = changeVisualSlide;
