// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';

const init = (bundle, parent, options = {}) => {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
        new surfaceModule(),
    ],
    ...options,
  });

  introPanel = new Surface(
      500,
      400,
      Surface.SurfaceShape.Cylinder
  );

  introRoot = r360.renderToSurface(
      r360.createRoot('TourismAppVR', {}),
      introPanel
  );

   marketPanel = new Surface(
      100,
      100,
      Surface.SurfaceShape.Flat
  )

  marketPanel.setAngle(
      0.2,
      0
  );

  museumPanel = new Surface(
      100,
      100,
      Surface.SurfaceShape.Flat
  )

  museumPanel.setAngle(
      Math.PI / 2,
      0
  );

  restaurantPanel = new Surface(
      100,
      100,
      Surface.SurfaceShape.Flat
  )

  restaurantPanel.setAngle(
      -Math.PI / 2,
      0
  );

  shoppingPanel = new Surface(
      100,
      100,
      Surface.SurfaceShape.Flat
  );

  shoppingPanel.setAngle(
      3.6,
      0
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('gdansk.jpg'));
}

class surfaceModule extends Module {
  constructor() {
    super('surfaceModule')
  }

  resizeSurface(width, height, id) {
    if (id === 'museum') {
      museumPanel.resize(width, height);
    } else if (id === 'restaurant') {
      restaurantPanel.resize(width, height);
    } else if (id === 'shopping') {
      shoppingPanel.resize(width, height);
    } else if (id === 'market') {
      marketPanel.resize(width, height);
    }
  }

  start() {
    r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'market', text: 'Browse our incredible market'}),
        marketPanel
    );

    r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'museum', text: 'Shop until you drop!'}),
        museumPanel
    );

    r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'restaurant', text: 'The life of Pablo Picasso : blue.'}),
        restaurantPanel
    );

    r360.renderToSurface(
        r360.createRoot('InfoPanel', {id: 'shopping', text: 'enjoy a delicious beer at our restaurants.'}),
        shoppingPanel
    );

    r360.detachRoot(introRoot)
  }
}

window.React360 = {init};
