import { SORT_OPTIONS } from "../constants/propertyConstants"

export default function PropertySortControls({ sortBy, sortDir, onSortChange, onDirChange }) {
    const currentValue = `${sortBy}_${sortDir}`

    const handleChange = (e) => {
        const value = e.target.value
        const dir = value.endsWith('_desc') ? 'desc' : 'asc'
        const field = value.substring(0, value.lastIndexOf('_'))
        onSortChange(field)
        onDirChange(dir)
    }

    return (
        <div className="ml-auto flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Sort by</span>
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 p-1">
                <select
                    value={currentValue}
                    onChange={handleChange}
                    className="cursor-pointer bg-transparent px-3 py-1.5 text-xs font-bold text-slate-700 outline-none transition-colors hover:text-slate-900"
                >
                    {SORT_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}