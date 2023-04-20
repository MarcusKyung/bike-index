export default class BikeService{
  static async getBike(bikeLimit, bikeManufacturer, bikeLocation, bikeColor, bikeLocationDistance) {
    try {
      const response = await fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=${bikeLimit}&manufacturer=${bikeManufacturer}&colors=${bikeColor}&location=${bikeLocation}&distance=${bikeLocationDistance}&stolenness=proximity`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      } 
      return jsonifiedResponse;
    } catch(error) {  
      return error;
    }
  }
}