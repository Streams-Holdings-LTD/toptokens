export function Giveaways() {
  return (
    <div className="bg-[#1a1d28] border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Giveaways</h3>

      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎁</div>
        <p className="text-muted-foreground text-sm">
          No active giveaways at the moment, but exciting ones are coming soon!
        </p>
        <button className="text-emerald-400 text-sm mt-4 hover:underline">View All Giveaways</button>
      </div>
    </div>
  )
}
