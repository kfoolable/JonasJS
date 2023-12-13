'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const clearAll = document.querySelector('.clear__workouts');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [latitude, longitude]
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }

  _setDescription() {
    // prettier - ignore;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevGain) {
    super(coords, distance, duration);
    this.elevGain = elevGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([38, -12], 5.2, 24, 178);
// const cycle1 = new Cycling([38, -12], 27, 95, 533);
// console.log(run1, cycle1);

///////////////////////////
// APPLICATION ARCHITECTURE
class App {
  #map;
  #mapZoomLevel = 14;
  #mapEvent;
  #workouts = [];
  #marker = {};

  constructor() {
    // Get user's position
    // this.workouts = [];
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    containerWorkouts.addEventListener('click', this._removeWorkout.bind(this));
    clearAll.addEventListener('click', this.reset.bind(this));

    // console.log(this.#workouts);
  }

  _getPosition() {
    // The success function always takes a single parameter, which is the position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // <- first parameter, success
        function () {
          // second parameter, if failed
          alert('Could not get your current position');
        }
      );
    }
  }

  _loadMap(position) {
    // console.log(position);
    // const latitude = position.coords.latitude;
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}},`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach((work) => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    e.preventDefault(); // the page refreshes automatically with forms so we prevent that

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If it's workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If it's workout cycling, create cycling object
    if (type === 'cycling') {
      const elevationGain = +inputElevation.value;
      // check if data is valid
      if (
        !validInputs(distance, duration, elevationGain) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevationGain);
    }

    // Add object to the workout array
    this.#workouts.push(workout);
    // console.log(workout);

    // Render workout on map
    this._renderWorkoutMarker(workout);

    // Render workout on the list
    this._renderWorkout(workout);

    // Hide form and clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // Display marker when form is submitted
    // console.log(this.#mapEvent);
    // console.log(workout.coords);
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();

    this.#marker[workout.id] = marker;
    // console.log(this.#marker[workout.id]);

    return marker;
  }

  _renderWorkout(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
    <h2 class="workout__title">${
      workout.description
    }<button class="options">...</button>
    <div class="options-modal running hidden">
      <div class="modal-content">
          <p>Edit</p>
          <p>Delete</p>
      </div>
    </h2>
    <!-- <button class="remove__workout">X</button> -->
    
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (workout.type === 'running')
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;

    if (workout.type === 'cycling')
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevGain}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    workout.click();
    console.log(this.#workouts[0].clicks);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log('data', data);

    if (!data) return;

    this.#workouts = data.map((work) => {
      let obj;
      if (work.type === 'running') obj = new Running();
      if (work.type === 'cycling') obj = new Cycling();

      Object.assign(obj, work);
      return obj;
    });

    // this.#workouts = data;
    // console.log(this.#workouts);

    this.#workouts.forEach((work) => {
      this._renderWorkout(work);
    });
  }

  _removeWorkout(e) {
    const clickedButton = e.target;
    if (!clickedButton.classList.contains('remove__workout')) return;

    const workoutEl = clickedButton.closest('.workout');
    if (!workoutEl) return;

    const workoutId = workoutEl.dataset.id;
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const indexToRemove = storedWorkouts.findIndex(
      (obj) => obj.id === workoutId
    );

    if (indexToRemove !== -1) {
      // Get the workout's associated marker from the map using its ID
      const marker = this.#marker[workoutId];
      // console.log(marker);

      if (marker) {
        this.#map.removeLayer(marker); // Remove the marker from the map
        delete this.#marker[workoutId]; // Remove the reference to the marker
      }

      // Remove the workout from the DOM
      workoutEl.remove();

      // Remove the workout from the storedWorkouts array
      storedWorkouts.splice(indexToRemove, 1);

      // Update localStorage
      localStorage.setItem('workouts', JSON.stringify(storedWorkouts));
    }
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

// 10 Additional Features Ideas: Challenges :D
// -> Ability to edit a workout
// -> Ability to delete a workout - check
// -> Ability to delete all workouts - check
// -> Ability to sort workouts by a certain field (e.g. distance)
// -> Re-build Running and Cycling objects coming from Local Storage - check
// -> More realistic error and confirmation messages
// Hard ones
// -> Ability to position the map to show all workouts [very hard]
// -> Ability to draw lines and shapes instead of just points [very hard]
// -> Geocode location from coordinates ("Run in Faro, Portugal") [only after async JS section]
// -> Display weather data for workout time and place [only after async JS]
