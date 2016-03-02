import Ember from 'ember';
import ScrollerSwitch from 'kwoter/mixins/scroller-switch';

const buffer = 50;

export default Ember.Service.extend(ScrollerSwitch, {
  didScroll(){
    if ( this.isScrolledToBottom() ){

    }
  },

  isScrolledToBottom(){
    let $viewportHeight = Ember.$(window).height();
    let $documentHeight = Ember.$(document).height();

    let $bottomOfViewport = Ember.$(window).scrollTop();
    let $breakpoint = $documentHeight - $viewportHeight;

    return ($bottomOfViewport + buffer) > $breakpoint;
  },
});
