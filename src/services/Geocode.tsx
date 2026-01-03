export async function getCoordinatesFromAddress(address){
    const apiKey = "AIzaSyDrWIlKnaNRr3b6Tpys2qsZI8gRYM4aBqQ";
    const encodedAddress = encodeURIComponent(address);


    const response = await fetch(
         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
  );
    
    const data = await response.json();

    if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        return{lat:location.lat,lng:location.lng};
    }else{
        console.error("Geocoding failed:",data.status,data.error_message);
        return null;
    }
}
