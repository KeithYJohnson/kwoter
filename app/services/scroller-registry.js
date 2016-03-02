import Ember from 'ember';

export default Ember.Service.extend({
  rightScrollListener: Ember.inject.service(),
  downwardScrollListener: Ember.inject.service(),

  registerScrollListeners(){
    let rightScrollListener = this.get('rightScrollListener');
    let downwardScrollListener = this.get('downwardScrollListener');
    rightScrollListener.turnOn();
    downwardScrollListener.turnOn();
  },

  unregisterScrollListeners(){
    let rightScrollListener = this.get('rightScrollListener');
    let downwardScrollListener = this.get('downwardScrollListener');
    rightScrollListener.turnOff();
    downwardScrollListener.turnOff();
  }
});
