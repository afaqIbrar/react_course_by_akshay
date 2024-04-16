import React, { useEffect, useState } from 'react';
import ShimmerCard from './ShimmerCards';
import { useParams } from 'react-router-dom';
import { MENU_URL } from '../utils/constants';
const RestaurantMenuPage = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();
    setResInfo(json?.data);
  };

  if (resInfo === null) return <ShimmerCard />;

  const { name, cuisines, costForTwoMessage, ratings } =
    resInfo.cards[2]?.card?.card?.info;
  const { itemCards } =
    resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards?.map((item) => {
          return (
            <li key={item?.card?.info?.id}>
              {item?.card?.info?.name} - {'Rs. '}{' '}
              {item?.card?.info?.defaultPrice
                ? item?.card?.info?.defaultPrice / 100
                : item?.card?.info?.price / 100}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenuPage;
