## 1. node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" //generate jwt_key
# 2. npm i express 
# 3. npm i bcryptjs
# 4. npm i mongoose
# 5. npm i dotenv
# 6. npm i cors
# 7. npm i nodemailer
# 8. npm i jsonwebtoken
# 9. npm i cookie-parser
# 10. npm install multer cloudinary
# 11. npm i razorpay
      1. Steps already mention on the frontend readme file

      2. export let instance = new Razorpay({
            key_id: ENV.ROZAR_API_KEY,
            key_secret: ENV.ROZAR_SECRET_KEY,
        });

        const razorOrder = instance.orders.create({
                //user pay total
                amount: Math.round(totalAmount * 100)  //conver to rupyee to paise 
                currency: "INR",
                receipt: `receipt_${Date.now()}`//download the receipt
            })
# 12 npm i socket.io 
# 13 npm install resend [for email sending]