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
  fetchDepartments: () => Promise<void>;
  addDepartment: (dept: Department) => void;
  addCategory: (cat: Category) => void;
  addEmissionFactor: (ef: EmissionFactor) => void;
  addBadge: (badge: Badge) => void;
  addReward: (reward: Reward) => void;
  updateRewardStock: (id: string, newStock: number) => void;
}

export const useMasterDataStore = create<MasterDataState>((set) => ({
  departments: [
    { id: 'd1', name: 'Manufacturing', code: 'MFG', head: 'Priya Sharma', parentDepartment: null, employeeCount: 150, status: 'Active' },
    { id: 'd2', name: 'Procurement', code: 'PROC', head: 'Aarav Mehta', parentDepartment: null, employeeCount: 45, status: 'Active' },
    { id: 'd3', name: 'Operations', code: 'OPS', head: 'Aditya Joshi', parentDepartment: null, employeeCount: 85, status: 'Active' },
    { id: 'd4', name: 'Sustainability', code: 'SUST', head: 'Neha Deshmukh', parentDepartment: null, employeeCount: 30, status: 'Active' },
    { id: 'd5', name: 'Human Resources', code: 'HR', head: 'Ananya Iyer', parentDepartment: null, employeeCount: 40, status: 'Active' },
    { id: 'd6', name: 'Corporate Affairs', code: 'CORP', head: 'Raj Patil', parentDepartment: null, employeeCount: 25, status: 'Active' },
  ],
  categories: [
    { id: 'c1', name: 'Community Service', type: 'CSR Activity', status: 'Active' },
    { id: 'c2', name: 'Energy Saving', type: 'Challenge', status: 'Active' },
    { id: 'c3', name: 'Waste Reduction', type: 'CSR Activity', status: 'Active' },
  ],
  emissionFactors: [
    { id: 'ef1', name: 'Electricity - Grid', unit: 'kWh', co2ePerUnit: 0.45 },
    { id: 'ef2', name: 'Diesel Fuel', unit: 'liter', co2ePerUnit: 2.68 },
    { id: 'ef3', name: 'Flight - Short Haul', unit: 'km', co2ePerUnit: 0.15 },
  ],
  badges: [
    { id: 'b1', name: 'Green Starter', description: 'Complete your first CSR activity', unlockRule: { type: 'CHALLENGE_COUNT', threshold: 1 }, icon: 'leaf' },
    { id: 'b2', name: 'Eco Warrior', description: 'Earn 1,000 XP through sustainability efforts', unlockRule: { type: 'XP', threshold: 1000 }, icon: 'shield' },
    { id: 'b3', name: 'Carbon Champion', description: 'Earn 2,500 XP and become a sustainability leader', unlockRule: { type: 'XP', threshold: 2500 }, icon: 'trophy' },
  ],
  rewards: [
    { id: 'r1', name: 'Extra PTO Day', description: 'Redeem for 1 day of Paid Time Off', pointsRequired: 5000, stock: 10, status: 'Active' },
    { id: 'r2', name: '$50 Vegan Cafe Voucher', description: 'Sustainable dining on us!', pointsRequired: 1000, stock: 50, status: 'Active' },
    { id: 'r3', name: 'EcoSphere Merch Kit', description: 'Branded bamboo bottle, tote bag & notebook', pointsRequired: 750, stock: 25, status: 'Active' },
    { id: 'r4', name: 'Carbon Offset Certificate', description: 'Offset 1 tonne of CO2 in your name', pointsRequired: 2000, stock: 100, status: 'Active' },
  ],
  policies: [
    { id: 'p1', title: 'Anti-Corruption Framework 2024', version: '4.2' },
    { id: 'p2', title: 'Sustainable Sourcing Protocol', version: '1.0' },
    { id: 'p3', title: 'Net-Zero Commitment Charter', version: '2.3' },
  ],
  
  fetchDepartments: async () => {
    try {
      const res = await fetch('/api/master-data/departments');
      const data = await res.json();
      set({ departments: data });
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  },
  
  addDepartment: async (dept) => {
    try {
      const res = await fetch('/api/master-data/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dept)
      });
      const newDept = await res.json();
      set((state) => ({ departments: [...state.departments, newDept] }));
    } catch (err) {
      console.error("Failed to create department", err);
    }
  },
  addCategory: (cat) => set((state) => ({ categories: [...state.categories, cat] })),
  addEmissionFactor: (ef) => set((state) => ({ emissionFactors: [...state.emissionFactors, ef] })),
  addBadge: (badge) => set((state) => ({ badges: [...state.badges, badge] })),
  addReward: (reward) => set((state) => ({ rewards: [...state.rewards, reward] })),
  updateRewardStock: (id, newStock) => set((state) => ({
    rewards: state.rewards.map(r => r.id === id ? { ...r, stock: newStock } : r)
  }))
}));
