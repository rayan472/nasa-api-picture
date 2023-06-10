const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY'; // Replace with your actual API key
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultArray = [];
let favorites = {};

// Define imageContainer
const imageContainer = document.getElementById('imageContainer');

function updateDOM() {
    resultArray.forEach((result) => {
        // Card Container
        const card = document.createElement('div');
        card.classList.add('card');

        // Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';

        // Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture Of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        image.style.width = '100%'; // Set a fixed width
        image.style.height = '550px'; // Set a fixed height

        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;

        // Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = 'Add To favorites';
        saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);

        // Card Text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;

        // Footer Container
        const footer = document.createElement('p');
        footer.classList.add('text-muted');

        // Date
        const date = document.createElement('strong');
        date.textContent = result.date;

        // Copyright
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = copyrightResult;

        // Append elements
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);

        // Append card to imageContainer
        imageContainer.appendChild(card);
    });
}

// Get 10 Images from NASA API
async function getNasaPictures() {
    try {
        const response = await fetch(apiUrl);
        resultArray = await response.json();
        console.log(resultArray);
        updateDOM();
    } catch (error) {
        // Catch Error Here
        console.log('Error:', error);
    }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
    // Loop through Result Array to select the favorite
    resultArray.forEach((item) => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item;
            console.log(JSON.stringify(favorites));
            // Show Save Confirmation for 2 Seconds
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 2000);
            // Set Favorites in localStorage
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));


        }
    });
}

// On load
getNasaPictures();
