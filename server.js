const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'your_database'
});

// Conectando ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

app.post('/user/request', (req, res) => {
    const { startDateTime, endDateTime, justificativa } = req.body;

    const config = {
        service: 'gmail',
        auth: {
            user: 'vidanova.noreply@gmail.com',
            pass: 'vgne enby ydbc mast',
        }
    };

    const transporter = nodemailer.createTransport(config);
    const requestId = uuidv4();
    const urlConfirm = `http://localhost:3001/user/request/confirm/${requestId}`;
    const urlDeny = `http://localhost:3001/user/request/deny/${requestId}`;
    const urlNegotiate = `http://localhost:3001/user/request/negotiate/${requestId}`;

    const html = `
        <body>
            <div>
                <hr/>
                <br />
                Inicio: ${startDateTime}
                <br /> Término: ${endDateTime}
                <br /> Justificativa: ${justificativa}
                <br />
                <a href="${urlConfirm}">Aceitar Proposta</a>
                <br />
                <a href="${urlDeny}">Rejeitar Proposta</a>
                <br />
                <a href="${urlNegotiate}">Negociar Proposta</a>
            </div>
        </body>`;

    const mailOptions = {
        from: 'vidanova.noreply@gmail.com',
        to: 'fctfabio@gmail.com',
        subject: 'Request',
        html: html,
    };

    const queryString = "INSERT INTO request (dateStart, dateEnd, userId, status, requestKey) VALUES (?,?,?,?,?)";
    connection.query(queryString, [startDateTime, endDateTime, 1, '1', requestId], async (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao salvar solicitação no banco de dados.');
            return;
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json('Erro ao enviar e-mail.');
            } else {
                console.log(info);
                res.send("Email enviado com sucesso!");
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
