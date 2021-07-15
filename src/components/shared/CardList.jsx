import React, { useContext } from 'react';
import Card from './Card.jsx';
import context from '../../context/context.js';

const CardList = ({ list = [], type = 'D' }) => {
  const width = {
    1: 'lg:w-4/5',
    2: 'lg:w-3/5',
    3: 'lg:w-2/5',
    4: 'lg:w-1/5',
  };
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
            className={[
              'comp-card-list',
              'flex',
              'flex-col',
              'justify-between',
              'lg:flex-row',
              'w-full',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {row.map(({ id, colors, likes, createdAt }) => {
              return (
                <Card
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(e, id, index, type);
                  }}
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
            {row.length < 5 && (
              <div
                className={['hidden lg:block', width[row.length]]
                  .filter(Boolean)
                  .join(' ')}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default CardList;
