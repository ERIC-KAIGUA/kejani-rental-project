export async function getCoordinatesFromAddress(address){
    const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string
    const encodedAddress = encodeURIComponent(address);


    const response = await fetch(
         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleKey}`
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
