import React from 'react';
import CreateCard from '../components/createCard/CreateCard.jsx';

const Create = () => {
  return (
    <div className="w-full h-full bg-black text-center text-light-gray overflow-hidden">
      <div className="pt-16 text-3xl">Create a Dark Mode Palette!</div>
      <div className="text-lg font-light">
        Click on the palette to choose combinations
      </div>
      <CreateCard />
    </div>
  );
};

export default Create;