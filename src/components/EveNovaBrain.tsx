import React, { useEffect, useRef, useState } from 'react';
import {
  Bot,
  BrainCircuit,
  Database,
  Mic,
  MicOff,
  Send,
  ShieldCheck,
  Trash2,
  User,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type Message = {
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
};

type BrainHealth = {
  system?: string;
  brain?: string;
  core?: string;
  brain_online?: boolean;
  adapter?: string;
};

const MEMORY_KEY = 'UNIVERSAL_DRAGON_EVE_NOVA_MEMORY_V1';

export const EveNovaBrain: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isDeepMode, setIsDeepMode] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const [memoryStatus, setMemoryStatus] = useState<'IDLE' | 'SAVING' | 'LOADED'>('IDLE');
  const [health, setHealth] = useState<BrainHealth>({
    system: 'UNIVERSAL_DRAGON_ASLAM',
    brain: 'EVE_NOVA',
    core: 'NOVA_CORE',
    brain_online: false,
    adapter: 'CHECKING',
  });

  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(MEMORY_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setMessages(parsed.slice(-40));
        setMemoryStatus('LOADED');
        window.setTimeout(() => setMemoryStatus('IDLE'), 1200);
      }
    } catch {
      localStorage.removeItem(MEMORY_KEY);
    }
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    setMemoryStatus('SAVING');
    localStorage.setItem(MEMORY_KEY, JSON.stringify(messages.slice(-40)));
    const timer = window.setTimeout(() => setMemoryStatus('IDLE'), 700);
    return () => window.clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    fetch('/api/health', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => setHealth(data))
      .catch(() => setHealth((previous) => ({
        ...previous,
        brain_online: false,
        adapter: 'UNREACHABLE',
      })));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ta-IN';
    recognition.onresult = (event: any) => {
      const transcript = String(event.results?.[0]?.[0]?.transcript || '').trim();
      if (transcript) void sendMessage(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => recognition.abort?.();
  });

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', text, timestamp: Date.now() };
    const nextMessages = [...messages, userMessage].slice(-40);
    setMessages(nextMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: isDeepMode ? `[NOVA_DEEP_MODE] ${text}` : text,
          history: nextMessages.slice(-12, -1).map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.text || data?.error || `HTTP ${response.status}`);

      setHealth((previous) => ({
        ...previous,
        system: data?.system || previous.system,
        brain: data?.brain || previous.brain,
        core: data?.core || previous.core,
        brain_online: true,
        adapter: 'PRIVATE_ADAPTER_READY',
      }));
      setMessages((previous) => [...previous.slice(-39), {
        role: 'assistant',
        text: data?.text || 'EVE NOVA returned an empty response.',
        timestamp: Date.now(),
      }]);
    } catch (error: any) {
      setHealth((previous) => ({ ...previous, brain_online: false, adapter: 'DEGRADED' }));
      setMessages((previous) => [...previous.slice(-39), {
        role: 'assistant',
        text: String(error?.message || 'EVE NOVA connection failed.'),
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const speakMessage = (text: string, index: number) => {
    if (!window.speechSynthesis) return;
    if (isSpeaking === index) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN';
    utterance.rate = 0.92;
    utterance.pitch = 1.02;
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    setIsSpeaking(index);
    window.speechSynthesis.speak(utterance);
  };

  const clearMemory = () => {
    if (!window.confirm('EVE NOVA local chat memory clear panna ok-aa?')) return;
    localStorage.removeItem(MEMORY_KEY);
    setMessages([]);
  };

  const online = Boolean(health.brain_online);

  return (
    <section className="glass-panel p-4 flex flex-col gap-4 h-full relative overflow-hidden">
      <header className="flex items-center justify-between gap-3 z-10">
        <div>
          <h2 className="micro-label flex items-center gap-2 text-[#00FFFF]">
            <BrainCircuit className="w-4 h-4" /> EVE_NOVA_BRAIN
          </h2>
          <div className="mt-1 flex items-center gap-2 text-[8px] font-mono text-[#555]">
            <span className={online ? 'text-emerald-400' : 'text-[#FF3300]'}>
              {online ? 'ONLINE' : 'OFFLINE'}
            </span>
            <span>{online ? 'PRIVATE_CORE' : 'CORE_OFFLINE'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsDeepMode((value) => !value)}
            className={`px-2 py-1 rounded border text-[8px] font-mono transition-all ${
              isDeepMode
                ? 'border-[#00FFFF]/50 bg-[#00FFFF]/10 text-[#00FFFF]'
                : 'border-[#333] bg-black text-[#666]'
            }`}
          >
            {isDeepMode ? 'NOVA_DEEP' : 'NOVA_FAST'}
          </button>
          <div className="flex items-center gap-1">
            <Database className={`w-3 h-3 ${memoryStatus === 'SAVING' ? 'text-[#FF3300] animate-pulse' : 'text-[#444]'}`} />
            <span className="text-[8px] font-mono text-[#444]">{memoryStatus}</span>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between rounded border border-[#00FFFF]/15 bg-black/50 px-2 py-1 text-[8px] font-mono">
        <span className="flex items-center gap-1 text-[#00FFFF]/70">
          <ShieldCheck className="w-3 h-3" /> OWNER_APPROVAL_REQUIRED
        </span>
        <span className="text-[#FF3300]/80">DANGEROUS_ACTION_DENY</span>
      </div>

      <div ref={scrollRef} className="flex-1 min-h-[260px] bg-black border border-[#222] rounded p-3 overflow-y-auto font-mono text-[11px] space-y-4">
        <AnimatePresence initial={false}>
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#444] text-center mt-10 italic">
              Universal Dragon EVE NOVA ready. கட்டளைகளுக்காக காத்திருக்கிறேன், Aslam.
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={`${message.timestamp}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-6 h-6 rounded bg-[#FF3300]/20 border border-[#FF3300]/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-[#FF3300]" />
                </div>
              )}
              <div className={`max-w-[82%] p-2 rounded border relative group whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-[#00FFFF]/10 border-[#00FFFF]/30 text-[#00FFFF]'
                  : 'bg-[#111] border-[#222] text-[#aaa]'
              }`}>
                {message.text}
                {message.role === 'assistant' && (
                  <button
                    type="button"
                    onClick={() => speakMessage(message.text, index)}
                    className="absolute -right-8 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF3300]"
                  >
                    {isSpeaking === index ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
              </div>
              {message.role === 'user' && (
                <div className="w-6 h-6 rounded bg-[#00FFFF]/20 border border-[#00FFFF]/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-[#00FFFF]" />
                </div>
              )}
            </motion.div>
          ))}

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
              <div className="w-6 h-6 rounded bg-[#FF3300]/20 border border-[#FF3300]/30 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-[#FF3300] animate-pulse" />
              </div>
              <div className="max-w-[82%] p-2 rounded border bg-[#111] border-[#222] text-[#555] animate-pulse">
                EVE NOVA THINKING...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-2 z-10">
        <button type="button" onClick={clearMemory} className="p-2 bg-black border border-[#222] rounded text-[#444] hover:text-[#FF3300] hover:border-[#FF3300] transition-all">
          <Trash2 className="w-5 h-5" />
        </button>
        <button type="button" onClick={toggleListening} className={`p-2 rounded border transition-all ${
          isListening
            ? 'bg-[#FF3300]/20 border-[#FF3300] text-[#FF3300]'
            : 'bg-[#111] border-[#222] text-[#888] hover:border-[#00FFFF] hover:text-[#00FFFF]'
        }`}>
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && void sendMessage(inputText)}
          placeholder="EVE NOVA-kitta கேளுங்கள்..."
          maxLength={4000}
          className="flex-1 min-w-0 bg-black border border-[#222] rounded px-3 py-2 text-[11px] font-mono focus:outline-none focus:border-[#00FFFF] transition-colors"
        />
        <button
          type="button"
          onClick={() => void sendMessage(inputText)}
          disabled={isLoading || !inputText.trim()}
          className="p-2 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded text-[#00FFFF] hover:bg-[#00FFFF]/20 transition-all disabled:opacity-40"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
