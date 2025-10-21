/**
 * whatsapp.js
 * Small helper to open a WhatsApp chat in a new tab with an optional prefilled message.
 * Usage in any page:
 *   openWhatsApp('Hello, I am interested in ...');
 *   openWhatsApp('Hi', '923001234567'); // override default number
 */
(function () {
  'use strict';

  // Default phone number in international format without plus sign.
  // Update this value if you want to change the global number used site-wide.
  var DEFAULT_WHATSAPP_NUMBER = '923156216916';

  /**
   * Open WhatsApp chat in a new tab with an optional prefilled text message.
   * @param {string} text - Message text to prefill (will be URL encoded). Optional.
   * @param {string} phone - Phone number in international format (no +). Optional; falls back to default.
   */
  function openWhatsApp(text, phone) {
    try {
      var number = (typeof phone === 'string' && phone.trim()) ? phone.trim() : DEFAULT_WHATSAPP_NUMBER;
      var encoded = '';
      if (typeof text === 'string' && text.length > 0) {
        encoded = '?text=' + encodeURIComponent(text);
      }
      var url = 'https://wa.me/' + number + encoded;
      // Open in new tab/window safely
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      // Fallback to a direct navigation if popup blocked
      if (typeof text === 'string' && text.length > 0) {
        window.location.href = 'https://wa.me/' + DEFAULT_WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      } else {
        window.location.href = 'https://wa.me/' + DEFAULT_WHATSAPP_NUMBER;
      }
    }
  }

  // Expose globally
  window.openWhatsApp = openWhatsApp;
  window.whatsappHelper = {
    open: openWhatsApp,
    DEFAULT_NUMBER: DEFAULT_WHATSAPP_NUMBER
  };

})();


document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      const baseURL = location.origin;
      document.querySelectorAll('.navbar-list .navbar-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          link.setAttribute('href', `${baseURL}${href}`);
        }
      });
    }, 1000);
  });