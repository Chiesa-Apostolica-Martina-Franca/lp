# Chiesa Apostolica di Martina Franca

Sito statico della comunità, pubblicato su **GitHub Pages**:
https://chiesa-apostolica-martina-franca.github.io/lp/

## Sviluppo

Richiede Node.js 20 o successivo. Non richiede dipendenze npm, database o server applicativi.

```sh
npm run build
npm run check
npm run preview
```

Aprire http://127.0.0.1:4173. `dist/` contiene il sito generato e non è versionata.

## Modifica dei contenuti

- `scripts/build.mjs`: testi, contatti, orari, coordinate bancarie, metadati e pagine.
- `assets/style.css`: colori, impaginazione e adattamento ai dispositivi.
- `assets/site.js`: menu mobile, copia dell’IBAN e URL di ritorno del modulo.
- `assets/images/`: logo ufficiale e fotografie esportate dai materiali Canva forniti. `comunita-privacy.png` contiene la foto con i volti dei bambini sfocati; l’originale è conservato soltanto in `work/originals/`, escluso da Git e dalla pubblicazione.
- `assets/documents/le-nostre-attivita.pdf`: presentazione ufficiale delle attività esportata da Canva.
- `assets/calendars/`: appuntamenti settimanali con fuso Europe/Rome, comprensivo dell’ora legale.

Gli articoli di fede e la storia sono riformulazioni sintetiche delle pagine nazionali indicate, con collegamento alla versione integrale. Il percorso storico riguarda il movimento nazionale, non attribuisce date di fondazione alla comunità locale.

## Pubblicazione

Ogni push su `main` esegue `.github/workflows/pages.yml`: genera il sito, controlla i riferimenti locali e pubblica `dist/` su GitHub Pages. In Settings → Pages la fonte deve essere **GitHub Actions**. Non impostare un dominio personalizzato senza aggiornare `origin` in `scripts/build.mjs`, i riferimenti `/lp/` della pagina 404 e l’URL riportato qui.

## Email senza un server della chiesa

Il modulo di `/contatti/` invia tramite [FormSubmit](https://formsubmit.co/) a `martinasegreteria@chiesapostolica.it`. Il sito non contiene credenziali o chiavi API. FormSubmit gestisce invio e protezione antispam; la risposta del visitatore arriva come indirizzo Reply-To.

**Attivazione necessaria:** il primo invio reale genera un messaggio di conferma all’indirizzo della segreteria. Chi gestisce la casella deve aprirlo e confermare. Fino a quella conferma la ricezione del modulo non è verificata. Dopo l’attivazione, inviare un messaggio di prova dal sito pubblico e verificarne la ricezione e la funzione Rispondi. Se l’indirizzo è già attivato, la conferma potrebbe non essere richiesta. Nessun messaggio di prova è stato spedito durante lo sviluppo.

Il collegamento `mailto:` e i numeri di telefono sono sempre disponibili come alternativa. Per sostituire il provider, aggiornare il form, l’informativa privacy e questa documentazione. La gestione e la conservazione delle email ricevute restano sotto la responsabilità della comunità.

## Materiali e font

Materiali Canva di riferimento:

- Attività: https://www.canva.com/design/DAHX0Wq24LI/W5rK8rYJAYtnwysZxCOTsA/edit
- Coordinate per offerte: https://www.canva.com/design/DAG5sC5yWvk/40gQRmVB2Ib0d8pCXfRz7A/edit
- Foto per la hero: https://www.canva.com/design/DAGXIh396N0/BVnQ-1kZpu3yCRhoE1bVLQ/edit

Font Poppins e DM Sans ospitati localmente; licenze SIL Open Font License incluse in `assets/fonts/`. Nessuna richiesta automatica a Google Fonts, social o mappe. Nessuna analisi del traffico e nessun cookie impostato dal codice del sito.

Ritocco della foto: strumento integrato ImageGen. Brief: “Sfocare leggermente tutti i volti dei bambini, preservando adulti, composizione e sfondo”. La versione ritoccata è utilizzata nella hero, nella sezione comunità e nell’anteprima social.
