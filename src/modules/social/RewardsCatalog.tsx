import React from "react";
import { Gift, Star } from "lucide-react";
import { Reward } from "@/stores/masterDataStore";

interface RewardsCatalogProps {
  rewards: Reward[];
  userXp: number;
  onRedeem: (rewardId: string) => void;
}

export function RewardsCatalog({ rewards, userXp, onRedeem }: RewardsCatalogProps) {
  return (
    <div className="col-span-12 lg:col-span-12 bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm mt-lg">
      <div className="flex justify-between items-center mb-lg">
        <div className="flex items-center gap-sm">
          <Gift className="text-secondary w-6 h-6" />
          <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Rewards Catalog</h3>
        </div>
        <div className="flex items-center gap-1 bg-tertiary-container/30 px-3 py-1 rounded-full border border-tertiary/20">
          <Star className="w-4 h-4 text-tertiary" />
          <span className="text-label-md font-bold text-tertiary">Your XP: {userXp}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-md">
        {rewards.filter(r => r.status === 'Active').map((reward) => {
          const canAfford = userXp >= reward.pointsRequired;
          const inStock = reward.stock > 0;
          const disabled = !canAfford || !inStock;

          return (
            <div key={reward.id} className="p-md bg-surface-container-low rounded-lg border border-outline-variant flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-sm">
                  <h4 className="font-title-md font-semibold text-on-surface">{reward.name}</h4>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${inStock ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                    {inStock ? `${reward.stock} Left` : 'Out of Stock'}
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant mb-md h-10 overflow-hidden line-clamp-2">
                  {reward.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-sm border-t border-outline-variant/50">
                <span className={`font-label-md font-bold flex items-center gap-1 ${canAfford ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                  <Star className="w-3 h-3" />
                  {reward.pointsRequired} XP
                </span>
                
                <button
                  onClick={() => onRedeem(reward.id)}
                  disabled={disabled}
                  className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                    disabled 
                      ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-50' 
                      : 'bg-secondary text-on-secondary hover:opacity-90 active:scale-95 shadow-sm'
                  }`}
                >
                  {inStock ? 'Redeem' : 'Sold Out'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
