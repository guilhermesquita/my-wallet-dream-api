import nodemailer from 'nodemailer'

export interface bodyEmail {
  to: string
  subject: string
  html: string
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'guirozmesquita@gmail.com',
    pass: 'zipl xdgs dcdc zikk'
  },
  tls: {
    rejectUnauthorized: false
  }
})

export const sendEmail = async ({
  to,
  subject,
  html
}: bodyEmail): Promise<void> => {
  const mailOptions = {
    from: 'guirozmesquita@gmail.com',
    to,
    subject,
    html
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.response)
  } catch (error) {
    console.error('Erro ao enviar email:', error)
  }
}
