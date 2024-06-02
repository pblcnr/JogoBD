const { createApp } = Vue;
const API_URL = 'https://jogobd.onrender.com';
createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            aux: 1,
            mensagemAcao: '',
            historico: [],
            acao: ''
        }
        
    },
    methods: {
        atacar(isHeroi) {
            let acao = isHeroi ? "Herói atacou" : "Vilão atacou";
            if (isHeroi) {
                this.vilao.vida = this.vilao.vida > 5 ? this.vilao.vida - 10 : 0;
                this.historico.push("Herói atacou. Vida do vilão: " + this.vilao.vida);
                this.acao = "Herói atacou"; 
                console.log("Herói atacou");
                this.acaoVilao();
                this.aux = 1;
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                
            } else {
                this.mensagemAcao = "Vilão atacou"; 
                this.historico.push("Vilão atacou. Vida do herói: " + this.heroi.vida);
                this.historico.acao = "Vilão atacou"; 
                console.log("Vilão atacou");
                this.heroi.vida = this.heroi.vida > 5 ? this.heroi.vida - 10 : 0;
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
            }
            this.adicionarHistorico(acao);
            this.verificarVida();
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
            let acao = isHeroi ? "Herói defendeu" : "Vilão defendeu";
            if (isHeroi) {
                console.log("Herói defendeu");
                this.acaoVilao();
                this.historico.push("Herói defendeu.");
                this.acao = "Herói defendeu"; 
            } else {
                this.mensagemAcao = "Vilão defendeu"; 
                console.log("Vilão defendeu");
                this.aux = 1; 
                this.historico.push("Vilão defendeu.");
                this.acao = "Vilão defendeu"; 
            }
            this.adicionarHistorico(acao);
            this.verificarVida();
        },
        usarPocao(isHeroi) {
            let acao = isHeroi ? "Herói usou poção" : "Vilão usou poção";
            if (isHeroi) {
                this.acao = "Herói usou poção"; 
                console.log("Herói usou poção");
                this.heroi.vida = this.heroi.vida < 95 ? this.heroi.vida + 5 : 100;
                this.aux = 1;
                this.acaoVilao();
                this.historico.push("Herói usou poção. Vida do herói: " + this.heroi.vida);
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
            } else {
                this.mensagemAcao = "Vilão usou poção"; 
                this.acao = "Vilão usou poção"; 
                console.log("Vilão usou poção");
                this.vilao.vida = this.vilao.vida < 95 ? this.vilao.vida + 5 : 100;
                this.historico.push("Vilão usou poção. Vida do vilão: " + this.vilao.vida);
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
            }
            this.adicionarHistorico(acao);
            this.verificarVida();
        },
        correr(heroiCorrendo) { 
            let acao = heroiCorrendo ? "Herói correu" : "Vilão correu";
            if (heroiCorrendo) {
                alert("Fim de Jogo: VILÃO GANHOU");
                console.log("Herói correu");
                this.historico.push("Herói correu.");
                this.acao = "Herói correu"; 
                
            } else {
                this.mensagemAcao = "Vilão correu"; 
                alert("Fim de Jogo: HERÓI GANHOU");
                console.log("Vilão correu");
                this.historico.push("Vilão correu.");
                this.acao = "Vilão correu"; 
            }  this.adicionarHistorico(acao);
        },
        verificarVida() {
            if (this.heroi.vida <= 0) {
                alert("Fim de Jogo: VILÃO GANHOU");
                location.reload()
            } else if (this.vilao.vida <= 0) {
                alert("Fim de Jogo: HERÓI GANHOU");
                location.reload()
            }

        },
        vidaCor(vida) {
            if (vida <= 35) {
                return 'baixa';
            } else if (vida <= 60) {
                return 'media';
            } else {
                return 'alta';
            }
        },
        acaoVilao() {
            const acoes = ['atacar', 'atacar', 'atacar', 'atacar', 'atacar', // probabilidade de ocorrer a ação 50%
            'defender', 'defender', // 20%
            'usarPocao', 'usarPocao', // 20%
            'correr' // 10%
            ];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
            
        },
        async adicionarHistorico(acao) {
            try {
                let acao = this.acao;
                const response = await fetch(`${API_URL}/adicionarHistorico`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({acao})
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o historico no banco de dados.');
                }
                console.log('Historico atualizados com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar o historico no banco de dados:', error);
            }
        }
    }
}).mount("#app");