import { useState } from "react";

export default function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Logistics Manager",
      company: "TechGlobal Inc.",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "FedyTransist transformed our supply chain. Their real-time tracking and reliable delivery have reduced our shipping costs by 30% and improved customer satisfaction significantly.",
      service: "Supply Chain",
      industry: "Technology",
      location: "San Francisco, USA",
      stats: { delivery: "99.9%", time: "2.3 days", savings: "30%" },
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      position: "Operations Director",
      company: "AutoParts Pro",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "The cold chain logistics for our automotive parts have been flawless. Temperature monitoring and on-time delivery across continents is impressive.",
      service: "Cold Chain",
      industry: "Automotive",
      location: "Berlin, Germany",
      stats: { delivery: "100%", time: "3.1 days", compliance: "100%" },
    },
    {
      id: 3,
      name: "Aisha Khan",
      position: "CEO",
      company: "MediCare Supplies",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "As a pharmaceutical company, compliance and reliability are everything. FedyTransist's cold chain solution has been instrumental in our global expansion.",
      service: "Cold Chain",
      industry: "Healthcare",
      location: "Dubai, UAE",
      stats: { delivery: "99.8%", temp: "±1°C", compliance: "100%" },
    },
    {
      id: 4,
      name: "James Wilson",
      position: "Supply Chain VP",
      company: "Retail Giant Corp",
      image: "/api/placeholder/80/80",
      rating: 4,
      text: "Their freight services handle our peak season volumes effortlessly. The customs clearance support saved us countless hours and headaches.",
      service: "Freight Services",
      industry: "Retail",
      location: "London, UK",
      stats: { volume: "500T+", clearance: "24h", cost: "25% saved" },
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "E-commerce Director",
      company: "StyleHub Fashion",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "Express delivery that actually delivers on its promises. Our customers love the real-time tracking and consistent next-day delivery.",
      service: "Express Delivery",
      industry: "E-commerce",
      location: "New York, USA",
      stats: { delivery: "99.7%", speed: "1.2 days", growth: "40%" },
    },
    {
      id: 6,
      name: "David Park",
      position: "CTO",
      company: "LogiTech Solutions",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "The API integration and analytics dashboard have revolutionized how we manage our logistics. The tech stack is impressive and reliable.",
      service: "Logistics Tech",
      industry: "SaaS",
      location: "Seoul, South Korea",
      stats: { uptime: "99.9%", efficiency: "45%", integration: "50+" },
    },
  ];

  const filters = [
    { key: "all", label: "All Testimonials", count: testimonials.length },
    {
      key: "Express Delivery",
      label: "Express",
      count: testimonials.filter((t) => t.service === "Express Delivery")
        .length,
    },
    {
      key: "Cold Chain",
      label: "Cold Chain",
      count: testimonials.filter((t) => t.service === "Cold Chain").length,
    },
    {
      key: "Freight Services",
      label: "Freight",
      count: testimonials.filter((t) => t.service === "Freight Services")
        .length,
    },
    {
      key: "Supply Chain",
      label: "Supply Chain",
      count: testimonials.filter((t) => t.service === "Supply Chain").length,
    },
    {
      key: "Logistics Tech",
      label: "Technology",
      count: testimonials.filter((t) => t.service === "Logistics Tech").length,
    },
  ];

  const filteredTestimonials =
    activeFilter === "all"
      ? testimonials
      : testimonials.filter((t) => t.service === activeFilter);

  const serviceColors = {
    "Express Delivery": "from-blue-500 to-cyan-500",
    "Standard Shipping": "from-green-500 to-emerald-500",
    "Freight Services": "from-purple-500 to-indigo-500",
    "Supply Chain": "from-orange-500 to-red-500",
    "Cold Chain": "from-cyan-500 to-blue-500",
    "Logistics Tech": "from-gray-600 to-gray-800",
  };

  const industryIcons = {
    Technology: "💻",
    Automotive: "🚗",
    Healthcare: "🏥",
    Retail: "🛍️",
    "E-commerce": "🛒",
    SaaS: "☁️",
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Quotes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 opacity-10 animate-float">
          <QuoteIcon className="w-24 h-24 text-white" />
        </div>
        <div className="absolute bottom-1/3 right-10 opacity-10 animate-float delay-1000">
          <QuoteIcon className="w-32 h-32 text-white" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            CUSTOMER TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Global
            </span>{" "}
            Leaders
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of businesses worldwide choose FedyTransist for
            their logistics needs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-white text-gray-900 shadow-lg transform scale-105"
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {filter.label}
              <span
                className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  activeFilter === filter.key ? "bg-gray-100" : "bg-white/20"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {filteredTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-400">
                  {testimonial.rating}.0
                </span>
              </div>

              {/* Testimonial Text */}
              <div className="relative mb-6">
                <QuoteIcon className="absolute -top-2 -left-2 w-8 h-8 text-white/20" />
                <p className="text-lg text-white leading-relaxed relative z-10">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              {/* Customer Info */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-300">{testimonial.position}</p>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                    {industryIcons[testimonial.industry]} {testimonial.industry}
                  </div>
                </div>
              </div>

              {/* Service Tag and Stats */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${
                      serviceColors[testimonial.service]
                    } text-white text-sm font-semibold`}
                  >
                    {testimonial.service}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center">
                    <LocationIcon className="w-4 h-4 mr-1" />
                    {testimonial.location}
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="flex space-x-3">
                  {Object.entries(testimonial.stats).map(([key, value]) => (
                    <div key={key} className="text-right">
                      <div className="text-white font-bold text-sm">
                        {value}
                      </div>
                      <div className="text-gray-400 text-xs capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                10K+
              </div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                150+
              </div>
              <div className="text-gray-400">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                99.8%
              </div>
              <div className="text-gray-400">On-Time Delivery</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-gray-400">Support Available</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Join Our Happy Customers?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the FedyTransist difference and transform your logistics
            operations today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Shipping Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Icon Components
function StarIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function QuoteIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}

function LocationIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
