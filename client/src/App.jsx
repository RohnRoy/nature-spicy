import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"


function App() {



  const {user, isAuthenticated, isLoading} = useSelector(state=> state.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  }, [dispatch]);

  if(isLoading) return <Skeleton className="w-[600px] h-[600px] rounded-full" />




  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* <h1>Header Component</h1> */}

      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          {/* Default Route for /admin */}
          
          {/* Other Admin Routes */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        {/* Shop Routes */}
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          {/* Child Routes */}
          
          <Route path="home" element={<ShoppingHome />}/>
          <Route path="listing" element={<ShoppingListing />}/>
          <Route path="checkout" element={<ShoppingCheckout />}/>
          <Route path="account" element={<ShoppingAccount />}/>
        </Route>
        
        
        {/* Not Found for unreognized urls */}
        <Route path="/unauth-page" element={<UnauthPage />}/>
        <Route path="*" element={<NotFound />} />
        


      </Routes>
    </div>
  );
}

export default App;