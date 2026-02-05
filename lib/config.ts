export const companyInfo = {
  name: "MotoPV",
  fullName: "MotoPV Solar Solutions",
  description: "Professional renewable energy company specializing in Off-Grid and On-Grid solar systems, solar water heating, and backup power solutions",
  tagline: "Transform your home or business with clean, renewable solar energy",
  website: "https://motopv.com",
  logo: "/logo.png",
  ogImage: "/og-image.jpg",
};

export const contactInfo = {
  phone: "+(265) 994 108 077",
  phoneLink: "tel:+265994108077",
  email: "info@motopvmw.com",
  emailLink: "mailto:info@motopvmw.com",
  address: "Area 13, Simsol Oil Filling Station Premises, Lilongwe",
  addressLink: "https://www.google.com/maps/search/?api=1&query=Simsol+Oil+Filling+Station+Area+13+Lilongwe",
};

export const socialLinks = {
  twitter: "https://twitter.com/motopv",
  facebook: "https://facebook.com/motopv",
  linkedin: "https://linkedin.com/company/motopv",
  instagram: "https://instagram.com/motopv",
};

export const navigation = {
  main: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  cta: {
    href: "/get-quote",
    label: "Get Quote",
  },
};

export const seo = {
  title: {
    default: `${companyInfo.name} - Professional Solar Energy Solutions`,
    template: `%s | ${companyInfo.name}`
  },
  description: companyInfo.description,
  keywords: ["solar energy", "renewable energy", "solar panels", "off-grid systems", "on-grid systems", "solar water heating", "backup power", "clean energy", "solar installation", "green energy"],
  twitterHandle: "@motopv",
  googleVerification: "your-google-verification-code",
};

export const formValidation = {
  name: {
    required: "Name is required",
    minLength: "Name must be at least 2 characters",
  },
  email: {
    required: "Email is required",
    pattern: "Please enter a valid email address",
  },
  phone: {
    required: "Phone number is required",
    pattern: "Please enter a valid phone number",
  },
  message: {
    required: "Message is required",
    minLength: "Message must be at least 10 characters",
  },
};

export const colors = {
  primary: "#FF6600",
  primaryHover: "#FF8533",
  secondary: "#0A2342",
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    light: "#FFFFFF",
  },
  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    dark: "#0A2342",
  },
};