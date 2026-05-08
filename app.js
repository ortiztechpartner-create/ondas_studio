/**
 * Ondas Studio — Showroom Virtual Player Engine
 * Lógica a medida para el Portafolio de Ondas Studio
 */

// Base de datos de proyectos y demostraciones de Ondas Studio
const PORTFOLIO_DATABASE = [
    {
        id: "gka-sincoincidir",
        title: "Sin Coincidir (Sencillo Oficial)",
        artist: "yosoygka (Prod. Botistudio)",
        album: "Sencillos Oficiales / GKA Showcase",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
        youtubeId: "QAQdclQr1qY", // Video Oficial Real
        buyUrl: "https://wa.me/56920074803?text=Hola%20GKA,%20me%20interesa%20adquirir%20o%20colaborar%20en%20el%20proyecto%20Sin%20Coincidir",
        duration: "3:10",
        lyrics: [
            { time: 0, text: "🎵 [Yosoygka — Sencillo Oficial 'Sin Coincidir'] 🎵" },
            { time: 5, text: "Voz R&B con compresión cálida de válvulas analógicas en Ondas Studio." },
            { time: 12, text: "Espacialidad estéreo ampliada mediante micro-delays e imágen psicoacústica." },
            { time: 18, text: "Producción ejecutada por Botistudio, masterizada en Ondas Studio." }
        ]
    },
    {
        id: "gka-muchostienen",
        title: "Muchos Tienen Una (Ft. Slash Noise)",
        artist: "yosoygka Ft. Slash Noise",
        album: "Colaboraciones Especiales / Rap",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
        youtubeId: "_eAqKsbgCYM", // Video Oficial Real
        buyUrl: "https://wa.me/56920074803?text=Hola%20GKA,%20me%20interesa%20adquirir%20o%20colaborar%20en%20el%20proyecto%20Muchos%20tienen%20una",
        duration: "3:42",
        lyrics: [
            { time: 0, text: "🎤 [Yosoygka Ft. Slash Noise — Muchos Tienen Una] 🎤" },
            { time: 6, text: "Flow de rap clásico, barras directas y un beat contundente." },
            { time: 13, text: "Acentuación perfecta de rimas mediante dobles voces paneadas a los extremos." },
            { time: 20, text: "Mezcla analógica de voces para máxima calidez y presencia." }
        ]
    },
    {
        id: "gka-hamparte",
        title: "Antonio García Villarán (Lofi Beats)",
        artist: "yosoygka (GKA Beats)",
        album: "Beats Conceptuales / Lofi Collection",
        cover: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=400&q=80",
        youtubeId: "OUuuHwHKsYk", // Video Oficial Real (Hamparte Lofi)
        buyUrl: "https://wa.me/56920074803?text=Hola%20GKA,%20me%20interesa%20el%20beat%20conceptual%20Antonio%20Garcia%20Villaran",
        duration: "2:18",
        lyrics: [
            { time: 0, text: "🎨 [Yosoygka — Instrumental Lofi 'Hamparte'] 🎨" },
            { time: 5, text: "Estilo Lofi chill melancólico inspirado en el famoso crítico de arte." },
            { time: 11, text: "Sampleo y texturas clásicas de vinilo con un ritmo relajante." },
            { time: 17, text: "Licencia de leasing disponible para creadores de contenido y músicos." }
        ]
    },
    {
        id: "gka-relaxpiano",
        title: "Free Lo-Fi Relax Piano Beat",
        artist: "yosoygka (GKA Beats)",
        album: "Beats de Distribución Libre",
        cover: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80",
        youtubeId: "k37eDZdaeu4", // Video Oficial Real (Relax Piano Lofi)
        buyUrl: "https://wa.me/56920074803?text=Hola%20GKA,%20me%20interesa%20adquirir%20la%20licencia%20comercial%20de%20Relax%20Piano%20Beat",
        duration: "3:05",
        lyrics: [
            { time: 0, text: "🎹 [Yosoygka — Free Lo-Fi Piano Beat] 🎹" },
            { time: 6, text: "Bases perfectas para relajación, estudio o podcasts." },
            { time: 12, text: "Teclados rhodes filtrados y batería sutil." },
            { time: 19, text: "Uso libre para proyectos no comerciales. Cotiza licencia comercial por WhatsApp." }
        ]
    }
];

