import { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, Box, Button } from '@mui/material';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import UserMark from '../components/UserMark';
import BikeMark from '../components/BikeMark';
import ClusterMark from './ClusterMark';
import PopCard from './PopCard';
import { getQueryString, getPosition, getBikeStation } from '../utils';

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

const BikeIcon = (quantity: number) => {
  return L.divIcon({
    className: 'bike-icon',
    iconSize: [48, 67],
    iconAnchor: [19, 28.5],
    popupAnchor: [-175, -135],
    html: renderToString(<BikeMark quantity={quantity} />),
  });
};

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
  const bikeMarkRef = useRef<L.MarkerClusterGroup>();

  // map first render
  useEffect(() => {
    // leaflet create map (current position)
    const map = L.map('map', { zoomControl: false });
    L.tileLayer(OSMUrl, { attribution }).addTo(map);
    map.setZoom(17);
    getPosition().then((res) => {
      map.setView([res.coords.latitude, res.coords.longitude], 17);
      L.marker([res.coords.latitude, res.coords.longitude], {
        icon: UserIcon,
      }).addTo(map);
      // Bike station marker
      const markers = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
          return L.divIcon({
            className: 'cluster-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            html: renderToString(
              <ClusterMark count={cluster.getChildCount()} />,
            ),
          });
        },
      });
      getBikeStation(res.coords.latitude, res.coords.longitude).then((res) => {
        res.forEach((ele) => {
          markers.addLayer(
            L.marker([ele.lat, ele.lng], {
              icon: BikeIcon(ele.rentBike),
            }).bindPopup(renderToString(<PopCard {...ele} />), {
              className: 'cus-popup',
            }),
          );
        });
      });
      bikeMarkRef.current = markers;
      map.addLayer(markers);
    });

    // get map center position
    const getMapCenter = () => {
      return setTimeout(() => {
        navigation({
          search: getQueryString({
            lat: map.getCenter().lat,
            lng: map.getCenter().lng,
            zoom: map.getZoom(),
          }),
        });
      }, 500);
    };

    // control map event
    let timer: NodeJS.Timeout;
    map.on('zoom', () => {
      clearTimeout(timer);
      timer = getMapCenter();
    });
    map.on('drag', () => {
      clearTimeout(timer);
      timer = getMapCenter();
    });

    mapRef.current = map;
  }, []);

  const handleClickSearch = () => {
    if (mapRef.current && bikeMarkRef.current) {
      mapRef.current.removeLayer(bikeMarkRef.current);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: '5%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <Button variant="contained" size="large" onClick={handleClickSearch}>
          搜尋此區域
        </Button>
      </Box>
      <OpenStreetMap id="map"></OpenStreetMap>{' '}
    </>
  );
};

export default Map;
