// ===== DADOS DOS QUIZZES =====
const quizzes = {
    financeiro: [
        { pergunta: "O que é um orçamento?", alternativas: ["Controle de despesas", "Investimentos de risco", "Plano de saúde", "Seguro de vida"], resposta: 0 },
        { pergunta: "O que significa 'juros compostos'?", alternativas: ["Empréstimos bancários", "Investimentos em ações", "Cálculo sobre capital inicial e juros", "Seguro de vida"], resposta: 2 },
        { pergunta: "O que é uma conta corrente?", alternativas: ["Conta para depósito de salários", "Conta que oferece empréstimos", "Conta usada apenas para transferências", "Conta bancária para gestão de dinheiro do dia a dia"], resposta: 3 },
        { pergunta: "O que é uma reserva de emergência?", alternativas: ["Dinheiro investido em ações", "Dinheiro guardado para emergências imprevistas", "Dinheiro guardado para viagens", "Dinheiro para consumo diário"], resposta: 1 }
    ],
    tecnologia: [
        { pergunta: "O que é JavaScript?", alternativas: ["Linguagem de programação", "Sistema operacional", "Editor de texto", "Rede social"], resposta: 0 },
        { pergunta: "Qual é a função do HTML?", alternativas: ["Estrutura da página web", "Estilo visual da página", "Acessibilidade web", "Banco de dados"], resposta: 0 },
        { pergunta: "O que é uma API?", alternativas: ["Ferramenta de design gráfico", "Interface para comunicação entre sistemas", "Sistema de busca na web", "Banco de dados de códigos"], resposta: 1 },
        { pergunta: "O que é um framework?", alternativas: ["Uma ferramenta para edição de vídeos", "Uma estrutura de código reutilizável para facilitar o desenvolvimento", "Uma linguagem de programação", "Um tipo de banco de dados"], resposta: 1 }
    ],
    empoderamento: [
        { pergunta: "O que é empoderamento feminino?", alternativas: ["Força física", "Libertação e igualdade", "Fortalecimento de ideias conservadoras", "Desempoderamento"], resposta: 1 },
        { pergunta: "Qual é a principal luta do movimento feminista?", alternativas: ["Votar nas eleições", "Equidade de gênero", "Direitos dos homens", "Igualdade racial"], resposta: 1 },
        { pergunta: "O que significa sororidade?", alternativas: ["Apoio e solidariedade entre mulheres", "Luta por igualdade de gênero", "Desigualdade entre mulheres e homens", "Mulheres que brigam entre si"], resposta: 0 },
        { pergunta: "O que é machismo?", alternativas: ["Movimento feminista", "Atitude que visa a igualdade entre os gêneros", "Atitude preconceituosa que reforça a desigualdade entre homens e mulheres", "Movimento em defesa dos direitos dos homens"], resposta: 2 }
    ],
    carreiras: [
        { pergunta: "O que é networking?", alternativas: ["Criação de redes de contatos profissionais", "Construção de sites na web", "Estratégia de marketing digital", "Planejamento financeiro"], resposta: 0 },
        { pergunta: "Qual habilidade é essencial para a carreira de um programador?", alternativas: ["Gestão de equipes", "Conhecimento em linguagens de programação", "Design gráfico", "Marketing digital"], resposta: 1 },
        { pergunta: "O que é um currículo?", alternativas: ["Documento pessoal que contém dados sobre a vida profissional", "Documento usado apenas para pedidos de aumento", "Documento sobre a vida social de uma pessoa", "Documento que é apresentado apenas em entrevistas de emprego"], resposta: 0 },
        { pergunta: "O que é desenvolvimento pessoal?", alternativas: ["Apenas o estudo acadêmico", "Processo contínuo de melhorar habilidades e competências", "A habilidade de falar em público", "Apenas a prática de esportes"], resposta: 1 }
    ],
    direitos_humanos: [
        { pergunta: "O que são direitos humanos?", alternativas: ["Direitos concedidos pelo governo", "Direitos inalienáveis e universais", "Benefícios de programas sociais", "Direitos de cidadãos ricos"], resposta: 1 },
        { pergunta: "Qual é o principal objetivo da Declaração Universal dos Direitos Humanos?", alternativas: ["Estabelecer a igualdade de todos os seres humanos", "Garantir benefícios de saúde", "Regular os direitos dos trabalhadores", "Criar impostos globais"], resposta: 0 },
        { pergunta: "O que é a liberdade de expressão?", alternativas: ["Direito de falar qualquer coisa sem ser punido", "Direito de falar, desde que não prejudique os outros", "A liberdade de mentir", "Liberdade para fazer qualquer coisa"], resposta: 1 },
        { pergunta: "O que são direitos econômicos?", alternativas: ["Direitos que garantem o acesso a bens e serviços", "Direitos que dizem respeito à educação", "Direitos que protegem a propriedade privada", "Direitos relacionados ao salário de trabalho"], resposta: 0 }
    ],
    empreendedorismo: [
        { pergunta: "O que é um plano de negócios?", alternativas: ["Estratégia para alcançar objetivos empresariais", "Uma análise financeira de uma empresa", "Um relatório de vendas", "Um tipo de contrato de trabalho"], resposta: 0 },
        { pergunta: "Qual característica é essencial para um empreendedor?", alternativas: ["Capacidade de gerenciar riscos", "Evitar qualquer tipo de investimento", "Habilidade em resolver problemas jurídicos", "Focar apenas em vendas"], resposta: 0 },
        { pergunta: "O que é inovação?", alternativas: ["Repetir processos antigos", "Criar soluções novas para problemas existentes", "Ajustar processos antigos", "Revolucionar a gestão empresarial"], resposta: 1 },
        { pergunta: "Qual é o risco de não se adaptar a mudanças no mercado?", alternativas: ["Aumento do faturamento", "Dificuldade em sobreviver a longo prazo", "Maior reconhecimento no mercado", "Menor concorrência"], resposta: 1 }
    ]
};

