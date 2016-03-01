import Ember from 'ember';

// This is just a built in configurable buffer so
// that there's some extra time to fetch and render
// quotes as the user scrolls to the right-most edge
// of the $(document)
const buffer = 50;

export default Ember.Service.extend({
  store:      Ember.inject.service(),
  positioner: Ember.inject.service('quote-bubbles-positions-service'),
  calculator: Ember.inject.service('how-many-quotes-will-fit-calculator'),
  strategy:   Ember.inject.service('position-strategy'),

  turnOn(){
    Ember.$(window).on('scroll', Ember.$.proxy(this.didScroll, this));
  },

  turnOff(){
    Ember.$(window).off('scroll', Ember.$.proxy(this.didScroll, this));
  },

  didScroll(){
    if ( this.isScrolledRight() ){
      let store = this.get('store');
      let calculator = this.get('calculator');

      let numberOfQuotesToGrab = calculator.calculate();
      store.query('quote', { limit: numberOfQuotesToGrab }).then( () => {
        let strategy = this.get('strategy');
        strategy.set('where','right');
      })
    }
  },

  isScrolledRight(){
    let $viewportWidth = Ember.$(window).width();
    let $documentWidth = Ember.$(document).width();

    let $leftEdgeOfViewport = Ember.$(window).scrollLeft();
    let $breakpoint = $documentWidth - $viewportWidth;

    return ($leftEdgeOfViewport + buffer) > $breakpoint;
  }
});
