# Portfolio ja Päivän sana -peli

Full-stack-portfolio, joka sisältää henkilökohtaisen esittelyn, projektit, sertifikaatit sekä kirjautumista vaativan suomalaisen Wordle-tyyppisen Päivän sana -pelin.

## Ominaisuudet

- Portfolio ja projektien esittely
- CV:n ja sertifikaattien näyttäminen
- Päivän sana -peli
- Viiden kirjaimen arvauspeli, jossa on enintään kuusi yritystä
- Päivittäinen sana, joka valitaan sanastosta ja tallennetaan päivämäärän perusteella
- Käyttäjän rekisteröinti ja kirjautuminen
- JWT-pohjainen autentikointi
- Pelitulosten tallentaminen
- Henkilökohtaiset pelitilastot
- Pelaajien leaderboard
- Tumma ja vaalea teema
- Tietosuojakäytännön hyväksyminen rekisteröityessä
- Admin-paneeli
  - käyttäjien tarkastelu ja poistaminen
  - admin-oikeuksien muuttaminen
  - pelitulosten tarkastelu ja poistaminen
  - järjestelmän tilastot
  - pelissä käytettävien sanojen lisääminen, aktivointi ja poistaminen

## Teknologiat

### Frontend

- React 18
- Vite
- Axios
- React Modal
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- CORS
- dotenv



## Vaatimukset

- Node.js 16 tai uudempi
- npm
- MongoDB paikallisesti tai MongoDB Atlas -palveluna

## Asennus

### 1. Asenna backendin riippuvuudet

cd server
npm install


Luo `server/.env`-tiedosto ja lisää siihen tarvittavat ympäristömuuttujat:

MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
JWT_SECRET=vaihda_tama_salaiseksi_avaimeksi
NODE_ENV=development


### 2. Asenna frontendin riippuvuudet

cd ../client
npm install


Frontend käyttää Vite-kehityspalvelimen proxy-asetusta, joka välittää `/api`-pyynnöt backendille osoitteeseen `http://localhost:5000`.

## Sovelluksen käynnistäminen

Käynnistä backend ensimmäisessä terminaalissa:

cd server
npm run dev


Backend käynnistyy osoitteeseen:

http://localhost:5000


Käynnistä frontend toisessa terminaalissa:

cd client
npm run dev


Frontend avautuu osoitteeseen:

http://localhost:3000


## API-reitit

### Autentikointi

| Menetelmä | Reitti | Kuvaus |
|---|---|---|
| POST | `/api/auth/register` | Luo uuden käyttäjän |
| POST | `/api/auth/login` | Kirjaa käyttäjän sisään |
| POST | `/api/auth/admin-login` | Admin-kirjautuminen |
| GET | `/api/auth/me` | Hakee kirjautuneen käyttäjän tiedot |
| DELETE | `/api/auth/delete-account` | Poistaa oman käyttäjätilin |

### Peli

| Menetelmä | Reitti | Kuvaus |
|---|---|---|
| GET | `/api/game/word` | Hakee päivän sanan |
| POST | `/api/game/submit` | Tallentaa pelituloksen |
| GET | `/api/game/stats` | Hakee käyttäjän pelitilastot |
| GET | `/api/game/leaderboard` | Hakee leaderboardin |

### Admin

Admin-reitit vaativat kirjautuneen admin-käyttäjän.

| Menetelmä | Reitti | Kuvaus |
|---|---|---|
| GET | `/api/admin/users` | Hakee kaikki käyttäjät |
| PATCH | `/api/admin/users/:id` | Muokkaa käyttäjää tai admin-oikeuksia |
| DELETE | `/api/admin/users/:id` | Poistaa käyttäjän |
| GET | `/api/admin/game-scores` | Hakee kaikki pelitulokset |
| DELETE | `/api/admin/game-scores/:id` | Poistaa pelituloksen |
| GET | `/api/admin/stats` | Hakee järjestelmän tilastot |
| GET | `/api/admin/words` | Hakee pelin sanaston |
| POST | `/api/admin/words` | Lisää uuden sanan |
| PATCH | `/api/admin/words/:id` | Aktivoi tai poistaa sanan käytöstä |
| DELETE | `/api/admin/words/:id` | Poistaa sanan |

### Terveystarkistus


GET /api/health

Palauttaa tiedon siitä, että backend-palvelin on käynnissä.

## Komennot

### Frontend


npm run dev

Käynnistää Vite-kehityspalvelimen.


npm run build

Luo tuotantoversion.


npm run preview

Esikatselee tuotantoversion paikallisesti.


npm run lint

Suorittaa ESLint-tarkistuksen.

### Backend


npm run dev

Käynnistää backendin Nodemonin avulla.


npm start

Käynnistää backendin ilman Nodemonia.

## Tietoturva

- Salasanat tallennetaan tietokantaan hashattuina bcryptjs-kirjaston avulla.
- Kirjautuminen perustuu JWT-tokeneihin.
- JWT-token tallennetaan selaimen local storageen.
- Admin-reitit tarkistavat sekä kirjautumisen että admin-oikeuden.
- `.env`-tiedostoja ei pidä lisätä versionhallintaan.

## Nykyiset rajoitukset

- Profiilisivu on vielä keskeneräinen.
- Sovelluksessa ei ole sähköpostivahvistusta.
- Peli vaatii kirjautumisen ennen pelaamista.
- Pelin sanaston hallinta tapahtuu admin-paneelin kautta.

## Lisenssi

ISC
