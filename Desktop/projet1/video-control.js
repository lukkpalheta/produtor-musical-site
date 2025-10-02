// Sistema de controle de vídeos - apenas um por vez
let currentVideo = null;

// Função para pausar todos os vídeos exceto o atual
function pauseAllVideos(exceptVideo = null) {
    const allVideos = document.querySelectorAll('.portfolio-video video');
    
    allVideos.forEach(video => {
        if (video !== exceptVideo && !video.paused) {
            video.pause();
            updateVideoButtonState(video, false);
        }
    });
}

// Função para atualizar estado visual do botão de play
function updateVideoButtonState(video, isPlaying) {
    const videoContainer = video.closest('.portfolio-video');
    if (videoContainer) {
        if (isPlaying) {
            videoContainer.classList.add('playing');
        } else {
            videoContainer.classList.remove('playing');
        }
    }
}

// Função para configurar eventos de vídeo
function setupVideoEvents(video) {
    // Evento de play
    video.addEventListener('play', function() {
        console.log('Vídeo iniciado:', this.src);
        pauseAllVideos(this);
        currentVideo = this;
        updateVideoButtonState(this, true);
    });
    
    // Evento de pause
    video.addEventListener('pause', function() {
        console.log('Vídeo pausado:', this.src);
        updateVideoButtonState(this, false);
        if (currentVideo === this) {
            currentVideo = null;
        }
    });
    
    // Evento de fim
    video.addEventListener('ended', function() {
        console.log('Vídeo finalizado:', this.src);
        updateVideoButtonState(this, false);
        if (currentVideo === this) {
            currentVideo = null;
        }
    });
    
    // Evento de clique no vídeo
    video.addEventListener('click', function(e) {
        e.stopPropagation();
        if (this.paused) {
            pauseAllVideos(this);
            this.play();
        } else {
            this.pause();
        }
    });
}

// Função para configurar todos os vídeos
function setupAllVideos() {
    const allVideos = document.querySelectorAll('.portfolio-video video');
    allVideos.forEach(video => {
        setupVideoEvents(video);
    });
    console.log('Configurados', allVideos.length, 'vídeos com controle automático');
}

// Função para pausar vídeo atual
function pauseCurrentVideo() {
    if (currentVideo && !currentVideo.paused) {
        currentVideo.pause();
    }
}

// Adicionar estilos CSS para vídeo em reprodução
function addVideoPlayingStyles() {
    const style = document.createElement('style');
    style.textContent = \
        .portfolio-video.playing {
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
            transform: translateY(-5px);
        }
        
        .portfolio-video.playing::before {
            content: '▶';
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            padding: 5px 8px;
            border-radius: 50%;
            font-size: 12px;
            z-index: 10;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
    \;
    document.head.appendChild(style);
}

// Adicionar funções ao window para acesso global
window.pauseAllVideos = pauseAllVideos;
window.setupAllVideos = setupAllVideos;
window.pauseCurrentVideo = pauseCurrentVideo;
window.addVideoPlayingStyles = addVideoPlayingStyles;
