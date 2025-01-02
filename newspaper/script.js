document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '33fcd54ee97025bec264640994a50a29';
    const apiUrlBase = 'https://gnews.io/api/v4/search?lang=en&country=us&max=10&apikey=' + apiKey;
    const newsSection = document.getElementById('news-section');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    let page = 1; // API page number
    const pageSize = 12; // Number of articles per API call
    let isLoading = false; // Prevent multiple simultaneous fetches

    // Function to generate a random query
    function getRandomQuery() {
        const queries = ['education', 'research', 'technology', 'innovation', 'science', 'AI', 'climate', 'space'];
        return queries[Math.floor(Math.random() * queries.length)];
    }

    // Function to clear the news section
    function clearNews() {
        newsSection.innerHTML = '';
    }

    // Function to fetch and render articles
    function fetchArticles(query = '') {
        if (isLoading) return;

        const apiUrl = `${apiUrlBase}&q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`;

        isLoading = true;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.articles && data.articles.length > 0) {
                    data.articles.forEach(article => {
                        const newsCard = document.createElement('div');
                        newsCard.className = 'news-article';

                        const imageSrc = article.image || 'https://via.placeholder.com/300x150.png?text=No+Image';
                        const title = article.title || 'Untitled';
                        const description = article.description || 'Description not available.';
                        const url = article.url;

                        newsCard.innerHTML = `
                            <h2>${title}</h2>
                            <img src="${imageSrc}" alt="News Image">
                            <p>${description}</p>
                            <a href="${url}" target="_blank">Read More</a>
                        `;

                        newsSection.appendChild(newsCard);
                    });

                    page++; // Increment page number for the next API call
                } else {
                    const noMoreArticlesMessage = document.createElement('p');
                    noMoreArticlesMessage.textContent = 'No more articles available.';
                    newsSection.appendChild(noMoreArticlesMessage);
                }
                isLoading = false;
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                isLoading = false;
            });
    }

    // Handle search button click
    searchButton.addEventListener('click', function () {
        clearNews();
        page = 1; // Reset pagination
        fetchArticles(getRandomQuery());

        // Clear the search input text after searching
        searchInput.value = '';
    });

    // Infinite scrolling logic
    window.addEventListener('scroll', function () {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
            !isLoading
        ) {
            fetchArticles(getRandomQuery());
        }
    });

    // Initial fetch: Show random articles on reload
    clearNews();
    fetchArticles(getRandomQuery());
});
