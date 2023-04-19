import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './bike-service';

// Business Logic

function getBike(bikeLimit, bikeLocation, bikeColor, bikeLocationDistance) {
  let promise = BikeService.getBike(bikeLimit, bikeLocation, bikeColor, bikeLocationDistance); 
  promise.then(function(response) {
    printElements(response);
  }, function(errorMessage) {
    printError(errorMessage);
  });
}

// UI Logic

function printError(error) {
  document.querySelector('#errorMessage').innerText = `There was an error accessing bike data for ${error[2]}: ${error[0].status} ${error[1].error}`;
}

function printElements(response) {
  console.log("hi response",response);
  console.log("response1",response[1]);
  const ul = document.querySelector('ul');
  for (let i = 0; i < response[1]; i++) {
    const bikeBullet = document.createElement("li");
    ul.append(bikeBullet);
    bikeBullet.innerText = `${response[0].bikes[i].title}, ${response[0].bikes[i].frame_colors}, ${response[0].bikes[i].date_stolen}, ${response[0].bikes[i].stolen_location}.`;
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
