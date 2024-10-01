const formEvento = document.getElementById ('formEvento');
formEvento.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:4000/eventos';
buscarTodosEventos();

var motivoAcao = "CADASTRAR";


function gravarEvento(){
    const objetoEvento = {
        Idevento: document.getElementById('Idevento').value, 
        artista: document.getElementById('artista').value,
        preco_ingresso: document.getElementById('preco_ingresso').value,
        local_evento: document.getElementById('local_evento').value,
        data_evento: document.getElementById('data_evento').value,
        hora_evento: document.getElementById('hora_evento').value,
    }

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    })
    .then(resposta => resposta.json())
    .then(respostaAPI => {
        if (respostaAPI.status) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        } else {
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    })
    .catch(erro => {
        exibirMensagem(erro, '#D2691E');
    });


}

function selecionarEvento(Idevento, artista, preco_ingresso, local_evento, data_evento, hora_evento, motivo) {

    document.getElementById('Idevento').value = Idevento;
    document.getElementById('artista').value = artista;
    document.getElementById('preco_ingresso').value = preco_ingresso;
    document.getElementById('local_evento').value = local_evento;
    document.getElementById('data_evento').value = data_evento;
    document.getElementById('hora_evento').value = hora_evento;

  
    motivoAcao = motivo;

    const botaoCadastrar = document.getElementById('botaoCadastrar');
    if (motivoAcao == 'EDITAR') {
        botaoCadastrar.innerHTML = 'EDITAR';
    }
    else if (motivoAcao == 'EXCLUIR') {
        botaoCadastrar.innerHTML = 'EXCLUIR';
    }
}


function excluirEvento(){
    fetch(enderecoAPI, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Idevento: document.getElementById('Idevento').value})
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro.message, '#D2691E');
    });

}
function atualizarEvento(){

    const objetoEvento = {
        Idevento: document.getElementById('Idevento').value, 
        artista: document.getElementById('artista').value,
        preco_ingresso: document.getElementById('preco_ingresso').value,
        local_evento: document.getElementById('local_evento').value,
        data_evento: document.getElementById('data_evento').value,
        hora_evento: document.getElementById('hora_evento').value
    }

    fetch(enderecoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });

}
function buscarTodosEventos () {
    fetch(enderecoAPI, {method:'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirTabelaEventos(respostaAPI.listaEventos);
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    })
    .catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function validarCampos(evento){

    const Idevento       = document.getElementById('Idevento').value.trim();
    const artista        = document.getElementById('artista').value;
    const preco_ingresso = document.getElementById('preco_ingresso').value;
    const local_evento   = document.getElementById('local_evento').value;
    const data_evento    = document.getElementById('data_evento').value;
    const hora_evento    = document.getElementById('hora_evento').value;


    evento.stopPropagation();
    evento.preventDefault();
     
    if(Idevento && artista && preco_ingresso && local_evento && data_evento && hora_evento) {
        if (motivoAcao == "CADASTRAR"){
            gravarEvento();
        }
        else if (motivoAcao == "EDITAR"){
            atualizarEvento();
            motivoAcao = "CADASTRAR";
        }
        else if (motivoAcao == "EXCLUIR"){
            excluirEvento();
            motivoAcao = "CADASTRAR";
        }
      
        formEvento.reset();
        buscarTodosEventos();
        return true;
    } 
    else{
        exibirMensagem('Por favor, preencha todos os campos do formulário.');
        return false;
    }


}

function exibirMensagem(mensagem, cor = 'black'){
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML ="<p style='color: " + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}


function exibirTabelaEventos(listaEventos){
    if (listaEventos.length > 0) {
        const espacoTabela = document.getElementById('containerTabela');
        const tabela = document.createElement('table');
        tabela.classList="table table-striped table-hover";
        const cabecalho = document.createElement('thead')
        cabecalho.innerHTML = `
        <tr>
            <th>ID EVENTO</th>
            <th>ARTISTA</th>
            <th>PRECO_INGRESSO</th>
            <th>LOCAL_EVENTO</th>
            <th>DATA_EVENTO</th>
            <th>HORA_EVENTO</th>
            <th>Ações</th>
        </tr>
    `;
        const corpo = document.createElement('tbody');
        for (const evento of listaEventos) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${evento.Idevento}</td>
                <td>${evento.artista}</td>
                <td>${evento.preco_ingresso}</td>
                <td>${evento.local_evento}</td>
                <td>${evento.data_evento}</td>
                <td>${evento.hora_evento}</td>
                <td>
                    <button onclick="selecionarEvento('${evento.Idevento}','${evento.artista}','${evento.preco_ingresso}','${evento.local_evento}','${evento.data_evento}','${evento.hora_evento}','EDITAR')">Alterar</button>
                    <button onclick="selecionarEvento('${evento.Idevento}','${evento.artista}','${evento.preco_ingresso}','${evento.local_evento}','${evento.data_evento}','${evento.hora_evento}','EXCLUIR')">Excluir</button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        espacoTabela.innerHTML="";
        espacoTabela.appendChild(tabela);

      
        

    }
    else{
        exibirMensagem('Nenhum cliente encontrado.');
    }
}

