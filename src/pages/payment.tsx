import { useState } from "react";
import "../styles/payment.css";
import Razorpay from "razorpay-typescript";

function Payment() {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (amount === "") {
      alert("please enter amount");
    } 
    var options = {
      key: "rzp_test_LrdMrDqsLAoFTX",
      key_secret: "kwE9u16UvqImUD4rU6kkYoq8",
      amount: "100",
      currency: "INR",
      name: "WeOneInfotech",
      description: "ok",
      handler: function (response: any) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "purushottam",
        email: "sonu001729@gmail.com",
        contact: "7028759701",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#34dbd0"
      },
      modal: {
        height: "50%",
        marginTop: "20px",
      }
    };

    var rzp = (window as any).Razorpay(options)
    rzp.open(); // key not required
  };

  return (
    <div id="payment-input-container">
      <div id="PaymentContainer">
        <h2 id="paymentTitle">Razorpay Payment Integration Using React</h2>
        <input
          id="amountField"
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button id="checkout-btn" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
}

export default Payment;
