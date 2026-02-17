"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Sparkles, ScanLine, CreditCard, Shield, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    {
        id: 1,
        title: "Ask in aisle",
        description: "AI voice assistant that knows every product location.",
        icon: Mic,
        color: "cyan",
        screen: {
            title: "Voice-Powered Help",
            subtitle: "Find products and navigate aisles hands-free.",
            stats: [
                { label: "Recognition", value: "98.7%", color: "text-green-400" },
                { label: "Response", value: "<1s", color: "text-green-400" },
                { label: "Languages", value: "12+", color: "text-white" },
            ]
        }
    },
    {
        id: 2,
        title: "Get Personalized Promos",
        description: "Deals that appear as you shop, based on your habits.",
        icon: Sparkles,
        color: "orange",
        screen: {
            title: "Deals That Find You",
            subtitle: "Personalized offers triggered by your location.",
            stats: [
                { label: "Avg. Saved", value: "$12.40", color: "text-orange-400" },
                { label: "Promo Lift", value: "+22%", color: "text-orange-400" },
                { label: "Relevance", value: "94%", color: "text-orange-400" },
            ]
        }
    },
    {
        id: 3,
        title: "Scan as you pick",
        description: "Real-time total. No surprises at checkout.",
        icon: ScanLine,
        color: "cyan",
        screen: {
            title: "Shop Without Stopping",
            subtitle: "Scan items as you go with a running total.",
            stats: [
                { label: "Scan Speed", value: "0.3s", color: "text-cyan-400" },
                { label: "Accuracy", value: "99.9%", color: "text-cyan-400" },
                { label: "Items/Min", value: "15+", color: "text-cyan-400" },
            ]
        }
    },
    {
        id: 4,
        title: "Pay on cart",
        description: "No-lane checkout. Just tap and walk out.",
        icon: CreditCard,
        color: "purple",
        screen: {
            title: "Skip the Line Entirely",
            subtitle: "Tap to pay on the cart and walk out.",
            stats: [
                { label: "Time Saved", value: "12 min", color: "text-purple-400" },
                { label: "Methods", value: "All", color: "text-purple-400" },
                { label: "Security", value: "PCI L1", color: "text-purple-400" },
            ]
        }
    },
    {
        id: 5,
        title: "Secure every basket",
        description: "Vision verification ensures inventory accuracy.",
        icon: Shield,
        color: "green",
        screen: {
            title: "Loss Prevention AI",
            subtitle: "Computer vision verifies every item added.",
            stats: [
                { label: "Verif. Rate", value: "100%", color: "text-green-400" },
                { label: "Shrinkage", value: "-45%", color: "text-green-400" },
                { label: "Privacy", value: "On-Device", color: "text-white" },
            ]
        }
    },
];

