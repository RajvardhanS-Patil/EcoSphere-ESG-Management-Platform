import { create } from 'zustand';
import { useMasterDataStore } from './masterDataStore';
import { useSettingsStore } from './settingsStore';

export interface CarbonTransaction {
  id: string;
  date: string;
  departmentId: string;
  emissionFactorId: string;
  quantity: number;
  calculatedCO2e: number;
  source: 'Purchase' | 'Manufacturing' | 'Expense' | 'Fleet';
}

interface EnvironmentalState {
  carbonTransactions: CarbonTransaction[];
  addCarbonTransaction: (transaction: Omit<CarbonTransaction, 'id' | 'calculatedCO2e'>) => void;
}

export const useEnvironmentalStore = create<EnvironmentalState>((set, get) => ({
  carbonTransactions: [
    { id: 'ct1', date: '2024-10-01', departmentId: 'd1', emissionFactorId: 'ef1', quantity: 8200, calculatedCO2e: 3690, source: 'Manufacturing' },
    { id: 'ct2', date: '2024-10-05', departmentId: 'd2', emissionFactorId: 'ef2', quantity: 450, calculatedCO2e: 1206, source: 'Fleet' },
    { id: 'ct3', date: '2024-10-12', departmentId: 'd1', emissionFactorId: 'ef1', quantity: 6100, calculatedCO2e: 2745, source: 'Manufacturing' },
    { id: 'ct4', date: '2024-10-18', departmentId: 'd3', emissionFactorId: 'ef3', quantity: 2800, calculatedCO2e: 420, source: 'Expense' },
    { id: 'ct5', date: '2024-10-25', departmentId: 'd2', emissionFactorId: 'ef2', quantity: 320, calculatedCO2e: 857.6, source: 'Fleet' },
    { id: 'ct6', date: '2024-11-02', departmentId: 'd4', emissionFactorId: 'ef1', quantity: 4500, calculatedCO2e: 2025, source: 'Purchase' },
    { id: 'ct7', date: '2024-11-08', departmentId: 'd1', emissionFactorId: 'ef2', quantity: 180, calculatedCO2e: 482.4, source: 'Fleet' },
    { id: 'ct8', date: '2024-11-12', departmentId: 'd3', emissionFactorId: 'ef3', quantity: 5200, calculatedCO2e: 780, source: 'Expense' },
  ],
  addCarbonTransaction: (tx) => {
    const state = get();
    const settings = useSettingsStore.getState();
    const masterData = useMasterDataStore.getState();

    let calculatedCO2e = 0;
    
    // Auto Emission Calculation Rule
    if (settings.autoEmissionCalc) {
      const factor = masterData.emissionFactors.find(f => f.id === tx.emissionFactorId);
      if (factor) {
        calculatedCO2e = tx.quantity * factor.co2ePerUnit;
      }
    } else {
      calculatedCO2e = 0;
    }

    const newTx: CarbonTransaction = {
      ...tx,
      id: 'ct' + Date.now().toString(36),
      calculatedCO2e
    };

    set({ carbonTransactions: [...state.carbonTransactions, newTx] });
  }
}));
