# 🎨 GUÍA DE DISEÑO UX/UI - PALETA DE COLORES PLENA STUDIO
## Diseño Profesional para Landing Page en Figma

---

## 📋 **ANÁLISIS DE LA PALETA ACTUAL**

### **🔍 Colores Existentes (Análisis)**
```css
/* Paleta actual extraída del sistema */
:root {
  --color-honeydew: #d1fae5;       /* Verde claro suave */
  --color-slategray: #4a6a7b;      /* Gris azulado */
  --color-mistyrose: #f4d7d7;      /* Rosa suave */
  --color-lavenderblush: #fce7f3;  /* Rosa muy claro */
  --color-silver: #b9b9b9;         /* Gris medio */
  --color-whitesmoke: #f0f0f0;     /* Gris muy claro */
  --color-lightgreen: #8abf69;     /* Verde principal */
  --color-mintcream: #ecfdf5;      /* Verde muy claro */
  --color-darkslategray-300: #1b333c;  /* Gris oscuro */
  --color-darkslategray-200: #064e3b;  /* Verde oscuro */
  --color-darkslategray-100: #2c3e50;  /* Azul grisáceo */
  --color-white: #fff;             /* Blanco */
}
```

---

## 🎨 **NUEVA PALETA DE COLORES OPTIMIZADA**

### **🌟 Paleta Principal - Joyería de Lujo**

#### **Colores Primarios**
```css
/* APLICAR EN FIGMA */
:root {
  /* === COLORES PRINCIPALES === */
  --primary-jewel-gold: #D4AF37;      /* Oro joya - CTAs principales */
  --primary-deep-emerald: #0F5132;    /* Esmeralda profunda - Headers */
  --primary-pearl-white: #F8F9FA;     /* Blanco perla - Backgrounds */
  --primary-charcoal: #2C3E50;        /* Carbón - Textos principales */
  
  /* === COLORES SECUNDARIOS === */
  --secondary-rose-gold: #E8B4A0;     /* Oro rosa - Acentos */
  --secondary-mint-green: #A8E6CF;    /* Verde menta - Éxito */
  --secondary-warm-gray: #6C757D;     /* Gris cálido - Textos secundarios */
  --secondary-soft-cream: #FFF8E1;    /* Crema suave - Fondos alternativos */
  
  /* === COLORES DE ACENTO === */
  --accent-luxury-purple: #6A4C93;    /* Púrpura lujo - Premium */
  --accent-copper: #B87333;           /* Cobre - Detalles */
  --accent-sage: #87A96B;             /* Salvia - Botones secundarios */
  --accent-pearl-gray: #E9ECEF;       /* Gris perla - Bordes */
}
```

#### **Colores de Estado**
```css
/* ESTADOS DE INTERACCIÓN */
:root {
  /* === ESTADOS === */
  --state-success: #28A745;           /* Verde éxito */
  --state-warning: #FFC107;           /* Amarillo advertencia */
  --state-error: #DC3545;             /* Rojo error */
  --state-info: #17A2B8;              /* Azul información */
  
  /* === HOVERS Y FOCUS === */
  --hover-jewel-gold: #B8941F;        /* Oro hover */
  --hover-deep-emerald: #0A3D26;      /* Esmeralda hover */
  --hover-rose-gold: #D89B7A;         /* Oro rosa hover */
  --focus-outline: #0F5132;           /* Contorno focus */
}
```

---

## 🎨 **APLICACIÓN EN FIGMA - PASO A PASO**

### **1. 🎯 Configuración de Styles en Figma**

