window.addEventListener('DOMContentLoaded', (event) => {
    // Carregar dados do ranking e do usuário logado
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const usuarioLogado = {
        nome: sessionStorage.getItem("userName"),
        foto: sessionStorage.getItem("userImage"),
        pontos: sessionStorage.getItem("userPoints") || 0 // Garantir que haja uma pontuação, mesmo que seja 0
    };

    // Verificar se o usuário está logado corretamente
    if (!usuarioLogado.nome || !usuarioLogado.foto) {
        console.log('Usuário não logado ou dados do usuário não encontrados no sessionStorage');
        return; // Se não houver usuário logado, não faz nada
    }

    // Ordenar o ranking pela maior pontuação
    ranking.sort((a, b) => b.pontos - a.pontos);

    // Obter os elementos DOM para exibir as informações
    const rankingList = document.getElementById('rankingList');
    const loggedUserImage = document.getElementById('loggedUserImage');
    const loggedUserName = document.getElementById('loggedUserName');
    const loggedUserPosition = document.getElementById('loggedUserPosition');
    const loggedUserPoints = document.getElementById('loggedUserPoints');

    // Garantir que os elementos de exibição existem
    if (loggedUserImage && loggedUserName && loggedUserPosition && loggedUserPoints) {
        let usuarioPosicao = ranking.findIndex(jogador => jogador.nome === usuarioLogado.nome) + 1;

        // Exibir a posição, foto e pontos do usuário logado
        loggedUserImage.src = usuarioLogado.foto;
        loggedUserName.innerText = usuarioLogado.nome;
        loggedUserPosition.innerText = usuarioPosicao ? `${usuarioPosicao}º` : 'Não classificou ainda';
        loggedUserPoints.innerText = usuarioLogado.pontos;

        // Exibir todos os jogadores no ranking
        ranking.forEach((jogador, index) => {
            const jogadorDiv = document.createElement('tr');
            jogadorDiv.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${jogador.foto}" alt="Foto de ${jogador.nome}" width="40" height="40" class="rounded-circle"></td>
                <td>${jogador.nome}</td>
                <td>${jogador.pontos}</td>
            `;
            rankingList.appendChild(jogadorDiv);
        });
    } else {
        console.error("Elementos de ranking não encontrados no HTML.");
    }
});


// Função para atualizar as fases com base no progresso
function atualizarFases() {
    let progressoFases = JSON.parse(localStorage.getItem("progressoFases"));

    // Se não houver progresso registrado, inicialize com as fases bloqueadas
    if (!progressoFases) {
        progressoFases = {
            fase1: false,
            fase2: false,
            fase3: false,
            fase4: false,
            fase5: false,
            fase6: false
        };
        localStorage.setItem("progressoFases", JSON.stringify(progressoFases));
    }

    const mapaFases = ["fase1", "fase2", "fase3", "fase4", "fase5", "fase6"];

    mapaFases.forEach((fase, index) => {
        const faseElemento = document.getElementById(fase);
        
        if (faseElemento) {
            if (progressoFases[fase]) {
                // Se a fase foi completada
                faseElemento.classList.remove('fase-bloqueada');
                faseElemento.classList.add('fase-completa');
            } else if (index === 0 || progressoFases[mapaFases[index - 1]]) {
                // Se a fase está pendente e a fase anterior foi concluída
                faseElemento.classList.remove('fase-bloqueada');
                faseElemento.classList.add('fase-pendente');
            } else {
                // Se a fase está bloqueada
                faseElemento.classList.remove('fase-pendente');
                faseElemento.classList.add('fase-bloqueada');
            }
        }
    });
}

