document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var nav = document.querySelector('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  var header = document.querySelector('header');
  var backToTop = document.getElementById('backToTop');

  function onScroll() {
    var scrolled = window.scrollY > 40;
    if (header) {
      header.classList.toggle('scrolled', scrolled);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var track = document.querySelector('.carousel-track');
  var prevBtn = document.querySelector('.carousel-btn.prev');
  var nextBtn = document.querySelector('.carousel-btn.next');

  if (track && prevBtn && nextBtn) {
    var scrollStep = function () {
      var item = track.querySelector('.carousel-item');
      var gap = 24;
      return item ? item.getBoundingClientRect().width + gap : 300;
    };

    var updateButtons = function () {
      var maxScroll = track.scrollWidth - track.clientWidth - 2;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = track.scrollLeft >= maxScroll;
    };

    prevBtn.addEventListener('click', function () {
      track.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', function () {
      track.scrollBy({ left: scrollStep(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  }
});
