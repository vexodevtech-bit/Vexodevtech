import nodemailer from 'nodemailer';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildSubjectLabel(subject) {
  const map = {
    fivem: 'Projekt FiveM',
    web: 'Strona Web',
    other: 'Inne',
  };
  return map[subject] || subject || 'Nowa wiadomość';
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, subject, message } = req.body || {};
  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim();
  const cleanSubject = buildSubjectLabel(subject);
  const cleanMessage = (message || '').trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeSubject = escapeHtml(cleanSubject);
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br />');

  const inboxEmail = process.env.EMAIL_TO || 'vexodevtech@gmail.com';

  const adminMailOptions = {
    from: `"VEXO OS - Kontakt" <${process.env.EMAIL_USER}>`,
    to: inboxEmail,
    replyTo: cleanEmail,
    subject: `[VEXO-CONTACT] ${cleanSubject} od ${cleanName}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background-color: #020617; color: #f8fafc; border-radius: 20px;">
        <h2 style="color: #00f3ff; text-transform: uppercase; letter-spacing: 2px;">Nowe zgłoszenie w systemie</h2>
        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(0,243,255,0.2);">
          <p><strong>Od:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Temat:</strong> ${safeSubject}</p>
          <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
          <p><strong>Wiadomość:</strong></p>
          <p style="white-space: pre-wrap; color: #94a3b8;">${safeMessage}</p>
        </div>
      </div>
    `,
  };

  const autoReplyOptions = {
    from: `"VEXO OS - System" <${process.env.EMAIL_USER}>`,
    to: cleanEmail,
    subject: `[POTWIERDZENIE] Twoje zgłoszenie zostało przyjęte - VEXO OS`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background-color: #020617; color: #f8fafc; border-radius: 30px; border: 1px solid #00f3ff; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00f3ff; font-weight: 900; letter-spacing: -1px; margin: 0;">VEXO<span style="color: #fff;"> OS</span></h1>
          <p style="font-size: 10px; color: #94a3b8; letter-spacing: 3px; text-transform: uppercase;">System_Auto_Response // v2.0</p>
        </div>

        <div style="background: rgba(0,243,255,0.03); padding: 30px; border-radius: 20px; border: 1px solid rgba(0,243,255,0.1);">
          <p style="font-size: 18px; color: #fff;">Witaj, <span style="color: #00f3ff; font-weight: bold;">${safeName}</span>!</p>
          <p style="color: #94a3b8; line-height: 1.6;">Twoje zgłoszenie dotyczące sekcji <strong>${safeSubject.toUpperCase()}</strong> zostało pomyślnie zarejestrowane w naszym systemie.</p>

          <div style="margin: 30px 0; padding: 15px; border-left: 3px solid #00f3ff; background: rgba(255,255,255,0.02);">
            <p style="font-size: 12px; margin: 0; color: #00f3ff;">STATUS ZGŁOSZENIA:</p>
            <p style="font-size: 16px; font-weight: bold; margin: 5px 0; color: #fff;">OCZEKUJĄCY_NA_WERYFIKACJĘ</p>
          </div>

          <p style="color: #94a3b8; line-height: 1.6;">Nasz zespół sprawdzi Twoją wiadomość w ciągu najbliższych <strong>24 godzin</strong>. Otrzymasz powiadomienie, gdy status zgłoszenia ulegnie zmianie.</p>
        </div>

        <div style="text-align: center; margin-top: 30px; color: #475569; font-size: 12px;">
          <p>Wiadomość wygenerowana automatycznie przez system VEXO OS.</p>
          <div style="margin-top: 10px;">
            <a href="https://discord.com/users/1118181636183015485" style="color: #5865F2; text-decoration: none; margin: 0 10px;">Discord</a>
            <span style="color: #1e293b;">|</span>
            <span style="color: #94a3b8; margin: 0 10px;">${escapeHtml(inboxEmail)}</span>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(autoReplyOptions);
    return res.status(200).json({ message: 'Wiadomość wysłana pomyślnie!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Błąd podczas wysyłania wiadomości.' });
  }
}
