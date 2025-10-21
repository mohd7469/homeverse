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
  const propertyListEl = document.querySelector('.property-list');
  if (!propertyListEl) return;

  fetch('./data/properties.json')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch properties.json');
      return res.json();
    })
    .then((properties) => {
      // build HTML using the same classes and structure as index.html
      propertyListEl.innerHTML = properties
        .map((p) => {
          return `
            <li>
              <div class="property-card">

                <figure class="card-banner">

                  <a href="property.html?id=${encodeURIComponent(p.id)}&type=properties">
                    <img src="${p.image}" alt="${escapeHtml(p.title)}" class="w-100">
                  </a>

                  <div class="card-badge ${escapeHtml(p.badgeClass)}">${escapeHtml(p.badgeText)}</div>

                  <div class="banner-actions">

                    <button class="banner-actions-btn" data-map="${escapeHtml(p.mapLink || '')}">
                      <ion-icon name="location"></ion-icon>

                      <address>${escapeHtml(p.location)}</address>
                    </button>

                    <button class="banner-actions-btn">
                      <span>Karachi</span>
                    </button>

                  </div>

                </figure>

                <div class="card-content">

                  <div class="card-price">
                    <strong>${escapeHtml(p.price)}</strong>${escapeHtml(p.period)}
                  </div>

                  <h3 class="h3 card-title">
                    <a href="property.html?id=${encodeURIComponent(p.id)}&type=properties">${escapeHtml(p.title)}</a>
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

                      <ion-icon name="cube-outline"></ion-icon>
                      
                      <span>Square Ft</span>
                    </li>

                  </ul>

                </div>

              </div>
            </li>
          `;
        })
        .join('');

      // Attach click handlers to location buttons that have a data-map attribute
      const mapBtns = propertyListEl.querySelectorAll('.banner-actions-btn[data-map]');
      mapBtns.forEach(function (btn) {
        const url = btn.getAttribute('data-map');
        if (!url) return;
        btn.addEventListener('click', function (e) {
          // open in a new tab/window safely
          try {
            window.open(url, '_blank', 'noopener');
          } catch (err) {
            // fallback: navigate
            window.location.href = url;
          }
        });
      });
    })
    .catch((err) => {
      // keep original content if fetch fails, but log for debugging
      console.error('Error loading properties:', err);
    });

  const blogListEl = document.querySelector('.blog-list');
  if (!blogListEl) return;
  
  fetch('./data/blogs.json')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch blogs.json');
      return res.json();
    })
    .then((blogs) => {
      blogListEl.innerHTML = blogs
        .map((b) => {
          return `
          <li>
            <div class="blog-card">

              <figure class="card-banner">
                <img src="${b.image}" alt="${escapeHtml(b.title)}" class="w-100">
              </figure>

              <div class="blog-content">

                <div class="blog-content-top">

                  <ul class="card-meta-list">

                    <li>
                      <a href="#" class="card-meta-link">
                        <ion-icon name="pricetags"></ion-icon>

                        <span>${escapeHtml(b.type || '')}</span>
                      </a>
                    </li>

                  </ul>

                  <h3 class="h3 blog-title">
                    <a href="property.html?id=${encodeURIComponent(b.id)}&type=blogs">${escapeHtml(b.title)}</a>
                  </h3>

                </div>

                <div class="blog-content-bottom">
                  <div class="publish-date">
                    <div class="d-flex gap-1 align-items-center">
                      <ion-icon name="bed-outline"></ion-icon>
                      ${escapeHtml(b.bedrooms || '')}
                      <span>Bed</span>
                    </div>
                    
                    <div class="d-flex gap-1 align-items-center">
                      <ion-icon name="man-outline"></ion-icon>
                      ${escapeHtml(b.bathrooms || '')}
                      <span>Bath</span>
                    </div>

                    <div class="d-flex gap-1 align-items-center">
                      <ion-icon name="cube-outline"></ion-icon>
                      ${escapeHtml(b.sqft || '')}
                      <span>Sq.Ft</span>
                    </div>
                  </div>

                  <a href="property.html?id=${encodeURIComponent(b.id)}" class="read-more-btn">${escapeHtml(b.price)} ${escapeHtml(b.period || '')}</a>
                </div>

              </div>

            </div>
          </li>
        `;
        })
        .join('');
    })
    .catch((err) => {
      console.error('Error loading blogs:', err);
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