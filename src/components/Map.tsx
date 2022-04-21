import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';

import MapView, {Polyline /* , {PROVIDER_GOOGLE} */} from 'react-native-maps';

import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {FAB} from './FAB';

export const Map = () => {
  const [showPolyline, setShowPolyline] = useState(true);

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowingUserLocation,
    routeLines,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const followingRef = useRef<boolean>(true);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();

    followingRef.current = true;

    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowingUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!followingRef.current) return;

    const {latitude, longitude} = userLocation;

    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  }, [userLocation]);

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        style={styles.map}
        onTouchStart={() => (followingRef.current = false)}
        // provider={PROVIDER_GOOGLE}
      >
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
      </MapView>

      <FAB
        iconName="compass-outline"
        onPress={centerPosition}
        style={styles.fabPosition}
      />
      <FAB
        iconName="brush-outline"
        onPress={() => setShowPolyline(prevState => !prevState)}
        style={styles.fabPoly}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  fabPosition: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  fabPoly: {
    position: 'absolute',
    right: 20,
    bottom: 80,
  },
});
