import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-4xl">Payment Successful!</h1>
      <Button className="mt-5" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </div>
  );
}

export default PaymentSuccessPage;