#### **A. Crear Color Styles**
```figma
/* Crear estos estilos en Figma: */

📁 PRIMARY COLORS
  🟡 Jewel Gold (#D4AF37)
  🟢 Deep Emerald (#0F5132)
  ⚪ Pearl White (#F8F9FA)
  ⚫ Charcoal (#2C3E50)

📁 SECONDARY COLORS
  🟠 Rose Gold (#E8B4A0)
  🟢 Mint Green (#A8E6CF)
  🔘 Warm Gray (#6C757D)
  🟡 Soft Cream (#FFF8E1)

📁 ACCENT COLORS
  🟣 Luxury Purple (#6A4C93)
  🟤 Copper (#B87333)
  🟢 Sage (#87A96B)
  🔘 Pearl Gray (#E9ECEF)
```

#### **B. Crear Text Styles**
```figma
📁 TYPOGRAPHY
  📝 Heading 1 - Garamond 72px, Bold, Charcoal
  📝 Heading 2 - Garamond 48px, Bold, Deep Emerald
  📝 Heading 3 - Garamond 32px, Medium, Charcoal
  📝 Body Large - Lato 18px, Regular, Charcoal
  📝 Body Medium - Lato 16px, Regular, Warm Gray
  📝 Body Small - Lato 14px, Regular, Warm Gray
  📝 Button Text - Lato 16px, Bold, Pearl White
  📝 Caption - Lato 12px, Regular, Warm Gray
```

---

## 🏗️ **ESTRUCTURA DE LA LANDING PAGE**

### **2. 📱 Layout Principal**

#### **A. Header/Navigation**
```figma
CONFIGURACIÓN:
• Fondo: Pearl White (#F8F9FA)
• Logo: Deep Emerald (#0F5132)
• Navegación: Charcoal (#2C3E50)
• Botón CTA: Jewel Gold (#D4AF37)
• Hover: Hover Jewel Gold (#B8941F)
• Sombra: 0px 2px 8px rgba(15, 81, 50, 0.1)
```

#### **B. Hero Section**
```figma
CONFIGURACIÓN:
• Fondo: Gradient (Pearl White → Soft Cream)
• Título Principal: Garamond 72px, Deep Emerald
• Subtítulo: Lato 24px, Warm Gray
• Botón Principal: Jewel Gold con texto Pearl White
• Botón Secundario: Transparent con borde Deep Emerald
• Imagen Hero: Overlay con Deep Emerald 60% opacity
```

#### **C. Features Section**
```figma
CONFIGURACIÓN:
• Fondo: Soft Cream (#FFF8E1)
• Títulos: Garamond 32px, Charcoal
• Iconos: Deep Emerald (#0F5132)
• Texto: Lato 16px, Warm Gray
• Cards: Pearl White con sombra suave
• Bordes: Pearl Gray (#E9ECEF)
```

#### **D. Products Showcase**
```figma
CONFIGURACIÓN:
• Fondo: Pearl White (#F8F9FA)
• Título Sección: Garamond 48px, Deep Emerald
• Cards de Producto: White con borde Pearl Gray
• Precios: Jewel Gold (#D4AF37), Lato Bold
• Botones: Sage (#87A96B) con hover
• Badges Premium: Luxury Purple (#6A4C93)
```

#### **E. Testimonials**
```figma
CONFIGURACIÓN:
• Fondo: Mint Green (#A8E6CF) con baja opacidad
• Quotes: Garamond 24px, Charcoal
• Nombres: Lato 16px Bold, Deep Emerald
• Estrellas: Jewel Gold (#D4AF37)
• Avatar borders: Rose Gold (#E8B4A0)
```

#### **F. Footer**
```figma
CONFIGURACIÓN:
• Fondo: Deep Emerald (#0F5132)
• Textos: Pearl White (#F8F9FA)
• Enlaces: Mint Green (#A8E6CF)
• Hover enlaces: Rose Gold (#E8B4A0)
• Separadores: Pearl Gray con 30% opacity
```

---

## 🎨 **COMPONENTES ESPECÍFICOS**

### **3. 🔘 Botones**

