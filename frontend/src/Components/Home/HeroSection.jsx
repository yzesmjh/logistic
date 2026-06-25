import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slides = [
    {
      background: "bg-gradient-to-r from-blue-600 to-purple-700",
      title: "Global Logistics Solutions",
      subtitle:
        "Connecting markets across continents with reliable shipping and supply chain management",
      image: "/api/placeholder/800/600",
    },
    {
      background: "bg-gradient-to-r from-green-600 to-blue-700",
      title: "Fast & Secure Delivery",
      subtitle:
        "Your goods delivered safely and on time, anywhere in the world",
      image: "/api/placeholder/800/600",
    },
    {
      background: "bg-gradient-to-r from-orange-500 to-red-600",
      title: "Smart Supply Chain",
      subtitle:
        "Advanced tracking and analytics for complete visibility and control",
      image: "/api/placeholder/800/600",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validationSchema = Yup.object({
    trackingId: Yup.string()
      .min(7, "Tracking ID must be at least 7 characters long")
      .required("Tracking ID is required"),
  });

  const handleSubmit = (values) => {
    navigate(`/track/${values.trackingId}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-3">
      {/* Animated Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } ${slide.background}`}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Moving Logistics Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 animate-float">
          <TruckIcon className="w-40 h-40 text-white/10" />
        </div>
        <div className="absolute bottom-1/3 -right-20 animate-float delay-1000">
          <ShipIcon className="w-48 h-48 text-white/10" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float delay-500">
          <PlaneIcon className="w-32 h-32 text-white/10" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float delay-1500">
          <WarehouseIcon className="w-36 h-36 text-white/10" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-white text-sm font-semibold">
                Worldwide Shipping Available
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block">Delivering</span>
              <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Excellence
              </span>
              <span className="block">Worldwide</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Your trusted partner in global logistics. Fast, reliable, and
              secure shipping solutions tailored to your business needs.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-white/70 text-sm">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.8%</div>
                <div className="text-white/70 text-sm">On-Time Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white/70 text-sm">Customer Support</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Free Quote
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 transform hover:scale-105">
                Track Shipment
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-start space-x-6">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                <span className="text-white/80 text-sm">Secure Handling</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-5 h-5 text-blue-400" />
                <span className="text-white/80 text-sm">
                  Real-time Tracking
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <GlobeIcon className="w-5 h-5 text-purple-400" />
                <span className="text-white/80 text-sm">Global Network</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Form */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Track Your Shipment
                </h3>
                <p className="text-white/70">
                  Enter your tracking number to get real-time updates
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Formik
                    initialValues={{ trackingId: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <label
                          htmlFor="tracking-id"
                          className="block uppercase text-xs text-white font-bold mb-2"
                        >
                          Tracking ID
                        </label>
                        <Field
                          id="tracking-id"
                          name="trackingId"
                          type="text"
                          placeholder="Enter tracking number"
                          className="w-full px-4 py-4 rounded-xl mb-5 bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <ErrorMessage
                          name="trackingId"
                          component="div"
                          className="text-orange-200 text-xs mb-3"
                        />

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 text-white font-bold rounded-lg bg-orange-500 hover:bg-orange-600 transition duration-150 disabled:opacity-60"
                        >
                          {isSubmitting ? "Tracking..." : "Track Now"}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>

              {/* Feature List */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-white/80 text-sm">Live Tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-white/80 text-sm">Instant Updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-white/80 text-sm">
                    Route Optimization
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-white/80 text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-orange-500 w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}

// Icon Components
function TruckIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function ShipIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
    </svg>
  );
}

function PlaneIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M10.18 9.16L5.47 12 10.18 14.84 12 21.16 13.82 14.84 18.53 12 13.82 9.16 12 2.84zM12 4.16L13.18 7.84 16.47 9.84 13.18 11.84 12 15.16 10.82 11.84 7.53 9.84 10.82 7.84 12 4.16z" />
    </svg>
  );
}

function WarehouseIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 21V7L12 3 2 7v14h5v-9h10v9h5zm-11-2H9v2h2v-2zm2-3h-2v2h2v-2zm2 3h-2v2h2v-2z" />
    </svg>
  );
}

function ShieldCheckIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

function GlobeIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}
