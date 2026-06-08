// Web service called from Zendesk trigger called WA_RoutingTest
// Used for changing tickets that were "pending" after 24h from last user message and that became "open" 
// as soon as a new user message arrives

const axios=require('axios');
var btoa=require('btoa');

exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('OK')
    };

    try {
        console.log("CORPO: " + event.body);
        var body = JSON.parse(event.body);
/*        
        if(body.ticket_status !='Open' ) {
            console.log("Parametri non validi, esco");
            return response;
        }
*/
        const targetAuth = 'Basic ' + btoa(process.env.user + ':' + process.env.pwd);
        const targetPoint = 'https://deagostini.zendesk.com/api/v2/tickets/' + body.ticket_id;
        console.log('TARGET:'+targetPoint);
        const options= { headers: {
                'Authorization': targetAuth,
                'Content-Type': 'application/json; charset=utf-8'
        }};
        
/*----------------------------------------------------------------------
Get ticket metrics
------------------------------------------------------------------------*/                
   
        var rispo = await axios.get(targetPoint+'/metrics', options);
        console.log("OTTENGO " + JSON.stringify(rispo.data, null, 2));
        var metrica=rispo.data.ticket_metric;
/*        if(metrica.requester_updated_at<metrica.updated_at ) {
            console.log("Non commento utente, esco");
            return response;
        }
*/
        console.log("Commento utente in arrivo, devo modificare ticket") 
        rispo = await axios.get(targetPoint, options);                
        var myTicket=rispo.data.ticket;
        if(myTicket.status != "open") {
            console.log("Esco perche stato ticket=" + myTicket.status);
            return response;
        }
        var newTag=[];
        for(var item of myTicket.tags)
            if(item != 'message_post24') newTag.push(item);
        var fid=myTicket.custom_fields.find(x=>x.id==12304805366033);
        var myg=null;
        var mya=null;
        if(fid && fid.value) myg=fid.value;
        else {
            console.log('gruppo nullo');
            myg=360009955978;
        }
        fid=myTicket.custom_fields.find(x=>x.id==12304855679377);
        if(fid && fid.value) mya=fid.value;
        
//-------------------------------------------------------------------------------                
        const aggiorna=
        { "ticket":
            { 
//                "status":"open",
                "tags":newTag,
                "group_id":myg,
                "assignee_id":mya,
                "priority":"high"
            }
        };

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