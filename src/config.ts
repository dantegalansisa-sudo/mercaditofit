export const WHATSAPP_NUMBER = '18295333008'

export const config = {
  name: 'Mercaditofit',
  tagline: 'Suplementos y nutrición deportiva',
  phoneDisplay: '+1 (829) 533-3008',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  instagram: 'https://www.instagram.com/mercaditofit_1',
  instagramHandle: '@mercaditofit_1',
  // Placeholders — pendiente de confirmar con el cliente
  email: 'info@mercaditofit.com',
  facebook: '#',
  tiktok: '#',
  hours: [
    { days: 'Lunes – Sábado', time: '8:00 AM – 8:00 PM' },
    { days: 'Domingo', time: '9:00 AM – 1:00 PM' },
  ],
  branches: [
    {
      name: 'Comendador',
      region: 'Elías Piña',
      address: 'Avenida 27 de Febrero, Comendador, Elías Piña',
      mapEmbed:
        'https://www.google.com/maps?q=Avenida+27+de+Febrero,+Comendador,+El%C3%ADas+Pi%C3%B1a,+Rep%C3%BAblica+Dominicana&output=embed',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Avenida+27+de+Febrero+Comendador+Elias+Pina',
      main: true,
    },
    {
      name: 'La Paz',
      region: 'Sucursal',
      address: 'Dirección por confirmar',
      mapEmbed: '',
      mapLink: '#',
      main: false,
    },
  ],
} as const

export const waLink = (message: string) =>
  `${config.whatsapp}?text=${encodeURIComponent(message)}`

export const formatRD = (n: number) =>
  'RD$ ' + n.toLocaleString('es-DO', { maximumFractionDigits: 0 })
