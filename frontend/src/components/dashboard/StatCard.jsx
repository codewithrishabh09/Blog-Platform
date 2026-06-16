function StatCard({ title, value }) {
  return (
    <div className="bg-white border border-[#E8E6E0] rounded-xl p-6">
      <p
        className="text-xs uppercase tracking-wide text-[#1A1A1A]/50 mb-2"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {title}
      </p>
      <p
        className="text-3xl text-[#1A1A1A]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {value}
      </p>
    </div>
  );
}

export default StatCard;