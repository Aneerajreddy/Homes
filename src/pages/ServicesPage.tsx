import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Globe, Share2, MapPin, Home, Video, Shield, FileText,
  CreditCard, Wallet, Camera, Wrench, Users, Smartphone, CheckCircle,
  ArrowRight, Mail
} from 'lucide-react';

export default function ServicesPage() {
  const ownerServices = [
    {
      icon: TrendingUp,
      title: 'Renting Price Guidance',
      description: 'Expert market analysis and competitive pricing recommendations to maximize your rental income while ensuring quick tenant placement.',
      features: ['Market research & analysis', 'Competitive pricing strategy', 'Revenue optimization', 'Demand forecasting']
    },
    {
      icon: Globe,
      title: 'Online Marketing on Own Website',
      description: 'Premium listing placement on our verified platform with enhanced visibility and professional presentation.',
      features: ['Featured property listings', 'Professional photography', 'SEO optimization', 'Enhanced property profiles']
    },
    {
      icon: Share2,
      title: 'Multi-Platform Online Marketing',
      description: 'Comprehensive digital marketing across multiple property portals and social media platforms for maximum exposure.',
      features: ['Multiple portal listings', 'Social media promotion', 'Google Ads campaigns', 'Email marketing']
    },
    {
      icon: MapPin,
      title: 'Local Offline Marketing',
      description: 'Strategic offline marketing in and around your property area to attract local families and working professionals.',
      features: ['Local area promotion', 'Community outreach', 'Referral programs', 'Neighborhood marketing']
    },
    {
      icon: CreditCard,
      title: 'Rent Collection & Remittance',
      description: 'Automated rent collection with timely remittance to owners, eliminating payment delays and disputes.',
      features: ['Automated collection', 'Timely remittance', 'Payment tracking', 'Late fee management']
    },
    {
      icon: Wallet,
      title: 'Deposit Management & Refund',
      description: 'Secure handling of security deposits with transparent refund processing and damage assessment.',
      features: ['Secure deposit handling', 'Damage assessment', 'Transparent refunds', 'Dispute resolution']
    },
    {
      icon: Users,
      title: 'Dedicated Relationship Manager',
      description: 'Personal relationship manager assigned to handle all your property management needs and tenant communications.',
      features: ['Personal account manager', 'Regular updates', 'Issue resolution', 'Performance reporting']
    }
  ];

  const tenantServices = [
    {
      icon: Home,
      title: 'Physical House Visits',
      description: 'Convenient in-person property visits with our representatives to help you make informed decisions.',
      features: ['Scheduled visits', 'Expert guidance', 'Area insights', 'Immediate assistance']
    },
    {
      icon: Video,
      title: 'Virtual House Tours',
      description: 'High-quality virtual tours allowing you to explore properties from anywhere, saving time and effort.',
      features: ['360° virtual tours', 'Live video calls', 'Interactive walkthroughs', 'Remote viewing']
    },
    {
      icon: Shield,
      title: 'Tenant Background Verification',
      description: 'Comprehensive background verification to build trust with property owners and ensure smooth rental approval.',
      features: ['Identity verification', 'Employment verification', 'Credit history check', 'Reference validation']
    },
    {
      icon: FileText,
      title: 'Rent Agreement & Paperwork',
      description: 'Complete legal documentation and rental agreement preparation with lawyer consultation included.',
      features: ['Legal documentation', 'Agreement drafting', 'Lawyer consultation', 'Registration assistance']
    },
    {
      icon: Camera,
      title: 'Move-in & Move-out Reports',
      description: 'Detailed video documentation of property condition during move-in and move-out for transparency.',
      features: ['Video documentation', 'Condition reports', 'Damage assessment', 'Dispute prevention']
    },
    {
      icon: Wrench,
      title: 'Property Maintenance & Repairs',
      description: '24/7 maintenance support for all property and furniture-related issues with quick resolution.',
      features: ['24/7 support', 'Quick repairs', 'Furniture maintenance', 'Emergency assistance']
    },
    {
      icon: Smartphone,
      title: 'App-based Assistance',
      description: 'Complete rental management through our mobile app with instant support and service requests.',
      features: ['Mobile app access', 'Instant support', 'Service requests', 'Payment management']
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Property Listing & Marketing',
      description: 'We help owners list properties with optimal pricing and comprehensive marketing across multiple channels.',
      color: 'bg-blue-600'
    },
    {
      step: 2,
      title: 'Tenant Matching & Verification',
      description: 'We find verified families through virtual tours, background checks, and personalized matching.',
      color: 'bg-green-600'
    },
    {
      step: 3,
      title: 'Agreement & Documentation',
      description: 'Complete legal documentation and rental agreement preparation with lawyer consultation included.',
      color: 'bg-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Rental Services for Owners & Families</h1>
          <p className="text-xl mb-8">End-to-end rental management for property owners and tenant families</p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Rental Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide complete rental management services for both property owners and tenant families,
              ensuring a smooth, transparent, and hassle-free experience for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Property Owners */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">For Property Owners</h3>
                <p className="text-blue-800">Complete property management and tenant relations</p>
              </div>

              <div className="space-y-6">
                {ownerServices.map((service, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                        <p className="text-gray-700 text-sm mb-3">{service.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Tenants */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">For Tenants</h3>
                <p className="text-green-800">Rental solutions for families seeking quality homes</p>
              </div>

              <div className="space-y-6">
                {tenantServices.map((service, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                        <p className="text-gray-700 text-sm mb-3">{service.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Service Works</h2>
            <p className="text-xl text-gray-600">A simple, transparent process for owners and tenants</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg`}>
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600">Everything you need for a seamless rental experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Viewing & Documentation */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Viewing & Documentation</h3>
              <div className="space-y-4">
                {[
                  { title: "Physical House Visits", desc: "Guided property tours with expert assistance" },
                  { title: "Virtual House Tours", desc: "360° virtual tours and live video calls" },
                  { title: "Move-in Video Reports", desc: "Detailed condition documentation" },
                  { title: "Move-out Video Reports", desc: "Transparent damage assessment" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial & Legal */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Financial & Legal</h3>
              <div className="space-y-4">
                {[
                  { title: "Tenant Background Verification", desc: "Comprehensive background and credit checks" },
                  { title: "Rent Agreement & Paperwork", desc: "Legal documentation and registration" },
                  { title: "Rent Collection & Remittance", desc: "Automated payment processing" },
                  { title: "Deposit Management & Refund", desc: "Secure deposit handling and refunds" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Management */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Property Management</h3>
              <div className="space-y-4">
                {[
                  { title: "Dedicated Relationship Manager", desc: "Personal support for owners and tenants" },
                  { title: "App-based Assistance", desc: "Instant service requests and updates" },
                  { title: "24/7 Maintenance Support", desc: "Quick resolution of issues" },
                  { title: "Performance Reporting", desc: "Monthly insights and analytics" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance & Support */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ongoing Support & Maintenance</h2>
            <p className="text-xl text-gray-600">Continuous support throughout your rental journey</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Maintenance & Repairs</h3>
                    <p className="text-gray-600">24/7 maintenance support for all property issues with quick resolution and quality service.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Dedicated Relationship Manager</h3>
                    <p className="text-gray-600">Personal relationship manager for ongoing support, communication, and issue resolution.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">App-based Assistance</h3>
                    <p className="text-gray-600">Complete rental management through our mobile app with instant support and service requests.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">What's Included in Support</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Emergency repairs", "Furniture maintenance", "Appliance servicing", "Plumbing & electrical",
                  "Regular inspections", "Quality assurance", "Dispute resolution", "Legal assistance"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Rental Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of property owners and families who trust us for their rental needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}