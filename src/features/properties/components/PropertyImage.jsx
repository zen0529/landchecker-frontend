export default function PropertyImage({ color, status }) {
    // Check if color is a URL or a hex code
    const isUrl = color?.startsWith("http") || color?.startsWith("/") || color?.includes(".")
    const style = isUrl 
        ? { backgroundImage: `url(${color})`, backgroundSize: 'cover', backgroundPosition: 'center' } 
        : { background: color }

    return (
        <div className="relative h-[160px] shrink-0 overflow-hidden bg-slate-100" style={style}>
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
            
            {status === "under_contract" && (
                <div className="absolute left-4 top-4 rounded-lg bg-warning px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg shadow-warning/30 backdrop-blur-md">
                    Under Contract
                </div>
            )}
        </div>
    )
}