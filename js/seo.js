window.SalonSeo = {
  baseUrl: 'https://letube.ca',

  pages: {
    home: { path: '/', type: 'WebPage' },
    team: { path: '/team.html', type: 'WebPage' },
    spa: { path: '/spa.html', type: 'WebPage' },
    products: { path: '/products.html', type: 'WebPage' },
    about: { path: '/about.html', type: 'WebPage' }
  },

  businessSchema: function (lang) {
    var isFr = lang === 'fr';
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['HairSalon', 'BarberShop', 'HealthAndBeautyBusiness', 'LocalBusiness'],
          '@id': this.baseUrl + '/#business',
          name: 'Salon Le Tube',
          alternateName: isFr
            ? 'Salon de coiffure et barbier au Vieux-Montréal'
            : 'Hair salon and barbershop in Old Montreal',
          url: this.baseUrl + '/',
          telephone: '+1-514-544-4492',
          email: 'salon@letube.ca',
          image: this.baseUrl + '/assets/images/hero-original-bg.jpg',
          logo: this.baseUrl + '/assets/images/logo-icon.png',
          description: isFr
            ? 'Salon de coiffure, barbier et spa capillaire pour femmes et hommes au Vieux-Montréal, près du Vieux-Port. Coupes, barbe, coloration, head spa et produits professionnels depuis 2005.'
            : 'Hair salon, barbershop and head spa for women and men in Old Montreal, near the Old Port. Haircuts, barber services, colour, scalp rituals and professional products since 2005.',
          priceRange: '$$',
          foundingDate: '2005',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '400 Rue Saint-Henri',
            addressLocality: 'Montréal',
            addressRegion: 'QC',
            postalCode: 'H3C 2P5',
            addressCountry: 'CA'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 45.4875,
            longitude: -73.5569
          },
          areaServed: [
            { '@type': 'City', name: 'Montréal' },
            { '@type': 'Place', name: isFr ? 'Vieux-Montréal' : 'Old Montreal' },
            { '@type': 'Place', name: isFr ? 'Vieux-Port de Montréal' : 'Old Port of Montreal' },
            { '@type': 'Place', name: 'Griffintown' },
            { '@type': 'Place', name: 'Saint-Henri' }
          ],
          knowsAbout: isFr
            ? ['salon de coiffure', 'barbier', 'coupe homme', 'coupe femme', 'coloration', 'head spa', 'spa capillaire', 'barbe', 'Vieux-Montréal']
            : ['hair salon', 'barbershop', 'mens haircut', 'womens haircut', 'hair colour', 'head spa', 'scalp treatment', 'beard trim', 'Old Montreal'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: isFr ? 'Services de coiffure et barbier' : 'Hair salon and barber services',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? 'Coupe et coiffure' : 'Haircuts and styling' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? 'Services de barbier' : 'Barber services' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? 'Coloration et mèches' : 'Hair colour and highlights' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? 'Head spa capillaire' : 'Head spa scalp rituals' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: isFr ? 'Extensions capillaires' : 'Hair extensions' } }
            ]
          },
          sameAs: [
            'https://www.facebook.com/salonletube/',
            'https://www.instagram.com/salonletube/'
          ],
          openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:45', closes: '19:00' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '17:00' }
          ]
        },
        {
          '@type': 'WebSite',
          '@id': this.baseUrl + '/#website',
          url: this.baseUrl + '/',
          name: 'Salon Le Tube',
          inLanguage: ['en-CA', 'fr-CA'],
          publisher: { '@id': this.baseUrl + '/#business' }
        }
      ]
    };
  },

  apply: function (lang) {
    lang = lang || (window.SalonI18n ? SalonI18n.getLang() : 'en');
    var page = document.body && document.body.dataset.page;
    var pageInfo = page && this.pages[page] ? this.pages[page] : this.pages.home;
    var strings = window.SalonI18n ? SalonI18n.translations[lang] : null;
    var canonical = this.baseUrl + pageInfo.path;

    var canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonical);
    }

    var ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonical);

    if (strings && page) {
      var title = strings['meta.' + page + '.title'];
      var desc = strings['meta.' + page + '.description'];
      var keywords = strings['seo.keywords'];

      if (title) {
        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', title);
        var twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute('content', title);
      }

      if (desc) {
        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', desc);
        var twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute('content', desc);
      }

      if (keywords) {
        var kw = document.querySelector('meta[name="keywords"]');
        if (kw) kw.setAttribute('content', keywords);
      }
    }

    var schemaEl = document.getElementById('schema-json');
    if (schemaEl) {
      schemaEl.textContent = JSON.stringify(this.businessSchema(lang));
    }

    var htmlLang = document.documentElement;
    if (htmlLang) htmlLang.lang = lang === 'fr' ? 'fr-CA' : 'en-CA';
  }
};
