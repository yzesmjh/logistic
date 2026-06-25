import { useState, useRef, useEffect } from "react";

// --------------- Hardcoded chatbot knowledge base ---------------
const BOT_RESPONSES = [
  {
    keywords: ["track", "tracking", "where is my", "package status", "shipment status"],
    reply:
      "To track your shipment, go to our **Track** page and enter your tracking number (e.g. 7489 2345 6780). You can find it on your receipt or confirmation email. I can also check it here — just type your tracking number!",
  },
  {
    keywords: ["rate", "price", "cost", "how much", "quote", "fee"],
    reply:
      "Shipping rates depend on weight, dimensions, origin, and destination. 📦\n\n• **FedEx Express** — next-business-day from ₦4,500\n• **FedEx Ground** — 1–5 days from ₦2,200\n• **International Economy** — 2–5 business days from ₦18,000\n\nVisit our **Get a Rate** page for an exact quote!",
  },
  {
    keywords: ["delivery", "how long", "days", "time", "duration", "arrive"],
    reply:
      "Delivery times vary by service:\n\n• **Express**: Next business day by 10:30 AM\n• **2Day**: 2 business days\n• **Ground**: 1–5 business days\n• **International**: 1–6 business days\n\nWeather or customs may occasionally cause delays.",
  },
  {
    keywords: ["lost", "missing", "damaged", "stolen", "never arrived"],
    reply:
      "I'm sorry to hear that! 😟 Here's what to do:\n\n1. Wait 24 hours past the expected delivery date\n2. Check with neighbours or your mailbox\n3. Visit **Claims** in your FedEx account\n4. Call us on **0800-FED-EX-NG**\n\nClaims must be filed within **60 days** of the ship date.",
  },
  {
    keywords: ["pickup", "pick up", "schedule", "collect", "drop off", "dropoff"],
    reply:
      "You can schedule a pickup in two ways:\n\n• **Online**: Go to *Manage Pickups* in your FedEx account\n• **Phone**: Call **0800-FED-EX-NG** to book a courier pickup\n\nPickups are available Monday–Saturday, 8 AM – 6 PM.",
  },
  {
    keywords: ["account", "sign up", "register", "login", "password"],
    reply:
      "Creating a FedEx account is free! 🎉\n\nClick **Sign Up** in the top navigation, fill in your details, and you'll get access to:\n\n• Discounted rates\n• Package tracking\n• Billing & invoices\n• Pickup scheduling",
  },
  {
    keywords: ["international", "overseas", "customs", "import", "export", "abroad"],
    reply:
      "For international shipments, please ensure:\n\n• **Commercial invoice** is included\n• Item value and description are accurate\n• Restricted items are checked (visit our *Prohibited Items* page)\n\nCustoms clearance can add 1–3 business days depending on the destination country.",
  },
  {
    keywords: ["contact", "call", "phone", "email", "support", "help", "human", "agent"],
    reply:
      "Our support team is here for you! 📞\n\n• **Phone**: 0800-FED-EX-NG (Mon–Fri 7 AM–9 PM, Sat 8 AM–5 PM)\n• **Email**: support@fedex.ng\n• **Live Chat**: Available on this page during business hours\n• **Social**: @FedExNigeria on Twitter/X",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "start"],
    reply:
      "Hello! 👋 Welcome to FedEx Support. I'm your virtual assistant and I can help you with:\n\n• 📦 **Tracking** a package\n• 💰 **Shipping rates** & quotes\n• 🚚 **Delivery times**\n• 📋 **Claims** for lost/damaged items\n• 🗓️ **Scheduling** a pickup\n\nWhat can I help you with today?",
  },
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "great", "perfect", "awesome"],
    reply:
      "You're welcome! 😊 Is there anything else I can help you with? If you need further assistance, don't hesitate to reach out to our team at **0800-FED-EX-NG**. Have a great day! 🚀",
  },
];

