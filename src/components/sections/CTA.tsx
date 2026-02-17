"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoModal } from "@/components/ui/DemoModal";

export function CTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="bg-black py-32 relative overflow-hidden">
            <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            size="lg"
                            className="relative rounded-full text-lg px-8 py-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                Get demo <ArrowRight className="w-5 h-5" />
                            </span>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
