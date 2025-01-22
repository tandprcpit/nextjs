"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/training_program", label: "Training programs" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
    // { href: "/placements", label: "Placements" },
    // { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/rcpitlogo.png"
              alt="RCPIT Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#244855]">Training and Placement</span>
              <span className="text-xs text-[#90AEAD]">R. C. Patel Institute of Technology, Shirpur</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="text-sm font-medium text-[#244855] hover:text-[#E64833] transition-colors"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex text-[#E64833] border-[#E64833]"
              >
                Student Login
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#244855]"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 bg-[#FBE9D0]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="text-sm font-medium text-[#244855] hover:text-[#E64833] transition-colors"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/sign-in">
              <Button
                variant="outline"
                size="sm"
                className="text-[#E64833] border-[#E64833]"
              >
                Student Login
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
