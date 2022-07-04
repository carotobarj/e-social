import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"Books Market" <cuentas@booksmarket.com>',
    to: email,
    subject: "Books Market - Confirm your account",
    text: "Confirm your Books Market Account",
    html: `
        <h3>Hi ${nombre} please follow the link below to confirm your account</h3>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}"><h4>Confirm Account</h4></a>
        <p>If you were not the one who created the account you can ignore this email</p>
            `,
  });
}

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"Books Market" <cuentas@booksmarket.com>',
    to: email,
    subject: "Books Market - Reset your password",
    text: "Reset your account password on Books Market",
    html: `
        <p>Hi ${nombre} click on the link to enter a new password</p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> CHANGE PASSWORD </a>
        <p>If you were not the one who created the account you can ignore this email</p>
            `,
  });
};