import { Button } from "@/components/ui/button";
import logo from "../../assets/logo.webp"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

// Importing images for category icons
import spicesIcon from "../../assets/spiceicon.webp";
import dryFruitsIcon from "../../assets/dry.webp";
import coffeeIcon from "../../assets/coffee.webp";
import specialsIcon from "../../assets/idukki.webp";
import powdersIcon from "../../assets/powder.webp";
import { Label } from "@radix-ui/react-dropdown-menu";

const categoriesWithIcon = [
  { id: "spices", label: "Spices", icon: spicesIcon },
  { id: "dryfruits", label: "Dry Fruits", icon: dryFruitsIcon },
  { id: "coffee", label: "Coffee & Tea", icon: coffeeIcon },
  { id: "specials", label: "Idukki Specials", icon: specialsIcon },
  { id: "powders", label: "Masala Powders", icon: powdersIcon },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  // console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categoriesWithIcon.map((categoryItem) => (
        <Card
          key={categoryItem.id}
          onClick={() => handleNavigateToListingPage(categoryItem, "category")}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <CardContent className="flex flex-col items-center justify-center p-8 h-[200px]">
            <img
              src={categoryItem.icon}
              alt={`${categoryItem.label} Icon`}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <span className="font-bold text-lg">{categoryItem.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>


      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
     {/* Footer Section */}
<footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
    {/* Logo Section */}
    <div className="flex flex-col items-start mb-6 md:mb-0">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-20 w-auto mr-2" />
        
      </div>
    </div>

    {/* Navigation Links */}
    <div className="mb-6 md:mb-0">
      <nav className="space-y-2">
        <Label
          onClick={() => navigate("/shop/home")}
          className="block cursor-pointer hover:text-gray-300"
        >
          Home
        </Label>
        <Label
          onClick={() => navigate("/shop/listing")}
          className="block cursor-pointer hover:text-gray-300"
        >
          Products
        </Label>
        <Label
          onClick={() => navigate("/about")}
          className="block cursor-pointer hover:text-gray-300"
        >
          About Us
        </Label>
        <Label
          onClick={() => navigate("/contact")}
          className="block cursor-pointer hover:text-gray-300"
        >
          Contact
        </Label>
        <Label
          onClick={() => navigate("/faq")}
          className="block cursor-pointer hover:text-gray-300"
        >
          FAQ
        </Label>
      </nav>
    </div>

    {/* Contact and Social Media */}
    <div className="flex flex-col items-start md:items-end">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>info@naturespicy.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5" />
          <span>+91 9876543210</span>
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        <Button
          as="a"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="icon"
          className="hover:text-gray-300"
        >
          <Facebook className="h-6 w-6" />
        </Button>
        <Button
          as="a"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="icon"
          className="hover:text-gray-300"
        >
          <Twitter className="h-6 w-6" />
        </Button>
        <Button
          as="a"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="icon"
          className="hover:text-gray-300"
        >
          <Instagram className="h-6 w-6" />
        </Button>
      </div>
    </div>
  </div>

  <div className="text-center mt-6 text-sm">
    © 2024 Nature Spicy. All rights reserved.
  </div>
</footer>


    </div>
  );
}

   

export default ShoppingHome;
