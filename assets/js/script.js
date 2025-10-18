'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

// collect only existing elements to avoid calling addEventListener on null
const navElemArr = [];
if (overlay) navElemArr.push(overlay);
if (navCloseBtn) navElemArr.push(navCloseBtn);
if (navOpenBtn) navElemArr.push(navOpenBtn);
if (navbarLinks && navbarLinks.length) {
  navbarLinks.forEach(function (link) {
    if (link) navElemArr.push(link);
  });
}

// add event on all elements for toggling navbar
navElemArr.forEach(function (el) {
  el.addEventListener("click", function () {
    if (navbar) elemToggleFunc(navbar);
    if (overlay) elemToggleFunc(overlay);
  });
});



/**
 * header active state
 */

const header = document.querySelector("[data-header]");

// window.addEventListener("scroll", function () {
//   window.scrollY >= 400 ? header.classList.add("active")
//     : header.classList.remove("active");
// }); 

/**
 * Load featured properties from data/properties.json and render into
 * the existing .property-list so the markup and styling remains identical.
 */
document.addEventListener('DOMContentLoaded', function () {
  const listEl = document.querySelector('.property-list');
  if (!listEl) return;

  fetch('./data/properties.json')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch properties.json');
      return res.json();
    })
    .then((properties) => {
      // build HTML using the same classes and structure as index.html
      listEl.innerHTML = properties
        .map((p) => {
          return `
            <li>
              <div class="property-card">

                <figure class="card-banner">

                  <a href="property.html?id=${encodeURIComponent(p.id)}">
                    <img src="${p.image}" alt="${escapeHtml(p.title)}" class="w-100">
                  </a>

                  <div class="card-badge ${escapeHtml(p.badgeClass)}">${escapeHtml(p.badgeText)}</div>

                  <div class="banner-actions">

                    <button class="banner-actions-btn">
                      <ion-icon name="location"></ion-icon>

                      <address>${escapeHtml(p.location)}</address>
                    </button>

                    <button class="banner-actions-btn">
                      <ion-icon name="camera"></ion-icon>

                      <span>${p.cameras}</span>
                    </button>

                    <button class="banner-actions-btn">
                      <ion-icon name="film"></ion-icon>

                      <span>${p.films}</span>
                    </button>

                  </div>

                </figure>

                <div class="card-content">

                  <div class="card-price">
                    <strong>${escapeHtml(p.price)}</strong>${escapeHtml(p.period)}
                  </div>

                  <h3 class="h3 card-title">
                    <a href="property.html?id=${encodeURIComponent(p.id)}">${escapeHtml(p.title)}</a>
                  </h3>

                  <p class="card-text">
                    ${escapeHtml(p.description)}
                  </p>

                  <ul class="card-list">

                    <li class="card-item">
                      <strong>${p.bedrooms}</strong>

                      <ion-icon name="bed-outline"></ion-icon>

                      <span>Bedrooms</span>
                    </li>

                    <li class="card-item">
                      <strong>${p.bathrooms}</strong>

                      <ion-icon name="man-outline"></ion-icon>

                      <span>Bathrooms</span>
                    </li>

                    <li class="card-item">
                      <strong>${p.sqft}</strong>

                      <ion-icon name="square-outline"></ion-icon>

                      <span>Square Ft</span>
                    </li>

                  </ul>

                </div>

              </div>
            </li>
          `;
        })
        .join('');
    })
    .catch((err) => {
      // keep original content if fetch fails, but log for debugging
      console.error('Error loading properties:', err);
    });

  // small helper to avoid inserting raw HTML from JSON
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

});