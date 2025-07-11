import { EquityGrant, ProofResult, ProofType } from "./types";

// Mock data
export const mockGrants: EquityGrant[] = [
  {
    id: "grant-001",
    company: "TechUnicorn Inc.",
    logo: "🦄",
    totalShares: 40000,
    vestedShares: 30000,
    currentFMV: 45.0,
    strikePrice: 2.5,
    grantDate: "2021-03-15",
    vestingCliff: 12,
    vestingDuration: 48,
  },
  {
    id: "grant-002",
    company: "StartupXYZ",
    logo: "🚀",
    totalShares: 100000,
    vestedShares: 25000,
    currentFMV: 12.5,
    strikePrice: 1.0,
    grantDate: "2023-01-10",
    vestingCliff: 12,
    vestingDuration: 48,
  },
];

export class EquityService {
  static async generateProof(
    grant: EquityGrant,
    proofType: ProofType,
    threshold?: number
  ): Promise<ProofResult> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const vestedValue = grant.vestedShares * grant.currentFMV;
    let verified = false;

    switch (proofType) {
      case "vestedValueAbove":
        verified = vestedValue > (threshold || 0);
        break;
      case "ownershipAbove":
        verified = (grant.totalShares / 10000000) * 100 > (threshold || 0);
        break;
      case "inTheMoney":
        verified = grant.currentFMV > grant.strikePrice;
        break;
      case "vestingProgress":
        verified =
          (grant.vestedShares / grant.totalShares) * 100 > (threshold || 0);
        break;
    }

    return {
      success: true,
      verified,
      proofId: `0x${Array(64)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`,
      txHash: `0x${Array(64)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")}`,
      timestamp: new Date().toISOString(),
      claimType: proofType,
      publicInputs: { threshold },
    };
  }
}
