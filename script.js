const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('errorMsg');

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function performSearch(query) {
    if (!query.trim()) return;

    gallery.innerHTML = '';
    errorMsg.classList.add('hidden');
    loader.classList.remove('hidden');

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

        renderGallery(objects.filter(obj => obj && obj.primaryImageSmall));
    } catch (error) {
        showError('An error occurred while fetching the artworks.');
    } finally {
        loader.classList.add('hidden');
    }
}

function renderGallery(artworks) {
    if (artworks.length === 0) {
        showError('No artworks with images found.');
        return;
    }

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
