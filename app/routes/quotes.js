import Ember from 'ember';

export default Ember.Route.extend({
  quotes: null,

  model: function() {
    var quotes = this.store.findAll('quote');
    return quotes;
  }
});
