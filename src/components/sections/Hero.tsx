"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Wallet, CreditCard, Percent, ScanLine, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoModal } from "@/components/ui/DemoModal";

const FloatingIcon = ({
    children,
    delay = 0,
    x = 0,
    y = 0,
    rotate = 0
}: {
    children: React.ReactNode;
    delay?: number;
    x?: number;
    y?: number;
    rotate?: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, rotate: rotate - 10 }}
            animate={{
                opacity: 0.8,
                y: [0, -15, 0],
                x: [0, 5, 0],
                rotate: [rotate - 5, rotate + 5, rotate - 5]
            }}
            transition={{
                opacity: { duration: 1, delay },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
                x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 1 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay }
            }}
            className="absolute hidden md:flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:bg-white/10 transition-colors cursor-pointer"
            style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
        >
            {children}
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
        </motion.div>
    );
};

export function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
            <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Enhanced Background Gradients */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Floating Icons with improved positioning and styles */}
            <FloatingIcon x={-38} y={-25} delay={0} rotate={-10}>
                <ShoppingCart className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </FloatingIcon>
            <FloatingIcon x={38} y={-15} delay={1} rotate={10}>
                <CreditCard className="w-10 h-10 text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]" />
            </FloatingIcon>
            <FloatingIcon x={-32} y={25} delay={2} rotate={-5}>
                <Wallet className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </FloatingIcon>
            <FloatingIcon x={32} y={35} delay={3} rotate={5}>
                <Percent className="w-10 h-10 text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]" />
            </FloatingIcon>

            {/* Content */}
            <div className="container relative z-10 mx-auto text-center max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-cyan-300 mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>
                    <span className="tracking-wide">RETAIL REIMAGINED</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 leading-[0.95] md:leading-[0.9]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 block">
                            AI Shopping Cart
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-gradient block mt-2">
                            Assistant.
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    Skip lines, find deals, and breeze through checkout with the world's smartest cart.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 animate-gradient bg-[length:200%_200%]"></div>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            size="lg"
                            className="relative rounded-full text-lg px-8 py-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 transform hover:scale-105"
                        >
                            <span className="flex items-center gap-2">
                                Get demo <ArrowRight className="w-5 h-5" />
                            </span>
                        </Button>
                    </div>
                </motion.div>

                {/* Main Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 100, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, type: "spring", damping: 20 }}
                    className="mt-20 relative mx-auto w-full max-w-5xl perspective-1000"
                >
                    <div className="relative z-10 group">
                        {/* Glow Effect behind device */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 blur-[100px] rounded-full -z-10 group-hover:blur-[120px] transition-all duration-700" />

                        <img
                            src="/vexa-assistant.png"
                            alt="Vexa Assistant Device"
                            className="w-full h-auto drop-shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                        />

                        {/* Reflection/Ground shadow */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-black/50 blur-xl rounded-[100%]" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
