import Ember from 'ember';

export default Ember.Service.extend({
  rightScrollListener: Ember.inject.service(),

  registerScrollListeners(){
    let rightScrollListener = this.get('rightScrollListener');
    rightScrollListener.turnOn();
  },

  unregisterScrollListeners(){
    let rightScrollListener = this.get('rightScrollListener');
    rightScrollListener.turnOff();
  }
});
