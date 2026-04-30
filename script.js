  // Mobile Menu Toggle
  function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  }

  // Close mobile menu on link click
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileMenu').style.display = 'none';
    });
  });

  // Bottom Nav Active
  function setActive(el) {
    document.querySelectorAll('.bnav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
  }

  // Add to Cart
  let cartCount = 3;
  function addToCart(btn) {
    cartCount++;
    document.querySelector('.cart-badge').textContent = cartCount;
    document.querySelector('.bnav-center-label').textContent = `Cart (${cartCount})`;
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-check2"></i> Added';
    btn.style.background = '#2A6B4A';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 1500);
    showToast('✅ Added to cart!');
  }

  // Wishlist
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      if (icon.classList.contains('bi-heart')) {
        icon.classList.replace('bi-heart', 'bi-heart-fill');
        this.style.color = '#C0392B';
        showToast('❤️ Added to wishlist!');
      } else {
        icon.classList.replace('bi-heart-fill', 'bi-heart');
        this.style.color = '';
        showToast('Removed from wishlist');
      }
    });
  });

  // Cart Toast
  function showCartToast() {
    showToast(`🛒 You have ${cartCount} items in cart`);
  }

  // Toast
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2200);
  }

  // Countdown Timer
  let endTime = new Date().getTime() + (12 * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000) + (34 * 60 * 1000) + (22 * 1000);

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = endTime - now;
    if (diff <= 0) return;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Filter Tabs
  function filterTabs(el) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  // Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Navbar scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.main-navbar');
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
    }
    lastScroll = currentScroll;
  });
