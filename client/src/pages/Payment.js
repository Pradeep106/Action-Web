import axios from "axios";
import { useSelector } from "react-redux";

async function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function displayRazorpay(maxValue) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  try {
    const result = await axios.post("http://localhost:4000/api/v1/payment");

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    console.log("amount", maxValue);

    const options = {
      key: "rzp_test_iwloD5XK3tXD9v",
      amount: amount * 10,
      currency: currency,
      name: "Pradeep Corp.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:4000/api/v1/payment",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: "Pradeep yadav",
        email: "pradp137@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Pradeep Yadav Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Error displaying Razorpay:", error);
  }
}

export default displayRazorpay;
