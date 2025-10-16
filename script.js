document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menü aç/kapat
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Hizmetlerimiz seçme & opacity yönetimi
  const serviceContainer = document.querySelector('.service-container');
  const serviceItems = document.querySelectorAll('.service-item');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  let activeIndex = 3; // Başlangıçta 3. aktif
  const maxIndex = serviceItems.length;

  function updateServices() {
    serviceItems.forEach(item => {
      const index = Number(item.dataset.index);
      if (index === activeIndex) {
        item.classList.add('highlighted');
        item.classList.remove('transparent');
        item.style.pointerEvents = 'auto'; // Tıklanabilir
      } else {
        item.classList.remove('highlighted');
        if (index === 1 || index === 5) {
          item.classList.add('transparent');
          item.style.pointerEvents = 'none'; // Tıklanamaz
        } else {
          item.classList.remove('transparent');
          item.style.pointerEvents = 'auto'; // Tıklanabilir
        }
      }
    });

    // Aktif öğeyi ortala
    if (serviceContainer) {
      const activeItem = document.querySelector(`.service-item[data-index="${activeIndex}"]`);
      if (activeItem) {
        const containerRect = serviceContainer.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const scrollLeft = serviceContainer.scrollLeft;
        const offset = (itemRect.left + itemRect.width / 2) - (containerRect.left + containerRect.width / 2);
        serviceContainer.scrollTo({
          left: scrollLeft + offset,
          behavior: 'smooth'
        });
      }
    }
  }



  updateServices();

  // Hizmetler scroll animasyonu
  function checkServicesVisibility() {
    const services = document.querySelector('.services');
    if (!services) return;
    const triggerBottom = window.innerHeight * 0.85;
    const servicesTop = services.getBoundingClientRect().top;
    if (servicesTop < triggerBottom) {
      services.classList.add('visible');
    } else {
      services.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', checkServicesVisibility);
  window.addEventListener('load', checkServicesVisibility);

  function enableAosOnResponsive() {
    const items = document.querySelectorAll('.aos-item');
    if (window.innerWidth <= 600) {
      items.forEach((item, i) => {
        const direction = i % 2 === 0 ? 'fade-right' : 'fade-left';
        item.setAttribute('data-aos', direction);
      });
    } else {
      items.forEach(item => {
        item.setAttribute('data-aos', 'fade-up');
      });
    }
    AOS.refresh(); // Mutlaka gerekli!
  }

  window.addEventListener('load', () => {
    enableAosOnResponsive();
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  });
  window.addEventListener('resize', enableAosOnResponsive);

  // AOS başlat
  if (window.AOS) {
    AOS.init({
      duration: 300,
      easing: 'ease-in-out',
      once: true,
      offset: 180,
    });
  }

  // Sayaç animasyonu - görünür olunca başlar
  const countEl = document.querySelector('.count');
  if (countEl) {
    const target = parseInt(countEl.getAttribute('data-target'), 10);
    let count = 0;
    const increment = Math.ceil(target / 100);

    function updateCount() {
      count += increment;
      if (count > target) count = target;
      countEl.textContent = count;
      if (count < target) {
        setTimeout(updateCount, 20);
      }
    }

    // Intersection Observer ile görünürlük kontrolü
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(entry.target); // Bir kere başlat sonra durdur
        }
      });
    }, {
      threshold: 0.1 // %10 görünürlükte başlasın
    });

    observer.observe(countEl);
  }

  // Slider
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  if (leftArrow && rightArrow && slides.length > 0) {
    leftArrow.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
    rightArrow.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    let slideInterval = setInterval(nextSlide, 3000);
    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 3000);
    }
    showSlide(currentSlide);
  }

  // Hizmetler kaydırma (scroll)
  let scrollAmount = 0;
  if (leftArrow && rightArrow && serviceContainer) {
    leftArrow.addEventListener('click', () => {
      scrollAmount -= 300;
      if (scrollAmount < 0) scrollAmount = 0;
      serviceContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    });
    rightArrow.addEventListener('click', () => {
      scrollAmount += 300;
      const maxScrollLeft = serviceContainer.scrollWidth - serviceContainer.clientWidth;
      if (scrollAmount > maxScrollLeft) scrollAmount = maxScrollLeft;
      serviceContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    });
  }
});
