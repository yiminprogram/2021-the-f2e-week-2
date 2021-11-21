import { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { useNavigate } from 'react-router-dom';
import { Box, Fab } from '@mui/material';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import UserMark from '../components/UserMark';
import BikeMark from '../components/BikeMark';
import ClusterMark from './ClusterMark';
import PopCard from './PopCard';
import { getQueryString, getUserPosition, getBikeStation } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
  // const location = useLocation();
  const navigation = useNavigate();

  // search string
  // const lat = Number(new URLSearchParams(location.search).get('lat'));
  // const lng = Number(new URLSearchParams(location.search).get('lng'));

  // map state
  const mapRef = useRef<L.Map>();
  const bikeMarkRef = useRef<L.MarkerClusterGroup>();

  // map first render
  useEffect(() => {
    // leaflet create map (current position)
    const map = L.map('map', { zoomControl: false });
    L.tileLayer(OSMUrl, { attribution }).addTo(map);
    map.setZoom(15);
    getUserPosition()
      .then((res) => {
        map.setView([res.coords.latitude, res.coords.longitude], 15);
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
        getBikeStation(res.coords.latitude, res.coords.longitude).then(
          (res) => {
            res.forEach((ele) => {
              markers.addLayer(
                L.marker([ele.lat, ele.lng], {
                  icon: BikeIcon(ele.rentBike),
                }).bindPopup(renderToString(<PopCard {...ele} />), {
                  className: 'cus-popup',
                }),
              );
            });
          },
        );
        bikeMarkRef.current = markers;
        map.addLayer(markers);
      })
      .catch(() => {
        // console.log('no open gps');
      });

    // get map center position
    const getMapCenter = () => {
      return setTimeout(() => {
        navigation({
          search: getQueryString({
            lat: map.getCenter().lat,
            lng: map.getCenter().lng,
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

  return (
    <>
      <Box
        id="map"
        sx={{
          position: 'relative',
          width: {
            xs: '100%',
            lg: '120%',
          },
          height: '100%',
          left: 0,
          top: 0,
          zIndex: 0,
        }}
      ></Box>
      <Box>
        <Fab>
          <FontAwesomeIcon icon={faSearch} />
          搜尋此區域
        </Fab>
      </Box>
    </>
  );
};

export default Map;
