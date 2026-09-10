import './PrivacyPolicy.css'

export default function PrivacyPolicy({ onBack }) {
  return (
    <main className="privacy-policy">
      <button type="button" onClick={onBack}>
        Takaisin etusivulle
      </button>

      <h1>Tietosuojakäytäntö</h1>

      <p>
        <strong>Viimeksi päivitetty:</strong> 8.9.2026
      </p>

      <h2>1. Rekisterinpitäjä</h2>
      <p>
        Rekisterinpitäjä on Riku Luostari.
      </p>
      <p>
        Yhteystiedot: riku.luostari@sähköposti.fi
      </p>

      <h2>2. Käsiteltävät tiedot</h2>
      <p>
        Palvelussa voidaan käsitellä käyttäjänimeä, salasanan hash-arvoa,
        käyttäjätilin tunnistetta sekä pelituloksia.
      </p>

      <h2>3. Tietojen käyttötarkoitus</h2>
      <p>
        Tietoja käytetään käyttäjätilin ylläpitämiseen, kirjautumiseen,
        pelitulosten tallentamiseen ja tulostaulukon näyttämiseen.
      </p>

      <h2>4. Tietojen säilyttäminen</h2>
      <p>
        Tietoja säilytetään vain niin kauan kuin se on tarpeellista palvelun
        tarjoamiseksi tai lakisääteisten velvoitteiden täyttämiseksi.
      </p>

      <h2>5. Käyttäjän oikeudet</h2>
      <p>
        Käyttäjällä on sovellettavan tietosuojalainsäädännön mukaisesti oikeus
        tarkastaa, korjata ja pyytää omien tietojensa poistamista.
      </p>

      <h2>6. Yhteydenotot</h2>
      <p>
        Tietosuojaa koskevissa asioissa voit ottaa yhteyttä osoitteeseen
        riku.luostari@sähköposti.fi.
      </p>
    </main>
  )
}