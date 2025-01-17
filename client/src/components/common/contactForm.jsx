import React from "react";
import { Footer } from "@/components/layout/footer"; // Updated import path
import { useForm } from "react-hook-form";
import axios from "axios";

function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://api.web3forms.com/submit", {
        access_key: "c876cc58-c65e-48b3-b59d-b82a45435776",
        ...data,
      });

      if (response.data.success) {
        alert("Message sent successfully!");
        reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 flex-col md:flex-row container mx-auto p-6">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019284635008!2d144.9630579153169!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d8b1e1e9e0e!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1633078871234!5m2!1sen!2sau"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                {...register("phone", { required: "Phone number is required", pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Message or Enquiry</label>
              <textarea
                {...register("message", { required: "Message or Enquiry is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;
