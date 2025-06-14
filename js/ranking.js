document.addEventListener("DOMContentLoaded", () => {
  const rankingBruto = JSON.parse(localStorage.getItem("ranking")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Cria um mapa com pontuações somadas por email
  const pontuacoesPorEmail = {};
  rankingBruto.forEach(entry => {
    if (!entry.email) return;
    const email = entry.email.toLowerCase();
    pontuacoesPorEmail[email] = (pontuacoesPorEmail[email] || 0) + (Number(entry.pontuacao) || 0);
  });

  // Monta ranking com base nos usuários cadastrados
  const rankingArray = users.map(user => {
    const email = user.email.toLowerCase();
    return {
      email,
      nome: user.name || "Anônimo",
      foto: user.profileImage || "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      pontuacaoTotal: pontuacoesPorEmail[email] || 0
    };
  });

  // Ordena por pontuação
  rankingArray.sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal);

  // Monta a tabela - mostra apenas os 5 primeiros
  const rankingBody = document.getElementById("rankingBody");
  rankingBody.innerHTML = "";
  rankingArray.slice(0, 5).forEach((jogador, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${index + 1}º</td>
    <td><img src="${jogador.foto}" alt="Avatar" width="40" height="40" class="rounded-circle"></td>
    <td>${jogador.nome}</td>
    <td>${jogador.pontuacaoTotal}</td>
  `;
    rankingBody.appendChild(tr);
  });


  // Exibe info do usuário logado
  const loggedEmail = sessionStorage.getItem("loggedInUser")?.toLowerCase();
  if (!loggedEmail) return;

  const posicaoUsuario = rankingArray.findIndex(u => u.email === loggedEmail);
  const loggedUser = rankingArray[posicaoUsuario];

  document.getElementById("loggedUserImage").src = loggedUser.foto;
  document.getElementById("loggedUserName").textContent = loggedUser.nome;
  document.getElementById("loggedUserPoints").textContent = loggedUser.pontuacaoTotal;
  document.getElementById("loggedUserPosition").textContent = `Posição: ${posicaoUsuario + 1}º`;
});
