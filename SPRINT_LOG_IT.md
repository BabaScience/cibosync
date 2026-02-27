# CiboSync — Sprint Log: Lancio Revenue in 14 Giorni
### $0 → $10K MRR | Roma, Italia | Inizio: 27 febbraio 2026

> *«La velocità è la strategia. Spedire è il vantaggio competitivo. Il fatturato è l'unico metro che conta.»*
> — 14-Day Revenue Launch Playbook di Vitalii

**Sprint Owner:** Bamba Ba  
**Prodotto:** CiboSync — Agente AI su WhatsApp per Trasformare gli Sprechi in Fatturato  
**Obiettivo:** €10.000 MRR in 14 giorni  
**ICP:** Ristoranti indipendenti, area Roma / Lazio, 20-80 coperti  
**Stack:** Fastify · Next.js · Supabase · Claude API · WhatsApp Business API  

---

## LA MISSIONE IN UNA FRASE

> *Trasformare il problema degli sprechi alimentari da €1,5 miliardi l'anno — che i ristoratori italiani sono obbligati per legge ad affrontare — in una fonte di fatturato, interamente attraverso il WhatsApp che usano già ogni giorno.*

---

## IL PRODOTTO IN SINTESI

| Livello | Cosa fa CiboSync |
|---|---|
| **Prevede** | L'AI analizza POS + inventario + meteo + andamento giornaliero per prevedere cosa non verrà venduto stasera |
| **Monetizza** | Genera automaticamente offerte flash brandizzate, inviate tramite il numero WhatsApp Business del ristorante |
| **Monitora** | Un dashboard in tempo reale mostra al titolare quanto spreco è stato convertito in incassi |

**Perché non usare semplicemente Too Good To Go?**
TGTG trattiene il 30–40% di commissione, cancella l'identità del brand e vende sacchetti a sorpresa *dopo* che lo spreco è già avvenuto. CiboSync è white-label, proattivo e costruisce la *propria* lista clienti del ristorante.

**Il vento favorevole della normativa:**
La Direttiva UE Quadro Rifiuti Rivista (entrata in vigore ottobre 2025) impone una **riduzione vincolante del 30% degli sprechi alimentari entro il 2030** per la distribuzione e la ristorazione, con relative sanzioni. I ristoranti non cercano più qualcosa di opzionale — hanno bisogno di una traccia documentale per la compliance.

---

## PREZZI

| Piano | Prezzo | Include |
|---|---|---|
| **Starter** | €97/mese | 1 sede · 500 contatti WhatsApp · previsioni base |
| **Growth** | €197/mese | 1 sede · contatti illimitati · AI avanzata · messaggi brandizzati |
| **Scale** | €297/mese | Multi-sede · accesso API · personalità agente personalizzata · supporto prioritario |
| **Early Bird** | €47/mese | Primi 100 clienti, bloccato per 6 mesi |

**Il calcolo:** 100 ristoranti × €100 medio = **€10.000 MRR** ✓

---

## MAPPA DEL VANTAGGIO COMPETITIVO

| Concorrente | Modello | Gap che CiboSync colma |
|---|---|---|
| Too Good To Go | Marketplace, commissione 30–40%, sacchetti a sorpresa, reattivo | White-label · predittivo · il ristorante mantiene la lista |
| Winnow | Telecamere hardware sui cassonetti, costoso, solo grandi catering | Solo software · accessibile · pensato per i ristoranti indipendenti |
| Freshflow | Ottimizzazione inventario per supermercati, €6,5M raccolti | Specifico per ristoranti · consegna via WhatsApp · recupero fatturato |
| Planeat | Focus su kit pasti / mense aziendali | Mercato completamente diverso |
| Regusto | Piattaforma di donazioni | Non recupera fatturato |
| **CiboSync** | **AI prevede lo spreco → flash sale automatica su WhatsApp → fatturato recuperato** | **Nessun concorrente diretto in questo spazio preciso** ✓ |

