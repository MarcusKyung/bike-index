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
  document.querySelector('#errorMessage').innerText = `There was an error accessing bike data for the color ${bikeColor} within ${bikeLocationDistance} miles of ${bikeLocation}: ${error}.`;
}

function printElements(response, bikeLimit) {
  const ul = document.querySelector('ul');
  for (let i = 0; i < bikeLimit; i++) {
    const bikeBullet = document.createElement("li");
    ul.append(bikeBullet);
    bikeBullet.innerText = `${response.bikes[i].title}, ${response.bikes[i].frame_colors}, ${response.bikes[i].date_stolen}, ${response.bikes[i].stolen_location}.`;
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
