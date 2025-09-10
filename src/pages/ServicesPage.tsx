import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Globe, Share2, MapPin, Home, Video, Shield, FileText,
  CreditCard, Wallet, Camera, Wrench, Users, Smartphone, CheckCircle,
  ArrowRight, Mail, Star, Clock, Award
} from 'lucide-react';

export default function ServicesPage() {
  const ownerServices = [
    {
      icon: TrendingUp,
      title: 'Renting Price Guidance',
      description: 'Expert market analysis and competitive pricing recommendations to maximize your rental income while ensuring quick tenant placement in Hyderabad.',
      features: ['Market research & analysis', 'Competitive pricing strategy', 'Revenue optimization', 'Demand forecasting']
    },
    {
      icon: Globe,
      title: 'Online Marketing on Own Website',
      description: 'Premium listing placement on our verified platform with enhanced visibility and professional presentation to attract quality families.',
      features: ['Featured property listings', 'Professional photography', 'SEO optimization', 'Enhanced property profiles']
    },
    {
      icon: Share2,
      title: 'Online Marketing on Multiple Websites',
      description: 'Comprehensive digital marketing across multiple property portals and social media platforms for maximum exposure in Hyderabad market.',
      features: ['Multiple portal listings', 'Social media promotion', 'Google Ads campaigns', 'Email marketing']
    },
    {
      icon: MapPin,
      title: 'Offline Marketing in & Around the House',
      description: 'Strategic offline marketing in and around your property area to attract local families and working professionals in nearby localities.',
      features: ['Local area promotion', 'Community outreach', 'Referral programs', 'Neighborhood marketing']
    },
    {
      icon: CreditCard,
      title: 'Rent Collection & Remittance',
      description: 'Automated rent collection with timely remittance to owners, eliminating payment delays and disputes through our secure platform.',
      features: ['Automated collection', 'Timely remittance', 'Payment tracking', 'Late fee management']
    },
    {
      icon: Wallet,
      title: 'Deposit Management & Refund',
      description: 'Secure handling of security deposits with transparent refund processing and damage assessment at the end of lease term.',
      features: ['Secure deposit handling', 'Damage assessment', 'Transparent refunds', 'Dispute resolution']
    },
    {
      icon: Users,
      title: 'Dedicated Relationship Manager',
      description: 'Personal relationship manager assigned to handle all your property management needs and tenant communications throughout the rental period.',
      features: ['Personal account manager', 'Regular updates', 'Issue resolution', 'Performance reporting']
    }
  ];

  const tenantServices = [
    {
      icon: Home,
      title: 'Physical House Visits for Tenants',
      description: 'Convenient in-person property visits with our representatives to help families make informed decisions about their future home.',
      features: ['Scheduled visits', 'Expert guidance', 'Area insights', 'Immediate assistance']
    },
    {
      icon: Video,
      title: 'Virtual House Tours for Tenants',
      description: 'High-quality virtual tours allowing families to explore properties from anywhere, saving time and effort in the selection process.',
      features: ['360° virtual tours', 'Live video calls', 'Interactive walkthroughs', 'Remote viewing']
    },
    {
      icon: Shield,
      title: 'Tenant Background Verification',
      description: 'Comprehensive background verification to build trust with property owners and ensure smooth rental approval for genuine families.',
      features: ['Identity verification', 'Employment verification', 'Credit history check', 'Reference validation']
    },
    {
      icon: FileText,
      title: 'Rent Agreement & Paperwork',
      description: 'Complete legal documentation and rental agreement preparation with lawyer consultation included for legal compliance.',
      features: ['Legal documentation', 'Agreement drafting', 'Lawyer consultation', 'Registration assistance']
    },
    {
      icon: Camera,
      title: 'Move-in & Move-out Video Reports',
      description: 'Detailed video documentation of property condition during move-in and move-out for complete transparency and dispute prevention.',
      features: ['Video documentation', 'Condition reports', 'Damage assessment', 'Dispute prevention']
    },
    {
      icon: Wrench,
      title: 'Property Maintenance & Repairs',
      description: '24/7 maintenance support for all property and furniture-related issues with quick resolution and quality service guarantee.',
      features: ['24/7 support', 'Quick repairs', 'Furniture maintenance', 'Emergency assistance']
    },
    {
      icon: Smartphone,
      title: 'App-based Assistance from Anywhere',
      description: 'Complete rental management through our mobile app with instant support and service requests accessible from anywhere.',
      features: ['Mobile app access', 'Instant support', 'Service requests', 'Payment management']
    }
  ];

  const servicePackages = [
    {
      name: 'Basic Package',
      price: '₹2,999',
      period: 'per month',
      description: 'Essential services for individual property owners',
      features: [
        'Renting Price Guidance',
        'Online Marketing on Own Website',
        'Tenant Background Verification',
        'Rent Agreement & Paperwork',
        'Basic Maintenance Support'
      ],
      color: 'border-blue-200 bg-blue-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Premium Package',
      price: '₹4,999',
      period: 'per month',
      description: 'Comprehensive services for serious property investors',
      features: [
        'All Basic Package features',
        'Multi-Platform Online Marketing',
        'Physical & Virtual House Tours',
        'Rent Collection & Remittance',
        'Deposit Management & Refund',
        'Move-in & Move-out Video Reports',
        'Dedicated Relationship Manager'
      ],
      color: 'border-green-200 bg-green-50',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      popular: true
    },
    {
      name: 'Enterprise Package',
      price: '₹7,999',
      period: 'per month',
      description: 'Complete property management for multiple properties',
      features: [
        'All Premium Package features',
        'Offline Marketing in & Around House',
        'Priority Property Maintenance',
        'App-based Assistance 24/7',
        'Advanced Analytics & Reporting',
        'Legal Support & Consultation',
        'Custom Marketing Campaigns'
      ],
      color: 'border-purple-200 bg-purple-50',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Property Listing & Marketing',
      description: 'We help owners list properties with optimal pricing and comprehensive marketing across multiple channels in Hyderabad.',
      color: 'bg-blue-600'
    },
    {
      step: 2,
      title: 'Tenant Matching & Verification',
      description: 'We find verified families through virtual tours, background checks, and personalized matching based on preferences.',
      color: 'bg-green-600'
    },
    {
      step: 3,
      title: 'Agreement & Documentation',
      description: 'Complete legal documentation and rental agreement preparation with lawyer consultation and registration assistance.',
      color: 'bg-purple-600'
    },
    {
      step: 4,
      title: 'Ongoing Management & Support',
      description: 'Continuous rent collection, maintenance support, and dedicated relationship management throughout the lease period.',
      color: 'bg-orange-600'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Verified & Trusted',
      description: 'All properties and tenants undergo strict verification for complete peace of mind.',
      stats: '100% Verified Properties'
    },
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: 'Average property rental completion within 15 days from listing to tenant move-in.',
      stats: '15 Days Average'
    },
    {
      icon: Star,
      title: 'High Success Rate',
      description: 'Over 95% of our listed properties get rented within 30 days of verification.',
      stats: '95% Success Rate'
    },
    {
      icon: Award,
      title: 'Customer Satisfaction',
      description: 'Rated 4.8/5 by property owners and tenants for our comprehensive service quality.',
      stats: '4.8/5 Rating'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Complete Rental Services in Hyderabad</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            End-to-end property rental management for owners and tenant families across all major areas of Hyderabad
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

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Rental Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide complete rental management services for both property owners and tenant families in Hyderabad,
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
                <p className="text-blue-800">Complete property management and tenant relations in Hyderabad</p>
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
                <h3 className="text-2xl font-bold text-green-900 mb-2">For Tenant Families</h3>
                <p className="text-green-800">Rental solutions for families seeking quality homes in Hyderabad</p>
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

      {/* Service Packages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Packages</h2>
            <p className="text-xl text-gray-600">Choose the perfect package for your property management needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicePackages.map((pkg, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg border-2 ${pkg.color} p-8`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">{pkg.price}</div>
                  <div className="text-gray-600">{pkg.period}</div>
                  <p className="text-gray-600 mt-2">{pkg.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full ${pkg.buttonColor} text-white py-3 px-6 rounded-lg font-semibold transition-colors`}>
                  Choose {pkg.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Service Works</h2>
            <p className="text-xl text-gray-600">A simple, transparent process for owners and tenants in Hyderabad</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl`}>
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Service Categories</h2>
            <p className="text-xl text-gray-600">Everything you need for a seamless rental experience in Hyderabad</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Marketing & Promotion */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Marketing & Promotion</h3>
              <div className="space-y-4">
                {[
                  { title: "Renting Price Guidance", desc: "Expert market analysis and pricing strategy" },
                  { title: "Online Marketing on Own Website", desc: "Premium listing on our verified platform" },
                  { title: "Multi-Platform Online Marketing", desc: "Comprehensive digital marketing reach" },
                  { title: "Offline Marketing Around House", desc: "Local area promotion and community outreach" }
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

            {/* Maintenance & Support */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Maintenance & Support</h3>
              <div className="space-y-4">
                {[
                  { title: "Property Maintenance & Repairs", desc: "24/7 maintenance support for all issues" },
                  { title: "Emergency Response", desc: "Quick resolution of urgent problems" },
                  { title: "Furniture Maintenance", desc: "Complete furniture care and replacement" },
                  { title: "Quality Assurance", desc: "Regular inspections and quality checks" }
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

            {/* Technology & Innovation */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Technology & Innovation</h3>
              <div className="space-y-4">
                {[
                  { title: "App-based Assistance", desc: "Complete rental management through mobile app" },
                  { title: "Virtual Reality Tours", desc: "Immersive property viewing experience" },
                  { title: "AI-Powered Matching", desc: "Smart tenant-property matching algorithm" },
                  { title: "Real-time Tracking", desc: "Live updates on all service requests" }
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

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600">Proven track record of excellence in Hyderabad's rental market</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">{reason.stats}</div>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas in Hyderabad */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Areas in Hyderabad</h2>
            <p className="text-xl text-gray-600">We provide comprehensive rental services across all major areas of Hyderabad</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { area: 'Gachibowli', properties: '150+ Properties', highlight: 'IT Hub' },
              { area: 'Banjara Hills', properties: '120+ Properties', highlight: 'Premium Area' },
              { area: 'HITEC City', properties: '200+ Properties', highlight: 'Tech Corridor' },
              { area: 'Jubilee Hills', properties: '80+ Properties', highlight: 'Luxury Locality' },
              { area: 'Kondapur', properties: '100+ Properties', highlight: 'Family Friendly' },
              { area: 'Madhapur', properties: '180+ Properties', highlight: 'IT Professionals' },
              { area: 'Kukatpally', properties: '90+ Properties', highlight: 'Metro Connected' },
              { area: 'Secunderabad', properties: '110+ Properties', highlight: 'Central Location' }
            ].map((area, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{area.area}</h3>
                <div className="text-sm text-blue-600 font-medium mb-1">{area.properties}</div>
                <div className="text-xs text-gray-500">{area.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from property owners and families in Hyderabad</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Property Owner',
                area: 'Gachibowli',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
                text: 'Their comprehensive service helped me rent my property within 10 days. The dedicated relationship manager handled everything professionally.',
                rating: 5
              },
              {
                name: 'Priya & Amit Sharma',
                role: 'Tenant Family',
                area: 'Banjara Hills',
                image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150',
                text: 'The virtual tour and physical visit helped us choose the perfect home. The furniture setup was seamless and exactly as promised.',
                rating: 5
              },
              {
                name: 'Vikram Reddy',
                role: 'Property Owner',
                area: 'HITEC City',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
                text: 'Excellent rent collection service and maintenance support. My tenants are happy and I receive payments on time every month.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role} • {testimonial.area}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Rental Experience in Hyderabad?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of property owners and families who trust us for their rental needs across Hyderabad.
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