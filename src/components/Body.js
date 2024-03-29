import RestaurantCard from './RestaurantCard';
import resList from '../utils/mockData';
import { useState } from 'react';

const Body = () => {
  //Local State Variable - Super Powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);
  const [searchText, setSearchText] = useState('');

  const filterTopRatedRestaurants = () => {
    const filteredListRestaurants = listOfRestaurants.filter(
      (res) => res.data.avgRating > 4
    );
    setListOfRestaurants(filteredListRestaurants);
  };
  const filterSearchData = () => {
    if (searchText) {
      const filterData = listOfRestaurants.filter((res) => {
        return res.data.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setListOfRestaurants(filterData);
    }
  };

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={filterTopRatedRestaurants}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button className="search-btn" onClick={filterSearchData}>
          Search
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants?.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant?.data?.id} resData={restaurant} />
          );
        })}
      </div>
    </div>
  );
};
export default Body;
