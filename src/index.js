import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './bike-service';

// Business Logic

function getBike(bikeLimit, bikeLocation, bikeColor, bikeLocationDistance) {
  BikeService.getBike(bikeLimit, bikeLocation, bikeColor, bikeLocationDistance) 
    .then(function(response) {
      if (response.bikes) {
        printElements(response, bikeLimit, bikeLocation, bikeColor, bikeLocationDistance);
      } else {
        printError(response, bikeLocation, bikeColor, bikeLocationDistance);
      }
    });
}

// UI Logic

function printError(error, bikeLocation, bikeColor, bikeLocationDistance) {
  document.querySelector('#errorMessage').innerText = `There was an error accessing data for the ${bikeColor} bikes within ${bikeLocationDistance} miles of ${bikeLocation}: ${error}.`;
}

function printElements(response, bikeLimit) {
  for (let i = 0; i < bikeLimit; i++) {
    const bikeDetails = document.createElement("ul");
    bikeDetails.classList.add("bike-details");

    const bikeTitle = document.createElement("li");
    bikeDetails.append(bikeTitle);
    const bikeColor = document.createElement("li");
    bikeDetails.append(bikeColor);
    const bikeStolenTime = document.createElement("li");
    bikeDetails.append(bikeStolenTime);
    const bikeLocation = document.createElement("li");
    bikeDetails.append(bikeLocation);
    const bikeWebpage = document.createElement("li");
    bikeDetails.append(bikeWebpage);
    bikeTitle.innerText = "Bike Title: " + `${response.bikes[i].title}`;
    bikeColor.innerText = "Frame Color(s) : " + `${response.bikes[i].frame_colors}`;
    bikeLocation.innerText =  "Stolen Location : " + `${response.bikes[i].stolen_location}`;

    const timestamp = `${response.bikes[i].date_stolen}`;
    const date = new Date(timestamp * 1000);
    const month = date.getMonth() +  1;
    const day = date.getDate();
    const year = date.getFullYear();
    const dateStolenOutput = `${month}/${day}/${year}`;
    bikeStolenTime.innerText =  "Date Stolen : " +  `${dateStolenOutput}`;
    
    const bikeWebpageLink = document.createElement("a");
    bikeWebpageLink.href = `${response.bikes[i].url}`;
    bikeWebpageLink.innerText = "Stolen Bike Listing";
    bikeWebpage.append(bikeWebpageLink);
    const result = document.querySelector('#resultsDiv');
    result.append(bikeDetails);
  }
}


function handleFormSubmission(event) {
  event.preventDefault();
  const bikeLimit = document.querySelector('#bikeLimit').value;
  const bikeLocation = document.querySelector('#bikeLocation').value;
  const bikeColor = document.querySelector('#bikeColor').value;
  const bikeLocationDistance = document.querySelector('#bikeLocationDistance').value;
  document.querySelector('#bikeLimit').value = null;
  document.querySelector('#bikeLocation').value = null;
  document.querySelector('#bikeColor').value = null;
  document.querySelector('#bikeLocationDistance').value = null;
  getBike(bikeLimit, bikeLocation, bikeColor, bikeLocationDistance);
}


window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
