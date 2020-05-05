mapboxgl.accessToken = 'pk.eyJ1IjoicW1jZ2FoYSIsImEiOiJjazl0MWtpancxYjVkM2xvM3lhanR4MjMzIn0.GJPg413LdlojhPVRCp5vlw';
var map = new mapboxgl.Map({
  container: 'map',
  center: [-90.09269714355469, 29.954339625569716],
  style: 'mapbox://styles/mapbox/basic-v9',
  zoom: 12

});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

map.on('load', function () {
  // Added a line route from Wlliams Palm to Hansen's
  map.addSource('route', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [-90.128741, 29.9461863],
          [-90.1335221, 29.9415008],
          [-90.1099307, 29.926154],
          [-90.1080635, 29.9168919]

        ]
      }
    }
  });
  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#888',
      'line-width': 8
    }
  });

  map.addSource('points', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          // feature for Mapbox DC
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-90.1080635, 29.9168919]
          },
          'properties': {
            'title': 'Hansen\'s Sno-Bliz',
            'icon': 'ice-cream' //If you just type ice cream without the number, it works!
          }
        },
        {
          // feature for Mapbox SF
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-90.128741, 29.9461863]
          },
          'properties': {
            'title': 'Williams Plum Street Snowballs',
            'icon': 'ice-cream'
          }
        }
      ]
    }
  });

  map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'points',
    'layout': {
      // get the icon name from the source's "icon" property
      // concatenate the name to get an icon from the style's sprite sheet
      'icon-image': ['concat', ['get', 'icon'], '-15'],
      // get the title name from the source's "title" property
      'text-field': ['get', 'title'],
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.6],
      'text-anchor': 'top'
    }
  });


});