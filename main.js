const Search = document.querySelector(".search");
const City = document.querySelector(".city");
const Celsium = document.querySelector(".celsium");
const Description = document.querySelector(".description");
const Wind = document.querySelector(".wind");
const Cloudiness = document.querySelector(".cloudiness");
const Humidity = document.querySelector(".humidity");
const Image = document.querySelector(".main-img");
const container = document.querySelector(".container");
const wrapper = document.querySelector(".wrapper");
const mask = document.querySelector(".mask");


window.addEventListener('load', () => {

   mask.classList.add("hide");
   setTimeout(() => {
      mask.remove()
   }, 1500);

});

let city = "Kyiv";

document.addEventListener('keydown', e => {
   if (e.key === 'Enter') {
      let value = Search.value;
      if (!value) return false;
      city = value;
      init();
      Search.value = '';

   };
});

function init() {
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ada4c2514a03ed28b42c38751fe6164`)
      .then(function (resp) { return resp.json() })
      .then(function (data) {

         const hours = new Date().getHours();
         const diff = data.timezone / 3600;
         const currentTime = hours - 3 + diff;


         if (currentTime <= 22 || currentTime >= 6) {
            container.style.backgroundColor = "rgba(138, 191, 238, 0.6)";

            if (data.weather[0].main == 'Clouds') {
               document.querySelector(".main-img").src = "img/сloudy.svg";
            } else if (data.weather[0].main == 'Clear') {
               document.querySelector(".main-img").src = "img/clear.svg";
            } else if (data.weather[0].main == 'Rain') {
               document.querySelector(".main-img").src = "img/rain.svg";
            } else if (data.weather[0].main == 'Snow') {
               document.querySelector(".main-img").src = "img/snow.svg";
            } else if (data.weather[0].main == 'Thunderstorm') {
               document.querySelector(".main-img").src = "img/storm.svg";
            }
            else if (data.weather[0].main == 'Tornado') {
               document.querySelector(".main-img").src = "img/tornado.svg";
            }
         };

         if (currentTime >= 22 || currentTime <= 6) {

            container.style.backgroundColor = "rgba(31, 46, 84, 0.85)";

            if (data.weather[0].main == 'Clouds') {
               document.querySelector(".main-img").src = "img/night-cloudy.svg";
            }
            else if (data.weather[0].main == 'Clear') {
               document.querySelector(".main-img").src = "img/night-clear.svg";
            }
            else if (data.weather[0].main == 'Thunderstorm') {
               document.querySelector(".main-img").src = "img/night-storm.svg";
            }
            else if (data.weather[0].main == 'Rain') {
               document.querySelector(".main-img").src = "img/night-rain.svg";
            }
            else if (data.weather[0].main == 'Snow') {
               document.querySelector(".main-img").src = "img/night-snow.svg";
            }
         };

         City.textContent = `${city}`;

         Celsium.textContent = `${temp()}º`
         function temp() {
            let temperature = data.main.temp;
            let tempCelsium = Math.floor(temperature) - 273;
            return tempCelsium;
         }

         Description.textContent = data.weather[0].main;

         Wind.textContent = data.wind.speed + " m/s";

         Cloudiness.textContent = data.clouds.all + " %";

         Humidity.textContent = data.main.humidity + " %";

      })
      .catch(function () {
         alert('This city not found');
         city = "Kyiv";
         init();
         Search.value = '';
      });
}

init();

setInterval(() => {
   init()
}, 10000);

