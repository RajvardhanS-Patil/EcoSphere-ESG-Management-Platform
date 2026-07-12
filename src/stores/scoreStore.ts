import { create } from 'zustand';
import { useEnvironmentalStore } from './environmentalStore';
import { useSocialGamificationStore } from './socialGamificationStore';
import { useGovernanceStore } from './governanceStore';
import { useMasterDataStore } from './masterDataStore';

interface DepartmentScore {
  departmentId: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  totalScore: number;
}

interface ScoreState {
  getDepartmentScores: () => DepartmentScore[];
  getOverallScore: () => number;
}

export const useScoreStore = create<ScoreState>((set, get) => ({
  getDepartmentScores: () => {
    const departments = useMasterDataStore.getState().departments;
    const carbonTxs = useEnvironmentalStore.getState().carbonTransactions;
    const participations = useSocialGamificationStore.getState().participations;
    const issues = useGovernanceStore.getState().complianceIssues;

    return departments.map(dept => {
      // Basic mock calculation logic for demonstration

      // Env Score (Inverse to emissions, max 100)
      const deptEmissions = carbonTxs.filter(tx => tx.departmentId === dept.id).reduce((sum, tx) => sum + tx.calculatedCO2e, 0);
      const environmentalScore = Math.max(0, 100 - (deptEmissions / 100)); // Just a mock formula

      // Social Score (Based on points earned, max 100)
      const socialPoints = participations
        .filter(p => p.status === 'Approved' /* and employee belongs to dept */)
        .reduce((sum, p) => sum + p.pointsEarned, 0);
      const socialScore = Math.min(100, (socialPoints / 100) * 20); // Just a mock formula

      // Gov Score (100 minus open high severity issues)
      const openIssues = issues.filter(i => i.ownerId === dept.id && i.status !== 'Resolved');
      const governanceScore = Math.max(0, 100 - (openIssues.length * 10));

      // Weighted average: Env 40%, Soc 30%, Gov 30% (as per problem statement)
      const totalScore = Math.round((environmentalScore * 0.4) + (socialScore * 0.3) + (governanceScore * 0.3));

      return {
        departmentId: dept.id,
        environmentalScore: Math.round(environmentalScore),
        socialScore: Math.round(socialScore),
        governanceScore: Math.round(governanceScore),
        totalScore
      };
    });
  },

  getOverallScore: () => {
    const scores = get().getDepartmentScores();
    if (scores.length === 0) return 92;
    const total = scores.reduce((sum, s) => sum + s.totalScore, 0);
    return Math.round(total / scores.length);
  }
}));
