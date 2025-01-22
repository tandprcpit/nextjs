import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Shirpur Education Society&apos;s R. C. Patel Institute of Technology, Shirpur
              Near Nimzari Naka, Shahada Road, Shirpur
              Dist. Dhule (M.S.) Maharashtra, India - 425405
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">About</Link></li>
              <li><Link href="/courses" className="text-sm hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">(02563) 259600, 801, 802.</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:director@rcpit.ac.in" className="text-sm hover:text-white transition-colors">director@rcpit.ac.in</a>
              </li>
              <li className="flex items-center">
                <Globe size={16} className="mr-2" />
                <a href="http://www.rcpit.ac.in" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">www.rcpit.ac.in</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} R. C. Patel Institute of Technology, Shirpur. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}