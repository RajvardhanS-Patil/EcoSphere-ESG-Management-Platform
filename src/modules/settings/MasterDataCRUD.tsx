import React, { useState } from "react";
import { Database, Plus, Edit2, Trash2 } from "lucide-react";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { useNotificationStore } from "@/stores/notificationStore";

export function MasterDataCRUD() {
  const masterData = useMasterDataStore();
  const notify = useNotificationStore(state => state.addNotification);
  const [activeTab, setActiveTab] = useState<'departments' | 'categories' | 'emissionFactors' | 'policies'>('departments');

  const handleAdd = () => {
    notify({ title: "Operation Not Permitted", message: "Master data can only be modified by System Administrators.", type: "warning" });
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'departments':
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-label-sm text-on-surface-variant">
                <th className="pb-sm font-bold uppercase">Code</th>
                <th className="pb-sm font-bold uppercase">Name</th>
                <th className="pb-sm font-bold uppercase">Head</th>
                <th className="pb-sm font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {masterData.departments.map(d => (
                <tr key={d.id} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest">
                  <td className="py-md font-body-sm text-on-surface">{d.code}</td>
                  <td className="py-md font-body-sm text-on-surface font-semibold">{d.name}</td>
                  <td className="py-md font-body-sm text-on-surface-variant">{d.head}</td>
                  <td className="py-md text-right space-x-2">
                    <button className="text-secondary hover:opacity-80"><Edit2 className="w-4 h-4" /></button>
                    <button className="text-error hover:opacity-80"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'categories':
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-label-sm text-on-surface-variant">
                <th className="pb-sm font-bold uppercase">Name</th>
                <th className="pb-sm font-bold uppercase">Type</th>
                <th className="pb-sm font-bold uppercase">Status</th>
                <th className="pb-sm font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {masterData.categories.map(c => (
                <tr key={c.id} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest">
                  <td className="py-md font-body-sm text-on-surface font-semibold">{c.name}</td>
                  <td className="py-md font-body-sm text-on-surface-variant">{c.type}</td>
                  <td className="py-md font-body-sm text-secondary">{c.status}</td>
                  <td className="py-md text-right space-x-2">
                    <button className="text-secondary hover:opacity-80"><Edit2 className="w-4 h-4" /></button>
                    <button className="text-error hover:opacity-80"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'emissionFactors':
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-label-sm text-on-surface-variant">
                <th className="pb-sm font-bold uppercase">Source</th>
                <th className="pb-sm font-bold uppercase">Unit</th>
                <th className="pb-sm font-bold uppercase">Factor (kg CO2e)</th>
                <th className="pb-sm font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {masterData.emissionFactors.map(e => (
                <tr key={e.id} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest">
                  <td className="py-md font-body-sm text-on-surface font-semibold">{e.name}</td>
                  <td className="py-md font-body-sm text-on-surface-variant">{e.unit}</td>
                  <td className="py-md font-body-sm text-error">{e.co2ePerUnit}</td>
                  <td className="py-md text-right space-x-2">
                    <button className="text-secondary hover:opacity-80"><Edit2 className="w-4 h-4" /></button>
                    <button className="text-error hover:opacity-80"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'policies':
        return (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-label-sm text-on-surface-variant">
                <th className="pb-sm font-bold uppercase">Title</th>
                <th className="pb-sm font-bold uppercase">Version</th>
                <th className="pb-sm font-bold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {masterData.policies.map(p => (
                <tr key={p.id} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest">
                  <td className="py-md font-body-sm text-on-surface font-semibold">{p.title}</td>
                  <td className="py-md font-body-sm text-on-surface-variant">v{p.version}</td>
                  <td className="py-md text-right space-x-2">
                    <button className="text-secondary hover:opacity-80"><Edit2 className="w-4 h-4" /></button>
                    <button className="text-error hover:opacity-80"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-lg border border-outline-variant shadow-sm space-y-lg mt-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-title-lg text-on-surface flex items-center gap-sm">
          <Database className="w-5 h-5 text-primary" /> Master Data Management
        </h3>
        <button onClick={handleAdd} className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold flex items-center gap-1 hover:bg-primary/20 transition-all">
          <Plus className="w-4 h-4" /> Add Record
        </button>
      </div>

      <div className="flex gap-4 border-b border-outline-variant overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveTab('departments')} 
          className={`font-label-lg font-bold px-2 py-1 whitespace-nowrap ${activeTab === 'departments' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Departments
        </button>
        <button 
          onClick={() => setActiveTab('categories')} 
          className={`font-label-lg font-bold px-2 py-1 whitespace-nowrap ${activeTab === 'categories' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Categories
        </button>
        <button 
          onClick={() => setActiveTab('emissionFactors')} 
          className={`font-label-lg font-bold px-2 py-1 whitespace-nowrap ${activeTab === 'emissionFactors' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Emission Factors
        </button>
        <button 
          onClick={() => setActiveTab('policies')} 
          className={`font-label-lg font-bold px-2 py-1 whitespace-nowrap ${activeTab === 'policies' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          ESG Policies
        </button>
      </div>

      <div className="overflow-x-auto">
        {renderTable()}
      </div>
    </div>
  );
}
