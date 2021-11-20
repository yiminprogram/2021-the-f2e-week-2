export const getUserPosition = () => {
  return new Promise<GeolocationPosition>((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};
