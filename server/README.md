# 🔥 Backend API - Steam Shame Recap

## Klasör Yapısı

```
server/
├── index.js                          # Ana server ve routes
├── controllers/
│   └── shameController.js           # Shame endpoint logic
├── services/
│   └── steamService.js              # Steam API calls
├── utils/
│   └── calculations.js              # Para dönüşümleri
├── .env                             # Environment variables (GİZLİ!)
├── .env.example                     # .env template
└── package.json
```

## 🚀 Kurulum ve Çalıştırma

### 1. Steam API Key Al

1. [Steam API Key sayfasına](https://steamcommunity.com/dev/apikey) git
2. Domain Name alanına `localhost` yaz
3. API Key'i kopyala

### 2. .env Dosyasını Düzenle

`server/.env` dosyasını aç ve Steam API Key'ini ekle:

```env
PORT=3001
STEAM_API_KEY=BURAYA_KENDI_KEYINI_KOY
```

### 3. Serveri Başlat

```bash
# Root klasörden:
npm run dev:server

# veya server klasöründen:
npm run dev
```

Server **http://localhost:3001** adresinde çalışacak.

## 📡 API Endpoints

### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "Server çalışıyor! 🚀"
}
```

### 🔥 Shame Endpoint (ANA ENDPOINT)

```http
GET /api/shame/:steamId
```

**Parametreler:**

- `steamId` (required): 64-bit Steam ID (17 haneli)

**Örnek Kullanım:**

```bash
curl http://localhost:3001/api/shame/76561198000000000
```

**Response (Başarılı):**

```json
{
  "user": {
    "name": "PlayerName",
    "avatar": "https://...",
    "profileUrl": "https://steamcommunity.com/..."
  },
  "stats": {
    "totalGames": 150,
    "unplayedGames": 45,
    "wastedMoneyTRY": 23625,
    "wastedHours": 0
  },
  "conversions": {
    "chickenDoner": 236,
    "spotifyMonths": 393,
    "fuelLitres": 472
  },
  "gamesList": [
    {
      "name": "Game Name",
      "appid": 12345,
      "playtimeMinutes": 30,
      "playtimeHours": 0.5,
      "imgIcon": "https://media.steampowered.com/..."
    }
  ],
  "roastMessage": "45 oyunu çöpe atmışsın. 23625 TL ile hayaller kurarken sen Steam'e para yatırmışsın. Bravo! 🤦‍♂️🔥"
}
```

**Hata Durumları:**

❌ **Geçersiz Steam ID:**

```json
{
  "error": "Geçersiz Steam ID! 17 haneli Steam ID64 formatında olmalı.",
  "example": "76561198000000000"
}
```

❌ **Profil Gizli/Kullanıcı Bulunamadı:**

```json
{
  "error": "Steam profili özel. Lütfen profilini herkese açık yap!"
}
```

## 🧮 Hesaplama Mantığı

### Oynanmamış Oyun Filtresi

- **Eşik:** 120 dakika (2 saat)
- `playtime_forever < 120` olan oyunlar "oynanmamış" sayılır

### Fiyat Tahmini

Steam API fiyat bilgisi vermediği için **sabit tahmin** kullanılır:

- Oyun başına: **15 USD** × **35 TL/USD** = **525 TL**
- Toplam: `oynanmamış_sayısı × 525 TL`

### Para Dönüşümleri (Birim Fiyatlar)

- 🍖 **Tavuk Döner:** 100 TL
- 🎵 **Spotify Premium:** 60 TL/ay
- ⛽ **Benzin:** 50 TL/litre

## 🛠️ Modüller

### `steamService.js`

Steam Web API ile konuşur:

- `getOwnedGames(steamId)` - Kullanıcının oyunlarını çeker
- `getPlayerSummary(steamId)` - Profil bilgilerini çeker

### `calculations.js`

Hesaplama ve dönüşüm fonksiyonları:

- `filterUnplayedGames()` - 120 dakika altı filtreleme
- `calculateWastedMoney()` - Toplam ziyan hesabı
- `convertToProducts()` - Döner/Spotify/Benzin dönüşümü
- `formatGamesList()` - Frontend için oyun listesi formatı

### `shameController.js`

Ana endpoint logic:

- Steam ID validasyonu
- Paralel API çağrıları
- Response oluşturma
- Roast mesajı üretme

---

**Backend hazır! Frontend'ten bu endpoint'e istek atabilirsin.** 🚀
