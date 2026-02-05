"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight, Zap, Users, Award } from "lucide-react";
import { contactInfo, companyInfo } from "@/lib/config";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gray-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6600' fill-opacity='0.2'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 tracking-tight">
                <br /><br /><br />
                <span className="block text-[#FF6600]">Solar Consultation</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Ready to save on energy bills and reduce your carbon footprint? Our solar experts are here to help you make the switch.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
                {[
                  { icon: Zap, label: "Energy Savings", value: "70%" },
                  { icon: Users, label: "Happy Customers", value: "5000+" },
                  { icon: Award, label: "Years Experience", value: "15+" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-16 h-16 bg-[#FF6600]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#FF6600]/20">
                      <stat.icon className="w-8 h-8 text-[#FF6600]" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-4 text-gray-900">
                    Start Your Solar Journey
                  </h2>
                  <p className="text-xl text-gray-600">
                    Fill out the form below and our solar experts will get back to you within 24 hours.
                  </p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all"
                          placeholder="+265 123-456 789"
                        />
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                          Service Interest *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all bg-white"
                        >
                          <option value="">Select a service</option>
                          <option value="residential">Residential Solar</option>
                          <option value="commercial">Commercial Solar</option>
                          <option value="industrial">Industrial Solar</option>
                          <option value="maintenance">Solar Maintenance</option>
                          <option value="consultation">Free Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Tell us about your project *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent transition-all resize-none"
                        placeholder="Describe your energy needs, property type, or any questions you have about solar installation..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-[#FF6600] hover:bg-[#FF8533] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Free Consultation
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 bg-green-50 rounded-2xl border border-green-200"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900 mb-3">
                      Thank You!
                    </h3>
                    <p className="text-green-700 mb-2">
                      Your consultation request has been received.
                    </p>
                    <p className="text-green-600">
                      We'll contact you within 24 hours to discuss your solar needs.
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Contact Info & CTA */}
              <motion.div
                className="space-y-12"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Quick Contact Cards */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch Directly</h3>

                  {[
                    {
                      icon: Phone,
                      title: "Call Us",
                      content: contactInfo.phone,
                      link: contactInfo.phoneLink,
                      color: "blue"
                    },
                    {
                      icon: Mail,
                      title: "Email Us",
                      content: contactInfo.email,
                      link: contactInfo.emailLink,
                      color: "green"
                    },
                    {
                      icon: MapPin,
                      title: "Visit Us",
                      content: contactInfo.address,
                      link: contactInfo.addressLink,
                      color: "purple"
                    }
                  ].map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.link}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all hover:shadow-md group"
                      whileHover={{ x: 5 }}
                      target={contact.icon === MapPin ? "_blank" : undefined}
                      rel={contact.icon === MapPin ? "noopener noreferrer" : undefined}
                    >
                      <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <contact.icon className={`w-6 h-6 text-[#FF6600]`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{contact.title}</h4>
                        <p className="text-gray-600 text-sm">{contact.content}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </motion.a>
                  ))}
                </div>

                {/* CTA Box */}
                <div className="bg-gradient-to-br from-[#FF6600] to-[#FF8533] rounded-2xl p-8 text-white shadow-xl shadow-orange-200">
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to Save on Energy Bills?
                  </h3>
                  <p className="text-white/90 mb-6">
                    Join thousands of homeowners who have already made the switch to solar. Start saving money and reducing your carbon footprint today.
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href={contactInfo.phoneLink}
                      className="bg-white text-[#FF6600] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      Call Now
                    </a>
                    <span className="text-white/80">or</span>
                    <span className="font-semibold">Fill out the form</span>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#FF6600]" />
                    Business Hours
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Monday - Friday</span>
                      <span className="font-medium text-gray-900">08:00 am - 05:00 pm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Saturday</span>
                      <span className="font-medium text-gray-900">09:00 am - 12:00 pm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sunday</span>
                      <span className="font-medium text-gray-400 italic">Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
