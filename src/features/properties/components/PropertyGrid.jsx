import PropertyCard from "./PropertyCard"
import { PER_PAGE } from "../constants/propertyConstants"

export default function PropertyGrid({
    totalCount = 0,
    paginatedProperties = [],
    watchedIds,
    onToggleWatch,
    hasMore,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    sentinelRef,
    activeFilterCount,
}) {
    return (
        <main className="flex h-full flex-1 flex-col overflow-hidden p-8">
            {/* Result count */}
            <div className="mb-5 flex items-center gap-[10px]">
                <span className="font-serif text-[22px] font-bold text-ink">{totalCount}</span>
                <span className="text-sm text-warm-gray">
                    {totalCount === 1 ? "property" : "properties"} found
                </span>
            </div>

            {/* Loading / Empty state */}
            {isLoading ? (
                <div className="flex h-[300px] items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
                </div>
            ) : isError ? (
                <div className="flex h-[300px] flex-col items-center justify-center gap-3 text-red-500">
                    <div className="text-[40px]">⚠️</div>
                    <div className="font-serif text-lg font-bold">Failed to load properties</div>
                    <div className="text-[13px] text-slate-500">There was a problem connecting to the server.</div>
                    <button 
                        onClick={() => refetch()}
                        className="mt-2 rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200"
                    >
                        RETRY
                    </button>
                </div>
            ) : totalCount === 0 ? (
                <div className="flex h-[300px] flex-col items-center justify-center gap-3 text-warm-gray">
                    <div className="text-[40px]">🏚</div>
                    <div className="font-serif text-lg text-ink">No properties found</div>
                    <div className="text-[13px]">Try adjusting your filters</div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto scrollbar-premium pr-2">
                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
                        {paginatedProperties.map((p, i) => (
                            <PropertyCard
                                key={p.id}
                                property={p}
                                isWatched={watchedIds.has(p.id)}
                                onToggleWatch={onToggleWatch}
                                index={i % PER_PAGE}
                            />
                        ))}
                    </div>

                    {/* Sentinel */}
                    <div ref={sentinelRef} className="mt-8 flex h-10 items-center justify-center">
                        {(hasMore || isFetchingNextPage) && (
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                                Loading more properties...
                            </div>
                        )}
                        {!hasMore && !isFetchingNextPage && totalCount > PER_PAGE && (
                            <div className="text-xs font-bold tracking-wider text-slate-300">
                                ALL {totalCount} PROPERTIES SHOWN
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    )
}