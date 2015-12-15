import Ember from 'ember';

export default Ember.Route.extend({
  quotes: null,

  model: function() {
    return this.store.findAll('quote');
  }
});
