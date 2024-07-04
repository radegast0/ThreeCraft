import React, { useEffect, useState } from 'react';
import useCubeStore from './store';
import dirtTexture from './assets/dirt.jpg';
import glassTexture from './assets/glass.png';
import logTexture from './assets/log.jpg';
import grassTexture from './assets/grass.jpg';

const textures = {
	dirt: dirtTexture,
	glass: glassTexture,
	log: logTexture,
	grass: grassTexture,
};

const TextureSelector = () => {
	const setSelectedTexture = useCubeStore((state) => state.setSelectedTexture);
	const [activeButton, setActiveButton] = useState('dirt'); // State to track active button

	// Function to handle texture change based on button click
	const handleButtonClick = (texture) => {
		setSelectedTexture(texture);
		setActiveButton(texture); // Update active button state
	};

	// Function to handle texture change based on key press
	const handleKeyDown = (event) => {
		switch (event.key) {
			case '1':
				setSelectedTexture('dirt');
				setActiveButton('dirt');
				break;
			case '2':
				setSelectedTexture('glass');
				setActiveButton('glass');
				break;
			case '3':
				setSelectedTexture('log');
				setActiveButton('log');
				break;
			case '4':
				setSelectedTexture('grass');
				setActiveButton('grass');
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		// Add event listener for keydown event
		window.addEventListener('keydown', handleKeyDown);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [setSelectedTexture]); // Ensure setSelectedTexture is included in dependencies

	return (
		<div className="absolute z-50 bottom-1/4 flex flex-row gap-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			{Object.keys(textures).map((textureKey) => (
				<button
					key={textureKey}
					className={`border-2 text-white ${activeButton === textureKey ? 'border-black' : ''}`}
					onClick={() => handleButtonClick(textureKey)}
				>
					<img
						src={textures[textureKey]}
						alt={`${textureKey.charAt(0).toUpperCase() + textureKey.slice(1)} Texture`}
						className="w-10 h-10"
					/>
				</button>
			))}
		</div>
	);
};

export default TextureSelector;
