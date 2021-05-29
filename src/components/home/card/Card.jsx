import React, { useContext } from 'react';
import Palette from '../../shared/Palette.jsx';
import Star from '../../../assets/images/icons/star.svg';
import context from '../../../context/context';
import { addLIke, removeLike } from '../../../api/api';
import { toast } from 'react-toastify';
import moment from 'moment';

const Card = ({
  palette,
  id,
  expanded,
  shrink,
  likes,
  creationTime,
  className,
  ...props
}) => {
  const { user } = useContext(context);
  const isLiked = user ? likes.hasOwnProperty(user.uid) : false;

  const handleLike = (e, paletteId, liked = false) => {
    e.stopPropagation();
    if (!user) {
      toast.dark('please log in to like a palette', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    !isLiked
      ? addLIke(paletteId, user.uid).then(() =>
          console.log('added ====> \npalette : ', paletteId, 'user: ', user.uid)
        )
      : removeLike(paletteId, user.uid).then(() =>
          console.log(
            'removed ====> \npalette : ',
            paletteId,
            'user: ',
            user.uid
          )
        );
  };

  return (
    <div
      className={[
        'mx-4 px-4 pt-3 bg-card-gray shadow-main rounded-md mb-20 cursor-pointer',
        expanded ? 'lg:w-2/3' : shrink ? 'lg:w-1/5' : 'lg:w-60',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Palette colors={palette} cardId={id} tooltip className="h-72 lg:h-56" />
      <div
        className={[
          'flex',
          'justify-between',
          'h-16',
          'items-center',
          shrink && 'lg:hidden',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className="text-base flex items-center px-1.5 py-0.5 bg-black"
          onClick={(e) => handleLike(e, id)}
        >
          <Star
            className={['w-3', 'h-3', 'mr-3', isLiked && 'text-button-blue']
              .filter(Boolean)
              .join(' ')}
          />
          <span>{Object.keys(likes).length}</span>
        </div>
        <div className="text-sm text-gray-600">
          {creationTime && moment(creationTime.toDate()).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default Card;
