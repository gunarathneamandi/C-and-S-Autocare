import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeProcess from '/Images/HomeProcess.png'; 

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide index

 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Set the duration for each slide in milliseconds
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // Update currentSlide state
  };

  return (
    <div className="bg-white font-sans">
      <div className="mt-1">
        <TopNav />
        <Slider {...settings}>
          <center>
            <div>
              <img
                src=""
                alt="Description of the image"
                className="w-full h-300px"
              />
            </div>
          </center>
          <center>
            <div>
              <img
                src="https://s3.amazonaws.com/fzautomotive/dealers/5775507c605b0.jpg"
                alt="Description of the image"
                className="w-full h-300px"
              />
            </div>
          </center>
        </Slider>
      </div>

     

      <section className="bg-white py-12 mt-10">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-blue-950 mb-4 text-center uppercase">
            Offering Quality Services
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400"
                alt="Vehicle Package 1"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Standard Package
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400"
                alt="Vehicle Package 2"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Full Service Package
                </h3>
                <p className="text-gray-600">
                Our Full Service Package ensures your vehicle's optimal performance.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400"
                alt="Vehicle Package 3"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Luxury Package
                </h3>
                <p className="text-gray-600">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400"
                alt="Vehicle Package 1"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Tune ups
                </h3>
                <p className="text-gray-600">
                Our tune-up service ensures your vehicle runs smoothly and efficiently.
                
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400"
                alt="Vehicle Package 2"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Oil Changing
                </h3>
                <p className="text-gray-600">
                Our mechanic advised the car owner to get an oil change.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400"
                alt="Vehicle Package 3"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Interior Cleaning
                </h3>
                <p className="text-gray-600">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">

        <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-blue-950 mb-4 text-center uppercase">
            Our Process
          </h2>
        <center>
          <img src="/Images/HomeProcess.png"></img>
          </center>
        </div>
      <div className="text-center mt-8">
        <button className="border-2 p-3 font-medium border-blue-950 text-blue-950 text-2xl">Book Now</button>
      </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-blue-950 mb-4 text-center uppercase">
            Testimonials
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-800 mb-4">
                "Amazing service! Highly recommended!"
              </p>
              <p className="text-gray-600">- John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-800 mb-4">
                "The best website I've ever used for managing my vehicles."
              </p>
              <p className="text-gray-600">- Jane Smith</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-800 mb-4">
                "Incredible features and user-friendly interface."
              </p>
              <p className="text-gray-600">- David Johnson</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;