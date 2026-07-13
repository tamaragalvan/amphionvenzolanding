/* BICICLETA AMPHION - INTERACTIVIDAD Y ANIMACIONES (VANILLA JS) */

document.addEventListener('DOMContentLoaded', () => {
  // === 1. MENÚ MÓVIL ===
  const header = document.querySelector('.main-header');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      header.classList.toggle('nav-open');
    });

    // Cerrar el menú al hacer clic en los enlaces
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
      });
    });
  }

  // === 2. ANIMACIONES AL HACER SCROLL (SCROLL REVEAL) ===
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Una vez revelado, dejamos de observarlo para rendimiento
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // === 3. DIAGRAMA INTERACTIVO CON HOTSPOTS ===
  const hotspots = document.querySelectorAll('.diagram-hotspot');
  const callouts = document.querySelectorAll('.diagram-callout');

  // Función para cerrar todas las ventanas de información (callouts) y desactivar hotspots
  const deactivateAllHotspots = () => {
    hotspots.forEach(dot => dot.classList.remove('active'));
    callouts.forEach(box => box.classList.remove('expanded'));
  };

  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = hotspot.getAttribute('data-target');
      const targetCallout = document.getElementById(targetId);
      
      const isAlreadyExpanded = targetCallout.classList.contains('expanded');
      
      deactivateAllHotspots();
      
      if (!isAlreadyExpanded) {
        hotspot.classList.add('active');
        targetCallout.classList.add('expanded');
      }
    });
  });

  // Permitir clic en el header de la tarjeta informativa para expandir/colapsar (útil para móvil y desktop)
  callouts.forEach(callout => {
    const header = callout.querySelector('.diagram-callout-header');
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = callout.classList.contains('expanded');
      const targetDotId = callout.getAttribute('data-target');
      const associatedDot = document.getElementById(targetDotId);
      
      deactivateAllHotspots();
      
      if (!isExpanded) {
        callout.classList.add('expanded');
        if (associatedDot) {
          associatedDot.classList.add('active');
        }
      }
    });
  });

  // Cerrar hotspots al hacer clic fuera del diagrama
  document.addEventListener('click', () => {
    // Solo en pantallas donde no estén en modo estático/móvil
    if (window.innerWidth > 768) {
      deactivateAllHotspots();
    }
  });

  // === 4. CARRUSEL DE PERSONALIZACIÓN ===
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextBtn = document.getElementById('carousel-btn-next');
  const prevBtn = document.getElementById('carousel-btn-prev');
  const dotsContainer = document.querySelector('.carousel-indicators');
  
  if (track && slides.length > 0) {
    let currentIndex = 0;
    
    // Crear indicadores dinámicos (dots) si no existen
    if (dotsContainer && dotsContainer.children.length === 0) {
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('data-index', index);
        dot.setAttribute('aria-label', `Ir a diapositiva ${index + 1}`);
        dotsContainer.appendChild(dot);
      });
    }
    
    const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));
    
    const updateCarousel = (index) => {
      // Ajustar límites de índice
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      
      // Mover el track
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Cambiar clases activas en slides
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      
      // Cambiar clases activas en dots
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
      });
    }
    
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        updateCarousel(index);
      });
    });
  }

  // === 5. ACORDEÓN DE FAQ ===
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Cerrar todos los demás
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Si no estaba activo, abrirlo
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // === 6. SELECTOR DE COLORES DE LA BICICLETA ===
  const colorDots = document.querySelectorAll('.color-dot');
  const colorsCard = document.querySelector('.colors-card');
  const colorNameText = document.getElementById('color-name-text');
  const colorGlow = document.getElementById('color-glow-indicator');
  
  const colorNames = {
    red: 'Rojo Corsa',
    gray: 'Gris Grafito',
    pink: 'Rosa Fucsia',
    lime: 'Verde Limón'
  };
  
  const colorGlows = {
    red: 'radial-gradient(circle, rgba(230, 0, 0, 0.25) 0%, transparent 70%)',
    gray: 'radial-gradient(circle, rgba(140, 140, 140, 0.25) 0%, transparent 70%)',
    pink: 'radial-gradient(circle, rgba(255, 0, 127, 0.25) 0%, transparent 70%)',
    lime: 'radial-gradient(circle, rgba(204, 255, 0, 0.2) 0%, transparent 70%)'
  };

  if (colorDots.length > 0 && colorsCard) {
    colorDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const color = dot.getAttribute('data-color');
        
        // Desactivar todos los puntos
        colorDots.forEach(d => d.classList.remove('active'));
        // Activar punto actual
        dot.classList.add('active');
        
        // Cambiar clases del card para cambiar fondo gradiente
        colorsCard.classList.remove('color-red', 'color-gray', 'color-pink', 'color-lime');
        colorsCard.classList.add(`color-${color}`);
        
        // Cambiar el nombre del color
        if (colorNameText) {
          colorNameText.textContent = colorNames[color];
        }
        
        // Cambiar el color del brillo de fondo de la bici
        if (colorGlow) {
          colorGlow.style.background = colorGlows[color];
        }
        
        // Cambiar la imagen de la bici activa
        const bikeImages = document.querySelectorAll('.colors-bike-img');
        bikeImages.forEach(img => img.classList.remove('active'));
        
        const activeImg = document.getElementById(`color-bike-img-${color}`);
        if (activeImg) {
          activeImg.classList.add('active');
        }
      });
    });
  }

  // === 7. INTERACTIVE EDITORIAL FEATURE GRID (70/30 Layout) ===
  const editorialGrid = document.querySelector('.editorial-grid');
  const editorialCards = document.querySelectorAll('.editorial-card');
  
  if (editorialGrid && editorialCards.length > 0) {
    editorialCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Remover active de todas las tarjetas
        editorialCards.forEach(c => c.classList.remove('active'));
        // Agregar active a la tarjeta sobre la que está el mouse
        card.classList.add('active');
        
        // Cambiar la clase de enfoque en el contenedor grid
        editorialGrid.classList.remove('focus-featured', 'focus-drivetrain', 'focus-structure');
        const cardType = card.getAttribute('data-card');
        editorialGrid.classList.add(`focus-${cardType}`);
      });
    });
    
    // Al salir del grid, restablecer al destacado por defecto (Amphion)
    editorialGrid.addEventListener('mouseleave', () => {
      editorialCards.forEach(c => c.classList.remove('active'));
      const featuredCard = document.getElementById('card-featured');
      if (featuredCard) {
        featuredCard.classList.add('active');
      }
      editorialGrid.classList.remove('focus-featured', 'focus-drivetrain', 'focus-structure');
      editorialGrid.classList.add('focus-featured');
    });
  }

  // === 8. BOTÓN VOLVER ARRIBA (FOOTER) ===
  const scrollTopBtn = document.getElementById('scroll-to-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === 9. CONTADOR NUMÉRICO EN SECCIÓN MÉTRICAS ===
  const counterElements = document.querySelectorAll('.counter-value');
  
  if (counterElements.length > 0) {
    const runCounter = (el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const start = target > 1000 ? target - 300 : 0; // Para números grandes como 6061, empezamos más cerca
      const duration = 1800; // 1.8 segundos
      let startTime = null;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing out quadratic
        const easeProgress = progress * (2 - progress);
        
        const currentValue = Math.floor(easeProgress * (target - start) + start);
        if (suffix) {
          const suffixClass = suffix === '"' ? 'metric-suffix metric-suffix--full-size' : 'metric-suffix';
          el.innerHTML = currentValue + '<span class="' + suffixClass + '">' + suffix + '</span>';
        } else {
          el.textContent = currentValue;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          if (suffix) {
            const endSuffixClass = suffix === '"' ? 'metric-suffix metric-suffix--full-size' : 'metric-suffix';
            el.innerHTML = target + '<span class="' + endSuffixClass + '">' + suffix + '</span>';
          } else {
            el.textContent = target;
          }
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    // Observer para iniciar la animación cuando el elemento sea visible
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          runCounter(el);
          observer.unobserve(el); // Solo se anima una vez
        }
      });
    }, {
      threshold: 0.35 // Se activa cuando el 35% del elemento es visible
    });
    
    counterElements.forEach(el => {
      // Inicializar en el valor de inicio antes de que comience a animar
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const start = target > 1000 ? target - 300 : 0;
      if (suffix) {
        const initSuffixClass = suffix === '"' ? 'metric-suffix metric-suffix--full-size' : 'metric-suffix';
        el.innerHTML = start + '<span class="' + initSuffixClass + '">' + suffix + '</span>';
      } else {
        el.textContent = start;
      }
      
      counterObserver.observe(el);
    });
  }
});
