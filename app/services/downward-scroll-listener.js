import Ember from 'ember';
import ScrollerSwitch from 'kwoter/mixins/scroller-switch';
import MultiplyWidthBy from 'kwoter/constants/did-scroll-document-multiplier';
import QuoteContainingElement from 'kwoter/constants/quote-containing-element';

const buffer = 50;

export default Ember.Service.extend(ScrollerSwitch, {
  store:      Ember.inject.service(),
  calculator: Ember.inject.service('how-many-quotes-will-fit-calculator'),
  strategy:   Ember.inject.service('position-strategy'),

  didScroll(){
    if ( this.isScrolledToBottom() ){
      let store = this.get('store');
      let calculator = this.get('calculator');

      let numberOfQuotesToGrab = calculator.calculate();
      this.widenQuoteContainer();
      store.query('quote', { limit: numberOfQuotesToGrab }).then( () => {
        let strategy = this.get('strategy');
        strategy.set('where','down');
      });

    }
  },

  widenQuoteContainer(){
    let $viewport = Ember.$(window);
    let $quoteContainingElement = Ember.$(QuoteContainingElement);
    let expandBy = $viewport.height() * MultiplyWidthBy;
    let newHeight = $quoteContainingElement.height() + expandBy;
    $quoteContainingElement.height(newHeight);
  },

  isScrolledToBottom(){
    let $viewportHeight = Ember.$(window).height();
    let $documentHeight = Ember.$(document).height();

    let $bottomOfViewport = Ember.$(window).scrollTop();
    let $breakpoint = $documentHeight - $viewportHeight;

    return ($bottomOfViewport + buffer) > $breakpoint;
  },
});
