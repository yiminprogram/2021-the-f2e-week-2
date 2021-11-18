import { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconImage from '../assets/icon/user-position.svg';
import UserMark from '../components/UserMark';
import BikeMark from '../components/BikeMark';
import { getPosition, getQueryString } from '../utils';

const OpenStreetMap = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '120%',
  height: '100%',
  left: 0,
  opacity: '1',
  zIndex: 0,

  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },

  [theme.breakpoints.up('lg')]: {
    width: '110%',
  },
}));

// map setting
const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const UserIcon = L.divIcon({
  className: 'user-mark',
  iconSize: [80, 80],
  iconAnchor: [40, 40],
  html: renderToString(<UserMark />),
});

const Map = () => {
  // router
  const location = useLocation();
  const navigation = useNavigate();

  // search string
  const lat = Number(new URLSearchParams(location.search).get('lat'));
  const lng = Number(new URLSearchParams(location.search).get('lng'));
  const zoom = Number(new URLSearchParams(location.search).get('zoom'));

  // map state
  const mapRef = useRef<L.Map>();
  const curRef = useRef<L.Marker>();

  useEffect(() => {
    const map = L.map('map', { zoomControl: false });
    L.tileLayer(OSMUrl, { attribution }).addTo(map);
    mapRef.current = map;
    console.log('first value');

    let timer: NodeJS.Timeout;

    map.on('zoom', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        navigation({
          search: getQueryString({
            lat: map.getCenter().lat,
            lng: map.getCenter().lng,
            zoom: map.getZoom(),
          }),
        });
      }, 500);
    });

    map.on('drag', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('drag');
        navigation({
          search: getQueryString({
            lat: map.getCenter().lat,
            lng: map.getCenter().lng,
            zoom: map.getZoom(),
          }),
        });
      }, 500);
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    console.log('set view');
    mapRef.current.setView([lat, lng], zoom);
    if (curRef.current) {
      curRef.current.setLatLng([lat, lng]);
    } else {
      curRef.current = L.marker([lat, lng], { icon: UserIcon });
      curRef.current.addTo(mapRef.current);
    }
  }, [lat, lng, zoom]);

  return <OpenStreetMap id="map"></OpenStreetMap>;
};

export default Map;
