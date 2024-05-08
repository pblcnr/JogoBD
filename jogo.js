const {createApp} = Vue;

createApp({
    data() {
        return {
            heroi: {vida: 100},
            vilao: {vida: 100},
            logAcoes: [],
            heroiAcaoAndamento: false
        }
    },
    methods: {
        async realizarAcao(acao) {
            if (this.heroiAcaoAndamento) {
                console.log("Ação em andamento!");
                return;
            }
            this.heroiAcaoAndamento = true;
            switch (acao) {
                case 'atacar':
                    this.atacar();
                    break;
                case 'defender':
                    this.defender();
                    break;
                case 'usarPocao':
                    await this.usarPocao();
                    break;
                case 'correr':
                    this.correr();
                    break;
                default:
                    console.error("Ação inválida.");
            }
            this.heroiAcaoAndamento = false;
        },
        async atacar() {
            const dano = 20;
            console.log("Herói atacou e causou dano ao Vilão!");
            this.registrarAcao("Herói atacou e causou dano ao Vilão.");
            this.vilao.vida -= dano;
            if (this.vilao.vida <= 0) {
                this.vilao.vida = 0;
                console.log("Vilão morreu!");
                this.registrarAcao("Vilão morreu.");
                this.reiniciarJogo();
            } else {
                await this.acaoVilao();
            }
        },
        async defender() {
            const danoReduzido = 10;
            console.log("Herói defendeu e reduziu o dano recebido!");
            this.registrarAcao("Herói defendeu e reduziu o dano recebido.");
            this.heroi.vida -= danoReduzido;
            if (this.heroi.vida < 0) {
                this.heroi.vida = 0;
                console.log("Herói morreu!");
                this.registrarAcao("Herói morreu.")
                this.reiniciarJogo();
            }
        },
        async usarPocao() {
            if (this.heroi.vida < 100) {
                const cura = 20;
                console.log("Herói usou poção e recuperou vida!");
                this.registrarAcao("Herói usou poção e recuperou vida.");
                this.heroi.vida += cura;
                if (this.heroi.vida > 100) {
                    this.heroi.vida = 100;
                }
            } else {
                console.log("A vida do herói já está cheia!")
            }
        },
        async correr() {
            const chancesCorrer = 0.5;
            const tentativaCorrer = Math.random();

            if (tentativaCorrer <= chancesCorrer) {
                console.log("Herói conseguiu escapar do combate!");
                this.registrarAcao("Herói conseguiu escapar do combate.");
            } else {
                console.log("Herói tentou correr, mas não conseguiu!");
                this.registrarAcao("Herói tentou correr, mas não conseguiu.");
                const danoFugir = 15;
                this.heroi.vida -= danoFugir;
                if (this.heroi.vida <= 0) {
                    this.heroi.vida = 0;
                    console.log("Herói merrou!");
                    this.registrarAcao("Herói morreu");
                    this.reiniciarJogo();
                } else {
                    await this.acaoVilao();
                }
            }
        },
        async acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            await this.realizarAcao(acaoAleatoria);

            if (Math.random() < 0.3) {
                const curaVilao = 15;
                console.log("Vilão recuperou vida!");
                this.registrarAcao("Vilão recuperou vida.");
                this.vilao.vida += curaVilao;
                if (this.vilao.vida > 100) {
                    this.vilao.vida = 100;
                }
            }
        },
        registrarAcao(acao) {
            this.logAcoes.push(acao);
        },
        reiniciarJogo() {
            alert("Um dos personagens morreu! O jogo será reiniciado.");
            this.heroi.vida = 100;
            this.vilao.vida = 100;
            this.logAcoes = [];
        }
    }
}).mount("#app")