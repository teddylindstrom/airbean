📄## Beskrivning
## AIRBEAN COFFE SHOP
Airbean är ett backend-API skolprojekt, där du ska kunna beställa kaffe med drönare.
Du ska kunna se olika kaffesorter, priser, användare och orderhistorik, vilket hanteras av API:et.

Systemet är byggt med:
- Node.js
- Express
- SQLite (better-sqlite3)

# 🚀 Kom igång (STEG FÖR STEG)

## 1. Installera dependencies (Öppna Ny Terminal)
```bash
npm install

##2. Starta servern
npm run dev

##3. Öppna i webbläsaren (Klicka på host eller Open Live)
http://localhost:3000

## Navigering
1. 


📁 Projektstruktur (VAD ÄR VAD)
project/
│
├── server.js                 # Startar servern
├── data/
│   ├── db.js                # Databas & tabeller
│   └── menu.json           # Meny-data
│
├── routes/
│   └── api.js              # Alla endpoints
│
├── controllers/
│   └── ordersController.js # Logik
│
├── middleware/
│   └── validateOrder.js    # Validering
(Bad en AI skriva projektstrukturen för att få det snyggt med "grenar".)


⚙️ ## FUNKTIONER

- Skapa användare
- Hämta meny
- Skapa order
- Validera order via middleware
- Spara data i databas
- Hantera orderstatus

🔄 ## Hur systemet fungerar
Skapa order (flöde)
1. Request skickas till /api/orders
2. Middleware kontrollerar:
- Att produkter finns
- Att pris är korrekt
3. Controller:
- Räknar totalpris
- Sparar order
- Sparar order_items
4. Response skickas tillbaka


🌐 ## API Dokumentation
Base URL
http://localhost:3000/api


📦## END POINTS

1. 🟢 GET /menu

  Hämtar alla produkter

  GET /api/menu
  Response:
  [
    {
      "id": 1,
      "title": "Espresso",
      "price": 39
    }
  ]

2. 🟢 GET /menu/:id

  Hämtar en specifik produkt

  GET /api/menu/1

3. 🟢 POST /users

  Skapar en användare

  POST /api/users
  Body:
  {
    "name": "Teddy",
    "email": "teddy@mail.com"
  }

4. 🟢 GET /users/:id

  Hämtar en användare

  GET /api/users/{id}

5. 🟢 POST /orders

  Skapar en order

  POST /api/orders
  Body:
  {
    "userId": "uuid",
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "price": 39
      }
    ]
  }
  Response:
  {
    "message": "Order skapad",
    "orderId": "uuid",
    "total": 78
  }

6. 🟢 GET /orders/:id

  Hämtar en order

  GET /api/orders/{id}

7. 🟢 GET /orders

  Hämtar alla ordrar

  GET /api/orders

🛟 ## Middleware

Middleware används för att stoppa fel innan de når databasen.

Den kontrollerar:
- Att ordern inte är tom
- Att produkter finns i databasen
- Att priset stämmer

🗄️ ## Databas
  Tabeller
  Users
  - id
  - name
  - email
  - createdAt
  Products
  - id
  - title
  - price
  Orders
  - id
  - user_id
  - total_price
  - status
  - eta_minutes
  - created_at
  order_items
  - order_id
  - product_id
  - quantity
  - price


🔌 ## WebSockets (framtida funktion)

WebSockets kan användas för att skapa realtidsuppdateringar i applikationen.

Mervärde för användaren:
Live-status på order (t.ex. "pending", "ready")
Uppdatering av leveranstid (ETA)
Notiser när order är klar
Möjlighet att visa "live tracking" av leverans

Detta förbättrar användarupplevelsen genom att:

Slippa uppdatera sidan manuellt
Få direkt feedback i realtid


🌳 ## Git-strategi & Kodgranskning
Ingen pushar direkt till main
All kod sker i egna branches
Pull Requests används alltid
Kod granskas innan merge

För att undvika att main går sönder:

Vi testar kod lokalt innan push
Vi gör code reviews
Vi kommunicerar via Discord


📋 ## Agilt arbetssätt
Vi använder Trello
Uppdaterar tasks dagligen
Har standups
Kommunicerar via Discord


🛟 ## Samarbete & Problemlösning
Sitt inte fast mer än 1 timme
Be om hjälp i Discord
Jobba tillsammans vid behov (parprogrammering)

Vid problem:

Tas upp tidigt
Fokus på lösning, inte person

Vid frånvaro:

Uppgifter omfördelas efter 2 dagar


✅ ## Definition av klar uppgift

En uppgift är klar när:

Koden fungerar
Testad i Postman
Pull Request godkänd


👥 ## Team
Namn	
Teddy 
Madeleine
Hosein
Flora
