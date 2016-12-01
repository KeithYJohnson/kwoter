import Ember from 'ember';

export default Ember.Service.extend({
  rightScrollListener: Ember.inject.service(),
  downwardScrollListener: Ember.inject.service(),
  upwardScrollListener: Ember.inject.service(),
  leftScrollListener: Ember.inject.service(),

  registerScrollListeners(){
    let rightScrollListener = this.get('rightScrollListener');
    let downwardScrollListener = this.get('downwardScrollListener');
    let upwardScrollListener = this.get('upwardScrollListener');
    let leftScrollListener = this.get('leftScrollListener');

    rightScrollListener.turnOn();
    downwardScrollListener.turnOn();
    upwardScrollListener.turnOn();
    leftScrollListener.turnOn();
  },

  unregisterScrollListeners(){
    let rightScrollListener = this.get('rightScrollListener');
    let downwardScrollListener = this.get('downwardScrollListener');
    let upwardScrollListener = this.get('upwardScrollListener');
    let leftScrollListener = this.get('leftScrollListener');

    leftScrollListener.turnOff();
    rightScrollListener.turnOff();
    downwardScrollListener.turnOff();
    upwardScrollListener.turnOff();
  }
});
