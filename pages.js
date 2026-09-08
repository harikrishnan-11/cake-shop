document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Blog category filter ---------- */
  const blogFilters = document.querySelectorAll('.blog-filter');
  const blogCards = document.querySelectorAll('.blog-card');
  if (blogFilters.length && blogCards.length) {
    blogFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        blogFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        blogCards.forEach(card => {
          const match = cat === 'all' || card.dataset.category === cat;
          card.classList.toggle('hidden', !match);
        });
      });
    });
  }

  /* ---------- Blog pagination (visual demo) ---------- */
  const pageBtns = document.querySelectorAll('.blog-pagination button');
  if (pageBtns.length) {
    pageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector('.blog-grid-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ---------- Cakes menu filter ---------- */
  const menuFilters = document.querySelectorAll('.menu-filter');
  const menuCards = document.querySelectorAll('.menu-card');
  if (menuFilters.length && menuCards.length) {
    menuFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        menuFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        menuCards.forEach(card => {
          const match = cat === 'all' || card.dataset.category === cat;
          card.classList.toggle('hidden', !match);
        });
      });
    });
  }

  /* ---------- Password show/hide toggle ---------- */
  document.querySelectorAll('.pass-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.closest('.auth-field-pass').querySelector('input');
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      toggle.textContent = isPass ? 'Hide' : 'Show';
    });
  });

  /* ---------- Password strength meter (signup) ---------- */
  const pwInput = document.getElementById('signupPassword');
  const strengthBars = document.querySelectorAll('.pw-strength-bar');
  const strengthLabel = document.getElementById('pwStrengthLabel');
  if (pwInput && strengthBars.length) {
    pwInput.addEventListener('input', () => {
      const val = pwInput.value;
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      const colors = ['rgba(46,26,32,.1)', '#B0294B', '#D9A441', '#7C9473'];
      const labels = ['Too short', 'Weak', 'Good', 'Strong'];
      strengthBars.forEach((bar, i) => {
        bar.style.background = i < score ? colors[Math.min(score - 1, 3)] : 'rgba(46,26,32,.1)';
      });
      if (strengthLabel) strengthLabel.textContent = val.length === 0 ? '' : (labels[Math.max(score - 1, 0)] || 'Too short');
    });
  }

  /* ---------- Login form (demo validation) ---------- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      loginForm.querySelectorAll('.auth-field').forEach(field => field.classList.remove('error'));

      const email = loginForm.querySelector('#loginEmail');
      const pass = loginForm.querySelector('#loginPassword');

      if (!email.value.includes('@')) {
        email.closest('.auth-field').classList.add('error');
        valid = false;
      }
      if (pass.value.length < 6) {
        pass.closest('.auth-field').classList.add('error');
        valid = false;
      }

      const successMsg = document.getElementById('loginSuccess');
      if (valid && successMsg) {
        successMsg.classList.add('show');
        loginForm.reset();
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    });
  }

  /* ---------- Signup form (demo validation) ---------- */
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      signupForm.querySelectorAll('.auth-field').forEach(field => field.classList.remove('error'));

      const name = signupForm.querySelector('#signupName');
      const email = signupForm.querySelector('#signupEmail');
      const pass = signupForm.querySelector('#signupPassword');

      if (name.value.trim().length < 2) {
        name.closest('.auth-field').classList.add('error');
        valid = false;
      }
      if (!email.value.includes('@')) {
        email.closest('.auth-field').classList.add('error');
        valid = false;
      }
      if (pass.value.length < 8) {
        pass.closest('.auth-field').classList.add('error');
        valid = false;
      }

      const successMsg = document.getElementById('signupSuccess');
      if (valid && successMsg) {
        successMsg.classList.add('show');
        signupForm.reset();
        strengthBars.forEach(bar => bar.style.background = 'rgba(46,26,32,.1)');
        if (strengthLabel) strengthLabel.textContent = '';
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    });
  }

});