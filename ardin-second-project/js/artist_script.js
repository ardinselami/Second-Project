document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get('artist');
    document.getElementById('artist-name').textContent = artistName;

    populateItems(artistName);

    // Show dropdown menu
    const menuIcon = document.getElementById('menuIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');
    menuIcon.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
});

function populateItems(artistName) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = ''; // Clear any existing items

    itemsData.filter(item => item.artist === artistName).forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p>Price: $${item.price}</p>
            <p>${item.isPublished ? 'Published' : 'Not Published'}</p>
        `;
        itemsContainer.appendChild(itemCard);
    });
}

// Dummy functions for redirect actions
function redirectBackToArtistHome() {
    console.log('Redirecting to artist home...');
    // Implement actual redirection logic
}

function redirectToArtistItems() {
    console.log('Redirecting to artist items...');
    // Implement actual redirection logic
}