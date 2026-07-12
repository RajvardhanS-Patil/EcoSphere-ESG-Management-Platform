import { KPICard } from "@/components/KPICard";
import { 
  BarChart3, 
  CloudRain, 
  Users, 
  CheckSquare,
  TrendingUp,
  ArrowDown,
  CheckCircle,
  ShieldCheck,
  ExternalLink,
  AlertTriangle,
  FileText,
  Star,
  LineChart,
  ClipboardCheck,
  Award,
  Users2,
  Settings,
  Megaphone
} from "lucide-react";

export default function ExecutiveDashboard() {
  return (
    <div className="space-y-gutter pb-12">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
        <KPICard
          title="ESG Score"
          icon={<BarChart3 className="w-5 h-5" />}
          value="84"
          unit="/100"
          trend={
            <>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+4.2% from LY</span>
            </>
          }
          trendUp={true}
          colorClass="primary"
        />
        <KPICard
          title="Carbon Footprint"
          icon={<CloudRain className="w-5 h-5" />}
          value="12.4k"
          unit="tCO2e"
          trend={
            <>
              <ArrowDown className="w-4 h-4 mr-1" />
              <span>12% reduction</span>
            </>
          }
          trendUp={true}
          colorClass="secondary"
        />
        <KPICard
          title="Social Impact"
          icon={<Users className="w-5 h-5" />}
          value="92"
          unit="index"
          trend={
            <>
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Top 5% sector</span>
            </>
          }
          trendUp={true}
          colorClass="tertiary"
        />
        <KPICard
          title="Governance"
          icon={<CheckSquare className="w-5 h-5" />}
          value="100"
          unit="%"
          trend={
            <>
              <ShieldCheck className="w-4 h-4 mr-1" />
              <span>Audit passed</span>
            </>
          }
          trendUp={true}
          colorClass="error"
        />
      </div>

      {/* Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Main Charts Column */}
        <div className="lg:col-span-2 space-y-gutter">
          {/* Carbon Trends Area Chart */}
          <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm">
            <div className="flex justify-between items-center mb-xl">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Carbon Emission Trends</h3>
                <p className="text-on-surface-variant font-body-sm text-body-sm">Historical data vs. Net Zero targets</p>
              </div>
              <div className="flex gap-sm">
                <button className="px-md py-1 rounded-full text-xs font-bold bg-primary text-on-primary">12 Months</button>
                <button className="px-md py-1 rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container-high">Quarterly</button>
              </div>
            </div>
            <div className="h-64 chart-container flex items-end justify-between gap-2 px-md">
              {/* Simple custom visual representation of an area chart */}
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[60%] rounded-t-sm relative group transition-all hover:brightness-110">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-on-primary text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">12.4k</div>
              </div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[65%] rounded-t-sm transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[58%] rounded-t-sm transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[50%] rounded-t-sm transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[45%] rounded-t-sm transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[40%] rounded-t-sm transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[35%] rounded-t-sm transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[30%] rounded-t-sm transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[28%] rounded-t-sm transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[25%] rounded-t-sm transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[20%] rounded-t-sm border-t-2 border-secondary transition-all hover:brightness-110"></div>
              <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[18%] rounded-t-sm border-t-2 border-secondary transition-all hover:brightness-110"></div>
            </div>
            <div className="flex justify-between px-md mt-sm text-[10px] font-label-sm text-outline uppercase">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
          </div>
          
          {/* Department Rankings Bar Chart */}
          <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm">
            <div className="flex justify-between items-center mb-xl">
              <h3 className="font-headline-md text-headline-md text-on-surface">Department ESG Performance</h3>
              <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">
                View Full Report <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-md">
              <div className="space-y-sm">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-on-surface">Operations & Logistics</span>
                  <span className="text-primary">94.8%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "94.8%" }}></div>
                </div>
              </div>
              <div className="space-y-sm">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-on-surface">Data Infrastructure</span>
                  <span className="text-primary">88.2%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "88.2%" }}></div>
                </div>
              </div>
              <div className="space-y-sm">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-on-surface">Research & Development</span>
                  <span className="text-primary">82.5%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: "82.5%" }}></div>
                </div>
              </div>
              <div className="space-y-sm">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-on-surface">Sales & Marketing</span>
                  <span className="text-primary">76.0%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-outline-variant rounded-full" style={{ width: "76%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Sidebar Column */}
        <div className="space-y-gutter">
          {/* Compliance Alerts */}
          <div className="bg-primary text-on-primary rounded-2xl p-lg shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-md mb-md">
                <AlertTriangle className="text-secondary-fixed w-6 h-6" />
                <h3 className="font-headline-md text-headline-md">Compliance Alerts</h3>
              </div>
              <div className="space-y-md">
                <div className="p-md bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                  <p className="font-label-md text-label-md text-secondary-fixed mb-1">DUE IN 2 DAYS</p>
                  <p className="font-body-sm text-body-sm">BRSR Annual Disclosure renewal for APAC region.</p>
                </div>
                <div className="p-md bg-white/5 rounded-xl border border-white/5">
                  <p className="font-label-md text-label-md text-tertiary-fixed-dim mb-1">PENDING REVIEW</p>
                  <p className="font-body-sm text-body-sm">Supply chain labor audit (Tier 2 Suppliers).</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>

          {/* Leaderboard Preview */}
          <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/30">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Internal Leaderboard</h3>
            <div className="space-y-lg">
              <div className="flex items-center gap-md">
                <span className="font-label-md text-label-md text-outline w-4">01</span>
                <img className="w-10 h-10 rounded-full object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRwjBk5Bbr4DBCsJ7y8PAVNaSTH21jfFi3hnE1eEnJh3fQg9oZALPW469mGigw9ZCMRqH3MczxmRyT6pMZt_N14dTSovbTftlVmSPdRZfscuV6JmvSJXyXEeVTgrIj2x7EU1hDAFwGoTmOMH4dEhI1fgvg9Q2LhHmpeyonfEiYCSiDWmH1OpC4_7qvoyIA8T9wRdeJ0aHI6LHXOMrbq8tWKgeCG9wtqPd-_3tBVbJgIQbxaVmGWT4m026Ir3_w7YZB6uxlLYpGSzff" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-on-surface">Marcus Chen</p>
                  <p className="text-xs text-on-surface-variant">Logistics Manager</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">2,450</p>
                  <p className="text-[10px] text-emerald-600">PTS</p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <span className="font-label-md text-label-md text-outline w-4">02</span>
                <img className="w-10 h-10 rounded-full object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8tcSYRZzmGhOcK65dlX7kvH3N306NnnsCHZOLWGmVITe9EHYze6ERHvcXIwhazouuX2RmQ8baj1OoBk7fX1ez2Qb0fZToRZT7-yqLfV0xQbH1Z-c8wpfsbbY-XteUHZx9rrIjAo2zBcaVPVqdvNiB0Y1xT7AGihee9cCHMDzsde8vyMFz6RQLCwnHIv6W5PioSlmGDb8KUHmVNYTt7cgq5g9oWb0H-r4-XuTPYUaQeS9dMltAaOBoja1NnhyaCNQiZVcJNqBj9rSS" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-on-surface">Priya Sharma</p>
                  <p className="text-xs text-on-surface-variant">ESG Analyst</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">2,120</p>
                  <p className="text-[10px] text-emerald-600">PTS</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-xl py-sm text-primary font-label-md text-label-md border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
              View All Participants
            </button>
          </div>

          {/* Recent Activities */}
          <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Recent Activities</h3>
            <div className="space-y-lg relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
              <div className="relative flex items-start gap-lg pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary border-4 border-surface-container-lowest flex items-center justify-center"></div>
                <div>
                  <p className="text-sm text-on-surface font-medium">New Carbon Offset Purchased</p>
                  <p className="text-xs text-on-surface-variant">2,500 units from Amazon Reforestation Project.</p>
                  <p className="text-[10px] text-outline mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="relative flex items-start gap-lg pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-secondary border-4 border-surface-container-lowest flex items-center justify-center"></div>
                <div>
                  <p className="text-sm text-on-surface font-medium">Audit Completed</p>
                  <p className="text-xs text-on-surface-variant">Q3 Sustainability audit for EMEA sites passed.</p>
                  <p className="text-[10px] text-outline mt-1">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Quick Actions & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Recent Notifications Grid */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface">Recent Notifications</h3>
            <span className="text-primary text-xs font-bold bg-primary-container/10 px-3 py-1 rounded-full">12 New</span>
          </div>
          <div className="grid grid-cols-1 gap-sm">
            <div className="flex items-center gap-md p-md hover:bg-surface-container transition-colors rounded-xl cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Monthly Impact Summary available</p>
                <p className="text-xs text-on-surface-variant">Download the detailed report for September.</p>
              </div>
              <span className="text-[10px] text-outline">10m</span>
            </div>
            <div className="flex items-center gap-md p-md hover:bg-surface-container transition-colors rounded-xl cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Company Goal Milestone Reached</p>
                <p className="text-xs text-on-surface-variant">80% of office spaces now powered by renewables.</p>
              </div>
              <span className="text-[10px] text-outline">1h</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-md">
            {[
              { label: "Log Emission", icon: LineChart },
              { label: "Self Audit", icon: ClipboardCheck },
              { label: "Certify Data", icon: Award },
              { label: "Stakeholders", icon: Users2 },
              { label: "Benchmarks", icon: Settings },
              { label: "Announce", icon: Megaphone },
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center justify-center p-lg bg-surface-container-low rounded-xl hover:bg-primary-container hover:text-primary-foreground transition-all group">
                <action.icon className="mb-2 text-primary group-hover:text-primary-foreground w-6 h-6 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-tighter group-hover:text-primary-foreground transition-colors">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
