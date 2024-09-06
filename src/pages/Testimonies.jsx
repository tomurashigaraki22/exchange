import React from 'react';
import testimoniesData from '../components/testimonies.json'; // Import the testimonies JSON file

const TestimoniesPage = () => {
    return (
        <div className="p-5 min-h-screen bg-gray-100">
            <h2 className="text-center text-3xl font-bold mb-10">Testimonies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {testimoniesData.map((testimony, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg shadow-lg text-center">
                        <img 
                            src={testimony.image} 
                            alt={testimony.name} 
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{testimony.name}</h3>
                        <p className="text-sm text-gray-600">{testimony.testimony}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimoniesPage;
