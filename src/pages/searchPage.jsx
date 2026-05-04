import { useMemo } from "react"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { PropertyGrid, PropertyFilters, PropertySortControls, usePropertyFilters, usePropertiesQuery, MOCK_PROPERTIES } from "@/features/properties"
import { WatchlistPanel } from "@/features/watchlist"
import { useWebSocket } from "@/features/watchlist/hooks/useWebSocket"

import { useWatchlistContext } from "@/context/watchlistContext"
import { useAuth } from "@/context/authContext"
import { useAuthActions } from "@/features/auth"
import { ROUTES } from "@/constants/routes"

export default function SearchPage() {
    const { filters, searchQuery, setSearchQuery, sortBy, setSortBy, sortDir, setSortDir, handleFilterChange, activeFilterCount } = usePropertyFilters()
    const { watchlist, watchedIds, toggleWatch, removeFromWatchlist } = useWatchlistContext()
    // const { wsConnected, wsEvents } = useWebSocket({})
    // const { user, isAuthenticated } = useAuth()

    const { user, isAuthenticated, token } = useAuth()

    const { wsConnected, wsEvents } = useWebSocket({ token })
    const { handleLogout } = useAuthActions()

    const { data, hasNextPage, sentinelRef, isFetchingNextPage, isLoading, isError, refetch } = usePropertiesQuery(filters, searchQuery, sortBy, sortDir)


    const paginatedProperties = data?.pages.flatMap(page => page.data) || []
    const totalProperties = data?.pages[0]?.total || 0

    return (
        <div className="flex h-screen flex-col bg-slate-50 font-sans text-slate-600">

            {/* Header */}
            <header className="sticky top-0 z-50 flex h-[72px] items-stretch border-b border-slate-200 bg-white/80 backdrop-blur-md">
                {/* Logo Area - Aligned with Filters (280px) */}
                <div className="flex w-[280px] flex-shrink-0 items-center border-r border-slate-200 px-5">
                    <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                        <span className="text-brand">Landchecker</span>
                    </div>
                </div>

                {/* Search Area - Aligned with Property Grid (flex-1) */}
                <div className="flex flex-1 items-center justify-between px-8">
                    <div className="relative w-full max-w-[600px]">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search by suburb, title, or keyword..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-sm text-slate-900 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-brand/10"
                        />
                    </div>

                    <PropertySortControls
                        sortBy={sortBy}
                        sortDir={sortDir}
                        onSortChange={setSortBy}
                        onDirChange={setSortDir}
                    />
                </div>

                {/* Actions Area - Aligned with Watchlist Panel (340px) */}
                <div className="flex w-[340px] flex-shrink-0 items-center justify-end gap-4 border-l border-slate-200 px-6">
                    {/* WS indicator */}

                    {
                        isAuthenticated ?
                        <div className="flex flex-shrink-0 items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                        <div className={`h-2 w-2 rounded-full ${wsConnected ? "bg-success" : "animate-pulse bg-warning"}`} />
                        <span className="text-[11px] font-bold tracking-wider text-slate-500">
                            {wsConnected ? "LIVE" : "CONNECTING"}
                        </span>
                    </div> : ""
                    }
                    

                    {/* Auth area */}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] font-semibold text-slate-700">
                                {user?.first_name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="rounded-xl border border-slate-200 px-3 py-2 text-[12px] font-semibold text-slate-500 transition-all hover:border-red-200 hover:text-red-500"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <Link
                            to={ROUTES.LOGIN}
                            className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-slate shadow-md shadow-brand/20 transition-all hover:bg-brand-dark"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </header>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                <PropertyFilters filters={filters} onChange={handleFilterChange} />
                <main className="flex-1 overflow-hidden">
                    <PropertyGrid
                        totalCount={totalProperties}
                        paginatedProperties={paginatedProperties}
                        watchedIds={watchedIds}
                        onToggleWatch={toggleWatch}
                        hasMore={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        isLoading={isLoading}
                        isError={isError}
                        refetch={refetch}
                        sentinelRef={sentinelRef}
                        activeFilterCount={activeFilterCount}
                    />
                </main>
                <WatchlistPanel
                    items={watchlist}
                    allProperties={paginatedProperties}
                    onRemove={removeFromWatchlist}
                    wsEvents={wsEvents}
                />
            </div>
        </div>
    )
}
