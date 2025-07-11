import { useState } from "react";
import { Shield } from "lucide-react";
import EquityCard from "@/components/EquityCard";
import PrivateDataPanel from "@/components/PrivateDataPanel";
import ProofGenerator from "@/components/ProofGenerator";
import ProofResultComponent from "@/components/ProofResult";
import { mockGrants } from "@/lib/mock/equityService";
import { ProofResult } from "@/lib/mock/types";

export default function Home() {
  const [selectedGrantId, setSelectedGrantId] = useState(mockGrants[0].id);
  const [latestProof, setLatestProof] = useState<ProofResult | null>(null);

  const selectedGrant = mockGrants.find((g) => g.id === selectedGrantId)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 glass rounded-xl">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">EquityShield</h1>
                <p className="text-sm text-slate-400">
                  Privacy-First Equity Verification
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-slate-400">Midnight Testnet</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Grant Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {mockGrants.map((grant) => (
            <EquityCard
              key={grant.id}
              grant={grant}
              selected={selectedGrantId === grant.id}
              onClick={() => setSelectedGrantId(grant.id)}
            />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <PrivateDataPanel grant={selectedGrant} />
            <ProofGenerator
              grant={selectedGrant}
              onProofGenerated={setLatestProof}
            />
          </div>

          {/* Right Column */}
          <div>
            <ProofResultComponent proof={latestProof} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>EquityShield Demo • Built for Midnight Developer Relations</p>
        </div>
      </footer>
    </div>
  );
}
