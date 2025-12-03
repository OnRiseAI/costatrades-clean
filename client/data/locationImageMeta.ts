/**
 * Location Image Metadata with SEO-optimized alt text
 * Used for hero images on location pages
 */

export interface LocationImageMeta {
  slug: string;
  name: string;
  region: string;
  description: string;
  altText: string; // SEO-optimized alt text
}

export const LOCATION_IMAGE_META: Record<string, LocationImageMeta> = {
  "alcaidesa": {
    slug: "alcaidesa",
    name: "Alcaidesa",
    region: "Sotogrande",
    description: "hillside golf community with sea views",
    altText: "Panoramic view of Alcaidesa, a hillside golf community with Mediterranean Sea views near Sotogrande, Costa del Sol, Spain"
  },
  "alhaurin-el-grande": {
    slug: "alhaurin-el-grande",
    name: "Alhaurín el Grande",
    region: "Inland Málaga",
    description: "traditional white village in mountain foothills",
    altText: "Traditional whitewashed village of Alhaurín el Grande nestled in the mountain foothills of inland Málaga province, Andalucía, Spain"
  },
  "alozaina": {
    slug: "alozaina",
    name: "Alozaina",
    region: "Sierra de las Nieves",
    description: "rustic mountain village with olive groves",
    altText: "Rustic mountain village of Alozaina surrounded by olive groves in Sierra de las Nieves, Málaga province, Spain"
  },
  "arroyo-de-la-miel": {
    slug: "arroyo-de-la-miel",
    name: "Arroyo de la Miel",
    region: "Benalmádena",
    description: "bustling commercial center near coast",
    altText: "Vibrant town center of Arroyo de la Miel, the commercial heart of Benalmádena near the Costa del Sol beaches, Spain"
  },
  "benalmadena-area": {
    slug: "benalmadena-area",
    name: "Benalmádena",
    region: "Costa del Sol",
    description: "coastal resort town with marina and cable car",
    altText: "Scenic coastal resort of Benalmádena featuring its famous marina and cable car views on the Costa del Sol, Málaga, Spain"
  },
  "benalmadena-costa": {
    slug: "benalmadena-costa",
    name: "Benalmádena Costa",
    region: "Benalmádena",
    description: "beachfront promenade with modern apartments",
    altText: "Beachfront promenade of Benalmádena Costa lined with modern Mediterranean apartments on the Costa del Sol, Spain"
  },
  "benalmadena-pueblo": {
    slug: "benalmadena-pueblo",
    name: "Benalmádena Pueblo",
    region: "Benalmádena",
    description: "charming whitewashed hilltop village",
    altText: "Charming whitewashed hilltop village of Benalmádena Pueblo with traditional Andalucían architecture, Costa del Sol, Spain"
  },
  "calahonda": {
    slug: "calahonda",
    name: "Calahonda",
    region: "Mijas Costa",
    description: "hillside residential area near beach",
    altText: "Hillside residential community of Calahonda with Mediterranean villas overlooking the beaches of Mijas Costa, Spain"
  },
  "cancelada": {
    slug: "cancelada",
    name: "Cancelada",
    region: "Estepona",
    description: "quiet residential village with local shops",
    altText: "Quiet residential village of Cancelada with traditional Spanish character near Estepona, Costa del Sol, Spain"
  },
  "casares-costa": {
    slug: "casares-costa",
    name: "Casares Costa",
    region: "Casares",
    description: "coastal urbanization with golf courses",
    altText: "Coastal urbanization of Casares Costa featuring golf courses and Mediterranean villas on the western Costa del Sol, Spain"
  },
  "coin": {
    slug: "coin",
    name: "Coín",
    region: "Guadalhorce Valley",
    description: "authentic Spanish market town inland",
    altText: "Authentic Spanish market town of Coín in the fertile Guadalhorce Valley, inland Málaga province, Andalucía, Spain"
  },
  "el-chaparral": {
    slug: "el-chaparral",
    name: "El Chaparral",
    region: "Mijas Costa",
    description: "woodland residential area near golf",
    altText: "Peaceful woodland residential area of El Chaparral near golf courses in Mijas Costa, Costa del Sol, Spain"
  },
  "el-rosario": {
    slug: "el-rosario",
    name: "El Rosario",
    region: "Marbella East",
    description: "established beachside residential area",
    altText: "Established beachside residential community of El Rosario in eastern Marbella, Costa del Sol, Spain"
  },
  "elviria": {
    slug: "elviria",
    name: "Elviria",
    region: "Marbella East",
    description: "upscale residential area with dune beach",
    altText: "Upscale residential area of Elviria featuring pristine dune beaches in eastern Marbella, Costa del Sol, Spain"
  },
  "estepona-town": {
    slug: "estepona-town",
    name: "Estepona Town",
    region: "Estepona",
    description: "picturesque old town with flower streets",
    altText: "Picturesque old town of Estepona famous for its beautiful flower-lined streets and traditional Spanish charm, Costa del Sol, Spain"
  },
  "frigiliana": {
    slug: "frigiliana",
    name: "Frigiliana",
    region: "Axarquía",
    description: "stunning white village with Moorish heritage",
    altText: "Stunning white village of Frigiliana with rich Moorish heritage and cobblestone streets in Axarquía, Málaga, Spain"
  },
  "guadiaro": {
    slug: "guadiaro",
    name: "Guadiaro",
    region: "Sotogrande",
    description: "peaceful riverside village near polo grounds",
    altText: "Peaceful riverside village of Guadiaro near the famous polo grounds of Sotogrande, Cádiz, Spain"
  },
  "guaro": {
    slug: "guaro",
    name: "Guaro",
    region: "Sierra de las Nieves",
    description: "small mountain village with panoramic views",
    altText: "Small mountain village of Guaro offering panoramic views across Sierra de las Nieves, Málaga province, Spain"
  },
  "inland-sierra-region": {
    slug: "inland-sierra-region",
    name: "Inland Sierra",
    region: "Málaga Mountains",
    description: "scenic mountain range with white villages",
    altText: "Scenic mountain range of Sierra de las Nieves dotted with traditional white villages in Málaga province, Andalucía, Spain"
  },
  "la-cala-de-mijas": {
    slug: "la-cala-de-mijas",
    name: "La Cala de Mijas",
    region: "Mijas Costa",
    description: "family-friendly beach town with boardwalk",
    altText: "Family-friendly beach town of La Cala de Mijas with scenic boardwalk on the Costa del Sol, Málaga, Spain"
  },
  "la-cala-del-moral": {
    slug: "la-cala-del-moral",
    name: "La Cala del Moral",
    region: "Rincón de la Victoria",
    description: "traditional fishing village turned resort",
    altText: "Traditional fishing village of La Cala del Moral transformed into a charming coastal resort near Málaga, Spain"
  },
  "la-carihuela": {
    slug: "la-carihuela",
    name: "La Carihuela",
    region: "Torremolinos",
    description: "authentic fishing quarter with seafood restaurants",
    altText: "Authentic fishing quarter of La Carihuela renowned for its seafood restaurants in Torremolinos, Costa del Sol, Spain"
  },
  "la-reserva": {
    slug: "la-reserva",
    name: "La Reserva",
    region: "Sotogrande",
    description: "exclusive gated community with golf",
    altText: "Exclusive gated community of La Reserva featuring luxury villas and golf course in Sotogrande, Cádiz, Spain"
  },
  "las-chapas": {
    slug: "las-chapas",
    name: "Las Chapas",
    region: "Marbella East",
    description: "prestigious residential area with pine forests",
    altText: "Prestigious residential area of Las Chapas surrounded by Mediterranean pine forests in eastern Marbella, Spain"
  },
  "malaga-east-axarquia": {
    slug: "malaga-east-axarquia",
    name: "Málaga East & Axarquía",
    region: "Eastern Costa del Sol",
    description: "dramatic coastal cliffs and white villages",
    altText: "Dramatic coastal cliffs and traditional white villages of the Axarquía region on the eastern Costa del Sol, Málaga, Spain"
  },
  "manilva": {
    slug: "manilva",
    name: "Manilva",
    region: "Western Costa del Sol",
    description: "wine-producing town with Roman ruins",
    altText: "Historic wine-producing town of Manilva featuring Roman ruins on the western Costa del Sol, Málaga, Spain"
  },
  "marbella-area": {
    slug: "marbella-area",
    name: "Marbella",
    region: "Costa del Sol",
    description: "glamorous resort city with golden mile",
    altText: "Glamorous resort city of Marbella featuring the famous Golden Mile on the Costa del Sol, Málaga, Spain"
  },
  "mijas-costa": {
    slug: "mijas-costa",
    name: "Mijas Costa",
    region: "Mijas",
    description: "long sandy beaches with family resorts",
    altText: "Long sandy beaches and family-friendly resorts of Mijas Costa on the Costa del Sol, Málaga, Spain"
  },
  "mijas-pueblo": {
    slug: "mijas-pueblo",
    name: "Mijas Pueblo",
    region: "Mijas",
    description: "iconic white village with donkey taxis",
    altText: "Iconic whitewashed mountain village of Mijas Pueblo famous for its donkey taxis and panoramic views, Costa del Sol, Spain"
  },
  "miraflores": {
    slug: "miraflores",
    name: "Miraflores",
    region: "Mijas Costa",
    description: "quiet residential area with golf views",
    altText: "Quiet residential community of Miraflores with golf course views in Mijas Costa, Costa del Sol, Spain"
  },
  "nerja": {
    slug: "nerja",
    name: "Nerja",
    region: "Axarquía",
    description: "dramatic balcony of Europe with caves",
    altText: "Stunning coastal town of Nerja featuring the famous Balcón de Europa viewpoint and prehistoric caves, Costa del Sol, Spain"
  },
  "nueva-andalucia": {
    slug: "nueva-andalucia",
    name: "Nueva Andalucía",
    region: "Marbella",
    description: "golf valley with luxury villas",
    altText: "Prestigious Golf Valley of Nueva Andalucía featuring luxury villas and championship courses near Marbella, Costa del Sol, Spain"
  },
  "ojen": {
    slug: "ojen",
    name: "Ojén",
    region: "Marbella Mountains",
    description: "charming mountain village above Marbella",
    altText: "Charming mountain village of Ojén perched in the hills above Marbella with stunning coastal views, Málaga, Spain"
  },
  "pueblo-nuevo": {
    slug: "pueblo-nuevo",
    name: "Pueblo Nuevo",
    region: "Sotogrande",
    description: "local Spanish village near golf resorts",
    altText: "Traditional Spanish village of Pueblo Nuevo near the prestigious golf resorts of Sotogrande, Cádiz, Spain"
  },
  "puerto-banus": {
    slug: "puerto-banus",
    name: "Puerto Banús",
    region: "Marbella",
    description: "luxury marina with superyachts and boutiques",
    altText: "World-famous luxury marina of Puerto Banús featuring superyachts and designer boutiques in Marbella, Costa del Sol, Spain"
  },
  "puerto-de-la-duquesa": {
    slug: "puerto-de-la-duquesa",
    name: "Puerto de la Duquesa",
    region: "Manilva",
    description: "charming marina village with restaurants",
    altText: "Charming marina village of Puerto de la Duquesa with waterfront restaurants in Manilva, western Costa del Sol, Spain"
  },
  "rincon-de-la-victoria": {
    slug: "rincon-de-la-victoria",
    name: "Rincón de la Victoria",
    region: "Eastern Málaga",
    description: "family beach town near Málaga city",
    altText: "Popular family beach town of Rincón de la Victoria just east of Málaga city, Costa del Sol, Spain"
  },
  "riviera-del-sol": {
    slug: "riviera-del-sol",
    name: "Riviera del Sol",
    region: "Mijas Costa",
    description: "hillside residential area with sea views",
    altText: "Hillside residential community of Riviera del Sol with panoramic Mediterranean Sea views in Mijas Costa, Spain"
  },
  "sabinillas": {
    slug: "sabinillas",
    name: "Sabinillas",
    region: "Manilva",
    description: "authentic Spanish coastal village",
    altText: "Authentic Spanish coastal village of Sabinillas with traditional beachfront promenade in Manilva, Costa del Sol, Spain"
  },
  "san-pedro": {
    slug: "san-pedro",
    name: "San Pedro de Alcántara",
    region: "Marbella West",
    description: "local town with boulevard and beach",
    altText: "Vibrant local town of San Pedro de Alcántara featuring a palm-lined boulevard near western Marbella, Costa del Sol, Spain"
  },
  "san-roque-club": {
    slug: "san-roque-club",
    name: "San Roque Club",
    region: "San Roque",
    description: "prestigious golf resort community",
    altText: "Prestigious golf resort community of San Roque Club with championship courses near Sotogrande, Cádiz, Spain"
  },
  "selwo": {
    slug: "selwo",
    name: "Selwo",
    region: "Estepona",
    description: "hillside community near safari park",
    altText: "Hillside residential community of Selwo near the Selwo Aventura safari park in Estepona, Costa del Sol, Spain"
  },
  "sotogrande-alto": {
    slug: "sotogrande-alto",
    name: "Sotogrande Alto",
    region: "Sotogrande",
    description: "elevated exclusive residential area",
    altText: "Elevated exclusive residential area of Sotogrande Alto with luxury villas and golf views, Cádiz, Spain"
  },
  "sotogrande-costa": {
    slug: "sotogrande-costa",
    name: "Sotogrande Costa",
    region: "Sotogrande",
    description: "luxury marina and polo grounds",
    altText: "Luxury coastal community of Sotogrande featuring world-class marina and famous polo grounds, Cádiz, Spain"
  },
  "tolox": {
    slug: "tolox",
    name: "Tolox",
    region: "Sierra de las Nieves",
    description: "spa village in national park",
    altText: "Historic spa village of Tolox nestled in Sierra de las Nieves National Park, Málaga province, Spain"
  },
  "torre-del-mar": {
    slug: "torre-del-mar",
    name: "Torre del Mar",
    region: "Axarquía",
    description: "popular beach resort with promenade",
    altText: "Popular beach resort of Torre del Mar featuring an extensive seafront promenade in Axarquía, Costa del Sol, Spain"
  },
  "torremolinos": {
    slug: "torremolinos",
    name: "Torremolinos",
    region: "Costa del Sol",
    description: "vibrant resort town with diverse beaches",
    altText: "Vibrant resort town of Torremolinos with diverse beaches and lively atmosphere on the Costa del Sol, Málaga, Spain"
  },
  "torrox": {
    slug: "torrox",
    name: "Torrox",
    region: "Axarquía",
    description: "best climate in Europe with Roman ruins",
    altText: "Coastal town of Torrox boasting the best climate in Europe and Roman archaeological ruins, Axarquía, Málaga, Spain"
  },
  "velez-malaga": {
    slug: "velez-malaga",
    name: "Vélez-Málaga",
    region: "Axarquía",
    description: "historic capital of Axarquía region",
    altText: "Historic city of Vélez-Málaga, the cultural capital of the Axarquía region with Moorish fortress, Málaga, Spain"
  }
};

/**
 * Get location image metadata by slug
 * Returns default fallback if not found
 */
export function getLocationImageMeta(slug: string): LocationImageMeta {
  return LOCATION_IMAGE_META[slug] || {
    slug: slug,
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    region: "Costa del Sol",
    description: "Mediterranean coastal area",
    altText: `View of ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} on the Costa del Sol, Spain - service area for verified local tradespeople`
  };
}