// Estado global del Showcase
const state = {
    playlist: [...PORTFOLIO_DATABASE],
    currentSongIndex: 0,
    isPlaying: false,
    currentMode: "music", // "music" (Master), "video" (Sesión), "karaoke" (Vocal/Guión)
    currentView: "home",  // "home", "search", "about"
    isMuted: false,
    volume: 0.8
};

// Motores de Audio y Video
let audioEngine = null;
let ytPlayer = null;
let isYTApiLoaded = false;
let updateInterval = null;

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initDOM();
    initEventListeners();
    loadYTApi();
    renderPortfolioGrids();
    loadSong(state.currentSongIndex, false);
    initVisualizer();
});

let dom = {};
function initDOM() {
    dom = {
        cinematicBg: document.getElementById("cinematicBg"),
        quickGrid: document.getElementById("quickGrid"),
        recommendedGrid: document.getElementById("recommendedGrid"),
        
        // Navegación Sidebar
        menuHome: document.getElementById("menuHome"),
        menuSearch: document.getElementById("menuSearch"),
        menuAbout: document.getElementById("menuAbout"),
        
        // Vistas
        viewHome: document.getElementById("viewHome"),
        viewSearchResults: document.getElementById("viewSearchResults"),
        viewAbout: document.getElementById("viewAbout"),
        contentPanel: document.getElementById("contentPanel"),
        
        // Buscador
        searchInput: document.getElementById("searchInput"),
        searchResultsList: document.getElementById("searchResultsList"),
        searchBarContainer: document.getElementById("searchBarContainer"),
        
        // Selectores de Modo de Audición
        btnModeMusic: document.getElementById("btnModeMusic"),
        btnModeVideo: document.getElementById("btnModeVideo"),
        btnModeKaraoke: document.getElementById("btnModeKaraoke"),
        panelModeMusic: document.getElementById("panelModeMusic"),
        panelModeVideo: document.getElementById("panelModeVideo"),
        panelModeKaraoke: document.getElementById("panelModeKaraoke"),
        
        // Escenarios de reproducción
        vinylDisc: document.getElementById("vinylDisc"),
        musicStageCover: document.getElementById("musicStageCover"),
        lyricsScrollContainer: document.getElementById("lyricsScrollContainer"),
        lyricsWrapper: document.getElementById("lyricsWrapper"),
        audioVisualizerCanvas: document.getElementById("audioVisualizerCanvas"),
        
        // Controles de barra inferior
        playerCover: document.getElementById("playerCover"),
        playerTitle: document.getElementById("playerTitle"),
        playerArtist: document.getElementById("playerArtist"),
        playerBuyBtn: document.getElementById("playerBuyBtn"),
        
        btnShuffle: document.getElementById("btnShuffle"),
        btnPrev: document.getElementById("btnPrev"),
        btnPlayPause: document.getElementById("btnPlayPause"),
        btnNext: document.getElementById("btnNext"),
        btnRepeat: document.getElementById("btnRepeat"),
        
        currentTimeText: document.getElementById("currentTimeText"),
        totalDurationText: document.getElementById("totalDurationText"),
        progressBarTrack: document.getElementById("progressBarTrack"),
        progressBarFill: document.getElementById("progressBarFill"),
        progressHandle: document.getElementById("progressHandle"),
        
        // Volumen
        btnMute: document.getElementById("btnMute"),
        volumeSliderTrack: document.getElementById("volumeSliderTrack"),
        volumeSliderFill: document.getElementById("volumeSliderFill"),
        volumeHandle: document.getElementById("volumeHandle")
    };
    
    lucide.createIcons();
}

// Carga asíncrona de YouTube IFrame API
function loadYTApi() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

window.onYouTubeIframeAPIReady = function() {
    isYTApiLoaded = true;
    initYouTubePlayer();
};

