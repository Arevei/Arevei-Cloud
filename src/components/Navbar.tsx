"use client"
import { Button } from "@/components/ui/button";
import { Cloud } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
            <Cloud className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Arevei Cloud
            </span>
          </Link>

          {/* {isLanding ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="hero-gradient">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          ) : null} */}


         {isLanding ? (
            <div className="flex items-center gap-4">
              <Button asChild className="hero-gradient">
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
