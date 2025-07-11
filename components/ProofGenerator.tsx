import React, { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { EquityGrant, ProofType } from "@/lib/mock/types";
import { EquityService } from "@/lib/mock/equityService";

interface ProofGeneratorProps {
  grant: EquityGrant;
  onProofGenerated: (proof: any) => void;
}

export default function ProofGenerator({
  grant,
  onProofGenerated,
}: ProofGeneratorProps) {
  const [proofType, setProofType] = useState<ProofType>("vestedValueAbove");
  const [threshold, setThreshold] = useState(500000);
  const [loading, setLoading] = useState(false);

  const handleGenerateProof = async () => {
    setLoading(true);
    try {
      const proof = await EquityService.generateProof(
        grant,
        proofType,
        threshold
      );
      onProofGenerated(proof);
    } finally {
      setLoading(false);
    }
  };

  const getThresholdLabel = () => {
    switch (proofType) {
      case "vestedValueAbove":
        return "Threshold Amount ($)";
      case "ownershipAbove":
        return "Ownership Threshold (%)";
      case "vestingProgress":
        return "Vesting Threshold (%)";
      default:
        return null;
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-emerald-400" />
        Generate Zero-Knowledge Proof
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Proof Type
          </label>
          <select
            value={proofType}
            onChange={(e) => setProofType(e.target.value as ProofType)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl 
                     focus:border-emerald-500 focus:outline-none transition-colors"
          >
            <option value="vestedValueAbove">
              Vested Value Above Threshold
            </option>
            <option value="ownershipAbove">Ownership Percentage Above</option>
            <option value="inTheMoney">Options In The Money</option>
            <option value="vestingProgress">Vesting Progress Above</option>
          </select>
        </div>

        {getThresholdLabel() && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {getThresholdLabel()}
            </label>
            <input
              type="number"
              value={
                proofType === "vestedValueAbove"
                  ? threshold
                  : proofType === "ownershipAbove"
                  ? 0.01
                  : 50
              }
              onChange={(e) => setThreshold(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl 
                       focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>
        )}

        <button
          onClick={handleGenerateProof}
          disabled={loading}
          className="w-full relative group"
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 
                        rounded-xl blur-sm group-hover:blur-md transition-all"
          />
          <div
            className="relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 
                        rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Proof...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate Proof</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
