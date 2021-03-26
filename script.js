// Write your JavaScript code here!
window.addEventListener("load", () => {
   const launchForm = document.getElementById("launchForm");

   launchForm.addEventListener("submit", (event) => {

      event.preventDefault();
            
      const pilotName = launchForm.querySelector("input[name=pilotName");
      const copilotName = launchForm.querySelector("input[name=copilotName");
      const fuelLevel = launchForm.querySelector("input[name=fuelLevel");
      const cargoMass = launchForm.querySelector("input[name=cargoMass");

      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");

      let launchStatus = document.getElementById("launchStatus");
      let faultyItems = document.getElementById("faultyItems");

      const missionTarget = document.getElementById("missionTarget");

      let checkForLaunch = false;

      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.innerHTML = `Pilot ${copilotName.value} is ready for launch`;

      missionTarget.innerHTML = '';

      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         window.alert("All fields are required.");
      } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value) || !(isNaN(pilotName.value)) || !(isNaN(copilotName.value))) {
         window.alert("Make sure to enter valid information for each field.");
      } else if (fuelLevel.value < 10000) {
         faultyItems.style.visibility = "visible";
         fuelStatus.innerHTML = "Fuel level too low for launch";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
      } else if (cargoMass.value > 10000) {
         faultyItems.style.visibility = "visible";
         cargoStatus.innerHTML = "Cargo mass too high for launch";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
      } else {
         checkForLaunch = true;
      }

      

      if (checkForLaunch) {
         fuelStatus.innerHTML = "Fuel level high enough for launch";
         cargoStatus.innerHTML = "Cargo mass low enough for launch";
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style.color = "green";

         fetch("https://handlers.education.launchcode.org/static/planets.json").then(response => {
            response.json().then(json => {
               let randomIndex = Math.floor(Math.random() * 6);
               missionTarget.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[randomIndex].name}</li>
                  <li>Diameter: ${json[randomIndex].diameter}</li>
                  <li>Star: ${json[randomIndex].star}</li>
                  <li>Distance from Earth: ${json[randomIndex].distance}</li>
                  <li>Number of Moons: ${json[randomIndex].moons}</li>
               </ol>
               <img src=${json[randomIndex].image}>
               `;
            });
         });
      }
   });
});