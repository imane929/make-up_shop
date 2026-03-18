const router = require("express").Router();
const nodemailer = require("nodemailer");

// Email configuration - configure with your SMTP settings
// For Gmail: Use App Password (not regular password)
// For testing: Use Mailtrap, Ethereal, or similar

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send order email
router.post("/send-order", async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, address, city, zip, products, total, orderNumber } = req.body;

    if (!customerName || !customerEmail || !products || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create order email content
    const productsList = products
      .map((item) => {
        let details = `${item.name || item.productId} x${item.quantity} - €${(item.price * item.quantity).toFixed(2)}`;
        if (item.color) details += `\n   Couleur: ${item.color}`;
        if (item.size) details += `\n   Taille: ${item.size}`;
        return `• ${details}`;
      })
      .join("\n");

    const emailContent = `
╔══════════════════════════════════════════════════════════════╗
║                     NOUVELLE COMMANDE                         ║
║                         BeauTen                                ║
╚══════════════════════════════════════════════════════════════╝

Numéro de Commande: ${orderNumber}
Date: ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMATIONS CLIENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom: ${customerName}
Email: ${customerEmail}
Téléphone: ${customerPhone || "Non fourni"}
Adresse: ${address}, ${city} ${zip || ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DÉTAILS DE LA COMMANDE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${productsList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOTAL: ${total.toFixed(2)} €

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mode de paiement: Paiement à la livraison / Sur place

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce message a été envoyé automatiquement par le système BeauTen.
    `.trim();

    // Try to send email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = createTransporter();

      // Send to shop owner
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to shop owner
        subject: `🔔 Nouvelle Commande #${orderNumber} - BeauTen`,
        text: emailContent,
      });

      // Send confirmation to customer
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: `✅ Confirmation de commande #${orderNumber} - BeauTen`,
        text: `
Bonjour ${customerName},

Merci pour votre commande chez BeauTen !

Numéro de commande: ${orderNumber}

Nous avons bien reçu votre commande et nous la traiterons sous peu.
Vous recevrez un email dès que votre commande sera prête.

Détails de votre commande:
${productsList}

Total: ${total.toFixed(2)} €

Mode de paiement: Paiement à la livraison

Adresse de retrait:
BeauTen - 123 Beauty Lane, New York, NY

Merci de votre confiance !
L'équipe BeauTen
        `.trim(),
      });

      console.log("Order emails sent successfully!");
    } else {
      // Log email content if not configured (for testing)
      console.log("\n" + "=".repeat(60));
      console.log("NEW ORDER (Email not configured - showing content):");
      console.log("=".repeat(60));
      console.log(emailContent);
      console.log("=".repeat(60) + "\n");
    }

    res.json({ success: true, message: "Order submitted successfully", orderNumber });
  } catch (err) {
    console.error("Error sending order email:", err);
    res.status(500).json({ message: "Error sending order", error: err.message });
  }
});

module.exports = router;
