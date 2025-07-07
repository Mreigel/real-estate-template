import './style.css';
import { properties } from './data.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const container = document.getElementById('listingContainer');
const prop = properties.find((p) => p.id == id);

if (!container) {
  console.error('Missing #listingContainer');
} else if (!prop) {
  container.innerHTML = `<p class="text-red-500 text-xl">Listing not found (ID=${id}).</p>`;
} else 
  container.innerHTML = `
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">

    <!-- Hero Image -->
    <div class="w-full h-64 sm:h-[400px] overflow-hidden rounded-xl shadow-xl">
      <img src="${prop.images[0]}" class="w-full h-full object-cover" alt="Primary Property Image" />
    </div>

    <!-- Scrollable Image Gallery -->
    <div class="overflow-x-auto flex gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
      ${prop.images.slice(1).map(src => `
        <img src="${src}" 
             class="h-36 sm:h-48 min-w-[240px] sm:min-w-[300px] object-cover rounded-lg shadow-md cursor-pointer"
             onclick="openLightbox('${src}')" />
      `).join('')}
    </div>

    <!-- Property Info -->
    <div class="bg-gray-800 px-4 py-6 sm:p-8 rounded-2xl shadow-xl space-y-4 max-w-3xl mx-auto">
      <h1 class="text-2xl sm:text-3xl font-bold text-aquamarine">${prop.address}</h1>
      <p class="text-xl sm:text-2xl text-white font-semibold">${prop.price}</p>
      <p class="text-sm sm:text-base text-gray-300">${prop.description}</p>
      <p class="text-xs sm:text-sm text-gray-500">Listed by: ${prop.seller}</p>

      <div class="pt-4">
        <a href="mailto:agent@example.com?subject=Interested in ${encodeURIComponent(prop.address)}" 
           class="block text-center px-4 py-3 sm:px-6 sm:py-3 bg-aquamarine text-gray-900 font-bold rounded-lg shadow hover:bg-opacity-90 transition">
          Contact Agent
        </a>
      </div>
    </div>

    <!-- Back Button -->
    <div class="text-center">
      <a href="/index.html" 
         class="inline-block px-4 py-2 border border-aquamarine text-aquamarine font-bold rounded hover:bg-aquamarine hover:text-gray-900 transition">
        ← Back to Listings
      </a>
    </div>

    <!-- Lightbox -->
    <div id="lightbox" class="fixed inset-0 bg-black bg-opacity-80 hidden z-50 flex items-center justify-center p-4">
      <div class="relative max-w-full max-h-full">
        <img id="lightboxImg" class="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg" />
        <button onclick="closeLightbox()" 
                class="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-60 rounded-full px-3 py-1 hover:bg-opacity-80">
          &times;
        </button>
      </div>
    </div>
  </div>
`;


window.openLightbox = function (src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  lightbox.classList.remove('hidden');
};

document.addEventListener('click', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (e.target === lightbox) {
    lightbox.classList.add('hidden');
  }
});

