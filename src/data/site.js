// Images use Unsplash's free image CDN; source and licensing notes are in README.md.
// All projects below are clearly fictional concept studies, never delivered client work.
export const imagery = {
  hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=84',
  residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=82',
  business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1100&q=82',
  commercial: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1300&q=82',
  solarOne: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1100&q=82',
  solarTwo: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=1100&q=82',
  residentialTwo: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=82',
  interior: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=82',
  architectural: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=82',
}

export const solutions = [
  { number: '01', category:'RESIDENTIAL', name: 'For the place you call home.', description:'A more thoughtful energy future starts on your own roof. Explore solar designed around the rhythms of everyday life.', icon:'home', image:imagery.residential, tag:'Homes & villas' },
  { number: '02', category:'BUSINESS', name: 'Power your next big idea.', description:'Make energy planning part of your growth story, with considered rooftop solutions for offices and smaller businesses.', icon:'building', image:imagery.business, tag:'Offices & SMEs' },
  { number: '03', category:'COMMERCIAL', name: 'Think bigger. Shine further.', description:'Explore the possibilities for warehouses, large roofs, and energy-intensive spaces with a tailored solar approach.', icon:'sun', image:imagery.commercial, tag:'Large installations' },
]

export const projects = [
  { id:1, title:'The Olive Residence', city:'Marrakech', type:'Residential', image:imagery.residential, size:'6.2 kWp', brief:'Warm modern architecture paired with a discreet rooftop solar concept for a private home.', details:'An illustrative design study imagining a compact PV installation, clear roof geometry, and a home-first aesthetic. Images are visual references and are not photos of a SOLARA installation.' },
  { id:2, title:'Atlas Business Centre', city:'Casablanca', type:'Business', image:imagery.business, size:'24 kWp', brief:'A clean-energy concept for an urban work environment.', details:'An illustrative design study showing how a business could evaluate rooftop space, electricity usage, and operational constraints before any solar installation.' },
  { id:3, title:'Sunfield No. 01', city:'Agadir', type:'Commercial', image:imagery.solarOne, size:'110 kWp', brief:'An expansive solar concept inspired by the scale of the landscape.', details:'An illustrative, fictional commercial-scale project. Design and output depend on engineering studies, network rules, permitting, and site assessment.' },
  { id:4, title:'The Quiet House', city:'Rabat', type:'Residential', image:imagery.residentialTwo, size:'5.4 kWp', brief:'An understated design study for contemporary residential living.', details:'A fictional concept showing how solar can be considered early in a home improvement journey, from roof suitability to equipment placement.' },
  { id:5, title:'Northline Studio', city:'Tangier', type:'Business', image:imagery.architectural, size:'16 kWp', brief:'A streamlined energy story for creative and professional spaces.', details:'A fictional energy-design exercise focused on using daylight, roof space, and a simple estimated energy profile as starting points.' },
  { id:6, title:'Terra Solar Works', city:'Ouarzazate', type:'Commercial', image:imagery.solarTwo, size:'85 kWp', brief:'A bold visual direction for a larger solar installation.', details:'A fictional commercial installation concept. This image is a general photographic reference; it does not depict the named project or a SOLARA customer.' },
]

export const faqs = [
  { q:'Is SOLARA a real installation company?', a:'No. SOLARA is a fictional solar company created as an Innovatechs portfolio concept. This site demonstrates a possible customer experience; it is not offering live installations.' },
  { q:'How accurate is the solar savings calculator?', a:'It is an educational illustration, not a site-specific quote. It multiplies your entered electricity bill by your chosen energy offset; it does not model export compensation, tariffs, taxes, system losses, maintenance, financing, or equipment degradation.' },
  { q:'What information would a real solar assessment require?', a:'A professional would generally need your electricity bills, location, roof measurements and orientation, shade conditions, consumption pattern, and applicable connection rules before proposing equipment or a quotation.' },
  { q:'Can solar panels work on an existing roof?', a:'Sometimes. Roof structure, available space, age, slope, orientation, and shading all matter. A qualified installer should inspect the site rather than relying on an online calculator.' },
  { q:'Can I submit a real quotation request here?', a:'The multi-step request form is a working front-end demo. Requests are saved only in your current browser using localStorage and can be viewed or deleted in the demo dashboard. Nothing is sent to SOLARA or Innovatechs.' },
  { q:'Does the demo include electricity export or subsidies?', a:'No. There is no assumption of export income, subsidies, tax relief, or government incentives. Regulatory requirements and utility arrangements must be verified independently.' },
]

export const DEMO = {
  installationCostMAD: 68000,
  billMAD: 1450,
  energyOffsetPercent: 70,
  disclaimer: 'All monetary figures, installation sizes, and project specifications on this site are fictional illustrative demo values — not prices, promises, or quotations.'
}
