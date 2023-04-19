export default class BikeService{
  static getBike(bikeLimit, bikeLocation, bikeColor, bikeLocationDistance) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://bikeindex.org/api/v3/search?page=1&per_page=${bikeLimit}&colors=${bikeColor}&location=${bikeLocation}&distance=${bikeLocationDistance}&stolenness=proximity`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, bikeLimit]);
        } else {
          reject([this, response, bikeLocation]); 
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}