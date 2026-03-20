import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-surface-elevated/50 backdrop-blur-xl border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12 max-w-[1920px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <img src="/logo.png" alt="Aegis Logo" className="w-7 h-7 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="font-semibold text-xl tracking-tight text-white">
                Aegis
              </span>
            </Link>
            <p className="text-text-secondary text-sm max-w-xs mb-6 leading-relaxed">
              Automated LLM Safety Testing & Compliance. Secure AI before it speaks.
            </p>
            <a 
              href="mailto:aegis.ai.redteam@gmail.com" 
              className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
            >
              aegis.ai.redteam@gmail.com
            </a>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-4 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/product" className="text-sm text-text-secondary hover:text-white transition-colors">Product Details</Link></li>
              <li><Link href="/product#how-it-works" className="text-sm text-text-secondary hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/product#integrations" className="text-sm text-text-secondary hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-4 uppercase tracking-wider text-xs">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-sm text-text-secondary hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-text-secondary hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/contact#feedback" className="text-sm text-text-secondary hover:text-white transition-colors">Feedback</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Aegis AI Red Team. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-text-muted hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-text-muted hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
