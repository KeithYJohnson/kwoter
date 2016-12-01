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
    if ( this.isScrolledLeft() ){
      console.log('leftScrollListener.didScroll().isScrolledLeft()');
      let store = this.get('store');
      let calculator = this.get('calculator');
      let numberOfQuotesToGrab = calculator.calculate();
      this.widenQuoteContainer();
      store.query('quote', { limit: numberOfQuotesToGrab }).then( () => {
        let strategy = this.get('strategy');
        strategy.set('where','left');
      });

      // let store = this.get('store');
      // let calculator = this.get('calculator');
      //
      // let numberOfQuotesToGrab = calculator.calculate();
      // this.widenQuoteContainer();
      // store.query('quote', { limit: numberOfQuotesToGrab }).then( () => {
      //   let strategy = this.get('strategy');
      //   strategy.set('where','left');
      // });
    }
  },

  isScrolledLeft(){
    let $leftEdgeOfViewport = Ember.$(window).scrollLeft();
    let $breakpoint = 0

    return ($leftEdgeOfViewport + buffer) > $breakpoint;
  },

  widenQuoteContainer(){
    let $quoteContainingElement = Ember.$(QuoteContainingElement);

    // Prepend some blank div to the top of the application container.
    let widenBy = 1100;
    let someBlankDiv = `<div class="left-prepend" style="height:${widenBy}px;position:relative;left:-1000px;"></div>`
    $quoteContainingElement.prepend(someBlankDiv);

    // Scroll the viewport down by the height of ^^div
    // let $currentScrollLeft = Ember.$(window).scrollLeft();
    // let $newScrollLeft = $currentScrollLeft + widenBy;
    // Ember.$(window).scrollLeft($newScrollLeft)
  }
});
