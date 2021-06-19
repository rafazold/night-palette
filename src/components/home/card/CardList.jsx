import React, { useContext } from 'react';
import Card from './Card.jsx';
import context from '../../../context/context.js';

const CardList = ({ list = [], type = 'D' }) => {
  const { selectedCard, setSelectedCard } = useContext(context);
  const selectCard = (key, row, type) => {
    selectedCard['key'] === key
      ? setSelectedCard('')
      : setSelectedCard({ key, row, type });
  };
  const handleClick = (e, id, index, type) => {
    e.preventDefault();
    e.stopPropagation();
    selectCard(id, index, type);
  };
  return (
    <>
      {list.map((row, index) => {
        return (
          <div
            key={'R' + index + type}
            className="comp-card-list flex flex-col lg:flex-row w-full mx-4"
          >
            {row.map(({ id, colors, likes, createdAt }) => {
              return (
                <Card
                  onClick={(e) => handleClick(e, id, index, type)}
                  palette={colors}
                  key={id}
                  id={id}
                  likes={likes}
                  creationTime={createdAt}
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
