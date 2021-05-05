import React, { useContext } from 'react';
import Card from './Card.jsx';
import context from '../../context/context.js';

const CardList = ({ list = [], type = 'D' }) => {
  const { selectedCard, setSelectedCard } = useContext(context);
  const selectCard = (key, row, type) => {
    selectedCard['key'] === key
      ? setSelectedCard('')
      : setSelectedCard({ key, row, type });
  };
  return (
    <>
      {list.map((row, index) => {
        return (
          <div key={'R' + index + type} className="flex w-full">
            {row.map(({ id, colors }) => {
              return (
                <Card
                  onClick={() => selectCard(id, index, type)}
                  palette={colors}
                  key={id}
                  expanded={selectedCard['key'] === id}
                  shrink={
                    selectedCard['key'] !== id &&
                    selectedCard['row'] === index &&
                    selectedCard['type'] === type
                  }
                  className="transform transition-all ease-out duration-300"
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default CardList;
