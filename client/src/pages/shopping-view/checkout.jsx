import Address from "@/components/shopping-view/address";
import img from "../../assets/banner.webp";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Footer } from "@/components/layout/Footer";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  async function handleInitiateRazorpayPayment() {
    if(!currentSelectedAddress){
       return toast({
        title: "Please select an address to proceed",
        variant:"destructive"
      });
    }
    const response = await axios.post("http://localhost:5000/api/shop/order/create", {
      userId: user.id,
      cartId: cartItems._id,
      cartItems,
      totalAmount: totalCartAmount,
      addressInfo: currentSelectedAddress,
      orderStatus: "pending",
    });

    const { razorpayOrderId, orderId } = response.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: totalCartAmount * 100,
      currency: "INR",
      name: "Nature Spicy",
      description: "Order Payment",
      order_id: razorpayOrderId,
      handler: async (response) => {
        const captureRes = await axios.post("http://localhost:5000/api/shop/order/capture", {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          orderId,
        });

        if (captureRes.data.success) {
          window.location.href = "/shop/payment-success";
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 mb-8">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹ {totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiateRazorpayPayment} className="w-full">
              {isPaymentStart
                ? "Processing Razorpay Payment..."
                : "Checkout with Razorpay"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShoppingCheckout;
