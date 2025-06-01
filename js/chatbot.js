// Chatbot
document.getElementById('chatbot-toggle').addEventListener('click', () => {
    document.getElementById('chatbot').style.display = 'flex';
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

    appendMessage('Você', message);
    input.value = '';

    setTimeout(() => {
        appendMessage('LUDIS', getBotResponse(message));
    }, 500);
}

function appendMessage(sender, text) {
    const messages = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(message) {
    const msg = message.toLowerCase();
    if (msg.includes('fase') || msg.includes('mapa')) {
        return 'Para acessar as fases, clique em "Mapa de Fases" no menu principal.';
    } else if (msg.includes('pontuação') || msg.includes('ranking')) {
        return 'Você pode conferir sua pontuação e sua posição na página "Ranking".';
    } else if (msg.includes('perfil')) {
        return 'Visite seu perfil para atualizar suas informações e alterar sua foto.';
    } else if (msg.includes('tutorial')) {
        return 'O tutorial está disponível no menu, no canto superior esquerdo, para ajudar você a entender como o jogo funciona.';
    } else if (msg.includes('suporte')) {
        return 'O suporte, localizado no menu superior esquerdo, oferece respostas para as dúvidas mais comuns dos jogadores.';
    } else {
        return 'Desculpe, ainda estou aprendendo. Por favor, pergunte sobre mapa, fases, ranking, tutorial, suporte ou perfil para que eu possa ajudar.';
    }
}
