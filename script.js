// Grab the main UI elements we'll be interacting with
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('errorMsg');

// Grab elements we added for Milestone 3 (filtering & sorting)
const themeToggle = document.getElementById('themeToggle');
const controlsContainer = document.getElementById('controlsContainer');
const localSearch = document.getElementById('localSearch');
const deptFilter = document.getElementById('deptFilter');
const sortYear = document.getElementById('sortYear');

// We need a place to cache our fetched data so we can filter it locally without hitting the API again
let currentArtworks = []; 

// The Met's open API base URL
const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

// --- Dark Mode System ---
// Check if the user has a saved preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
}

// Toggle dark mode when the user clicks the theme button
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 Dark Mode';
    }
});

async function performSearch(query) {
    if (!query.trim()) return;

    gallery.innerHTML = '';
    errorMsg.classList.add('hidden');
    controlsContainer.classList.add('hidden');
    loader.classList.remove('hidden');
    currentArtworks = [];

    try {
        const searchRes = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&hasImages=true`);
        if (!searchRes.ok) throw new Error('Network response was not ok');
        const searchData = await searchRes.json();

        if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
            showError('No artworks found for your search term.');
            return;
        }

        const shuffledIds = searchData.objectIDs.sort(() => 0.5 - Math.random());
        const idsToFetch = shuffledIds.slice(0, 24);
        
        const objectPromises = idsToFetch.map(id => fetch(`${BASE_URL}/objects/${id}`).then(res => res.json()));
        const objects = await Promise.all(objectPromises);

        currentArtworks = objects.filter(obj => obj && obj.primaryImageSmall);
        populateDepartments(currentArtworks);
        controlsContainer.classList.remove('hidden');
        
        applyFilters(); 
    } catch (error) {
        showError('An error occurred while fetching the artworks.');
    } finally {
        loader.classList.add('hidden');
    }
}

function processYear(objectDateStr) {
    // Basic year extraction, usually dates are like "ca. 1912" or "1800-1815"
    if (!objectDateStr) return 0;
    const match = objectDateStr.match(/(\d{3,4})/);
    return match ? parseInt(match[0], 10) : 0;
}

function applyFilters() {
    if (currentArtworks.length === 0) return;

    let filtered = [...currentArtworks];

    // Filter by title/artist
    const localQuery = localSearch.value.toLowerCase().trim();
    if (localQuery) {
        filtered = filtered.filter(art => {
            const titleMatch = (art.title || '').toLowerCase().includes(localQuery);
            const artistMatch = (art.artistDisplayName || '').toLowerCase().includes(localQuery);
            return titleMatch || artistMatch;
        });
    }

    // Filter by department
    const selectedDept = deptFilter.value;
    if (selectedDept !== 'all') {
        filtered = filtered.filter(art => (art.department || 'General') === selectedDept);
    }

    // Sort by Date
    const sortVal = sortYear.value;
    if (sortVal !== 'default') {
        filtered.sort((a, b) => {
            const yearA = processYear(a.objectDate);
            const yearB = processYear(b.objectDate);
            return sortVal === 'asc' ? yearA - yearB : yearB - yearA;
        });
    }

    renderGallery(filtered);
}

localSearch.addEventListener('input', applyFilters);
deptFilter.addEventListener('change', applyFilters);
sortYear.addEventListener('change', applyFilters);

function populateDepartments(artworks) {
    // Keep 'All' option, remove others
    deptFilter.innerHTML = '<option value="all">All Departments</option>';
    
    const depts = new Set();
    artworks.forEach(art => depts.add(art.department || 'General'));
    
    Array.from(depts).sort().forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        deptFilter.appendChild(option);
    });
}

function renderGallery(artworks) {
    gallery.innerHTML = ''; // clear before render

    if (artworks.length === 0) {
        showError('No artworks match your filters.');
        return;
    }

    errorMsg.classList.add('hidden');

    const fragment = document.createDocumentFragment();

    artworks.forEach(art => {
        const card = document.createElement('div');
        card.className = 'card';

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'card-image-wrapper';
        const img = document.createElement('img');
        img.className = 'card-image';
        img.src = art.primaryImageSmall || art.primaryImage;
        img.alt = art.title || 'Artwork';
        img.loading = 'lazy';
        imgWrapper.appendChild(img);

        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = art.title || 'Unknown Title';

        const artist = document.createElement('div');
        artist.className = 'card-artist';
        artist.textContent = art.artistDisplayName || 'Unknown Artist';

        const meta = document.createElement('div');
        meta.className = 'card-meta';

        const dept = document.createElement('span');
        dept.className = 'card-dept';
        dept.textContent = art.department || 'General';

        const year = document.createElement('span');
        year.textContent = art.objectDate || 'Unknown Date';

        meta.appendChild(dept);
        meta.appendChild(year);

        content.appendChild(title);
        content.appendChild(artist);
        content.appendChild(meta);

        card.appendChild(imgWrapper);
        card.appendChild(content);
        
        fragment.appendChild(card);
    });

    gallery.appendChild(fragment);
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
}

searchBtn.addEventListener('click', () => performSearch(searchInput.value));

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch(searchInput.value);
});
