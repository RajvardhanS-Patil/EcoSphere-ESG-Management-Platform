import { create } from 'zustand';

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  parentDepartment: string | null;
  employeeCount: number;
  status: 'Active' | 'Inactive';
}

export interface Category {
  id: string;
  name: string;
  type: 'CSR Activity' | 'Challenge';
  status: 'Active' | 'Inactive';
}

export interface EmissionFactor {
  id: string;
  name: string; // e.g., "Electricity - Grid", "Diesel Fuel"
  unit: string; // e.g., "kWh", "liter"
  co2ePerUnit: number; // e.g., 0.45 kg CO2e
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  unlockRule: {
    type: 'XP' | 'CHALLENGE_COUNT';
    threshold: number;
  };
  icon: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  stock: number;
  status: 'Active' | 'Inactive';
}

export interface ESGPolicy {
  id: string;
  title: string;
  version: string;
}

interface MasterDataState {
  departments: Department[];
  categories: Category[];
  emissionFactors: EmissionFactor[];
  badges: Badge[];
  rewards: Reward[];
  policies: ESGPolicy[];
  
  // Generic Actions
  addDepartment: (dept: Department) => void;
  addCategory: (cat: Category) => void;
  addEmissionFactor: (ef: EmissionFactor) => void;
  addBadge: (badge: Badge) => void;
  addReward: (reward: Reward) => void;
  updateRewardStock: (id: string, newStock: number) => void;
}

export const useMasterDataStore = create<MasterDataState>((set) => ({
  departments: [
    { id: 'd1', name: 'Operations', code: 'OPS', head: 'Sarah Connor', parentDepartment: null, employeeCount: 120, status: 'Active' },
    { id: 'd2', name: 'Logistics', code: 'LOG', head: 'Frank Castle', parentDepartment: 'OPS', employeeCount: 45, status: 'Active' },
  ],
  categories: [
    { id: 'c1', name: 'Community Service', type: 'CSR Activity', status: 'Active' },
    { id: 'c2', name: 'Energy Saving', type: 'Challenge', status: 'Active' },
  ],
  emissionFactors: [
    { id: 'ef1', name: 'Electricity - Grid', unit: 'kWh', co2ePerUnit: 0.45 },
    { id: 'ef2', name: 'Diesel Fuel', unit: 'liter', co2ePerUnit: 2.68 },
    { id: 'ef3', name: 'Flight - Short Haul', unit: 'km', co2ePerUnit: 0.15 },
  ],
  badges: [
    { id: 'b1', name: 'Green Starter', description: 'Complete your first challenge', unlockRule: { type: 'CHALLENGE_COUNT', threshold: 1 }, icon: 'leaf' },
    { id: 'b2', name: 'Eco Warrior', description: 'Earn 1000 XP', unlockRule: { type: 'XP', threshold: 1000 }, icon: 'shield' },
  ],
  rewards: [
    { id: 'r1', name: 'Extra PTO Day', description: 'Redeem points for 1 day of Paid Time Off', pointsRequired: 5000, stock: 10, status: 'Active' },
    { id: 'r2', name: '$50 Vegan Cafe Voucher', description: 'Lunch on us!', pointsRequired: 1000, stock: 50, status: 'Active' },
  ],
  policies: [
    { id: 'p1', title: 'Anti-Corruption Framework 2024', version: '4.2' },
    { id: 'p2', title: 'Sustainable Sourcing Protocol', version: '1.0' },
  ],
  
  addDepartment: (dept) => set((state) => ({ departments: [...state.departments, dept] })),
  addCategory: (cat) => set((state) => ({ categories: [...state.categories, cat] })),
  addEmissionFactor: (ef) => set((state) => ({ emissionFactors: [...state.emissionFactors, ef] })),
  addBadge: (badge) => set((state) => ({ badges: [...state.badges, badge] })),
  addReward: (reward) => set((state) => ({ rewards: [...state.rewards, reward] })),
  updateRewardStock: (id, newStock) => set((state) => ({
    rewards: state.rewards.map(r => r.id === id ? { ...r, stock: newStock } : r)
  }))
}));
