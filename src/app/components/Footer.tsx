"use client";

import { Container, IconButton } from "@mui/material";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { cn } from "@/app/lib/cn";

export default function Footer() {
  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com" },
    { icon: <FaTwitter />, href: "https://twitter.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "#destinations" },
    { name: "Packages", href: "#packages" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className={cn("bg-slate-900 text-white py-16")}>
      <Container maxWidth="lg" className="grid md:grid-cols-4 gap-10">
       
        <div>
          <h2 className="text-2xl font-bold text-emerald-500 mb-4">Travelly</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Explore the world with confidence. Curated trips, amazing destinations, and unforgettable experiences await you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-slate-300 hover:text-emerald-500 transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-slate-300 text-sm mb-2">Email: info@travelly.com</p>
          <p className="text-slate-300 text-sm mb-2">Phone: +91 123 456 7890</p>
          <p className="text-slate-300 text-sm">Address: 123 Travel Street, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex items-center gap-3">
            {socialLinks.map((social, i) => (
              <IconButton
                key={i}
                component="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                className={cn(
                  "bg-slate-800 hover:bg-emerald-500 text-white hover:text-white",
                  "p-3 rounded-full transition-all duration-300"
                )}
              >
                {social.icon}
              </IconButton>
            ))}
          </div>
        </div>
      </Container>

     
      <div className="mt-12 border-t border-slate-800 pt-6 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Travelly. All rights reserved.
      </div>
    </footer>
  );
}
