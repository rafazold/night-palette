import React, { useEffect, useState } from 'react';
import Card from '../shared/Card.jsx';
import { useParams } from 'react-router-dom';
import { getPaletteById } from '../../api/api';
import ShareIcon from '../../assets/images/icons/share-Icon.svg';
import { toast } from 'react-toastify';

const SingleCard = () => {
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const decodedId = id ? id.replaceAll('-', '#') : '';

  const shareClick = (e, link) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link).then((r) =>
      toast.dark('link copied to clipboard', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    );
  };

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
            className="lg:mx-auto"
          />
          <div className="flex items-center w-2/3 mx-auto justify-center gap-2 text-gray-600">
            <span>Keep On Sharing</span>
            <div className="relative w-3/4">
              <input
                className="border py-2 pl-2 pr-8 border-gray-600 text-gray-600 rounded-lg w-full text-sm bg-transparent"
                readOnly
                value={window.location.href}
              />
              <button
                className="absolute right-2 top-2"
                onClick={(e) => shareClick(e, window.location.href)}
              >
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default SingleCard;