---

---

# SPRINT LOG

---

## GIORNO 1 — ATTERRAGGIO E ALLINEAMENTO
### Venerdì, 27 febbraio 2026

> *Il Giorno 1 non riguarda la costruzione. Riguarda il dimostrare che il mondo vuole ciò che stai per costruire — prima di scrivere una sola riga di codice in produzione.*

---

**Avanzamento:**

- **Definita l'intuizione centrale:** Il problema non è lo spreco alimentare in sé — è che i ristoranti *perdono fatturato* che potrebbero recuperare. Riposizionare il prodotto da «strumento per ridurre gli sprechi» a «agente di recupero fatturato» sblocca tutto il potenziale del pitch. I titolari non comprano la colpa; comprano i soldi.
- **Validata la dimensione del mercato:** 161.000+ ristoranti in Italia, 262.561 unità totali nella ristorazione (IBISWorld/Euromonitor 2023). Gli sprechi alimentari nella ristorazione italiana costano al settore circa €13 miliardi l'anno a livello nazionale. Il ristorante indipendente medio perde €500–2.000 al mese in cibo invenduto — una cifra che i titolari *sentono* ogni singolo giorno.
- **Mappato il vento favorevole normativo:** La Direttiva UE Quadro Rifiuti Rivista è entrata in vigore nell'ottobre 2025. Target vincolante di riduzione del 30% degli sprechi entro il 2030 per il settore food service. Non è un rischio futuro — è già realtà. I ristoranti devono dimostrare compliance adesso. CiboSync diventa infrastruttura, non un lusso.
- **Identificati i punti di prova tecnologici:** SPAR Austria ha ridotto gli sprechi alimentari dal 4–6% all'1% con la previsione AI. Freshflow (Berlino) ha dimostrato che una riduzione degli sprechi superiore al 20% è raggiungibile per i retailer. La tecnologia funziona. La questione è confezionarla per i ristoranti italiani indipendenti a €47–197 al mese.
- **Confermato il canale di distribuzione:** La penetrazione di WhatsApp in Italia è quasi universale. Tasso di apertura del 98%. È già lo strumento con cui i titolari comunicano con i clienti abituali. Il canale elimina ogni barriera all'adozione — nessuna nuova app, nessun corso di formazione, nessuna frizione nell'onboarding.
- **Affinato l'ICP:** Ristoranti indipendenti di medie dimensioni a Roma/Lazio. 20–80 coperti. €15K–80K al mese di fatturato. Già con POS e qualche strumento digitale. A conduzione diretta dal proprietario. Menu ricchi di prodotti deperibili (pizza, pesce, pasta fresca). Perdono soldi visibili sugli sprechi ogni settimana.
- **Mappato il panorama competitivo:** Confermato che non esiste un concorrente diretto che faccia «AI prevede lo spreco + genera automaticamente flash sale su WhatsApp». Too Good To Go conta 20.000+ ristoranti partner italiani — dimostrando che la domanda è reale su larga scala — ma il loro modello lascia i ristoranti senza potere. Quel gap è il business.
- **Costruita la lista prospect su LinkedIn:** Identificati 100+ professionisti della ristorazione e del food nell'area di Roma. Target prioritari per i primi contatti: Simone Trombini (professionista del vino e della ristorazione, 20+ anni, Roma), Lorenzo Minerva (imprenditore della ristorazione, 15+ anni, operations multi-sede in Europa), Andrea Del Gatto (GM, Zuma Restaurants Roma). Lista pronta per l'outreach del Giorno 2.
- **Inizializzato lo scheletro del monorepo:** Directory `cibosync/` creata. Stack confermato: Fastify + Next.js + Supabase + Claude API + WhatsApp Business API. Sono gli strumenti di Bamba — zero curva di apprendimento, massima velocità di sviluppo.
- **Abbozzato il modello di pricing:** L'Early Bird a €47/mese abbassa l'attrito per il primo sì. Il Growth a €197/mese è il vero obiettivo di unit economics. 100 ristoranti porta a €10K MRR. I conti tornano.

