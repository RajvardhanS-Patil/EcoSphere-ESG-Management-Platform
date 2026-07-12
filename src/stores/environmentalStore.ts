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
    { id: 'ct1', date: '2024-10-15', departmentId: 'd1', emissionFactorId: 'ef1', quantity: 5000, calculatedCO2e: 2250, source: 'Manufacturing' },
    { id: 'ct2', date: '2024-10-18', departmentId: 'd2', emissionFactorId: 'ef2', quantity: 200, calculatedCO2e: 536, source: 'Fleet' },
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
      // In a real scenario, this might prompt manual entry, but we'll default to 0 if auto calc is off.
      calculatedCO2e = 0;
    }

    const newTx: CarbonTransaction = {
      ...tx,
      id: Math.random().toString(36).substring(7),
      calculatedCO2e
    };

    set({ carbonTransactions: [...state.carbonTransactions, newTx] });
  }
}));
