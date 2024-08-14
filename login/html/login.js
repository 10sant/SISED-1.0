// Manipula o evento de envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Monta o objeto de dados a ser enviado
    let info = { codUsuario: 5, nome_usuario: username, senha_usuario: password };

    // URL para a API de login
    var urlLogin = 'https://mykey.sa.ngrok.io/usuarios/login';

    // Configuração dos headers e request
    let h = new Headers();
    h.append('Content-Type', 'application/json');
    let req = new Request(urlLogin, {
        method: 'POST',
        headers: h,
        mode: 'cors',
        body: JSON.stringify(info)
    });

    // Envia a requisição de login
    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na resposta HTTP');
            }
        })
        .then((jsonData) => {
            console.log(jsonData);
            if (jsonData.success) {
                // Redireciona para a página homePage.html sem alerta
                window.location.href = 'homePage.html';
            } else {
                // Muda a cor do texto dos campos de entrada para vermelho
                document.getElementById('username').style.color = "red";
                document.getElementById('password').style.color = "red";
            }
        })
        .catch((err) => {
            console.log('Erro:', err.message);
        });
});


/*
// Função para recuperar senha
function esqueciSenha() {
    const username = prompt('Por favor, insira seu e-mail:');
    if (username) {
        fetch('/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => alert('Erro ao enviar solicitação de redefinição de senha.'));
    }
}
*/