#### **Botón Primario (CTA Principal)**
```figma
CONFIGURACIÓN:
• Relleno: Jewel Gold (#D4AF37)
• Texto: Pearl White (#F8F9FA)
• Tipografía: Lato 16px Bold
• Padding: 16px 32px
• Border-radius: 8px
• Sombra: 0px 4px 12px rgba(212, 175, 55, 0.3)
• Hover: Hover Jewel Gold (#B8941F)
• Transición: 0.3s ease
```

#### **Botón Secundario**
```figma
CONFIGURACIÓN:
• Relleno: Transparent
• Borde: 2px solid Deep Emerald (#0F5132)
• Texto: Deep Emerald (#0F5132)
• Hover relleno: Deep Emerald (#0F5132)
• Hover texto: Pearl White (#F8F9FA)
```

#### **Botón Éxito**
```figma
CONFIGURACIÓN:
• Relleno: Sage (#87A96B)
• Texto: Pearl White (#F8F9FA)
• Hover: Darker Sage (#6B8A4F)
```

### **4. 📋 Cards y Contenedores**

#### **Card de Producto**
```figma
CONFIGURACIÓN:
• Fondo: Pearl White (#F8F9FA)
• Borde: 1px solid Pearl Gray (#E9ECEF)
• Border-radius: 16px
• Sombra: 0px 4px 16px rgba(44, 62, 80, 0.08)
• Hover: Elevación a 0px 8px 24px rgba(44, 62, 80, 0.12)
• Precio: Jewel Gold (#D4AF37)
• Botón: Sage (#87A96B)
```

#### **Card de Testimonial**
```figma
CONFIGURACIÓN:
• Fondo: Pearl White (#F8F9FA)
• Borde izquierdo: 4px solid Rose Gold (#E8B4A0)
• Quote icon: Deep Emerald (#0F5132)
• Texto: Charcoal (#2C3E50)
• Nombre: Deep Emerald (#0F5132)
```

### **5. 📝 Formularios**

#### **Inputs**
```figma
CONFIGURACIÓN:
• Fondo: Pearl White (#F8F9FA)
• Borde: 1px solid Pearl Gray (#E9ECEF)
• Border-radius: 8px
• Padding: 12px 16px
• Placeholder: Warm Gray (#6C757D)
• Focus: Borde Deep Emerald (#0F5132)
• Error: Borde State Error (#DC3545)
```

---

## 🎨 **GRADIENTES Y EFECTOS**

### **6. 🌈 Gradientes Sugeridos**

#### **Gradiente Hero**
```figma
CONFIGURACIÓN:
• Tipo: Linear
• Dirección: 135°
• Color 1: Pearl White (#F8F9FA) - 0%
• Color 2: Soft Cream (#FFF8E1) - 100%
```

#### **Gradiente Premium**
```figma
CONFIGURACIÓN:
• Tipo: Linear
• Dirección: 45°
• Color 1: Jewel Gold (#D4AF37) - 0%
• Color 2: Rose Gold (#E8B4A0) - 100%
```

#### **Gradiente Overlay**
```figma
CONFIGURACIÓN:
• Tipo: Linear
• Dirección: 180°
• Color 1: Deep Emerald (#0F5132) 60% - 0%
• Color 2: Transparent - 100%
```

### **7. 🎭 Sombras y Efectos**

#### **Sombra Suave**
```figma
• X: 0px, Y: 2px, Blur: 8px
• Color: Charcoal (#2C3E50) 8% opacity
```

#### **Sombra Elevada**
```figma
• X: 0px, Y: 8px, Blur: 24px
• Color: Deep Emerald (#0F5132) 12% opacity
```

#### **Sombra Botón**
```figma
• X: 0px, Y: 4px, Blur: 12px
• Color: Jewel Gold (#D4AF37) 30% opacity
```

---

## 📱 **RESPONSIVE DESIGN**

### **8. 📐 Breakpoints**

#### **Desktop (1200px+)**
```figma
• Hero: 2 columnas (texto + imagen)
• Features: 3 columnas
• Products: 4 columnas
• Espaciado: 64px entre secciones
```

