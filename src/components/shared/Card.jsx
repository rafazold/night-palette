import React, { useContext, useRef, useState } from 'react';
import Palette from './Palette.jsx';
import Star from '../../assets/images/icons/star.svg';
import ShareIcon from '../../assets/images/icons/share-Icon.svg';
import DeleteIcon from '../../assets/images/icons/delete-Icon.svg';
import context from '../../context/context';
import { addLike, removeLike, deletePalette } from '../../api/api';
import { toast } from 'react-toastify';
import moment from 'moment';
import { EmailIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import useOnClickAway from '../../hooks/clickAway';
import Popup from './Popup';
import Button from './Button';
//TODO: remove when changed to observer
import { useLocation } from 'react-router-dom';

const Card = ({
  palette,
  id,
  expanded,
  shrink,
  likes,
  creationTime,
  className,
  userId,
  ...props
}) => {
  const { user, setNeedRefresh, isAdmin } = useContext(context);
  const isLiked = user ? likes.hasOwnProperty(user.uid) : false;
  const [sharing, setSharing] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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
      ? addLike(paletteId, user.uid).catch((e) => {
          console.log(e);
        })
      : removeLike(paletteId, user.uid).catch((e) => {
          console.log(e);
        });
    setNeedRefresh(true);
  };
  const handleDelete = (e, paletteId) => {
    e.stopPropagation();
    e.preventDefault();
    deletePalette(paletteId).catch();
    location.pathname === 'personal' && setNeedRefresh(true);
  };
  //TODO: remove when change to observer
  const location = useLocation();

  return (
    <div
      className={[
        'px-4 pt-3 bg-card-gray shadow-main rounded-md mb-20 cursor-pointer hide-tap relative',
        expanded ? 'lg:max-w-full' : 'lg:max-w-17%',
        expanded ? 'lg:w-2/3' : shrink ? 'lg:w-1/5' : 'lg:w-64',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {user && (userId === user.uid || isAdmin) && (
        <Popup
          buttonIcon={<DeleteIcon className="w-7 h-7" />}
          buttonClassName="absolute top-0 right-0 z-10"
          open={openDelete}
          handleOpen={setOpenDelete}
          className="z-10 top-16 left-1/2 transform -translate-x-1/2 w-10/12 lg:w-auto"
        >
          <div className="flex flex-col justify-between p-4 rounded bg-card-gray backdrop-filter backdrop-blur-lg bg-opacity-50">
            <p>Are you sure you want to delete this palette?</p>
            <p>You cannot undo this action</p>
            <div className="flex justify-center mt-10">
              <Button
                onClick={(e) => handleDelete(e, id)}
                secondary
                className="mr-2"
              >
                Delete
              </Button>
              <Button
                className="ml-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenDelete(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Popup>
      )}
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
        <div className="flex">
          <div
            className="text-base flex items-center px-1.5 py-0.5 bg-black rounded-md mr-2"
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
        </div>
        <div className="text-sm text-gray-600">
          {creationTime && moment(creationTime.toDate()).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default Card;
