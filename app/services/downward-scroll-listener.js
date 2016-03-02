import Ember from 'ember';

export default Ember.Service.extend({
  turnOn(){
    Ember.$(window).on('scroll', Ember.$.proxy(this.didScroll, this));
  },

  turnOff(){
    Ember.$(window).off('scroll', Ember.$.proxy(this.didScroll, this));
  },

  didScroll(){
  }
});
