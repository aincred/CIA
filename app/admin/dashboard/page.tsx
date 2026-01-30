export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back, Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Your stats cards here */}
        <div className="h-32 bg-slate-900/50 rounded-2xl border border-white/5 p-6">Enrolled: 1,200</div>
        <div className="h-32 bg-slate-900/50 rounded-2xl border border-white/5 p-6">Revenue: ₹1.5L</div>
      </div>
    </div>
  );
}