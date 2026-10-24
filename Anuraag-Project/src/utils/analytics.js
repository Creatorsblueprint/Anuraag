/**
 * Analytics & Tag Manager DataLayer Dispatcher
 * Container ID: GTM-WXQ6PNND
 * GA4 Measurement ID: G-G405K3FG0R
 */

export const pushToDataLayer = (eventData) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ...eventData,
      timestamp: new Date().toISOString()
    });
    if (import.meta.env?.DEV) {
      console.log('[Analytics Event]', eventData);
    }
  }
};

/**
 * Track virtual page views for Single Page App (SPA) hash / section navigation
 * @param {string} sectionName - The slug or title of the section (e.g. 'book', 'expertise')
 * @param {string} pageTitle - Human readable title
 */
export const trackPageView = (sectionName, pageTitle = '') => {
  const pagePath = sectionName.startsWith('/') ? sectionName : `/${sectionName}`;
  pushToDataLayer({
    event: 'virtual_page_view',
    page_path: pagePath,
    page_title: pageTitle || `Dr. Anuraag Guglaani — ${sectionName}`,
    page_location: window.location.href
  });
};

/**
 * Track navigation link clicks (Header, Mobile Menu, Footer)
 * @param {string} linkName - Label of the clicked link (e.g. 'The Book', 'Recognition')
 * @param {string} destination - Section anchor or URL (e.g. '#book')
 * @param {string} linkLocation - Where the link was clicked ('header', 'mobile_menu', 'footer')
 */
export const trackNavClick = (linkName, destination, linkLocation = 'header') => {
  pushToDataLayer({
    event: 'nav_click',
    link_name: linkName,
    link_url: destination,
    link_location: linkLocation
  });
};

/**
 * Track generic or prominent Call To Action clicks
 * @param {string} ctaLabel - Text on the button ('Get the book', 'Read a sample', 'Discover the book')
 * @param {string} ctaLocation - Section name where button resides ('hero', 'nav', 'sticky_bar', 'ebook')
 * @param {string} targetUrl - Link or action destination
 */
export const trackCtaClick = (ctaLabel, ctaLocation, targetUrl = '') => {
  pushToDataLayer({
    event: 'cta_click',
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    cta_target: targetUrl
  });
};

/**
 * Track when a visitor clicks an external retailer or initiates purchase
 * @param {object} bookData - { retailer, edition, format, url }
 */
export const trackBookPurchaseClick = ({
  retailer,
  edition,
  format,
  url = ''
}) => {
  pushToDataLayer({
    event: 'book_purchase_intent',
    retailer_name: retailer,
    book_edition: edition,
    book_format: format,
    retailer_url: url,
    ecommerce: {
      items: [
        {
          item_id: 'you_will_not_fly',
          item_name: 'You Will Not Fly',
          item_brand: 'Dr. Anuraag Guglaani',
          item_category: 'Book',
          item_variant: edition,
          affiliation: retailer
        }
      ]
    }
  });
};

/**
 * Track digital checkout lifecycle
 */
export const trackDigitalCheckoutBegin = (price = '15', currency = 'AED') => {
  pushToDataLayer({
    event: 'begin_checkout',
    currency: currency,
    value: parseFloat(price) || 15,
    ecommerce: {
      items: [
        {
          item_id: 'you_will_not_fly_digital',
          item_name: 'You Will Not Fly (Digital Edition)',
          price: parseFloat(price) || 15,
          quantity: 1
        }
      ]
    }
  });
};

export const trackDigitalPurchaseSuccess = (amount = '15', currency = 'AED') => {
  pushToDataLayer({
    event: 'purchase',
    transaction_id: `order_${Date.now()}`,
    currency: currency,
    value: parseFloat(amount) || 15,
    ecommerce: {
      items: [
        {
          item_id: 'you_will_not_fly_digital',
          item_name: 'You Will Not Fly (Digital Edition)',
          price: parseFloat(amount) || 15,
          quantity: 1
        }
      ]
    }
  });
};

/**
 * Track modal openings and engagements
 * @param {string} modalName - 'sample_reader', 'digital_checkout', etc.
 */
export const trackModalOpen = (modalName) => {
  pushToDataLayer({
    event: 'modal_open',
    modal_name: modalName
  });
};

/**
 * Track social profile link clicks
 * @param {string} platform - 'linkedin', 'instagram', 'x', 'threads', etc.
 * @param {string} url - Target URL
 */
export const trackSocialClick = (platform, url) => {
  pushToDataLayer({
    event: 'social_click',
    platform: platform,
    url: url
  });
};
