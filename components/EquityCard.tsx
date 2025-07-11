import React from "react";
import { Check } from "lucide-react";
import { EquityGrant } from "@/lib/mock/types";

interface EquityCardProps {
  grant: EquityGrant;
  selected: boolean;
  onClick: () => void;
}

export default function EquityCard({
  grant,
  selected,
  onClick,
}: EquityCardProps) {
  const vestedValue = grant.vestedShares * grant.currentFMV;
  const vestingPercent = (grant.vestedShares / grant.totalShares) * 100;

  return (
    <button
      onClick={onClick}
      className={`
        relative p-6 rounded-2xl transition-all duration-300 text-left w-full
        ${
          selected
            ? "glass glow border-emerald-500/50 scale-[1.02]"
            : "glass hover:border-white/20 hover:scale-[1.01]"
        }
      `}
    >
      {selected && (
        <div className="absolute top-4 right-4">
          <Check className="w-5 h-5 text-emerald-400" />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="text-4xl">{grant.logo}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{grant.company}</h3>
          <p className="text-sm text-slate-400 mb-3">
            {grant.totalShares.toLocaleString()} shares granted
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-500">Vested</p>
              <p className="font-medium">${vestedValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-500">Progress</p>
              <p className="font-medium">{vestingPercent.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
