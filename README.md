
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
1. http://localhost:3000
2. http://localhost:3000/menu
3. http://localhost:3000/order
4. http://localhost:3000/o.s.v...


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

## 1. GET /menu - hämtar alla produkter
      GET /api/menu
      Response:
  [
    {
      "id": 1,
      "title": "Espresso",
      "price": 39
    }
  ]

## 2. POST /user - skapar en användare
      POST /api/user
  Body:
  {
    "name": "Teddy",
    "email": "teddy@mail.com"
  }

## 3. GET /user/:id - hämtar en användare
      GET /api/user/:id
      Response:
{
    "name": "Teddy",
    "email": "teddy@mail.com"
  }

## 4. PUT /user/:id - uppdaterar en användares uppgifter
      PUT /api/user/:id
      Body:
{
    "name": "Madde",
    "email": "madde@example.com"
}

      Response:
    {
    "id": "3e6a29dd-9998-4d6e-9852-0bf3bc5ad18a",
    "name": "Madde",
    "email": "madde@example.com",
    "createdAt": "2026-04-09T17:48:31.128Z"
}

## 5. DELETE /user/:id - tar bort en användare
      DELETE /api/user/:id
      Response: 204 no content

## 6. POST /orders -  skapar en order
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
    "orderId": "13b0cb3e-16c7-427b-8744-e2260ad69aa9",
    "orderNumber": 423738,
    "totalPrice": 78,
    "etaMinutes": 14,
    "status": "pending",
    "createdAt": "2026-04-09T18:45:02.211Z",
    "items": [
        {
            "productId": 1,
            "quantity": 2,
            "price": 39
        }
    ]
}

## 7. GET /orders/:userId -  hämtar en användares orderhistorik
      GET /api/orders/:userId
      Responde: 200 OK
[
    {
        "id": "e723c120-c841-4045-a70f-2c6e63af6428",
        "user_id": "3e6a29dd-9998-4d6e-9852-0bf3bc5ad18a",
        "total_price": 78,
        "status": "pending",
        "eta_minutes": 14,
        "created_at": "2026-04-09T17:48:46.221Z",
        "items": [
            {
                "id": 1,
                "order_id": "e723c120-c841-4045-a70f-2c6e63af6428",
                "product_id": "1.0",
                "quantity": 2,
                "price": 39
            }
        ]
    }
]

## 8. GET /orders/userId - status för en användares order historik
      GET /api/orders/userId
      Response:
[
    {
        "id": "e723c120-c841-4045-a70f-2c6e63af6428",
        "user_id": "3e6a29dd-9998-4d6e-9852-0bf3bc5ad18a",
        "total_price": 78,
        "status": "pending",
        "eta_minutes": 14,
        "created_at": "2026-04-09T17:48:46.221Z",
        "items": [
            {
                "id": 1,
                "order_id": "e723c120-c841-4045-a70f-2c6e63af6428",
                "product_id": "1.0",
                "quantity": 2,
                "price": 39
            }
        ]
    }
]
 


      

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


## 👥 Team
Namn	
Teddy 
Madeleine
Hosein
Flora
