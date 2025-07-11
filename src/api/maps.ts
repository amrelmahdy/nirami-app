import httpClient from "../helpers/httpClient";

export const getPlaceInfo = async (latitude: number, longitude: number) => {
    const result = await httpClient.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ar`, {
        headers: { "User-Agent": "NiramiApp/1.0" },
    });
    return result.data;
}


export const getSuggestions = async (query: string) => {
    const result = await httpClient.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=ar&addressdetails=1&limit=5`, {
        headers: { "User-Agent": "NiramiApp/1.0" },
    });
    return result.data;

}


export const getPlaceDetails = async (placeId: string) => {
    const result = await httpClient.get(`https://nominatim.openstreetmap.org/details?place_id=${placeId}&accept-language=ar`, {
        headers: { "User-Agent": "NiramiApp/1.0" },
    });
    return result.data;
}

export const getPlaceDetailsByLatLng = async (latitude: number, longitude: number) => {
    const result = await httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCW22p8CNcDqSl8_8SG7wcP7AfNPiEu51w`, {
        headers: { "User-Agent": "NiramiApp/1.0" },
    });
    return result.data;
}   