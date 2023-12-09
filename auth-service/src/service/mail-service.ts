import nodemailer from 'nodemailer'

// {
//   host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//   secure: false,
//   auth: {
//   user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
// },

class MailService {
  transporter
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }
  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на ${process.env.CLIENTR_URL}`,
      text: '',
      html: `
      <div>
        <h1>Для активации нажмите на кнопку</h1>
          <button>
          <a href="${link}">Кнопка</a>
         </button>
      </div>  
`,
    })
  }
}

export default new MailService()
