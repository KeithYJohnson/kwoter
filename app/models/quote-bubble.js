import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  bottom: DS.attr('integer'),
  height: DS.attr('integer'),
  left: DS.attr('integer'),
  right: DS.attr('integer'),
  top: DS.attr('integer'),
  width: DS.attr('integer'),

  coordinates: Ember.computed('top', 'bottom','left','right', function() {
    return {
      top: this.get('top'),
      bottom: this.get('bottom'),
      left: this.get('left'),
      right: this.get('right')
    };
  })
});
