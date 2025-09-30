import Link from "next/link"
import { Github, Twitter, DiscIcon as Discord } from "lucide-react"

// Footer component with navigation and social links
export function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">U</div>
              </div>
              <span className="font-bold text-xl text-white">UIswap</span>
            </div>
            <p className="text-sm text-slate-400">The leading decentralized exchange on Ethereum</p>
            <div className="flex items-center gap-4">
              <Link href="https://twitter.com" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://discord.com" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link href="https://github.com" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/swap" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Swap
                </Link>
              </li>
              <li>
                <Link href="/pools" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Liquidity Pools
                </Link>
              </li>
              <li>
                <Link href="/farms" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Farms
                </Link>
              </li>
              <li>
                <Link href="/staking" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Staking
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/governance" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Governance
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700/50 text-center">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} UIswap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