function initYouTubePlayer() {
    ytPlayer = new YT.Player('youtubeVideoPlayer', {
        height: '100%',
        width: '100%',
        videoId: PORTFOLIO_DATABASE[0].youtubeId,
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'disablekb': 1,
            'rel': 0,
            'modestbranding': 1,
            'showinfo': 0
        },
        events: {
            'onReady': (e) => ytPlayer.setVolume(state.volume * 100),
            'onStateChange': (e) => {
                if (e.data === YT.PlayerState.ENDED) nextTrack();
            }
        }
    });
}

// ==========================================================================
// CONTROL DE VISTAS (SPA)
// ==========================================================================
function switchView(viewName) {
    state.currentView = viewName;
    
    // Ocultar todas las vistas principales
    dom.viewHome.classList.remove("active-view");
    dom.viewSearchResults.classList.remove("active-view");
    dom.viewAbout.classList.remove("active-view");
    
    // Ocultar paneles de reproducción a menos que estemos en Home o Ficha Técnica
    if (viewName === "search") {
        dom.viewSearchResults.classList.add("active-view");
        dom.panelModeMusic.classList.add("hidden");
        dom.panelModeVideo.classList.add("hidden");
        dom.panelModeKaraoke.classList.add("hidden");
    } else {
        updateActiveModePanel();
        if (viewName === "home") {
            dom.viewHome.classList.add("active-view");
        } else if (viewName === "about") {
            dom.viewAbout.classList.add("active-view");
        }
    }
    
    // Sincronizar botones laterales de la barra
    dom.menuHome.classList.remove("active");
    dom.menuSearch.classList.remove("active");
    dom.menuAbout.classList.remove("active");
    
    if (viewName === "home") dom.menuHome.classList.add("active");
    if (viewName === "search") dom.menuSearch.classList.add("active");
    if (viewName === "about") dom.menuAbout.classList.add("active");
}

// ==========================================================================
// RENDERIZADO DEL PORTFOLIO
// ==========================================================================
function renderPortfolioGrids() {
    dom.quickGrid.innerHTML = "";
    dom.recommendedGrid.innerHTML = "";
    
    // Grid rápido superior (Acceso directo)
    PORTFOLIO_DATABASE.forEach((song, idx) => {
        const qCard = document.createElement("div");
        qCard.className = "quick-card";
        qCard.innerHTML = `
            <img src="${song.cover}" alt="${song.title}" class="quick-card-img">
            <span class="quick-card-title">${song.title}</span>
            <button class="quick-play-btn">
                <i data-lucide="play"></i>
            </button>
        `;
        qCard.querySelector(".quick-play-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            playSongAt(idx);
        });
        qCard.addEventListener("click", () => playSongAt(idx));
        dom.quickGrid.appendChild(qCard);
    });

    // Grid inferior de proyectos destacados
    PORTFOLIO_DATABASE.forEach((song, idx) => {
        const mCard = document.createElement("div");
        mCard.className = "music-card";
        mCard.innerHTML = `
            <div class="card-img-container">
                <img src="${song.cover}" alt="${song.title}" class="card-img">
                <button class="card-play-btn">
                    <i data-lucide="play"></i>
                </button>
            </div>
            <h4 class="card-title">${song.title}</h4>
            <p class="card-artist">${song.artist}</p>
        `;
        mCard.querySelector(".card-play-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            playSongAt(idx);
        });
        mCard.addEventListener("click", () => playSongAt(idx));
        dom.recommendedGrid.appendChild(mCard);
    });
    
    lucide.createIcons();
}

