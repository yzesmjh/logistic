import { useState } from "react";
import PropTypes from "prop-types";

export default function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const testimonials = [
    {
      id: 1,
      name: "Ngozi Adeyemi",
      position: "Head of Operations",
      company: "Konga Technologies",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "Late deliveries were tanking our customer ratings. Six months with FedyTransist later, our on-time rate is sitting at 99.7% and customers are actually leaving five-star reviews. Genuinely wild.",
      service: "Express Delivery",
      industry: "E-commerce",
      location: "Lagos, Nigeria",
      stats: { delivery: "99.7%", speed: "1.1 days", growth: "+40%" },
    },
    {
      id: 2,
      name: "Dr. Emeka Okafor",
      position: "Chief Operating Officer",
      company: "VitaPath Pharma",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "Our vaccines travel from the UK to 14 African markets and we haven't had a single temperature breach since we switched. My QA team finally sleeps through the night.",
      service: "Cold Chain",
      industry: "Healthcare",
      location: "Abuja, Nigeria",
      stats: { delivery: "100%", temp: "±0.5°C", compliance: "100%" },
    },
    {
      id: 3,
      name: "Priya Sharma",
      position: "VP Logistics",
      company: "Tata Consumer",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "We cut our cost-per-shipment by 28% in the first year. Their demand forecasting is genuinely clever — stock-out events dropped 60%. I honestly wish we'd switched sooner.",
      service: "Supply Chain",
      industry: "FMCG",
      location: "Mumbai, India",
      stats: { delivery: "99.8%", savings: "28%", efficiency: "+60%" },
    },
    {
      id: 4,
      name: "Carlos Mendes",
      position: "Import Director",
      company: "Construfix Brasil",
      image: "/api/placeholder/80/80",
      rating: 4,
      text: "Customs used to take two weeks. Now it takes 48 hours. That change alone saved us more in demurrage charges than our entire annual contract cost. The maths speaks for itself.",
      service: "Freight Services",
      industry: "Construction",
      location: "São Paulo, Brazil",
      stats: { volume: "900T+", clearance: "48 hrs", cost: "32% saved" },
    },
    {
      id: 5,
      name: "Fatima Al-Rashid",
      position: "Founder & CEO",
      company: "Saffron Luxe",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "Our clients expect white-glove everything. FedyTransist delivers — literally. Tamper-evident packaging, photo proof, same-day options. They make us look exceptional without any extra effort from us.",
      service: "Express Delivery",
      industry: "Luxury Retail",
      location: "Dubai, UAE",
      stats: { delivery: "100%", speed: "0.9 days", CSAT: "98%" },
    },
    {
      id: 6,
      name: "Tom Bergmann",
      position: "Platform Lead",
      company: "ShipStack GmbH",
      image: "/api/placeholder/80/80",
      rating: 5,
      text: "We re-built our entire shipping integration in under two weeks using their API. Docs are excellent, webhooks are rock solid, and — this is rare — their developer support team actually knows what they're talking about.",
      service: "Logistics Tech",
      industry: "SaaS",
      location: "Berlin, Germany",
      stats: { uptime: "99.99%", setup: "11 days", integrations: "80+" },
    },
  ];

  const filters = [
    { key: "all", label: "All Stories", count: testimonials.length },
    {
      key: "Express Delivery",
      label: "Express",
      count: testimonials.filter((t) => t.service === "Express Delivery").length,
    },
    {
      key: "Cold Chain",
      label: "Cold Chain",
      count: testimonials.filter((t) => t.service === "Cold Chain").length,
    },
    {
      key: "Freight Services",
      label: "Freight",
      count: testimonials.filter((t) => t.service === "Freight Services").length,
    },
    {
      key: "Supply Chain",
      label: "Supply Chain",
      count: testimonials.filter((t) => t.service === "Supply Chain").length,
    },
    {
      key: "Logistics Tech",
      label: "Tech & API",
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
    "E-commerce": "🛒",
    Healthcare: "🏥",
    FMCG: "🛍️",
    Construction: "🏗️",
    "Luxury Retail": "💎",
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
            PEOPLE LOVE US (WE PROMISE WE&apos;RE NOT MAKING THIS UP)
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real Stories from{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Real Customers
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From solo sellers to major corporations — hear what businesses just like
            yours are saying about life with FedyTransist.
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
                      <div className="text-white font-bold text-sm">{value}</div>
                      <div className="text-gray-400 text-xs capitalize">{key}</div>
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
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">15K+</div>
              <div className="text-gray-400">Happy Businesses</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">180+</div>
              <div className="text-gray-400">Countries Reached</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">On-Time Rate</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">We&apos;re Here for You</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Become Our Next Success Story?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Businesses of every size ship with FedyTransist because it&apos;s just
            easier — and it actually works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Shipping Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              Read More Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Icon Components ──────────────────────────────────────────────────────────

function StarIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
StarIcon.propTypes = { className: PropTypes.string };

function QuoteIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}
QuoteIcon.propTypes = { className: PropTypes.string };

function LocationIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
LocationIcon.propTypes = { className: PropTypes.string };
