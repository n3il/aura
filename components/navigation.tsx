'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ViewTransition, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const MenuItems = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Mission" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasAnimated = useRef(false);

  // Only animate on first render, not on route changes
  const shouldAnimate = !hasAnimated.current;

  useEffect(() => {
    hasAnimated.current = true;
  }, []);
  const activeItem = MenuItems.find((item) => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href.split("#")[0])));

  return (
    <motion.nav
      initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto sticky left-0 right-0 top-12 z-50 flex justify-center px-4"
    >
      <motion.div
        initial={shouldAnimate ? { opacity: 0, scale: 0.95 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="p-1 w-full inline-flex flex-nowrap bg-background/10 backdrop-blur-md border-[.5px] pr-3 border-[#d9ddc6]/40 rounded-full items-center justify-between"
      >
        <div className="flex items-center">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            className="shrink-0"
          >
            <Image src="/images/aura-logo.png" alt="Aura Fields Foundation" width={40} height={40} />
          </motion.div>
          <motion.h1
            initial={shouldAnimate ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
            className="text-base px-4 py-2"
            style={{ fontFamily: 'var(--font-hubot-sans)' }}
          >
            <span className="hidden sm:inline whitespace-nowrap">Aura Fields Foundation</span>
            <span className="sm:hidden whitespace-nowrap">Aura Fields</span>
          </motion.h1>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center">
          {MenuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05, ease: "easeOut" }}
            >
              <ViewTransition>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm text-muted hover:text-foreground transition-colors whitespace-nowrap px-4 py-2",
                    activeItem === item && "text-white rounded-full"
                  )}
                >
                  {item.label}
                </Link>
              </ViewTransition>
            </motion.div>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <motion.button
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>
      </motion.div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-12 mt-2 md:hidden"
          >
            <div className="bg-background/10 backdrop-blur-md border-[.5px] border-[#d9ddc6] rounded-2xl py-2 px-2 flex flex-col gap-1 overflow-hidden">
              {MenuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <ViewTransition>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block text-sm text-muted hover:text-foreground transition-colors whitespace-nowrap px-4 py-2 rounded-full hover:bg-foreground/5",
                        activeItem === item && "text-white bg-foreground/10"
                      )}
                    >
                      {item.label}
                    </Link>
                  </ViewTransition>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
