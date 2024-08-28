import React from 'react'; 
import logo from '../Images/com.png';

function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-6 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
          </div>
         
          <div className="space-y-4">
            <h2 className="font-medium">Opening Hours</h2>
            <p>Monday to Friday - 9:00 am to 5:00 pm</p>
            <p>Saturday - 9:00 am to 1:30 pm</p>
          </div>

          <div className="space-y-4">
            <h2 className="font-medium">Company</h2>
            <p>About Us</p>
          </div>
    
          <div className="space-y-4">
            <h2 className="font-medium">Contact Us</h2>
            <p>NO.257, Colombo RD, Peradeniya</p>
            <p>
              <a href="tel:0812387747" className="text-blue-500 hover:text-blue-700">
                0812 387 747
              </a>
            </p>
            <p>
              <a href="tel:0716635635" className="text-blue-500 hover:text-blue-700">
                0716 635 635
              </a>
            </p>
            <p>
              <a href="tel:0771010885" className="text-blue-500 hover:text-blue-700">
                0771 010 885
              </a>
            </p>
          </div>
        </div>
        {/* Bottom Info */}
        <div className="mt-8 text-sm text-center">
          <p className="font-medium">&copy; 2024 Ha, Inc.</p>
          <div className="flex justify-center mt-2">
            <a href="#" className="text-blue-500 hover:text-blue-700 mr-4 font-medium">
              Privacy Terms
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700 font-medium">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;