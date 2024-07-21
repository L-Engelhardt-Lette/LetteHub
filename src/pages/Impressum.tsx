import React from "react";

const Impressum: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 id="title" className="text-3xl font-bold mb-4">
        Impressum
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
        <p>
          LetteHub
          <br />
          Muster Adresse
          <br />
          12345 Berlin
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Kontakt</h2>
        <p>
          Telefon: Muster Telefonnummer
          <br />
          E-Mail: Muster E-Mail-Adresse
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Aufsichtsbehörde</h2>
        <p>Zuständige Aufsichtsbehörde: Muster Aufsichtsbehörde</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
          Muster
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </h2>
        <p>
          Muster Verantwortlicher
          <br />
          Muster Adresse
          <br />
          12345 Berlin
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Haftungsausschluss</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
            oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
            jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
            Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
            nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Speicherung von Daten</h3>
          <p>
            Wir speichern und verarbeiten personenbezogene Daten nur, soweit
            dies zur Bereitstellung unserer Dienste erforderlich ist.
            Personenbezogene Daten werden nur dann an Dritte weitergegeben, wenn
            dies gesetzlich vorgeschrieben ist oder wenn Sie zuvor ausdrücklich
            eingewilligt haben. Die Verarbeitung und Speicherung von Daten
            erfolgt gemäß den geltenden Datenschutzbestimmungen. Bei Fragen zur
            Verarbeitung Ihrer personenbezogenen Daten oder zur Ausübung Ihrer
            Rechte wenden Sie sich bitte an uns.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Impressum;
