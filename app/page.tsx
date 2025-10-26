"use client"

import { useState, useEffect } from "react"
import {
  User,
  Bell,
  Globe,
  Calendar,
  MapPin,
  Camera,
  Mic,
  Cloud,
  TrendingUp,
  AlertTriangle,
  Leaf,
  DollarSign,
  Phone,
  Home,
  BarChart3,
  MessageCircle,
  Settings,
} from "lucide-react"

const CropYieldApp = () => {
  const [currentPage, setCurrentPage] = useState("login")
  const [language, setLanguage] = useState("en")
  const [farmerName, setFarmerName] = useState("")
  const [loginData, setLoginData] = useState({ phone: "", name: "" })
  const [isListening, setIsListening] = useState(false)
  const [selectedCrop, setSelectedCrop] = useState("wheat")
  const [diseaseImage, setDiseaseImage] = useState(null)
  const [currentLocation, setCurrentLocation] = useState({ lat: 12.9716, lng: 77.5946 })
  const [notifications, setNotifications] = useState([
    { id: 1, type: "weather", message: "Rain alert for tomorrow", time: "2 hours ago" },
    { id: 2, type: "price", message: "Wheat price increased by 5%", time: "1 day ago" },
    { id: 3, type: "disease", message: "Pest alert in your area", time: "2 days ago" },
  ])

  const getInitialChatMessages = () => {
    const messages = {
      en: [
        {
          id: 1,
          type: "bot",
          message: "Hello! I'm your AI farming assistant. How can I help you today?",
          time: "10:30 AM",
        },
        { id: 2, type: "user", message: "What's the best time to harvest wheat?", time: "10:32 AM" },
        {
          id: 3,
          type: "bot",
          message:
            "For wheat harvest, the best time is when grain moisture is 20-25%. In your region (Bangalore), this is typically early morning between 6-9 AM to avoid grain shattering.",
          time: "10:33 AM",
        },
      ],
      hi: [
        { id: 1, type: "bot", message: "नमस्ते! मैं आपका AI कृषि सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?", time: "10:30 AM" },
        { id: 2, type: "user", message: "गेहूं की कटाई का सबसे अच्छा समय क्या है?", time: "10:32 AM" },
        {
          id: 3,
          type: "bot",
          message:
            "गेहूं की कटाई के लिए, सबसे अच्छा समय तब है जब अनाज में नमी 20-25% हो। आपके क्षेत्र (बैंगलोर) में, यह आमतौर पर सुबह 6-9 बजे के बीच होता है।",
          time: "10:33 AM",
        },
      ],
      or: [
        { id: 1, type: "bot", message: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI କୃଷି ସହାୟକ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?", time: "10:30 AM" },
        { id: 2, type: "user", message: "ଗହମ କାଟିବାର ସର୍ବୋତ୍ତମ ସମୟ କ'ଣ?", time: "10:32 AM" },
        {
          id: 3,
          type: "bot",
          message:
            "ଗହମ ଅମଳ ପାଇଁ, ସର୍ବୋତ୍ତମ ସମୟ ହେଉଛି ଯେତେବେଳେ ଶସ୍ୟରେ ଆର୍ଦ୍ରତା 20-25% ଥାଏ। ଆପଣଙ୍କ ଅଞ୍ଚଳରେ (ବାଙ୍ଗାଲୋର), ଏହା ସାଧାରଣତଃ ସକାଳ 6-9 ଟା ମଧ୍ୟରେ ହୋଇଥାଏ।",
          time: "10:33 AM",
        },
      ],
    }
    return messages[language] || messages.en
  }

  const [chatMessages, setChatMessages] = useState(getInitialChatMessages())
  const [newMessage, setNewMessage] = useState("")

  // Translations
  const translations = {
    en: {
      appName: "CropSmart AI",
      login: "Login",
      phoneNumber: "Phone Number",
      farmerName: "Farmer Name",
      enterApp: "Enter App",
      welcome: "Welcome",
      dashboard: "Dashboard",
      cropPrediction: "Crop Prediction",
      diseaseDetection: "Disease Detection",
      marketPrices: "Market Prices",
      weather: "Weather Forecast",
      alerts: "Alerts",
      voiceAssistant: "Voice Assistant",
      takePicture: "Take Picture",
      selectCrop: "Select Crop",
      predict: "Predict Yield",
      currentPrice: "Current Price",
      forecast: "7-Day Forecast",
      tapToSpeak: "Tap to Speak",
      listening: "Listening...",
      home: "Home",
      analytics: "Analytics",
      chat: "Chat",
      settings: "Settings",
      notifications: "Notifications",
      location: "Location",
      profile: "Profile",
      helpSupport: "Help & Support",
      calendar: "Calendar",
      soilHealth: "Soil Health",
      irrigation: "Irrigation",
      fertilizer: "Fertilizer Guide",
      harvest: "Harvest Time",
      government: "Government Schemes",
      totalYield: "Total Yield",
      profitLoss: "Profit/Loss",
      expenses: "Expenses",
      income: "Income",
      efficiency: "Efficiency",
      sendMessage: "Send Message",
      typeMessage: "Type your message...",
      aiAssistant: "AI Assistant",
      languageSettings: "Language Settings",
      accountSettings: "Account Settings",
      helpCenter: "Help Center",
      aboutApp: "About App",
      logout: "Logout",
      version: "Version",
      contactSupport: "Contact Support",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      askMeAnything: "Ask me anything about farming",
      aiResponse:
        "Thank you for your question! I'm analyzing your farm data to provide the best recommendation. Let me help you with that.",
    },
    hi: {
      appName: "क्रॉपस्मार्ट AI",
      login: "लॉगिन",
      phoneNumber: "फोन नंबर",
      farmerName: "किसान का नाम",
      enterApp: "ऐप में प्रवेश करें",
      welcome: "स्वागत",
      dashboard: "डैशबोर्ड",
      cropPrediction: "फसल पूर्वानुमान",
      diseaseDetection: "रोग पहचान",
      marketPrices: "बाजार भाव",
      weather: "मौसम पूर्वानुमान",
      alerts: "अलर्ट",
      voiceAssistant: "वॉयस असिस्टेंट",
      takePicture: "फोटो लें",
      selectCrop: "फसल चुनें",
      predict: "उत्पादन पूर्वानुमान",
      currentPrice: "वर्तमान भाव",
      forecast: "7-दिन पूर्वानुमान",
      tapToSpeak: "बोलने के लिए दबाएं",
      listening: "सुन रहा है...",
      home: "होम",
      analytics: "एनालिटिक्स",
      chat: "चैट",
      settings: "सेटिंग्स",
      notifications: "सूचनाएं",
      location: "स्थान",
      profile: "प्रोफाइल",
      helpSupport: "सहायता",
      calendar: "कैलेंडर",
      soilHealth: "मिट्टी स्वास्थ्य",
      irrigation: "सिंचाई",
      fertilizer: "उर्वरक गाइड",
      harvest: "फसल कटाई",
      government: "सरकारी योजनाएं",
      totalYield: "कुल उत्पादन",
      profitLoss: "लाभ/हानि",
      expenses: "खर्च",
      income: "आय",
      efficiency: "दक्षता",
      sendMessage: "संदेश भेजें",
      typeMessage: "अपना संदेश टाइप करें...",
      aiAssistant: "AI सहायक",
      languageSettings: "भाषा सेटिंग्स",
      accountSettings: "खाता सेटिंग्स",
      helpCenter: "सहायता केंद्र",
      aboutApp: "ऐप के बारे में",
      logout: "लॉगआउट",
      version: "संस्करण",
      contactSupport: "सहायता संपर्क",
      privacyPolicy: "गोपनीयता नीति",
      termsOfService: "सेवा की शर्तें",
      askMeAnything: "कृषि के बारे में कुछ भी पूछें",
      aiResponse: "आपके प्रश्न के लिए धन्यवाद! मैं सबसे अच्छी सिफारिश प्रदान करने के लिए आपके खेत के डेटा का विश्लेषण कर रहा हूं।",
    },
    or: {
      appName: "କ୍ରପ୍‌ସ୍ମାର୍ଟ AI",
      login: "ଲଗଇନ୍",
      phoneNumber: "ଫୋନ ନମ୍ବର",
      farmerName: "କୃଷକଙ୍କ ନାମ",
      enterApp: "ଆପ୍‌ରେ ପ୍ରବେଶ କରନ୍ତୁ",
      welcome: "ସ୍ୱାଗତ",
      dashboard: "ଡ୍ୟାସବୋର୍ଡ",
      cropPrediction: "ଫସଲ ପୂର୍ବାନୁମାନ",
      diseaseDetection: "ରୋଗ ଚିହ୍ନଟ",
      marketPrices: "ବଜାର ଦର",
      weather: "ପାଣିପାଗ ପୂର୍ବାନୁମାନ",
      alerts: "ଚେତାବନୀ",
      voiceAssistant: "ସ୍ୱର ସହାୟକ",
      takePicture: "ଫଟୋ ଉଠାନ୍ତୁ",
      selectCrop: "ଫସଲ ବାଛନ୍ତୁ",
      predict: "ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ",
      currentPrice: "ବର୍ତ୍ତମାନ ଦର",
      forecast: "୭-ଦିନ ପୂର୍ବାନୁମାନ",
      tapToSpeak: "କହିବା ପାଇଁ ଦବାନ୍ତୁ",
      listening: "ଶୁଣୁଅଛି...",
      home: "ଘର",
      analytics: "ବିଶ୍ଳେଷଣ",
      chat: "ଚାଟ୍",
      settings: "ସେଟିଂସ",
      notifications: "ବିଜ୍ଞପ୍ତି",
      location: "ଅବସ୍ଥାନ",
      profile: "ପ୍ରୋଫାଇଲ୍",
      helpSupport: "ସାହାଯ୍ୟ",
      calendar: "କ୍ୟାଲେଣ୍ଡର",
      soilHealth: "ମାଟି ସ୍ୱାସ୍ଥ୍ୟ",
      irrigation: "ଜଳସେଚନ",
      fertilizer: "ସାର ଗାଇଡ୍",
      harvest: "ଅମଳ ସମୟ",
      government: "ସରକାରୀ ଯୋଜନା",
      totalYield: "ସମୁଦାୟ ଉତ୍ପାଦନ",
      profitLoss: "ଲାଭ/କ୍ଷତି",
      expenses: "ଖର୍ଚ୍ଚ",
      income: "ଆୟ",
      efficiency: "ଦକ୍ଷତା",
      sendMessage: "ବାର୍ତ୍ତା ପଠାନ୍ତୁ",
      typeMessage: "ଆପଣଙ୍କ ବାର୍ତ୍ତା ଟାଇପ୍ କରନ୍ତୁ...",
      aiAssistant: "AI ସହାୟକ",
      languageSettings: "ଭାଷା ସେଟିଂସ",
      accountSettings: "ଆକାଉଣ୍ଟ ସେଟିଂସ",
      helpCenter: "ସାହାଯ୍ୟ କେନ୍ଦ୍ର",
      aboutApp: "ଆପ୍ ବିଷୟରେ",
      logout: "ଲଗଆଉଟ୍",
      version: "ସଂସ୍କରଣ",
      contactSupport: "ସହାୟତା ଯୋଗାଯୋଗ",
      privacyPolicy: "ଗୋପନୀୟତା ନୀତି",
      termsOfService: "ସେବା ସର୍ତ୍ତାବଳୀ",
      askMeAnything: "କୃଷି ବିଷୟରେ ଯେକୌଣସି କଥା ପଚାରନ୍ତୁ",
      aiResponse: "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ପାଇଁ ଧନ୍ୟବାଦ! ମୁଁ ସର୍ବୋତ୍ତମ ସୁପାରିଶ ପ୍ରଦାନ କରିବା ପାଇଁ ଆପଣଙ୍କ ଚାଷ ତଥ୍ୟ ବିଶ୍ଳେଷଣ କରୁଛି।",
    },
  }

  const t = translations[language]

  const mockWeatherData = [
    { day: "Today", temp: "28°C", icon: "☀️", desc: "Sunny" },
    { day: "Tomorrow", temp: "25°C", icon: "🌤️", desc: "Partly Cloudy" },
    { day: "Wed", temp: "22°C", icon: "🌧️", desc: "Rainy" },
  ]

  const mockPrices = {
    wheat: { price: "₹2,150", change: "+2.5%", trend: "up" },
    rice: { price: "₹3,200", change: "-1.2%", trend: "down" },
    corn: { price: "₹1,850", change: "+0.8%", trend: "up" },
  }

  const handleLogin = () => {
    if (loginData.phone && loginData.name) {
      setFarmerName(loginData.name)
      setCurrentPage("dashboard")
    }
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000)
    }
  }

  useEffect(() => {
    setChatMessages(getInitialChatMessages())
  }, [language])

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex flex-col">
      {/* Language Selector */}
      <div className="flex justify-end p-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-black/30 backdrop-blur text-white rounded-lg px-3 py-2 border border-white/30"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="or">ଓଡ଼ିଆ</option>
        </select>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Leaf className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{t.appName}</h1>
          </div>

          <div className="space-y-4">
            <input
              type="tel"
              placeholder={t.phoneNumber}
              value={loginData.phone}
              onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 text-lg backdrop-blur-sm"
            />
            <input
              type="text"
              placeholder={t.farmerName}
              value={loginData.name}
              onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 text-lg backdrop-blur-sm"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-white text-green-600 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t.enterApp}
            </button>
          </div>

          {/* Voice Assistant Button */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleVoice}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isListening ? "bg-red-500 animate-pulse" : "bg-white/30 hover:bg-white/40 backdrop-blur-sm"
              }`}
            >
              <Mic className="w-6 h-6 text-white drop-shadow-lg" />
            </button>
            <p className="text-white text-sm mt-2 drop-shadow-lg font-medium">
              {isListening ? t.listening : t.tapToSpeak}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const AnalyticsPage = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-600 text-white p-4">
        <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{t.analytics}</h1>
        <p className="text-blue-100 text-sm">Farm Performance Dashboard</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-500 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">{t.totalYield}</p>
                <p className="text-2xl font-bold">8.5 tons</p>
                <p className="text-green-100 text-xs">+12% vs last year</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-blue-500 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">{t.profitLoss}</p>
                <p className="text-2xl font-bold">₹85,000</p>
                <p className="text-blue-100 text-xs">Net profit</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-orange-500 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">{t.expenses}</p>
                <p className="text-2xl font-bold">₹45,000</p>
                <p className="text-orange-100 text-xs">This season</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-200" />
            </div>
          </div>

          <div className="bg-purple-500 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">{t.efficiency}</p>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-purple-100 text-xs">Farm efficiency</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Crop Performance Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">Crop Performance (2025)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Wheat</span>
                <span className="text-green-600 font-semibold">4.2 tons/ha</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Rice</span>
                <span className="text-blue-600 font-semibold">6.8 tons/ha</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Corn</span>
                <span className="text-yellow-600 font-semibold">3.5 tons/ha</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Income/Expense */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">Monthly Financial Overview</h3>
          <div className="space-y-3">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => (
              <div key={month} className="flex items-center justify-between">
                <span className="font-medium">{month} 2025</span>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-green-600 font-semibold">₹{12000 + index * 2000}</span>
                    <span className="block text-xs text-gray-500">Income</span>
                  </div>
                  <div className="text-right">
                    <span className="text-red-600 font-semibold">₹{8000 + index * 1000}</span>
                    <span className="block text-xs text-gray-500">Expense</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-xl">
          <h3 className="font-semibold mb-3">🤖 AI Insights</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-white/20 p-3 rounded-lg">
              <p>• Your wheat yield is 15% above district average</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <p>• Consider reducing fertilizer cost by 20% using organic alternatives</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <p>• Optimal harvest window: Oct 25 - Nov 5 for maximum profit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ChatPage = () => {
    const sendMessage = () => {
      if (newMessage.trim()) {
        const userMsg = {
          id: chatMessages.length + 1,
          type: "user",
          message: newMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setChatMessages([...chatMessages, userMsg])
        setNewMessage("")

        setTimeout(() => {
          const botResponse = {
            id: chatMessages.length + 2,
            type: "bot",
            message: t.aiResponse,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }
          setChatMessages((prev) => [...prev, botResponse])
        }, 1500)
      }
    }

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-green-700 text-white p-4">
          <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
            ← Back
          </button>
          <h1 className="text-2xl font-bold">{t.aiAssistant}</h1>
          <p className="text-green-100 text-sm">{t.askMeAnything}</p>
        </div>

        <div className="flex flex-col h-screen">
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 pb-32">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    msg.type === "user"
                      ? "bg-green-500 text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-2 ${msg.type === "user" ? "text-green-100" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {/* Quick Action Buttons */}
            <div className="space-y-2 mt-6">
              <p className="text-center text-gray-500 text-sm">Quick Questions:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setNewMessage("When should I plant wheat?")}
                  className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-left hover:bg-gray-50"
                >
                  🌾 When to plant wheat?
                </button>
                <button
                  onClick={() => setNewMessage("What fertilizer should I use?")}
                  className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-left hover:bg-gray-50"
                >
                  🌱 Fertilizer advice?
                </button>
                <button
                  onClick={() => setNewMessage("Current market prices?")}
                  className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-left hover:bg-gray-50"
                >
                  💰 Market prices?
                </button>
                <button
                  onClick={() => setNewMessage("Weather forecast")}
                  className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-left hover:bg-gray-50"
                >
                  🌤️ Weather forecast?
                </button>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t.typeMessage}
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={toggleVoice}
                className={`p-3 rounded-full ${isListening ? "bg-red-500" : "bg-gray-200"}`}
              >
                <Mic className={`w-5 h-5 ${isListening ? "text-white" : "text-gray-600"}`} />
              </button>
              <button onClick={sendMessage} className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600">
                <span className="text-sm font-medium">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const SettingsPage = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gray-800 text-white p-4">
        <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{t.settings}</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{farmerName}</h3>
              <p className="text-gray-600">{loginData.phone}</p>
              <p className="text-gray-500 text-sm">Bangalore, Karnataka</p>
            </div>
          </div>
        </div>

        {/* Settings Options */}
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <span>{t.languageSettings}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm">{language.toUpperCase()}</span>
              <span className="text-gray-400">›</span>
            </div>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <span>{t.notifications}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <span>{t.accountSettings}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <span>{t.helpCenter}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{t.contactSupport}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-400" />
              <span>{t.privacyPolicy}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-400" />
              <span>{t.termsOfService}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* App Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">{t.aboutApp}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>{t.version}: 2.1.0</p>
            <p>Last Updated: September 2025</p>
            <p>Developed for Indian Farmers</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            setCurrentPage("login")
            setFarmerName("")
            setLoginData({ phone: "", name: "" })
          }}
          className="w-full bg-red-500 text-white p-4 rounded-xl font-semibold hover:bg-red-600"
        >
          {t.logout}
        </button>
      </div>
    </div>
  )

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              {t.welcome}, {farmerName}!
            </h1>
            <div className="flex items-center mt-1 text-green-100">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">Bangalore, Karnataka</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-green-500 text-white rounded-lg px-2 py-1 text-sm border border-green-400"
            >
              <option value="en">EN</option>
              <option value="hi">हि</option>
              <option value="or">ଓଡ଼</option>
            </select>
            <div className="relative">
              <Bell className="w-6 h-6" onClick={() => setCurrentPage("notifications")} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-green-500/50 rounded-xl p-3 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-1" />
            <p className="text-xs">Yield Prediction</p>
            <p className="font-semibold">85%</p>
          </div>
          <div className="bg-green-500/50 rounded-xl p-3 text-center">
            <Cloud className="w-6 h-6 mx-auto mb-1" />
            <p className="text-xs">Weather</p>
            <p className="font-semibold">28°C</p>
          </div>
          <div className="bg-green-500/50 rounded-xl p-3 text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-1" />
            <p className="text-xs">Price Alert</p>
            <p className="font-semibold">₹2,150</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Alerts */}
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
            <p className="text-orange-800 font-medium">Weather Alert</p>
          </div>
          <p className="text-orange-700 text-sm mt-1">Rain expected in 2 days. Consider harvesting early.</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">{t.cropPrediction}</h3>
            <p className="text-gray-600 text-sm mb-4">AI-powered yield forecasting</p>
            <button onClick={() => setCurrentPage("prediction")} className="text-blue-600 font-medium text-sm">
              View Details →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">{t.diseaseDetection}</h3>
            <p className="text-gray-600 text-sm mb-4">Scan leaves for diseases</p>
            <button onClick={() => setCurrentPage("disease")} className="text-green-600 font-medium text-sm">
              Scan Now →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold mb-2">{t.marketPrices}</h3>
            <p className="text-gray-600 text-sm mb-4">Live market rates</p>
            <button onClick={() => setCurrentPage("market")} className="text-yellow-600 font-medium text-sm">
              Check Prices →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Cloud className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">{t.weather}</h3>
            <p className="text-gray-600 text-sm mb-4">7-day forecast</p>
            <button onClick={() => setCurrentPage("weather")} className="text-purple-600 font-medium text-sm">
              View Forecast →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">{t.calendar}</h3>
            <p className="text-gray-600 text-sm mb-4">Farming schedule</p>
            <button onClick={() => setCurrentPage("calendar")} className="text-indigo-600 font-medium text-sm">
              View Calendar →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">{t.soilHealth}</h3>
            <p className="text-gray-600 text-sm mb-4">Soil analysis</p>
            <button onClick={() => setCurrentPage("soil")} className="text-orange-600 font-medium text-sm">
              Analyze Soil →
            </button>
          </div>
        </div>

        {/* Voice Assistant */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{t.voiceAssistant}</h3>
            <Mic className="w-5 h-5 text-gray-400" />
          </div>
          <button
            onClick={toggleVoice}
            className={`w-full py-4 rounded-xl font-medium transition-all ${
              isListening ? "bg-red-500 text-white animate-pulse" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isListening ? t.listening : t.tapToSpeak}
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`flex flex-col items-center py-2 ${currentPage === "dashboard" ? "text-green-600" : "text-gray-400"}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">{t.home}</span>
          </button>
          <button
            onClick={() => setCurrentPage("analytics")}
            className={`flex flex-col items-center py-2 ${currentPage === "analytics" ? "text-green-600" : "text-gray-400"}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs mt-1">{t.analytics}</span>
          </button>
          <button
            onClick={() => setCurrentPage("chat")}
            className={`flex flex-col items-center py-2 ${currentPage === "chat" ? "text-green-600" : "text-gray-400"}`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs mt-1">{t.chat}</span>
          </button>
          <button
            onClick={() => setCurrentPage("settings")}
            className={`flex flex-col items-center py-2 ${currentPage === "settings" ? "text-green-600" : "text-gray-400"}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs mt-1">{t.settings}</span>
          </button>
        </div>
      </div>
    </div>
  )

  const PredictionPage = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-600 text-white p-4">
        <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{t.cropPrediction}</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">{t.selectCrop}</h3>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full p-3 border rounded-lg text-lg"
          >
            <option value="wheat">Wheat (गेहूं / ଗହମ)</option>
            <option value="rice">Rice (चावल / ଚାଉଳ)</option>
            <option value="corn">Corn (मक्का / ମକା)</option>
          </select>

          <div className="mt-6">
            <h4 className="font-medium mb-3">Satellite Analysis</h4>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Soil Moisture</span>
                <span className="font-semibold text-green-600">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-3">
              <div className="flex items-center justify-between">
                <span>Vegetation Index</span>
                <span className="font-semibold text-blue-600">0.75</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-6">{t.predict}</button>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-semibold text-yellow-800">Predicted Yield</h4>
            <p className="text-2xl font-bold text-yellow-600 mt-2">4.2 tons/hectare</p>
            <p className="text-yellow-700 text-sm mt-1">85% confidence level</p>
          </div>
        </div>
      </div>
    </div>
  )

  const DiseasePage = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-green-600 text-white p-4">
        <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{t.diseaseDetection}</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              {diseaseImage ? (
                <img
                  src={diseaseImage || "/placeholder.svg"}
                  alt="Leaf"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Camera className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <button
              onClick={() => setDiseaseImage("/api/placeholder/200/200")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {t.takePicture}
            </button>
          </div>

          {diseaseImage && (
            <div className="mt-6">
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="font-semibold text-red-800">Disease Detected</h4>
                <p className="text-red-700 font-medium mt-1">Leaf Blight (पत्ती झुलसा / ఆకు దహనం)</p>
                <p className="text-red-600 text-sm mt-2">Confidence: 92%</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-blue-800">Recommended Treatment</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span className="text-sm">Copper Oxychloride 50% WP - 3g/L</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span className="text-sm">Spray every 15 days</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span className="text-sm">Cost: ₹150-200 per acre</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4">
                Order Medicine
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const MarketPage = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-yellow-600 text-white p-4">
        <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{t.marketPrices}</h1>
        <p className="text-yellow-100 text-sm">Live prices from Bangalore APMC</p>
      </div>

      <div className="p-4 space-y-4">
        {Object.entries(mockPrices).map(([crop, data]) => (
          <div key={crop} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold capitalize">{crop}</h3>
                <p className="text-2xl font-bold text-gray-800">{data.price}/quintal</p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${data.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {data.change}
                </span>
                <TrendingUp
                  className={`w-4 h-4 mt-1 ${data.trend === "up" ? "text-green-600" : "text-red-600 rotate-180"}`}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800">Price Alert</h4>
          <p className="text-green-700 text-sm mt-1">Wheat prices increased by 5% this week. Good time to sell!</p>
        </div>
      </div>
    </div>
  )

  const WeatherPage = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-purple-600 text-white p-4">
        <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{t.weather}</h1>
      </div>

      <div className="p-4 space-y-4">
        {mockWeatherData.map((day, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{day.icon}</span>
                <div>
                  <h3 className="font-semibold">{day.day}</h3>
                  <p className="text-gray-600 text-sm">{day.desc}</p>
                </div>
              </div>
              <span className="text-xl font-bold">{day.temp}</span>
            </div>
          </div>
        ))}

        <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400 mt-6">
          <h4 className="font-semibold text-blue-800">Farming Tip</h4>
          <p className="text-blue-700 text-sm mt-1">
            Rain expected on Wednesday. Plan irrigation accordingly to save water and costs.
          </p>
        </div>
      </div>
    </div>
  )

  const NotificationsPage = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-red-600 text-white p-4">
        <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{t.notifications}</h1>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-400">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {notification.type === "weather" && <Cloud className="w-5 h-5 text-blue-600 mr-2" />}
                  {notification.type === "price" && <DollarSign className="w-5 h-5 text-green-600 mr-2" />}
                  {notification.type === "disease" && <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />}
                  <span className="font-medium capitalize">{notification.type} Alert</span>
                </div>
                <p className="text-gray-700 text-sm">{notification.message}</p>
                <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
              </div>
              <button className="ml-2 text-gray-400">×</button>
            </div>
          </div>
        ))}

        <div className="text-center py-8 text-gray-500">
          <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>SMS alerts will be sent to your phone during low connectivity</p>
        </div>
      </div>
    </div>
  )

  const CalendarPage = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-indigo-600 text-white p-4">
        <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{t.calendar}</h1>
        <p className="text-indigo-100 text-sm">Farming Schedule & Reminders</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">September 2025</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="font-medium">Wheat Sowing</p>
                <p className="text-sm text-gray-600">Oct 15 - Nov 15</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="font-medium">Fertilizer Application</p>
                <p className="text-sm text-gray-600">Sep 25</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="font-medium">Pest Control</p>
                <p className="text-sm text-gray-600">Sep 20</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-400">
          <h4 className="font-semibold text-orange-800">Today's Task</h4>
          <p className="text-orange-700 text-sm mt-1">
            Apply irrigation to field #2. Optimal time: Early morning (6-8 AM)
          </p>
        </div>
      </div>
    </div>
  )

  const SoilPage = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-orange-600 text-white p-4">
        <button onClick={() => setCurrentPage("dashboard")} className="mb-4">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{t.soilHealth}</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">Soil Analysis Report</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">pH Level</span>
              <div className="text-right">
                <span className="font-bold text-green-600">6.8</span>
                <span className="block text-xs text-green-600">Good</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium">Nitrogen</span>
              <div className="text-right">
                <span className="font-bold text-yellow-600">45 kg/ha</span>
                <span className="block text-xs text-yellow-600">Moderate</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium">Phosphorus</span>
              <div className="text-right">
                <span className="font-bold text-red-600">12 kg/ha</span>
                <span className="block text-xs text-red-600">Low</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Potassium</span>
              <div className="text-right">
                <span className="font-bold text-blue-600">180 kg/ha</span>
                <span className="block text-xs text-blue-600">High</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800">Recommendations</h4>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• Apply phosphorus fertilizer (DAP - 50 kg/acre)</li>
              <li>• Reduce potassium input this season</li>
              <li>• Add organic matter to improve soil health</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentPage === "login" && <LoginPage />}
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "prediction" && <PredictionPage />}
      {currentPage === "disease" && <DiseasePage />}
      {currentPage === "market" && <MarketPage />}
      {currentPage === "weather" && <WeatherPage />}
      {currentPage === "notifications" && <NotificationsPage />}
      {currentPage === "calendar" && <CalendarPage />}
      {currentPage === "soil" && <SoilPage />}
      {currentPage === "analytics" && <AnalyticsPage />}
      {currentPage === "chat" && <ChatPage />}
      {currentPage === "settings" && <SettingsPage />}
    </div>
  )
}

export default CropYieldApp
