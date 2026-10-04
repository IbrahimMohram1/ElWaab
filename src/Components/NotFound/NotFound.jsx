import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <>
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-5 bg-[#474343]">
      <p className="text-xl font-bold text-[#7A6232] capitalize"> Error 404</p>
      <h1 className="text-xl secondFont text-black mt-4">Page Not Found</h1>
      <p className="text-lg text-white mt-4 instrument-sans">The page you’re looking for may have moved or no longer
exists. Head back to the homepage to keep browsing.</p>

<Link to="/"><button className="bg-[#193828] hover:bg-[#5a4520] font-light flex items-center gap-x-3 text-white rounded-md font-bold py-4 px-4 mt-4">
  Back to Homepage  <FaArrowRightLong />

</button></Link>
    </div>
    
  
  
  
  
  
  
  </>


}
