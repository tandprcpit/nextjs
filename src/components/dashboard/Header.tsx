"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = (href: string) => {
    closeMenu();
    router.push(href);
  };

  const handleSignOut = () => {
    closeMenu();
    signOut();
  };

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/training_program", label: "Training Programs" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ];

  const studentLinks = [
    { href: "/", label: "Home" },
    { href: "/companies", label: "Companies" },
    { href: "/all-students-profile", label: "All Students" },
    { href: "/company-questions", label: "Questions" },
    { href: "/profile", label: "Profile" },
    { href: "/training_program", label: "Training Programs" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ];

  const tpoLinks = [
    { href: "/", label: "Home" },
    { href: "/tpo/dashboard", label: "Dashboard" },
    { href: "/all-students-profile", label: "All Students" },
    { href: "/tpo/manage-tpc", label: "Manage TPC" },
    { href: "/company-questions", label: "Questions" },
    { href: "/training_program", label: "Training Programs" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ];

  const tpcLinks = [
    { href: "/", label: "Home" },
    { href: "/tpc/dashboard", label: "Dashboard" },
    { href: "/tpc/companies", label: "Companies" },
    { href: "/tpc/bulk-registration", label: "Student Signup" },
    { href: "/all-students-profile", label: "All Students" },

    { href: "/company-questions", label: "Questions" },
    { href: "/training_program", label: "Training  Programs" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ];

  const navLinks = !session
    ? publicLinks
    : session.user.role === "student"
    ? studentLinks
    : session.user.role === "tpo"
    ? tpoLinks
    : session.user.role === "tpc"
    ? tpcLinks
    : [];

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Image
              src="/rcpitlogo.png"
              alt="RCPIT Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#244855]">Prajakta Mahajan</span>
              <span className="text-xs text-[#90AEAD]">R. C. Patel Institute of Technology, Shirpur</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
            {session ? (
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex text-[#E64833] border-[#E64833]"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            ) : (
              <Link href="/sign-in" onClick={closeMenu}>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex text-[#E64833] border-[#E64833]"
                >
                  Student Login
                </Button>
              </Link>
            )}

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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 bg-[#FBE9D0]">
            {navLinks.map((link) => (
              <button
                key={link.href}
                className="text-sm font-medium text-[#244855] hover:text-[#E64833] transition-colors"
                onClick={() => handleLinkClick(link.href)}
              >
                {link.label}
              </button>
            ))}
            {session ? (
              <Button
                variant="outline"
                size="sm"
                className="text-[#E64833] border-[#E64833]"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-[#E64833] border-[#E64833]"
                onClick={() => handleLinkClick("/sign-in")}
              >
                Student Login
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

