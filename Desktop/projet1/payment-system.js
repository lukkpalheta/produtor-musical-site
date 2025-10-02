// ===== SISTEMA DE PAGAMENTO =====

class PaymentSystem {
    constructor() {
        this.courses = {
            'basico': {
                name: 'Produção Musical Básica',
                price: 297,
                id: 'curso-basico-001'
            },
            'avancado': {
                name: 'Produção Musical Avançada',
                price: 597,
                id: 'curso-avancado-001'
            },
            'gravacao': {
                name: 'Gravação e Captação de Áudio',
                price: 397,
                id: 'curso-gravacao-001'
            },
            'mixagem': {
                name: 'Mixagem e Masterização',
                price: 497,
                id: 'curso-mixagem-001'
            }
        };
        this.init();
    }

    init() {
        // Aguardar DOM carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Event listeners para botões de compra
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('buy-btn')) {
                const courseId = e.target.getAttribute('data-course-id');
                if (courseId) {
                    console.log('Botão clicado para curso:', courseId);
                    this.openPaymentModal(courseId);
                }
            }
        });

        // Event listeners para botões de método de pagamento
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('payment-btn')) {
                const method = e.target.getAttribute('data-method');
                const courseId = e.target.getAttribute('data-course-id');
                if (method && courseId) {
                    console.log('Processando pagamento:', courseId, method);
                    this.processPayment(courseId, method);
                }
            }
        });

        console.log('Sistema de pagamento inicializado!');
    }

    openPaymentModal(courseId) {
        const course = this.courses[courseId];
        if (!course) {
            console.error('Curso não encontrado:', courseId);
            alert('Curso não encontrado!');
            return;
        }

        console.log('Abrindo modal para curso:', course.name);

        // Criar modal se não existir
        let modal = document.getElementById('paymentModal');
        if (!modal) {
            this.createPaymentModal();
            modal = document.getElementById('paymentModal');
        }

        // Atualizar conteúdo do modal
        const modalContent = document.getElementById('paymentModalContent');
        modalContent.innerHTML = `
            <div class="payment-modal-header">
                <h3>Escolha a Forma de Pagamento</h3>
                <span class="close" onclick="paymentSystem.closeModal()">&times;</span>
            </div>
            <div class="payment-modal-body">
                <div class="course-summary">
                    <h4>${course.name}</h4>
                    <div class="price">R$ ${course.price.toFixed(2)}</div>
                </div>
                
                <div class="payment-options">
                    <button class="payment-btn primary" data-method="card" data-course-id="${courseId}">
                        <i class="fas fa-credit-card"></i> Cartão de Crédito
                    </button>
                    <button class="payment-btn secondary" data-method="pix" data-course-id="${courseId}">
                        <i class="fas fa-qrcode"></i> PIX
                    </button>
                    <button class="payment-btn tertiary" data-method="boleto" data-course-id="${courseId}">
                        <i class="fas fa-barcode"></i> Boleto Bancário
                    </button>
                </div>
                
                <div class="payment-security">
                    <i class="fas fa-shield-alt"></i>
                    <span>Pagamento 100% seguro via Mercado Pago</span>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    createPaymentModal() {
        const modalHTML = `
            <div id="paymentModal" class="payment-modal">
                <div id="paymentModalContent" class="modal-content">
                    <!-- Conteúdo será inserido dinamicamente -->
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    processPayment(courseId, method) {
        const course = this.courses[courseId];
        if (!course) {
            console.error('Curso não encontrado:', courseId);
            return;
        }

        console.log('Processando pagamento:', course.name, method);

        // Verificar se Mercado Pago está disponível
        if (window.mercadoPago) {
            console.log('Mercado Pago disponível, processando...');
            // Usar dados salvos ou mostrar formulário
            const customerData = this.getCustomerData();
            
            if (customerData) {
                this.processWithMercadoPago(course, method, customerData);
            } else {
                this.showCustomerForm(course, method);
            }
        } else {
            console.error('Mercado Pago não está disponível');
            alert('Sistema de pagamento não está disponível. Tente novamente em alguns instantes.');
        }
    }

    processWithMercadoPago(course, method, customerData) {
        try {
            console.log('Processando com Mercado Pago:', course.name, method);
            
            if (method === 'card') {
                window.mercadoPago.processCardPayment(course, customerData);
            } else if (method === 'pix') {
                window.mercadoPago.processPixPayment(course, customerData);
            } else if (method === 'boleto') {
                window.mercadoPago.processBoletoPayment(course, customerData);
            }
        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            alert('Erro ao processar pagamento. Tente novamente.');
        }
    }

    showCustomerForm(course, method) {
        console.log('Mostrando formulário de dados para:', course.name);
        
        const modalContent = document.getElementById('paymentModalContent');
        modalContent.innerHTML = `
            <div class="payment-modal-header">
                <h3>Dados para Pagamento - ${course.name}</h3>
                <span class="close" onclick="paymentSystem.closeModal()">&times;</span>
            </div>
            <div class="payment-modal-body">
                <div class="course-summary">
                    <h4>${course.name}</h4>
                    <div class="price">R$ ${course.price.toFixed(2)}</div>
                </div>
                
                <form id="customerForm" class="customer-form">
                    <div class="form-group">
                        <label>Nome Completo *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Telefone *</label>
                        <input type="tel" name="phone" required placeholder="(11) 99999-9999">
                    </div>
                    <div class="form-group">
                        <label>CPF *</label>
                        <input type="text" name="cpf" required placeholder="000.000.000-00">
                    </div>
                    
                    <button type="submit" class="payment-btn primary">
                        <i class="fas fa-credit-card"></i>
                        Continuar para Pagamento
                    </button>
                </form>
                
                <div class="payment-security">
                    <i class="fas fa-shield-alt"></i>
                    <span>Pagamento seguro via Mercado Pago</span>
                </div>
            </div>
        `;

        // Adicionar evento ao formulário
        document.getElementById('customerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const customerData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                cpf: formData.get('cpf')
            };
            
            console.log('Dados do cliente:', customerData);
            
            // Salvar dados no localStorage
            localStorage.setItem('customerData', JSON.stringify(customerData));
            
            // Processar pagamento
            this.processWithMercadoPago(course, method, customerData);
        });
    }

    getCustomerData() {
        const savedData = localStorage.getItem('customerData');
        return savedData ? JSON.parse(savedData) : null;
    }

    closeModal() {
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Instanciar sistema de pagamento
window.paymentSystem = new PaymentSystem();

// Fechar modal ao clicar fora dele
document.addEventListener('click', (e) => {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        window.paymentSystem.closeModal();
    }
});
