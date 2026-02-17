import { ShoppingCart } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10">
                        <ShoppingCart className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">Vexa</span>
                </div>

                <p className="text-zinc-500 text-sm">
                    © {new Date().getFullYear()} Vexa AI. All rights reserved.
                </p>

                <div className="flex gap-6">
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Privacy</a>
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Terms</a>
                    <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Contact</a>
                </div>
            </div>
        </footer>
    );
}
