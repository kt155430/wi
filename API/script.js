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
        GBP: 0.85,  // 1€ = 0.85 GBP
        USD: 1.10,  // 1€ = 1.10 USD
        JPY: 150.60 // 1€ = 150.60 JPY
    };

    // Umrechnen des Betrags
    let result = amount * rates[currency];
    result = result.toFixed(2); // Auf zwei Dezimalstellen runden

    // Ausgabe des Ergebnisses
    document.getElementById('result').innerText = `${amount} € sind ${result} ${currency}.`;
});