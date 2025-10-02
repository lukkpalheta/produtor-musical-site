# 🎵 GUIA DE PERSONALIZAÇÃO DAS PÁGINAS DE SERVIÇOS

## 📝 Como Personalizar Cada Página

### 1. **Gravação Profissional**
**Arquivo:** paginas/gravacao-profissional.html

**Conteúdo a Personalizar:**
- Nome do seu estúdio
- Equipamentos que você possui
- Preços dos seus serviços
- Processo de trabalho específico
- Fotos do seu estúdio
- Experiência e credenciais

**Exemplo de Personalização:**
`html
<h1>Gravação Profissional - [SEU NOME]</h1>
<p>Estúdio [NOME DO ESTÚDIO] equipado com tecnologia de ponta...</p>

<!-- Seus Equipamentos -->
<div class="equipment-card">
    <h4>Microfone Neumann U87</h4>
    <p>Meu microfone principal para vocais</p>
</div>

<!-- Seus Preços -->
<div class="price">R$ [SEU PREÇO]<span>/hora</span></div>
`

### 2. **Mixagem & Masterização**
**Arquivo:** paginas/mixagem-masterizacao.html

**Conteúdo a Personalizar:**
- Suas técnicas de mixagem
- Software que você usa (Pro Tools, Logic, etc.)
- Referências de trabalhos
- Processo de masterização
- Formatos de entrega

### 3. **Produção Musical**
**Arquivo:** paginas/producao-musical.html

**Conteúdo a Personalizar:**
- Gêneros musicais que você produz
- Estilo de produção
- Colaborações famosas
- Processo criativo
- Instrumentos virtuais que usa

### 4. **Consultoria Musical**
**Arquivo:** paginas/consultoria-musical.html

**Conteúdo a Personalizar:**
- Sua experiência na indústria
- Cases de sucesso
- Metodologia de consultoria
- Áreas de especialização
- Testemunhos de clientes

## 🛠️ Passo a Passo para Personalizar

### **Passo 1: Editar o Título**
`html
<title>[SEU NOME] - Gravação Profissional</title>
<h1>Gravação Profissional - [SEU NOME]</h1>
`

### **Passo 2: Personalizar Descrição**
`html
<p>Estúdio [NOME DO ESTÚDIO] equipado com [SUAS ESPECIFICAÇÕES]...</p>
`

### **Passo 3: Adicionar Seus Equipamentos**
`html
<div class="equipment-card">
    <div class="equipment-icon">
        <i class="fas fa-microphone"></i>
    </div>
    <h4>[NOME DO EQUIPAMENTO]</h4>
    <p>[DESCRIÇÃO DO SEU EQUIPAMENTO]</p>
</div>
`

### **Passo 4: Definir Seus Preços**
`html
<div class="price">R$ [SEU PREÇO]<span>/hora</span></div>
`

### **Passo 5: Adicionar Suas Informações de Contato**
`html
<p>Email: [SEU EMAIL]</p>
<p>Telefone: [SEU TELEFONE]</p>
<p>WhatsApp: [9198585585]</p>
`

## 📸 Adicionando Imagens

### **Imagens do Estúdio:**
`html
<div class="studio-image" style="background-image: url('imagens/meu-estudio.jpg');">
    <div style="text-align: center;">
        <h3>Meu Estúdio de Gravação</h3>
        <p>Ambiente profissional com acústica otimizada</p>
    </div>
</div>
`

### **Imagens dos Equipamentos:**
`html
<div class="equipment-card">
    <img src="imagens/neumann-u87.jpg" alt="Neumann U87" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
    <h4>Microfone Neumann U87</h4>
    <p>Meu microfone principal para vocais</p>
</div>
`

## 🎨 Personalizando Cores e Estilo

### **Alterar Cores do Tema:**
`css
/* No arquivo styles.css ou na página */
:root {
    --primary-color: #667eea;  /* Sua cor primária */
    --secondary-color: #764ba2; /* Sua cor secundária */
}
`

### **Alterar Gradientes:**
`css
.service-hero {
    background: linear-gradient(135deg, [SUA COR 1] 0%, [SUA COR 2] 100%);
}
`

## 📱 Adicionando Funcionalidades

### **Formulário de Orçamento:**
`html
<form class="contact-form">
    <h3>Solicitar Orçamento</h3>
    <input type="text" name="projeto" placeholder="Tipo de Projeto" required>
    <input type="number" name="horas" placeholder="Horas Estimadas" required>
    <textarea name="detalhes" placeholder="Detalhes do Projeto"></textarea>
    <button type="submit">Solicitar Orçamento</button>
</form>
`

### **Galeria de Trabalhos:**
`html
<div class="portfolio-gallery">
    <div class="work-item">
        <img src="imagens/trabalho1.jpg" alt="Trabalho 1">
        <h4>Nome do Projeto</h4>
        <p>Artista: Nome do Artista</p>
    </div>
</div>
`

## 📋 Checklist de Personalização

- [ ] Alterar títulos e nomes
- [ ] Personalizar descrições
- [ ] Adicionar seus equipamentos
- [ ] Definir seus preços
- [ ] Incluir suas informações de contato
- [ ] Adicionar fotos do estúdio
- [ ] Incluir exemplos de trabalhos
- [ ] Personalizar cores e estilo
- [ ] Adicionar formulários específicos
- [ ] Testar em diferentes dispositivos

## 🚀 Próximos Passos

1. **Escolha uma página** para começar
2. **Abra o arquivo** no notepad ou editor
3. **Substitua os placeholders** pelas suas informações
4. **Adicione suas fotos** na pasta imagens/
5. **Teste as mudanças** no navegador
6. **Repita para outras páginas**

---
**🎶 Agora você pode personalizar cada página com suas informações!**