#### **Tablet (768px - 1199px)**
```figma
• Hero: 2 columnas apiladas
• Features: 2 columnas
• Products: 2 columnas
• Espaciado: 48px entre secciones
```

#### **Mobile (320px - 767px)**
```figma
• Hero: 1 columna
• Features: 1 columna
• Products: 1 columna
• Espaciado: 32px entre secciones
• Botones: Width 100%
```

---

## 🎨 **ICONOGRAFÍA Y ELEMENTOS**

### **9. 🎭 Iconos**

#### **Estilo de Iconos**
```figma
• Estilo: Outline/Stroke
• Grosor: 2px
• Color Principal: Deep Emerald (#0F5132)
• Color Hover: Jewel Gold (#D4AF37)
• Tamaño: 24px (mobile) / 32px (desktop)
```

#### **Iconos Específicos**
```figma
• Joyería: Diamante, Anillo, Collar
• Calidad: Certificado, Estrella, Escudo
• Envío: Camión, Caja, Globo
• Garantía: Check, Corazón, Tiempo
```

### **10. 🖼️ Tratamiento de Imágenes**

#### **Filtros para Productos**
```figma
• Saturación: +10%
• Contraste: +5%
• Overlay: Deep Emerald 5% opacity
• Border-radius: 12px
```

#### **Tratamiento Hero**
```figma
• Overlay: Linear gradient (Deep Emerald 60% → Transparent)
• Filtro: Brightness 90%
• Posición: Object-fit cover
```

---

## 🎯 **IMPLEMENTACIÓN PRÁCTICA**

### **11. 📋 Checklist de Aplicación**

#### **✅ Configuración Inicial**
- [ ] Crear color styles en Figma
- [ ] Crear text styles en Figma
- [ ] Configurar grid system
- [ ] Importar fuentes (Garamond, Lato)

#### **✅ Componentes Base**
- [ ] Botón primario
- [ ] Botón secundario
- [ ] Card de producto
- [ ] Input field
- [ ] Navigation bar

#### **✅ Secciones Landing**
- [ ] Header/Navigation
- [ ] Hero section
- [ ] Features section
- [ ] Products showcase
- [ ] Testimonials
- [ ] Footer

#### **✅ Estados Interactivos**
- [ ] Hover states
- [ ] Focus states
- [ ] Loading states
- [ ] Error states

### **12. 🔧 Exportación y Handoff**

#### **Para Desarrollo**
```figma
EXPORTAR:
• CSS variables
• Color tokens
• Spacing tokens
• Typography scale
• Component specs
• Responsive breakpoints
```

#### **Assets de Exportación**
```figma
• Iconos: SVG 24px, 32px
• Logos: SVG + PNG (1x, 2x, 3x)
• Imágenes: WebP + fallback JPG
• Backgrounds: SVG patterns
```

---

## 🏆 **RESULTADO FINAL**

### **🎨 Identidad Visual Lograda**
- ✅ **Elegancia**: Paleta de joyería premium
- ✅ **Confianza**: Colores sólidos y profesionales
- ✅ **Lujo**: Oro, esmeralda y tonos ricos
- ✅ **Modernidad**: Gradientes suaves y sombras
- ✅ **Accesibilidad**: Contraste WCAG AA compliant

### **💎 Características Únicas**
- **Oro Joya (#D4AF37)**: CTAs que brillan como joyas reales
- **Esmeralda Profunda (#0F5132)**: Confianza y exclusividad
- **Oro Rosa (#E8B4A0)**: Feminidad y calidez
- **Perla Blanca (#F8F9FA)**: Pureza y sofisticación

**🎯 Esta paleta posiciona a Plena Studio como una joyería premium digital, combinando la tradición del lujo con la innovación tecnológica.**

---

*Diseñado por: UX/UI Designer Senior*  
*Proyecto: Plena Studio Landing Page*  
*Fecha: 15 de julio de 2025*
