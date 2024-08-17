import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import testimoniesData from './testimonies.json';  // Import the testimonies JSON file
import { useNavigate } from 'react-router-dom';

// Function to shuffle the testimonies
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const randomizedTestimonies = shuffleArray(testimoniesData).slice(0, 10);  // Randomize and limit to 10

const Testimony = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % randomizedTestimonies.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + randomizedTestimonies.length) % randomizedTestimonies.length);
    };

    const { name, testimony, image } = randomizedTestimonies[currentIndex];

    return (
        <div className="p-5 max-w-lg mx-auto mb-[60px]">
            <div className="flex flex-row items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">Testimonies</h2>
                <p 
                    className="text-blue-600 cursor-pointer" 
                    onClick={() => navigate("/testimonies")}
                >
                    See more
                </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <button 
                        onClick={handlePrevious} 
                        className="p-2 bg-gray-300 rounded-full"
                    >
                        <FaArrowLeft />
                    </button>
                    <button 
                        onClick={handleNext} 
                        className="p-2 bg-gray-300 rounded-full"
                    >
                        <FaArrowRight />
                    </button>
                </div>
                <div className="text-center">
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-black">{name}</h3>
                    <p className="text-sm text-black">{testimony}</p>
                </div>
            </div>
        </div>
    );
};

export default Testimony;
