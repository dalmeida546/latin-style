import type { Locale } from '../types'

type ProductCopy = {
  name: Record<Locale, string>
  description: Record<Locale, string>
}

export const productContent: Record<string, ProductCopy> = {
  'reloj-neon-pulse': {
    name: { es: 'Neon Pulse', en: 'Neon Pulse' },
    description: {
      es: 'Reloj digital con correa de silicona y pantalla LED. Resistente al agua, perfecto para la calle.',
      en: 'Digital watch with silicone strap and LED display. Water-resistant, perfect for the streets.',
    },
  },
  'reloj-classic-steel': {
    name: { es: 'Classic Steel', en: 'Classic Steel' },
    description: {
      es: 'Caja de acero inoxidable con cristal mineral. Elegancia urbana para el día a día.',
      en: 'Stainless steel case with mineral crystal. Urban elegance for everyday wear.',
    },
  },
  'reloj-street-chrono': {
    name: { es: 'Street Chrono', en: 'Street Chrono' },
    description: {
      es: 'Cronógrafo deportivo con triple subesfera. Actitud y precisión en tu muñeca.',
      en: 'Sports chronograph with triple sub-dial. Attitude and precision on your wrist.',
    },
  },
  'gafas-urban-shade': {
    name: { es: 'Urban Shade', en: 'Urban Shade' },
    description: {
      es: 'Montura negra mate con lentes polarizados. Protección UV400 para días soleados.',
      en: 'Matte black frame with polarized lenses. UV400 protection for sunny days.',
    },
  },
  'gafas-retro-gold': {
    name: { es: 'Retro Gold', en: 'Retro Gold' },
    description: {
      es: 'Marco dorado vintage con lentes degradados. El clásico que nunca pasa de moda.',
      en: 'Vintage gold frame with gradient lenses. A timeless classic.',
    },
  },
  'gafas-sport-flex': {
    name: { es: 'Sport Flex', en: 'Sport Flex' },
    description: {
      es: 'Diseño envolvente flexible. Ideales para moverte con estilo y comodidad.',
      en: 'Flexible wraparound design. Ideal for moving with style and comfort.',
    },
  },
  'cartera-slim-leather': {
    name: { es: 'Slim Leather', en: 'Slim Leather' },
    description: {
      es: 'Cuero genuino con compartimentos para tarjetas y billetes. Delgada y práctica.',
      en: 'Genuine leather with card and bill slots. Slim and practical.',
    },
  },
  'cartera-zip-classic': {
    name: { es: 'Zip Classic', en: 'Zip Classic' },
    description: {
      es: 'Cierre con cremallera y múltiples bolsillos. Todo organizado en un solo lugar.',
      en: 'Zip closure with multiple pockets. Everything organized in one place.',
    },
  },
  'cartera-card-holder': {
    name: { es: 'Card Holder', en: 'Card Holder' },
    description: {
      es: 'Portatarjetas minimalista de piel. Cabe en cualquier bolsillo sin volumen.',
      en: 'Minimalist leather card holder. Fits any pocket without bulk.',
    },
  },
  'correa-canvas-street': {
    name: { es: 'Canvas Street', en: 'Canvas Street' },
    description: {
      es: 'Correa de lona reforzada con hebilla metálica. Ajustable y resistente.',
      en: 'Reinforced canvas belt with metal buckle. Adjustable and durable.',
    },
  },
  'correa-leather-braided': {
    name: { es: 'Leather Braided', en: 'Leather Braided' },
    description: {
      es: 'Cuero trenzado artesanal con acabado premium. El detalle que marca la diferencia.',
      en: 'Hand-braided leather with premium finish. The detail that makes the difference.',
    },
  },
  'correa-chain-urban': {
    name: { es: 'Chain Urban', en: 'Chain Urban' },
    description: {
      es: 'Cadena metálica con cierre de seguridad. Estilo industrial para looks audaces.',
      en: 'Metal chain with safety clasp. Industrial style for bold looks.',
    },
  },
  'hoodie-latin-wave': {
    name: { es: 'Latin Wave Hoodie', en: 'Latin Wave Hoodie' },
    description: {
      es: 'Sudadera oversize con capucha y logo bordado. Algodón premium, máximo confort.',
      en: 'Oversized hoodie with embroidered logo. Premium cotton, maximum comfort.',
    },
  },
  'tee-street-vibes': {
    name: { es: 'Street Vibes Tee', en: 'Street Vibes Tee' },
    description: {
      es: 'Camiseta gráfica de algodón peinado. Print exclusivo LatinStyle en el pecho.',
      en: 'Graphic tee in combed cotton. Exclusive LatinStyle print on the chest.',
    },
  },
  'jacket-urban-wind': {
    name: { es: 'Urban Wind Jacket', en: 'Urban Wind Jacket' },
    description: {
      es: 'Chaqueta cortavientos ligera con bolsillos ocultos. Lista para cualquier clima.',
      en: 'Light windbreaker with hidden pockets. Ready for any weather.',
    },
  },
  'cap-latin-logo': {
    name: { es: 'Latin Logo Cap', en: 'Latin Logo Cap' },
    description: {
      es: 'Gorra ajustable con bordado 3D. El accesorio final para completar tu outfit.',
      en: 'Adjustable cap with 3D embroidery. The finishing touch for your outfit.',
    },
  },
}

export function getProductName(id: string, locale: Locale, fallback: string): string {
  return productContent[id]?.name[locale] ?? fallback
}

export function getProductDescription(
  id: string,
  locale: Locale,
  fallback: string,
): string {
  return productContent[id]?.description[locale] ?? fallback
}
