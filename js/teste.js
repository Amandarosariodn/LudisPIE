window.onload = function () {
    let vetor = [
        {
            id: 1,
            foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelHero",
            nome: "PixelHero",
            pontuacao: "950"
        },
        {
            id: 2,
            foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=NovaStar",
            nome: "NovaStar",
            pontuacao: "880"
        },
        {
            id: 3,
            foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=CyberWolf",
            nome: "CyberWolf",
            pontuacao: "790"
        },
        {
            id: 4,
            foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowCat",
            nome: "ShadowCat",
            pontuacao: "720"
        }
    ];

    let html = '';
    vetor.forEach(element => {
        html += '<tr>';
        html += `<td class="fw-bold">${element.id}º</td>`;
        html += `<td><img src="${element.foto}" class="rounded-circle" width="50" height="50" alt="Avatar"></td>`;
        html += `<td>${element.nome}</td>`;
        html += `<td class="text-success fw-semibold">${element.pontuacao}</td>`;
        html += '</tr>';
    });

    document.getElementById('rankingList').innerHTML = html;
};
