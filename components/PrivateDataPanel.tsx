import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { EquityGrant } from "@/lib/mock/types";

interface PrivateDataPanelProps {
  grant: EquityGrant;
}

export default function PrivateDataPanel({ grant }: PrivateDataPanelProps) {
  const [showPrivate, setShowPrivate] = useState(false);

  const vestedValue = grant.vestedShares * grant.currentFMV;
  const vestingPercent = (grant.vestedShares / grant.totalShares) * 100;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lock className="w-5 h-5 text-red-400" />
          Private Equity Data
        </h2>
        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
          Never Transmitted
        </span>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-slate-900/50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Vested Value</span>
            <button
              onClick={() => setShowPrivate(!showPrivate)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {showPrivate ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-3xl font-bold">
            {showPrivate ? `$${vestedValue.toLocaleString()}` : "•••••••"}
          </p>
        </div>

        {showPrivate && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Total Shares</p>
                <p className="font-semibold">
                  {grant.totalShares.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Vested Shares</p>
                <p className="font-semibold">
                  {grant.vestedShares.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Current FMV</p>
                <p className="font-semibold">${grant.currentFMV.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Strike Price</p>
                <p className="font-semibold">${grant.strikePrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-lg">
              <p className="text-xs text-slate-400 mb-2">Vesting Progress</p>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all"
                  style={{ width: `${vestingPercent}%` }}
                />
              </div>
              <p className="text-sm mt-2 text-slate-400">
                {vestingPercent.toFixed(1)}% vested ({grant.vestingDuration}{" "}
                month schedule)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
