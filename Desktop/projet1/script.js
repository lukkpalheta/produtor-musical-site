// Sistema de controle de vídeos - apenas um por vez
let currentVideo = null;

// Função para pausar todos os vídeos exceto o atual
function pauseAllVideos(exceptVideo = null) {
    const allVideos = document.querySelectorAll('.portfolio-video video');
    
    allVideos.forEach(video => {
        if (video !== exceptVideo && !video.paused) {
            video.pause();
            // Atualizar estado visual do botão se existir
            updateVideoButtonState(video, false);
        }
    });
}

// Função para atualizar estado visual do botão de play
function updateVideoButtonState(video, isPlaying) {
    const videoContainer = video.closest('.portfolio-video');
    if (videoContainer) {
        // Adicionar classe para indicar estado
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
        
        // Pausar todos os outros vídeos
        pauseAllVideos(this);
        
        // Atualizar referência do vídeo atual
        currentVideo = this;
        
        // Atualizar estado visual
        updateVideoButtonState(this, true);
    });
    
    // Evento de pause
    video.addEventListener('pause', function() {
        console.log('Vídeo pausado:', this.src);
        
        // Atualizar estado visual
        updateVideoButtonState(this, false);
        
        // Se este era o vídeo atual, limpar referência
        if (currentVideo === this) {
            currentVideo = null;
        }
    });
    
    // Evento de fim
    video.addEventListener('ended', function() {
        console.log('Vídeo finalizado:', this.src);
        
        // Atualizar estado visual
        updateVideoButtonState(this, false);
        
        // Limpar referência se este era o vídeo atual
        if (currentVideo === this) {
            currentVideo = null;
        }
    });
    
    // Evento de clique no vídeo
    video.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (this.paused) {
            // Pausar todos os outros vídeos antes de tocar este
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

// Função para pausar vídeo atual (útil para botões externos)
function pauseCurrentVideo() {
    if (currentVideo && !currentVideo.paused) {
        currentVideo.pause();
    }
}

// Função para tocar vídeo específico
function playSpecificVideo(videoElement) {
    if (videoElement) {
        // Pausar todos os outros vídeos
        pauseAllVideos(videoElement);
        
        // Tocar o vídeo selecionado
        videoElement.play();
    }
}

// Adicionar estilos CSS para vídeo em reprodução
function addVideoPlayingStyles() {
    const style = document.createElement('style');
    style.textContent = 
        /* Estilo para vídeo em reprodução */
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
        
        /* Melhorar a aparência dos controles */
        .portfolio-video video::-webkit-media-controls-panel {
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }
        
        .portfolio-video video::-webkit-media-controls-play-button {
            background: rgba(102, 126, 234, 0.9);
            border-radius: 50%;
        }
    ;
    document.head.appendChild(style);
}

// Função para lidar com erros de vídeo
function handleVideoError(videoElement) {
    console.log('Erro ao carregar vídeo:', videoElement.src);
    
    // Marcar o vídeo como com erro
    videoElement.setAttribute('data-error', 'true');
    
    // Mostrar fallback
    const fallback = videoElement.querySelector('.video-fallback');
    if (fallback) {
        fallback.style.display = 'flex';
    }
    
    // Adicionar classe de erro ao container
    const videoContainer = videoElement.closest('.portfolio-video');
    if (videoContainer) {
        videoContainer.setAttribute('data-status', 'error');
    }
}

// Função para verificar se vídeos existem
function checkVideoAvailability() {
    const videos = document.querySelectorAll('video source');
    
    videos.forEach(source => {
        fetch(source.src, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    console.log('Vídeo não encontrado:', source.src);
                    handleVideoError(source.closest('video'));
                }
            })
            .catch(error => {
                console.log('Erro ao verificar vídeo:', source.src);
                handleVideoError(source.closest('video'));
            });
    });
}

