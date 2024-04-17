import RestaurantCard from './RestaurantCard';
import { useState, useEffect } from 'react';
import ShimmerCard from './ShimmerCards';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Body = () => {
  //Local State Variable - Super Powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [nextOffSet, setNextOffSet] = useState(null);
  const [csrf, setCsrf] = useState(null);
  const [loading, setLoading] = useState(false);

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

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        Pragma: 'no-cache',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Ch-Ua':
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Linux"'
      },
      referrer: 'https://www.swiggy.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        const data = {
          lat: 19.0759837,
          lng: 72.8776559,
          nextOffset: nextOffSet,
          widgetOffset: {
            NewListingView_category_bar_chicletranking_TwoRows: '',
            NewListingView_category_bar_chicletranking_TwoRows_Rendition: '',
            Restaurant_Group_WebView_SEO_PB_Theme: '',
            collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: '10',
            inlineFacetFilter: '',
            restaurantCountWidget: ''
          },
          filters: {},
          seoParams: {
            seoUrl: 'https://www.swiggy.com/',
            pageType: 'FOOD_HOMEPAGE',
            apiName: 'FoodHomePage'
          },
          page_type: 'DESKTOP_WEB_LISTING',
          _csrf: csrf
        };
        const resp = await postData(
          'https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update',
          data
        );
        setLoading(false);
        setListOfRestaurants([
          ...listOfRestaurants,
          ...resp?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        ]);
        setFilteredRestaurants([
          ...listOfRestaurants,
          ...resp?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        ]);
        setNextOffSet(resp?.data?.pageOffset?.nextOffset);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, []);

  const filterTopRatedRestaurants = () => {
    const filteredListRestaurants = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4
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
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              // Whole body component render but with diff only  text box changes in DOM
              setSearchText(e.target.value);
            }}
          />
          <button className="search-btn" onClick={filterSearchData}>
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={filterTopRatedRestaurants}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants?.map((restaurant) => {
          return (
            <Link
              to={'restaurants/' + restaurant?.info?.id}
              key={restaurant?.info?.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Body;
