//ChatBot
document.getElementById('chatbot-toggle').addEventListener('click', () => {
    document.getElementById('chatbot').style.display = 'block';
    document.getElementById('chatbot-toggle').style.display = 'none';
});

document.getElementById('closeChatbot').addEventListener('click', () => {
    document.getElementById('chatbot').style.display = 'none';
    document.getElementById('chatbot-toggle').style.display = 'block';
});

document.getElementById('chatbot-send').addEventListener('click', sendMessage);
document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message === '') return;

    appendMessage('Você', message, 'user');
    input.value = '';

    setTimeout(() => {
        const response = getBotResponse(message);
        appendMessage('LUDIS', response, 'bot');
    }, 500);
}

function appendMessage(sender, text, type) {
    const messages = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.className = `chat-message ${type}`;

    const avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.src = type === 'bot' ? 'imagens/chatbot.png' : 'imagens/chatbot.png';

    const messageText = document.createElement('div');
    messageText.className = 'text';
    messageText.textContent = text;

    msg.appendChild(avatar);
    msg.appendChild(messageText);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(message) {
    const msg = message.toLowerCase();

    if (msg.includes('fase') || msg.includes('mapa')) {
        return 'Você pode acessar as fases clicando em "Mapa de Fases" no menu.';
    } else if (msg.includes('ranking') || msg.includes('pontuação') || msg.includes('posição')) {
        return 'Você pode ver sua pontuação e posição na página "Ranking".';
    } else if (msg.includes('tutorial') || msg.includes('como jogar')) {
        return 'Acesse o "Tutorial" no menu para aprender a jogar.';
    } else if (msg.includes('suporte') || msg.includes('ajuda') || msg.includes('problema')) {
        return 'Você pode acessar a página "Suporte" pelo menu lateral para ajuda.';
    } else if (msg.includes('perfil') || msg.includes('minha conta') || msg.includes('editar')) {
        return 'Na página "Perfil", você pode editar seus dados e imagem.';
    } else {
        return 'Desculpe, ainda estou aprendendo. Tente perguntar sobre fases, ranking, perfil, tutorial, suporte ou como sair.';
    }
}