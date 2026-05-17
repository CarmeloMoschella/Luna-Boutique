/* ================================================
   LUNA BOUTIQUE — app.js v3
   Depende de: productos.js (variable global `productos`)
   ================================================ */

(function () {
  'use strict';

  /* -----------------------------------------------
     DATOS INSTAGRAM (simulado)
  ----------------------------------------------- */
  var igPosts = [
    { imagen: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', alt: 'Look de temporada' },
    { imagen: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', alt: 'Nueva colección' },
    { imagen: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', alt: 'Accesorios de temporada' },
    { imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Blusas nueva llegada' },
    { imagen: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80', alt: 'Estilo femenino' },
    { imagen: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80', alt: 'Looks casual' },
    { imagen: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', alt: 'Colección pantalones' },
    { imagen: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80', alt: 'Moda Caracas' }
  ];
  var IG_URL = 'https://instagram.com/lunaboutique.ve';
  var WA_NUM = '584121234567';

  /* -----------------------------------------------
     ESTADO
  ----------------------------------------------- */
  var estado = {
    categoriaActiva: 'todos',
    igOffset: 0,
    igVisibles: 2,
    carrito: []        /* [{ producto, talla, cantidad }] */
  };

  /* -----------------------------------------------
     SELECTORES
  ----------------------------------------------- */
  var dom = {
    productosGrid:   document.getElementById('productos-grid'),
    promocionesGrid: document.getElementById('promociones-grid'),
    filtros:         document.getElementById('filtros'),
    igCarrusel:      document.getElementById('ig-carrusel'),
    igDots:          document.getElementById('ig-dots'),
    igPrev:          document.querySelector('.ig-prev'),
    igNext:          document.querySelector('.ig-next'),
    menuToggle:      document.querySelector('.menu-toggle'),
    siteHeader:      document.querySelector('.site-header'),
    navLinks:        document.querySelectorAll('.nav-link'),
    anioActual:      document.getElementById('anio-actual'),
    carritoToggle:   document.getElementById('carrito-toggle'),
    carritoBadge:    document.getElementById('carrito-badge'),
    carritoDrawer:   document.getElementById('carrito-drawer'),
    carritoOverlay:  document.getElementById('carrito-overlay'),
    carritoCerrar:   document.getElementById('carrito-cerrar'),
    carritoLista:    document.getElementById('carrito-lista'),
    carritoVacio:    document.getElementById('carrito-vacio'),
    carritoFooter:   document.getElementById('carrito-footer'),
    carritoTotal:    document.getElementById('carrito-total'),
    carritoEnviar:   document.getElementById('carrito-enviar'),
    carritoVaciar:   document.getElementById('carrito-vaciar')
  };

  /* ================================================
     INIT
  ================================================ */
  function init() {
    actualizarAnio();
    construirMenuMovil();
    construirFiltros();
    renderProductos();
    renderPromociones();
    renderIgCarrusel();
    iniciarMenuMovil();
    iniciarNavActiva();
    iniciarCarruselIG();
    iniciarCarrito();
    actualizarVisiblesPorBreakpoint();
    window.addEventListener('resize', actualizarVisiblesPorBreakpoint);
  }

  /* ================================================
     UTILIDADES
  ================================================ */
  function actualizarAnio() {
    if (dom.anioActual) dom.anioActual.textContent = new Date().getFullYear();
  }

  function fmt(n) { return '$' + Number(n).toFixed(2); }

  function esc(str) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  }

  function svgWA(sz) {
    sz = sz || 14;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + sz + '" height="' + sz + '" fill="currentColor" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>' +
      '<path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.882a.5.5 0 0 0 .612.612l6.09-1.464A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-4.994-1.366l-.358-.213-3.716.894.91-3.641-.234-.374A9.818 9.818 0 1 1 12 21.818z"/>' +
      '</svg>';
  }

  function capitalizar(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

  /* ================================================
     MENÚ MÓVIL
  ================================================ */
  function construirMenuMovil() {
    var nav = document.createElement('nav');
    nav.className = 'nav-movil';
    nav.id = 'nav-movil';
    nav.setAttribute('aria-label', 'Menú móvil');
    var ul = document.createElement('ul');
    ul.className = 'nav-lista';
    [
      { texto: 'Catálogo',    href: '#catalogo' },
      { texto: 'Promociones', href: '#promociones' },
      { texto: 'Instagram',   href: '#instagram' },
      { texto: 'Visítanos',   href: '#ubicacion' },
      { texto: 'Contacto',    href: '#contacto' }
    ].forEach(function (item) {
      var li = document.createElement('li');
      var a  = document.createElement('a');
      a.href = item.href; a.className = 'nav-link'; a.textContent = item.texto;
      a.addEventListener('click', cerrarMenu);
      li.appendChild(a); ul.appendChild(li);
    });
    nav.appendChild(ul);
    dom.siteHeader.insertAdjacentElement('afterend', nav);
    dom.navMovil = nav;
  }

  function iniciarMenuMovil() {
    if (!dom.menuToggle) return;
    dom.menuToggle.addEventListener('click', function () {
      dom.navMovil.classList.contains('visible') ? cerrarMenu() : abrirMenu();
    });
    document.addEventListener('click', function (e) {
      if (dom.navMovil && dom.navMovil.classList.contains('visible') &&
          !dom.navMovil.contains(e.target) && !dom.siteHeader.contains(e.target)) cerrarMenu();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { cerrarMenu(); cerrarCarrito(); } });
  }

  function abrirMenu() { dom.navMovil.classList.add('visible'); dom.siteHeader.classList.add('menu-abierto'); dom.menuToggle.setAttribute('aria-expanded', 'true'); }
  function cerrarMenu() { if (!dom.navMovil) return; dom.navMovil.classList.remove('visible'); dom.siteHeader.classList.remove('menu-abierto'); dom.menuToggle && dom.menuToggle.setAttribute('aria-expanded', 'false'); }

  /* ================================================
     NAV ACTIVA
  ================================================ */
  function iniciarNavActiva() {
    var secciones = document.querySelectorAll('main section[id]');
    function marcar() {
      var y = window.scrollY + 120;
      secciones.forEach(function (s) {
        if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
          dom.navLinks.forEach(function (l) { l.classList.toggle('activo', l.getAttribute('href') === '#' + s.id); });
        }
      });
    }
    window.addEventListener('scroll', marcar, { passive: true });
    marcar();
  }

  /* ================================================
     FILTROS
  ================================================ */
  function construirFiltros() {
    if (!dom.filtros) return;
    var cats = ['todos'];
    productos.forEach(function (p) { if (cats.indexOf(p.categoria) === -1) cats.push(p.categoria); });
    var etq = { todos: 'Todos', vestidos: 'Vestidos', blusas: 'Blusas', pantalones: 'Pantalones', accesorios: 'Accesorios' };
    cats.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.className = 'filtro-btn' + (cat === 'todos' ? ' activo' : '');
      btn.textContent = etq[cat] || cat;
      btn.setAttribute('data-categoria', cat);
      btn.setAttribute('aria-pressed', cat === 'todos' ? 'true' : 'false');
      btn.addEventListener('click', function () {
        estado.categoriaActiva = cat;
        dom.filtros.querySelectorAll('.filtro-btn').forEach(function (b) {
          var es = b.getAttribute('data-categoria') === cat;
          b.classList.toggle('activo', es);
          b.setAttribute('aria-pressed', es ? 'true' : 'false');
        });
        renderProductos();
      });
      dom.filtros.appendChild(btn);
    });
  }

  /* ================================================
     RENDER PRODUCTOS
  ================================================ */
  function renderProductos() {
    if (!dom.productosGrid) return;
    var filtrados = productos.filter(function (p) {
      return estado.categoriaActiva === 'todos' || p.categoria === estado.categoriaActiva;
    });
    dom.productosGrid.innerHTML = '';
    if (!filtrados.length) {
      var msg = document.createElement('p');
      msg.className = 'sin-resultados'; msg.textContent = 'No hay productos en esta categoría.';
      dom.productosGrid.appendChild(msg); return;
    }
    filtrados.forEach(function (p) { dom.productosGrid.appendChild(crearTarjeta(p)); });
  }

  /* Construye la tarjeta de producto con galería + tallas + carrito */
  function crearTarjeta(p) {
    var article = document.createElement('article');
    article.className = 'producto-card';
    article.setAttribute('role', 'listitem');

    /* --- GALERÍA MULTI-FOTO --- */
    var galeria = document.createElement('div');
    galeria.className = 'producto-galeria';

    var track = document.createElement('div');
    track.className = 'producto-galeria-track';

    var imgs = p.imagenes && p.imagenes.length ? p.imagenes : [p.imagen];
    var fotoActual = 0;

    imgs.forEach(function (src, i) {
      var img = document.createElement('img');
      img.src     = src;
      img.alt     = esc(p.nombre) + (i > 0 ? ' — vista ' + (i + 1) : '');
      img.loading = 'lazy';
      img.onerror = function () { this.src = 'https://placehold.co/600x800/f5eded/C9A4A4?text=Luna'; };
      track.appendChild(img);
    });
    galeria.appendChild(track);

    /* Dots de la galería */
    var gDots = document.createElement('div');
    gDots.className = 'producto-galeria-dots';
    imgs.forEach(function (_, i) {
      var d = document.createElement('span');
      d.className = 'galeria-dot' + (i === 0 ? ' activo' : '');
      gDots.appendChild(d);
    });
    if (imgs.length > 1) galeria.appendChild(gDots);

    /* Flechas (solo si hay más de 1 imagen) */
    function irFoto(dir) {
      fotoActual = (fotoActual + dir + imgs.length) % imgs.length;
      track.style.transform = 'translateX(-' + (fotoActual * 100) + '%)';
      gDots.querySelectorAll('.galeria-dot').forEach(function (d, i) { d.classList.toggle('activo', i === fotoActual); });
    }

    if (imgs.length > 1) {
      var prev = document.createElement('button');
      prev.className = 'galeria-prev'; prev.innerHTML = '&#8592;'; prev.setAttribute('aria-label', 'Foto anterior');
      prev.addEventListener('click', function (e) { e.stopPropagation(); irFoto(-1); });

      var next = document.createElement('button');
      next.className = 'galeria-next'; next.innerHTML = '&#8594;'; next.setAttribute('aria-label', 'Foto siguiente');
      next.addEventListener('click', function (e) { e.stopPropagation(); irFoto(1); });

      galeria.appendChild(prev);
      galeria.appendChild(next);
    }

    /* Swipe touch en la galería */
    var touchStartX = 0;
    galeria.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    galeria.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) irFoto(diff > 0 ? 1 : -1);
    });

    article.appendChild(galeria);

    /* --- INFO --- */
    var info = document.createElement('div');
    info.className = 'producto-info';

    if (p.enOferta) {
      var badge = document.createElement('span');
      badge.className = 'producto-badge'; badge.textContent = 'Oferta';
      info.appendChild(badge);
    }

    var cat = document.createElement('p');
    cat.className = 'producto-categoria'; cat.textContent = capitalizar(p.categoria);
    info.appendChild(cat);

    var nombre = document.createElement('h3');
    nombre.className = 'producto-nombre'; nombre.textContent = p.nombre;
    info.appendChild(nombre);

    var desc = document.createElement('p');
    desc.className = 'producto-descripcion'; desc.textContent = p.descripcion;
    info.appendChild(desc);

    /* --- TALLAS --- */
    var tallas = p.tallas && p.tallas.length ? p.tallas : [];
    var tallaSeleccionada = tallas.length === 1 ? tallas[0] : null;

    if (tallas.length) {
      var tallasWrap = document.createElement('div');
      tallasWrap.className = 'producto-tallas';

      tallas.forEach(function (t) {
        var chip = document.createElement('button');
        chip.className = 'talla-chip' + (t === tallaSeleccionada ? ' seleccionada' : '');
        chip.textContent = t;
        chip.setAttribute('aria-label', 'Talla ' + t);
        chip.addEventListener('click', function () {
          tallaSeleccionada = t;
          tallasWrap.querySelectorAll('.talla-chip').forEach(function (c) { c.classList.toggle('seleccionada', c.textContent === t); });
        });
        tallasWrap.appendChild(chip);
      });
      info.appendChild(tallasWrap);
    }

    /* --- PRECIOS --- */
    var precios = document.createElement('div');
    precios.className = 'producto-precios';
    if (p.enOferta && p.precioOriginal) {
      var orig = document.createElement('span');
      orig.className = 'producto-precio-original'; orig.textContent = fmt(p.precioOriginal);
      precios.appendChild(orig);
    }
    var precio = document.createElement('span');
    precio.className = 'producto-precio'; precio.textContent = fmt(p.precio);
    precios.appendChild(precio);
    info.appendChild(precios);

    /* --- BOTONES DE ACCIÓN --- */
    var acciones = document.createElement('div');
    acciones.className = 'producto-acciones';

    /* Botón "Lo quiero" → agrega al carrito */
    var btnCarrito = document.createElement('button');
    btnCarrito.className = 'btn btn-wa-card';
    btnCarrito.innerHTML = svgWA(13) + 'Lo quiero';
    btnCarrito.addEventListener('click', function () {
      var talla = tallaSeleccionada || (tallas.length ? tallas[0] : 'Única');
      agregarAlCarrito(p, talla);
    });
    acciones.appendChild(btnCarrito);

    info.appendChild(acciones);
    article.appendChild(info);
    return article;
  }

  /* ================================================
     RENDER PROMOCIONES (con foto)
  ================================================ */
  function renderPromociones() {
    if (!dom.promocionesGrid) return;
    var oferta = productos.filter(function (p) { return p.enOferta; });
    dom.promocionesGrid.innerHTML = '';
    if (!oferta.length) {
      var msg = document.createElement('p');
      msg.className = 'sin-resultados'; msg.textContent = 'No hay promociones activas.';
      dom.promocionesGrid.appendChild(msg); return;
    }
    oferta.forEach(function (p) { dom.promocionesGrid.appendChild(crearTarjetaPromo(p)); });
  }

  function crearTarjetaPromo(p) {
    var pct = Math.round(((p.precioOriginal - p.precio) / p.precioOriginal) * 100);

    var article = document.createElement('article');
    article.className = 'promo-card';
    article.setAttribute('role', 'listitem');

    /* Foto del producto (primera imagen) */
    var img = document.createElement('img');
    img.className = 'promo-imagen';
    img.src     = p.imagenes ? p.imagenes[0] : p.imagen;
    img.alt     = esc(p.nombre);
    img.loading = 'lazy';
    img.onerror = function () { this.src = 'https://placehold.co/800x450/f5eded/C9A4A4?text=Luna+Boutique'; };
    article.appendChild(img);

    /* Cuerpo */
    var body = document.createElement('div');
    body.className = 'promo-body';

    var titulo = document.createElement('h3'); titulo.className = 'promo-titulo'; titulo.textContent = p.nombre;
    var desc   = document.createElement('p');  desc.className   = 'promo-descripcion'; desc.textContent = p.descripcion;
    var precios = document.createElement('p');
    precios.innerHTML = '<span class="producto-precio-original">' + fmt(p.precioOriginal) + '</span><span class="producto-precio">' + fmt(p.precio) + '</span>';
    var pctEl = document.createElement('p'); pctEl.className = 'promo-descuento'; pctEl.textContent = pct + '% de descuento';

    var btn = document.createElement('button');
    btn.className = 'btn btn-wa-card';
    btn.innerHTML = svgWA(13) + 'Lo quiero';
    btn.addEventListener('click', function () {
      var talla = p.tallas && p.tallas.length ? p.tallas[0] : 'Única';
      agregarAlCarrito(p, talla);
    });

    body.appendChild(titulo);
    body.appendChild(desc);
    body.appendChild(precios);
    body.appendChild(pctEl);
    body.appendChild(btn);
    article.appendChild(body);
    return article;
  }

  /* ================================================
     CARRITO
  ================================================ */
  function iniciarCarrito() {
    if (dom.carritoToggle)  dom.carritoToggle.addEventListener('click', abrirCarrito);
    if (dom.carritoCerrar)  dom.carritoCerrar.addEventListener('click', cerrarCarrito);
    if (dom.carritoOverlay) dom.carritoOverlay.addEventListener('click', cerrarCarrito);
    if (dom.carritoVaciar)  dom.carritoVaciar.addEventListener('click', vaciarCarrito);
    actualizarBadge();
    actualizarFooterCarrito();
  }

  function abrirCarrito() {
    dom.carritoDrawer.classList.add('abierto');
    dom.carritoDrawer.setAttribute('aria-hidden', 'false');
    dom.carritoOverlay.classList.add('visible');
    dom.carritoOverlay.setAttribute('aria-hidden', 'false');
    dom.carritoToggle && dom.carritoToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function cerrarCarrito() {
    dom.carritoDrawer.classList.remove('abierto');
    dom.carritoDrawer.setAttribute('aria-hidden', 'true');
    dom.carritoOverlay.classList.remove('visible');
    dom.carritoOverlay.setAttribute('aria-hidden', 'true');
    dom.carritoToggle && dom.carritoToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function agregarAlCarrito(producto, talla) {
    /* Busca si ya existe el mismo producto+talla */
    var existente = null;
    estado.carrito.forEach(function (item) {
      if (item.producto.id === producto.id && item.talla === talla) existente = item;
    });

    if (existente) {
      existente.cantidad += 1;
    } else {
      estado.carrito.push({ producto: producto, talla: talla, cantidad: 1 });
    }

    actualizarBadge();
    renderCarritoLista();
    actualizarFooterCarrito();
    generarEnlaceWA();

    /* Abrir el drawer y animar el badge */
    abrirCarrito();
    if (dom.carritoBadge) {
      dom.carritoBadge.classList.remove('pulso');
      void dom.carritoBadge.offsetWidth; /* reflow para reiniciar animación */
      dom.carritoBadge.classList.add('pulso');
    }
  }

  function eliminarDelCarrito(idx) {
    estado.carrito.splice(idx, 1);
    actualizarBadge();
    renderCarritoLista();
    actualizarFooterCarrito();
    generarEnlaceWA();
  }

  function vaciarCarrito() {
    estado.carrito = [];
    actualizarBadge();
    renderCarritoLista();
    actualizarFooterCarrito();
    generarEnlaceWA();
  }

  function actualizarBadge() {
    var total = estado.carrito.reduce(function (acc, i) { return acc + i.cantidad; }, 0);
    if (dom.carritoBadge) dom.carritoBadge.textContent = total;
  }

  function renderCarritoLista() {
    if (!dom.carritoLista) return;
    dom.carritoLista.innerHTML = '';

    if (!estado.carrito.length) {
      /* Estado vacío */
      var vacio = document.createElement('li');
      vacio.className = 'carrito-vacio';
      vacio.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#e8e0dc"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 5.9 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.45 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>' +
        '<p>Tu carrito está vacío.<br/>Agrega productos con "Lo quiero".</p>';
      dom.carritoLista.appendChild(vacio);
      return;
    }

    estado.carrito.forEach(function (item, idx) {
      var li = document.createElement('li');
      li.className = 'carrito-item';

      var img = document.createElement('img');
      img.className = 'carrito-item-img';
      img.src     = item.producto.imagenes ? item.producto.imagenes[0] : item.producto.imagen;
      img.alt     = esc(item.producto.nombre);
      img.onerror = function () { this.className += ' carrito-item-img-error'; this.style.display = 'none'; };

      var infoDiv = document.createElement('div');
      infoDiv.className = 'carrito-item-info';

      var nombreEl = document.createElement('p');
      nombreEl.className = 'carrito-item-nombre'; nombreEl.textContent = item.producto.nombre;

      var tallaEl = document.createElement('p');
      tallaEl.className = 'carrito-item-talla';
      tallaEl.textContent = 'Talla: ' + item.talla + (item.cantidad > 1 ? ' · x' + item.cantidad : '');

      var precioEl = document.createElement('p');
      precioEl.className = 'carrito-item-precio';
      precioEl.textContent = fmt(item.producto.precio * item.cantidad);

      infoDiv.appendChild(nombreEl);
      infoDiv.appendChild(tallaEl);
      infoDiv.appendChild(precioEl);

      var eliminarBtn = document.createElement('button');
      eliminarBtn.className = 'carrito-item-eliminar';
      eliminarBtn.setAttribute('aria-label', 'Eliminar ' + item.producto.nombre);
      eliminarBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
      (function (i) { eliminarBtn.addEventListener('click', function () { eliminarDelCarrito(i); }); })(idx);

      li.appendChild(img);
      li.appendChild(infoDiv);
      li.appendChild(eliminarBtn);
      dom.carritoLista.appendChild(li);
    });
  }

  function actualizarFooterCarrito() {
    if (!dom.carritoFooter) return;
    var tiene = estado.carrito.length > 0;
    dom.carritoFooter.classList.toggle('oculto', !tiene);

    if (!tiene) return;

    var totalPrecio = estado.carrito.reduce(function (acc, i) { return acc + i.producto.precio * i.cantidad; }, 0);
    if (dom.carritoTotal) dom.carritoTotal.textContent = fmt(totalPrecio);
  }

  /* Genera el enlace de WhatsApp con todos los productos del carrito */
  function generarEnlaceWA() {
    if (!dom.carritoEnviar || !estado.carrito.length) return;

    var lineas = ['¡Hola! Me interesa realizar el siguiente pedido en Luna Boutique:\n'];
    estado.carrito.forEach(function (item, i) {
      lineas.push(
        (i + 1) + '. ' + item.producto.nombre +
        ' | Talla: ' + item.talla +
        ' | Cant: ' + item.cantidad +
        ' | Precio: ' + fmt(item.producto.precio * item.cantidad)
      );
    });
    var total = estado.carrito.reduce(function (acc, i) { return acc + i.producto.precio * i.cantidad; }, 0);
    lineas.push('\nTotal estimado: ' + fmt(total));
    lineas.push('\n¿Pueden confirmar disponibilidad y precio final?');

    var mensaje = encodeURIComponent(lineas.join('\n'));
    dom.carritoEnviar.href = 'https://wa.me/' + WA_NUM + '?text=' + mensaje;
  }

  /* ================================================
     INSTAGRAM CARRUSEL (mejorado)
  ================================================ */
  function renderIgCarrusel() {
    if (!dom.igCarrusel) return;

    /* Estructura: ig-carrusel-clip > ig-carrusel */
    var clip = document.createElement('div');
    clip.className = 'ig-carrusel-clip';

    /* Mover el carrusel dentro del clip */
    dom.igCarrusel.parentNode.insertBefore(clip, dom.igCarrusel);
    clip.appendChild(dom.igCarrusel);
    dom.igClip = clip;

    dom.igCarrusel.innerHTML = '';

    /* Rellenar con suficientes posts para que no queden huecos al navegar */
    /* Duplicamos el array si es necesario para tener mínimo igPosts.length + igVisibles items */
    var pool = igPosts.slice();
    while (pool.length < igPosts.length + 4) { pool = pool.concat(igPosts); }

    pool.forEach(function (post) {
      var a = document.createElement('a');
      a.className = 'ig-post';
      a.href   = IG_URL;
      a.target = '_blank';
      a.rel    = 'noopener noreferrer';
      a.setAttribute('aria-label', post.alt + ' — ver en Instagram');

      var img = document.createElement('img');
      img.src = post.imagen; img.alt = post.alt; img.loading = 'lazy';
      img.onerror = function () { this.src = 'https://placehold.co/600x600/f5eded/C9A4A4?text=@lunaboutique.ve'; };

      var overlay = document.createElement('div');
      overlay.className = 'ig-post-overlay';
      overlay.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>';

      a.appendChild(img);
      a.appendChild(overlay);
      dom.igCarrusel.appendChild(a);
    });

    renderIgDots();
    moverIG(0, false);
  }

  function renderIgDots() {
    if (!dom.igDots) return;
    dom.igDots.innerHTML = '';
    /* Dots representan los posts originales (sin duplicados) */
    igPosts.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'ig-dot' + (i === 0 ? ' activo' : '');
      dot.setAttribute('aria-label', 'Post ' + (i + 1));
      (function (idx) { dot.addEventListener('click', function () { moverIG(idx, true); }); })(i);
      dom.igDots.appendChild(dot);
    });
  }

  function moverIG(idx, animado) {
    estado.igOffset = Math.max(0, Math.min(idx, igPosts.length - 1));

    /* Calcular el ancho de un post + gap */
    var posts = dom.igCarrusel.querySelectorAll('.ig-post');
    if (!posts.length) return;

    var postW = posts[0].offsetWidth;
    var gap   = 16; /* --espacio-sm */
    var traslado = estado.igOffset * (postW + gap);

    if (!animado) dom.igCarrusel.style.transition = 'none';
    dom.igCarrusel.style.transform = 'translateX(-' + traslado + 'px)';
    if (!animado) {
      void dom.igCarrusel.offsetHeight; /* reflow */
      dom.igCarrusel.style.transition = '';
    }

    /* Actualizar dots */
    if (dom.igDots) {
      dom.igDots.querySelectorAll('.ig-dot').forEach(function (d, i) { d.classList.toggle('activo', i === estado.igOffset); });
    }

    /* Botones */
    if (dom.igPrev) dom.igPrev.disabled = estado.igOffset === 0;
    if (dom.igNext) dom.igNext.disabled = estado.igOffset >= igPosts.length - 1;
  }

  function iniciarCarruselIG() {
    if (dom.igPrev) dom.igPrev.addEventListener('click', function () { moverIG(estado.igOffset - 1, true); });
    if (dom.igNext) dom.igNext.addEventListener('click', function () { moverIG(estado.igOffset + 1, true); });

    /* Swipe touch en el carrusel de IG */
    var tsX = 0, tsTime = 0;
    if (dom.igCarrusel) {
      dom.igCarrusel.addEventListener('touchstart', function (e) {
        tsX = e.touches[0].clientX;
        tsTime = Date.now();
        dom.igCarrusel.classList.add('arrastrando');
      }, { passive: true });

      dom.igCarrusel.addEventListener('touchend', function (e) {
        var diff = tsX - e.changedTouches[0].clientX;
        var dt   = Date.now() - tsTime;
        dom.igCarrusel.classList.remove('arrastrando');
        /* Umbral: >30px o gesto rápido */
        if (Math.abs(diff) > 30 || (Math.abs(diff) > 10 && dt < 200)) {
          moverIG(estado.igOffset + (diff > 0 ? 1 : -1), true);
        }
      });

      /* Drag mouse (desktop) */
      var mouseDown = false, mouseStartX = 0, mouseDiff = 0;
      dom.igCarrusel.addEventListener('mousedown', function (e) {
        mouseDown = true; mouseStartX = e.clientX; mouseDiff = 0;
        dom.igCarrusel.classList.add('arrastrando');
      });
      document.addEventListener('mousemove', function (e) {
        if (!mouseDown) return;
        mouseDiff = mouseStartX - e.clientX;
      });
      document.addEventListener('mouseup', function () {
        if (!mouseDown) return;
        mouseDown = false;
        dom.igCarrusel.classList.remove('arrastrando');
        if (Math.abs(mouseDiff) > 50) moverIG(estado.igOffset + (mouseDiff > 0 ? 1 : -1), true);
      });

      /* Cancelar click en links al terminar un drag */
      dom.igCarrusel.addEventListener('click', function (e) {
        if (Math.abs(mouseDiff) > 10) e.preventDefault();
      });
    }
  }

  function actualizarVisiblesPorBreakpoint() {
    var w = window.innerWidth;
    var nuevos = w >= 1024 ? 4 : w >= 640 ? 3 : 2;
    if (nuevos !== estado.igVisibles) {
      estado.igVisibles = nuevos;
      moverIG(estado.igOffset, false);
    }
  }

  /* ================================================
     ARRANQUE
  ================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();