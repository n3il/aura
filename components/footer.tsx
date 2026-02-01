'use client';

import Link from "next/link";
import Image from "next/image";
import { MenuItems } from "./navigation";

export default function Footer() {
  return (
    <footer className="bg-background/70 backdrop-blur-xs text-white border-t border-border">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/images/aura-logo.png" alt="Aura Fields Foundation" width={34} height={34} />
              <span className=" text-xl tracking-tight">
                Aura Fields Foundation
              </span>
            </div>
          </div>
          <div className="font-mono">
            <h4 className="font-semibold mb-4 text-gold text-sm font-mono">Quick Links</h4>
            <ul className="space-y-3 text-white/70">
              {MenuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors text-xs">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="font-mono">
            <h4 className="font-semibold mb-4 text-gold font-mono text-sm">Contact</h4>
            <span className="text-muted text-sm font-mono">
              info@aurafieldsfoundation.com
            </span>
          </div>
        </div>
        <div className="font-mono border-t border-white/10 mt-12 py-8 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Aura Fields Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
