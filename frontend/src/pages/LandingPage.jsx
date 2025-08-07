import React from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import HeroImage from "../assets/images/chat.png"
import Button from '../components/Button';

function LandingPage() {
    return (
        <>
            {/* NavBar */}
            <NavBar />


            {/* Hero Section */}
            <section className="w-full min-h-[80vh] bg-bgBase flex flex-col md:flex-row items-center justify-between px-6 lg:px-40 py-10">
                {/* Left Side: Text */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary">
                        Connect. Chat. Collaborate.
                    </h2>
                    <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0">
                        Real-time messaging for you and your teams. Fast, secure, and beautifully designed.
                    </p>
                    <Button className='py-3 '>Get Started</Button>
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

export default LandingPage;
