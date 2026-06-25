import { useState, useEffect } from "react";

export default function CoverageMap() {
  const [activeRegion, setActiveRegion] = useState("global");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const regions = {
    global: {
      name: "Our Worldwide Footprint",
      countries: 180,
      hubs: 52,
      deliveryTime: "1–7 days",
      coverage: "99%",
      description:
        "Whether you're shipping a sample or a full container, our network makes the world feel smaller — and your delivery worries disappear.",
      stats: [
        { value: "180+", label: "Countries" },
        { value: "52", label: "Global Hubs" },
        { value: "99%", label: "Coverage" },
        { value: "24/7", label: "Active" },
      ],
    },
    northAmerica: {
      name: "North America",
      countries: 3,
      hubs: 15,
      deliveryTime: "Same-day – 2 days",
      coverage: "100%",
      description:
        "Deep last-mile coverage across the US, Canada, and Mexico. Major metros get same-day. Everywhere else? Next-business-day as standard.",
      stats: [
        { value: "15", label: "Dist. Centers" },
        { value: "Same-day", label: "Metro Areas" },
        { value: "100%", label: "Coverage" },
        { value: "800+", label: "Routes" },
      ],
    },
    europe: {
      name: "Europe",
      countries: 44,
      hubs: 20,
      deliveryTime: "1–2 days",
      coverage: "97%",
      description:
        "Post-Brexit customs expertise, pan-EU trade fluency, and same-day delivery in 12 major cities. We've done the regulatory homework so you don't have to.",
      stats: [
        { value: "44", label: "Countries" },
        { value: "20", label: "EU Hubs" },
        { value: "1–2", label: "Days Delivery" },
        { value: "Zero", label: "Avg Customs Delay" },
      ],
    },
    asia: {
      name: "Asia Pacific",
      countries: 48,
      hubs: 24,
      deliveryTime: "2–4 days",
      coverage: "93%",
      description:
        "The world's busiest trade corridor. We run bonded warehouses in Singapore, Shanghai, Mumbai, and Sydney for smooth intra-Asia and cross-border flows.",
      stats: [
        { value: "48", label: "Countries" },
        { value: "24", label: "Regional Hubs" },
        { value: "2–4", label: "Days Delivery" },
        { value: "200M+", label: "People Served" },
      ],
    },
    middleEast: {
      name: "Middle East & Africa",
      countries: 38,
      hubs: 10,
      deliveryTime: "3–6 days",
      coverage: "87%",
      description:
        "Navigating import rules, informal last-mile challenges, and cross-border customs with 15+ years of experience on the ground — not just on paper.",
      stats: [
        { value: "38", label: "Countries" },
        { value: "10", label: "Strategic Hubs" },
        { value: "3–6", label: "Days Delivery" },
        { value: "100%", label: "Compliant" },
      ],
    },
    southAmerica: {
      name: "South America",
      countries: 12,
      hubs: 7,
      deliveryTime: "2–5 days",
      coverage: "89%",
      description:
        "Brazil-certified customs brokerage, Mercosur trade know-how, and direct partnerships with all major South American carriers. Big region, no nasty surprises.",
      stats: [
        { value: "12", label: "Countries" },
        { value: "7", label: "Regional Hubs" },
        { value: "2–5", label: "Days Delivery" },
        { value: "24/7", label: "Customs Help" },
      ],
    },
  };

  const serviceTypes = [
    {
      name: "Priority Express",
      coverage: "150 Countries",
      delivery: "1–3 business days",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Everyday Parcels",
      coverage: "180 Countries",
      delivery: "3–7 business days",
      icon: "📦",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Freight & Cargo",
      coverage: "90 Countries",
      delivery: "5–14 business days",
      icon: "🚢",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Cold Chain",
      coverage: "100 Countries",
      delivery: "2–5 business days",
      icon: "❄️",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const highlightedCountries = [
    { name: "USA", region: "northAmerica", position: { x: 20, y: 40 } },
    { name: "Germany", region: "europe", position: { x: 48, y: 35 } },
    { name: "UAE", region: "middleEast", position: { x: 55, y: 50 } },
    { name: "China", region: "asia", position: { x: 68, y: 42 } },
    { name: "Singapore", region: "asia", position: { x: 72, y: 58 } },
    { name: "Brazil", region: "southAmerica", position: { x: 32, y: 65 } },
    { name: "South Africa", region: "middleEast", position: { x: 52, y: 75 } },
    { name: "Australia", region: "asia", position: { x: 82, y: 75 } },
  ];

  const getRegionColor = (region) => {
    const colors = {
      global: "from-purple-500 to-pink-500",
      northAmerica: "from-blue-500 to-cyan-500",
      europe: "from-green-500 to-emerald-500",
      asia: "from-orange-500 to-red-500",
      middleEast: "from-yellow-500 to-amber-500",
      southAmerica: "from-teal-500 to-green-500",
    };
    return colors[region] || "from-gray-500 to-gray-700";
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
            <div className="h-16 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            <div className="bg-gray-200 rounded-2xl h-96 mb-12"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="coverage"
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            WE&apos;VE BEEN AROUND
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Package&apos;s Passport to{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              180+ Countries
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            One relationship, one tracking number, the entire world. We have licensed
            agents, local warehouses, and on-the-ground teams in every major region.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Interactive Map */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              {/* Map Controls */}
              <div className="flex flex-wrap gap-3 mb-8">
                {Object.keys(regions).map((regionKey) => (
                  <button
                    key={regionKey}
                    onClick={() => setActiveRegion(regionKey)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                      activeRegion === regionKey
                        ? `bg-gradient-to-r ${getRegionColor(regionKey)} text-white shadow-lg transform scale-105`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {regions[regionKey].name}
                  </button>
                ))}
              </div>

              {/* World Map Visualization */}
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-gray-200">
                <div className="relative w-full h-96">
                  {/* Base Map */}
                  <div className="absolute inset-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl border border-gray-300"></div>

                  {/* Continent Highlights */}
                  <div
                    className={`absolute inset-8 transition-all duration-500 ${
                      activeRegion === "global" ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    {/* North America */}
                    <div
                      className={`absolute left-[15%] top-[30%] w-[25%] h-[35%] bg-gradient-to-br ${
                        activeRegion === "northAmerica"
                          ? "from-blue-400 to-cyan-400"
                          : "from-blue-200 to-cyan-200"
                      } rounded-lg border-2 ${
                        activeRegion === "northAmerica"
                          ? "border-blue-500"
                          : "border-blue-300"
                      }`}
                    ></div>

                    {/* Europe */}
                    <div
                      className={`absolute left-[42%] top-[25%] w-[15%] h-[20%] bg-gradient-to-br ${
                        activeRegion === "europe"
                          ? "from-green-400 to-emerald-400"
                          : "from-green-200 to-emerald-200"
                      } rounded-lg border-2 ${
                        activeRegion === "europe"
                          ? "border-green-500"
                          : "border-green-300"
                      }`}
                    ></div>

                    {/* Asia */}
                    <div
                      className={`absolute left-[55%] top-[25%] w-[30%] h-[40%] bg-gradient-to-br ${
                        activeRegion === "asia"
                          ? "from-orange-400 to-red-400"
                          : "from-orange-200 to-red-200"
                      } rounded-lg border-2 ${
                        activeRegion === "asia"
                          ? "border-orange-500"
                          : "border-orange-300"
                      }`}
                    ></div>

                    {/* Middle East & Africa */}
                    <div
                      className={`absolute left-[45%] top-[45%] w-[20%] h-[40%] bg-gradient-to-br ${
                        activeRegion === "middleEast"
                          ? "from-yellow-400 to-amber-400"
                          : "from-yellow-200 to-amber-200"
                      } rounded-lg border-2 ${
                        activeRegion === "middleEast"
                          ? "border-yellow-500"
                          : "border-yellow-300"
                      }`}
                    ></div>

                    {/* South America */}
                    <div
                      className={`absolute left-[25%] top-[55%] w-[15%] h-[30%] bg-gradient-to-br ${
                        activeRegion === "southAmerica"
                          ? "from-teal-400 to-green-400"
                          : "from-teal-200 to-green-200"
                      } rounded-lg border-2 ${
                        activeRegion === "southAmerica"
                          ? "border-teal-500"
                          : "border-teal-300"
                      }`}
                    ></div>
                  </div>

                  {/* Country Markers */}
                  {highlightedCountries.map((country) => (
                    <div
                      key={country.name}
                      className={`absolute w-3 h-3 rounded-full border-2 border-white shadow-lg transition-all duration-300 cursor-pointer ${
                        activeRegion === "global" || activeRegion === country.region
                          ? "scale-100 opacity-100"
                          : "scale-50 opacity-30"
                      } ${
                        country.region === "northAmerica"
                          ? "bg-blue-500"
                          : country.region === "europe"
                          ? "bg-green-500"
                          : country.region === "asia"
                          ? "bg-orange-500"
                          : country.region === "middleEast"
                          ? "bg-yellow-500"
                          : "bg-teal-500"
                      }`}
                      style={{
                        left: `${country.position.x}%`,
                        top: `${country.position.y}%`,
                      }}
                      onMouseEnter={() => setHoveredCountry(country)}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      {/* Pulse Animation */}
                      <div
                        className={`absolute inset-0 rounded-full animate-ping ${
                          country.region === "northAmerica"
                            ? "bg-blue-400"
                            : country.region === "europe"
                            ? "bg-green-400"
                            : country.region === "asia"
                            ? "bg-orange-400"
                            : country.region === "middleEast"
                            ? "bg-yellow-400"
                            : "bg-teal-400"
                        }`}
                      ></div>
                    </div>
                  ))}

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {highlightedCountries.map((country, index) => (
                      <line
                        key={index}
                        x1="50%"
                        y1="50%"
                        x2={`${country.position.x}%`}
                        y2={`${country.position.y}%`}
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                        className="text-gray-300"
                      />
                    ))}
                  </svg>

                  {/* Central Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping"></div>
                  </div>
                </div>

                {/* Hover Tooltip */}
                {hoveredCountry && (
                  <div
                    className="absolute bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-10"
                    style={{
                      left: `${hoveredCountry.position.x}%`,
                      top: `${hoveredCountry.position.y - 10}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="text-sm font-semibold text-gray-900">
                      {hoveredCountry.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {regions[hoveredCountry.region].name}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Region Details */}
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${getRegionColor(
                  activeRegion
                )} text-white font-semibold text-sm mb-6`}
              >
                {regions[activeRegion].name}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {regions[activeRegion].description}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Friendly local expertise backed by the reliability of a global
                network — the best of both worlds for your shipments.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {regions[activeRegion].stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Service Availability */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Services Available Here
                </h4>
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-lg">{service.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get a Regional Quote
              </button>
            </div>
          </div>
        </div>

        {/* Service Coverage Details */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 border-2 border-white rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 border-2 border-white rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-2 text-center">
              How Far Can Each Service Go?
            </h3>
            <p className="text-blue-100 text-center mb-8">
              Every service, every corner of the globe — here&apos;s a quick look at our reach.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceTypes.map((service) => (
                <div
                  key={service.name}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto`}
                  >
                    {service.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{service.name}</h4>
                  <div className="space-y-2 text-white/80">
                    <div className="text-sm">🌍 {service.coverage}</div>
                    <div className="text-sm">🚚 {service.delivery}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
