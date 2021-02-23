const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client } = require('whatsapp-web.js');

const SESSION_FILE_PATH = 'session.json';

let sessionData = {};

let client = new Client();

if(fs.existsSync(SESSION_FILE_PATH)){

    sessionData = require('./session.json');
    // Use the saved values
    client = new Client({
        session: sessionData
    });

}


client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    //console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', (session) => {
    //console.log(session);
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if(err){
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log(client.info.pushname +', o Aparelho '+ client.info.phone.device_model+' está Pronto para Utilizar');   
});

client.on('message', message => {
	//if(message.body === 'Oi'){
        console.log(message);
        client.sendMessage('554188963331@c.us', message.body);
        //message.send
	//}  
});

client.initialize();


