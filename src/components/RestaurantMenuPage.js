import React, { useState } from 'react';
import ShimmerCard from './ShimmerCards';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestrauntMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenuPage = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  if (resInfo === null) return <ShimmerCard />;

  const { name, cuisines, costForTwoMessage } =
    resInfo.cards[2]?.card?.card?.info;
  const categories =
    resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) => {
        return (
          card.card?.card['@type'] ===
          'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
        );
      }
    );
  const handleAccordionClick = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the index if it's clicked again, otherwise set it to the clicked index
  };
  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      {/** Categories accordian */}
      {categories?.map((category, i) => {
        return (
          <RestaurantCategory
            key={category.card.card.title}
            data={category.card.card}
            showItems={i === showIndex ? true : false}
            setShowIndex={() => handleAccordionClick(i)}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenuPage;
