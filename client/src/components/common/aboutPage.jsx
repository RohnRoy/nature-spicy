import React from "react";
import { Footer } from "@/components/layout/Footer";
import ShoppingHeader from "../shopping-view/header";

import image2 from "../../assets/2.jpeg";
import pepp from "../../assets/pepp.jpg";

function About() {
  return (
    <>
      <ShoppingHeader />
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Welcome to Nature Spicy! We take pride in delivering the finest
            organic spices directly from our farm to your table. Our mission is
            to promote healthy living by providing natural and sustainably
            sourced spices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              At Nature Spicy, we believe in the power of nature. Our journey
              started with a commitment to grow the highest quality organic
              spices on our own farm, ensuring every product is free from
              harmful chemicals and additives. From turmeric to cardamom, our
              spices are cultivated using sustainable farming methods that
              preserve soil health and biodiversity.
            </p>
            <p className="text-gray-600 mb-4">
              Our team works tirelessly to ensure that every product we offer
              meets the highest standards of quality and flavor. Whether you’re
              cooking your favorite recipes or experimenting with new ones, our
              spices are here to elevate your dishes.
            </p>
          </div>
          <div>
            <img
              src={image2}
              alt="Our Farm"
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
          <div>
            <img
              src={pepp} 
              alt="Organic Spices"
              className="rounded-lg shadow-md w-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li className="mb-2">100% organic and natural spices</li>
              <li className="mb-2">Sustainably sourced from our own farm</li>
              <li className="mb-2">
                No harmful chemicals or artificial additives
              </li>
              <li className="mb-2">Commitment to quality and freshness</li>
              <li className="mb-2">Direct farm-to-table supply chain</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            Our mission is to bring the taste of nature into every home. By
            offering organic spices that are both flavorful and healthy, we aim
            to inspire healthier lifestyles and support sustainable farming
            practices.
          </p>
          <p className="text-gray-600">
            Thank you for being part of our journey. Together, we can create a
            healthier, more sustainable future.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
