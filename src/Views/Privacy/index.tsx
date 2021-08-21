import React from 'react';
import { Helmet } from 'react-helmet';

const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Junat | Tietosuojakäytäntö</title>
      </Helmet>
      <h2>Tietosuojakäytäntö</h2>
      <p>
        trains.daveflanagan.ovh vierailijoiden yksityisyyttä on erittäin tärkeää. Tässä tietosuojakäytännössä kuvataan vastaanotettujen ja kerättyjen henkilötietojen tyypit ja miten niitä käytetään.<br />
        Tätä tietosuojakäytäntöä tarkistetaan ja tarkistetaan ajoittain. Haluatko tarkistaa sen säännöllisesti. Tämän sivuston käyttö kaikissa muodoissa muodostaa tämän tietosuojakäytännön hyväksynnän.
      </p>
      <h4 className="mt-4">1. Lokitiedostot</h4>
      <p>
        Käytämme lokitiedostoja, kuten monia muita sivustoja. Lokitiedostojen tiedot sisältävät:<br />
        * Internet-protokollan osoitteet (IP)<br />
        * Selaimen tyypit<br />
        * Internet-palveluntarjoaja (ISP)<br />
        * Päivämäärä ja aikaleima<br />
        * Viittaavat ja poistuvat sivut<br />
        * Napsautusten määrä<br />
        Kaikki nämä tiedot eivät liity mihinkään henkilökohtaisiin tunnistettaviin tietoihin.<br />
      </p>
      <h4 className="mt-4">2. Keksit</h4>
      <p className="mb-0">
        Käytämme evästeitä tietojen tallentamiseksi kävijän mieltymyksistä ja tallentaaksesi käyttäjäkohtaisia tietoja vierailuista ja sivujen käyttäjien näkymistä, jotta saataisiin mukautettu kokemus. Kolmannen osapuolen mainostajien osalta Junat.Appilla ei ole pääsyä tai valvontaa näistä evästeistä. Sinun tulee tarkistaa kunkin kolmannen osapuolen mainospalvelimien tietosuojakäytännöt, jotta saat lisätietoja niiden käytännöistä ja siitä, miten ne poistetaan käytöstä.<br />
        Jos haluat poistaa evästeet käytöstä, voit tehdä sen selaimen asetusten avulla. Ohjeet ja muut evästeen hallintaan liittyvät ohjeet löytyvät verkkoselaimista.
      </p>
    </>
  );
};

export default Privacy;