// ==========================================================================
// MOTOR DE AUDIO (UNIFICADO)
// ==========================================================================
function loadSong(index, shouldPlay = true) {
    if (index < 0 || index >= state.playlist.length) return;
    
    state.currentSongIndex = index;
    const song = state.playlist[index];
    
    // Resetear reproducción
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        ytPlayer.pauseVideo();
    }
    
    // Actualizar datos del reproductor inferior
    dom.playerTitle.textContent = song.title;
    dom.playerArtist.textContent = song.artist;
    dom.playerCover.src = song.cover;
    dom.musicStageCover.src = song.cover;
    
    // Actualizar botón de venta/licencia
    if (song.buyUrl) {
        dom.playerBuyBtn.href = song.buyUrl;
        dom.playerBuyBtn.classList.remove("hidden");
    } else {
        dom.playerBuyBtn.classList.add("hidden");
    }
    
    // Actualizar fondo ambiental
    dom.cinematicBg.style.backgroundImage = `url('${song.cover}')`;
    
    // Reproducir siempre con el YouTube Player para usar sus audios reales
    if (ytPlayer && isYTApiLoaded) {
        ytPlayer.cueVideoById(song.youtubeId);
        if (shouldPlay) {
            ytPlayer.playVideo();
            state.isPlaying = true;
        }
    }
    
    state.isPlaying = shouldPlay;
    updatePlayPauseUI();
    
    // Cargar notas técnicas de mezcla/grabación en pantalla
    renderStudioNotes(song.lyrics);
    startProgressTimer();
}
    
function playSongAt(index) {
    loadSong(index, true);
    switchView("home"); // Regresa a home si estaba en Ficha o Búsqueda para ver el reproductor
}
    
function togglePlayPause() {
    if (state.isPlaying) {
        if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
            ytPlayer.pauseVideo();
        }
        state.isPlaying = false;
    } else {
        if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
            ytPlayer.playVideo();
        }
        state.isPlaying = true;
    }
    updatePlayPauseUI();
}

function updatePlayPauseUI() {
    if (state.isPlaying) {
        dom.btnPlayPause.innerHTML = `<i data-lucide="pause" style="fill: black;"></i>`;
        dom.vinylDisc.classList.add("playing");
    } else {
        dom.btnPlayPause.innerHTML = `<i data-lucide="play" style="fill: black; margin-left: 2px;"></i>`;
        dom.vinylDisc.classList.remove("playing");
    }
    lucide.createIcons();
}

function nextTrack() {
    let idx = state.currentSongIndex + 1;
    if (idx >= state.playlist.length) idx = 0;
    loadSong(idx, true);
}

function prevTrack() {
    let idx = state.currentSongIndex - 1;
    if (idx < 0) idx = state.playlist.length - 1;
    loadSong(idx, true);
}

// Sincronizador de línea de tiempo
function startProgressTimer() {
    if (updateInterval) clearInterval(updateInterval);
    
    updateInterval = setInterval(() => {
        let current = 0;
        let duration = 0;
        
        if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
            current = ytPlayer.getCurrentTime() || 0;
            duration = ytPlayer.getDuration() || 1;
        }
        
        if (isNaN(duration) || duration === 0) duration = 1;
        
        dom.currentTimeText.textContent = formatTime(current);
        dom.totalDurationText.textContent = formatTime(duration);
        
        const pct = (current / duration) * 100;
        dom.progressBarFill.style.width = `${pct}%`;
        dom.progressHandle.style.left = `${pct}%`;
        
        if (state.currentMode === "karaoke") {
            syncStudioNotes(current);
        }
    }, 250);
}
    
