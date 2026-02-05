"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Home, MapPin, Zap, Battery } from "lucide-react";
import Button from "@/components/ui/Button";

interface FormData {
  // Step 1: Basic Information
  name: string;
  email: string;
  phone: string;

  // Step 2: Property Details
  address: string;
  propertyType: string;
  roofType: string;
  monthlyBill: string;

  // Step 3: System Preferences
  systemType: string;
  batteryStorage: string;
  budget: string;

  // Step 4: Additional Notes
  notes: string;
}

const steps = [
  { number: 1, title: "Basic Information" },
  { number: 2, title: "Property Details" },
  { number: 3, title: "System Preferences" },
  { number: 4, title: "Review & Submit" },
];

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "",
    roofType: "",
    monthlyBill: "",
    systemType: "",
    batteryStorage: "",
    budget: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote form submitted:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="pt-32 pb-24 min-h-screen bg-tesla-white text-tesla-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-[#FF6600] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tighter mb-6">
              Thank You!
            </h1>
            <p className="text-xl text-tesla-gray-600 mb-8 font-light">
              We've received your quote request. Our team will review your
              information and get back to you within 24 hours with a customized
              solar solution and pricing.
            </p>
            <Button href="/" variant="primary" size="lg">
              Return to Home
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-tesla-white text-tesla-black overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter mb-6">
              Get Your Free Quote
            </h1>
            <p className="text-xl sm:text-2xl text-tesla-gray-600 max-w-3xl mx-auto font-light">
              Fill out the form below and our experts will provide you with a
              customized solar solution and pricing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= step.number
                        ? "bg-[#FF6600] text-white"
                        : "bg-gray-100 text-gray-400"
                        }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium hidden sm:block ${currentStep >= step.number
                        ? "text-[#FF6600]"
                        : "text-gray-400"
                        }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${currentStep > step.number
                        ? "bg-[#FF6600]"
                        : "bg-gray-100"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-bold mb-6 text-tesla-black">
                      Basic Information
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                        placeholder="+265 123 456 789"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Property Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-bold mb-6 text-tesla-black">
                      Property Details
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Property Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                        placeholder="123 Main Street, City, State ZIP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Property Type *
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                      >
                        <option value="">Select property type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Roof Type *
                      </label>
                      <select
                        name="roofType"
                        value={formData.roofType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                      >
                        <option value="">Select roof type</option>
                        <option value="shingle">Shingle</option>
                        <option value="tile">Tile</option>
                        <option value="metal">Metal</option>
                        <option value="flat">Flat</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Average Monthly Electricity Bill *
                      </label>
                      <input
                        type="text"
                        name="monthlyBill"
                        value={formData.monthlyBill}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                        placeholder="MWK 150,000"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: System Preferences */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-bold mb-6 text-tesla-black">
                      System Preferences
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        System Type *
                      </label>
                      <select
                        name="systemType"
                        value={formData.systemType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                      >
                        <option value="">Select system type</option>
                        <option value="on-grid">On-Grid</option>
                        <option value="off-grid">Off-Grid</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Battery Storage *
                      </label>
                      <select
                        name="batteryStorage"
                        value={formData.batteryStorage}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                      >
                        <option value="">Select option</option>
                        <option value="yes">Yes, I want battery storage</option>
                        <option value="no">No, grid-tied only</option>
                        <option value="maybe">Maybe, need more info</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Budget Range *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-15m">Under MWK 15 Million</option>
                        <option value="15m-40m">MWK 15 Million - 40 Million</option>
                        <option value="40m-80m">MWK 40 Million - 80 Million</option>
                        <option value="80m-plus">MWK 80 Million+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-tesla-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white text-tesla-black resize-none"
                        placeholder="Any additional information or questions..."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-bold mb-6 text-tesla-black">
                      Review Your Information
                    </h2>
                    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl space-y-4">
                      <div>
                        <h3 className="font-semibold text-tesla-black mb-2">
                          Contact Information
                        </h3>
                        <p className="text-tesla-gray-600">
                          {formData.name}
                        </p>
                        <p className="text-tesla-gray-600">
                          {formData.email}
                        </p>
                        <p className="text-tesla-gray-600">
                          {formData.phone}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-tesla-black mb-2">
                          Property Details
                        </h3>
                        <p className="text-tesla-gray-600">
                          {formData.address}
                        </p>
                        <p className="text-tesla-gray-600">
                          {formData.propertyType} - {formData.roofType} roof
                        </p>
                        <p className="text-tesla-gray-600">
                          Monthly bill: {formData.monthlyBill}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-tesla-black mb-2">
                          System Preferences
                        </h3>
                        <p className="text-tesla-gray-600">
                          System: {formData.systemType}
                        </p>
                        <p className="text-tesla-gray-600">
                          Battery: {formData.batteryStorage}
                        </p>
                        <p className="text-tesla-gray-600">
                          Budget: {formData.budget}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handlePrevious}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Previous
                  </Button>
                )}
                <div className="ml-auto">
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      onClick={handleNext}
                    >
                      Next
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary" size="lg">
                      Submit Quote Request
                      <Check className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

