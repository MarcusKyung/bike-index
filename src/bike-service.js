export default class BikeService{
  static getBike(bikeLimit, bikeManufacturer, bikeLocation, bikeColor, bikeLocationDistance) {
    return fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=${bikeLimit}&manufacturer=${bikeManufacturer}&colors=${bikeColor}&location=${bikeLocation}&distance=${bikeLocationDistance}&stolenness=proximity`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function(error) {  
        return error;
      });
  }
}