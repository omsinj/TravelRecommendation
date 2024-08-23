document.getElementById('search-button').addEventListener('click', fetchRecommendations);

function fetchRecommendations() {
    const keyword = document.getElementById('search-input').value.toLowerCase();

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const results = data.filter(item => item.keywords.includes(keyword));
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        resultDiv.innerHTML = `
            <h2>${result.name}</h2>
            <img src="${result.imageUrl}" alt="${result.name}">
            <p>${result.description}</p>
        `;

        content.appendChild(resultDiv);
    });
}
document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.getElementById('content').innerHTML = ''; // Clear the content
});

function displayTime(country) {
    let timeZone;
    switch (country.toLowerCase()) {
        case 'australia':
            timeZone = 'Australia/Sydney';
            break;
        case 'thailand':
            timeZone = 'Asia/Bangkok';
            break;
        // Add more countries as needed
    }

    if (timeZone) {
        const options = { timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const localTime = new Date().toLocaleTimeString('en-US', options);
        console.log(`Current time in ${country}:`, localTime);
    }
}
