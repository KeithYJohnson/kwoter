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
      console.log('upwardScrollListener.didScroll().isScrolledUp()');
      // let store = this.get('store');
      // let calculator = this.get('calculator');
      //
      // let numberOfQuotesToGrab = calculator.calculate();
      this.lengthenQuoteContainer();
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

  lengthenQuoteContainer(){
    let $quoteContainingElement = Ember.$(QuoteContainingElement);

    // Prepend some blank div to the top of the application container.
    let lengthenBy = 1100;
    let someBlankDiv = `<div class="prepended" style="height:${lengthenBy}px">Hello!  I was prepended by the upwardScrollListener</div>`
    $quoteContainingElement.prepend(someBlankDiv);

    // Scroll the viewport down by the height of ^^div
    let $currentScrollTop = Ember.$(window).scrollTop();
    let $newScrollTop = $currentScrollTop + lengthenBy;
    Ember.$(window).scrollTop($newScrollTop)
  }
});
