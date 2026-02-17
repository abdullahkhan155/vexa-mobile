"use client";

import { motion } from "framer-motion";
import { Clock, HelpCircle, AlertTriangle, CreditCard, Mic, Sparkles, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhyVexa() {
    return (
        <section className="bg-black py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-zinc-800 border border-white/10 text-[10px] font-bold tracking-widest text-cyan-400 mb-6">
                            WHY VEXA
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Every Trip, Elevated
                        </h2>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            See the difference an AI-powered cart makes.
                        </p>
                    </motion.div>
                </div>

                {/* Comparison Card */}
                <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-zinc-900/30 border border-white/5 overflow-hidden flex flex-col md:flex-row relative backdrop-blur-sm">
                    {/* Center Divider/Glow (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                    <div className="absolute left-1/2 top-12 bottom-12 w-[1px] bg-cyan-500/50 shadow-[0_0_30px_2px_rgba(6,182,212,0.4)] hidden md:block" />

                    {/* Left Side - Without Vexa */}
                    <div className="flex-1 p-8 md:p-16 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="flex items-center gap-2 mb-12">
                            <span className="py-1 px-3 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold tracking-widest text-red-400 flex items-center gap-2">
                                <X className="w-3 h-3" /> WITHOUT VEXA
                            </span>
                        </div>

                        <div className="space-y-10">
                            <ComparisonItem
                                icon={Clock}
                                text="10+ min checkout queues"
                                delay={0.1}
                                color="red"
                            />
                            <ComparisonItem
                                icon={HelpCircle}
                                text="Can't find what you need"
                                delay={0.2}
                                color="red"
                            />
                            <ComparisonItem
                                icon={AlertTriangle}
                                text="No help when you need it"
                                delay={0.3}
                                color="red"
                            />
                        </div>
                    </div>

                    {/* Right Side - With Vexa */}
                    <div className="flex-1 p-8 md:p-16 relative overflow-hidden group bg-white/[0.02]">
                        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                        <div className="flex items-center gap-2 mb-12">
                            <span className="py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold tracking-widest text-cyan-400 flex items-center gap-2 shadow-[0_0_10px_-2px_rgba(6,182,212,0.5)]">
                                <Check className="w-3 h-3" /> WITH VEXA
                            </span>
                        </div>

                        <div className="space-y-10">
                            <ComparisonItem
                                icon={CreditCard}
                                text="30-second on-cart pay"
                                delay={0.1}
                                color="cyan"
                            />
                            <ComparisonItem
                                icon={Mic}
                                text="AI-guided navigation"
                                delay={0.2}
                                color="cyan"
                            />
                            <ComparisonItem
                                icon={Sparkles}
                                text="Instant deals & bundles"
                                delay={0.3}
                                color="cyan"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ComparisonItem({ icon: Icon, text, delay, color }: { icon: any, text: string, delay: number, color: "red" | "cyan" }) {
    const isCyan = color === "cyan";
    return (
        <motion.div
            initial={{ opacity: 0, x: isCyan ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex items-center gap-5"
        >
            <div className={cn(
                "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-300",
                isCyan
                    ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                    : "bg-white/5 border-white/5 text-zinc-600 group-hover:bg-red-500/10 group-hover:border-red-500/10 group-hover:text-red-400"
            )}>
                <Icon className="w-5 h-5" />
            </div>
            <span className={cn(
                "text-lg font-medium transition-colors duration-300",
                isCyan ? "text-white" : "text-zinc-500 group-hover:text-zinc-400"
            )}>{text}</span>
        </motion.div>
    )
}
