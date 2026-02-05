"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import Notification from "@/components/ui/Notification";
import { useFormValidation, FormData } from "@/hooks/useFormValidation";
import { contactInfo } from "@/lib/config";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const { errors, isSubmitting, validateForm, submitForm, clearErrors } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm(formData)) {
      return;
    }

    const result = await submitForm(formData);

    setNotification({
      type: result.success ? "success" : "error",
      message: result.message,
    });

    if (result.success) {
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <section className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center">
      {/* Background Map Effect (Placeholder) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/map-pattern.png')] bg-cover bg-center grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Info */}
          <div className="space-y-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
              >
                Contact <span className="text-[#FF6600]">Us.</span>
              </motion.h1>

              {/* Decorative Green Line */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-1 bg-[#FF6600] absolute left-0 top-32 hidden lg:block"
              />
            </div>

            <div className="space-y-8 text-gray-400">
              <div className="border-l-2 border-gray-800 pl-6 py-2">
                <h3 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">Headquarters</h3>
                <p className="font-mono">{contactInfo.address}</p>
              </div>

              <div className="border-l-2 border-gray-800 pl-6 py-2">
                <h3 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">Contacts</h3>
                <div className="flex flex-col space-y-2 font-mono">
                  <a href={contactInfo.emailLink} className="hover:text-white transition-colors">{contactInfo.email}</a>
                  <a href={contactInfo.phoneLink} className="hover:text-white transition-colors">{contactInfo.phone}</a>
                </div>
              </div>

              <div className="border-l-2 border-gray-800 pl-6 py-2">
                <h3 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">Store Hours</h3>
                <div className="font-mono">
                  <p>Mon - Fri: 8am - 6pm</p>
                  <p>Sat: 9am - 2pm</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[/* Social Icons placeholder */].map((_, i) => (
                <div key={i} className="w-10 h-10 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer" />
              ))}
            </div>
          </div>

          {/* Right Side: Floating Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Corners */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-[#FF6600] z-20" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-[#FF6600] z-20" />

            <div className="bg-[#111] p-8 md:p-12 shadow-2xl relative z-10 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide">Send Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 group-focus-within:text-[#FF6600] transition-colors">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-[#FF6600] transition-colors font-mono"
                    placeholder="John Doe"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 group-focus-within:text-[#FF6600] transition-colors">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-[#FF6600] transition-colors font-mono"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 group-focus-within:text-[#FF6600] transition-colors">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-[#FF6600] transition-colors font-mono resize-none"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF6600] text-white font-bold uppercase tracking-widest py-4 mt-4 hover:bg-[#FF8533] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </section>
  );
}
