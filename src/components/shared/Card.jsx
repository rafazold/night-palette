import React, { useContext, useRef, useState } from 'react';
import Palette from './Palette.jsx';
import Star from '../../assets/images/icons/star.svg';
import ShareIcon from '../../assets/images/icons/share-Icon.svg';
import context from '../../context/context';
import { addLike, removeLike } from '../../api/api';
import { toast } from 'react-toastify';
import moment from 'moment';
import { EmailIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import useOnClickAway from '../../hooks/clickAway';

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
  const [sharing, setSharing] = useState(false);
  const ref = useRef();
  useOnClickAway(ref, () => setSharing(false));

  const handleLike = (e, paletteId) => {
    e.stopPropagation();
    if (!user) {
      toast.dark('please log in to like a palette', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    !isLiked
      ? addLike(paletteId, user.uid).then(() => {
          console.log('added ====> like');
        })
      : removeLike(paletteId, user.uid).then(() =>
          console.log('removed ====> like')
        );
  };

  return (
    <div
      className={[
        'mx-4 px-4 pt-3 bg-card-gray shadow-main rounded-md mb-20 cursor-pointer hide-tap',
        expanded ? 'lg:w-2/3' : shrink ? 'lg:w-1/5' : 'lg:w-64',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <Palette
        expanded={expanded}
        colors={palette}
        cardId={id}
        tooltip
        className="h-72"
      />
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
        <div ref={ref} className="flex relative gap-x-2 items-center">
          <button
            className={[sharing && 'hidden', 'top-0', 'left-0']
              .filter(Boolean)
              .join(' ')}
            onClick={(e) => {
              e.stopPropagation();
              setSharing(true);
            }}
          >
            <ShareIcon className="h-7" />
          </button>
          <WhatsappShareButton
            className={[!sharing && 'hidden'].filter(Boolean).join(' ')}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onShareWindowClose={() => setSharing(false)}
            title="Night Palette share"
            url={`https://${window.location.host}/card/${
              id ? id.replaceAll('#', '-') : ''
            }`}
          >
            <WhatsappIcon size="28" round />
          </WhatsappShareButton>
          <button
            className={[!sharing && 'hidden'].filter(Boolean).join(' ')}
            onClick={(e) => {
              e.stopPropagation();
              const subject = 'subject=Night Palette share';
              const body = "body=You've been invited to see a color palette";
              const url = `https://${window.location.host}/card/${
                id ? id.replaceAll('#', '-') : ''
              }`;
              location.href = `mailto:?${subject}&${body} - ${url}`;
            }}
          >
            <EmailIcon size="28" round />
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {creationTime && moment(creationTime.toDate()).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default Card;