---

**Intuizione Chiave:**

> **La vendita non è «riduci i tuoi sprechi». La vendita è «ho trovato €800 che hai lasciato sul tavolo il mese scorso. Vuoi che li trovi ogni mese?»**
>
> Ogni titolare di ristorante a Roma ha guardato la sua cucina alle 23 e ha visto cibo che finirà nel bidone. *Sa già* che quei soldi stanno sparendo. CiboSync non gli spiega un problema — gli restituisce il fatturato perso su un problema di cui già perde il sonno. È una conversazione completamente diversa. E inizia con un numero reale dai dati del suo POS, non da un pitch deck.

---

**Segnale di Fatturato:**

- **Indiretto #1 — Prova di mercato TGTG:** Too Good To Go conta 20.000+ partner italiani che pagano attivamente per risolvere questo problema, anche con un modello a commissione che erode i loro margini. La domanda è validata su scala.
- **Indiretto #2 — WhatsApp come comportamento già esistente:** I ristoranti usano già WhatsApp per mandare i piatti del giorno ai clienti abituali, manualmente. Stanno già facendo il lavoro di CiboSync a mano. Il prodotto automatizza un comportamento *già in atto* — il che significa che la proposta di valore non richiede di vendere nessun concetto nuovo.
- **Indiretto #3 — La pressione normativa come fattore scatenante:** Con la direttiva UE già attiva, i ristoranti che ignorano gli sprechi alimentari rischiano sanzioni. Gli strumenti di compliance che generano anche fatturato attingono sia al budget di difesa *che* a quello di crescita. Due trigger d'acquisto in simultanea.
- **Obiettivo per il Giorno 2:** Trovare un titolare di ristorante disposto a dire «sì, lo pagherei» in una conversazione di persona o via WhatsApp DM.

---

**Decisione di Pivot:**

**Nessun pivot. Si va avanti a testa bassa.**

La ricerca ha affinato la tesi invece di metterla in discussione. Il riposizionamento da «riduzione degli sprechi» → «recupero del fatturato» non è un pivot — è un'esecuzione più precisa della stessa intuizione. L'ICP è più definito oggi rispetto a stamattina. Il gap competitivo è confermato. Il canale (WhatsApp) è validato. Il vento normativo è reale e attivo.

L'unica cosa che potrebbe forzare un pivot è se l'outreach del Giorno 2 rivelasse che i titolari di ristorante non collegano «sprechi alimentari» a «soldi persi» — ma ogni conversazione con operatori esistente nella ricerca smentisce questo rischio.

**Una cosa da tenere d'occhio:** I tempi di approvazione di WhatsApp Business API. Se il processo di approvazione di Meta per i nuovi numeri richiede 2–4 settimane, la strategia demo per l'MVP potrebbe dover usare un numero sandbox pre-approvato o un account partner fin dal Giorno 1. Da verificare durante il setup tecnico del Giorno 2.

---

**La Scommessa di Domani:**

> **Scommettiamo che almeno un titolare di ristorante a Roma, contattato via WhatsApp o di persona, descriverà esattamente il problema che CiboSync risolve senza essere sollecitato — e chiederà «quanto costa?» prima che finiamo di spiegare.**

Il Giorno 2 è tutto outreach. 20+ messaggi personalizzati alla lista prospect di LinkedIn. Entrare di persona in almeno un ristorante a Roma — non per vendere, ma per ascoltare. L'obiettivo è una sola conversazione che confermi che il dolore è reale, urgente e monetizzabile. Un unico «quanto costa?» vale più di 10 ore di sviluppo.

Scommessa secondaria: Avere lo schema Supabase e il sandbox WhatsApp Business API operativi entro fine Giorno 2 — così qualsiasi conversazione positiva può trasformarsi in «vuoi vederlo dal vivo?» nel giro di 48 ore.

