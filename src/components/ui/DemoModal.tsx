"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
    const [step, setStep] = useState<"form" | "success">("form");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep("success");
    };

    const resetModal = () => {
        setStep("form");
        setFormData({ name: "", email: "" });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetModal}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl">
                            {/* Decorative Gradients */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400" />
                            <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute -bottom-[100px] -left-[100px] w-[200px] h-[200px] bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />

                            {/* Close Button */}
                            <button
                                onClick={resetModal}
                                className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-white transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative p-6 pt-10 md:p-8">
                                <AnimatePresence mode="wait">
                                    {step === "form" ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-6"
                                        >
                                            <div className="text-center space-y-2">
                                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                                    Get Your Live Demo
                                                </h3>
                                                <p className="text-zinc-400 text-sm">
                                                    We're currently invite-only. Join the waitlist for immediate access to our next cohort.
                                                </p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="space-y-2">
                                                    <label htmlFor="name" className="text-xs font-medium text-zinc-300 ml-1">
                                                        FULL NAME
                                                    </label>
                                                    <div className="relative group">
                                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-purple-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            required
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            className="relative w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-0 focus:border-white/20 transition-all"
                                                            placeholder="John Doe"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="text-xs font-medium text-zinc-300 ml-1">
                                                        WORK EMAIL
                                                    </label>
                                                    <div className="relative group">
                                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-purple-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            required
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            className="relative w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-0 focus:border-white/20 transition-all"
                                                            placeholder="john@company.com"
                                                        />
                                                    </div>
                                                </div>

                                                <Button
                                                    disabled={isLoading}
                                                    type="submit"
                                                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition-opacity text-white font-semibold rounded-xl mt-2"
                                                >
                                                    {isLoading ? (
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                    ) : (
                                                        <span className="flex items-center justify-center gap-2">
                                                            Reserve Spot <ArrowRight className="w-4 h-4" />
                                                        </span>
                                                    )}
                                                </Button>
                                            </form>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8 space-y-6"
                                        >
                                            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
                                                <Check className="w-10 h-10 text-green-400" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-bold text-white">
                                                    You're on the list!
                                                </h3>
                                                <p className="text-zinc-400">
                                                    We've received your details. Check your inbox shortly for your demo invitation.
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                onClick={resetModal}
                                                className="mt-4 border-white/10 hover:bg-white/5 text-zinc-300"
                                            >
                                                Close
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
