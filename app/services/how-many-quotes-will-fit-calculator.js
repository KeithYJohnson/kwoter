import Ember from 'ember';

export default Ember.Service.extend({
  positioner: Ember.inject.service('quote-bubbles-positions-service'),
  quoteBubblesPositionsService: Ember.inject.service(),
  viewportsToFill: 3, // Take current viewport and render quotes up to this many viewports over

  calculate(){
    let positioner = this.get('positioner');
    let averageBubbleArea = positioner.get('averageBubbleArea');
    let documentArea =      positioner.get('documentArea');
    let viewportsToFill =   this.get('viewportsToFill');

    let areaToFill = documentArea * viewportsToFill;
    let numberOfQuotesThatWillFit = Math.floor(areaToFill / averageBubbleArea);
    return numberOfQuotesThatWillFit;
  }
});