const DEFAULT_REPLY =
  "I'm not sure I understand that fully. 🤔 Could you rephrase, or choose one of these topics?\n\n• **Track** a package\n• **Shipping rates**\n• **Delivery times**\n• **Lost or damaged** shipment\n• **Schedule a pickup**\n• **Contact support**";

function getBotReply(userText) {
  const lower = userText.toLowerCase();
  for (const entry of BOT_RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.reply;
    }
  }
  // check if it looks like a tracking number (digits + spaces, 12–22 chars)
  if (/^[\d\s]{10,25}$/.test(userText.trim())) {
    return `I've received your tracking number **${userText.trim()}**. In a live environment I'd fetch real-time status — for now, please visit our **Track** page and paste it there for instant results!`;
  }
  return DEFAULT_REPLY;
}
// ----------------------------------------------------------------

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // ---- Chatbot state ----
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! 👋 I'm the FedEx virtual assistant. How can I help you today?\n\nTry asking about **tracking**, **rates**, **delivery times**, or **support**.",
      id: 0,
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isChatOpen]);

  const sendMessage = () => {
    const text = userInput.trim();
    if (!text) return;

    const userMsg = { role: "user", text, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    // Simulate a short typing delay
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: reply, id: Date.now() + 1 },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render markdown-lite: bold (**text**) and newlines
  const renderText = (text) =>
    text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i} className="block">
          {parts.map((p, j) =>
            j % 2 === 1 ? <strong key={j}>{p}</strong> : p
          )}
        </span>
      );
    });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Simulate API call
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = {
    Services: [
      "Express Delivery",
      "Standard Shipping",
      "Freight Services",
      "Supply Chain",
      "Cold Chain",
      "Logistics Tech",
    ],
    Company: [
      "About Us",
      "Leadership",
      "Careers",
      "Press & Media",
      "Sustainability",
      "Investor Relations",
    ],
    Support: [
      "Help Center",
      "Track Shipment",
      "Shipping Rates",
      "Schedule Pickup",
      "File a Claim",
      "Contact Support",
    ],
    Resources: [
      "Blog & Insights",
      "Case Studies",
      "White Papers",
      "Shipping Guide",
      "API Documentation",
      "Developer Portal",
    ],
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "💼",
      url: "#",
      color: "hover:bg-blue-600",
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "#",
      color: "hover:bg-blue-400",
    },
    {
      name: "Facebook",
      icon: "📘",
      url: "#",
      color: "hover:bg-blue-700",
    },
    {
      name: "Instagram",
      icon: "📸",
      url: "#",
      color: "hover:bg-pink-600",
    },
    {
      name: "YouTube",
      icon: "📺",
      url: "#",
      color: "hover:bg-red-600",
    },
  ];

  const certifications = [
    { name: "ISO 9001", description: "Quality Management" },
    { name: "ISO 14001", description: "Environmental" },
    { name: "C-TPAT", description: "Security Certified" },
    { name: "GDP Compliant", description: "Data Protection" },
    { name: "SmartWay", description: "Environmental Excellence" },
  ];

  const contactInfo = [
    // {
    //   icon: "📞",
    //   title: "24/7 Support",
    //   details: ["+1 (555) 123-4567", "support@fedytransist.com"],
    //   description: "Round-the-clock customer support",
    // },
    // {
    //   icon: "🏢",
    //   title: "Headquarters",
    //   details: ["123 Logistics Plaza", "Suite 500", "San Francisco, CA 94105"],
    //   description: "Visit our main office",
    // },
    {
      icon: "✉️",
      title: "Business Inquiries",
      details: ["sales@FedyTransist.com", "partnerships@FedyTransist.com"],
      description: "Get in touch with our team",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Newsletter & Contact */}
        <div className="py-12 border-b border-gray-700">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Newsletter Subscription */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white">✉️</span>
                </div>
                <h3 className="text-2xl font-bold">Stay Updated</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Get the latest logistics insights, industry trends, and
                exclusive offers delivered to your inbox.
              </p>

              {isSubscribed ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <h4 className="font-bold text-green-400 text-lg mb-2">
                    Successfully Subscribed!
                  </h4>
                  <p className="text-green-300">
                    Thank you for joining our newsletter.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 backdrop-blur-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <div className="flex items-center mt-6 space-x-4 text-sm text-gray-400">
                <span>🔒 Your data is secure</span>
                <span>•</span>
                <span>📧 No spam, ever</span>
                <span>•</span>
                <span>🔔 Unsubscribe anytime</span>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors duration-300"
                  >
                    <div className="text-2xl mb-2">{contact.icon}</div>
                    <h4 className="font-semibold mb-1">{contact.title}</h4>
                    <div className="space-y-1 mb-2">
                      {contact.details.map((detail, i) => (
                        <div key={i} className="text-sm text-gray-300">
                          {detail}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      {contact.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Links & Info */}
        <div className="py-12 border-b border-gray-700">
          <div className="grid lg:grid-cols-6 md:grid-cols-2 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <span className="text-3xl font-black tracking-widest uppercase">
                  Fedy<span className="text-orange-500">Transist</span>
                </span>
                <p className="text-gray-300 mt-3 max-w-sm">
                  Your trusted global logistics partner, delivering excellence
                  across 150+ countries with innovative supply chain solutions.
                </p>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="font-semibold mb-4">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-white/5 rounded-full border border-gray-700 text-xs text-gray-300"
                      title={cert.description}
                    >
                      {cert.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links Columns */}
            {Object.entries(quickLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-lg mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-500 transition-colors duration-200"></span>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Downloads & Legal */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Mobile Apps */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <span className="text-gray-300 font-semibold">
                Download Our App:
              </span>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="flex items-center space-x-2 bg-black/30 hover:bg-black/40 px-4 py-2 rounded-xl border border-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-2xl">📱</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 bg-black/30 hover:bg-black/40 px-4 py-2 rounded-xl border border-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-2xl">🤖</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Sitemap
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Accessibility
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} FedyTransist Logistics. All rights
                reserved.
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Systems Operational</span>
                </div>
                <span>•</span>
                <span>Made with ❤️ for global commerce</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(true)}
          className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center space-x-3"
        >
          <div className="relative">
            <div className="w-3 h-3 bg-white rounded-full animate-ping absolute -top-1 -right-1"></div>
            <span className="text-2xl">💬</span>
          </div>
          <div className="text-left">
            <div className="font-semibold text-sm">Need Help?</div>
            <div className="text-xs opacity-80">Chat with us</div>
          </div>
        </button>
      </div>

      {/* ───────────── Chatbot Modal ───────────── */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-end p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsChatOpen(false)}
          />

          {/* Chat window */}
          <div className="relative w-full max-w-sm flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
               style={{ height: "520px" }}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">🤖</div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">FedEx Assistant</p>
                  <p className="text-xs text-blue-100">Always online</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-lg"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Quick-reply chips */}
            <div className="flex gap-2 px-3 py-2 overflow-x-auto flex-shrink-0 bg-gray-50 border-b border-gray-100 scrollbar-hide">
              {["Track package", "Shipping rates", "Delivery time", "Contact support"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    setUserInput(chip);
                    setTimeout(() => {
                      const userMsg = { role: "user", text: chip, id: Date.now() };
                      setMessages((prev) => [...prev, userMsg]);
                      setUserInput("");
                      setIsTyping(true);
                      setTimeout(() => {
                        setMessages((prev) => [
                          ...prev,
                          { role: "bot", text: getBotReply(chip), id: Date.now() + 1 },
                        ]);
                        setIsTyping(false);
                      }, 900);
                    }, 0);
                  }}
                  className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors flex-shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white mr-2 mt-1 flex-shrink-0">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white mr-2 mt-1 flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-gray-100 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition"
              />
              <button
                onClick={sendMessage}
                disabled={!userInput.trim() || isTyping}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white disabled:opacity-40 hover:opacity-90 transition-all flex-shrink-0 shadow"
                aria-label="Send"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
