document.getElementById('convert-btn').addEventListener('click', function() {
    // Hole den eingegebenen Betrag und die gewählte Währung
    let amount = document.getElementById('amount').value;
    let currency = document.getElementById('currency').value;

    // Prüfe, ob ein Betrag eingegeben wurde
    if (amount === "" || isNaN(amount)) {
        document.getElementById('result').innerText = "Bitte gib einen gültigen Betrag ein.";
        return;
    }

    // Umrechnungskurse (Beispiele, sollten aktualisiert werden)
    const rates = {
        GBP: 0.85,   // 1€ = 0.85 GBP
        USD: 1.10,   // 1€ = 1.10 USD
        JPY: 150.60, // 1€ = 150.60 JPY
        DKK: 7.44,   // 1€ = 7.44 DKK
        NOK: 11.30,  // 1€ = 11.30 NOK
        SEK: 11.00,  // 1€ = 11.00 SEK
        CHF: 0.96,   // 1€ = 0.96 CHF
        CAD: 1.46,   // 1€ = 1.46 CAD
        AUD: 1.62,   // 1€ = 1.62 AUD
        NZD: 1.78,   // 1€ = 1.78 NZD
        AED: 4.04,   // 1€ = 4.04 AED
        INR: 88.50,  // 1€ = 88.50 INR
        ISK: 146.50, // 1€ = 146.50 ISK
        RUB: 101.50, // 1€ = 101.50 RUB
        UAH: 40.50   // 1€ = 40.50 UAH
    };

    // Umrechnen des Betrags
    let result = amount * rates[currency];
    result = result.toFixed(2); // Auf zwei Dezimalstellen runden

    // Formatieren der Zahlen mit Tausendertrennzeichen
    const formattedResult = Number(result).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Ausgabe des Ergebnisses
    document.getElementById('result').innerText = `${amount} € sind ${formattedResult} ${currency}.`;
});

