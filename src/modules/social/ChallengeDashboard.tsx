import React from "react";
import { Zap, Bike, Recycle } from "lucide-react";

interface Challenge {
  title: string;
  description: string;
  reward: string;
  icon: string;
  bgClass: string;
}

const iconMap: Record<string, React.ReactNode> = {
  bike: <Bike className="w-6 h-6" />,
  recycle: <Recycle className="w-6 h-6" />,
};

export function ChallengeDashboard({ challenges }: { challenges: Challenge[] }) {
  return (
    <section className="bg-primary text-on-primary rounded-3xl p-xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Background Animation Placeholder */}
      </div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-xl">
          <div>
            <h4 className="font-headline-md">Active ESG Challenges</h4>
            <p className="text-on-primary-container font-body-sm">Boost your department&apos;s CSR impact score</p>
          </div>
          <Zap className="w-8 h-8" />
        </div>
        <div className="space-y-md">
          {challenges.map((challenge, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-lg border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-lg">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${challenge.bgClass}`}>
                  {iconMap[challenge.icon]}
                </div>
                <div>
                  <h6 className="font-body-md font-bold">{challenge.title}</h6>
                  <p className="text-xs text-on-primary-container">{challenge.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-xl">
                <div className="text-right">
                  <p className="text-xs opacity-70">Reward</p>
                  <p className="font-label-md">{challenge.reward}</p>
                </div>
                <button className="px-lg py-sm bg-on-primary text-primary font-bold rounded-lg hover:scale-105 active:scale-95 transition-all">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
