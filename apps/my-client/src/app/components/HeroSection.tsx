// src/components/HeroSection.js
import React from 'react';

// const HeroSection = () => {
//   return (
//     <div className="bg-blue-600 text-white py-20">
//       <div className="container mx-auto text-center">
//         <h1 className="text-4xl font-bold mb-4">Welcome to R.T.E</h1>
//         <p className="text-lg mb-8">
//           Discover and create amazing events in real-time.
//         </p>
//         <a href="signup" className="bg-white text-blue-600 px-6 py-3 rounded-full">
//           Get Started
//         </a>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
// import React from 'react';
// import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-blue-600 text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">Welcome to R.T.E</h1>
        <p className="text-lg lg:text-xl mb-8">
          Discover and create amazing events in real-time.
        </p>
        <Link to="/signup" className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-blue-100 hover:text-blue-800 transition duration-300">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
