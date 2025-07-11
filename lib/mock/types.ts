export interface EquityGrant {
  id: string;
  company: string;
  logo: string;
  totalShares: number;
  vestedShares: number;
  currentFMV: number;
  strikePrice: number;
  grantDate: string;
  vestingCliff: number;
  vestingDuration: number;
}

export interface ProofResult {
  success: boolean;
  verified: boolean;
  proofId: string;
  txHash: string;
  timestamp: string;
  claimType: string;
  publicInputs: unknown;
}

export type ProofType =
  | "vestedValueAbove"
  | "ownershipAbove"
  | "inTheMoney"
  | "vestingProgress";