---

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | 8 |
| Prospect trovati | 100+ | 100+ |
| Outreach inviati | 0 (lancio Giorno 2) | 0 |
| Codebase | Monorepo inizializzato | ✓ Scheletro `cibosync/` creato |
| Elementi di ricerca di mercato validati | 10 | 10 |
| Modello di pricing finalizzato | ✓ | ✓ |
| ICP definito | ✓ | ✓ |
| Gap competitivo confermato | ✓ | ✓ |

---
---

## GIORNO 2 — PRIMO CONTATTO
### Sabato, 28 febbraio 2026

> *«Il modo più veloce per validare un mercato è chiedergli di pagarti.»*

---

**Avanzamento:**

_[ Da completare a fine Giorno 2 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 2 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 2 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 2 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 2 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Outreach inviati | 20+ | |
| Risposte ricevute | 5+ | |
| Visite di persona ai ristoranti | 1–2 | |
| Momenti «quanto costa?» | 1 | |
| Codebase | Schema Supabase + sandbox WA | |

---
---

## GIORNO 3 — DARE FORMA AL SEGNALE
### Domenica, 1 marzo 2026

---

**Avanzamento:**

_[ Da completare a fine Giorno 3 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 3 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 3 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 3 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 3 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Follow-up inviati | | |
| Lead interessati (tiepidi) | 3+ | |
| Lead interessati (caldi) | 1+ | |
| Codebase | Modello di previsione v0 | |

---
---

## GIORNO 4 — COSTRUIRE LO SCHELETRO
### Lunedì, 2 marzo 2026

---

**Avanzamento:**

_[ Da completare a fine Giorno 4 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 4 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 4 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 4 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 4 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Demo pronta? | Sì/No | |
| Candidati pilota confermati | 1–2 | |
| Codebase | Invio WhatsApp funzionante | |

---
---

## GIORNO 5 — PRIMA DEMO
### Martedì, 3 marzo 2026

---

**Avanzamento:**

_[ Da completare a fine Giorno 5 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 5 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 5 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 5 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 5 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Demo consegnate | 1+ | |
| Impegni verbali per il pilota | 1+ | |
| Codebase | Flusso demo end-to-end | |

---
---

## GIORNO 6 — CHIUDERE IL CICLO
### Mercoledì, 4 marzo 2026

---

**Avanzamento:**

_[ Da completare a fine Giorno 6 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 6 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 6 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 6 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 6 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Ristoranti pilota attivi | 1 | |
| Primo messaggio inviato dal pilota | Sì/No | |
| Codebase | Pipeline previsione → messaggio | |

---
---

## GIORNO 7 — CHECK DI METÀ PERCORSO
### Giovedì, 5 marzo 2026

> *A metà strada. Se non c'è ancora un segnale di fatturato, qualcosa non va nell'offerta, nel canale o nell'ICP. Correggere subito.*

---

**Avanzamento:**

_[ Da completare a fine Giorno 7 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 7 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 7 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 7 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 7 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Outreach totali fino a oggi | 50+ | |
| Ristoranti pilota attivi | 1–2 | |
| Fatturato recuperato per i pilota | €1 (proof of concept) | |
| Clienti paganti | Prima carta registrata? | |
| MRR | €0 → obiettivo €500 | |

---
---

## GIORNO 8 — PRIMO PAGAMENTO
### Venerdì, 6 marzo 2026

> *Il momento in cui uno sconosciuto ti dà dei soldi per qualcosa che hai costruito, l'azienda diventa reale.*

---

**Avanzamento:**

_[ Da completare a fine Giorno 8 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 8 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 8 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 8 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 8 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Clienti paganti | 1+ | |
| MRR | €47–197 | |
| Tasso di conversione pilota → pagante | | |
| Codebase | Stripe/pagamenti live | |

---
---

## GIORNO 9 — REPLICARE
### Sabato, 7 marzo 2026

---

**Avanzamento:**

_[ Da completare a fine Giorno 9 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 9 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 9 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 9 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 9 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Clienti paganti | 3–5 | |
| MRR | €200–500 | |
| Referral dai primi clienti | 1+ | |

---
---

## GIORNO 10 — RADDOPPIARE
### Domenica, 8 marzo 2026

---

**Avanzamento:**

_[ Da completare a fine Giorno 10 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 10 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 10 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 10 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 10 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Clienti paganti | 5–10 | |
| MRR | €500–1.000 | |
| Fatturato medio recuperato per ristorante pilota tramite CiboSync | | |

---
---

## GIORNO 11 — IL CUNEO
### Lunedì, 9 marzo 2026

---

**Avanzamento:**

_[ Da completare a fine Giorno 11 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 11 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 11 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 11 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 11 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Clienti paganti | 10–20 | |
| MRR | €1.000–2.500 | |
| Churn | 0 | |

---
---

## GIORNO 12 — PREMERE SULL'ACCELERATORE
### Martedì, 10 marzo 2026

---

**Avanzamento:**

_[ Da completare a fine Giorno 12 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 12 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 12 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 12 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 12 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Clienti paganti | 20–40 | |
| MRR | €2.500–5.000 | |
| Nuovi canali attivati | | |

---
---

## GIORNO 13 — COLMARE IL DIVARIO
### Mercoledì, 11 marzo 2026

---

**Avanzamento:**

_[ Da completare a fine Giorno 13 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 13 ]_

**Segnale di Fatturato:**

_[ Da completare a fine Giorno 13 ]_

**Decisione di Pivot:**

_[ Da completare a fine Giorno 13 ]_

**La Scommessa di Domani:**

_[ Da completare a fine Giorno 13 ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| Clienti paganti | 60–80 | |
| MRR | €5.000–8.000 | |
| Contratti firmati | | |

---
---

## GIORNO 14 — IL TRAGUARDO
### Giovedì, 12 marzo 2026

> *«€10.000 MRR non è un numero. È la prova che esiste un mercato reale, che sai costruire per quel mercato e che sai vendere ad esso. Tutto quello che viene dopo è scala.»*

---

**Avanzamento:**

_[ Da completare a fine Giorno 14 ]_

**Intuizione Chiave:**

_[ Da completare a fine Giorno 14 ]_

**Segnale di Fatturato:**

_[ Snapshot finale MRR ]_

**Decisione di Pivot:**

_[ Retrospettiva dello sprint: cosa abbiamo imparato, cosa faremmo diversamente, cosa viene dopo ]_

**La Scommessa di Domani:**

_[ Il piano a 30 giorni — dove va CiboSync da €10K MRR in poi? ]_

**Metriche:**

| Metrica | Obiettivo | Effettivo |
|---|---|---|
| Ore lavorate | 8 | |
| **Clienti paganti totali** | **100** | |
| **MRR** | **€10.000** | |
| Tasso di churn | <5% | |
| Valore medio contratto | €100/mese | |
| CAC | | |
| LTV (proiettato 12 mesi) | | |
| NPS dalla prima coorte | | |

---
---

## SCORECARD CORRENTE

| Giorno | Data | MRR | Clienti | Risultato Chiave | Stato |
|---|---|---|---|---|---|
| 1 | 27 feb | €0 | 0 | Mercato validato, ICP definito, monorepo live | ✅ Completato |
| 2 | 28 feb | | | | 🔲 In attesa |
| 3 | 1 mar | | | | 🔲 In attesa |
| 4 | 2 mar | | | | 🔲 In attesa |
| 5 | 3 mar | | | | 🔲 In attesa |
| 6 | 4 mar | | | | 🔲 In attesa |
| 7 | 5 mar | | | | 🔲 In attesa |
| 8 | 6 mar | | | | 🔲 In attesa |
| 9 | 7 mar | | | | 🔲 In attesa |
| 10 | 8 mar | | | | 🔲 In attesa |
| 11 | 9 mar | | | | 🔲 In attesa |
| 12 | 10 mar | | | | 🔲 In attesa |
| 13 | 11 mar | | | | 🔲 In attesa |
| 14 | 12 mar | | | **€10.000 MRR** | 🔲 In attesa |

---

## RIFERIMENTO: DATI DI MERCATO

| Dato | Fonte | Rilevanza |
|---|---|---|
| 161.000+ ristoranti in Italia | IBISWorld/Euromonitor 2023 | Ancora del TAM |
| 262.561 unità totali nella ristorazione | IBISWorld/Euromonitor 2023 | Ancora del TAM |
| €13 miliardi/anno di sprechi alimentari a livello nazionale | Stima di settore | Dimensione del problema |
| €1,5–2/kg costo smaltimento rifiuti | Dati di settore | Dolore per unità |
| €500–2.000/mese persi per ristorante | Stima dai dati sui costi | Ancora del dolore dell'ICP |
| Direttiva UE RWFD entrata in vigore ott 2025 | Gazzetta Ufficiale EU | Vento normativo favorevole |
| Riduzione sprechi del 30% vincolante entro 2030 | Direttiva UE RWFD Art. 9a | Fattore di compliance forzante |
| 86% degli operatori ristorativi a proprio agio con l'AI | Sondaggio Toast 2025 | Propensione all'adozione |
| Tasso di apertura WhatsApp 98% | Benchmark settore messaging | Dominanza del canale |
| Penetrazione WhatsApp Italia | Quasi universale | Moat distributivo |
| SPAR Austria: sprechi dal 4–6% all'1% con AI | Case study SPAR | Proof point tecnologico |
| Freshflow: riduzione sprechi >20% | Freshflow (seed €6,5M) | Validazione tecnologica |
| TGTG: 20.000+ partner italiani | Too Good To Go | Proof of demand |
| Delivery Italia: CAGR 11,62% fino al 2031 | Report di mercato | Crescita del settore |
| 75,38% della ristorazione italiana = indipendenti | Dati di settore | Dimensione dell'ICP |

---

## RIFERIMENTO: PROFILO ICP

**Nome:** Marco (profilo composito fittizio)  
**Ruolo:** Titolare-operatore, trattoria a Roma  
**Fatturato:** €25.000–45.000 al mese  
**Costo sprechi:** €700–1.200 al mese in cibo invenduto  
**Stack tecnologico:** Cassa in Cloud POS, Google My Business, WhatsApp personale  
**Dolore:** Vede il pesce fresco e la pasta finire nel bidone ogni giovedì. A volte manda un messaggio manuale a 30 clienti abituali quando ha troppo stock — con risultati altalenanti.  
**Paura:** Non può permettersi di assumere qualcuno per gestirlo. Non capisce le tecnologie complesse. Non vuole un altro abbonamento.  
**Trigger d'acquisto:** «Mostrami quanti soldi hai trovato per me il mese scorso.»  
**Canale migliore:** WhatsApp DM (è sempre connesso) o di persona durante le ore tranquille (14:30–17:00)  

---

## RIFERIMENTO: IL PITCH — VERSIONE IN UN RESPIRO

> *«La tua cucina perde €800 al mese in cibo che non vendi. Ho costruito un'AI che prevede ogni giorno cosa resterà nel frigo a fine serata, e manda automaticamente un'offerta flash dal tuo numero WhatsApp ai tuoi clienti abituali — così recuperi quei soldi invece di buttare il cibo. Costa €47 al mese per iniziare. Vuoi vedere i numeri della settimana scorsa per un ristorante come il tuo?»*

---

*Log curato da Bamba Ba · Sprint CiboSync · Roma, Italia*  
*Playbook: 14-Day Revenue Launch di Vitalii*  
*Avvio: 27 febbraio 2026*
