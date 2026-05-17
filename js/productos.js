/* ================================================
   LUNA BOUTIQUE — productos.js
   Cada producto tiene:
   - imagenes[]: array de fotos (mínimo 2, idealmente 3-4)
   - tallas[]:   array de strings con tallas disponibles
   - imagen:     alias a imagenes[0] para compatibilidad
   ================================================ */

var productos = [

  /* ---------- VESTIDOS ---------- */
  {
    id: 1,
    nombre: "Vestido Noche de Gardenia",
    categoria: "vestidos",
    precio: 48,
    precioOriginal: null,
    enOferta: false,
    imagenes: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
      "https://images.unsplash.com/photo-1566479179817-5ad4e78b3b3c?w=600&q=80",
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80"
    ],
    tallas: ["XS", "S", "M", "L"],
    descripcion: "Vestido midi floral de gasa, ideal para eventos al aire libre.",
    whatsapp: "584121234567"
  },
  {
    id: 2,
    nombre: "Vestido Silueta Luna",
    categoria: "vestidos",
    precio: 35,
    precioOriginal: 52,
    enOferta: true,
    imagenes: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80"
    ],
    tallas: ["S", "M", "L", "XL"],
    descripcion: "Vestido entallado de lino crudo con escote en V, corte A.",
    whatsapp: "584121234567"
  },
  {
    id: 3,
    nombre: "Vestido Tarde en Positano",
    categoria: "vestidos",
    precio: 42,
    precioOriginal: null,
    enOferta: false,
    imagenes: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
    ],
    tallas: ["XS", "S", "M"],
    descripcion: "Vestido veraniego con tirantes finos y estampado mediterráneo.",
    whatsapp: "584121234567"
  },

  /* ---------- BLUSAS ---------- */
  {
    id: 4,
    nombre: "Blusa Brisa de Seda",
    categoria: "blusas",
    precio: 22,
    precioOriginal: null,
    enOferta: false,
    imagenes: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80",
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80"
    ],
    tallas: ["XS", "S", "M", "L", "XL"],
    descripcion: "Blusa suelta de satén marfil con manga larga y cuello lazada.",
    whatsapp: "584121234567"
  },
  {
    id: 5,
    nombre: "Blusa Coral del Caribe",
    categoria: "blusas",
    precio: 18,
    precioOriginal: 28,
    enOferta: true,
    imagenes: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80"
    ],
    tallas: ["S", "M", "L"],
    descripcion: "Blusa off-shoulder en tonos coral con bordado en el escote.",
    whatsapp: "584121234567"
  },
  {
    id: 6,
    nombre: "Blusa Minimal Blanche",
    categoria: "blusas",
    precio: 16,
    precioOriginal: null,
    enOferta: false,
    imagenes: [
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80"
    ],
    tallas: ["XS", "S", "M", "L", "XL", "XXL"],
    descripcion: "Blusa básica de algodón pima blanca, cuello redondo, corte recto.",
    whatsapp: "584121234567"
  },

  /* ---------- PANTALONES ---------- */
  {
    id: 7,
    nombre: "Pantalón Palazzo Ébano",
    categoria: "pantalones",
    precio: 38,
    precioOriginal: null,
    enOferta: false,
    imagenes: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4e39?w=600&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80"
    ],
    tallas: ["S", "M", "L", "XL"],
    descripcion: "Pantalón palazzo negro de tiro alto, caída fluida en crepe.",
    whatsapp: "584121234567"
  },
  {
    id: 8,
    nombre: "Jean Escultor Clásico",
    categoria: "pantalones",
    precio: 45,
    precioOriginal: null,
    enOferta: false,
    imagenes: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4e39?w=600&q=80"
    ],
    tallas: ["28", "30", "32", "34", "36"],
    descripcion: "Jean de tiro alto con efecto push-up y lavado medio.",
    whatsapp: "584121234567"
  },
  {
    id: 9,
    nombre: "Pantalón Lino Capri",
    categoria: "pantalones",
    precio: 28,
    precioOriginal: 40,
    enOferta: true,
    imagenes: [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80"
],
    tallas: ["S", "M", "L", "XL"],
    descripcion: "Pantalón capri de lino beige, ligero y fresco para el día.",
    whatsapp: "584121234567"
  },

  /* ---------- ACCESORIOS ---------- */
  {
    id: 10,
    nombre: "Cartera Soleil Nude",
    categoria: "accesorios",
    precio: 32,
    precioOriginal: null,
    enOferta: false,
    imagenes: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80"
    ],
    tallas: ["Única"],
    descripcion: "Cartera estructurada color nude con cadena dorada desmontable.",
    whatsapp: "584121234567"
  },
  {
    id: 11,
    nombre: "Cinturón Trenza Toscana",
    categoria: "accesorios",
    precio: 14,
    precioOriginal: null,
    enOferta: false,
    imagenes: [
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80"
],
    tallas: ["S/M", "L/XL"],
    descripcion: "Cinturón trenzado de cuero sintético marrón, hebilla plateada.",
    whatsapp: "584121234567"
  },
  {
    id: 12,
    nombre: "Pañuelo Seda Riviera",
    categoria: "accesorios",
    precio: 10,
    precioOriginal: null,
    enOferta: false,
    imagenes: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
    ],
    tallas: ["Única"],
    descripcion: "Pañuelo cuadrado de seda estampada, múltiples formas de uso.",
    whatsapp: "584121234567"
  }

];

/* Alias para compatibilidad: imagen = primera foto */
productos.forEach(function(p) {
  p.imagen = p.imagenes[0];
});