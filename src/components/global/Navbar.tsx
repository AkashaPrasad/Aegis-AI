"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/product" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-background/60 backdrop-blur-md border-b border-border/50 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5 border-b border-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 max-w-[1920px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Aegis Logo" className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,153,0,0.5)]" />
          <span className="font-semibold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
            Aegis
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <motion.div key={link.name} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  href={link.href}
                  className={clsx(
                    "text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-primary"
                      : "text-text-secondary hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact#enquiry"
              className="group relative px-6 py-2.5 text-sm font-medium rounded-full overflow-hidden bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span className="relative">Request Demo</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-surface-elevated/95 backdrop-blur-xl border-b border-border p-6 shadow-2xl"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "text-base font-medium py-2",
                  pathname === link.href ? "text-primary" : "text-text-secondary"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact#enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 text-center px-5 py-3 text-sm font-medium rounded-md bg-primary text-background hover:bg-primary-hover transition-colors"
            >
              Request Demo
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
