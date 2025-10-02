# 🎥 COMO ADICIONAR VÍDEOS AO SEU PORTFÓLIO

## 📁 Estrutura de Pastas para Vídeos

### **midia/videos/**
- **cidade-noturna.mp4** - Vídeo principal do projeto
- **cidade-noturna.webm** - Versão alternativa (opcional)
- **jazz-fusion.mp4** - Sessão de jazz
- **amor-virtual.mp4** - Clipe musical
- **making-of-estudio.mp4** - Documentário do estúdio
- **live-session.mp4** - Gravação ao vivo

### **midia/imagens/** (Posters dos vídeos)
- **cidade-noturna-poster.jpg** - Imagem de capa do vídeo
- **jazz-fusion-poster.jpg** - Poster do vídeo de jazz
- **amor-virtual-poster.jpg** - Capa do clipe
- **making-of-poster.jpg** - Poster do making of
- **live-session-poster.jpg** - Capa da live session

## 🎬 Formatos de Vídeo Suportados

### **1. Formatos Principais:**
- **MP4** (recomendado) - Melhor compatibilidade
- **WebM** - Alternativa moderna e eficiente
- **MOV** - Para vídeos de alta qualidade

### **2. Especificações Recomendadas:**
- **Resolução:** 1920x1080 (Full HD) ou 1280x720 (HD)
- **Taxa de quadros:** 30fps ou 60fps
- **Codec:** H.264 para MP4, VP9 para WebM
- **Tamanho:** Máximo 50MB por vídeo
- **Duração:** 30 segundos a 5 minutos (ideal)

## 🔧 Como Adicionar Seus Vídeos

### **1. Preparar os Arquivos:**
1. **Converta seus vídeos** para MP4 (use HandBrake, VLC ou online)
2. **Redimensione** para 1920x1080 ou 1280x720
3. **Comprima** para máximo 50MB
4. **Renomeie** com nomes descritivos

### **2. Adicionar ao Site:**
1. **Coloque os vídeos** na pasta midia/videos/
2. **Adicione as imagens poster** na pasta midia/imagens/
3. **Atualize os nomes** no arquivo index.html

### **3. Exemplo de Estrutura:**
`
midia/
├── videos/
│   ├── cidade-noturna.mp4
│   ├── jazz-fusion.mp4
│   ├── amor-virtual.mp4
│   ├── making-of-estudio.mp4
│   └── live-session.mp4
└── imagens/
    ├── cidade-noturna-poster.jpg
    ├── jazz-fusion-poster.jpg
    ├── amor-virtual-poster.jpg
    ├── making-of-poster.jpg
    └── live-session-poster.jpg
`

## 📝 Atualizando o Código HTML

### **1. Estrutura do Vídeo no HTML:**
`html
<div class="portfolio-item" data-category="rock videos">
    <div class="portfolio-video">
        <video controls poster="midia/imagens/cidade-noturna-poster.jpg">
            <source src="midia/videos/cidade-noturna.mp4" type="video/mp4">
            <source src="midia/videos/cidade-noturna.webm" type="video/webm">
            Seu navegador não suporta vídeos HTML5.
        </video>
        <div class="portfolio-overlay">
            <h4>Cidade Noturna</h4>
            <p>The Night Owls</p>
            <div class="portfolio-details">
                <span class="genre">Rock</span>
                <span class="year">2024</span>
                <span class="type">Vídeo</span>
            </div>
        </div>
    </div>
</div>
`

### **2. Adicionar Novo Vídeo:**
1. **Copie** a estrutura acima
2. **Altere** os nomes dos arquivos
3. **Atualize** as informações do projeto
4. **Escolha** a categoria correta

## 🎨 Personalizando os Vídeos

### **1. Alterar Cores das Bordas:**
`css
/* No arquivo styles.css */
.portfolio-item[data-category*="rock"] .portfolio-video {
    border: 3px solid #8b0000; /* Vermelho escuro para rock */
}

.portfolio-item[data-category*="pop"] .portfolio-video {
    border: 3px solid #ff6b6b; /* Rosa para pop */
}
`

### **2. Ajustar Tamanho dos Vídeos:**
`css
.portfolio-video {
    height: 300px; /* Altere para 250px, 350px, etc. */
}
`

### **3. Modificar Efeitos de Hover:**
`css
.portfolio-video:hover {
    transform: translateY(-10px); /* Aumente para mais movimento */
    box-shadow: 0 20px 50px rgba(0,0,0,0.5); /* Sombra mais intensa */
}
`

## 🚀 Otimização de Vídeos

### **1. Ferramentas Recomendadas:**
- **HandBrake** - Conversão e compressão
- **VLC** - Conversão básica
- **FFmpeg** - Linha de comando (avançado)
- **Online:** CloudConvert, Online-Convert

### **2. Configurações de Compressão:**
- **Qualidade:** 70-80% (boa qualidade/size)
- **Bitrate:** 2-5 Mbps para 1080p
- **Codec:** H.264 (x264)
- **Profile:** High
- **Level:** 4.0

### **3. Dicas de Otimização:**
- **Use MP4** como formato principal
- **Mantenha vídeos curtos** (30s-2min)
- **Comprima bem** sem perder qualidade
- **Teste em diferentes dispositivos**

## 📱 Responsividade

### **1. Vídeos em Mobile:**
- **Altura reduzida** para 250px
- **Controles touch** otimizados
- **Carregamento rápido** essencial

### **2. Vídeos em Desktop:**
- **Altura padrão** de 300px
- **Hover effects** completos
- **Qualidade máxima** suportada

## ✅ Checklist de Vídeos

- [ ] Converter vídeos para MP4
- [ ] Redimensionar para 1920x1080 ou 1280x720
- [ ] Comprimir para máximo 50MB
- [ ] Criar imagens poster (800x600px)
- [ ] Adicionar arquivos nas pastas corretas
- [ ] Atualizar nomes no HTML
- [ ] Testar reprodução em diferentes navegadores
- [ ] Verificar em dispositivos móveis
- [ ] Otimizar para carregamento rápido

## 🎬 Tipos de Vídeo Recomendados

### **1. Clipes Musicais:**
- **Duração:** 30 segundos a 2 minutos
- **Qualidade:** 1080p
- **Áudio:** Sincronizado com a música

### **2. Making of/Behind the Scenes:**
- **Duração:** 1-3 minutos
- **Qualidade:** 720p ou 1080p
- **Conteúdo:** Processo de gravação

### **3. Live Sessions:**
- **Duração:** 2-5 minutos
- **Qualidade:** 720p
- **Áudio:** Qualidade de estúdio

### **4. Documentários:**
- **Duração:** 3-10 minutos
- **Qualidade:** 720p
- **Conteúdo:** História do projeto

## 💡 Dicas Importantes

- **Sempre use MP4** como formato principal
- **Crie imagens poster** atrativas
- **Mantenha vídeos curtos** para melhor experiência
- **Teste em diferentes navegadores**
- **Otimize para mobile** (conexões lentas)
- **Use nomes descritivos** para os arquivos
- **Faça backup** dos vídeos originais

---
**🎥 Agora você pode adicionar vídeos reais ao seu portfólio!**
