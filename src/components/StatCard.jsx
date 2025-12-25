
export default function StatCard({ title, value, fullWidth = false }) {
  return (
    <div
      className={`
        
        relative rounded-2xl
        ${fullWidth ? "col-span-2 md:col-span-4 h-32" : "h-28"}
        bg-black/60
        border border-white/50
        transition-all duration-300
        hover:-translate-y-2 hover:scale-[1.02]
        hover:shadow-[0_0_35px_rgba(236,72,153,0.7)]
        mt-3
      `}
      
    >
      {/* Glowing Border */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-pink-500/40 blur-[1px] "></div>



      {/* Content */}
      <div className="relative  flex flex-col items-center justify-center h-full p-10">
        <p className="text-sm font-medium text-yellow-400 tracking-wide">
          {title}
        </p>
        <h2 className="mt-2 text-4xl font-extrabold text-green-400">
          {value}
        </h2>
      </div>
    </div>
  );
}