function formatTime(s) {
    if (isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}
    
function handleTimelineClick(e) {
    const rect = dom.progressBarTrack.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    if (ytPlayer && typeof ytPlayer.getDuration === 'function') {
        const duration = ytPlayer.getDuration() || 0;
        ytPlayer.seekTo(percent * duration, true);
    }
}
    
// Volumen
function updateVolume(percent) {
    state.volume = Math.max(0, Math.min(1, percent));
    if (ytPlayer && typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(state.volume * 100);
    
    dom.volumeSliderFill.style.width = `${state.volume * 100}%`;
    dom.volumeHandle.style.left = `${state.volume * 100}%`;
    
    if (state.volume === 0 || state.isMuted) {
        dom.btnMute.innerHTML = `<i data-lucide="volume-x"></i>`;
    } else if (state.volume < 0.4) {
        dom.btnMute.innerHTML = `<i data-lucide="volume-1"></i>`;
    } else {
        dom.btnMute.innerHTML = `<i data-lucide="volume-2"></i>`;
    }
    lucide.createIcons();
}
    
// ==========================================================================
// NOTAS TÉCNICAS SINOPSIS DE MEZCLA (MODO VOCAL / LETRAS)
// ==========================================================================
function renderStudioNotes(notes) {
    dom.lyricsWrapper.innerHTML = "";
    if (!notes || notes.length === 0) {
        dom.lyricsWrapper.innerHTML = `<p class="lyric-line no-lyrics">No hay comentarios de mezcla guardados para este master.</p>`;
        return;
    }
    
    notes.forEach((line, idx) => {
        const pLine = document.createElement("p");
        pLine.className = `lyric-line ${idx === 0 ? 'active' : ''}`;
        pLine.textContent = line.text;
        pLine.dataset.time = line.time;
        
        pLine.addEventListener("click", () => {
            if (ytPlayer && typeof ytPlayer.seekTo === 'function') ytPlayer.seekTo(line.time, true);
        });
        
        dom.lyricsWrapper.appendChild(pLine);
    });
}

let lastNoteIdx = -1;
function syncStudioNotes(currentTime) {
    const lines = dom.lyricsWrapper.querySelectorAll(".lyric-line");
    if (lines.length === 0 || lines[0].classList.contains("no-lyrics")) return;
    
    let activeIdx = 0;
    for (let i = 0; i < lines.length; i++) {
        if (currentTime >= parseFloat(lines[i].dataset.time)) {
            activeIdx = i;
        } else {
            break;
        }
    }
    
    if (activeIdx !== lastNoteIdx) {
        lastNoteIdx = activeIdx;
        lines.forEach(l => l.classList.remove("active"));
        const activeLine = lines[activeIdx];
        if (activeLine) {
            activeLine.classList.add("active");
            const containerHeight = dom.lyricsScrollContainer.clientHeight;
            dom.lyricsScrollContainer.scrollTop = activeLine.offsetTop - (containerHeight / 2) + (activeLine.clientHeight / 2);
        }
    }
}

// ==========================================================================
// SELECCIÓN DE MODOS
// ==========================================================================
function selectPlayMode(mode) {
    state.currentMode = mode;
    
    dom.btnModeMusic.classList.remove("active");
    dom.btnModeVideo.classList.remove("active");
    dom.btnModeKaraoke.classList.remove("active");
    
    if (mode === "music") dom.btnModeMusic.classList.add("active");
    if (mode === "video") dom.btnModeVideo.classList.add("active");
    if (mode === "karaoke") dom.btnModeKaraoke.classList.add("active");
    
    if (state.currentView !== "search") {
        updateActiveModePanel();
    }
    
    // Forzamos recarga sobre el nuevo motor de modo
    loadSong(state.currentSongIndex, state.isPlaying);
}

function updateActiveModePanel() {
    dom.panelModeMusic.classList.add("hidden");
    dom.panelModeVideo.classList.add("video-offscreen");
    dom.panelModeKaraoke.classList.add("hidden");
    
    if (state.currentMode === "music") dom.panelModeMusic.classList.remove("hidden");
    if (state.currentMode === "video") dom.panelModeVideo.classList.remove("video-offscreen");
    if (state.currentMode === "karaoke") dom.panelModeKaraoke.classList.remove("hidden");
}

// ==========================================================================
// BUSCADOR EN VIVO
// ==========================================================================
function handleSearch(query) {
    if (!query || query.trim() === "") {
        switchView("home");
        return;
    }
    
    switchView("search");
    dom.searchResultsList.innerHTML = "";
    
    const results = PORTFOLIO_DATABASE.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length === 0) {
        dom.searchResultsList.innerHTML = `<div style="padding: 40px; text-align: center; color: hsl(var(--color-text-muted));"><p>No se encontraron proyectos para "${query}"</p></div>`;
        return;
    }
    
    results.forEach((song, idx) => {
        const realIdx = PORTFOLIO_DATABASE.findIndex(s => s.id === song.id);
        const row = document.createElement("div");
        row.className = `track-row ${realIdx === state.currentSongIndex ? 'playing-row' : ''}`;
        row.innerHTML = `
            <span class="row-num">${idx + 1}</span>
            <div class="row-title-block">
                <img src="${song.cover}" alt="Funda" class="row-cover">
                <div class="row-meta">
                    <span class="row-title-text">${song.title}</span>
                    <span class="row-artist-text">${song.artist}</span>
                </div>
            </div>
            <span class="row-album-text">${song.album}</span>
            <span class="row-duration-text">${song.duration}</span>
        `;
        row.addEventListener("click", () => {
            playSongAt(realIdx);
            dom.searchInput.value = "";
        });
        dom.searchResultsList.appendChild(row);
    });
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================
function initEventListeners() {
    dom.menuHome.addEventListener("click", () => switchView("home"));
    dom.menuSearch.addEventListener("click", () => { switchView("search"); dom.searchInput.focus(); });
    dom.menuAbout.addEventListener("click", () => switchView("about"));
    
    dom.btnModeMusic.addEventListener("click", () => selectPlayMode("music"));
    dom.btnModeVideo.addEventListener("click", () => selectPlayMode("video"));
    dom.btnModeKaraoke.addEventListener("click", () => selectPlayMode("karaoke"));
    
    dom.btnPlayPause.addEventListener("click", togglePlayPause);
    dom.btnNext.addEventListener("click", nextTrack);
    dom.btnPrev.addEventListener("click", prevTrack);
    
    dom.progressBarTrack.addEventListener("click", handleTimelineClick);
    
    dom.volumeSliderTrack.addEventListener("click", (e) => {
        const rect = dom.volumeSliderTrack.getBoundingClientRect();
        updateVolume((e.clientX - rect.left) / rect.width);
    });
    
    dom.btnMute.addEventListener("click", () => {
        state.isMuted = !state.isMuted;
        if (state.isMuted) {
            if (ytPlayer && typeof ytPlayer.mute === 'function') ytPlayer.mute();
            dom.btnMute.innerHTML = `<i data-lucide="volume-x"></i>`;
            dom.volumeSliderFill.style.width = `0%`;
            dom.volumeHandle.style.left = `0%`;
        } else {
            updateVolume(state.volume);
        }
        lucide.createIcons();
    });
    
    dom.searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
}

// ==========================================================================
// CANVAS SPECTROMETER (INTERACTIVO MONOCROMO)
// ==========================================================================
let canvasCtx = null;
function initVisualizer() {
    const canvas = dom.audioVisualizerCanvas;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    canvasCtx = canvas.getContext("2d");
    
    window.addEventListener("resize", () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });
}

function draw() {
    if (!canvasCtx) return;
    
    const canvas = dom.audioVisualizerCanvas;
    const w = canvas.width;
    const h = canvas.height;
    
    canvasCtx.clearRect(0, 0, w, h);
    
    const barWidth = 6;
    const gap = 4;
    const totalBars = Math.floor(w / (barWidth + gap));
    
    // Gradiente monocromático (Blanco radiante semi-translúcido)
    const grad = canvasCtx.createLinearGradient(0, h, 0, 0);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.05)");
    grad.addColorStop(0.6, "rgba(255, 255, 255, 0.5)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0.85)");
    
    canvasCtx.fillStyle = grad;
    
    const time = Date.now() * 0.0035;
    
    for (let i = 0; i < totalBars; i++) {
        let barHeight = 0;
        
        if (state.isPlaying) {
            // Algoritmo armónico para emular ondas complejas analógicas
            const s1 = Math.sin(i * 0.12 + time) * 40;
            const s2 = Math.cos(i * 0.07 - time * 1.2) * 25;
            const s3 = Math.sin(i * 0.25 + time * 1.8) * 15;
            
            barHeight = Math.max(4, (s1 + s2 + s3) + (h * 0.35));
            
            // Factor de compresión para atenuar los extremos laterales
            const factor = Math.sin((i / totalBars) * Math.PI);
            barHeight *= factor;
        } else {
            // Estado latente (silencio analógico con ruido sutil de piso de -90dB)
            barHeight = 4 + Math.sin(i * 0.1 + time * 0.15) * 2;
        }
        
        const x = i * (barWidth + gap);
        const y = h - barHeight;
        
        canvasCtx.beginPath();
        canvasCtx.roundRect(x, y, barWidth, barHeight, 2);
        canvasCtx.fill();
    }
    
    requestAnimationFrame(draw);
}

draw();
