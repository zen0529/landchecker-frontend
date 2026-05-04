import WatchlistItem from "./WatchlistItems"
import { cn } from "@/lib/utils"
import { Heart, Activity, Settings2, Sparkles } from "lucide-react"

export default function WatchlistPanel({ items, allProperties, onRemove, wsEvents }) {
    return (
        <aside className="flex w-[340px] flex-shrink-0 flex-col border-l border-slate-200 bg-white shadow-2xl">
            {/* Header */}
            <div className="relative overflow-hidden border-b border-slate-100 bg-white p-6">
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                <Heart size={17} fill="currentColor" />
                            </div>
                            <h3 className="text-[17px] font-extrabold tracking-tight text-slate-600">Watchlist</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-brand px-2 text-[10px] font-black text-slate-600 shadow-lg shadow-brand/20">
                                {items.length}
                            </div>
                            {/* <button className="text-slate-400 transition-colors hover:text-slate-600">
                                <Settings2 size={16} />
                            </button> */}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5">
                        <div className="h-1 w-6 rounded-full bg-brand" />
                        <div className="h-1 w-1.5 rounded-full bg-brand/30" />
                        <div className="h-1 w-1.5 rounded-full bg-brand/10" />
                    </div>
                </div>
                {/* Subtle background decoration */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-slate-50/50" />
            </div>

            {/* WS Feed */}
            {wsEvents.length > 0 && (
                <div className="border-b border-slate-100 bg-slate-50/40 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
                            </span>
                            Live Updates
                        </div>
                        <Activity size={12} className="text-slate-300" />
                    </div>
                    <div className="flex flex-col gap-3">
                        {wsEvents.slice(-2).map((e, i) => (
                            <div
                                key={i}
                                className="animate-fade-slide-up flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-3.5 text-[11px] shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
                            >
                                <div className={cn(
                                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg shadow-inner",
                                    e.type === "PRICE_DROP" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                                )}>
                                    {e.type === "PRICE_DROP" ? "📉" : "🔔"}
                                </div>
                                <div className="font-semibold leading-relaxed text-slate-700">
                                    {e.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto scrollbar-premium py-6">
                {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-6 px-10 text-center">
                        <div className="relative">
                            <div className="flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-slate-50 text-slate-200">
                                <Sparkles size={40} strokeWidth={1.5} />
                            </div>
                            <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand shadow-premium animate-bounce">
                                <Heart size={16} fill="currentColor" />
                            </div>
                        </div>
                        <div className="max-w-[180px]">
                            <div className="text-[16px] font-black text-slate-900">Your list is empty</div>
                            <p className="mt-2 text-[12px] leading-relaxed text-slate-500 font-medium">
                                Save your favorite properties to track prices and availability.
                            </p>
                        </div>
                        <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-[12px] font-bold text-slate-600 shadow-sm transition-all hover:border-brand hover:text-brand hover:shadow-md">
                            Browse Properties
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 px-3">
                        {items.map((item, index) => {
                            // Support both nested property objects from API and local lookup
                            const property = item.property || allProperties.find(x => x.id === item.property_id)
                            
                            if (!property) return null
                            return (
                                <div 
                                    key={item.property_id} 
                                    className="animate-fade-slide-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <WatchlistItem
                                        property={property}
                                        onRemove={onRemove}
                                    />
                                </div>
                            )
                        })}
                    </div>
                )
                }
            </div>
        </aside>
    )
}

