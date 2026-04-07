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

Vi håller tavlan uppdaterad genom att direkt flytta kort när vi börjar eller avslutar en uppgift. Under våra standups går vi igenom tavlan tillsammans så att alla har koll på vad som pågår och vad som är klart.

---

## 🛟 Problemlösning & Samarbete

Vi lyfter problem tidigt genom att ta upp dem i Discord eller under standup utan att peka ut någon person. Fokus ligger på problemet och lösningen, inte individen. På så sätt skapar vi en trygg miljö där alla vågar be om hjälp.

---

## Signatur / bekräftelse

Vi har läst detta kontrakt och committerar oss till att följa det tills vi gemensamt uppdaterar det.

| Namn | Datum | Signatur / OK |
|------|-------|---------------|
Teddy  7/4-2026 OK
Madeleine  7/4-2026 OK
Flora 7/4-2026 OK
Hosein 7/4-2026


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