const { createApp } = Vue;
const API_URL = 'http://localhost:3000';

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 }            
        };        
    },
    methods: {
        atacar(isHeroi) {
            if (isHeroi) {
                this.vilao.vida -= 10;
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                this.acaoVilao();
            } else {
                this.heroi.vida -= 20;
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
            }
        },
        async atualizarVidaNoBancoDeDados(vidaHeroi, vidaVilao) {
            try {
                const response = await fetch(`${API_URL}/atualizarVida`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ vidaHeroi, vidaVilao })
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar a vida no banco de dados.');
                }
                console.log('Vida do herói e do vilão atualizada com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar a vida no banco de dados:', error);
            }
        },
        defender(isHeroi) {
            this.acaoVilao();
        },
        usarPocao(isHeroi) {
            if (isHeroi) {
                this.vilao.vida += 10;
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                this.acaoVilao();
            } else {
                this.heroi.vida += 10;
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
            }
            this.acaoVilao();
        },
        correr(isHeroi) {
            this.acaoVilao();
        },
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
            console.log('O vilão usou: ' + acaoAleatoria)
        }
    }
}).mount("#app");