import React from "react";
import { CheckCircle, XCircle, Globe, Copy } from "lucide-react";
import { ProofResult } from "@/lib/mock/types";

interface ProofResultProps {
  proof: ProofResult | null;
}

export default function ProofResultComponent({ proof }: ProofResultProps) {
  if (!proof) {
    return (
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-400" />
          Public Verification
        </h2>
        <div className="text-center py-12 text-slate-500">
          <p>No proof generated yet</p>
          <p className="text-sm mt-2">Generate a proof to see the result</p>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-400" />
          Public Verification
        </h2>
        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
          Publicly Visible
        </span>
      </div>

      <div className="text-center py-8">
        {proof.verified ? (
          <>
            <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-400 mb-2">
              Verified
            </h3>
            <p className="text-slate-400">
              Claim has been verified successfully
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-400 mb-2">
              Not Verified
            </h3>
            <p className="text-slate-400">Claim does not meet the criteria</p>
          </>
        )}
      </div>

      <div className="space-y-3 mt-6">
        <div className="p-3 bg-slate-900/50 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">Proof ID</p>
            <button
              onClick={() => copyToClipboard(proof.proofId)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
          <p className="text-sm font-mono text-purple-400 truncate">
            {proof.proofId}
          </p>
        </div>

        <div className="p-3 bg-slate-900/50 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Transaction Hash</p>
          <p className="text-sm font-mono truncate">{proof.txHash}</p>
        </div>

        <div className="p-3 bg-slate-900/50 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Generated</p>
          <p className="text-sm">
            {new Date(proof.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
        <h4 className="font-medium mb-2 text-red-400">What Remains Private</h4>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>• Actual equity value</li>
          <li>• Number of shares</li>
          <li>• Company details</li>
          <li>• Personal information</li>
        </ul>
      </div>
    </div>
  );
}
