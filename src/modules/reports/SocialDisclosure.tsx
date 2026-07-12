import React from "react";
import { Users, Users2, ShieldPlus, ChevronRight } from "lucide-react";

interface SocialData {
  title: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  diversity_3: <Users2 className="text-tertiary w-6 h-6" />,
  health_and_safety: <ShieldPlus className="text-tertiary w-6 h-6" />
};

export function SocialDisclosure({ data }: { data: SocialData[] }) {
  return (
    <div className="col-span-12 lg:col-span-6 bg-surface-container-lowest/50 backdrop-blur-md rounded-2xl p-lg border-t-2 border-t-tertiary shadow-sm">
      <div className="flex justify-between items-center mb-md">
        <h4 className="font-headline-md text-headline-md text-primary">Social Disclosure</h4>
        <Users className="text-outline w-6 h-6" />
      </div>
      <ul className="space-y-md">
        {data.map((item, i) => (
          <li key={i} className="flex justify-between items-center p-sm hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center">
                {iconMap[item.icon]}
              </div>
              <span className="font-body-md text-on-surface">{item.title}</span>
            </div>
            <ChevronRight className="text-outline w-5 h-5" />
          </li>
        ))}
      </ul>
    </div>
  );
}
