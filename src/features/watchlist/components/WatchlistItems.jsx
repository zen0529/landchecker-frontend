import { formatPrice } from "../../properties/utils/priceFormatter"
import { X, ExternalLink } from "lucide-react"

export default function WatchlistItem({ property, onRemove }) {
    return (
        <div className="group relative flex items-center gap-4 rounded-2xl p-3 transition-all duration-300 hover:bg-slate-50/80 hover:shadow-premium ring-1 ring-transparent hover:ring-slate-100">
            {/* Image Container */}
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl shadow-sm bg-slate-100">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                    style={{ backgroundImage: `url(${property.images[0]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-[13px] font-bold tracking-tight text-slate-900">
                        {property.title}
                    </h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                    <span className="truncate">{property.suburb}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                    <span className="text-[13px] font-extrabold text-brand">
                        {formatPrice(property.price)}
                    </span>
                    <span className="flex scale-90 items-center gap-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 translate-x-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {/* View <ExternalLink size={10} /> */}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute -right-1 -top-1 opacity-0 transition-all duration-200 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemove(property.id)
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-100 text-slate-400 shadow-sm transition-all hover:bg-error hover:text-white hover:border-error"
                    title="Remove from watchlist"
                >
                    <X size={12} strokeWidth={3} />
                </button>
            </div>
        </div>
    )
}

