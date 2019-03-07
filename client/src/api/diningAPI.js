export const getRestaurants = params => {
  var url = "https://api.yelp.com/v3/businesses/search?term=restaurants";
  url += `&location=${params}&limit=50`;
  try {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer EXCKgny_5NI0-DuoD-vpEGcsowVY15hUCH60XlgrzSQaePnXN-ghbw0Cv8spDYmmdqcrFEDpKXKVU6oZSb6mxPWtDZqZbBrTD-hBhhTbKz0JFM-jM2vGwXsLi43WW3Yx"
      }
    }).then(response => {
      return response.json();
    });
  } catch (error) {
    throw new Error(error);
  }
};
