export const MOCK_PROPERTIES = [
    { id: 1, title: "Sweeping Hilltop Residence", suburb: "Paddington", state: "NSW", price: 2850000, bedrooms: 4, bathrooms: 3, property_type: "house", status: "active", floor_area_sqm: 320, land_size_sqm: 610, images: ["#C9A96E"], features: ["pool", "garage", "air_conditioning"], days_listed: 3 },
    { id: 2, title: "Heritage Terrace with Garden", suburb: "Surry Hills", state: "NSW", price: 1650000, bedrooms: 3, bathrooms: 2, property_type: "house", status: "active", floor_area_sqm: 210, land_size_sqm: 180, images: ["#8B7355"], features: ["garage", "courtyard"], days_listed: 12 },
    { id: 3, title: "Glass Tower Penthouse", suburb: "Pyrmont", state: "NSW", price: 3200000, bedrooms: 3, bathrooms: 2, property_type: "apartment", status: "active", floor_area_sqm: 280, land_size_sqm: null, images: ["#5B8DB8"], features: ["pool", "concierge", "air_conditioning"], days_listed: 1 },
    { id: 4, title: "Coastal Townhouse Retreat", suburb: "Manly", state: "NSW", price: 2100000, bedrooms: 4, bathrooms: 3, property_type: "townhouse", status: "active", floor_area_sqm: 260, land_size_sqm: 220, images: ["#6BAE8E"], features: ["garage", "balcony", "ocean_views"], days_listed: 7 },
    { id: 5, title: "Art Deco Garden Apartment", suburb: "Neutral Bay", state: "NSW", price: 1180000, bedrooms: 2, bathrooms: 1, property_type: "apartment", status: "active", floor_area_sqm: 110, land_size_sqm: null, images: ["#C17F5E"], features: ["courtyard", "air_conditioning"], days_listed: 21 },
    { id: 6, title: "Inner West Character Home", suburb: "Newtown", state: "NSW", price: 1420000, bedrooms: 3, bathrooms: 2, property_type: "house", status: "active", floor_area_sqm: 175, land_size_sqm: 245, images: ["#9B7EA8"], features: ["garage", "deck"], days_listed: 5 },
    { id: 7, title: "North Shore Family Estate", suburb: "Killara", state: "NSW", price: 4750000, bedrooms: 5, bathrooms: 4, property_type: "house", status: "active", floor_area_sqm: 480, land_size_sqm: 1200, images: ["#5B7A8B"], features: ["pool", "garage", "tennis_court", "air_conditioning"], days_listed: 9 },
    { id: 8, title: "Warehouse Conversion Loft", suburb: "Chippendale", state: "NSW", price: 1890000, bedrooms: 2, bathrooms: 2, property_type: "apartment", status: "under_contract", floor_area_sqm: 195, land_size_sqm: null, images: ["#7A7A7A"], features: ["parking", "air_conditioning"], days_listed: 18 },
    { id: 9, title: "Beachside Bungalow", suburb: "Bondi", state: "NSW", price: 3600000, bedrooms: 4, bathrooms: 3, property_type: "house", status: "active", floor_area_sqm: 290, land_size_sqm: 320, images: ["#E8A87C"], features: ["pool", "garage", "ocean_views"], days_listed: 2 },
    { id: 10, title: "Executive City Apartment", suburb: "CBD", state: "NSW", price: 980000, bedrooms: 1, bathrooms: 1, property_type: "apartment", status: "active", floor_area_sqm: 75, land_size_sqm: null, images: ["#4A6FA5"], features: ["concierge", "gym", "air_conditioning"], days_listed: 30 },
    { id: 11, title: "Leafy Lane Townhouse", suburb: "Mosman", state: "NSW", price: 2650000, bedrooms: 4, bathrooms: 3, property_type: "townhouse", status: "active", floor_area_sqm: 310, land_size_sqm: 280, images: ["#6B8E6B"], features: ["garage", "pool", "balcony"], days_listed: 6 },
    { id: 12, title: "Riverside Condo", suburb: "Pyrmont", state: "NSW", price: 1350000, bedrooms: 2, bathrooms: 2, property_type: "condo", status: "active", floor_area_sqm: 130, land_size_sqm: null, images: ["#B87C6E"], features: ["gym", "pool", "parking"], days_listed: 14 },
];

export const TYPE_LABEL = { house: "House", apartment: "Apartment", townhouse: "Townhouse", condo: "Condo", land: "Land" };
export const STATUS_LABEL = { active: "Active", under_contract: "Under Contract", sold: "Sold" };
export const STATUS_COLOR = { active: "#6BAE8E", under_contract: "#E8A87C", sold: "#E87C7C", withdrawn: "#888" };

export const FONT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');`

export const PER_PAGE = 6

export const SORT_OPTIONS = [
    { value: 'price_asc', label: 'Low Price' },
    { value: 'price_desc', label: 'High Price' },
    { value: 'created_at_desc', label: 'Newest' },
    { value: 'created_at_asc', label: 'Oldest' },
]
export const PROPERTY_TYPES = ['house', 'apartment', 'townhouse', 'condo', 'land']
export const STATUS_OPTIONS = ['active', 'under_contract', 'sold']
export const BED_OPTIONS = [1, 2, 3, 4, 5]