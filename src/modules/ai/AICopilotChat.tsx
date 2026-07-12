import React from "react";
import { Bot, Paperclip, ArrowUp } from "lucide-react";

interface Message {
  sender: string;
  text: string;
}

interface ChatData {
  suggestedPrompts: string[];
  messages: Message[];
}

export function AICopilotChat({ data }: { data: ChatData }) {
  return (
    <section className="flex-grow flex flex-col bg-surface-container-low relative overflow-hidden">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-xl custom-scrollbar z-10 flex flex-col items-center">
        {/* Initial Branding State */}
        <div className="max-w-2xl w-full text-center mt-24">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-[24px] mb-lg shadow-xl shadow-primary/20">
            <Bot className="text-on-primary w-10 h-10" />
          </div>
          <h2 className="font-display-lg text-display-lg text-primary mb-md">EcoSphere AI</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Your specialized partner for enterprise-grade ESG intelligence and report generation.
          </p>
        </div>
        {/* Chat Bubbles */}
        <div className="max-w-4xl w-full mt-xl space-y-lg flex flex-col">
          {data.messages.map((msg, i) => (
            <div key={i} className={`p-lg rounded-[24px] max-w-3xl shadow-sm ${msg.sender === 'ai' ? 'glass-panel rounded-tl-none self-start' : 'bg-primary text-on-primary rounded-br-none self-end max-w-xl'}`}>
              <p className="font-body-md">{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Input Area */}
      <div className="p-xl z-10 flex flex-col items-center gap-lg">
        {/* Suggested Prompts */}
        <div className="flex gap-md overflow-x-auto max-w-4xl no-scrollbar pb-sm">
          {data.suggestedPrompts.map((prompt, i) => (
            <button key={i} className="whitespace-nowrap px-lg py-md rounded-full border border-outline-variant bg-white/60 hover:bg-white hover:border-primary/50 text-body-sm font-medium transition-all active:scale-95 shadow-sm">
              {prompt}
            </button>
          ))}
        </div>
        {/* Main Input Box */}
        <div className="w-full max-w-4xl relative">
          <div className="glass-panel p-sm rounded-[28px] flex items-center gap-sm shadow-xl active-glow ring-2 ring-primary/5">
            <button className="w-12 h-12 flex items-center justify-center text-outline hover:text-primary transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <textarea className="flex-1 bg-transparent border-none focus:ring-0 text-body-md py-md px-xs resize-none" placeholder="Ask anything about your ESG data..." rows={1}></textarea>
            <button className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-full hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center mt-md font-label-sm text-outline">EcoSphere AI can make mistakes. Verify critical data points.</p>
        </div>
      </div>
    </section>
  );
}
