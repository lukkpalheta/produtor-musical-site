# 🎵 COMO ADICIONAR MÍDIA AO SEU PORTFÓLIO

## 📁 Estrutura de Pastas Criada

### **midia/**
- **audios/** - Para arquivos de áudio (.mp3, .wav, .m4a)
- **imagens/** - Para imagens (.jpg, .png, .webp)
- **videos/** - Para vídeos (.mp4, .webm, .mov)

## 🎵 Adicionando Áudios

### **1. Formatos Suportados:**
- MP3 (recomendado)
- WAV
- M4A
- OGG

### **2. Como Adicionar:**
1. Coloque seus arquivos de áudio na pasta midia/audios/
2. Use nomes descritivos: luz-da-manha.mp3
3. Mantenha arquivos pequenos (máximo 10MB)

### **3. Exemplo de Estrutura:**
`
midia/audios/
├── luz-da-manha.mp3
├── cidade-noturna.mp3
├── digital-dreams.mp3
├── jazz-fusion.mp3
├── amor-virtual.mp3
└── rebel-heart.mp3
`

## 🖼️ Adicionando Imagens

### **1. Formatos Suportados:**
- JPG (recomendado)
- PNG
- WebP

### **2. Como Adicionar:**
1. Coloque suas imagens na pasta midia/imagens/
2. Use nomes descritivos: luz-da-manha.jpg
3. Tamanho recomendado: 800x600 pixels

### **3. Exemplo de Estrutura:**
`
midia/imagens/
├── luz-da-manha.jpg
├── cidade-noturna.jpg
├── digital-dreams.jpg
├── jazz-fusion.jpg
├── amor-virtual.jpg
└── rebel-heart.jpg
`

## 🎬 Adicionando Vídeos

### **1. Formatos Suportados:**
- MP4 (recomendado)
- WebM
- MOV

### **2. Como Adicionar:**
1. Coloque seus vídeos na pasta midia/videos/
2. Use nomes descritivos: making-of-luz-da-manha.mp4
3. Tamanho recomendado: máximo 50MB

## 🔧 Configuração no Código

### **1. Atualizar URLs no JavaScript:**
`javascript
// No arquivo script.js, atualize as URLs:
audio_url: 'midia/audios/luz-da-manha.mp3',
image_url: 'midia/imagens/luz-da-manha.jpg',
`

### **2. Adicionar Novo Projeto:**
`javascript
{
    id: 7,
    title: 'Seu Novo Projeto',
    artist: 'Nome do Artista',
    category: 'pop',
    description: 'Descrição do projeto',
    audio_url: 'midia/audios/seu-projeto.mp3',
    image_url: 'midia/imagens/seu-projeto.jpg',
    created_at: new Date().toISOString()
}
`

## 🎨 Personalizando o Portfólio

### **1. Alterar Cores dos Cards:**
`css
/* No arquivo styles.css */
.portfolio-image {
    background: linear-gradient(45deg, #sua-cor-1, #sua-cor-2);
}
`

### **2. Adicionar Mais Informações:**
`html
<div class="portfolio-details">
    <span class="genre">Pop</span>
    <span class="year">2024</span>
    <span class="duration">3:45</span>
</div>
`

## 📱 Funcionalidades do Player

### **1. Controles Disponíveis:**
- ▶️ Play/Pause
- ⏹️ Stop
- 📊 Barra de progresso
- ⏱️ Tempo atual/duração

### **2. Como Usar:**
1. Clique no botão play de qualquer projeto
2. O player aparece na parte inferior
3. Use os controles para gerenciar a reprodução

## 🚀 Próximos Passos

### **1. Adicionar Suas Mídias:**
1. Coloque seus arquivos nas pastas corretas
2. Atualize os nomes no código
3. Teste a reprodução

### **2. Personalizar Projetos:**
1. Altere títulos e artistas
2. Adicione suas próprias descrições
3. Configure as categorias

### **3. Otimizar Arquivos:**
1. Comprima áudios para web
2. Redimensione imagens
3. Otimize vídeos

## ✅ Checklist de Mídia

- [ ] Criar pastas de mídia
- [ ] Adicionar arquivos de áudio
- [ ] Adicionar imagens dos projetos
- [ ] Atualizar URLs no código
- [ ] Testar reprodução de áudio
- [ ] Verificar em diferentes dispositivos
- [ ] Otimizar tamanho dos arquivos

## 💡 Dicas Importantes

- **Use nomes descritivos** para os arquivos
- **Mantenha arquivos pequenos** para carregamento rápido
- **Teste sempre** antes de publicar
- **Faça backup** dos seus arquivos
- **Use formatos web-friendly** (MP3, JPG, MP4)

---
**🎵 Agora você pode adicionar suas mídias ao portfólio!**
