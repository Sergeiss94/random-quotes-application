// DOM Manipulation
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');


let apiQuotes = [];


// Add a loading spinner 
function displayLoadingIcon() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove a loading spinner 
function removeLoadingIcon() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    // Display a loading spinner until the quote loads completely
    displayLoadingIcon();

    // Select a random quote from apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // If there is no information about the author, add "Unknown"
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Change font size for long quotes
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
   
    quoteText.textContent = quote.text;

    // Remove a loading spinner after the quote has loaded
    removeLoadingIcon();
}

// Creating async function
async function getQuoteFromApi() {

    // Display a loading spinner until the quote loads completely
    displayLoadingIcon();
    
    // Get Quote from API
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log("error");
    }
}

// Adding Event Listener
newQuoteBtn.addEventListener('click', getQuoteFromApi);

// Call getQuoteFromApi function
getQuoteFromApi();
