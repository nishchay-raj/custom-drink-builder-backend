import { transporter } from "../utils/transporter"

export const sendConfirmationEmail = async (orderId: string, email: string) => {
    await transporter.sendMail({
        from: '"D2S Dehradun Cafe" <sinha.divyshekhar2004@gmail.com>',
        to: email,
        subject: `Payment Successful for order number: ${orderId}`,
        html: "<h1> Thanks for your order. We are preparing your order. </h1>"
    })
}