// Função para adicionar fallback visual aos vídeos
function addVideoFallbacks() {
    const videos = document.querySelectorAll('.portfolio-video video');
    
    videos.forEach(video => {
        // Adicionar fallback se não existir
        if (!video.querySelector('.video-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'video-fallback';
            fallback.innerHTML = 
                <i class="fas fa-video"></i>
                <p>Vídeo não disponível</p>
                <small>Adicione o arquivo de vídeo</small>
            ;
            video.appendChild(fallback);
        }
        
        // Adicionar evento de erro
        video.addEventListener('error', function() {
            handleVideoError(this);
        });
        
        // Adicionar evento de carregamento
        video.addEventListener('loadstart', function() {
            const container = this.closest('.portfolio-video');
            if (container) {
                container.setAttribute('data-status', 'loading');
            }
        });
        
        video.addEventListener('loadeddata', function() {
            const container = this.closest('.portfolio-video');
            if (container) {
                container.setAttribute('data-status', 'loaded');
            }
        });
    });
}

// Sistema de Banco de Dados Local (localStorage)

// Inicializar dados se não existirem
function initDatabase() {
    if (!localStorage.getItem('produtor_musical_contacts')) {
        localStorage.setItem('produtor_musical_contacts', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('produtor_musical_portfolio')) {
        const portfolioData = [
            {
                id: 1,
                title: 'Luz da Manhã',
                artist: 'Maria Silva',
                category: 'pop',
                description: 'Single de pop brasileiro com arranjos modernos',
                audio_url: 'midia/audios/luz-da-manha.mp3',
                image_url: 'midia/imagens/luz-da-manha.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Cidade Noturna',
                artist: 'The Night Owls',
                category: 'rock',
                description: 'Álbum completo de rock alternativo',
                audio_url: 'midia/audios/cidade-noturna.mp3',
                image_url: 'midia/imagens/cidade-noturna.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 3,
                title: 'Digital Dreams',
                artist: 'Neon Pulse',
                category: 'electronic',
                description: 'EP de música eletrônica experimental',
                audio_url: 'midia/audios/digital-dreams.mp3',
                image_url: 'midia/imagens/digital-dreams.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 4,
                title: 'Jazz Fusion Session',
                artist: 'Quarteto Moderno',
                category: 'jazz',
                description: 'Sessão de jazz fusion ao vivo',
                audio_url: 'midia/audios/jazz-fusion.mp3',
                image_url: 'midia/imagens/jazz-fusion.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 5,
                title: 'Amor Virtual',
                artist: 'Lucas Santos',
                category: 'pop',
                description: 'Single pop com influências eletrônicas',
                audio_url: 'midia/audios/amor-virtual.mp3',
                image_url: 'midia/imagens/amor-virtual.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 6,
                title: 'Rebel Heart',
                artist: 'Thunder Strike',
                category: 'rock',
                description: 'Single de rock pesado com guitarras distorcidas',
                audio_url: 'midia/audios/rebel-heart.mp3',
                image_url: 'midia/imagens/rebel-heart.jpg',
                created_at: new Date().toISOString()
            }
        ];
        localStorage.setItem('produtor_musical_portfolio', JSON.stringify(portfolioData));
    }
}

// Variáveis globais para o player de áudio
let currentAudio = null;
let isPlaying = false;
let currentTrack = null;

// Função para tocar áudio
function playAudio(audioPath) {
    // Pausar vídeo atual se estiver tocando
    pauseCurrentVideo();
    
    // Parar áudio atual se estiver tocando
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
    }
    
    // Criar novo elemento de áudio
    currentAudio = new Audio(audioPath);
    
    // Configurar eventos
    currentAudio.addEventListener('loadedmetadata', function() {
        updatePlayerInfo();
        updateDuration();
    });
    
    currentAudio.addEventListener('timeupdate', function() {
        updateProgress();
    });
    
    currentAudio.addEventListener('ended', function() {
        stopAudio();
    });
    
    // Tocar áudio
    currentAudio.play().then(() => {
        isPlaying = true;
        showPlayer();
        updatePlayPauseButton();
    }).catch(error => {
        console.error('Erro ao reproduzir áudio:', error);
        alert('Erro ao reproduzir áudio. Verifique se o arquivo existe.');
    });
}

// Função para pausar/retomar áudio
function togglePlayPause() {
    if (!currentAudio) return;
    
    if (isPlaying) {
        currentAudio.pause();
        isPlaying = false;
    } else {
        currentAudio.play();
        isPlaying = true;
    }
    
    updatePlayPauseButton();
}

// Função para parar áudio
function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        isPlaying = false;
        hidePlayer();
        updatePlayPauseButton();
    }
}

