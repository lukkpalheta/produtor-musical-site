# 🎵 Sistema de Banco de Dados - Produtor Musical

## 📋 O que foi criado:

### 1. **Banco de Dados Local (localStorage)**
- Sistema completo de armazenamento local
- Dados persistem entre sessões do navegador
- Não precisa de servidor externo

### 2. **Funcionalidades Implementadas:**
- ✅ **Formulário de Contato Funcional**
- ✅ **Portfólio Dinâmico com Filtros**
- ✅ **Sistema de Backup e Restauração**
- ✅ **Armazenamento de Dados Local**

### 3. **Estrutura de Dados:**
`javascript
// Contatos
{
  id: timestamp,
  name: "Nome do Cliente",
  email: "email@exemplo.com",
  subject: "Assunto",
  message: "Mensagem",
  created_at: "2024-01-01T00:00:00.000Z"
}

// Portfólio
{
  id: timestamp,
  title: "Nome da Música",
  artist: "Nome do Artista",
  category: "pop|rock|electronic|jazz",
  description: "Descrição",
  audio_url: "URL do áudio",
  image_url: "URL da imagem",
  created_at: "2024-01-01T00:00:00.000Z"
}
`

## 🚀 Como Usar:

### **1. Formulário de Contato:**
- Preencha o formulário na seção "Contato"
- Os dados são salvos automaticamente no localStorage
- Mensagem de confirmação é exibida

### **2. Portfólio Dinâmico:**
- Use os filtros para visualizar por categoria
- Dados são carregados do banco local
- Fácil de adicionar novos itens

### **3. Backup dos Dados:**
`javascript
// No console do navegador (F12):
exportData(); // Exporta todos os dados
`

### **4. Restaurar Dados:**
`javascript
// No console do navegador (F12):
importData(arquivo); // Restaura dados de um arquivo
`

## 📊 Acessar Dados:

### **No Console do Navegador (F12):**
`javascript
// Ver todos os contatos
getContacts();

// Ver portfólio completo
getPortfolio();

// Ver portfólio por categoria
getPortfolio('pop');
getPortfolio('rock');
getPortfolio('electronic');
getPortfolio('jazz');

// Adicionar novo item ao portfólio
addPortfolioItem({
  title: 'Nova Música',
  artist: 'Novo Artista',
  category: 'pop',
  description: 'Descrição da música',
  audio_url: 'url_do_audio',
  image_url: 'url_da_imagem'
});
`

## 🔧 Personalização:

### **1. Adicionar Novos Itens ao Portfólio:**
- Use a função ddPortfolioItem() no console
- Ou edite diretamente o localStorage

### **2. Modificar Dados Existentes:**
- Acesse o localStorage do navegador
- Procure por 'produtor_musical_portfolio' ou 'produtor_musical_contacts'
- Edite os dados JSON

### **3. Backup Automático:**
- Os dados são salvos automaticamente
- Faça backup regular usando exportData()

## 📱 Funcionalidades do Site:

1. **Navegação Responsiva** - Menu hambúrguer para mobile
2. **Scroll Suave** - Navegação entre seções
3. **Filtros de Portfólio** - Por categoria musical
4. **Formulário de Contato** - Com validação e feedback
5. **Animações** - Efeitos visuais modernos
6. **Banco de Dados Local** - Armazenamento persistente

## 🎯 Próximos Passos:

1. **Personalize os dados** - Adicione suas informações reais
2. **Adicione suas músicas** - Substitua os exemplos pelo seu portfólio
3. **Configure contatos** - Atualize informações de contato
4. **Faça backup regular** - Exporte seus dados periodicamente

## 💡 Dicas:

- Use o console do navegador (F12) para gerenciar dados
- Faça backup antes de fazer alterações grandes
- Os dados ficam salvos no navegador do usuário
- Para múltiplos usuários, considere um servidor backend

---
**🎶 Seu site de produtor musical está pronto com banco de dados!**
