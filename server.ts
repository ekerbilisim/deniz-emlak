import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for rate limiting (reset on server restart)
  const submissionTracker = new Map<string, { count: number; date: string }>();

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    // Basic IP-based rate limiting (2 per day)
    const clientIp = (req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "unknown").split(',')[0].trim();
    const today = new Date().toLocaleDateString('tr-TR'); // Use Turkish locale date for consistency

    const userRecord = submissionTracker.get(clientIp);

    if (userRecord && userRecord.date === today) {
      if (userRecord.count >= 2) {
        return res.status(429).json({ 
          error: "Günlük limitinize ulaştınız. Günde en fazla 2 kez form gönderebilirsiniz. Lütfen yarın tekrar deneyin." 
        });
      }
      userRecord.count += 1;
    } else {
      submissionTracker.set(clientIp, { count: 1, date: today });
    }

    const { firstName, lastName, phone, message } = req.body;

    if (!firstName || !lastName || !phone || !message) {
      return res.status(400).json({ error: "Lütfen tüm zorunlu alanları doldurun." });
    }

    try {
      const host = process.env.SMTP_HOST;
      const port = parseInt(process.env.SMTP_PORT || "587");
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      const recipientEmail = "ahmetdursun6638@icloud.com";

      if (!host || !user || !pass) {
        return res.status(200).json({ 
          success: true, 
          simulated: true,
          message: "Mesajınız iletildi (Demo Modu: SMTP ayarları yapılandırılmamış)." 
        });
      }

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      const mailOptions = {
        from: `"Deniz Emlak Web" <${user}>`,
        to: recipientEmail,
        subject: `Yeni İletişim Formu: ${firstName} ${lastName}`,
        text: `Ad: ${firstName}\nSoyad: ${lastName}\nTelefon: ${phone}\n\nMesaj:\n${message}`,
        html: `<h3>Yeni İletişim Formı</h3><p><strong>Ad Soyad:</strong> ${firstName} ${lastName}</p><p><strong>Telefon:</strong> ${phone}</p><p><strong>Mesaj:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Mesajınız başarıyla gönderildi." });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ error: "E-posta gönderilirken bir hata oluştu." });
    }
  });

  // Diagnostic route for key verification
  app.get("/api/diag", (req, res) => {
    res.json({
      smtpHost: !!process.env.SMTP_HOST,
      smtpUser: !!process.env.SMTP_USER,
      smtpPass: !!process.env.SMTP_PASS,
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