// Função para mostrar o player
function showPlayer() {
    const player = document.getElementById('audioPlayer');
    if (player) {
        player.style.display = 'block';
    }
}

// Função para esconder o player
function hidePlayer() {
    const player = document.getElementById('audioPlayer');
    if (player) {
        player.style.display = 'none';
    }
}

// Função para atualizar informações do player
function updatePlayerInfo() {
    const title = document.getElementById('playerTitle');
    const artist = document.getElementById('playerArtist');
    
    if (title) title.textContent = currentTrack ? currentTrack.title : 'Tocando...';
    if (artist) artist.textContent = currentTrack ? currentTrack.artist : 'Artista';
}

// Função para atualizar duração
function updateDuration() {
    const duration = document.getElementById('duration');
    if (duration && currentAudio) {
        const minutes = Math.floor(currentAudio.duration / 60);
        const seconds = Math.floor(currentAudio.duration % 60);
        duration.textContent = ${minutes}:;
    }
}

// Função para atualizar progresso
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentTime = document.getElementById('currentTime');
    
    if (currentAudio) {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (currentTime) {
            const minutes = Math.floor(currentAudio.currentTime / 60);
            const seconds = Math.floor(currentAudio.currentTime % 60);
            currentTime.textContent = ${minutes}:;
        }
    }
}

// Função para atualizar botão play/pause
function updatePlayPauseButton() {
    const button = document.getElementById('playPauseBtn');
    if (button) {
        const icon = button.querySelector('i');
        if (isPlaying) {
            icon.className = 'fas fa-pause';
        } else {
            icon.className = 'fas fa-play';
        }
    }
}

// Função para salvar contato
function saveContact(contactData) {
    const contacts = JSON.parse(localStorage.getItem('produtor_musical_contacts'));
    const newContact = {
        id: Date.now(),
        ...contactData,
        created_at: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem('produtor_musical_contacts', JSON.stringify(contacts));
    return newContact;
}

// Função para buscar contatos
function getContacts() {
    return JSON.parse(localStorage.getItem('produtor_musical_contacts'));
}

// Função para buscar portfólio
function getPortfolio(category = 'all') {
    const portfolio = JSON.parse(localStorage.getItem('produtor_musical_portfolio'));
    if (category === 'all') {
        return portfolio;
    }
    return portfolio.filter(item => item.category === category);
}

// Função para adicionar item ao portfólio
function addPortfolioItem(itemData) {
    const portfolio = JSON.parse(localStorage.getItem('produtor_musical_portfolio'));
    const newItem = {
        id: Date.now(),
        ...itemData,
        created_at: new Date().toISOString()
    };
    portfolio.push(newItem);
    localStorage.setItem('produtor_musical_portfolio', JSON.stringify(portfolio));
    return newItem;
}

// Função para atualizar portfólio na página
function updatePortfolioDisplay(category = 'all') {
    const portfolioItems = getPortfolio(category);
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (portfolioGrid) {
        portfolioGrid.innerHTML = '';
        
        portfolioItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            
            portfolioItem.innerHTML = 
                <div class="portfolio-image" style="background: linear-gradient(45deg, #667eea, #764ba2);">
                    <div class="play-button" onclick="playAudio('')">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="portfolio-overlay">
                        <h4></h4>
                        <p></p>
                        <div class="portfolio-details">
                            <span class="genre"></span>
                            <span class="year">2024</span>
                        </div>
                    </div>
                </div>
            ;
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }
}

// Navegação móvel
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}));

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Filtros do portfólio
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        updatePortfolioDisplay(filter);
    });
});

