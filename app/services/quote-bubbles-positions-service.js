import Ember from 'ember';
import { steppedRandomInteger } from '../utils/random-numbers';
import QuoteContainingElement  from 'kwoter/constants/quote-containing-element';
import MultiplyWidthBy from 'kwoter/constants/did-scroll-document-multiplier';

const tooManyTries = 1000;

export default Ember.Service.extend({
  positions: [],
  quoteContainingElement: QuoteContainingElement,
  heightBuffer: 50,
  widthBuffer: 100,
  averageHeight: 20,
  averageWidth: 400,
  negativeSpaceBuffer: 10, // Just an arbitrary multiplier to ensure more or less spacing outside of specific bubble buffers
  attempts: 0,
  store: Ember.inject.service(),
  positionStrategy: Ember.inject.service(),
  averageBubbleArea: Ember.computed('averageHeight', 'averageWidth', 'heightBuffer', 'widthBuffer', function() {
    return ( this.get('averageHeight') + this.get('heightBuffer') ) *
           ( this.get('averageWidth')  + this.get('widthBuffer') ) ;
  }),
  quoteContainerHeight: Ember.computed('quoteContainingElement', function(){
    let element = this.get('quoteContainingElement');
    return Ember.$(element).height();
  }),
  quoteContainerWidth: Ember.computed('quoteContainingElement', function(){
    let element = this.get('quoteContainingElement');
    return Ember.$(element).width();
  }),
  documentArea: Ember.computed('quoteContainerHeight','quoteContainerWidth',function(){
    let height = this.get('quoteContainerHeight');
    let width = this.get('quoteContainerWidth');
    return height * width;
  }),

  addPosition(coordinates){
    let store = this.get('store');
    store.createRecord('quote-bubble',coordinates);
  },

  isDocumentFull(){
    let documentArea = this.get('documentArea');
    let averageBubbleArea = this.get('averageBubbleArea');
    let totalAreaCoveredByQuoteBubbles = ( Ember.$('.quote').length + this.get('negativeSpaceBuffer') ) * averageBubbleArea;
    return totalAreaCoveredByQuoteBubbles > documentArea;
  },

  generateNotOverlappingPosition(dimensions){
    let positionToTry = this.generateRandomPosition(dimensions);
    let attempts = this.get('attempts');

    if ( this.isDocumentFull() ) {
      // console.log("ITS FULL");
      return false;
    } else {
      if ( !this.isOverlap(positionToTry) ) {
        this.set('attempts', 0);
        this.addPosition(positionToTry);
        return positionToTry;
      } else if (attempts > tooManyTries) {
        // console.log('too many tries');
        return false;
      } else {
        this.incrementProperty('attempts');
        // console.log('attempts' + this.get('attempts'));

        // TODO write test for bug of the following line
        // being this.generateNotOverlappingPosition();
        return this.generateNotOverlappingPosition(dimensions);
      }
    }
  },

  generateRandomPosition(dimensions){
    let quoteContainer = Ember.$(this.get('quoteContainingElement'));
    let viewportWidth = Ember.$(window).width();
    let viewportHeight = Ember.$(window).height();

    let topEdge  = 0;
    let bottomEdge = quoteContainer.height();
    let leftEdge = 0;
    let rightEdge = quoteContainer.width();
    let location = this.get('positionStrategy.where')


    if ( location === 'right' ) {
      leftEdge = quoteContainer.width() - (viewportWidth * MultiplyWidthBy);
      rightEdge = quoteContainer.width();
    }

    if (location === 'up') {
      // TODO These could just be placed 'inside' of the most recently prepended div as well.
      let baseMultiplier = 2;  //Just an arbitrary number to get the quotes placed high enough in the document so that the user scrolls into them.
      let numberOfPrepends = $('.prepended').length;
      let multiplier = Math.max(baseMultiplier, numberOfPrepends);

      bottomEdge = 0;
      topEdge = (0 - viewportHeight) * multiplier * baseMultiplier;
    }

    let randomCssLeft =
      steppedRandomInteger(leftEdge, rightEdge, 10);
    let randomCssTop =
      steppedRandomInteger(topEdge, bottomEdge, 10);

    return {
      top: randomCssTop,
      bottom: randomCssTop + dimensions.height,
      left: randomCssLeft,
      right: randomCssLeft + dimensions.width
    };
  },

  isOverlap(coordinates){
    let store = this.get('store');
    let quoteBubbles = store.peekAll('quote-bubble');
    let that = this;
    return quoteBubbles.any(function(quoteBubble){
      // console.log("quoteBubble coordinates: "+ JSON.stringify(quoteBubble.get('coordinates')));
      // console.log("toTry coordinates: " + JSON.stringify(coordinates));

      return (that.isLeftEdgeOverlap(quoteBubble,   coordinates)   ||
              that.isRightEdgeOverlap(quoteBubble,  coordinates)   ||
              that.isTopEdgeOverlap(quoteBubble,    coordinates)   ||
              that.isBottomEdgeOverlap(quoteBubble, coordinates) );
    });
  },

  isLeftEdgeOverlap(quoteBubble, newCoordinates){
    return newCoordinates.left.between(
      quoteBubble.get('left'),
      quoteBubble.get('right')
    );
  },

  isRightEdgeOverlap(quoteBubble, newCoordinates){
    return newCoordinates.right.between(
      quoteBubble.get('left'),
      quoteBubble.get('right')
    );
  },

  isTopEdgeOverlap(quoteBubble, newCoordinates){
    return newCoordinates.top.between(
      quoteBubble.get('bottom'),
      quoteBubble.get('top')
    );
  },

  isBottomEdgeOverlap(quoteBubble, newCoordinates){
    return newCoordinates.bottom.between(
      quoteBubble.get('bottom'),
      quoteBubble.get('top')
    );
  },
});
