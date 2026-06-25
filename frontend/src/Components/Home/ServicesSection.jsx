import { useState } from "react";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 1,
      icon: "🚚",
      title: "Express Delivery",
      description:
        "Fast and reliable express shipping services for time-sensitive packages with real-time tracking.",
      features: [
        "Next-day delivery",
        "Real-time tracking",
        "Dedicated support",
        "Secure handling",
      ],
      price: "Custom Quote",
      deliveryTime: "1-2 days",
      coverage: "150+ countries",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      stats: [
        { value: "99.8%", label: "On-time Delivery" },
        { value: "24/7", label: "Tracking" },
        { value: "2H", label: "Response Time" },
      ],
    },
    {
      id: 2,
      icon: "📦",
      title: "Standard Shipping",
      description:
        "Cost-effective standard shipping solutions for businesses of all sizes with complete visibility.",
      features: [
        "Economical pricing",
        "Package insurance",
        "Flexible pickup",
        "Bulk discounts",
      ],
      price: "Custom Quote",
      deliveryTime: "3-5 days",
      coverage: "200+ countries",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      stats: [
        { value: "98.5%", label: "Success Rate" },
        { value: "50K+", label: "Packages/Month" },
        { value: "4.9★", label: "Rating" },
      ],
    },
    {
      id: 3,
      icon: "🚢",
      title: "Freight Services",
      description:
        "Heavy freight and logistics solutions for industrial and commercial shipments worldwide.",
      features: [
        "Heavy cargo",
        "Customs clearance",
        "Warehousing",
        "Supply chain",
      ],
      price: "Custom Quote",
      deliveryTime: "5-10 days",
      coverage: "Global ports",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      stats: [
        { value: "500T+", label: "Monthly Capacity" },
        { value: "50+", label: "Global Ports" },
        { value: "100%", label: "Customs Support" },
      ],
    },
    {
      id: 4,
      icon: "🏭",
      title: "Supply Chain",
      description:
        "End-to-end supply chain management with advanced analytics and optimization tools.",
      features: [
        "Inventory management",
        "Demand forecasting",
        "Route optimization",
        "Analytics dashboard",
      ],
      price: "Custom Solution",
      deliveryTime: "Ongoing",
      coverage: "Global network",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      stats: [
        { value: "30%", label: "Cost Reduction" },
        { value: "45%", label: "Efficiency Gain" },
        { value: "100+", label: "Partners" },
      ],
    },
    {
      id: 5,
      icon: "❄️",
      title: "Cold Chain",
      description:
        "Temperature-controlled logistics for pharmaceuticals, food, and sensitive materials.",
      features: [
        "Temperature monitoring",
        "Compliance certified",
        "Special handling",
        "Quality assurance",
      ],
      price: "Custom Quote",
      deliveryTime: "2-4 days",
      coverage: "100+ countries",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
      stats: [
        { value: "±2°C", label: "Temp Control" },
        { value: "100%", label: "Compliance" },
        { value: "0", label: "Incidents" },
      ],
    },
    {
      id: 6,
      icon: "📊",
      title: "Logistics Tech",
      description:
        "Cutting-edge technology solutions for modern logistics and supply chain optimization.",
      features: [
        "API integration",
        "Real-time analytics",
        "Automated workflows",
        "Custom dashboards",
      ],
      price: "Subscription",
      deliveryTime: "Instant setup",
      coverage: "Cloud-based",
      gradient: "from-gray-600 to-gray-800",
      bgGradient: "from-gray-50 to-gray-100",
      stats: [
        { value: "99.9%", label: "Uptime" },
        { value: "50+", label: "Integrations" },
        { value: "24/7", label: "Support" },
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            OUR SERVICES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Logistics
            </span>{" "}
            Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            End-to-end logistics services designed to streamline your supply
            chain, reduce costs, and deliver exceptional reliability across
            global markets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden ${
                activeService === index ? "ring-2 ring-blue-500" : ""
              }`}
              onMouseEnter={() => setActiveService(index)}
            >
              {/* Service Icon */}
              <div
                className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
              ></div>
              <div
                className={`p-2 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="text-2xl">{service.icon}</span>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700"
                    >
                      <div
                        className={`w-5 h-5 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center mr-3`}
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Service Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {service.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div
                        className={`text-lg font-bold bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing and Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">
                      {service.price}
                    </div>
                    <div className="text-sm text-gray-500">Starting price</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {service.deliveryTime}
                    </div>
                    <div className="text-xs text-gray-500">Delivery time</div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}
                >
                  <span>Learn More</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 border-2 border-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Logistics?
            </h3>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust us with their supply
              chain. Get a customized quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Free Consultation
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                Contact Sales
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-8 pt-8 border-t border-blue-500">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                <span className="text-blue-100">ISO 9001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <AwardIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-blue-100">Award Winning Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <GlobeIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-blue-100">Global Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Additional Icon Components
function ShieldCheckIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

function AwardIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
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
