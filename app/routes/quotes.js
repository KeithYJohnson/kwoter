import Ember from 'ember';

export default Ember.Route.extend({
  quotes: null,

  model: function() {
    // var quotes = [
    //   { quotee: 'bearded man', text: 'philosopher quote' },
    //   { quotee: 'high man',    text: 'keith richards quotes' },
    //   { quotee: 'nuff said',   text: 'ODB quote'}
    // ];

    var quotes=  this.store.findAll('quote');

    console.log(JSON.stringify(quotes));
    return quotes;
  }
});