// Efeito de scroll na navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    }
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validar dados
        if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        // Salvar contato
        try {
            saveContact(contactData);
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem Enviada!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
            
        } catch (error) {
            console.error('Erro ao salvar contato:', error);
            alert('Erro ao enviar mensagem. Tente novamente.');
        }
    });
}

// Botões de play do portfólio
document.addEventListener('click', (e) => {
    if (e.target.closest('.play-button')) {
        e.stopPropagation();
        const icon = e.target.closest('.play-button').querySelector('i');
        
        if (icon.classList.contains('fa-play')) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }
});

// Sistema de controle de vídeos - apenas um por vez
let currentVideo = null;

// Função para pausar todos os vídeos exceto o atual
function pauseAllVideos(exceptVideo = null) {
    const allVideos = document.querySelectorAll(".portfolio-video video");
    
    allVideos.forEach(video => {
        if (video !== exceptVideo && !video.paused) {
            video.pause();
            updateVideoButtonState(video, false);
        }
    });
}

// Função para atualizar estado visual do botão de play
function updateVideoButtonState(video, isPlaying) {
    const videoContainer = video.closest(".portfolio-video");
    if (videoContainer) {
        if (isPlaying) {
            videoContainer.classList.add("playing");
        } else {
            videoContainer.classList.remove("playing");
        }
    }
}

