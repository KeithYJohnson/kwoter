import Ember from 'ember';
import { v4 } from "ember-uuid";

export default Ember.Component.extend({
  tagName:   'form',
  classNames: ['submit-quote-form'],
  store: Ember.inject.service('store'),
  quote: null, //An Ember.Object.create()

  init: function(){
    this._super.apply(this, arguments);
    var quote = this.get('quote');

    if (!quote){
      var propertiesObject = Ember.Object.create();
      this.set('quote', propertiesObject);
    }

  },

  actions: {
    submit: function(){
      var propertiesObject = this.get('quote');
      var store = this.get('store');

      var quote = store.createRecord('quote', {
        text:   propertiesObject.text,
        quotee: propertiesObject.quotee,
        id:     v4(),
      });


      quote.save();
    }
  }
});
