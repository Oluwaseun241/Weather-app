window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // const proxy = 'https://cors-anywhere.herokuapp.com/corsdemo';

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?unitGroup=metric&key=8QQKGQFKZZXTCRAK8QVA3Q7G3&contentType=json`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temp, conditions, icon} = data.currentConditions;

                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = conditions;
                    locationTimezone.textContent = data.timezone;

                    //FORMULA FOR CELSIUS
                    let celsius = (temp *(9/5) +32 );

                    //Set icon
                    setIcons(icon, document.querySelector(".icon"));
                    
                    //Change temperature to Celsius/Fareheit
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === 'C') {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = temp;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
