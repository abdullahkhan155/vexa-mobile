"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MessageSquare, Map as MapIcon, Tag, CreditCard, Send, Sparkles, ScanLine, Zap, ArrowRight, Loader2, Search, CheckCircle2, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
    { id: "ask", label: "Ask", icon: MessageSquare },
    { id: "promo", label: "Promo", icon: Tag },
    { id: "checkout", label: "Checkout", icon: CreditCard },
];

export function InteractiveDemo() {
    const [activeTab, setActiveTab] = useState("ask");
    const [chatStep, setChatStep] = useState(0);
    const [thinkingText, setThinkingText] = useState("Analyzing...");
    const [displayedResponse, setDisplayedResponse] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [checkoutStatus, setCheckoutStatus] = useState("idle");

    // Check if component is in view to auto-start
    const demoRef = useRef(null);
    const isInView = useInView(demoRef, { once: true, amount: 0.6 });

    // The full AI response text
    const fullResponsePrefix = "Found 3 options in Aisle 7. The ";
    const fullResponseHighlight = "Nike Pegasus 41";
    const fullResponseMiddle = " is on flash sale for ";
    const fullResponsePrice = "$69.99";
    const fullResponseSuffix = ", down from $120.";

    // Auto-start the demo when scrolled into view
    useEffect(() => {
        if (isInView && chatStep === 0) {
            startDemoSequence();
        }
    }, [isInView]);

    const startDemoSequence = async () => {
        // Step 1: User "types" and sends message
        await new Promise(r => setTimeout(r, 500)); // Natural typing delay
        setChatStep(1);

        // Step 2: AI Starts Thinking
        await new Promise(r => setTimeout(r, 600)); // Natural thinking pause
        setChatStep(2);

        // Thinking Progress Simulation
        const thinkingStates = [
            "Analyzing request...",
            "Checking inventory...",
            "Comparing prices...",
            "Finding best deal..."
        ];

        for (const state of thinkingStates) {
            setThinkingText(state);
            await new Promise(r => setTimeout(r, 800)); // Readable processing steps
        }

        // Step 3: AI Responds (Start Typewriter)
        setChatStep(3);
        setIsTyping(true);
    };

    // Typewriter Effect
    useEffect(() => {
        if (chatStep === 3 && isTyping) {
            const fullText = fullResponsePrefix + fullResponseHighlight + fullResponseMiddle + fullResponsePrice + fullResponseSuffix;
            let index = 0;

            const intervalId = setInterval(() => {
                setDisplayedResponse(fullText.substring(0, index + 1));
                index++;

                if (index > fullText.length) {
                    clearInterval(intervalId);
                    setIsTyping(false);
                }
            }, 20); // Natural reading speed

            return () => clearInterval(intervalId);
        }
    }, [chatStep, isTyping]);

    const renderStyledResponse = () => {
        return (
            <p className="text-zinc-300 leading-relaxed">
                {displayedResponse}
                {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />}
            </p>
        );
    };

    return (
        <section ref={demoRef} className="py-24 px-4 bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10 px-0 md:px-4">
                <div className="text-center mb-8 md:mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-400 mb-4"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 animate-ping"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        LIVE INTERACTIVE DEMO
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
                    >
                        Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Future</span>
                    </motion.h2>
                    <p className="text-zinc-400 max-w-lg mx-auto text-base md:text-lg">
                        Watch how Vexa instantly handles complex requests, finds deals, and navigates the store for you.
                    </p>
                </div>

                {/* Demo Interface */}
                <div className="relative rounded-[2rem] border border-white/10 bg-zinc-900/60 backdrop-blur-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
                    {/* Header / Tabs */}
                    <div className="border-b border-white/5 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 border border-white/10 shadow-inner">
                                <Sparkles className="h-6 w-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Vexa Smart Cart</h3>
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-xs text-zinc-500 font-medium">System Online</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex p-1.5 bg-black/40 rounded-full border border-white/5 backdrop-blur-md overflow-x-auto no-scrollbar max-w-full">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "text-white shadow-lg"
                                            : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                                    )}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-zinc-800 border border-white/10 rounded-full"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <tab.icon className="w-3 h-3 md:w-4 md:h-4" />
                                        {tab.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Screen Content */}
                    <div className="h-[550px] md:h-[650px] relative">
                        {/* Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />

                        <div className="relative h-full p-6 md:p-8 overflow-hidden">
                            <AnimatePresence mode="wait">
                                {activeTab === "ask" && (
                                    <motion.div
                                        key="ask"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full flex flex-col max-w-3xl mx-auto"
                                    >
                                        {/* Chat Area */}
                                        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-4 custom-scrollbar">
                                            {/* Initial Prompt */}
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                                                    <Sparkles className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                <div className="bg-zinc-800/80 backdrop-blur-md rounded-2xl rounded-tl-sm p-4 md:p-5 border border-white/10 shadow-lg max-w-full md:max-w-[85%]">
                                                    <p className="text-zinc-200 text-sm md:text-base">Hello! I'm ready to help properly stock your cart. What do you need today?</p>
                                                </div>
                                            </div>

                                            {/* User Question */}
                                            {chatStep >= 1 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    className="flex items-center gap-4 justify-end self-end w-full"
                                                >
                                                    <div className="bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-2xl rounded-tr-sm p-4 md:p-5 border border-white/10 shadow-lg max-w-full md:max-w-[85%]">
                                                        <p className="text-white text-sm md:text-base">I need running shoes for under $80.</p>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* AI Thinking */}
                                            {chatStep === 2 && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="flex items-start gap-4"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                                        <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                                                    </div>
                                                    <div className="flex flex-col gap-2 pt-2">
                                                        <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                                                            <span>{thinkingText}</span>
                                                            <span className="flex gap-1">
                                                                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                                                                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                                                                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                                                            </span>
                                                        </div>
                                                        {/* Scanning Visual */}
                                                        <div className="h-1 w-48 bg-zinc-800 rounded-full overflow-hidden relative">
                                                            <motion.div
                                                                className="absolute top-0 left-0 h-full bg-cyan-500 w-1/3 blur-sm"
                                                                animate={{ x: ["-100%", "300%"] }}
                                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* AI Response */}
                                            {chatStep >= 3 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-start gap-4"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                                                        <Sparkles className="w-5 h-5 text-cyan-400" />
                                                    </div>
                                                    <div className="flex flex-col gap-4 max-w-full md:max-w-[90%]">
                                                        <div className="bg-zinc-800/80 backdrop-blur-md rounded-2xl rounded-tl-sm p-4 md:p-5 border border-white/10 shadow-lg">
                                                            {renderStyledResponse()}
                                                        </div>

                                                        {/* Product Card - Only fade in when typing is mostly done to avoid distraction */}
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                                                            animate={{
                                                                opacity: !isTyping ? 1 : 0,
                                                                y: !isTyping ? 0 : 10,
                                                                filter: !isTyping ? "blur(0px)" : "blur(10px)"
                                                            }}
                                                            transition={{ duration: 0.5 }}
                                                            className="bg-zinc-900 rounded-2xl p-3 md:p-4 border border-white/10 flex flex-col md:flex-row gap-4 md:gap-5 items-start md:items-center hover:bg-zinc-800/80 transition-all cursor-pointer group ring-1 ring-transparent hover:ring-cyan-500/30 w-full"
                                                        >
                                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                                <div className="h-16 w-16 md:h-20 md:w-20 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded-xl flex items-center justify-center border border-white/5 relative overflow-hidden group-hover:scale-105 transition-transform shrink-0">
                                                                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                    <Tag className="w-6 h-6 md:w-8 md:h-8 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                                                                </div>
                                                                <div className="flex-1 md:hidden">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-500/20 text-green-400 border border-green-500/20 uppercase tracking-wide">Flash</span>
                                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-zinc-800 text-zinc-400 border border-white/5 uppercase tracking-wide">Aisle 7</span>
                                                                    </div>
                                                                    <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">Nike Pegasus 41</h4>
                                                                </div>
                                                            </div>

                                                            <div className="hidden md:block">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20 uppercase tracking-wide">Flash Sale</span>
                                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-white/5 uppercase tracking-wide">Aisle 7</span>
                                                                </div>
                                                                <h4 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">Nike Pegasus 41</h4>
                                                                <div className="flex gap-3 mt-1 items-baseline">
                                                                    <span className="text-2xl font-bold text-white">$69.99</span>
                                                                    <span className="text-zinc-500 line-through text-sm">$120.00</span>
                                                                </div>
                                                            </div>

                                                            {/* Mobile Price/Action Row */}
                                                            <div className="flex md:hidden items-center justify-between w-full mt-1 border-t border-white/5 pt-3">
                                                                <div className="flex gap-2 items-baseline">
                                                                    <span className="text-xl font-bold text-white">$69.99</span>
                                                                    <span className="text-zinc-500 line-through text-xs">$120</span>
                                                                </div>
                                                                <button className="h-8 w-8 rounded-full bg-cyan-500 text-black flex items-center justify-center hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                                                                    <ArrowRight className="w-4 h-4 -rotate-45" />
                                                                </button>
                                                            </div>

                                                            <div className="ml-auto hidden md:block">
                                                                <button className="h-10 w-10 rounded-full bg-cyan-500 text-black flex items-center justify-center hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                                                                    <ArrowRight className="w-5 h-5 -rotate-45" />
                                                                </button>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Input Area */}
                                        <div className="mt-4 pt-4 border-t border-white/5 relative z-20">
                                            {chatStep < 3 ? (
                                                <div className="relative group">
                                                    <div className={cn("absolute inset-0 bg-cyan-500/20 rounded-2xl blur-xl transition-opacity duration-500", chatStep > 0 ? "opacity-10" : "opacity-0")} />
                                                    <input
                                                        disabled
                                                        type="text"
                                                        placeholder={chatStep === 0 ? "Type your request..." : "Processing..."}
                                                        className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-zinc-600 shadow-xl"
                                                    />
                                                    <div className="absolute right-3 top-3 bottom-3 flex items-center gap-2">
                                                        {chatStep === 0 && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="flex items-center gap-1 text-xs text-zinc-500 mr-2"
                                                            >
                                                                <Search className="w-3 h-3" />
                                                                <span>Voice enabled</span>
                                                            </motion.div>
                                                        )}
                                                        <div
                                                            className={cn(
                                                                "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                                                chatStep > 0 ? "bg-cyan-500 text-black" : "bg-zinc-800 text-zinc-500"
                                                            )}
                                                        >
                                                            {chatStep === 0 ? <Send className="w-5 h-5" /> : <ScanLine className="w-5 h-5 animate-pulse" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <motion.button
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setActiveTab("promo")}
                                                    className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-fuchsia-500/20 flex items-center justify-center gap-2 group transition-all"
                                                >
                                                    <Tag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                                    See Today's Promos
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </motion.button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}



                                {activeTab === "promo" && (
                                    <motion.div
                                        key="promo"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full flex flex-col p-2 overflow-y-auto custom-scrollbar"
                                    >
                                        <div className="flex items-center gap-2 mb-6 ml-2">
                                            <div className="h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse" />
                                            <span className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Smart Promotions</span>
                                        </div>

                                        {/* Main Promo Card */}
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                            animate={{ scale: 1, opacity: 1, y: 0 }}
                                            transition={{ type: "spring", bounce: 0.4 }}
                                            className="relative rounded-3xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-600 p-1 mb-6 overflow-hidden shrink-0 group shadow-[0_10px_40px_-10px_rgba(192,38,211,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(192,38,211,0.6)] transition-all duration-500"
                                        >
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                                            <div className="relative bg-black/20 backdrop-blur-sm rounded-[22px] p-8 h-full overflow-hidden">
                                                {/* Decorative background elements */}
                                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />
                                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

                                                <div className="absolute top-0 right-0 p-6">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.05, 1] }}
                                                        transition={{ repeat: Infinity, duration: 2 }}
                                                        className="px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md shadow-lg"
                                                    >
                                                        Limited time
                                                    </motion.div>
                                                </div>

                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="p-3 rounded-xl bg-white/20 text-white shadow-inner backdrop-blur-md">
                                                        <Tag className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-fuchsia-100 font-bold text-sm tracking-wide uppercase flex items-center gap-2">
                                                        Personalized For You
                                                        <Sparkles className="w-4 h-4 text-pink-300 animate-pulse" />
                                                    </span>
                                                </div>

                                                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                                                    Buy earbuds, get a case <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-white block mt-1">50% OFF</span>
                                                </h3>
                                                <p className="text-fuchsia-100/90 mb-8 max-w-lg text-lg font-medium leading-relaxed">
                                                    We noticed you have earbuds in your cart. Add a protective case and save money instantly.
                                                </p>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                    <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center backdrop-blur-md hover:bg-white/20 transition-colors">
                                                        <p className="text-xs text-fuchsia-200 uppercase font-bold mb-1">You Save</p>
                                                        <p className="text-3xl font-bold text-white tracking-tight">$12.00</p>
                                                    </div>
                                                    <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center backdrop-blur-md hover:bg-white/20 transition-colors">
                                                        <p className="text-xs text-fuchsia-200 uppercase font-bold mb-1">Bundle Price</p>
                                                        <p className="text-3xl font-bold text-white tracking-tight">$45.99</p>
                                                    </div>
                                                    <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center backdrop-blur-md hover:bg-white/20 transition-colors">
                                                        <p className="text-xs text-fuchsia-200 uppercase font-bold mb-1">Match Score</p>
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            <p className="text-3xl font-bold text-green-300 tracking-tight">97%</p>
                                                            <CheckCircle2 className="w-5 h-5 text-green-300" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        setActiveTab("checkout");
                                                        setCheckoutStatus("idle");
                                                    }}
                                                    className="w-full bg-white text-fuchsia-600 font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-lg group/btn"
                                                >
                                                    Add Bundle to Cart
                                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                </motion.button>
                                            </div>
                                        </motion.div>

                                        {/* More Deals Header */}
                                        <motion.h4
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 shrink-0 ml-2"
                                        >
                                            More deals near you
                                        </motion.h4>

                                        {/* Deal List */}
                                        <div className="space-y-3 shrink-0">
                                            {[
                                                {
                                                    icon: Percent,
                                                    color: "text-blue-400",
                                                    bg: "bg-blue-950/30",
                                                    border: "border-blue-500/20",
                                                    title: "Screen Protector",
                                                    desc: "Pairs with your phone case",
                                                    badge: "20% off",
                                                    delay: 0.3
                                                },
                                                {
                                                    icon: Sparkles,
                                                    color: "text-purple-400",
                                                    bg: "bg-purple-900/20",
                                                    border: "border-purple-500/20",
                                                    title: "Loyalty 2x Points",
                                                    desc: "Active on all electronics today",
                                                    badge: "+86 pts",
                                                    delay: 0.4
                                                }
                                            ].map((deal, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: deal.delay }}
                                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 0.5)" }}
                                                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/30 border border-white/5 cursor-pointer group hover:border-white/10 transition-all"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`h-12 w-12 rounded-xl ${deal.bg} ${deal.border} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                            <deal.icon className={`w-6 h-6 ${deal.color}`} />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-bold text-zinc-200 group-hover:text-white transition-colors text-lg">{deal.title}</h5>
                                                            <p className="text-sm text-zinc-500">{deal.desc}</p>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 py-1.5 rounded-lg bg-white/5 text-white text-sm font-bold border border-white/10 group-hover:bg-white/10 transition-colors shadow-inner">
                                                        {deal.badge}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "checkout" && (
                                    <motion.div
                                        key="checkout"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full flex flex-col p-2 relative"
                                    >
                                        <AnimatePresence mode="wait">
                                            {checkoutStatus === "idle" ? (
                                                <motion.div
                                                    key="cart-view"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    className="h-full flex flex-col"
                                                >
                                                    <div className="flex items-center justify-between mb-6 shrink-0 bg-zinc-900/30 p-4 rounded-2xl border border-white/5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-pulse" />
                                                            <span className="text-base font-bold text-zinc-300">Self-checkout Mode</span>
                                                        </div>
                                                        <div className="text-xs text-zinc-500 font-mono">ID: #8X92-22</div>
                                                    </div>

                                                    {/* Header Buttons */}
                                                    <div className="flex items-center justify-between mb-6 shrink-0 px-2">
                                                        <div className="flex gap-2">
                                                            <button className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-bold flex items-center gap-2 hover:bg-cyan-500/20 transition-colors">
                                                                <ScanLine className="w-4 h-4" />
                                                                Scan Item
                                                            </button>
                                                            <button className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold flex items-center gap-2">
                                                                Secure Payment
                                                            </button>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <motion.div
                                                                initial={{ scale: 0.8, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-zinc-400 flex items-center gap-1.5 bg-black/40"
                                                            >
                                                                <Sparkles className="w-3 h-3 text-fuchsia-400" />
                                                                Saved $18.50
                                                            </motion.div>
                                                        </div>
                                                    </div>

                                                    {/* Alert Box */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="w-full bg-gradient-to-r from-purple-900/40 to-blue-900/20 border border-purple-500/30 rounded-2xl p-5 flex items-start gap-4 mb-6 shrink-0 relative overflow-hidden"
                                                    >
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                                        <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 mt-1 shadow-lg shadow-purple-500/10 border border-purple-500/20">
                                                            <Zap className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-white text-base">Skip the line entirely</h4>
                                                            <p className="text-zinc-400 text-sm mt-1">Your payment method is linked. Just walk out when you're done.</p>
                                                        </div>
                                                    </motion.div>

                                                    {/* Items List - Staggered Animation */}
                                                    <div className="flex-1 overflow-y-auto space-y-3 mb-6 pr-2 custom-scrollbar px-2">
                                                        {[
                                                            { name: "Wireless Earbuds", desc: "SoundCore Pro", price: "$39.99", icon: "🎧" },
                                                            { name: "Carrying Case", desc: "Bundle deal applied", price: "$11.99", icon: "👜", highlight: true },
                                                            { name: "Screen Protector", desc: "Quantity: 1", price: "$8.99", icon: "📱" },
                                                            { name: "Nike Pegasus 41", desc: "Size 10 • Black", price: "$69.99", icon: "👟" },
                                                            { name: "Energy Drink", desc: "Sugar Free", price: "$2.50", icon: "⚡" }
                                                        ].map((item, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                                className={`flex justify-between items-center p-3 rounded-xl border transition-colors group ${item.highlight
                                                                    ? "bg-fuchsia-500/10 border-fuchsia-500/30 hover:bg-fuchsia-500/20"
                                                                    : "bg-zinc-800/80 border-white/10 hover:bg-zinc-800 hover:border-white/20"
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center text-xl shadow-inner border border-white/5">
                                                                        {item.icon}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className={`font-bold transition-colors ${item.highlight ? "text-fuchsia-300" : "text-white group-hover:text-cyan-300"}`}>
                                                                            {item.name}
                                                                        </h4>
                                                                        <p className="text-xs text-zinc-500">{item.desc}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className={`font-bold ${item.highlight ? "text-fuchsia-300" : "text-white"}`}>{item.price}</p>
                                                                    {item.highlight && <span className="text-[10px] text-fuchsia-500 uppercase font-bold tracking-wider">Saved $12</span>}
                                                                </div>
                                                            </motion.div>
                                                        ))}

                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.6 }}
                                                            className="flex justify-between items-start text-green-300 bg-green-950/30 p-4 rounded-xl border border-green-500/20 mt-4 mx-1"
                                                        >
                                                            <div>
                                                                <h4 className="font-bold text-sm">Total Savings</h4>
                                                                <p className="text-xs text-green-400/70">3 deals applied automatically</p>
                                                            </div>
                                                            <p className="font-bold">- $18.50</p>
                                                        </motion.div>
                                                    </div>

                                                    {/* Total & Actions */}
                                                    <div className="mt-auto shrink-0 bg-black/40 backdrop-blur-md -mx-2 p-4 pt-6 border-t border-white/10 rounded-t-[2rem]">
                                                        <div className="flex justify-between items-end mb-6 px-2">
                                                            <div className="flex flex-col">
                                                                <h4 className="font-bold text-white text-3xl">Total</h4>
                                                                <p className="text-xs text-zinc-500">Including tax</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-bold text-white text-4xl tracking-tight">$114.96</p>
                                                                <p className="text-xs text-fuchsia-400 font-bold mt-1">You just saved 15%!</p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-4">
                                                            <motion.button
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                onClick={() => setCheckoutStatus("success")}
                                                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
                                                            >
                                                                <span className="text-lg">Tap to pay</span>
                                                                <CreditCard className="w-6 h-6" />
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="success-view"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="h-full flex flex-col items-center justify-center text-center p-6 relative overflow-hidden"
                                                >
                                                    {/* Success Background */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-cyan-900/20" />
                                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                                                    {/* Confetti / Burst Effect */}
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-sm max-h-sm">
                                                        {[...Array(6)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                                                animate={{
                                                                    opacity: [1, 0],
                                                                    scale: [0, 1.5],
                                                                    x: Math.cos(i * 60 * (Math.PI / 180)) * 150,
                                                                    y: Math.sin(i * 60 * (Math.PI / 180)) * 150
                                                                }}
                                                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                                                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_currentColor]"
                                                            />
                                                        ))}
                                                    </div>

                                                    <motion.div
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        transition={{ type: "spring", damping: 15 }}
                                                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.5)] border-4 border-green-400 relative z-10"
                                                    >
                                                        <CheckCircle2 className="w-12 h-12 text-black" strokeWidth={3} />
                                                    </motion.div>

                                                    <motion.h2
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
                                                    >
                                                        Payment Successful!
                                                    </motion.h2>

                                                    <motion.p
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.4 }}
                                                        className="text-xl text-zinc-400 mb-12 font-medium"
                                                    >
                                                        Thanks for shopping with Vexa.
                                                    </motion.p>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 }}
                                                        className="bg-white/5 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm border border-white/10 mb-8"
                                                    >
                                                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                                                            <span className="text-zinc-500">Amount Paid</span>
                                                            <span className="text-2xl font-bold text-white">$114.96</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-zinc-500">Transaction ID</span>
                                                            <span className="font-mono text-cyan-400">#TRX-8929</span>
                                                        </div>
                                                    </motion.div>

                                                    <motion.button
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.8 }}
                                                        onClick={() => {
                                                            setCheckoutStatus("idle");
                                                            setActiveTab("ask");
                                                        }}
                                                        className="text-zinc-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
                                                    >
                                                        <ArrowRight className="w-4 h-4 rotate-180" />
                                                        Start New Session
                                                    </motion.button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div >
            </div >
        </section >
    );
}
