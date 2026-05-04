import { useState, memo } from "react"
import PropertyImage from "./PropertyImage"
import { formatPrice } from "../utils/priceFormatter"
import { TYPE_LABEL, STATUS_COLOR } from "../constants/propertyConstants"
import { cn } from "@/lib/utils"

const PropertyCard = memo(function PropertyCard({ property, isWatched, onToggleWatch, index }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className={cn(
                "animate-fade-slide-up group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white cursor-pointer transition-all duration-300",
                hovered ? "shadow-premium-hover -translate-y-1.5 border-brand/20" : "shadow-premium"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <PropertyImage color={property.images[0]} status={property.status} />

            <div className="flex flex-1 flex-col p-5 text-left">
                {/* Price and Watchlist */}
                <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                            {formatPrice(property.price)}
                        </div>
                        <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-brand">
                            {TYPE_LABEL[property.property_type]} · {property.suburb}
                        </div>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleWatch(property) }}
                        className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                            isWatched 
                                ? "bg-brand/10 text-brand hover:bg-brand/20" 
                                : "bg-slate-50 text-slate-400 hover:bg-brand/5 hover:text-brand"
                        )}
                        title={isWatched ? "Remove from watchlist" : "Save to watchlist"}
                    >
                        {isWatched ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        )}
                    </button>
                </div>

                {/* Address */}
                <h3 className="mb-4 text-base font-bold leading-tight text-slate-800 line-clamp-2 group-hover:text-brand transition-colors">
                    {property.title}
                </h3>

                {/* Stats */}
                <div className="mt-auto mb-5 flex items-center gap-4">
                    {[
                        { icon: "bed", val: property.bedrooms, label: "Bed" },
                        { icon: "bath", val: property.bathrooms, label: "Bath" },
                        { icon: "maximize", val: property.floor_area_sqm, label: "m²" },
                    ].map(({ icon, val, label }) => (
                        <div key={label} className="flex items-center gap-1.5 text-[13px]">
                            <span className="text-slate-400">
                                {icon === "bed" && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>}
                                {icon === "bath" && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-1C4.3 2.4 3 3.5 3 4.8V5"/><path d="M10 5s.5 2 1.5 2H18c1.7 0 3 1.3 3 3v2"/><path d="M3 12h18a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Z"/></svg>}
                                {icon === "maximize" && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>}
                            </span>
                            <span className="font-bold text-slate-700">{val}</span>
                            <span className="font-medium text-slate-500">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                        <div
                            className="h-2 w-2 rounded-full"
                            style={{ background: STATUS_COLOR[property.status] }}
                        />
                        <span className="text-xs font-medium text-slate-500">
                            {property.status === "active" 
                                ? `Listed ${property.days_listed || Math.floor((new Date() - new Date(property.created_at)) / (1000 * 60 * 60 * 24)) || 0}d ago` 
                                : "Under Contract"}
                        </span>
                    </div>
                    <span className="text-xs font-bold tracking-wider text-brand transition-transform group-hover:translate-x-1">
                        View Details →
                    </span>
                </div>
            </div>
        </div>
    )
})

export default PropertyCard;