// Função para configurar eventos de vídeo
function setupVideoEvents(video) {
    // Evento de play
    video.addEventListener("play", function() {
        console.log("Vídeo iniciado:", this.src);
        pauseAllVideos(this);
        currentVideo = this;
        updateVideoButtonState(this, true);
    });
    
    // Evento de pause
    video.addEventListener("pause", function() {
        console.log("Vídeo pausado:", this.src);
        updateVideoButtonState(this, false);
        if (currentVideo === this) {
            currentVideo = null;
        }
    });
    
    // Evento de fim
    video.addEventListener("ended", function() {
        console.log("Vídeo finalizado:", this.src);
        updateVideoButtonState(this, false);
        if (currentVideo === this) {
            currentVideo = null;
        }
    });
    
    // Evento de clique no vídeo
    video.addEventListener("click", function(e) {
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
    const allVideos = document.querySelectorAll(".portfolio-video video");
    allVideos.forEach(video => {
        setupVideoEvents(video);
    });
    console.log("Configurados", allVideos.length, "vídeos com controle automático");
}

// Adicionar estilos CSS para vídeo em reprodução
function addVideoPlayingStyles() {
    const style = document.createElement("style");
    style.textContent = \`
        .portfolio-video.playing {
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
            transform: translateY(-5px);
        }
        
        .portfolio-video.playing::before {
            content: "▶";
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
    \`;
    document.head.appendChild(style);
}

// Inicializar banco de dados e carregar dados
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    updatePortfolioDisplay();
    addVideoFallbacks();
    addVideoPlayingStyles();
    
    // Configurar vídeos após um pequeno delay
    setTimeout(() => {
        setupAllVideos();
        checkVideoAvailability();
    }, 1000);
    
    // Mostrar estatísticas no console (para desenvolvimento)
    console.log('📊 Estatísticas do Site:');
    console.log(📧 Contatos: );
    console.log(🎵 Itens do Portfólio: );
    console.log('�� Site do Produtor Musical carregado!');
});

// Função para exportar dados (para backup)
function exportData() {
    const data = {
        contacts: getContacts(),
        portfolio: getPortfolio(),
        export_date: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'produtor_musical_backup.json';
    link.click();
}

// Função para importar dados (para restaurar backup)
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.contacts) {
                localStorage.setItem('produtor_musical_contacts', JSON.stringify(data.contacts));
            }
            
            if (data.portfolio) {
                localStorage.setItem('produtor_musical_portfolio', JSON.stringify(data.portfolio));
            }
            
            updatePortfolioDisplay();
            alert('Dados importados com sucesso!');
            
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            alert('Erro ao importar dados. Verifique o arquivo.');
        }
    };
    reader.readAsText(file);
}

// Adicionar funções ao window para acesso global
window.exportData = exportData;
window.importData = importData;
window.getContacts = getContacts;
window.getPortfolio = getPortfolio;
window.addPortfolioItem = addPortfolioItem;
window.playAudio = playAudio;
window.togglePlayPause = togglePlayPause;
window.stopAudio = stopAudio;
window.handleVideoError = handleVideoError;
window.pauseCurrentVideo = pauseCurrentVideo;
window.playSpecificVideo = playSpecificVideo;

 / /   F u n � � o   p a r a   t o c a r   v � d e o   a o   c l i c a r   n a   c a p a 
 f u n c t i o n   p l a y V i d e o ( c o n t a i n e r )   { 
         c o n s t   v i d e o   =   c o n t a i n e r . q u e r y S e l e c t o r ( ' v i d e o ' ) ; 
         c o n s t   c o v e r   =   c o n t a i n e r . q u e r y S e l e c t o r ( ' . v i d e o - c o v e r ' ) ; 
         
         i f   ( v i d e o   & &   c o v e r )   { 
                 / /   P a u s a r   t o d o s   o s   o u t r o s   v � d e o s 
                 p a u s e A l l V i d e o s ( ) ; 
                 
                 / /   M o s t r a r   o   v � d e o   e   e s c o n d e r   a   c a p a 
                 v i d e o . s t y l e . d i s p l a y   =   ' b l o c k ' ; 
                 c o v e r . s t y l e . d i s p l a y   =   ' n o n e ' ; 
                 c o n t a i n e r . c l a s s L i s t . a d d ( ' p l a y i n g ' ) ; 
                 
                 / /   T o c a r   o   v � d e o 
                 v i d e o . p l a y ( ) ; 
         } 
 } 
 
 / /   F u n � � o   p a r a   p a u s a r   t o d o s   o s   v � d e o s 
 f u n c t i o n   p a u s e A l l V i d e o s ( )   { 
         c o n s t   a l l V i d e o s   =   d o c u m e n t . q u e r y S e l e c t o r A l l ( ' . p o r t f o l i o - v i d e o   v i d e o ' ) ; 
         c o n s t   a l l C o n t a i n e r s   =   d o c u m e n t . q u e r y S e l e c t o r A l l ( ' . p o r t f o l i o - v i d e o ' ) ; 
         
         a l l V i d e o s . f o r E a c h ( v i d e o   = >   { 
                 v i d e o . p a u s e ( ) ; 
                 v i d e o . s t y l e . d i s p l a y   =   ' n o n e ' ; 
         } ) ; 
         
         a l l C o n t a i n e r s . f o r E a c h ( c o n t a i n e r   = >   { 
                 c o n t a i n e r . c l a s s L i s t . r e m o v e ( ' p l a y i n g ' ) ; 
                 c o n s t   c o v e r   =   c o n t a i n e r . q u e r y S e l e c t o r ( ' . v i d e o - c o v e r ' ) ; 
                 i f   ( c o v e r )   { 
                         c o v e r . s t y l e . d i s p l a y   =   ' f l e x ' ; 
                 } 
         } ) ; 
 } 
 
 / /   A d i c i o n a r   e v e n t   l i s t e n e r s   q u a n d o   a   p � g i n a   c a r r e g a r 
 d o c u m e n t . a d d E v e n t L i s t e n e r ( ' D O M C o n t e n t L o a d e d ' ,   f u n c t i o n ( )   { 
         / /   A d i c i o n a r   o n c l i c k   p a r a   t o d o s   o s   c o n t a i n e r s   d e   v � d e o 
         c o n s t   v i d e o C o n t a i n e r s   =   d o c u m e n t . q u e r y S e l e c t o r A l l ( ' . p o r t f o l i o - v i d e o ' ) ; 
         v i d e o C o n t a i n e r s . f o r E a c h ( c o n t a i n e r   = >   { 
                 c o n t a i n e r . a d d E v e n t L i s t e n e r ( ' c l i c k ' ,   f u n c t i o n ( )   { 
                         p l a y V i d e o ( t h i s ) ; 
                 } ) ; 
         } ) ; 
         
         / /   P a u s a r   v � d e o   q u a n d o   c l i c a r   f o r a 
         d o c u m e n t . a d d E v e n t L i s t e n e r ( ' c l i c k ' ,   f u n c t i o n ( e )   { 
                 i f   ( ! e . t a r g e t . c l o s e s t ( ' . p o r t f o l i o - v i d e o ' ) )   { 
                         p a u s e A l l V i d e o s ( ) ; 
                 } 
         } ) ; 
 } ) ; 
 
 
 
 / /   F u n � � o   p a r a   t o c a r   v � d e o   a o   c l i c a r   n a   m i n i a t u r a 
 f u n c t i o n   p l a y V i d e o ( c o n t a i n e r )   { 
         c o n s t   v i d e o   =   c o n t a i n e r . q u e r y S e l e c t o r ( ' v i d e o ' ) ; 
         
         i f   ( v i d e o )   { 
                 / /   P a u s a r   t o d o s   o s   o u t r o s   v � d e o s 
                 p a u s e A l l V i d e o s ( ) ; 
                 
                 / /   T o c a r   o   v � d e o   s e l e c i o n a d o 
                 v i d e o . p l a y ( ) ; 
                 c o n t a i n e r . c l a s s L i s t . a d d ( ' p l a y i n g ' ) ; 
         } 
 } 
 
 / /   F u n � � o   p a r a   p a u s a r   t o d o s   o s   v � d e o s 
 f u n c t i o n   p a u s e A l l V i d e o s ( )   { 
         c o n s t   a l l V i d e o s   =   d o c u m e n t . q u e r y S e l e c t o r A l l ( ' . p o r t f o l i o - v i d e o   v i d e o ' ) ; 
         c o n s t   a l l C o n t a i n e r s   =   d o c u m e n t . q u e r y S e l e c t o r A l l ( ' . p o r t f o l i o - v i d e o ' ) ; 
         
         a l l V i d e o s . f o r E a c h ( v i d e o   = >   { 
                 v i d e o . p a u s e ( ) ; 
         } ) ; 
         
         a l l C o n t a i n e r s . f o r E a c h ( c o n t a i n e r   = >   { 
                 c o n t a i n e r . c l a s s L i s t . r e m o v e ( ' p l a y i n g ' ) ; 
         } ) ; 
 } 
 
 / /   A d i c i o n a r   e v e n t   l i s t e n e r s   q u a n d o   a   p � g i n a   c a r r e g a r 
 d o c u m e n t . a d d E v e n t L i s t e n e r ( ' D O M C o n t e n t L o a d e d ' ,   f u n c t i o n ( )   { 
         / /   A d i c i o n a r   o n c l i c k   p a r a   t o d o s   o s   c o n t a i n e r s   d e   v � d e o 
         c o n s t   v i d e o C o n t a i n e r s   =   d o c u m e n t . q u e r y S e l e c t o r A l l ( ' . p o r t f o l i o - v i d e o ' ) ; 
         v i d e o C o n t a i n e r s . f o r E a c h ( c o n t a i n e r   = >   { 
                 c o n t a i n e r . a d d E v e n t L i s t e n e r ( ' c l i c k ' ,   f u n c t i o n ( e )   { 
                         e . p r e v e n t D e f a u l t ( ) ; 
                         p l a y V i d e o ( t h i s ) ; 
                 } ) ; 
         } ) ; 
         
         / /   P a u s a r   v � d e o   q u a n d o   c l i c a r   f o r a 
         d o c u m e n t . a d d E v e n t L i s t e n e r ( ' c l i c k ' ,   f u n c t i o n ( e )   { 
                 i f   ( ! e . t a r g e t . c l o s e s t ( ' . p o r t f o l i o - v i d e o ' ) )   { 
                         p a u s e A l l V i d e o s ( ) ; 
                 } 
         } ) ; 
 } ) ; 
 
 
 
