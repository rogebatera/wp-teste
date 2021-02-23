const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client } = require('whatsapp-web.js');

const SESSION_FILE_PATH = 'session.json';

let sessionData = {};

if(fs.existsSync(SESSION_FILE_PATH)){

    //console.log(`caiu aqui no arquivo`);
    sessionData = require('./session.json');
    //console.log(sessionData);

    // Use the saved values
    const client = new Client({
        session: sessionData
    });

    client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        //console.log('QR RECEIVED', qr);
        qrcode.generate(qr, {small: true});
    });

    client.on('authenticated', (session) => {
        //console.log(session);
        //sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err){
            if(err){
                console.error(err);
            }
        });
    });
    
    client.on('ready', () => {
        console.log(client.info.pushname +', o Aparelho '+ client.info.phone.device_model+' está Pronto para Utilizar');   
    });

    client.initialize();

}else{

    console.log(`caiu sem aqui no arquivo`);
    const client = new Client();

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

    client.initialize();

}





/*client.on('message', message => {
	if(message.body === 'Oi'){
		message.reply('Oi, Tudo Bom?');
	}  
});

client.on('message', message => {
	//if(message.body === '!ping') {
		client.sendMessage(message.from, 'Opa... 👍');
	//}
}); */

