import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  const navTarget = document.getElementById('inject-navbar');
  const footTarget = document.getElementById('inject-footer');

  if (navTarget) navTarget.innerHTML = navbar;
  if (footTarget) footTarget.innerHTML = footer;
});
