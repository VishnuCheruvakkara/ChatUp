import React from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import HeroImage from "../assets/images/chat.png"
import Button from '../components/Button';
import { Outlet } from 'react-router-dom';

function LandingLayout() {
    return (
        <>
            {/* NavBar */}
            <NavBar />


            {/* Hero Section */}
            <section className="w-full min-h-[80vh] bg-bgBase  flex flex-col md:flex-row items-center justify-between sm:px-6 px-6 lg:px-40 py-10">
                {/* Left Side: Text */}
                <div className="flex-1 sm:w-[400px] w-full md:text-left space-y-6">
                   <Outlet />
                </div>

                {/* Right Side: Image */}
                <div className="flex-1 mt-10 md:mt-0 flex justify-center">
                    <img
                        src={HeroImage}
                        alt="Chat App"
                        className="w-full max-w-md object-contain"
                    />
                </div>
            </section>


            {/* Footer */}
            <Footer />

        </>
    );
}

export default LandingLayout;
