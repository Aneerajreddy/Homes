import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CreditCard, Shield, Package, CheckCircle, MapPin, Bed, Bath, Square } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../context/AuthContext';

export default function BookingPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { properties, createBooking } = usePlatform();
  
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    moveInDate: '',
    leaseDuration: 12,
    tenantDetails: {
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email || '',
      phone: user?.phone || '',
      familySize: user?.familySize || 2,
      occupation: '',
      monthlyIncome: ''
    },
    documents: {
      idProof: null as File | null,
      incomeProof: null as File | null,
      references: null as File | null
    },
    agreementAccepted: false
  });

  const property = properties.find(p => p.id === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const totalMonthlyCost = property.price + 15000 + 2000; // rent + furniture + maintenance
  const securityDeposit = totalMonthlyCost * 2;
  const advancePayment = totalMonthlyCost + securityDeposit;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBookingSubmit = async () => {
    try {
      await createBooking({
        propertyId: property.id,
        tenantId: user!.id,
        ownerId: property.ownerId,
        startDate: bookingData.moveInDate,
        duration: bookingData.leaseDuration,
        totalAmount: totalMonthlyCost * bookingData.leaseDuration,
        status: 'confirmed'
      });
      
      alert('Booking confirmed! Furniture delivery will be automatically arranged.');
      navigate('/dashboard');
    } catch (error) {
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Complete Your Booking</h1>
                <p className="text-sm text-gray-500">{property.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-16 h-1 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Step 1: Move-in Details */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Move-in Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Move-in Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.moveInDate}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          moveInDate: e.target.value
                        })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lease Duration
                      </label>
                      <select
                        value={bookingData.leaseDuration}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          leaseDuration: parseInt(e.target.value)
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={6}>6 Months</option>
                        <option value={12}>1 Year</option>
                        <option value={24}>2 Years</option>
                        <option value={36}>3 Years</option>
                      </select>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">🏠 What's Included</h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Complete furniture package delivery & setup</li>
                        <li>• All kitchen appliances and electronics</li>
                        <li>• 24/7 maintenance and replacement support</li>
                        <li>• Legal rental agreement preparation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={bookingData.tenantDetails.name}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          tenantDetails: { ...bookingData.tenantDetails, name: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={bookingData.tenantDetails.email}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          tenantDetails: { ...bookingData.tenantDetails, email: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={bookingData.tenantDetails.phone}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          tenantDetails: { ...bookingData.tenantDetails, phone: e.target.value }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Family Size</label>
                      <select
                        value={bookingData.tenantDetails.familySize}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          tenantDetails: { ...bookingData.tenantDetails, familySize: parseInt(e.target.value) }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={1}>1 Person</option>
                        <option value={2}>2 People</option>
                        <option value={3}>3 People</option>
                        <option value={4}>4 People</option>
                        <option value={5}>5+ People</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                      <input
                        type="text"
                        value={bookingData.tenantDetails.occupation}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          tenantDetails: { ...bookingData.tenantDetails, occupation: e.target.value }
                        })}
                        placeholder="Software Engineer"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
                      <input
                        type="number"
                        value={bookingData.tenantDetails.monthlyIncome}
                        onChange={(e) => setBookingData({
                          ...bookingData,
                          tenantDetails: { ...bookingData.tenantDetails, monthlyIncome: e.target.value }
                        })}
                        placeholder="75000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Documents</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID Proof (Aadhar/Passport/Driving License)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setBookingData({
                            ...bookingData,
                            documents: { ...bookingData.documents, idProof: e.target.files?.[0] || null }
                          })}
                          className="hidden"
                          id="id-proof"
                        />
                        <label htmlFor="id-proof" className="cursor-pointer">
                          <div className="text-gray-600">
                            {bookingData.documents.idProof ? (
                              <div className="flex items-center justify-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>{bookingData.documents.idProof.name}</span>
                              </div>
                            ) : (
                              <>
                                <div className="text-lg mb-2">Click to upload ID proof</div>
                                <div className="text-sm text-gray-500">PDF, JPG, PNG (max 5MB)</div>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Income Proof (Salary Slip/Bank Statement)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setBookingData({
                            ...bookingData,
                            documents: { ...bookingData.documents, incomeProof: e.target.files?.[0] || null }
                          })}
                          className="hidden"
                          id="income-proof"
                        />
                        <label htmlFor="income-proof" className="cursor-pointer">
                          <div className="text-gray-600">
                            {bookingData.documents.incomeProof ? (
                              <div className="flex items-center justify-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>{bookingData.documents.incomeProof.name}</span>
                              </div>
                            ) : (
                              <>
                                <div className="text-lg mb-2">Click to upload income proof</div>
                                <div className="text-sm text-gray-500">PDF, JPG, PNG (max 5MB)</div>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment & Agreement</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-4">Rental Agreement Terms</h3>
                      <div className="text-sm text-gray-700 space-y-2 max-h-40 overflow-y-auto">
                        <p>1. The tenant agrees to pay monthly rent of ₹{totalMonthlyCost.toLocaleString()} including furniture rental.</p>
                        <p>2. Security deposit of ₹{securityDeposit.toLocaleString()} is refundable at the end of lease term.</p>
                        <p>3. Furniture delivery and setup will be completed before move-in date.</p>
                        <p>4. Tenant is responsible for maintaining furniture in good condition.</p>
                        <p>5. Any damages to furniture will be charged separately.</p>
                        <p>6. Lease duration is {bookingData.leaseDuration} months starting from {bookingData.moveInDate}.</p>
                        <p>7. Monthly rent is due on the 1st of every month.</p>
                        <p>8. Property owner and tenant both agree to platform terms and conditions.</p>
                      </div>
                      
                      <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bookingData.agreementAccepted}
                          onChange={(e) => setBookingData({
                            ...bookingData,
                            agreementAccepted: e.target.checked
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          I agree to the rental agreement terms and conditions
                        </span>
                      </label>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">🔒 Secure Payment</h3>
                      <p className="text-sm text-green-800">
                        Your payment is processed securely. Furniture delivery will be automatically 
                        scheduled upon payment confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !bookingData.moveInDate) ||
                      (step === 2 && (!bookingData.tenantDetails.occupation || !bookingData.tenantDetails.monthlyIncome)) ||
                      (step === 3 && (!bookingData.documents.idProof || !bookingData.documents.incomeProof))
                    }
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors ml-auto"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleBookingSubmit}
                    disabled={!bookingData.agreementAccepted}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors ml-auto flex items-center space-x-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Pay ₹{advancePayment.toLocaleString()} & Confirm</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-4">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{property.title}</h4>
                  <p className="text-gray-600 flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-xs text-gray-500">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-xs text-gray-500">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{property.area}</div>
                    <div className="text-xs text-gray-500">sq ft</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-medium">₹{property.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Furniture Rental</span>
                  <span className="font-medium">₹15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maintenance</span>
                  <span className="font-medium">₹2,000</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold">Monthly Total</span>
                  <span className="font-bold text-blue-600">₹{totalMonthlyCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-orange-600">
                  <span className="font-medium">Security Deposit (2 months)</span>
                  <span className="font-bold">₹{securityDeposit.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Advance Payment</span>
                  <span className="font-bold text-green-600">₹{advancePayment.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Book With Us?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Verified Property & Owner</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Package className="w-5 h-5 text-blue-500" />
                  <span>Complete Furniture Setup</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span>Legal Agreement Protection</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}