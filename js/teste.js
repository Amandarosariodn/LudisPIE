window.onload=function(e) {
    let vetor = [];
    vetor.push({'id':1, 'foto':'Foto1', 'nome':'Nome1', 'pontuacao':'Pontuação1'});
    vetor.push({'id':2, 'foto':'Foto2', 'nome':'Nome2', 'pontuacao':'Pontuação2'});
    vetor.push({'id':3, 'foto':'Foto3', 'nome':'N0me3', 'pontuacao':'Pontuação3'});
    vetor.push({'id':4, 'foto':'Foto4', 'nome':'Nome4', 'pontuacao':'Pontuação4'});
    let html = '';
    vetor.forEach(element => {
        html += '<tr>';
        html += '<td>'+element.id+'</td>';
        html += '<td>'+element.foto+'</td>';
        html += '<td>'+element.nome+'</td>';
        html += '<td>'+element.pontuacao+'</td>';
        html += '</tr>';     
    });

    document.getElementById('rankingList').innerHTML = html;
}