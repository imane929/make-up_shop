
import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Fab,
  Zoom,
  Paper,
  Badge
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const responses = {
  greeting: [
    "Hello! 😊 Welcome to BeauTen! How can I assist you today?",
    "Hi there! 👋 Great to hear from you! What can I help you with?",
    "Hey! Welcome to BeauTen Beauty! How may I help you?"
  ],
  shipping: [
    "We offer free shipping on all orders over $50! Standard delivery takes 3-5 business days.",
    "Shipping is free for orders above $50. Express shipping is available for an additional fee.",
    "We deliver nationwide! Orders over $50 ship free. Need it faster? We offer express options too!"
  ],
  returns: [
    "We have a hassle-free 30-day return policy for unopened products. Simply contact us for a return label!",
    "Not satisfied? No worries! You can return any unopened items within 30 days for a full refund.",
    "Our return process is easy - 30 days, unopened products, full refund. Contact us to get started!"
  ],
  price: [
    "Our products are competitively priced! Check our 'Promotions' page for exclusive deals and discounts.",
    "We offer great value for premium quality! Don't forget to check our current deals and bundle offers.",
    "Prices vary by product. Visit our shop to see all options, and sign up for our newsletter for special offers!"
  ],
  products: [
    "We have a wide range of cosmetics and skincare products. Would you like recommendations based on your skin type?",
    "From foundations to serums, we have everything you need! What's your skin concern?",
    "Our products include skincare, makeup, and beauty tools. Can you tell me what you're looking for?"
  ],
  payment: [
    "We accept all major credit cards, PayPal, and Apple Pay for your convenience.",
    "You can pay securely using Visa, Mastercard, PayPal, or Apple Pay.",
    "Multiple payment options available! Credit cards, PayPal, and more are accepted."
  ],
  tracking: [
    "Once your order ships, you'll receive a tracking number via email. You can track your package on our website too!",
    "Track your order easily with the link in your shipping confirmation email.",
    "Your tracking number will be sent once your order is dispatched. Expected delivery: 3-5 business days."
  ],
  hours: [
    "Our support team is available 24/7! We're always here to help you.",
    "We're here for you around the clock! Contact us anytime, day or night.",
    "24/7 customer support means we're always just a message away!"
  ],
  contact: [
    "You can reach us at support.beauten@gmail.com or through this chat anytime!",
    "For immediate help, chat with us here. Or email us at support.beauten@gmail.com",
    "Need to speak with someone directly? Email us anytime and we'll respond promptly!"
  ],
  skincare: [
    "For skincare recommendations, we'd love to know your skin type - oily, dry, combination, or sensitive?",
    "Great question! What's your main skin concern - hydration, acne, anti-aging, or something else?",
    "We have amazing skincare products! Tell me about your skin type so I can suggest the best products for you."
  ],
  ingredients: [
    "All our products use premium, carefully selected ingredients. Check individual product pages for full ingredient lists.",
    "We prioritize clean beauty! Our formulas are cruelty-free and use quality ingredients.",
    "Quality is our priority - browse our products to see detailed ingredient information for each item."
  ],
  allergy: [
    "If you have specific allergies, please check the ingredient list on each product page before purchasing.",
    "We recommend doing a patch test with any new product. Check the ingredients list for potential allergens.",
    "Your safety matters! Review the full ingredient list on each product page to check for any sensitivities."
  ],
  bundle: [
    "Yes! We offer bundle deals where you can save up to 20% when buying multiple products.",
    "Check out our 'Sets & Bundles' section for amazing deals on product combinations!",
    "Bundle deals are available! Ask about our current offers when you find products you love."
  ],
  gift: [
    "What a great idea! We have beautiful gift wrapping available and gift cards too!",
    "We offer gift cards in various denominations - perfect for any beauty lover!",
    "Looking for a gift? Our gift cards and pre-wrapped gift sets make perfect presents!"
  ],
  thankyou: [
    "You're welcome! Is there anything else I can help you with? 😊",
    "Happy to help! Let me know if you have any other questions!",
    "My pleasure! Feel free to ask if you need anything else!"
  ],
  default: [
    "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our shop!",
    "I appreciate your question! A team member will follow up with you soon. Can I help with anything else?",
    "Great question! Our support team will respond within 24 hours. Is there anything else I can assist with?"
  ]
};

