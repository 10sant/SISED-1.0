
// Soma e exibição em tabela do objeto 
let user = {
  titulo: "Ego Transformado",
  cod: "101059",
  editora: "Vida Nova",
  prateleira: "A-15",
  boxI: "C45",
  boxII: "L10",
  paginas: "48",
  ultimaImpressao: "2024"
};
a
var prateleira = 100,
    boxI = 5000,
    boxII = 3000;

var soma = prateleira + boxI + boxII;

console.log(soma); // Output: 8100

// Adiciona a propriedade 'saldo' ao objeto 'user'
user["saldo"] = soma;
console.log(user);

console.table(user);



 


//teste
// Função para realizar a busca
function realizarBusca() {
    
   
// Obter o valor digitado no campo de busca
    
   
const query = document.getElementById('searchQuery').value;

    

   


// Verificar se a consulta não está vazia
    
   
if (query.trim() === '') {
        
        alert

       
alert('Por favor, digite algo para buscar.');
        
       
return;
    }

    
    }

   

   
// Aqui você pode adicionar a lógica de busca
    
   
// Por exemplo, fazer uma chamada para uma API de busca ou filtrar uma lista de itens
    
   
// Neste exemplo, vamos apenas exibir a consulta no console
    console.log('Buscando por:', query);

    

// Exemplo de resultado de busca (substitua com sua lógica)
    
   
const resultados = [
        
       
'Resultado 1 para ' + query,
        
       
'Resultado 2 para ' + query,
        
       
'Resultado 3 para ' + query,
    ];

     
   

   

   
// Exibir os resultados no elemento de resultados
    
   
const resultadosDiv = document.getElementById('searchResults');
    resultadosDiv.
    resultadosDiv

    resultados
innerHTML = '';
    resultados.
    resultados

   



    

forEach(resultado => {
        
        c

     

 
const resultadoItem = document.createElement('div');
        resultadoItem.
        resultado

       
textContent = resultado;
        resultadosDiv.
        resultadosDiv

        resultados
appendChild(resultadoItem);
    });


   
// Adicionar um event listener ao botão de busca
document.getElementById('searchButton').addEventListener('click', realizarBusca);




 

// Função principal da calculadora
function calculadora() {
  // Pedir ao usuário para escolher a operação
  let operacao = prompt("Escolha a operação desejada: soma (+), subtração (-), multiplicação (*), divisão real (/), divisão inteira (%), potenciação (**)");

  // Validar se a operação escolhida é válida
  switch (operacao) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
      case '**':
          break; // Operação válida
      default:
          console.log("Operação inválida. Escolha uma operação válida.");
          return; // Encerra a função se a operação não for válida
  }

  // Pedir ao usuário para inserir os números
  let n1 = parseFloat(prompt("Digite o primeiro número:"));
  let n2 = parseFloat(prompt("Digite o segundo número:"));

  // Verificar se os valores inseridos são numéricos
  if (isNaN(n1) || isNaN(n2)) {
      console.log("Um ou ambos os valores não são numéricos. Tente novamente.");
      return; // Encerra a função se um valor não for numérico
  }

  // Calcular o resultado com base na operação escolhida
  let resultado;
  switch (operacao) {
      case '+':
          resultado = n1 + n2;
          break;
      case '-':
          resultado = n1 - n2;
          break;
      case '*':
          resultado = n1 * n2;
          break;
      case '/':
          resultado = n1 / n2;
          break;
      case '%':
          resultado = n1 % n2;
          break;
      case '**':
          resultado = Math.pow(n1, n2);
          break;
  }

  // Exibir o resultado usando template strings
  console.log(`${n1} ${operacao} ${n2} = ${resultado}`);
}

// Chamada da função calculadora
calculadora();








/*
// Configurações da API do Google Sheets
const SPREADSHEET_ID = //docs.google.com/spreadsheets/d/1wYOFjocBCuv4D7uRfnWwdq-f2HmnZTatbt1Oll2qxNs/edit?gid=0#gid=0;  
const CLIENT_ID = 'SEU_CLIENT_ID';  // Substitua pelo seu Client ID
const API_KEY = 'SUA_API_KEY';  // Substitua pela sua API Key
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

// Função para registrar entrada no trabalho na planilha
function registrarBanco() {
    registrarEvento('Entrada');
}





// Função para registrar saída do trabalho na planilha
function registrarSaida() {
    registrarEvento('Saída');
}

// Função genérica para registrar evento na planilha
function registrarEvento(evento) {
    // Obter data e hora atuais
    const dataHoraAtual = new Date();
    const dataAtual = dataHoraAtual.toLocaleDateString('pt-BR');
    const horaAtual = dataHoraAtual.toLocaleTimeString('pt-BR');

    // Objeto com dados a serem inseridos na planilha
    const dados = {
        'values': [[evento, dataAtual, horaAtual]]
    };






    // Requisição para inserir dados na planilha usando Google Sheets API
    $.ajax({
        url: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:append`,
        type: 'POST',
        data: JSON.stringify(dados),
        contentType: 'application/json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${API_KEY}`);
        },
        success: function(response) {
            console.log(`Evento "${evento}" registrado com sucesso na planilha!`);
        },
        error: function(error) {
            console.error('Erro ao inserir dados na planilha:', error);
        }
    });
}*/










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
