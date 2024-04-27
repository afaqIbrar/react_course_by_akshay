import { useContext } from 'react';
import { CDN_URL } from '../utils/constants';
import UserContext from '../utils/UserContext';
const RestaurantCard = (props) => {
  const { loggedInUser } = useContext(UserContext);
  const { resData } = props;
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    resData?.info;
  return (
    <div
      data-testid="resCard"
      className="p-4 m-4 w-[250px] rounded-lg bg-gray-50 hover:bg-gray-200"
    >
      <img className="rounded-lg" src={CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(', ')}</h4>
      <h4>{avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.slaString}</h4>
      <h4>User : {loggedInUser}</h4>
    </div>
  );
};

// Higher Order Component// input - restaurantCard => Restaurant cardpromoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <>
        <label className="absolute bg-black text-white ml-4 mt-5 p-2 rounded rounded-lg">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </>
    );
  };
};

export default RestaurantCard;
