'use client';

import { useEffect } from 'react';

const revealSelectors = [
  '.hero-copy',
  '.hero-panel',
  '.trust-bar',
  '.section',
  '.section-heading',
  '.resource-card',
  '.feature-tile',
  '.waitlist-card',
  '.footer',
  '.blog-hero',
  '.article-card',
  '.topic-sidebar',
  '.related-sidebar',
  '.download-hero',
  '.service-card',
  '.panel',
  '.publish-note',
  '.admin-hero',
  '.admin-module-bar',
  '.admin-panel',
];

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const elements = Array.from(document.querySelectorAll(revealSelectors.join(',')));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      element.style.setProperty('--reveal-index', String(index % 4));
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
