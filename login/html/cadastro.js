//BLOCO 1 - CADASTRO PESSOA FISICA
document.getElementById('openModalPf').addEventListener('click', function() {
  document.getElementById('modalPf').showModal();
});
//1.1 - ENVIO DE FORMULÁRIO PESSOA FISICA
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Cadastro feito com sucesso!');
  document.getElementById('modalPf').close();
});
//1.2 - FORMATAÇÃO CPF
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    }
    e.target.value = value;
  });
});
//1.3 - FORMATAÇÃO RG
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('rg').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 9) {
      value = value.slice(0, 9);
    }
    if (value.length > 7) {
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{0,1})/, '$1.$2.$3-$4');
    } else if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,3})/, '$1.$2');
    }
    e.target.value = value;
  });
});





//BLOCO 2 - CADASTRO PESSOA JURIDICA
document.getElementById('openModalPj').addEventListener('click', function() {
  document.getElementById('modalPj').showModal();
});
//1.1 - ENVIO DE FORMULÁRIO PESSOA JURIDICA
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Cadastro feito com sucesso!');
  document.getElementById('modalPJ').close();
});
//2.2 - FORMATAÇÃO CNPJ
document.addEventListener('DOMContentLoaded', function() {

document.getElementById('cnpj').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 14) {
    value = value.slice(0, 14);
  }
  if (value.length > 12) {
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
  } else if (value.length > 8) {
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{0,3})/, '$1.$2');
  }
  e.target.value = value;
  });
});

//2.3 - FORMATAÇÃO I.E (INSCRIÇÃO ESTADUAL)
document.getElementById('ie').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 12) {
    value = value.slice(0, 12);
  }
  if (value.length > 8) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3.$4');
  } else if (value.length > 5) {
    value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  } else if (value.length > 2) {
    value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  }
  e.target.value = value;
});

//3 - SALVAR DADOS
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();
  salvarDados();
});

//3.1  SALVAR DADOS OBRIGATÓRIOS 
function salvarDados() {
  let nome = document.getElementById('nomeUsuario').value;
  let codUsuarioCriado = document.getElementById('codUsuarioCriado').value;
  let codUsuarioMod = document.getElementById('codUsuarioMod').value;
  
  const cpf = document.getElementById('cpf').value;
  const rg = document.getElementById('rg').value;
  const cnpj = document.getElementById('cnpj').value;
  const ie = document.getElementById('ie').value;  
  const dataNascimento = document.getElementById('dataNascimento').value;

  const dados = {
    nome: nome,
    razaoSocial: nome,
    cpf: cpf,
    cnpj: cnpj,
    ie: ie,
    dataNascimento: dataNascimento,
    codUsuarioCriado: codUsuarioCriado,
    codUsuarioMod: codUsuarioMod
  };
//3.2 - CONDIÇÕES DAS INFORMAÇÃOS "NÃO OBRIGATÓRIAS"
  if (document.getElementById('cpf').value !== '') {
    let cpf = document.getElementById('cpf').value;
    Object.defineProperty(dados, "cpf", { value: cpf });
  }

  if (document.getElementById('rg').value !== '') {
    let rg = document.getElementById('rg').value;
    Object.defineProperty(dados, "rg", { value: rg });
  }

  if (document.getElementById('ie').value !== '') {
    let ie = document.getElementById('ie').value;
    Object.defineProperty(dados, "ie", { value: ie });
  }

  if (document.getElementById('cnpj').value !== '') {
    let cnpj = document.getElementById('cnpj').value;
    Object.defineProperty(dados, "cnpj", { value: cnpj });
  }
  if (document.getElementById('dataNascimento').value !== '') {
    let dataNascimento = document.getElementById('dataNascimento').value;
    Object.defineProperty(dados, "dataNascimento", { value: cnpj });
  }










//4 - ENVIAR PARA ARMAZENAMENTO NO SERVIDOR
    //CÓDIGO VÁRIAVEL (por enquanto sera um codigo por dia)
  fetch('https://9eca-186-220-96-148.ngrok-free.app/pessoas/cadastro', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Cadastro feito com sucesso!', data);
  })
  .catch((error) => {
    console.error('Vamos arrumar as informações?', error);
  });
}
