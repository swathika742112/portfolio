import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendContactEmail(data: {
  name: string
  email: string
  message: string
}) {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: data.email,
    subject: `New message from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px">
        <h2 style="color:#ff6b6b">New Portfolio Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <hr/>
        <p style="white-space:pre-wrap">${data.message}</p>
      </div>
    `,
  })
}
