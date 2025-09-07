// ...existing code...
import { Shield, Package, Users, Award, CheckCircle, Heart } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'Every property undergoes strict verification including legal document checks, owner validation, and quality assessment.'
    },
    {
      icon: Package,
      title: 'Complete Furniture Solutions',
      description: 'All rentals include premium furniture packages with delivery, setup, and maintenance included in your monthly rent.'
    },
    {
      icon: Users,
      title: 'Family-First Approach',
      description: 'Designed specifically for families with child-friendly amenities, safety features, and community-focused properties.'
    },
    {
      icon: Award,
      title: 'Trusted Platform',
      description: 'Rated 4.8/5 by thousands of families with transparent processes and reliable customer support.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Former real estate executive with 15+ years experience in property management.'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Expert in logistics and customer experience with background in hospitality.'
    },
    {
      name: 'Amit Patel',
      role: 'Technology Lead',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Full-stack developer passionate about creating seamless user experiences.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionizing Family Rentals in India
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're building India's most trusted platform for family property rentals, 
            combining verified homes with complete furniture solutions for a seamless rental experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To make property rentals simple, transparent, and trustworthy for families across India. 
                We believe every family deserves a verified, fully-furnished home without the hassle of 
                dealing with multiple vendors or uncertain property conditions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">100% verified properties and owners</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Complete furniture packages included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Transparent pricing with no hidden costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">24/7 customer support and maintenance</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy family in their new home"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600">Built specifically for families, by families</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Families Nationwide</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Families</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">2,500+</div>
              <div className="text-gray-600">Verified Properties</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Passionate professionals dedicated to your family's needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* Services Section removed */}
       <section className="py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             {/* Service Portfolio heading removed */}
             <p className="text-xl text-gray-600">Comprehensive rental management from listing to move-out</p>
           </div>

           <div className="grid md:grid-cols-2 gap-12">
             {/* For Property Owners */}
             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
               <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">For Property Owners</h3>
               <div className="space-y-4">
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                     {/* Removed undefined TrendingUp icon */}
                   </div>
                   <div>
                     <h4 className="font-semibold text-blue-900">Renting Price Guidance</h4>
                     <p className="text-sm text-blue-800">Market analysis and optimal pricing recommendations</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                     {/* Removed undefined Star icon */}
                   </div>
                   <div>
                     <h4 className="font-semibold text-blue-900">Complete Marketing Package</h4>
                     <p className="text-sm text-blue-800">Online & offline marketing across multiple platforms</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                     <Package className="w-3 h-3 text-white" />
                   </div>
                   <div>
                     <h4 className="font-semibold text-blue-900">Rent Collection & Remittance</h4>
                     <p className="text-sm text-blue-800">Automated rent collection with timely owner payments</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                     <Shield className="w-3 h-3 text-white" />
                   </div>
                   <div>
                     <h4 className="font-semibold text-blue-900">Deposit Management</h4>
                     <p className="text-sm text-blue-800">Secure deposit handling and refund processing</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                     <Users className="w-3 h-3 text-white" />
                   </div>
                   <div>
                     <h4 className="font-semibold text-blue-900">Dedicated Relationship Manager</h4>
                     <p className="text-sm text-blue-800">Personal support throughout the rental journey</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* For Tenants */}
             <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
               <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">For Tenant Families</h3>
               <div className="space-y-4">
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                     {/* Removed undefined Home icon */}
                   </div>
                   <div>
                     <h4 className="font-semibold text-green-900">Virtual & Physical Tours</h4>
                     <p className="text-sm text-green-800">Convenient viewing options to find your perfect home</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                     <CheckCircle className="w-3 h-3 text-white" />
                   </div>
                   <div>
                     <h4 className="font-semibold text-green-900">Complete Verification</h4>
                     <p className="text-sm text-green-800">Thorough background checks for trusted tenancy</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                     <Package className="w-3 h-3 text-white" />
                   </div>
                   <div>
                     <h4 className="font-semibold text-green-900">Furniture & Setup Included</h4>
                     <p className="text-sm text-green-800">Complete furniture package with delivery and setup</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                     {/* Removed undefined Star icon */}
                   </div>
                   <div>
                     <h4 className="font-semibold text-green-900">Maintenance & Repairs</h4>
                     <p className="text-sm text-green-800">24/7 support for all property and furniture issues</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                     <Users className="w-3 h-3 text-white" />
                   </div>
                   <div>
                     <h4 className="font-semibold text-green-900">App-based Assistance</h4>
                     <p className="text-sm text-green-800">Manage everything from anywhere with our mobile app</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Service Guarantee removed */}
           <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
             {/* Service Guarantee heading removed */}
             <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">
               {/* Service description removed */}
               our dedicated team ensures a smooth, transparent, and hassle-free rental experience for everyone.
             </p>
             <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-white bg-opacity-20 rounded-lg p-4">
                 <Shield className="w-8 h-8 mx-auto mb-2" />
                 <div className="font-semibold">100% Verified</div>
                 <div className="text-sm text-blue-100">Properties & Tenants</div>
               </div>
               <div className="bg-white bg-opacity-20 rounded-lg p-4">
                 {/* Removed undefined Star icon */}
                 <div className="font-semibold">24/7 Support</div>
                 <div className="text-sm text-blue-100">Always Available</div>
               </div>
               <div className="bg-white bg-opacity-20 rounded-lg p-4">
                 <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                 <div className="font-semibold">Guaranteed</div>
                 {/* Service Quality removed */}
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Family First</h3>
              <p className="text-gray-600">Every decision we make prioritizes the safety, comfort, and happiness of families.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">Complete transparency in pricing, processes, and property conditions builds lasting trust.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              {/* Service excellence description removed */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}