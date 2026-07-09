// Analytics wrapper for GA4 and Meta Pixel
// Sends events to both platforms simultaneously

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${eventName}`, params);
  }
}

// Pre-defined conversion events
export const events = {
  // Forms
  formStart: (formName: string) => trackEvent('form_start', { form_name: formName }),
  formSubmit: (formName: string) => trackEvent('form_submit', { form_name: formName }),
  formSuccess: (formName: string) => {
    trackEvent('form_success', { form_name: formName });
    trackEvent('Lead', { form_name: formName }); // Meta Pixel
  },
  formError: (formName: string, error: string) => trackEvent('form_error', { form_name: formName, error }),

  // WhatsApp
  whatsappClick: (source: string) => {
    trackEvent('whatsapp_click', { source });
    trackEvent('Contact', { source }); // Meta Pixel
  },

  // Navigation
  bioButtonClick: (buttonLabel: string) => trackEvent('bio_button_click', { button_label: buttonLabel }),
  ctaClick: (ctaLabel: string, page: string) => trackEvent('cta_click', { cta_label: ctaLabel, page }),

  // Content
  serviceView: (serviceName: string) => trackEvent('service_view', { service_name: serviceName }),
  productView: (productName: string) => {
    trackEvent('product_view', { product_name: productName });
    trackEvent('ViewContent', { content_name: productName }); // Meta Pixel
  },
  articleRead: (articleSlug: string) => trackEvent('article_read', { article_slug: articleSlug }),

  // Scroll
  scrollDepth: (depth: number, page: string) => trackEvent(`scroll_${depth}`, { page }),

  // FAQ
  faqOpen: (question: string) => trackEvent('faq_open', { question }),
} as const;
