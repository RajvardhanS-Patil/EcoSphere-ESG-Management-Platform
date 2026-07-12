"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, Paperclip, ArrowUp, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  sender: string;
  text: string;
}

interface ChatData {
  suggestedPrompts: string[];
  messages: Message[];
  promptResponses?: Record<string, string>;
}

interface AICopilotChatProps {
  data: ChatData;
  esgContext?: object;
}

export function AICopilotChat({ data, esgContext }: AICopilotChatProps) {
  const [messages, setMessages] = useState<Message[]>(data.messages);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGemini = async (prompt: string): Promise<{ text: string | null; error?: string }> => {
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, context: esgContext || {} }),
      });
      const data = await res.json();
      if (data.fallback || data.error) return { text: null, error: data.error };
      return { text: data.response };
    } catch {
      return { text: null, error: "Network error occurred." };
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Try Gemini API first
    const geminiResponse = await callGemini(text);

    if (geminiResponse.text) {
      setMessages(prev => [...prev, { sender: "ai", text: geminiResponse.text }]);
    } else {
      setMessages(prev => [...prev, {
        sender: "ai",
        text: `**Connection Error**: ${geminiResponse.error || "Unable to reach EcoSphere AI."}\n\nPlease ensure your API key is correctly configured and you have restarted the dev server. For now, here is a mock response:\n\nBased on your current ESG data, I've analyzed the relevant metrics across Environmental, Social, and Governance dimensions for your query: "${text}". Your overall ESG posture remains strong with key improvements in carbon intensity this quarter.`
      }]);
    }
    setLoading(false);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSend = () => {
    if (!inputValue.trim() || loading) return;
    handleSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <section className="flex-grow flex flex-col bg-surface-container-low relative overflow-hidden">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-xl custom-scrollbar z-10 flex flex-col items-center">
        {/* Initial Branding State */}
        {messages.length <= 3 && (
          <div className="max-w-2xl w-full text-center mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-[24px] mb-lg shadow-xl shadow-primary/20">
              <Bot className="text-on-primary w-10 h-10" />
            </div>
            <h2 className="font-display-lg text-2xl font-bold text-primary mb-2">EcoSphere ESG Advisor</h2>
            <p className="font-body-lg text-on-surface-variant max-w-lg mx-auto">
              Your AI-powered partner for enterprise ESG intelligence, BRSR compliance, and sustainability strategy.
            </p>
          </div>
        )}
        {/* Chat Bubbles */}
        <div className="max-w-4xl w-full mt-xl space-y-lg flex flex-col">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`p-lg rounded-[20px] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 w-full max-w-3xl min-w-0 ${
                msg.sender === 'ai' 
                  ? 'bg-surface border border-outline-variant/50 rounded-tl-sm self-start' 
                  : 'bg-primary text-on-primary rounded-br-sm self-end'
              }`}
            >
              {msg.sender === 'ai' ? (
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">ESG Advisor</span>
                  </div>
                  <div className="prose prose-sm prose-primary max-w-none text-sm leading-relaxed text-on-surface break-words whitespace-pre-wrap">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-on-primary">{msg.text}</p>
              )}
            </div>
          ))}
          {loading && (
            <div className="bg-surface border border-outline-variant/50 p-lg rounded-[20px] rounded-tl-sm self-start max-w-sm animate-in fade-in duration-200">
              <div className="flex items-center gap-3 text-primary">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm text-on-surface-variant">Analyzing ESG data...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="p-xl z-10 flex flex-col items-center gap-lg border-t border-outline-variant/30 bg-surface-container-lowest/50 backdrop-blur-sm">
        {/* Suggested Prompts */}
        <div className="flex gap-2 overflow-x-auto max-w-4xl no-scrollbar pb-1 w-full">
          {data.suggestedPrompts.map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => handlePromptClick(prompt)}
              disabled={loading}
              className="whitespace-nowrap px-4 py-2 rounded-full border border-outline-variant bg-surface hover:bg-primary-container/20 hover:border-primary/30 text-xs font-medium transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {prompt}
            </button>
          ))}
        </div>
        {/* Main Input Box */}
        <div className="w-full max-w-4xl relative">
          <div className="bg-surface border border-outline-variant p-1.5 rounded-2xl flex items-center gap-1 shadow-lg focus-within:border-primary/50 focus-within:shadow-xl transition-all">
            <button className="w-10 h-10 flex items-center justify-center text-outline hover:text-primary transition-colors rounded-xl hover:bg-surface-container-high">
              <Paperclip className="w-4 h-4" />
            </button>
            <input 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 outline-none min-w-0" 
              placeholder="Ask about your ESG data, BRSR compliance, carbon trends..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button 
              onClick={handleSend}
              disabled={loading || !inputValue.trim()}
              className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-xl hover:opacity-90 shadow-md shadow-primary/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-center mt-2 text-[10px] text-outline">EcoSphere AI uses Google Gemini. Verify critical data points independently.</p>
        </div>
      </div>
    </section>
  );
}
