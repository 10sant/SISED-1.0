const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = {
  'user@example.com': { resetToken: null }
  // Adicione mais usuários conforme necessário
};

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!users[email]) {
    return res.status(400).send('Usuário não encontrado.');
  }

  const resetToken = Math.random().toString(36).substr(2); // Gera um token simples
  users[email].resetToken = resetToken;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'seuemail@gmail.com',
      pass: 'suasenha'
    }
  });

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: email,
    subject: 'Redefinição de Senha',
    text: `Para redefinir sua senha, clique no link: http://localhost:3000/reset-password?token=${resetToken}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Erro ao enviar e-mail.');
    }
    res.send('E-mail de redefinição de senha enviado.');
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
