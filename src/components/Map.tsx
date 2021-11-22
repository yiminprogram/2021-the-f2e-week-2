import { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { getQueryString, getUserPosition, getNearByStation } from '../utils';
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

type TBikeData = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rentBike: number;
  returnBike: number;
  time: string;
  status: number;
};

type TProps = {
  data: TBikeData[] | null;
};

const Map = ({ data }: TProps) => {
  // router
  const location = useLocation();
  const navigation = useNavigate();

  // search string
  const lat = Number(new URLSearchParams(location.search).get('lat'));
  const lng = Number(new URLSearchParams(location.search).get('lng'));

  // map state
  const mapRef = useRef<L.Map>();
  const bikeMarkGroupRef = useRef<L.MarkerClusterGroup>();
  const bikeMarkRef = useRef<L.Marker<any>[]>([]);

  // map first render
  useEffect(() => {
    // init map
    const map = L.map('map', { zoomControl: false }).setZoom(15);
    L.tileLayer(OSMUrl, { attribution }).addTo(map);

    // set user position & mark
    const setUserPosition = (lat: number, lng: number, user: boolean) => {
      map.setView([lat, lng], 15);
      if (user) {
        L.marker([lat, lng], {
          icon: UserIcon,
        }).addTo(map);
      }
    };

    // get nearby station & set mark
    const setStation = (lat: number, lng: number) => {
      // defined markers cluster
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

      // fetch bike station
      getNearByStation(lat, lng).then((res) => {
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
      bikeMarkGroupRef.current = markers;
      map.addLayer(markers);
    };

    getUserPosition()
      .then((res) => {
        // client gps open
        setUserPosition(res.coords.latitude, res.coords.longitude, true);
      })
      .catch(() => {
        // client gps close
        const lat = 25.0333836;
        const lng = 121.5633739;
        setUserPosition(lat, lng, false);
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

  useEffect(() => {
    if (!data) return;
    if (mapRef.current && bikeMarkGroupRef.current) {
      mapRef.current.removeLayer(bikeMarkGroupRef.current);
    }
    if (mapRef.current) {
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

      const markerArr: L.Marker<any>[] = [];

      data.forEach((ele) => {
        const mark = L.marker([ele.lat, ele.lng], {
          icon: BikeIcon(ele.rentBike),
        }).bindPopup(renderToString(<PopCard {...ele} />), {
          className: 'cus-popup',
        });
        markers.addLayer(mark);
        markerArr.push(mark);
      });
      bikeMarkRef.current = markerArr;
      bikeMarkGroupRef.current = markers;
      mapRef.current.addLayer(markers);
    }
  }, [data]);

  useEffect(() => {
    if (mapRef.current && location.state && location.state.search) {
      bikeMarkRef.current.forEach((ele) => {
        if (ele.getLatLng().lat === lat) {
          ele.openPopup();
        }
      });
      mapRef.current.setView([lat, lng], 20);
    }
  }, [lat, lng, location]);

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
