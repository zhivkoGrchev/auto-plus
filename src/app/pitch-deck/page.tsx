'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react'

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  const slides: Array<{
    title: string
    subtitle?: string
    content: (darkMode: boolean) => React.ReactElement
  }> = [
    // Slide 1: Title
    {
      title: 'Autohaus Plus',
      subtitle: 'The Complete Cloud Solution for Used Car Dealerships',
      content: (darkMode) => (
        <div className="text-center space-y-6">
          <div className="text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Autohaus Plus</div>
          <div className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage Inventory • Automate Sales • Increase Revenue</div>
          <div className={`mt-12 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Seeking €100,000 Seed Investment</div>
        </div>
      ),
    },

    // Slide 2: Problem
    {
      title: 'The Problem',
      content: (darkMode) => (
        <div className="space-y-6">
          <p className={`text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Used car dealerships face significant operational challenges:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className={`p-6 rounded-lg border-l-4 border-red-500 ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fragmented Systems</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Dealers juggle multiple disconnected tools for inventory, sales, and customer management
              </p>
            </div>
            <div className={`p-6 rounded-lg border-l-4 border-red-500 ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Manual Processes</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Time-consuming manual data entry reduces productivity and increases errors</p>
            </div>
            <div className={`p-6 rounded-lg border-l-4 border-red-500 ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Limited Visibility</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Lack of real-time analytics makes it difficult to optimize pricing and inventory</p>
            </div>
            <div className={`p-6 rounded-lg border-l-4 border-red-500 ${darkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>High Costs</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Expensive legacy software with complex licensing and maintenance fees</p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 3: Solution
    {
      title: 'Our Solution',
      content: (darkMode) => (
        <div className="space-y-6">
          <p className={`text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Autohaus Plus is an all-in-one cloud platform that streamlines operations for used car dealerships:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className={`p-6 rounded-lg border-l-4 border-cyan-600 ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'}`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>🚗 Smart Inventory Management</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Track vehicles, pricing, and status in real-time with automated workflows</p>
            </div>
            <div className={`p-6 rounded-lg border-l-4 border-cyan-600 ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'}`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>📊 Sales Automation</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Streamline the entire sales process from lead to closing with built-in CRM</p>
            </div>
            <div className={`p-6 rounded-lg border-l-4 border-cyan-600 ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'}`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>📈 Analytics Dashboard</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Real-time insights on sales performance, inventory turnover, and profitability</p>
            </div>
            <div className={`p-6 rounded-lg border-l-4 border-cyan-600 ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'}`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>☁️ Cloud-First</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>99.9% uptime on AWS, accessible anywhere, automatic updates, secure data</p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 4: Market Opportunity
    {
      title: 'Market Opportunity',
      content: (darkMode) => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white p-8 rounded-lg text-center">
              <div className="text-4xl font-bold mb-2">€50B+</div>
              <div className="text-lg">European Used Car Market (Annual)</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8 rounded-lg text-center">
              <div className="text-4xl font-bold mb-2">45,000+</div>
              <div className="text-lg">Used Car Dealers in Germany</div>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-lg text-center">
              <div className="text-4xl font-bold mb-2">12%</div>
              <div className="text-lg">Annual Market Growth</div>
            </div>
          </div>
          <div className={`mt-8 p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`font-bold text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Target Market</h3>
            <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">•</span>
                <span>
                  <strong>Primary:</strong> Small to medium-sized used car dealerships (5-50 vehicles)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">•</span>
                <span>
                  <strong>Secondary:</strong> Independent car traders and vehicle parks
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">•</span>
                <span>
                  <strong>Geographic Focus:</strong> Germany, expanding to Austria and Switzerland
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    // Slide 5: Business Model
    {
      title: 'Business Model',
      content: (darkMode) => (
        <div className="space-y-6">
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subscription-based SaaS model with tiered pricing:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className={`border-2 rounded-lg p-6 hover:border-cyan-600 transition-all ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Starter</h3>
                <div className="text-4xl font-bold text-cyan-600 mb-4">
                  €49<span className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>
                </div>
                <ul className={`text-left space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>✓ Up to 20 vehicles</li>
                  <li>✓ Basic inventory management</li>
                  <li>✓ Customer database</li>
                  <li>✓ Email support</li>
                </ul>
              </div>
            </div>
            <div className={`border-2 border-cyan-600 rounded-lg p-6 transform scale-105 shadow-lg ${darkMode ? 'bg-cyan-900/20' : 'bg-cyan-50'}`}>
              <div className="text-center">
                <div className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm inline-block mb-2">Most Popular</div>
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Professional</h3>
                <div className="text-4xl font-bold text-cyan-600 mb-4">
                  €149<span className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>
                </div>
                <ul className={`text-left space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>✓ Up to 100 vehicles</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Sales automation</li>
                  <li>✓ Multi-user access</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
            </div>
            <div className={`border-2 rounded-lg p-6 hover:border-cyan-600 transition-all ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Enterprise</h3>
                <div className="text-4xl font-bold text-cyan-600 mb-4">
                  €349<span className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>
                </div>
                <ul className={`text-left space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>✓ Unlimited vehicles</li>
                  <li>✓ Custom integrations</li>
                  <li>✓ White-label options</li>
                  <li>✓ Dedicated account manager</li>
                  <li>✓ 24/7 phone support</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`mt-6 p-4 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <strong>Additional Revenue:</strong> Premium features (website builder, marketing tools, API access) and transaction fees
            </p>
          </div>
        </div>
      ),
    },

    // Slide 6: Traction & Roadmap
    {
      title: 'Current Status & Roadmap',
      content: (darkMode) => (
        <div className="space-y-8">
          <div>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Current Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
                <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>✓ Product Development</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Core platform built with Next.js, TypeScript, Prisma. MVP ready for pilot customers
                </p>
              </div>
              <div className={`p-6 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>⚡ Infrastructure</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Deployed on AWS with 99.9% uptime guarantee, scalable architecture</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>12-Month Roadmap</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-cyan-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4 flex-shrink-0">Q1</div>
                <div className="flex-1">
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Beta Launch & Initial Customers</h4>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Onboard 10 pilot dealerships, gather feedback, iterate on features</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4 flex-shrink-0">Q2</div>
                <div className="flex-1">
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Marketing & Growth</h4>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Launch marketing campaigns, reach 50 paying customers, MRR: €5,000+</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4 flex-shrink-0">Q3</div>
                <div className="flex-1">
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Feature Expansion</h4>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Add marketplace integration, mobile app, advanced reporting. 150 customers</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4 flex-shrink-0">Q4</div>
                <div className="flex-1">
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Scale & Expansion</h4>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Reach 300+ customers, MRR: €35,000, prepare for Series A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 7: Competition
    {
      title: 'Competitive Landscape',
      content: (darkMode) => (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse ${darkMode ? 'text-gray-300' : ''}`}>
              <thead>
                <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                  <th className={`border p-3 text-left ${darkMode ? 'border-gray-600' : ''}`}>Feature</th>
                  <th className={`border p-3 text-center font-bold ${darkMode ? 'bg-cyan-900/50 border-gray-600' : 'bg-cyan-100'}`}>Autohaus Plus</th>
                  <th className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>Legacy Software</th>
                  <th className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>Spreadsheets</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`border p-3 ${darkMode ? 'border-gray-600' : ''}`}>Cloud-Based</td>
                  <td className={`border p-3 text-center ${darkMode ? 'bg-cyan-900/20 border-gray-600' : 'bg-cyan-50'}`}>✅</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>❌</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>⚠️</td>
                </tr>
                <tr>
                  <td className={`border p-3 ${darkMode ? 'border-gray-600' : ''}`}>Real-Time Analytics</td>
                  <td className={`border p-3 text-center ${darkMode ? 'bg-cyan-900/20 border-gray-600' : 'bg-cyan-50'}`}>✅</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>⚠️</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>❌</td>
                </tr>
                <tr>
                  <td className={`border p-3 ${darkMode ? 'border-gray-600' : ''}`}>Modern UI/UX</td>
                  <td className={`border p-3 text-center ${darkMode ? 'bg-cyan-900/20 border-gray-600' : 'bg-cyan-50'}`}>✅</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>❌</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>❌</td>
                </tr>
                <tr>
                  <td className={`border p-3 ${darkMode ? 'border-gray-600' : ''}`}>Automated Workflows</td>
                  <td className={`border p-3 text-center ${darkMode ? 'bg-cyan-900/20 border-gray-600' : 'bg-cyan-50'}`}>✅</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>⚠️</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>❌</td>
                </tr>
                <tr>
                  <td className={`border p-3 ${darkMode ? 'border-gray-600' : ''}`}>Affordable Pricing</td>
                  <td className={`border p-3 text-center ${darkMode ? 'bg-cyan-900/20 border-gray-600' : 'bg-cyan-50'}`}>✅</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>❌</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>✅</td>
                </tr>
                <tr>
                  <td className={`border p-3 ${darkMode ? 'border-gray-600' : ''}`}>No Setup Fees</td>
                  <td className={`border p-3 text-center ${darkMode ? 'bg-cyan-900/20 border-gray-600' : 'bg-cyan-50'}`}>✅</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>❌</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={`mt-6 p-6 rounded-lg border-l-4 border-cyan-600 ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'}`}>
            <h3 className={`font-bold text-xl mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Competitive Advantages</h3>
            <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>
                • <strong>Modern Technology:</strong> Built with latest tech stack for speed and reliability
              </li>
              <li>
                • <strong>User Experience:</strong> Intuitive interface designed specifically for car dealers
              </li>
              <li>
                • <strong>Pricing:</strong> 60% cheaper than legacy solutions with no hidden fees
              </li>
              <li>
                • <strong>Focus:</strong> Laser-focused on the German used car market
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    // Slide 8: Use of Funds
    {
      title: 'Use of Funds - €100,000',
      content: (darkMode) => (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-cyan-600 text-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Product Development - €35,000 (35%)</h3>
                <ul className="text-sm space-y-1">
                  <li>• Additional features & integrations</li>
                  <li>• Mobile app development</li>
                  <li>• API development</li>
                  <li>• Security & compliance</li>
                </ul>
              </div>
              <div className="bg-blue-600 text-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Marketing & Sales - €30,000 (30%)</h3>
                <ul className="text-sm space-y-1">
                  <li>• Digital marketing campaigns</li>
                  <li>• Content creation & SEO</li>
                  <li>• Trade show presence</li>
                  <li>• Sales materials</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-indigo-600 text-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Team & Operations - €20,000 (20%)</h3>
                <ul className="text-sm space-y-1">
                  <li>• Part-time sales representative</li>
                  <li>• Customer support</li>
                  <li>• Legal & accounting</li>
                  <li>• Office & tools</li>
                </ul>
              </div>
              <div className="bg-purple-600 text-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Infrastructure - €10,000 (10%)</h3>
                <ul className="text-sm space-y-1">
                  <li>• AWS hosting & services</li>
                  <li>• Third-party integrations</li>
                  <li>• Security & monitoring</li>
                  <li>• Backup & disaster recovery</li>
                </ul>
              </div>
              <div className="bg-gray-600 text-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Buffer - €5,000 (5%)</h3>
                <ul className="text-sm space-y-1">
                  <li>• Contingency fund</li>
                  <li>• Unexpected opportunities</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`mt-6 p-4 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
            <p className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>18-Month Runway</p>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              This investment provides 18 months of runway to reach profitability or next funding milestone
            </p>
          </div>
        </div>
      ),
    },

    // Slide 9: Financial Projections
    {
      title: 'Financial Projections (3 Years)',
      content: (darkMode) => (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse ${darkMode ? 'text-gray-300' : ''}`}>
              <thead>
                <tr className="bg-cyan-600 text-white">
                  <th className={`border p-3 text-left ${darkMode ? 'border-gray-600' : ''}`}>Metric</th>
                  <th className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>Year 1</th>
                  <th className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>Year 2</th>
                  <th className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>Year 3</th>
                </tr>
              </thead>
              <tbody>
                <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <td className={`border p-3 font-semibold ${darkMode ? 'border-gray-600' : ''}`}>Customers</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>300</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>1,200</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>3,500</td>
                </tr>
                <tr>
                  <td className={`border p-3 font-semibold ${darkMode ? 'border-gray-600' : ''}`}>Monthly Revenue</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>€35,000</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>€140,000</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>€410,000</td>
                </tr>
                <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <td className={`border p-3 font-semibold ${darkMode ? 'border-gray-600' : ''}`}>Annual Revenue</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>€210,000</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>€1,400,000</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>€4,500,000</td>
                </tr>
                <tr>
                  <td className={`border p-3 font-semibold ${darkMode ? 'border-gray-600' : ''}`}>Gross Margin</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>75%</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>80%</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>82%</td>
                </tr>
                <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <td className={`border p-3 font-semibold ${darkMode ? 'border-gray-600' : ''}`}>Operating Expenses</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>€280,000</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>€800,000</td>
                  <td className={`border p-3 text-center ${darkMode ? 'border-gray-600' : ''}`}>€2,100,000</td>
                </tr>
                <tr className={`font-bold ${darkMode ? 'bg-cyan-900/50' : 'bg-cyan-50'}`}>
                  <td className={`border p-3 ${darkMode ? 'border-gray-600' : ''}`}>EBITDA</td>
                  <td className={`border p-3 text-center text-red-600 ${darkMode ? 'border-gray-600' : ''}`}>-€70,000</td>
                  <td className={`border p-3 text-center text-green-600 ${darkMode ? 'border-gray-600' : ''}`}>+€320,000</td>
                  <td className={`border p-3 text-center text-green-600 ${darkMode ? 'border-gray-600' : ''}`}>+€1,590,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Average Revenue Per User</h4>
              <p className="text-2xl font-bold text-blue-600">€117/month</p>
            </div>
            <div className={`p-4 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
              <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Customer Acquisition Cost</h4>
              <p className="text-2xl font-bold text-green-600">€350</p>
            </div>
            <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
              <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>LTV:CAC Ratio</h4>
              <p className="text-2xl font-bold text-purple-600">6.7:1</p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 10: Team
    {
      title: 'The Team',
      content: (darkMode) => (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Experienced team with expertise in automotive, SaaS, and enterprise software
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg border-l-4 border-cyan-600 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Founder & CEO</h3>
              <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                10+ years in automotive industry, previously at major dealership group. MBA in Business Administration.
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>• Strategic vision • Industry connections • Sales expertise</p>
            </div>
            <div className={`p-6 rounded-lg border-l-4 border-blue-600 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>CTO / Tech Lead</h3>
              <p className={`mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                15+ years software development, led engineering at Series B SaaS startup. Computer Science degree.
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>• Full-stack development • Cloud architecture • Team leadership</p>
            </div>
          </div>
          <div className={`mt-8 p-6 rounded-lg ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'}`}>
            <h3 className={`font-bold text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Advisory Board</h3>
            <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>
                • <strong>Industry Advisor:</strong> Former VP at leading automotive software company
              </li>
              <li>
                • <strong>Marketing Advisor:</strong> Growth expert from successful B2B SaaS company
              </li>
              <li>
                • <strong>Financial Advisor:</strong> CFO with experience scaling SaaS companies
              </li>
            </ul>
          </div>
          <div className={`mt-6 p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hiring Plan:</p>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              With this funding, we'll hire 2 developers, 1 sales rep, and 1 customer success manager within 6 months
            </p>
          </div>
        </div>
      ),
    },

    // Slide 11: Investment Terms
    {
      title: 'Investment Opportunity',
      content: (darkMode) => (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-4xl font-bold mb-4">€100,000 Seed Round</h2>
            <p className="text-xl">Convertible Note or 10% Equity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`border-2 rounded-lg p-6 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Investment Terms</h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">•</span>
                  <span>
                    <strong>Amount:</strong> €100,000
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">•</span>
                  <span>
                    <strong>Type:</strong> Convertible note or equity
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">•</span>
                  <span>
                    <strong>Valuation:</strong> €1M pre-money (if equity)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">•</span>
                  <span>
                    <strong>Use:</strong> 18-month runway to profitability
                  </span>
                </li>
              </ul>
            </div>

            <div className={`border-2 rounded-lg p-6 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What You Get</h3>
              <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Equity stake in fast-growing SaaS company</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Proven product with clear market fit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Large addressable market (€50B+)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Path to profitability in 18-24 months</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className={`p-4 rounded-lg text-center border-2 border-green-500 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
              <div className="text-3xl font-bold text-green-600 mb-2">€4.5M</div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Year 3 Revenue Projection</div>
            </div>
            <div className={`p-4 rounded-lg text-center border-2 border-blue-500 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <div className="text-3xl font-bold text-blue-600 mb-2">3,500+</div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Customers by Year 3</div>
            </div>
            <div className={`p-4 rounded-lg text-center border-2 border-purple-500 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
              <div className="text-3xl font-bold text-purple-600 mb-2">82%</div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gross Margin by Year 3</div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 12: Closing
    {
      title: "Let's Transform Used Car Dealerships Together",
      content: (darkMode) => (
        <div className="text-center space-y-8">
          <div className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Join Our Journey</div>

          <div className={`max-w-2xl mx-auto space-y-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>Autohaus Plus is positioned to capture a significant share of the €50B+ European used car market with our modern, cloud-based platform.</p>
            <p className="font-semibold">
              With your €100,000 investment, we'll scale our operations, acquire customers, and build the future of automotive retail management.
            </p>
          </div>

          <div className={`mt-12 p-8 rounded-lg border-2 border-cyan-600 max-w-2xl mx-auto ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'}`}>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Us</h3>
            <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>
                <strong>Email:</strong> support@autohaus-plus.de
              </p>
              <p>
                <strong>Phone:</strong> +49 123 456 7890
              </p>
              <p>
                <strong>Website:</strong> www.autohaus-plus.de
              </p>
            </div>
          </div>

          <div className="text-2xl font-semibold text-cyan-600 mt-8">Thank you for your time and consideration!</div>
        </div>
      ),
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}
    >
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
            }`}
          >
            {darkMode ? (
              <>
                <Sun className="w-5 h-5" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Slide Content */}
        <div className={`flex-1 rounded-lg shadow-2xl p-12 mb-6 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-4xl font-bold mb-8 border-b-4 border-cyan-600 pb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {slides[currentSlide].title}
          </h1>
          {slides[currentSlide].subtitle && (
            <h2 className={`text-2xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{slides[currentSlide].subtitle}</h2>
          )}
          <div className="mt-6">{slides[currentSlide].content(darkMode)}</div>
        </div>

        {/* Navigation */}
        <div className={`flex items-center justify-between rounded-lg shadow-lg p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            type="button"
            onClick={prevSlide}
            className="flex items-center px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="mr-2" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${index === currentSlide ? 'bg-cyan-600 w-8' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              type="button"
              onClick={nextSlide}
              className="flex items-center px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentSlide === slides.length - 1}
            >
              Next
              <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PitchDeck
