/* globals google: true */
import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.setProperties({
      lat: 32.75494243654723,
      lng: -86.8359375,
      zoom: 4,
      markers: Ember.A([
        {
          id: 'jdlkfajs22df',
          lat: 32.75494243654723,
          lng: -86.8359375,
          animation: google.maps.Animation.DROP,
          infoWindow: { content: '<p>They\'re Remarkable!</p>', visible: true },
          draggable: true,
          dragstart: function() {
            controller.set('isMarkerDragging', true);
          },
          dragend: function() {
            controller.set('isMarkerDragging', false);
          },
          mouseup: function(e, marker) {
            const lat = marker.position.lat();
            const lng = marker.position.lng();

            // Recenter map
            controller.setProperties({
              lat: lat,
              lng: lng
            });
          },
          drag: function(e) {
            controller.set('markers.[].0.lat', e.latLng.lat());
            controller.set('markers.[].0.lng', e.latLng.lng());
          }
        }
      ]),

      isMarkerDragging: false,
      isCustomIcon: false,
      marker: Ember.computed.oneWay('markers.[].0')
    });
  },

  actions: {
    toggleCustomMarker: function() {
      const marker = Ember.copy(this.controller.get('markers.[].0'));

      if(this.controller.get('isCustomIcon') === false) {
        marker.icon = 'beachflag.png';
      } else {
        delete marker.icon;
      }

      this.controller.set('isCustomIcon', !!(marker.icon));

      this.controller.markers.removeAt(0);
      this.controller.markers.pushObject(marker);
    }
  }
});