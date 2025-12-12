import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Page Heading */}
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">
                About TicketBari
            </h1>

            {/* Intro Section */}
            <p className="text-lg text-center mb-10 text-gray-700 max-w-3xl mx-auto">
                TicketBari is your one-stop platform to book travel tickets quickly and securely.
                Whether you're traveling by bus, train, launch, or plane, our mission is to make
                your journey seamless, convenient, and enjoyable.
            </p>

            {/* Key Features Section */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Easy Booking</h2>
                    <p className="text-gray-600">
                        Discover available tickets, check schedules, and book your journey with just a
                        few clicks. Our platform ensures a smooth and intuitive booking experience.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Secure Payments</h2>
                    <p className="text-gray-600">
                        Complete your transactions safely using modern payment gateways. TicketBari
                        guarantees secure and reliable payment processing for all your bookings.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Real-Time Availability</h2>
                    <p className="text-gray-600">
                        Stay updated with live ticket availability, departure times, and pricing.
                        Never miss out on your preferred route or timing.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Smart Recommendations</h2>
                    <p className="text-gray-600">
                        Get personalized suggestions based on popular routes, trending destinations,
                        and your past bookings. Travel planning has never been easier.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="mt-12 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold mb-4 text-primary">Our Mission</h2>
                <p className="text-gray-700 text-lg">
                    At TicketBari, we believe travel should be simple, fast, and stress-free. Our
                    goal is to connect people to their destinations effortlessly, providing a
                    seamless booking experience that saves time and ensures peace of mind.
                </p>
            </div>

            {/* Closing Section */}
            <div className="mt-12 text-center">
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Join TicketBari today and enjoy a smarter way to plan your travels. From
                    daily commutes to long-distance trips, we are committed to making every
                    journey memorable.
                </p>
            </div>
        </div>
    );
};

export default About;
