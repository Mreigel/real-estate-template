import './style.css';
import { properties } from './data.js';

app.innerHTML = `
<button onclick="window.scrollTo({ top: 0, behavior: 'smooth' });"
  class="fixed bottom-6 right-6 bg-aquamarine text-gray-900 font-bold px-4 py-2 rounded-full shadow hover:bg-opacity-90 transition">
  ↑ Top
</button>

<div class="min-h-screen bg-gray-900 text-white font-sans">

    <!-- Navbar -->
    <nav class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow sticky top-0 z-50">
      <span class="font-bold text-xl">C2CWebSolutions</span>
      <ul class="flex space-x-6 text-sm">
  <li><a href="/index.html" class="hover:text-accent">Home</a></li>
  <li><a href="/about.html" class="hover:text-accent">About</a></li>
  <li><a href="/contact.html" class="hover:text-accent">Contact</a></li>
</ul>
    </nav>

    <!-- Hero -->
    <section class="p-8 bg-gray-800 shadow-md text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
        C2CWebSolutions
      </h1>
      <p class="text-white text-lg md:text-xl mb-6">
        From Coast to Cloud
      </p>
      <div class="max-w-xl mx-auto">
        <input 
          type="text" 
          id="searchInput"
          placeholder="Search by city, zip code, or neighborhood..." 
          class="w-full p-3 rounded-md bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
    </section>

    <!-- Property Listings -->
    <section id="propertyGrid" class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${renderProperties(properties)}
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-400 text-center py-4 mt-12">
      <p>&copy; 2025 C2CWebSolutions — All rights reserved.</p>
    </footer>

    <!-- Modal -->
    <div id="modalOverlay" class="fixed inset-0 bg-black bg-opacity-60 hidden flex justify-center items-center z-50">
      <div class="bg-gray-800 text-white rounded-xl max-w-xl w-full mx-4 shadow-lg relative p-6 overflow-y-auto max-h-[90vh]">
        <button id="closeModal" class="absolute top-2 right-4 text-white text-2xl">&times;</button>
        <div id="modalImages" class="flex overflow-x-auto space-x-4 mb-4"></div>
        <h2 id="modalAddress" class="text-xl font-bold text-aquamarine mb-2"></h2>
        <p id="modalDescription" class="text-gray-300 mb-2"></p>
        <p id="modalSeller" class="text-sm text-gray-400"></p>
      </div>
    </div> <!-- modalOverlay -->
  </div> <!-- min-h-screen -->
`;


document.getElementById('searchInput').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = properties.filter((p) =>
    p.address.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term)
  );
  document.getElementById('propertyGrid').innerHTML = renderProperties(filtered);
});

function renderProperties(list) {
  return list.map((prop) => `
    <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
      <img src="${prop.images[0]}" alt="Property Image" class="w-full h-48 object-cover cursor-pointer"
           onclick="location.href='listing.html?id=${prop.id}'">
      <div class="p-4">
        <h2 class="text-xl font-semibold text-aquamarine">${prop.price}</h2>
        <p class="text-gray-300 mb-2">${prop.address}</p>
        <p class="text-sm text-gray-400 mb-2">${prop.description}</p>
        <p class="text-sm text-gray-400">Seller: ${prop.seller}</p>
        <button class="mt-3 w-full bg-aquamarine text-gray-900 font-bold py-2 rounded-md hover:bg-opacity-90 transition"
                onclick="location.href='listing.html?id=${prop.id}'">
          View Details
        </button>
      </div>
    </div>
  `).join('');
}

window.openLightbox = function (src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  lightbox.classList.remove('hidden');
};

window.closeLightbox = function () {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
};
