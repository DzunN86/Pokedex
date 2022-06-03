import {NavigationContainer} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import React, {useRef} from 'react';
import Router from './routes';

const MainApp = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={async () => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // Analytics
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Router />
    </NavigationContainer>
  );
};

export default function App() {
  return <MainApp />;
}
