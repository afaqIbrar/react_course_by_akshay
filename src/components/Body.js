import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import { useState, useEffect, useContext } from 'react';
import ShimmerCard from './ShimmerCards';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
// import useRestaurants from '../utils/useRestaurants';
import UserContext from '../utils/UserContext';

const Body = () => {
  const [searchText, setSearchText] = useState('');
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [nextOffSet, setNextOffSet] = useState(null);
  const [csrf, setCsrf] = useState(null);
  const { loggedInUser, setUserName } = useContext(UserContext);
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      'https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448869999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );
    const json = await data.json();
    setNextOffSet(json?.data?.pageOffset?.nextOffset);
    setCsrf(json.csrfToken);
    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  };

  const onlineStatus = useOnlineStatus();

  const filterTopRatedRestaurants = () => {
    const filteredListRestaurants = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.2
    );
    setFilteredRestaurants(filteredListRestaurants);
  };
  const filterSearchData = () => {
    const filterData = listOfRestaurants.filter((res) => {
      return res.info.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredRestaurants(filterData);
  };

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you are offline!! Please check your internet connection
      </h1>
    );

  if (listOfRestaurants.length === 0) {
    return <ShimmerCard />;
  }

  return listOfRestaurants === 0 ? (
    <ShimmerCard />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search-container m-4 p-4">
          <input
            type="text"
            data-testid="SearchInput"
            className="border border-solid border-black"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              // Whole body component render but with diff only  text box changes in DOM
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={filterSearchData}
          >
            Search
          </button>
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={filterTopRatedRestaurants}
          >
            Top Rated Restaurants
          </button>
          <label className="p-4">User Name :</label>
          <input
            type="text"
            data-testid="UserNameInput"
            value={loggedInUser}
            className="border border-black w-40 pl-2"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants?.map((restaurant) => {
          return (
            <Link
              to={'restaurants/' + restaurant?.info?.id}
              key={restaurant?.info?.id}
            >
              {/**If the restaturant is promoted then add a promoted label */}
              {restaurant?.info?.id % 2 == 0 ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Body;
