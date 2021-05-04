import React, { useContext } from 'react';
import Card from './Card.jsx';
import context from '../../context/context.js';

const CardList = ({ list = [] }) => {
  const { selectedCard, setSelectedCard } = useContext(context);
  const selectCard = (key, row) => {
    selectedCard['key'] === key
      ? setSelectedCard('')
      : setSelectedCard({ key, row });
  };
  return (
    <>
      {list.map((row, index) => (
        <div key={'R' + index} className="flex w-full">
          {row.map(({ items, id }) => {
            return (
              <Card
                onClick={() => selectCard(id, index, items)}
                palette={items}
                key={id}
                expanded={selectedCard['key'] === id}
                shrink={
                  selectedCard['key'] !== id && selectedCard['row'] === index
                }
                className="transform transition-all ease-out duration-300"
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default CardList;
