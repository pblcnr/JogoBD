const { createApp } = Vue;

const Login = {
    template: `
        <div class="container">
            <h2>Login</h2>
            <form @submit.prevent="login">
                <div>
                    <label for="login-email">Email:</label>
                    <input type="email" id="login-email" v-model="loginEmail" required>
                </div>
                <div>
                    <label for="login-password">Senha:</label>
                    <input type="password" id="login-password" v-model="loginPassword" required>
                </div>
                <button type="submit">Entrar</button>
            </form>
            <button @click="changeComponent('SignIn')">Ir para Sign In</button>
        </div>
    `,
    data() {
        return {
            loginEmail: '',
            loginPassword: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await fetch('https://jogobd.onrender.com/usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.loginEmail,
                        password: this.loginPassword
                    })
                });
                const data = await response.json();
                if (response.ok) {
                    // Redirecionar para a página jogo.html após o login bem-sucedido
                    window.location.href = 'index.html';
                } else {
                    console.error('Erro de login:', data.message);
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        },
        changeComponent(component) {
            this.$parent.currentComponent = component;
        }
    }
};

const SignIn = {
    template: `
        <div class="container">
            <h2>Sign In</h2>
            <form @submit.prevent="signIn">
                <div>
                    <label for="signin-email">Email:</label>
                    <input type="email" id="signin-email" v-model="signInEmail" required>
                </div>
                <div>
                    <label for="signin-password">Senha:</label>
                    <input type="password" id="signin-password" v-model="signInPassword" required>
                </div>
                <div>
                    <label for="first-name">Nome:</label>
                    <input type="text" id="first-name" v-model="firstName" required>
                </div>
                <div>
                    <label for="last-name">Sobrenome:</label>
                    <input type="text" id="last-name" v-model="lastName" required>
                </div>
                <button type="submit">Sign In</button>
            </form>
            <button @click="changeComponent('Login')">Voltar para Login</button>
        </div>
    `,
    data() {
        return {
            signInEmail: '',
            signInPassword: '',
            firstName: '',
            lastName: ''
        };
    },
    methods: {
        signIn() {
            console.log('Email: ', this.signInEmail);
            console.log('Senha:', this.signInPassword);
            console.log('Nome:', this.firstName);
            console.log('Sobrenome:', this.lastName);
        },
        changeComponent(component) {
            this.$parent.currentComponent = component;
        }
    }
};

createApp({
    data() {
        return {
            currentComponent: Login
        };
    },
    components: {
        Login,
        SignIn
    }
}).mount('#app');
