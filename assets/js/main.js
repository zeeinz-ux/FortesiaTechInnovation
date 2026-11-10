/**
 * FORTESIA TECH INNOVATION - MAIN INTERACTIVE SCRIPT
 * Stack: Pure Modern Vanilla JavaScript (ES6+)
 * Performance: Zero External Dependencies, 100% Lightweight (< 10 KB)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Sticky Glass Navbar on Scroll
  // -------------------------------------------------------------------------
  const headerNav = document.getElementById('headerNav');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      headerNav?.classList.add('scrolled');
    } else {
      headerNav?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // -------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileToggle?.classList.add('active');
    mobileDrawer?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle?.classList.remove('active');
    mobileDrawer?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', () => {
    if (mobileDrawer?.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileOverlay?.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // -------------------------------------------------------------------------
  // 3. Interactive Capability Showcase (Dashboard Preview Switcher)
  // -------------------------------------------------------------------------
  const dashTabs = document.querySelectorAll('.dash-tab-btn');
  const metricValSpeed = document.getElementById('metricValSpeed');
  const metricValScore = document.getElementById('metricValScore');
  const metricValUptime = document.getElementById('metricValUptime');
  const metricValTech = document.getElementById('metricValTech');
  const chartTitle = document.getElementById('chartTitle');
  const chartBars = document.querySelectorAll('.chart-bar-fill');

  const showcaseData = {
    performance: {
      title: 'Performa Kecepatan Akses (Real-Time)',
      speed: '0.38s',
      score: '100/100',
      uptime: '99.98%',
      tech: 'Lightweight',
      barHeights: ['40%', '65%', '85%', '50%', '95%', '80%', '100%']
    },
    code: {
      title: 'Kualitas Arsitektur & Keamanan Kode',
      speed: 'A+ Grade',
      score: 'Clean Code',
      uptime: '0 Vulnerability',
      tech: 'Modular ES6',
      barHeights: ['80%', '75%', '90%', '95%', '85%', '90%', '100%']
    },
    seo: {
      title: 'Indeks SEO & Google Core Web Vitals',
      speed: '100% Pass',
      score: 'Top 1 Rank',
      uptime: 'Schema Ready',
      tech: 'Semantic HTML',
      barHeights: ['60%', '70%', '80%', '90%', '85%', '95%', '100%']
    },
    mobile: {
      title: 'Respon Layar Seluler & Multi-Device',
      speed: '60 FPS',
      score: 'Fluid UI',
      uptime: '100% Touch',
      tech: 'Responsive',
      barHeights: ['95%', '90%', '85%', '100%', '90%', '95%', '100%']
    }
  };

  dashTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dashTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.getAttribute('data-tab');
      const data = showcaseData[mode];
      if (!data) return;

      if (chartTitle) chartTitle.textContent = data.title;
      if (metricValSpeed) metricValSpeed.textContent = data.speed;
      if (metricValScore) metricValScore.textContent = data.score;
      if (metricValUptime) metricValUptime.textContent = data.uptime;
      if (metricValTech) metricValTech.textContent = data.tech;

      chartBars.forEach((bar, idx) => {
        if (data.barHeights[idx]) {
          bar.style.height = data.barHeights[idx];
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Interactive FAQ Accordion
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        if (content) content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });

  // Open first FAQ by default
  if (faqItems[0]) {
    const firstTrigger = faqItems[0].querySelector('.faq-trigger');
    firstTrigger?.click();
  }

  // -------------------------------------------------------------------------
  // 5. Toast Notification System
  // -------------------------------------------------------------------------
  const toastEl = document.getElementById('toastNotice');
  let toastTimer;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  // -------------------------------------------------------------------------
  // 6. Copy to Clipboard Utility (Email & Phone)
  // -------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`✓ Berhasil disalin: ${textToCopy}`);
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`✓ Berhasil disalin: ${text}`);
    } catch (err) {
      showToast('Gagal menyalin teks');
    }
    document.body.removeChild(tempInput);
  }

  // -------------------------------------------------------------------------
  // 7. Dynamic Year in Footer
  // -------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------------------
  // 8. WhatsApp Service Customizer (Pre-fills specific service interest)
  // -------------------------------------------------------------------------
  const serviceWaLinks = document.querySelectorAll('[data-service-wa]');
  const baseWaNumber = '6285893861418';

  serviceWaLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = link.getAttribute('data-service-wa') || 'Layanan Digital';
      const textMessage = `Halo Fortesia Tech Innovation, saya tertarik untuk konsultasi mengenai pembuatan ${serviceName}. Bagaimana alur dan tahapannya?`;
      const waUrl = `https://wa.me/${baseWaNumber}?text=${encodeURIComponent(textMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  });
});

