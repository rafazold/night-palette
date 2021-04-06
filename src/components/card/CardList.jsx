import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import data from '../../assets/_default-palettes.json';

const CardList = ({ palettes = data, className, ...props }) => {
  const [selected, setSelected] = useState('');
  const [rows, setRows] = useState([]);
  const groupArray = (arr, innerArrLength) => {
    let finalArr = [];
    let stack = [];
    arr.forEach((item, i) => {
      if ((i + 1) % innerArrLength === 0 || i + 1 === arr.length) {
        stack.push({ id: `R${finalArr.length}I${i + 1}`, items: item });
        finalArr.push(stack);
        stack = [];
      } else {
        stack.push({ id: `R${finalArr.length}I${i + 1}`, items: item });
      }
    });
    return finalArr;
  };
  const selectCard = (key, row, items) => {
    selected['key'] === key ? setSelected('') : setSelected({ key, row });
    console.log(items);
  };

  useEffect(() => {
    setRows(groupArray(data, 5));
  }, [data]);

  return (
    <div
      className={['flex flex-wrap mx-auto justify-center', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {rows.map((row, index) => (
        <div key={'R' + index} className="flex w-full">
          {row.map(({ items, id }) => {
            selected && console.log(selected['key'], selected['row']);
            return (
              <Card
                onClick={() => selectCard(id, index, items)}
                palette={items}
                key={id}
                expanded={selected['key'] === id}
                shrink={selected['key'] !== id && selected['row'] === index}
                className="transform transition-all ease-out duration-300"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CardList;
