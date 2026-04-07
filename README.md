## 🌳 Git-strategi & Kodgranskning - Grupp 8 Backend

- **Gyllene regeln:** **Ingen pushar direkt till `main`!** All kod görs i en egen branch.
- **Branch-namn:** Enkelt och tydligt, med varsin branch namn
- **Pull Requests (PR):** Flora kollar igenom koden, innan vi klickar på merge till main
- **Om det blir Git-kaos:** 

*Hur stöttar vi varandra och undviker att main går sönder?*
Vi ber om hjälp via vår kanal i Discord. 
- I första hand vår grupp 8 (Google och ChatGPT)
- I andra hand Klasskamrater
- I tredje hand Lärare

För att undvika att `main` går sönder arbetar vi alltid i egna branches och gör Pull Requests som granskas innan merge. Vi testar vår kod lokalt innan vi pushar och ser till att inget bryter befintlig funktionalitet. Vi hjälper varandra genom kodgranskning, tydlig kommunikation i Discord och genom att förklara lösningar för varandra.

---

## 📋 Agilt arbetssätt

- **Vår tavla:** [[Länk till Trello](https://trello.com/b/q18XWhTX)]

- **Uppdateringsrutin:** [T.ex. "Vi flyttar våra kort på tavlan varje morgon under vår standup"]

- **User stories & tekniska tasks:** [Vem bryter ner kraven? Kom ihåg att skapa kort för backend-uppgifter som "Sätt upp Express" och "Validering"] - Det gör vi tillsammans i grupp

- **När är en uppgift klar?** [T.ex. koden funkar, är testad manuellt i Postman, och PR är godkänd]

*(Fyll i: hur håller ni tavlan uppdaterad så alla vet vad som görs?)*
Man kommunicerar i Discord kanalen när något är påbörjat vs klart så att vi kan backtracka när saker är genomförda.

---

## 🛟 Problemlösning & Samarbete

- **Om någon fastnar tekniskt:** [T.ex. "Sitt inte fast ensam i mer än 1 timme. Be om parprogrammering i chatten (Discord)"]
Vi meddelar varandra i chatten för att få hjälp och komma förbi hinder.
- **Att dela på jobbet:** [Hur ser vi till att alla får testa att bygga endpoints och skriva databasanrop?]
Vi ger varandra möjligheten att ta del av projektets delar och att ta sig an en del. Vi gör vårt bästa i att fördela arbetsmängden jämställt.
- **Om någon blir sjuk eller saknas:** [Hur omfördelar vi uppgifter?]
Vi ger personen chans att själv hinna ikapp en dag, men efter två dagar så omfördelar vi det till oss andra och meddelar läraren.
- **Om samarbetet inte funkar:** [T.ex. ta upp det på standup direkt, eller ta in läraren som neutral part ifall det behövs]
Vi meddelar personen själv först, vid två tillfällen, om det inte genererar förändring så ber vi om råd från lärare om hur vi fortgår.

*(Fyll i: ni vill ha en trygg väg att lyfta problem tidigt, utan att det blir personligt.)*

---

## Signatur / bekräftelse

Vi har läst detta kontrakt och committerar oss till att följa det tills vi gemensamt uppdaterar det.

| Namn | Datum | Signatur / OK |
|------|-------|---------------|
|    Teddy Lindström |  25/3/2026     |    Teddy           |
|      |       |               |
|      |       |               |
|      |       |               |


POST http://localhost:3000/api/orders
Content-Type: application/json

{
  "userId": "f25d5f21-3037-4b23-a054-61d21f4a5469",
  "items": [
    {
      "productId": 999,
      "quantity": 2,
      "price": 39
    }
  ]
}

Middleware-förklaring

En middleware används för att validera ordern innan den sparas. Den kontrollerar att produkterna finns i databasen och att priset stämmer. Om något är fel stoppas requesten.