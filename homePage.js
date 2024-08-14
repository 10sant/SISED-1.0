//EXPANDIR MENU LATERAL//
document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});



const button = document.querySelector("#openModal");
const modal = document.querySelector("#modal");
const buttonClose = document.querySelector("#closeModal");

button.onclick = function(){
    modal.showModal();
}

buttonClose.onclick = function(){
    modal.close();
}




//status da solicitação de BH//
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('timeRequestForm');
    const requestsTableBody = document.getElementById('requestsTableBody');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const startDateTime = document.getElementById('startDateTime').value;
        const endDateTime = document.getElementById('endDateTime').value;

        if (new Date(startDateTime) >= new Date(endDateTime)) {
            alert('A data e hora inicial deve ser anterior à data e hora final.');
            return;
        }


        
        const newRow = document.createElement('tr');

        const startDateTimeCell = document.createElement('td');
        startDateTimeCell.textContent = startDateTime;
        newRow.appendChild(startDateTimeCell);

        const endDateTimeCell = document.createElement('td');
        endDateTimeCell.textContent = endDateTime;
        newRow.appendChild(endDateTimeCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = 'Em análise';
        newRow.appendChild(statusCell);

        requestsTableBody.appendChild(newRow);

        form.reset();
    });
});








/*Imprimir*/
function printTable() {
    // Salva o conteúdo original da página
    const originalContent = document.body.innerHTML;

    // Seleciona apenas a tabela para impressão
    const tableContent = document.querySelector('table').outerHTML;

    // Substitui o conteúdo da página pelo conteúdo da tabela
    document.body.innerHTML = tableContent;

    // Chama a função de impressão do navegador
    window.print();

    // Restaura o conteúdo original da página
    document.body.innerHTML = originalContent;
}





//função abrir relatorio de horas
document.getElementById('openRelatorioDeHoras').addEventListener('click', function() {
    // URL da página que você deseja abrir
    const url = '../banda1/relatorioB1.html';

    // Abre a URL em uma nova aba/janela
    window.open(url, '_blank');
});











//Cadastro novo usuário
function salvarDados(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const confirmarEmail = document.getElementById('confirmarEmail').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;

    if (email !== confirmarEmail) {
        alert("Os e-mails não coincidem!");
        return;
    }

    const dados = [
        ["Nome", "Sobrenome", "E-mail", "Telefone", "Senha"],
        [nome, sobrenome, email, telefone, senha]
    ];

    const ws = XLSX.utils.aoa_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cadastro");

    XLSX.writeFile(wb, "Cadastro.xlsx");
}









//Formulário Modal 
document.addEventListener('DOMContentLoaded', () => {
    let sequencial = 1; // Variável global para armazenar o número sequencial

    const form = document.getElementById('timeRequestForm');
    const requestsTableBody = document.getElementById('requestsTableBody');
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const startDateTime = document.getElementById('startDateTime').value;
        const endDateTime = document.getElementById('endDateTime').value;

        if (new Date(startDateTime) >= new Date(endDateTime)) {
            alert('A data e hora inicial deve ser anterior à data e hora final.');
            return;
        }

        const newRow = document.createElement('tr');

        // Célula para o número sequencial
        const idCell = document.createElement('td');
        idCell.textContent = sequencial++;
        newRow.appendChild(idCell);

        const startDateTimeCell = document.createElement('td');
        startDateTimeCell.textContent = startDateTime;
        newRow.appendChild(startDateTimeCell);

        const endDateTimeCell = document.createElement('td');
        endDateTimeCell.textContent = endDateTime;
        newRow.appendChild(endDateTimeCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = 'Em análise';
        newRow.appendChild(statusCell);

        requestsTableBody.appendChild(newRow);

        // Enviar os dados para o banco de dados
        try {
            const response = await fetch('https://9eca-186-220-96-148.ngrok-free.app/pessoas/bancoDeHoras', {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDateTime: startDateTime,
                    endDateTime: endDateTime,
                    status: 'Aprovado'
                })
            });

            if (response.ok) {
                console.log('Dados enviados com sucesso!');
            } else {
                console.error('Erro ao enviar dados:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }

        form.reset();
    });
    

    //ABERTURA&FECHAMENTO DO DIALOG BANCO DE DADOS
    openModalBtn.addEventListener('click', () => {
        modal.showModal();
    });

    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });
});







