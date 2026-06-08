File sorgenti per il sito Zendesk di De Agostini

Nel repository si trovano i seguenti file:

- wa_sendpost24h.js
Si tratta di un servizio web utilizzato dall'automazione wa_sendpost24h del sito Zendesk di De Agostini.
per gestire messaggi whatsapp. Zendesk ha bisogno che i servizi web siano accessibili via internet con protocollo https, pertanto
al momento il servizio è scritto in nodejs ed eseguito come funzione lambda all'interno di una sottoscrizione AWS di Aubay. Il servizio può essere eventualmente trasferito su richiesta all'interno di una sottoscrizione AWS di DeA.

-wa_routing
Si tratta di un servizio web richiamato dal trigger Zendesk "WA_RoutingTest" del sito Zendesk di De Agostini.
Anche questo servizio viene usato per gestire messaggi whatsapp, in particolare per cambiare i messaggi ancora 'pending' dopo 24 ore dall'ultimo messaggio utente. Così come il precedente, il servizio è scritto in nodejs, eseguito come funzione lambda all'interno di una sottoscrizione AWS di Aubay e può essere eventualmente trasferito su richiesta all'interno di una sottoscrizione AWS di DeA.

- package.json
Si tratta di un file di configurazione per i due servizi precedenti.

- "gigya userinfo".zip
Questo zip contiene sorgenti e configurazione dell'app Zendesk che serve a visualizzare i dati relativi agli utenti, ai loro ordini e shipping info. Si tratta di una app scritta in react js che può essere deployata sul sito zendesk di De Agostini.
 