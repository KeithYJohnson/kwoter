import Ember from 'ember';
import MultiplyWidthBy from 'kwoter/constants/did-scroll-document-multiplier';
import QuoteContainingElement from 'kwoter/constants/quote-containing-element';
import ScrollerSwitch from 'kwoter/mixins/scroller-switch';

const buffer = 10;

export default Ember.Service.extend(ScrollerSwitch, {
  store:      Ember.inject.service(),
  calculator: Ember.inject.service('how-many-quotes-will-fit-calculator'),
  strategy:   Ember.inject.service('position-strategy'),

  didScroll(){
    if ( this.isScrolledUp() ){
      // let store = this.get('store');
      // let calculator = this.get('calculator');
      //
      // let numberOfQuotesToGrab = calculator.calculate();
      // this.widenQuoteContainer();
      // store.query('quote', { limit: numberOfQuotesToGrab }).then( () => {
      //   let strategy = this.get('strategy');
      //   strategy.set('where','up');
      // });
    }
  },

  isScrolledUp(){
    let $viewportHeight = Ember.$(window).height();
    let $documentHeight = Ember.$(document).height();

    let $topEdgeOfViewport = Ember.$(window).scrollTop();
    let $breakpoint = 0;

    return $topEdgeOfViewport <= $breakpoint + buffer;
  },

  widenQuoteContainer(){
    // let $viewport = Ember.$(window);
    // let $quoteContainingElement = Ember.$(QuoteContainingElement);
    // let expandBy = $viewport.width() * MultiplyWidthBy;
    // let newWidth = $quoteContainingElement.width() + expandBy;
    // $quoteContainingElement.width(newWidth);
  }
});
