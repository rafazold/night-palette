import React, { useState, useRef } from 'react';
import Palette from '../shared/Palette.jsx';
import ColorPicker from './ColorPicker.jsx';
import useOnClickAway from '../../hooks/clickAway.jsx'

const CreateCard = ({className, ...props}) => {
    const initialColors = [
        {"color": "#e3e3e3", "hex": "#e3e3e3", "id": "ultra-light" },
        { "color": "#bfbfbf", "hex": "#bfbfbf", "id": "light" },
        { "color": "#919191", "hex": "#919191", "id": "medium" },
        { "color": "#6f6f6f", "hex": "#6f6f6f", "id": "darker" },
        { "color": "#262626", "hex": "#262626", "id": "dark" }
    ]
    const [colors, setColors] = useState(initialColors);
    const [currentColor, setCurrentColor] = useState({color:'', index:''});
    const [edit, setEdit] = useState(false);
    const handleChangeColor = (e) => {
        setEdit(true);
        let newProfile = [...colors]
        newProfile[currentColor.index] = {
            'color': e,
            'hex': e,
            'id': e + currentColor.index
        }
        setColors(newProfile);

    };
    const handleColorClick = (index) => {
        const current = {
            color: colors[index],
            index: index
        };
        setCurrentColor(current);
        setEdit(true)
        console.log(currentColor.color.hex)
    }
    const ref = useRef();
    useOnClickAway(ref, () => setEdit(false));

    return (
        <div className={['comp-create-card','text-white h-40', className].filter(Boolean).join(' ')} {...props}>CREATE CARD
            <div ref={ref} className='h-full w-3/5 mx-auto py-16 px-10 max-w-3xl relative'>
                <Palette 
                className="h-full w-full cursor-pointer" 
                colors={colors} 
                colorOnClick={handleColorClick}
                activeColor={edit && currentColor.index}/>

                {edit && <ColorPicker
                hex={currentColor.color.hex}
                colorOnChange={handleChangeColor}
                className='absolute top-0 right-0'
                />}
            </div>
        </div>
    )
}

export default CreateCard