// ===== OBTÉM O TEMA DA URL =====
const urlParams = new URLSearchParams(window.location.search);
const tema = urlParams.get('tema');
const perguntas = quizzes[tema];

if (!perguntas) {
    document.getElementById("quizTitle").innerText = "Tema não encontrado!";
} else {
    document.getElementById("quizTitle").innerText = tema.charAt(0).toUpperCase() + tema.slice(1);
}

// ===== VERIFICA SE FASE FOI CONCLUÍDA =====
function verificarFaseConcluida(fase) {
    const progresso = JSON.parse(localStorage.getItem("progressoFases")) || {};
    return progresso[fase] === true;
}

if (verificarFaseConcluida(tema)) {
    document.getElementById("questionContainer").innerHTML = `
        <div class="alert alert-info">
            Você já completou este quiz! Parabéns pela conclusão!
        </div>
    `;
} else {
    let questionIndex = 0;
    let pontuacao = 0;
    let respostasMarcadas = [];

    function loadQuestion() {
        let question = perguntas[questionIndex];
        let container = document.getElementById("questionContainer");

        container.innerHTML = `
            <h3>${question.pergunta}</h3>
            <div class="list-group">
                ${question.alternativas.map((alt, index) =>
                    `<button class="list-group-item list-group-item-action" onclick="checkAnswer(${index})">${alt}</button>`
                ).join('')}
            </div>
        `;
    }

    window.checkAnswer = function(index) {
        let question = perguntas[questionIndex];

        if (respostasMarcadas.includes(questionIndex)) return;

        respostasMarcadas.push(questionIndex);

        if (index === question.resposta) pontuacao++;

        document.querySelectorAll(".list-group-item").forEach(btn => btn.disabled = true);
        document.getElementById("nextButton").disabled = false;
    };

    window.nextQuestion = function() {
        questionIndex++;
        if (questionIndex < perguntas.length) {
            loadQuestion();
            document.getElementById("nextButton").disabled = true;
        } else {
            saveScore(pontuacao, tema);
            alert(`Você completou o quiz! Sua pontuação: ${pontuacao}\nParabéns! Você concluiu a fase.`);
            window.location.href = "mapa.html";
        }
    };

    // Carrega a primeira pergunta ao iniciar
    loadQuestion();
    document.getElementById("nextButton").disabled = true;
}

// ===== SALVAR SCORE E MARCAR FASE =====
function saveScore(pontuacaoFinal, tema) {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        alert("Erro: usuário não está logado.");
        window.location.href = "login.html";
        return;
    }

    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({
        nome: loggedInUser.nome,
        foto: loggedInUser.imagem,
        pontuacao: pontuacaoFinal,
        fase: tema
    });

    localStorage.setItem("ranking", JSON.stringify(ranking));

    const faseAtual = {
        financeiro: "fase1",
        tecnologia: "fase2",
        empoderamento: "fase3",
        carreiras: "fase4",
        direitos_humanos: "fase5",
        empreendedorismo: "fase6"
    };

    const progressoFases = JSON.parse(localStorage.getItem("progressoFases")) || {};
    progressoFases[faseAtual[tema]] = true;
    localStorage.setItem("progressoFases", JSON.stringify(progressoFases));
}
