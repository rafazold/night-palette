import React, { useEffect, useState } from 'react';
import Card from '../shared/Card.jsx';
import { useParams } from 'react-router-dom';
import { getPaletteById } from '../../api/api';

const SingleCard = () => {
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const decodedId = id.replaceAll('-', '#');
  useEffect(() => {
    console.log(decodedId);
    getPaletteById(decodedId).then((data) => {
      data.length === 1 && setPalette(data[0]);
      console.log(data[0], data[0].colors);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {!loading ? (
        <div className="comp-single text-white flex flex-col justify-center">
          <div className="text-3xl text-center my-12">Share Palette</div>
          <Card
            id={id}
            palette={palette.colors}
            creationTime={palette.createdAt}
            likes={palette.likes}
            expanded
            className="mx-auto"
          />
          <div className="flex items-center w-2/3 mx-auto justify-center gap-2 text-gray-600">
            <span>Keep On Sharing</span>
            <input
              className="border p-2 border-gray-600 text-gray-600 rounded-lg w-3/4 text-sm bg-transparent"
              readOnly
              value={window.location.href}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default SingleCard;
