import { APP_NAME } from '@/types/global-constants'
import Link from 'next/link'
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa'

export const Footer = () => (
  <footer className="bg-cyan-700 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">{APP_NAME}</h3>
          <p className="mb-4">
            The complete cloud solution for used car dealerships and vehicle
            parks.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/features" className="hover:text-blue-400">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-blue-400">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="hover:text-blue-400">
                Case Studies
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="hover:text-blue-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-400">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <span>+49 123 456 7890</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <a
                href="mailto:support@auto-plus.de"
                className="hover:text-blue-400"
              >
                support@auto-plus.de
              </a>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-sm">
              <strong>Cloud Hosted:</strong> Securely deployed on AWS with 99.9%
              uptime
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)
