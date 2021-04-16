import React, { useState } from 'react';
import CreateCard from '../components/createCard/CreateCard.jsx';

const Create = () => {
    return (
    <div className="w-full h-full bg-black text-center">
        <div className="text-white" >Create a Dark Mode Palette!</div>
        <div className="text-white" >Click on the palette to choose combinations</div>
       <CreateCard />
    </div>
)}

export default Create;