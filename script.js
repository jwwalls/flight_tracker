//API For finding live flight data
const APIURL = 'http://api.aviationstack.com/v1/flights?access_key=fcdcbea16be6417ada5da5f94bd89594'
const apiTest = async () => {
try {
    const response = await fetch(`${APIURL}&limit=10`);
    const result = await response.json();
    if (result.error) {
        throw result.error;
    }
    console.log(result.data);
  } catch (error) {
    console.error('Uh oh, trouble fetching flights!', error);
  }
}


//Function to get current location
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert("Latitude: " + latitude + "\nLongitude: " + longitude);
  }


  //API for finding the route and time 
  const apiTest2 = async () => {
    const publishableKey = 'prj_live_pk_1893bb40ad675689bd80be3d407ecc9023269507'; // Replace with your Radar publishable API key
    const origin = { latitude: 36.78382, longitude: -96.97536 }; // Replace with the latitude and longitude of the origin point
    const destination = { latitude:36.78232, longitude: -96.97535 }; // Replace with the latitude and longitude of the destination point
    try {
        const response = await fetch(`https://api.radar.io/v1/route/distance?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&modes=car,foot&units=imperial`, {
            method: 'GET',
            headers: {
              'Authorization': `${publishableKey}`
            }
          })
            .then(response => response.json())
            .then(data => {
              const { routes } = data;              
              if (routes ) {
                const { distance, duration } = routes.car;
                console.log(`Distance: ${distance.value} meters`);
                console.log(`Duration: ${duration.text} `);
              } else {
                console.log('No routes found');
              }
            })
            .catch(error => console.error(error));          
        
      } catch (error) {
        console.error('Uh oh, trouble fetching routes!', error);
      }
    }
    apiTest2();

  

  