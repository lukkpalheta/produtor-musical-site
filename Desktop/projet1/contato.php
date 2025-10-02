<?php
// Configurações do Email
 = "seuemail@exemplo.com"; // SEU EMAIL AQUI
 = "Nova Mensagem do Site - Produtor Musical";

// Verificar se o formulário foi enviado
if () {
    // Capturar dados do formulário
     = ['name'] ?? '';
     = ['email'] ?? '';
     = ['subject'] ?? '';
     = ['message'] ?? '';
    
    // Validar dados
    if (empty() || empty() || empty()) {
        Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. = "Por favor, preencha todos os campos obrigatórios.";
    } else {
        // Preparar o email
         = "
        <h2>Nova Mensagem do Site</h2>
        <p><strong>Nome:</strong> </p>
        <p><strong>Email:</strong> </p>
        <p><strong>Assunto:</strong> </p>
        <p><strong>Mensagem:</strong></p>
        <p></p>
        <hr>
        <p><em>Enviado em: " . date('d/m/Y H:i:s') . "</em></p>
        ";
        
        // Headers do email
         = "MIME-Version: 1.0" . "\r\n";
         .= "Content-type:text/html;charset=UTF-8" . "\r\n";
         .= "From:  <>" . "\r\n";
         .= "Reply-To: " . "\r\n";
        
        // Enviar email
        if (mail(, , , )) {
             = "Mensagem enviada com sucesso! Entraremos em contato em breve.";
        } else {
            Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. = "Erro ao enviar mensagem. Tente novamente.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contato - Produtor Musical</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .success {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            background: #667eea;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background: #5a6fd8;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #667eea;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Entre em Contato</h1>
        
        <?php if (isset()): ?>
            <div class="success"><?php echo ; ?></div>
        <?php endif; ?>
        
        <?php if (isset(Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'.)): ?>
            <div class="error"><?php echo Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'. Não é possível localizar um parâmetro que coincida com o nome de parâmetro 'Chord'.; ?></div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="form-group">
                <label for="name">Nome *</label>
                <input type="text" id="name" name="name" required value="<?php echo htmlspecialchars( ?? ''); ?>">
            </div>
            
            <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required value="<?php echo htmlspecialchars( ?? ''); ?>">
            </div>
            
            <div class="form-group">
                <label for="subject">Assunto *</label>
                <input type="text" id="subject" name="subject" required value="<?php echo htmlspecialchars( ?? ''); ?>">
            </div>
            
            <div class="form-group">
                <label for="message">Mensagem *</label>
                <textarea id="message" name="message" rows="5" required><?php echo htmlspecialchars( ?? ''); ?></textarea>
            </div>
            
            <button type="submit">Enviar Mensagem</button>
        </form>
        
        <a href="index.html" class="back-link">← Voltar ao Site</a>
    </div>
</body>
</html>