export function HowItWorks() {
    const [activeStep, setActiveStep] = useState(1);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            // Find which step is closest to the center of the screen
            let closestStepId = steps[0].id;
            let minDistance = Number.MAX_VALUE;
            const viewportCenter = window.innerHeight / 2;

            stepRefs.current.forEach((stepRef, index) => {
                if (!stepRef) return;

                const rect = stepRef.getBoundingClientRect();
                const stepCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(viewportCenter - stepCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestStepId = steps[index].id;
                }
            });

            setActiveStep(closestStepId);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const activeStepData = steps.find(s => s.id === activeStep) || steps[0];

    return (
        <section className="bg-black py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-900/50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4">

                <div className="text-center mb-20 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        From Aisle to Exit, <br className="hidden md:block" />
                        <span className="text-zinc-500">Reimagined.</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Experience a shopping trip where the cart does the work.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                    {/* Left Column - Sticky Phone Visual */}
                    <div className="hidden lg:block lg:col-span-7 sticky top-24 h-[calc(100vh-12rem)] flex items-center justify-center">
                        <div className="relative rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-2xl p-6 aspect-[4/3] w-full max-w-2xl overflow-hidden group">
                            {/* Device Header */}
                            <div className="flex items-center justify-between mb-8 opacity-70">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                                    <span className="text-xs font-bold tracking-widest text-zinc-400">SMART CART OS</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-medium text-zinc-500">Aisle 6</span>
                                    <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5 text-[10px] text-zinc-400">
                                        <MapPin className="w-3 h-3" /> In store
                                    </span>
                                </div>
                            </div>

                            {/* Animate Content Switch */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStepData.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full relative z-10 cancel-drag"
                                >
                                    {/* Main Icon */}
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                                        activeStepData.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                                            activeStepData.color === "orange" ? "bg-orange-500/10 text-orange-400" :
                                                activeStepData.color === "purple" ? "bg-purple-500/10 text-purple-400" :
                                                    "bg-green-500/10 text-green-400"
                                    )}>
                                        <activeStepData.icon className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-2">{activeStepData.screen.title}</h3>
                                    <p className="text-zinc-400 text-lg mb-8 max-w-sm">{activeStepData.screen.subtitle}</p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4 mt-auto mb-12">
                                        {activeStepData.screen.stats.map((stat, i) => (
                                            <div key={i} className="bg-black/40 rounded-xl p-4 border border-white/5">
                                                <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">{stat.label}</p>
                                                <p className={cn("text-xl font-bold", stat.color)}>{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Background Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none" />
                        </div>
                    </div>

                    {/* Right Column - Scrollable Steps */}
                    <div className="lg:col-span-5 flex flex-col pt-12 lg:pt-0 pb-24">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                ref={(el: HTMLDivElement | null) => { stepRefs.current[index] = el; }}
                                className={cn(
                                    "min-h-[50vh] flex flex-col justify-center transition-all duration-500 p-6 lg:p-10 rounded-3xl border relative overflow-hidden group mb-4 last:mb-0",
                                    activeStep === step.id
                                        ? "bg-zinc-900/40 border-cyan-500/30 opacity-100"
                                        : "border-transparent opacity-30 hover:opacity-60"
                                )}>

                                <div className="flex items-start gap-4">
                                    <div className={cn(
                                        "mt-1 p-3 rounded-xl shrink-0 transition-colors",
                                        activeStep === step.id
                                            ? (step.color === "cyan" ? "bg-cyan-500/20 text-cyan-400" :
                                                step.color === "orange" ? "bg-orange-500/20 text-orange-400" :
                                                    step.color === "purple" ? "bg-purple-500/20 text-purple-400" :
                                                        "bg-green-500/20 text-green-400")
                                            : "bg-zinc-800 text-zinc-600"
                                    )}>
                                        <step.icon className="w-6 h-6" />
                                    </div>

                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Step 0{step.id}</div>
                                        <h3 className={cn("text-2xl font-bold mb-3 transition-colors", activeStep === step.id ? "text-white" : "text-zinc-400")}>
                                            {step.title}
                                        </h3>
                                        <p className="text-base text-zinc-400 leading-relaxed max-w-sm">{step.description}</p>
                                    </div>
                                </div>

                                {/* Mobile-only visual for context when phone is hidden */}
                                <div className="lg:hidden mt-6 rounded-2xl bg-zinc-900/50 border border-white/5 p-4 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center",
                                            step.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                                                step.color === "orange" ? "bg-orange-500/10 text-orange-400" :
                                                    step.color === "purple" ? "bg-purple-500/10 text-purple-400" :
                                                        "bg-green-500/10 text-green-400"
                                        )}>
                                            <step.icon className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-white">{step.screen.title}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {step.screen.stats.map((stat, i) => (
                                            <div key={i} className="bg-zinc-900 rounded-lg p-2 text-center">
                                                <p className="text-[9px] uppercase text-zinc-500 mb-1">{stat.label}</p>
                                                <p className={cn("text-xs font-bold", stat.color)}>{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {activeStep === step.id && (
                                    <motion.div
                                        layoutId="active-left-border"
                                        className="absolute left-0 top-10 bottom-10 w-1 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full lg:block hidden"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
