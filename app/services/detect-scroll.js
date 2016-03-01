import Ember from 'ember';

export default Ember.Service.extend({
  rightScrollListener: Ember.inject.service(),

  init(){
    console.log('detect-scroll init!');
    this.registerScrollListeners();
  },

  registerScrollListeners(){
    let rightScrollListener = this.get('rightScrollListener');

    Ember.$(window).on('scroll',function(){
      rightScrollListener.turnOn();
    });
  }
});
