import { useState, useEffect } from "react"
import { TYPE_LABEL, PROPERTY_TYPES, BED_OPTIONS } from "../constants/propertyConstants"
import { cn } from "../../../lib/utils"
import { useDebounce } from "@/hooks/useDebounce"
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "../utils/priceFormatter"

export default function PropertyFilters({ filters, onChange }) {
    const [localPrice, setLocalPrice] = useState([
        filters.min_price || 0,
        filters.max_price || 10000000
    ])

    const debouncedPrice = useDebounce(localPrice, 400)

    // Sync local state when parent filters change (e.g. Reset)
    useEffect(() => {
        const min = filters.min_price || 0
        const max = filters.max_price || 10000000
        if (min !== localPrice[0] || max !== localPrice[1]) {
            setLocalPrice([min, max])
        }
    }, [filters.min_price, filters.max_price])

    // Update parent when debounced price changes
    useEffect(() => {
        const [min, max] = debouncedPrice
        if (min !== (filters.min_price || 0) || max !== (filters.max_price || 10000000)) {
            onChange("min_price", min === 0 ? null : min)
            onChange("max_price", max === 10000000 ? null : max)
        }
    }, [debouncedPrice])

    return (
        <aside className="flex h-full w-[280px] flex-shrink-0 flex-col gap-5 overflow-y-auto scrollbar-premium border-r border-slate-200 bg-white p-5">
            <div>
                <div className="text-left text-md font-bold tracking-tight text-slate-900">
                    Filters
                </div>
            </div>

            {/* Property Type */}
            <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Property Type
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {PROPERTY_TYPES.map(t => {
                        const active = (filters.property_type || []).includes(t)
                        return (
                            <button
                                key={t}
                                onClick={() => {
                                    const cur = filters.property_type || []
                                    onChange("property_type", cur.includes(t) ? cur.filter(x => x !== t) : [...cur, t])
                                }}
                                className={cn(
                                    "flex items-center justify-center rounded-lg border py-1.5 px-2 text-[11px] font-bold transition-all duration-200",
                                    active
                                        ? "border-brand bg-brand text-white shadow-sm"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                )}
                            >
                                {TYPE_LABEL[t]}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Price Range
                </div>
                <div className="px-1.5">
                    <Slider
                        min={0}
                        max={10000000}
                        step={50000}
                        value={localPrice}
                        onValueChange={setLocalPrice}
                        className="my-5"
                    />
                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-600">
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase text-slate-400 leading-none mb-1">Min</span>
                            <span>{formatPrice(localPrice[0])}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] uppercase text-slate-400 leading-none mb-1">Max</span>
                            <span>{localPrice[1] === 10000000 ? "Any" : formatPrice(localPrice[1])}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bedrooms */}
            <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Bedrooms
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {["Any", ...BED_OPTIONS].map(b => {
                        const val = b === "Any" ? null : b
                        const active = filters.bedrooms === val
                        return (
                            <button
                                key={b}
                                onClick={() => onChange("bedrooms", val)}
                                className={cn(
                                    "flex items-center justify-center rounded-lg border py-1.5 text-[11px] font-bold transition-all duration-200",
                                    active
                                        ? "border-brand bg-brand text-white shadow-sm"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                )}
                            >
                                {b === "Any" ? "Any" : `${b}+`}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Bathrooms */}
            <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Bathrooms
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {["Any", 1, 2, 3, 4, 5].map(b => {
                        const val = b === "Any" ? null : b
                        const active = filters.bathrooms === val
                        return (
                            <button
                                key={b}
                                onClick={() => onChange("bathrooms", val)}
                                className={cn(
                                    "flex items-center justify-center rounded-lg border py-1.5 text-[11px] font-bold transition-all duration-200",
                                    active
                                        ? "border-brand bg-brand text-white shadow-sm"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                )}
                            >
                                {b === "Any" ? "Any" : `${b}+`}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Reset */}
            <button
                onClick={() => onChange("__reset__", null)}
                className="mt-2 rounded-lg border border-slate-200 py-2 text-[11px] font-bold text-slate-500 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
                Clear all filters
            </button>
        </aside>
    )
}
