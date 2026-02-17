"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTA() {
    return (
        <section className="bg-black py-32 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-overlay" />

            <div className="container mx-auto px-4 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold tracking-widest text-zinc-300">READY TO TRANSFORM YOUR STORE?</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                        Book a live <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">cart demo</span>
                    </h2>

                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
                        Walk the aisles, see promos land, and finish checkout on-cart. One short session to see the future of retail.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200" />
                        <button className="relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-lg shadow-xl hover:shadow-cyan-500/25 transition-all flex items-center gap-3">
                            Get my demo
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
