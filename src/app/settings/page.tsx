"use client";

import { useSettingsStore } from "@/stores/settingsStore";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Settings as SettingsIcon, Database, Save, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNotificationStore } from "@/stores/notificationStore";

export default function SettingsPage() {
  const settings = useSettingsStore();
  const notify = useNotificationStore(state => state.addNotification);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      notify({ title: "Settings Saved", message: "Application configuration updated successfully.", type: "success" });
    }, 800);
  };

  return (
    <div className="space-y-xl pb-24 max-w-4xl">
      <SectionHeader title="Application Settings" subtitle="Configure business rules and master data" />

      <div className="bg-surface rounded-2xl p-lg border border-outline-variant shadow-sm space-y-lg">
        <h3 className="text-title-lg text-on-surface flex items-center gap-sm">
          <Database className="w-5 h-5 text-primary" /> Core Business Rules
        </h3>

        <div className="space-y-md">
          {/* Rule 1 */}
          <div className="flex items-center justify-between p-md border border-outline-variant rounded-xl">
            <div>
              <p className="text-title-md text-on-surface">Auto Emission Calculation</p>
              <p className="text-body-md text-on-surface-variant">Automatically calculate CO2e when creating Carbon Transactions.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.autoEmissionCalc} onChange={(e) => settings.setSetting('autoEmissionCalc', e.target.checked)} />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Rule 2 */}
          <div className="flex items-center justify-between p-md border border-outline-variant rounded-xl">
            <div>
              <p className="text-title-md text-on-surface">Evidence Requirement (CSR)</p>
              <p className="text-body-md text-on-surface-variant">Require proof URL for approving CSR activities.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.evidenceReq} onChange={(e) => settings.setSetting('evidenceReq', e.target.checked)} />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Rule 3 */}
          <div className="flex items-center justify-between p-md border border-outline-variant rounded-xl">
            <div>
              <p className="text-title-md text-on-surface">Badge Auto-Award</p>
              <p className="text-body-md text-on-surface-variant">Automatically assign badges when unlock thresholds are met.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.badgeAutoAward} onChange={(e) => settings.setSetting('badgeAutoAward', e.target.checked)} />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="pt-md flex justify-end">
          <button onClick={handleSave} className="bg-primary text-on-primary px-lg py-sm rounded-full flex items-center gap-sm hover:opacity-90">
            {saving ? <span className="animate-pulse">Saving...</span> : <><Save className="w-4 h-4" /> Save Configuration</>}
          </button>
        </div>
      </div>
    </div>
  );
}
