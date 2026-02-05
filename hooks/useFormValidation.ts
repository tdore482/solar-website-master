"use client";

import { useState } from "react";

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure (90% success rate for demo)
      if (Math.random() > 0.1) {
        return { 
          success: true, 
          message: "Thank you for your inquiry! We'll get back to you soon." 
        };
      } else {
        throw new Error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "An error occurred" 
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    isSubmitting,
    validateForm,
    submitForm,
    clearErrors,
  };
}