const GA_ID = 'G-XXXXXXXXXX'; // [SUBSTITUIR: ID do GA4 do cliente]
const META_PIXEL_ID = 'XXXXXXXXXXXXXXX'; // [SUBSTITUIR: Meta Pixel ID]
// const GTM_ID = 'GTM-XXXXXXX'; // [SUBSTITUIR: descomente se o cliente usar GTM]

function loadGA4() {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
}

function loadMetaPixel() {
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

function trackWhatsAppClicks() {
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      const location = link.dataset.trackLocation || 'generic';

      if (window.gtag) {
        window.gtag('event', 'cta_click', {
          button_location: location,
          destination: 'whatsapp'
        });
      }

      if (window.fbq) {
        window.fbq('track', 'Contact', { content_name: location });
      }
    });
  });
}

export function initTracking() {
  if (GA_ID !== 'G-XXXXXXXXXX') loadGA4();
  if (META_PIXEL_ID !== 'XXXXXXXXXXXXXXX') loadMetaPixel();
  trackWhatsAppClicks();
}
