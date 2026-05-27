/**
 * Image Modal Handler
 * Handles opening and closing of image modals for diagrams
 */
(function() {
  'use strict';

  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const diagramWrap = document.querySelector('.diagram-img-wrap');
  const closeBtn = document.querySelector('.img-modal-close');

  /**
   * Opens the image modal with the specified image source
   * @param {string} src - Image source URL
   */
  function openModal(src) {
    modalImg.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the image modal and restores body scroll
   */
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event listener: Click on diagram to open modal
  if (diagramWrap) {
    diagramWrap.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img && img.src) {
        openModal(img.src);
      }
    });
  }

  // Event listener: Close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Event listener: Click on modal overlay to close
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Event listener: Press Escape key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
})();

/**
 * Smooth Scroll Navigation Enhancement
 * Adds active state to nav links based on scroll position
 */
(function() {
  'use strict';

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section[id]');

  function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Update on scroll
  window.addEventListener('scroll', updateActiveLink);

  // Update on page load
  updateActiveLink();
})();

/**
 * Print-friendly enhancements
 * Adjusts styles for better print output
 */
(function() {
  'use strict';

  const style = document.createElement('style');
  style.textContent = `
    @media print {
      .section-nav,
      .img-modal-overlay,
      .site-footer {
        display: none !important;
      }

      .main {
        padding: 0;
      }

      .section {
        page-break-inside: avoid;
        margin-bottom: 24px;
      }

      .card,
      .op-step,
      .benefit-item {
        page-break-inside: avoid;
      }
    }
  `;
  document.head.appendChild(style);
})();
