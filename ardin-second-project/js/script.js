document.addEventListener('DOMContentLoaded', () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const artistSelect = document.getElementById('artistSelect');
            // Fill the dropdown with artists
            data.forEach(artist => {
                const option = document.createElement('option');
                option.value = artist.id;
                option.textContent = artist.name;
                artistSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching artists:', error));
});

function redirectToArtistHome() {
    const artistSelect = document.getElementById('artistSelect');
    const selectedArtist = artistSelect.options[artistSelect.selectedIndex].text;
    if (selectedArtist) {
        localStorage.setItem('artistId', selectedArtist);
        window.location.href = `artist_home.html?artist=${selectedArtist}`;
    }
}

function redirectBackToArtistHome() {
    const artistId = localStorage.getItem('artistId');
    window.location.href = `artist_home.html`;
}

function redirectToVisitorHome() {
    window.location.href = 'visitors_home.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get('artist');
    document.getElementById('artistName').textContent = artistName;

    const menuIcon = document.getElementById('menuIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // Toggle menu on icon click
    menuIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('active');
    });

    const ctx = document.getElementById('incomeChart').getContext('2d');
    const incomeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
            datasets: [{
                label: 'Amount',
                data: [50, 59, 40, 50, 60, 55, 70, 65, 75, 80, 85, 90, 95, 100],
                backgroundColor: '#835858'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

function redirectToArtistItems() {
    const artistId = localStorage.getItem('artistId');
    if (!artistId) {
        alert('Please select an artist first');
        return;
    }
    window.location.href = `artist_items.html`;
}

document.addEventListener('DOMContentLoaded', () => {
    const artistId = localStorage.getItem('artistId');
    if (artistId) {
        document.getElementById('artist-name').textContent = `${artistId}'s Items`;
        items = getItemsForArtist(artistId);
        displayItems(items);
    }

    document.getElementById('item-form').addEventListener('submit', handleItemFormSubmit);
});

let items = [];

function getItemsForArtist(artistName) {
    return [
        {
            id: 1,
            title: 'Artwork 1',
            imageUrl: 'image1.jpg',
            price: 100,
            description: 'Description for artwork 1',
            isPublished: true
        },
        {
            id: 2,
            title: 'Artwork 2',
            imageUrl: 'image2.jpg',
            price: 200,
            description: 'Description for artwork 2',
            isPublished: false
        },
    ];
}

function displayItems(items) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
    items.forEach(item => {
        const itemHtml = `
            <div class="item-card" data-id="${item.id}">
                <img src="${item.imageUrl}" alt="${item.title}">
                <h3>${item.title}</h3>
                <span class="price">$${item.price}</span>
                <p>${item.description}</p>
                <div class="controls">
                    <button class="publish-btn" onclick="togglePublish(${item.id})">${item.isPublished ? 'Unpublish' : 'Publish'}</button>
                    <button class="edit-btn" onclick="editItem(${item.id})">Edit</button>
                    <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `;
        itemsContainer.insertAdjacentHTML('beforeend', itemHtml);
    });
    const addNewItemCardHtml = `
        <div class="add-new-item-card" onclick="openAddNewItemForm()">
            + Add New Item
        </div>
    `;
    itemsContainer.insertAdjacentHTML('beforeend', addNewItemCardHtml);
}

function togglePublish(itemId) {
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.isPublished = !item.isPublished;
        displayItems(items);
    }
}

function removeItem(itemId) {
    if (confirm('Are you sure you want to remove this item?')) {
        items = items.filter(item => item.id !== itemId);
        displayItems(items);
    }
}

function editItem(itemId) {
    const item = items.find(item => item.id === itemId);
    if (item) {
        openAddNewItemForm(item);
    }
}

function openAddNewItemForm(item = null) {
    const form = document.getElementById('item-form');
    if (item) {
        form.title.value = item.title;
        form.description.value = item.description;
        form.price.value = item.price;
        form.imageUrl.value = item.imageUrl;
        form.isPublished.checked = item.isPublished;
        form.itemId.value = item.id;
    } else {
        form.reset();
        form.itemId.value = '';
    }
    document.getElementById('add-item-form').style.display = 'block';
}

function closeAddItemForm() {
    document.getElementById('add-item-form').style.display = 'none';
}

function handleItemFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const item = {
        id: form.itemId.value ? parseInt(form.itemId.value) : Date.now(),
        title: form.title.value,
        description: form.description.value,
        price: parseFloat(form.price.value),
        imageUrl: form.imageUrl.value,
        isPublished: form.isPublished.checked
    };

    const existingItemIndex = items.findIndex(i => i.id === item.id);
    if (existingItemIndex !== -1) {
        items[existingItemIndex] = item;
    } else {
        items.push(item);
    }
    
    displayItems(items);
    closeAddItemForm();
}

function redirectToAuction() {
    window.location.href = 'auction.html';
}

function redirectToVisitorListing() {
    window.location.href = 'visitors_listings.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        const width = row.scrollWidth;
        row.style.animationDuration = `${width / 50}s`;
    });
});

let currentIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
setInterval(() => {
    carouselItems[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].style.display = 'block';
}, 3000);

function toggleFilters() {
    const filterPanel = document.getElementById('filter-panel');
    filterPanel.classList.toggle('open');
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        const artistSelect = document.getElementById('artist');
        data.forEach(user => {
            const option = document.createElement('option');
            option.value = user.name;
            option.textContent = user.name;
            artistSelect.appendChild(option);
        });
    });

function applyFilters() {
    const itemName = document.getElementById('item-name').value.toLowerCase();
    const artist = document.getElementById('artist').value;
    const minPrice = parseFloat(document.getElementById('min-price').value);
    const maxPrice = parseFloat(document.getElementById('max-price').value);
    const itemType = document.getElementById('item-type').value;

    let filteredItems = items.filter(item => item.isPublished);

    if (itemName) {
        filteredItems = filteredItems.filter(item => item.title.toLowerCase().includes(itemName));
    }

    if (artist) {
        filteredItems = filteredItems.filter(item => item.artist === artist);
    }

    if (!isNaN(minPrice)) {
        filteredItems = filteredItems.filter(item => item.price >= minPrice);
    }

    if (!isNaN(maxPrice)) {
        filteredItems = filteredItems.filter(item => item.price <= maxPrice);
    }

    displayItems(filteredItems);
}