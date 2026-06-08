const axios=require('axios');
var btoa=require('btoa');

exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('OK')
    };
    const wa_numbers=[
        {'product':'fanhome','country':'uk','integration':'645d0a6cb61f483103e18841', 'template':'24_hour_message','lang':'en','text':"Hi, We received your message but unfortunately we have not yet been able to respond to you. Please respond to this message with a thumbs up and we will get back to you on our next working day."},
        {'product':'partwork','country':'uk','integration':'6475c367fbf54717528f893a','template':'holding_message','lang':'en','text':"Hi, We received your message but unfortunately we have not yet been able to respond to you. Please respond to this message with a thumbs up and we will get back to you on our next working day."},
        {'product':'fanhome','country':'de','integration':'6529588ca977d8deafb11c98','template':'24_hour_message','lang':'de','text':"Hallo, wir haben Ihre Nachricht erhalten, aber wir können darauf noch nicht antworten."},
        {'product':'partwork','country':'de','integration':'652956dbe9821339a083e597','template':'holding_message','lang':'de','text':"Bitte antworten Sie auf diese Nachricht mit einem Daumen hoch und wir werden uns am nächsten Werktag bei Ihnen melden. Wenn Sie keine weiteren Fragen haben oder Hilfe benötigen, können Sie diese Nachricht ignorieren."},
        {'product':'fanhome','country':'us','integration':'65ae46d8ecee5a084f765623', 'template':'24_hour_message_usa_fh','lang':'en_US','text':"Hi, we received your message but unfortunately we have not yet been able to respond to you. Please respond to this message with a thumbs up and we will get back to you on our next working day, if you no longer need support please ignore this message."},
        {'product':'partwork','country':'us','integration':'65ae46047da7bc6bae1cb504','template':'24_hour_teamplate','lang':'en_US','text':"Hi, we received your message but unfortunately we have not yet been able to respond to you. Please respond to this message with a thumbs up and we will get back to you on our next working day, if you no longer need support please ignore this message."},
        {'product':'fanhome','country':'nl','integration':'65af7cc0cbe680f08b56ed20','template':'nl_fh_24_hour_message','lang':'en_GB','text':"Hi, we received your message but unfortunately we have not yet been able to respond to you. Please respond to this message with a thumbs up and we will get back to you on our next working day, if you no longer need support please ignore this message."},
        {'product':'partwork','country':'nl','integration':'65af7db81097a9ec87c05422','template':'nl_24_hour_pw_message','lang':'en_GB','text':"Hi, we received your message but unfortunately we have not yet been able to respond to you. Please respond to this message with a thumbs up and we will get back to you on our next working day, if you no longer need support please ignore this message."},
        {'product':'partwork','country':'gr','integration':'65d77361eac4b03650ec5702','template':'24_hour_message_gr','lang':'el','text':"Γεια σας, σας επιβεβαιώνουμε ότι λάβαμε το μήνυμά σας, δυστυχώς όμως δεν είμαστε διαθέσιμοι αυτή τη στιγμή. Παρακαλούμε απαντήστε σε αυτό το μήνυμα με ένα αντίχειρα και θα επικοινωνήσουμε μαζί σας την επόμενη εργάσιμη ημέρα. Σε περίπτωση που δεν χρειάζεστε περαιτέρω υποστήριξη, παρακαλούμε αγνοήστε αυτό το μήνυμα."},
        {'product':'partwork','country':'pl','integration':'65e85ad935aa30f2825d5b78','template':'24_hour_message_poland','lang':'pl','text':"Szanowny Kliencie, otrzymaliśmy Twoją wiadomość, ale niestety nie byliśmy jeszcze w stanie na nią odpowiedzieć. Jeśli nadal chcesz się z nami skontaktować, zareaguj na tą wiadomość, używając ikony kciuka w górę, a odpiszemy w trakcie następnego dnia roboczego. Jeśli nie potrzebujesz już naszego wsparcia, zignoruj tę wiadomość."},
        {'product':'partwork','country':'cz','integration':'6641ded08527a2be9007e445','template':'cz_deag_24_hour_message','lang':'cs','text':"Dobrý den, obdrželi jsme Vaši zprávu, ale bohužel jsme Vám ještě nemohli odpovědět. Odpovězte prosím na tuto zprávu palcem nahoru a my se vám ozveme zpět následující pracovní den. Pokud již podporu nepotřebujete, na tuto zprávu prosím neodpovídejte."},
        {'product':'partwork','country':'sk','integration':'6641dd9701c8dc9bb38b5082','template':'sk_deag_24_hour_message','lang':'sk','text':"Dobrý deň, dostali sme Vašu správu, ale bohužiaľ sme Vám ešte nemohli odpovedať. Odpovedzte prosím na túto správu palcom hore a my sa vám ozveme späť nasledujúci pracovný deň. Ak už podporu nepotrebujete, na túto správu prosím neodpovedajte."},
        {'product':'partwork','country':'it','integration':'6865235a3c27e942311b1c40','template':'24_hour_holding_message','lang':'it','text':"Vuoi ancora chattare con noi? Ciao, abbiamo ricevuto il tuo messaggio! Purtroppo, non siamo ancora riusciti a risponderti. Rispondi a questo messaggio con un pollice in su 👍 e ti ricontatteremo durante il nostro prossimo giorno lavorativo. In alternativa, puoi inviare un nuovo messaggio durante gli orari di apertura dei nostri uffici, dal lunedì al venerdì dalle 9 alle 18. Se non hai più bisogno di assistenza, puoi ignorare questo messaggio. Se ci hai contattato durante un giorno festivo, la nostra risposta potrebbe richiedere più tempo del normale"},
        {'product':'partwork','country':'fr','integration':'68d2945efee6e8007fb8f2dd','template':'24_hour_message_fr','lang':'fr','text':"Souhaitez-vous toujours discuter avec nous ? Bonjour, nous avons bien reçu votre message, mais malheureusement nous n’avons pas encore pu vous répondre.Merci de répondre à ce message avec un pouce levé 👍 et nous reviendrons vers vous lors de notre prochaine journée ouvrée, ou vous pouvez démarrer une nouvelle conversation lorsque le bureau sera de nouveau ouvert, du lundi au vendredi de 9h à 17h.Si vous n’avez plus besoin d’assistance, vous pouvez ignorer ce message. Si vous nous avez contactés pendant un jour férié, il se peut que le délai de réponse soit plus long que d’habitude."}
    ]
    try {
        console.log("CORPO: " + event.body);
        var body = JSON.parse(event.body);
        const targetAuth = 'Basic ' + btoa(process.env.user + ':' + process.env.pwd);
        const targetPoint = 'https://deagostini.zendesk.com/api/v2/tickets/' + body.ticket_id;
        console.log('TARGET:'+targetPoint);
        const options= { headers: {
                'Authorization': targetAuth,
                'Content-Type': 'application/json; charset=utf-8'
        }};
        
        const waOptions= { headers: {
            'Authorization': 'Basic ' + btoa(process.env.wuser + ':' + process.env.wpwd),
            'Content-Type': 'application/json'
        }};

/*----------------------------------------------------------------------
Get ticket
------------------------------------------------------------------------*/                

        var rispo = await axios.get(targetPoint, options);
        console.log("OTTENGO " + JSON.stringify(rispo.data, null, 2))
        const myTicket = rispo.data.ticket;

        var data=myTicket.custom_fields.find(x=>x.id==12304732062225);
        if(data && data.value!=null && data.value != "") {
            var minuti=(Date.now() -(new Date(data.value).getTime()))/60000;
            if(minuti < 23*60) {
                console.log('Data ' +data.value+' troppo ravvicinata '+ minuti);
                return response;
            }
            console.log("Data ok")
        }

        if (myTicket.status == 'on_hold' || myTicket.status == 'solved' || myTicket.status == 'closed') {
            console.log('Esco x stato ticket invalido: ' + myTicket.status);
            return response;
        }
        data=myTicket.custom_fields.find(x=>x.id==360026373537); //country
        const myCountry= (data && data.value ? data.value : "");
        console.log("PRODUCT: "+body.product+", COUNTRY: "+myCountry);
//        console.log("wa_numbers: "+JSON.stringify(wa_numbers,null,2));
        const myWaNumber = wa_numbers.find(x => x.country == myCountry && x.product == body.product);        
        if (!myWaNumber) {
            console.log("Esco perchè non trovo WA Number");
            return response;
        }


        if(! myTicket.tags.includes('message_post24')) 
            myTicket.tags.push('message_post24');
        if(! myTicket.tags.includes('wa_template_sent')) 
            myTicket.tags.push('wa_template_sent');

//----------------------------------------------------------------------
//Invio template
//------------------------------------------------------------------------
        var waNotification =
        {
            "destination": {
                "integrationId": myWaNumber.integration,
                "destinationId": body.phone
            },
            "author": {
                "role": "appMaker"
            },
            "messageSchema": "whatsapp",
            "message": {
                "type": "template",
                "template": {
                    "namespace": "139351249006095",
                    "name": myWaNumber.template,
                    "language": {
                        "policy": "deterministic",
                        "code": myWaNumber.lang
                    }
                }
            }
        };

        if(body.phone) {
        var vedo=await axios.post('https://api.smooch.io/v1.1/apps/608ae9bee8f84500d347e69f/notifications',
            waNotification,waOptions);
        console.log('Sent template message '+myWaNumber.template);
        }
        else console.log("message not sent: no phone number");
//-------------------------------------------------------------------------------        
        console.log("Got ticket con grp="+myTicket.group_id+",  assignee="+myTicket.assignee_id+", tags:"+ JSON.stringify(myTicket.tags,null,2));  
        const aggiorna=
        { "ticket":
            {  "group_id":7121724882833,
                "custom_fields": [
               {"id": 12304805366033,"value": myTicket.group_id},
               {"id": 12304855679377,"value": myTicket.assignee_id},
               {"id": 12304732062225,"value": (new Date().toISOString())},
              ],
              "comment": {
                "body": "Sent 24H Template Message.\n"+ myWaNumber.text,
                "author_id": 12447606189201,
                "public":false
              },

            }
        };
        if(myTicket.status != 'pending') {
            aggiorna.ticket.group_id=7121724882833;
//            aggiorna.ticket.status='pending';
//            console.log("Stato messo a pending")
        }
        console.log(JSON.stringify(aggiorna,null,2));
        const ris = await axios.put(targetPoint,aggiorna,options);    
        console.log('Fine OK');
        return response;
    }
    catch (erro) {
        console.log("Errore " + erro);
        response.body=JSON.stringify("Errore "+erro);
        return response;
    }  
}