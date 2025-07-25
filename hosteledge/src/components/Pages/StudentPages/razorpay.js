// Backend: Razorpay setup
const options = {
    amount: 10000, // in paise
    currency: "INR",
    method: "upi",
    upi: {
      vpa: "user@okaxis"
    }
  };
  