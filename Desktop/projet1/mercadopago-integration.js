// ===== INTEGRAÇÃO MERCADO PAGO =====

class MercadoPagoPayment {
    constructor() {
        // Usar configurações do arquivo de config
        this.accessToken = MERCADOPAGO_CONFIG.accessToken;
        this.publicKey = MERCADOPAGO_CONFIG.publicKey;
        this.sandbox = MERCADOPAGO_CONFIG.sandbox;
        
        // URLs do Mercado Pago
        this.baseUrl = 'https://api.mercadopago.com';
        this.checkoutUrl = this.sandbox ? 
            'https://sandbox.mercadopago.com.br/checkout/v1/redirect' :
            'https://www.mercadopago.com.br/checkout/v1/redirect';
            
        console.log('MercadoPagoPayment inicializado!');
    }
    
    // Criar preferência de pagamento
    async createPreference(courseData, customerData) {
        const preference = {
            items: [{
                id: courseData.id,
                title: courseData.name,
                description: `Curso de ${courseData.name} - DJ.Marcelo Ferreira`,
                quantity: 1,
                unit_price: courseData.price,
                currency_id: 'BRL'
            }],
            payer: {
                name: customerData.name,
                email: customerData.email,
                phone: {
                    number: customerData.phone.replace(/[^0-9]/g, '')
                },
                identification: {
                    type: 'CPF',
                    number: customerData.cpf.replace(/[^0-9]/g, '')
                }
            },
            payment_methods: {
                excluded_payment_types: [],
                excluded_payment_methods: [],
                installments: 12
            },
            back_urls: {
                success: MERCADOPAGO_CONFIG.successUrl,
                failure: MERCADOPAGO_CONFIG.failureUrl,
                pending: MERCADOPAGO_CONFIG.pendingUrl
            },
            auto_return: 'approved',
            notification_url: MERCADOPAGO_CONFIG.notificationUrl,
            external_reference: `curso-${courseData.id}-${Date.now()}`
        };
        
        try {
            console.log('Criando preferência:', preference);
            
            const response = await fetch(`${this.baseUrl}/checkout/preferences`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(preference)
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Preferência criada:', data);
                return data;
            } else {
                const error = await response.json();
                console.error('Erro ao criar preferência:', error);
                throw new Error(error.message || 'Erro ao criar preferência');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }
    
    // Redirecionar para pagamento
    redirectToPayment(preferenceId) {
        const paymentUrl = `${this.checkoutUrl}?pref_id=${preferenceId}`;
        console.log('Redirecionando para:', paymentUrl);
        window.location.href = paymentUrl;
    }
    
    // Processar pagamento com cartão
    async processCardPayment(courseData, customerData) {
        try {
            const preference = await this.createPreference(courseData, customerData);
            if (preference && preference.id) {
                this.redirectToPayment(preference.id);
            } else {
                throw new Error('Não foi possível criar preferência de pagamento');
            }
        } catch (error) {
            console.error('Erro no pagamento:', error);
            alert('Erro ao processar pagamento: ' + error.message);
        }
    }
    
    // Processar PIX
    async processPixPayment(courseData, customerData) {
        await this.processCardPayment(courseData, customerData);
    }
    
    // Processar boleto
    async processBoletoPayment(courseData, customerData) {
        await this.processCardPayment(courseData, customerData);
    }
}

// Instanciar Mercado Pago globalmente
window.mercadoPago = new MercadoPagoPayment();

// Aguardar carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada, verificando configurações...');
    
    // Verificar se as configurações estão disponíveis
    if (typeof MERCADOPAGO_CONFIG !== 'undefined') {
        console.log('Configurações do Mercado Pago encontradas!');
        console.log('Access Token:', MERCADOPAGO_CONFIG.accessToken ? 'Configurado' : 'Não configurado');
        console.log('Public Key:', MERCADOPAGO_CONFIG.publicKey ? 'Configurado' : 'Não configurado');
    } else {
        console.error('Configurações do Mercado Pago não encontradas!');
    }
    
    // Verificar se o sistema de pagamento está disponível
    if (window.paymentSystem) {
        console.log('Sistema de pagamento encontrado!');
    } else {
        console.error('Sistema de pagamento não encontrado!');
    }
});
