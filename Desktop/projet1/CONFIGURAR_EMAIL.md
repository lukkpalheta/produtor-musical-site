# 📧 CONFIGURAÇÃO DE EMAIL PARA O SITE

## 🎯 Opções para Receber Emails

### **Opção 1: Formspree (Recomendado - Mais Fácil)**
1. Acesse: https://formspree.io
2. Crie uma conta gratuita
3. Crie um novo formulário
4. Copie o link de ação
5. Cole no seu formulário HTML

### **Opção 2: Netlify Forms (Se hospedar no Netlify)**
1. Hospede seu site no Netlify
2. Adicione "netlify" ao formulário
3. Emails chegam automaticamente

### **Opção 3: EmailJS (JavaScript)**
1. Acesse: https://www.emailjs.com
2. Crie uma conta gratuita
3. Configure seu provedor de email
4. Use o código JavaScript fornecido

## 🔧 Implementação com Formspree

### **1. Modificar o Formulário HTML**
`html
<form action="https://formspree.io/f/SEU_ID_AQUI" method="POST">
    <input type="text" name="name" placeholder="Seu Nome" required>
    <input type="email" name="email" placeholder="Seu Email" required>
    <input type="text" name="subject" placeholder="Assunto" required>
    <textarea name="message" placeholder="Sua Mensagem" required></textarea>
    <button type="submit">Enviar Mensagem</button>
</form>
`

### **2. Configurar Redirecionamento**
`html
<!-- Adicione após o formulário -->
<input type="hidden" name="_next" value="https://seusite.com/obrigado.html">
<input type="hidden" name="_subject" value="Nova Mensagem do Site">
`

## 📱 Implementação com EmailJS

### **1. Adicionar EmailJS ao HTML**
`html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init("SEU_USER_ID_AQUI");
</script>
`

### **2. JavaScript para Envio**
`javascript
function sendEmail() {
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', templateParams)
        .then(function(response) {
            alert('Mensagem enviada com sucesso!');
        }, function(error) {
            alert('Erro ao enviar mensagem. Tente novamente.');
        });
}
`

## 🌐 Hospedagem Recomendada

### **Netlify (Gratuito)**
1. Acesse: https://netlify.com
2. Conecte seu repositório GitHub
3. Deploy automático
4. Forms funcionam automaticamente

### **Vercel (Gratuito)**
1. Acesse: https://vercel.com
2. Conecte seu repositório
3. Deploy automático
4. Suporte a formulários

### **GitHub Pages (Gratuito)**
1. Acesse: https://pages.github.com
2. Faça upload dos arquivos
3. Use Formspree para emails

## 📋 Checklist de Configuração

- [ ] Escolher método de envio de email
- [ ] Configurar formulário HTML
- [ ] Testar envio de email
- [ ] Configurar redirecionamento
- [ ] Adicionar mensagem de sucesso
- [ ] Testar em diferentes dispositivos

## 🚀 Próximos Passos

1. **Escolha uma opção** (Formspree é mais fácil)
2. **Configure o formulário** com a URL fornecida
3. **Teste o envio** de email
4. **Hospede o site** em um servidor
5. **Monitore os emails** recebidos

---
**📧 Agora você pode receber emails dos interessados!**
