export const formatPrice = (p) => p >= 1000000
    ? `$${(p / 1000000).toFixed(p % 1000000 === 0 ? 0 : 1)}M`
    : `$${(p / 1000).toFixed(0)}K`;