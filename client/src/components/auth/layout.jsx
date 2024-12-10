import { Outlet } from "react-router-dom";
// Import the image
import carouselImage from "../../assets/idukki.webp"; 

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section with Image */}
      <div
        className="hidden lg:flex items-center justify-center w-1/2 px-12"
        style={{
          backgroundImage: `url(${carouselImage})`, // Use the imported image here
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-md space-y-6 text-center text-white bg-black/10 p-6 rounded-md">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to Nature Spicy
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
