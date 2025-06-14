document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tema = urlParams.get("tema");

    if (!tema) {
        alert("Tema não especificado.");
        window.location.href = "mapa.html";
        return;
    }

    // Título do quiz com o tema
    const quizTitle = document.getElementById("quizTitle");
    if (quizTitle) {
        quizTitle.textContent = `Quiz - ${tema.charAt(0).toUpperCase() + tema.slice(1).replace('_', ' ')}`;
    }

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

    const perguntas = quizzes[tema];
    let questionIndex = 0;
    let pontuacao = 0;

    const questionContainer = document.getElementById("questionContainer");
    const nextButton = document.getElementById("nextButton");

    function loadQuestion() {
        const q = perguntas[questionIndex];
        questionContainer.innerHTML = `
            <h3>${q.pergunta}</h3>
            ${q.alternativas.map((alt, i) => `
                <div>
                    <input type="radio" name="resposta" id="alt${i}" value="${i}">
                    <label for="alt${i}">${alt}</label>
                </div>
            `).join('')}
        `;

        const inputs = document.querySelectorAll('input[name="resposta"]');
        inputs.forEach(input => {
            input.addEventListener("change", () => {
                nextButton.disabled = false;
            });
        });
    }

    window.nextQuestion = function () {
        const selecionada = document.querySelector('input[name="resposta"]:checked');
        if (selecionada && parseInt(selecionada.value) === perguntas[questionIndex].resposta) {
            pontuacao++;
        }

        questionIndex++;
        if (questionIndex < perguntas.length) {
            loadQuestion();
            nextButton.disabled = true;
        } else {
            salvarPontuacao();
        }
    };

    function salvarPontuacao() {
        const email = sessionStorage.getItem("loggedInUser");
        if (!email) return;

        const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

        // Remove entradas anteriores para o mesmo usuário e tema
        const novoRanking = ranking.filter(entry => !(entry.email === email && entry.tema === tema));

        // Pega nome e foto atualizados do sessionStorage
        const nome = sessionStorage.getItem("userName") || "Anônimo";
        const foto = sessionStorage.getItem("userImage") || "https://cdn-icons-png.flaticon.com/512/147/147144.png";

        // Adiciona a nova pontuação com nome e foto
        novoRanking.push({ email, pontuacao, tema, nome, foto });

        localStorage.setItem("ranking", JSON.stringify(novoRanking));

        desbloquearProximaFase();

        // Mensagem final
        questionContainer.innerHTML = `
        <div class="text-center">
            <h2>Parabéns, ${nome}!</h2>
            <p>Você completou o quiz de <strong>${tema.charAt(0).toUpperCase() + tema.slice(1).replace('_', ' ')}</strong> com <strong>${pontuacao}</strong> ponto(s).</p>
            <button onclick="window.location.href='mapa.html'" class="btn btn-secondary m-2">Voltar ao Mapa</button>
            <button onclick="irParaProximoTema('${tema}')" class="btn btn-success m-2">Próxima Fase</button>
        </div>
    `;

        nextButton.style.display = "none";

        console.log("Salvando pontuação de:", nome, foto, email, pontuacao, tema);
    }


    function desbloquearProximaFase() {
        const ordem = ["financeiro", "tecnologia", "empoderamento", "carreiras", "direitos_humanos", "empreendedorismo"];
        const progresso = JSON.parse(localStorage.getItem("progresso")) || [];
        if (!progresso.includes(tema)) progresso.push(tema);

        const atualIndex = ordem.indexOf(tema);
        if (atualIndex !== -1 && atualIndex + 1 < ordem.length) {
            const proximo = ordem[atualIndex + 1];
            if (!progresso.includes(proximo)) progresso.push(proximo);
        }

        localStorage.setItem("progresso", JSON.stringify(progresso));
    }

    window.irParaProximoTema = function (temaAtual) {
        const ordem = ["financeiro", "tecnologia", "empoderamento", "carreiras", "direitos_humanos", "empreendedorismo"];
        const atualIndex = ordem.indexOf(temaAtual);
        if (atualIndex !== -1 && atualIndex + 1 < ordem.length) {
            const proximo = ordem[atualIndex + 1];
            window.location.href = `quiz.html?tema=${proximo}`;
        } else {
            alert("Você concluiu todos os temas!");
            window.location.href = "mapa.html";
        }
    };

    loadQuestion();
});
