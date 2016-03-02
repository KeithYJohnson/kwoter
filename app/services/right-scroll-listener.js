import Ember from 'ember';
import MultiplyWidthBy from 'kwoter/constants/did-scroll-document-multiplier';
import QuoteContainingElement from 'kwoter/constants/quote-containing-element';

// This is just a built in configurable buffer so
// that there's some extra time to fetch and render
// quotes as the user scrolls to the right-most edge
// of the $(document)
const buffer = 50;

export default Ember.Service.extend({
  store:      Ember.inject.service(),
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
      this.widenQuoteContainer();
      store.query('quote', { limit: numberOfQuotesToGrab }).then( () => {
        let strategy = this.get('strategy');
        strategy.set('where','right');
      });
    }
  },

  isScrolledRight(){
    let $viewportWidth = Ember.$(window).width();
    let $documentWidth = Ember.$(document).width();

    let $leftEdgeOfViewport = Ember.$(window).scrollLeft();
    let $breakpoint = $documentWidth - $viewportWidth;

    return ($leftEdgeOfViewport + buffer) > $breakpoint;
  },

  widenQuoteContainer(){
    let $viewport = Ember.$(window);
    let $quoteContainingElement = Ember.$(QuoteContainingElement);
    let expandBy = $viewport.width() * MultiplyWidthBy;
    let newWidth = $quoteContainingElement.width() + expandBy;
    $quoteContainingElement.width(newWidth);
  }
});
