import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
  cancelOrder,
  createPaymentForPendingOrder,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Footer } from "@/components/layout/Footer";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const { toast } = useToast();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  function handleCancelOrder() {
    dispatch(cancelOrder(selectedOrderId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllOrdersByUserId(user?.id));
        toast({
          title: "Order cancelled successfully",
        });
      }
    });
    setOpenCancelDialog(false);
  }

  async function handlePayNow(orderId, totalAmount) {
    try {
      const result = await dispatch(
        createPaymentForPendingOrder(orderId)
      ).unwrap();

      if (result.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: totalAmount * 100,
          currency: "INR",
          name: "Nature Spicy",
          description: "Order Payment",
          order_id: result.razorpayOrderId,
          handler: async (response) => {
            try {
              const captureRes = await axios.post(
                `${process.env.VITE_API_URL}/api/shop/order/capture`,
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: result.orderId,
                }
              );

              if (captureRes.data.success) {
                toast({
                  title: "Payment successful",
                });
                dispatch(getAllOrdersByUserId(user?.id));
                window.location.href = "/shop/payment-success";
              }
            } catch (error) {
              toast({
                title: "Payment failed",
                variant: "destructive",
              });
            }
          },
          prefill: {
            name: user.userName,
            email: user.email,
          },
          modal: {
            ondismiss: function () {
              toast({
                title: "Payment cancelled by user",
                variant: "destructive",
              });
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      toast({
        title: "Error initiating payment",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>
                      {orderItem?.cartItems?.map((item) => (
                        <div key={item.productId}>{item.title}</div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {orderItem?.orderDate
                        ? new Date(orderItem.orderDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>₹ {orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        {orderDetails && (
                          <ShoppingOrderDetailsView
                            orderDetails={orderDetails}
                          />
                        )}
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      {orderItem?.orderStatus === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            onClick={() => {
                              setSelectedOrderId(orderItem?._id);
                              setOpenCancelDialog(true);
                            }}
                          >
                            Cancel Order
                          </Button>
                          <Button
                            variant="default"
                            onClick={() =>
                              handlePayNow(
                                orderItem?._id,
                                orderItem?.totalAmount
                              )
                            }
                          >
                            Pay Now
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
      <AlertDialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently cancel your
              order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelOrder}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
    
  );
}

export default ShoppingOrders;
