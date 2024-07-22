document.addEventListener('DOMContentLoaded', () => {
    populateArtists();
    populateItemTypes();
    renderItems(items.filter(item => item.isPublished)); 

    const filterPanel = document.querySelector('.filter-panel');
    const filterButton = document.querySelector('.filter-btn');
    const closeButton = document.querySelector('.close-btn');
    const applyButton = document.querySelector('.apply-btn');
    const auctionButton = document.querySelector('.auction-btn');

    filterButton.addEventListener('click', () => {
        filterPanel.style.display = 'block';
        setTimeout(() => filterPanel.style.right = '0', 10); 
    });

    closeButton.addEventListener('click', () => {
        filterPanel.style.right = '-100%';
        setTimeout(() => filterPanel.style.display = 'none', 300); 
    });

    applyButton.addEventListener('click', () => {
        applyFilters();
        filterPanel.style.right = '-100%';
        setTimeout(() => filterPanel.style.display = 'none', 300);
    });

    auctionButton.addEventListener('click', () => {
        window.location.href = 'auction.html';
    });


    document.addEventListener('click', (event) => {
        if (!filterPanel.contains(event.target) && !filterButton.contains(event.target)) {
            filterPanel.style.right = '-100%';
            setTimeout(() => filterPanel.style.display = 'none', 300); 
        }
    });
});

function applyFilters() {
    const itemNameInput = document.querySelector('#item-name-filter').value.trim();
    const artistSelect = document.querySelector('#artist-filter').value;
    const minPriceInput = document.querySelector('#min-price-filter').value;
    const maxPriceInput = document.querySelector('#max-price-filter').value;
    const typeSelect = document.querySelector('#type-filter').value;

    const filteredItems = items.filter(item => {
        const matchesName = itemNameInput === '' || item.title.toLowerCase().includes(itemNameInput.toLowerCase());
        const matchesArtist = artistSelect === '' || item.artist.toLowerCase() === artistSelect.toLowerCase();
        const matchesPrice = (!minPriceInput || item.price >= parseFloat(minPriceInput)) && (!maxPriceInput || item.price <= parseFloat(maxPriceInput));
        const matchesType = typeSelect === '' || item.type.toLowerCase() === typeSelect.toLowerCase();

        return item.isPublished && matchesName && matchesArtist && matchesPrice && matchesType;
    });

    renderItems(filteredItems);
}

function populateArtists() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const artistSelect = document.querySelector('#artist-filter');
            data.forEach(artist => {
                const option = document.createElement('option');
                option.value = artist.name.toLowerCase();
                option.textContent = artist.name;
                artistSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching artists:', error));
}

function populateItemTypes() {
    const itemTypes = [...new Set(items.map(item => item.type))]; 
    const typeSelect = document.querySelector('#type-filter');
    itemTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        typeSelect.appendChild(option);
    });
}

function renderItems(filteredItems) {
    const itemListing = document.querySelector('.item-listing');
    itemListing.innerHTML = '';

    filteredItems.forEach((item, index) => {
        const itemCard = document.createElement('div');
        itemCard.className = `item-card ${index % 2 === 0 ? 'even' : 'odd'}`;

        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.title || 'Untitled'}">
            <div class="item-card-content">
                <h3>${item.title || 'Untitled'}</h3>
                <p class="artist">${item.artist}</p>
                <p class="price">$${item.price}</p>
                <p>${item.description}</p>
            </div>
        `;
        itemListing.appendChild(itemCard);
    });
}