//PESQUISAR ITEM EXPEDIÇÃO
function performSearch() {
    // Obtém o valor do campo de pesquisa
    const query = document.getElementById('searchInput').value;

    // Obtém o contêiner onde os resultados serão exibidos
    const resultsContainer = document.getElementById('searchResults');

    // fazer algo com a query, como enviar para um servidor ou filtrar uma lista
    // Por exemplo, vamos apenas exibir o valor em um parágrafo:
    resultsContainer.innerHTML = `<p>Você pesquisou por: <strong>${query}</strong></p>`;

    // Se desejar, você pode enviar a query para um servidor usando fetch ou XMLHttpRequest
    // Exemplo com fetch:
    // fetch('API-URL', {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ query })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Atualiza o contêiner com o resultado da pesquisa
    //     resultsContainer.innerHTML = `<p>Resultados da pesquisa: ${JSON.stringify(data)}</p>`;
    // })
    // .catch(error => {
    //     resultsContainer.innerHTML = `<p>Erro: ${error.message}</p>`;
    // });
}





//admSolicitações

document.addEventListener('DOMContentLoaded', function() {
    fetch('URL_DO_SEU_BACKEND/endpoint') // Substitua com a URL do seu backend
        .then(response => response.json())
        .then(data => {
            const admContainer = document.querySelector('.admContainer');
            
            // Supondo que "data" é um array de objetos
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('data-item');
                itemDiv.innerHTML = `
                    <p><strong>ID:</strong> ${item.id}</p>
                    <p><strong>Nome:</strong> ${item.nome}</p>
                    <p><strong>Descrição:</strong> ${item.descricao}</p>
                    <button>Recusar</button>
                    <button>Ajuste</button>
                    <button>Confirmar</button>
                `;
                admContainer.appendChild(itemDiv);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
});


  // Seleciona os elementos
        const selectAllCheckbox = document.getElementById('selectAll');
        const personCheckboxes = document.querySelectorAll('.personCheckbox');

        // Adiciona o evento para selecionar/desmarcar todos
        selectAllCheckbox.addEventListener('change', function() {
            personCheckboxes.forEach(function(checkbox) {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });

        // Adiciona o evento para desmarcar "Selecionar Todos" se qualquer caixa de pessoa for desmarcada
        personCheckboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                if (!checkbox.checked) {
                    selectAllCheckbox.checked = false;
                } else if (Array.from(personCheckboxes).every(cb => cb.checked)) {
                    selectAllCheckbox.checked = true;
                }
            });
        });














        // Função para abrir e fechar os modais
document.getElementById('openModalTaxa').addEventListener('click', function() {
    document.getElementById('modalTaxa').showModal();
});

document.getElementById('closeModalTaxa').addEventListener('click', function() {
    document.getElementById('modalTaxa').close();
});

document.getElementById('openModalAdicionarTaxa').addEventListener('click', function() {
    document.getElementById('modalAdicionarTaxa').showModal();
});

document.getElementById('closeModalAdicionarTaxa').addEventListener('click', function() {
    document.getElementById('modalAdicionarTaxa').close();
});

// Atualizar taxa existente
document.getElementById('taxaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taxaNome = document.getElementById('editTaxaNome').value.trim().toUpperCase();
    const taxaValor = document.getElementById('editTaxaValor').value;

    // Verifica se o nome da taxa existe na tabela
    const taxaId = taxaNome.toLowerCase();
    const taxaElement = document.getElementById(taxaId);

    if (taxaElement) {
        // Atualiza o valor na tabela
        taxaElement.textContent = `${taxaValor}%`;
        alert(`Taxa ${taxaNome} foi atualizada para ${taxaValor}%`);
    } else {
        alert('Taxa não encontrada na tabela.');
    }

    document.getElementById('modalTaxa').close();
});

// Adicionar nova taxa
document.getElementById('addTaxaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newTaxaNome = document.getElementById('newTaxaNome').value.trim().toUpperCase();
    const newTaxaValor = document.getElementById('newTaxaValor').value;

    // Verifica se a taxa já existe na tabela
    const existingTaxa = document.getElementById(newTaxaNome.toLowerCase());
    if (existingTaxa) {
        alert('Taxa já existe na tabela.');
        return;
    }

    // Cria um novo elemento de linha na tabela
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${newTaxaNome}</td>
        <td>${newTaxaNome} (nova taxa)</td>
        <td id="${newTaxaNome.toLowerCase()}">${newTaxaValor}%</td>
    `;

    // Adiciona a nova linha à tabela
    document.getElementById('taxa-table').querySelector('tbody').appendChild(newRow);
    alert(`Taxa ${newTaxaNome} foi adicionada com valor de ${newTaxaValor}%`);

    document.getElementById('modalAdicionarTaxa').close();
});


