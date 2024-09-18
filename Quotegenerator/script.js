let apiQuotes = [];
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        apiQuotes = await response.json();
        console.log(apiQuotes); // Prüfen, ob die Zitate korrekt geladen wurden
        newQuote();
    } catch (error) {
        console.error("Fehler beim Abrufen der Zitate:", error);
        document.getElementById('quote').textContent = 'Fehler beim Abrufen der Zitate';
        document.getElementById('author').textContent = '';
    }
}
 
function newQuote() {
    if (apiQuotes.length === 0) {
        console.error("Keine Zitate verfügbar");
        document.getElementById('quote').textContent = 'Keine Zitate verfügbar';
        document.getElementById('author').textContent = '';
        return;
    }
   
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);  // Protokolliert das Zitat in der Konsole
    document.getElementById('quote').textContent = quote.text;
    document.getElementById('author').textContent = quote.author ? quote.author : 'Unbekannt';
}
 
document.getElementById('new-quote').addEventListener('click', newQuote);
 
getQuotes();