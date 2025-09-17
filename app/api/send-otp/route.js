import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in memory (⚠️ use DB/Redis in production)
    global.otpStore = {
      email,
      otp,
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}