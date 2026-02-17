"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoModal } from "@/components/ui/DemoModal";

export function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                            <ShoppingCart className="h-5 w-5 text-white group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold tracking-tight text-white">Vexa</span>
                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">AI Smart Cart</span>
                        </div>
                    </Link>

                    {/* Desktop Nav - Optional, keeping it simple for now as per screenshots */}

                    {/* CTA */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 animate-gradient bg-[length:200%_200%]"></div>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            variant="primary"
                            size="sm"
                            className="relative font-bold bg-cyan-500 hover:bg-cyan-400 text-black border-none shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        >
                            <span className="flex items-center gap-1.5">
                                Get demo <ArrowRight className="w-4 h-4" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Glass border bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 -z-10 bg-black/50 backdrop-blur-md" />
        </nav>
    );
}