const getAutoResponse = (msg) => {
  const lower = msg.toLowerCase();
  
  if (/\b(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/.test(lower)) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }
  if (/\b(shipping|ship|delivery|deliver|delivered|shipping cost|delivery time)\b/.test(lower)) {
    return responses.shipping[Math.floor(Math.random() * responses.shipping.length)];
  }
  if (/\b(return|returns|refund|money back|exchange)\b/.test(lower)) {
    return responses.returns[Math.floor(Math.random() * responses.returns.length)];
  }
  if (/\b(price|prices|cost|expensive|cheap|affordable|deal|discount|offer|coupon)\b/.test(lower)) {
    return responses.price[Math.floor(Math.random() * responses.price.length)];
  }
  if (/\b(product|products|shop|buy|purchase|item|items|skincare|makeup|cosmetics)\b/.test(lower)) {
    return responses.products[Math.floor(Math.random() * responses.products.length)];
  }
  if (/\b(payment|pay|paid|card|credit|paypal|apple pay)\b/.test(lower)) {
    return responses.payment[Math.floor(Math.random() * responses.payment.length)];
  }
  if (/\b(track|tracking|where is my order|order status|when will i get)\b/.test(lower)) {
    return responses.tracking[Math.floor(Math.random() * responses.tracking.length)];
  }
  if (/\b(hours|open|available|when|time|24[\/]7|support hours)\b/.test(lower)) {
    return responses.hours[Math.floor(Math.random() * responses.hours.length)];
  }
  if (/\b(contact|email|phone|reach|talk|help|support|assistance)\b/.test(lower)) {
    return responses.contact[Math.floor(Math.random() * responses.contact.length)];
  }
  if (/\b(skin|skin care|facial|moisturizer|serum|cleanser|cream)\b/.test(lower)) {
    return responses.skincare[Math.floor(Math.random() * responses.skincare.length)];
  }
  if (/\b(ingredient|ingredients|organic|natural|chemical)\b/.test(lower)) {
    return responses.ingredients[Math.floor(Math.random() * responses.ingredients.length)];
  }
  if (/\b(allergy|allergic|sensitive|sensitivity|reaction)\b/.test(lower)) {
    return responses.allergy[Math.floor(Math.random() * responses.allergy.length)];
  }
  if (/\b(bundle|sets|套装|combo|collection)\b/.test(lower)) {
    return responses.bundle[Math.floor(Math.random() * responses.bundle.length)];
  }
  if (/\b(gift|present|wrapped|birthday|anniversary)\b/.test(lower)) {
    return responses.gift[Math.floor(Math.random() * responses.gift.length)];
  }
  if (/\b(thank|thanks|thank you|thx|ty)\b/.test(lower)) {
    return responses.thankyou[Math.floor(Math.random() * responses.thankyou.length)];
  }
  return responses.default[Math.floor(Math.random() * responses.default.length)];
};

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { user: "support", text: "Hello! 👋 Welcome to BeauTen Beauty! How can I help you today?" }
  ]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      setUnread(0);
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setUnread(0);
    }
  };

  const sendMessage = () => {
    if (!text.trim()) return;
    const userMsg = { user: "client", text };
    setMessages((prev) => [...prev, userMsg]);
    setText("");
    setIsTyping(true);
    
    const delay = 1000 + Math.random() * 1000;
    setTimeout(() => {
      setIsTyping(false);
      const response = getAutoResponse(text);
      setMessages((prev) => [...prev, { user: "support", text: response }]);
      if (!isOpen) {
        setUnread((prev) => prev + 1);
      }
    }, delay);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Zoom in={!isOpen}>
        <Fab
          onClick={toggleChat}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #C2185B 0%, #9C27B0 100%)",
              transform: "scale(1.1)"
            },
            transition: "transform 0.2s ease"
          }}
        >
          <Badge badgeContent={unread} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 18, height: 18 } }}>
            <ChatIcon />
          </Badge>
        </Fab>
      </Zoom>

      <Zoom in={isOpen}>
        <Paper
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: { xs: "95vw", sm: 360 },
            maxHeight: { xs: "85vh", sm: 480 },
            display: isOpen ? "flex" : "none",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(233, 30, 99, 0.3)",
            zIndex: 9999
          }}
        >
          <Box sx={{ background: "linear-gradient(135deg, #E91E63 0%, #C2185B 100%)", p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#4CAF50", animation: "pulse 2s infinite" }} />
              <Typography variant="h6" sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>BeauTen Support</Typography>
            </Box>
            <IconButton size="small" onClick={toggleChat} sx={{ color: "white", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflow: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5, backgroundColor: "#FFF8FA" }}>
            {messages.map((m, i) => (
              <Box key={i} sx={{ alignSelf: m.user === "client" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                <Box sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  backgroundColor: m.user === "client" ? "#E91E63" : "white", 
                  color: m.user === "client" ? "white" : "text.primary", 
                  boxShadow: 1,
                  borderBottomLeftRadius: m.user === "client" ? 4 : 16,
                  borderBottomRightRadius: m.user === "client" ? 16 : 4
                }}>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{m.text}</Typography>
                </Box>
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ alignSelf: "flex-start", maxWidth: "80%" }}>
                <Box sx={{ display: "flex", gap: 0.5, p: 1.5, borderRadius: 2, backgroundColor: "white", boxShadow: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#E91E63", animation: "bounce 1.4s infinite ease-in-out", "&:nth-of-type(1)": { animationDelay: "-0.32s" }, "&:nth-of-type(2)": { animationDelay: "-0.16s" } }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#E91E63", animation: "bounce 1.4s infinite ease-in-out", "&:nth-of-type(1)": { animationDelay: "-0.32s" }, "&:nth-of-type(2)": { animationDelay: "-0.16s" } }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#E91E63", animation: "bounce 1.4s infinite ease-in-out", "&:nth-of-type(1)": { animationDelay: "-0.32s" }, "&:nth-of-type(2)": { animationDelay: "-0.16s" } }} />
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ p: 1.5, backgroundColor: "white", borderTop: "1px solid #ffcdd2", display: "flex", gap: 1, alignItems: "flex-end" }}>
            <TextField 
              fullWidth 
              size="small" 
              placeholder="Type your message..." 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              onKeyPress={handleKeyPress}
              multiline
              maxRows={3}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
            />
            <IconButton 
              onClick={sendMessage} 
              disabled={!text.trim()} 
              sx={{ 
                backgroundColor: "#E91E63", 
                color: "white", 
                "&:hover": { backgroundColor: "#C2185B" }, 
                "&.Mui-disabled": { backgroundColor: "#e0e0e0" },
                transition: "all 0.2s ease"
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Zoom>

      <style>{`
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
      `}</style>
    </>
  );
}


