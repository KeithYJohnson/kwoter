import Ember from 'ember';
import {  steppedRandomInteger } from '../utils/random-numbers';

const tooManyTries = 1000;

export default Ember.Service.extend({
  positions: [],
  quoteContainingElement: 'body',
  heightBuffer: 50,
  widthBuffer: 100,
  averageHeight: 20,
  averageWidth: 400,
  negativeSpaceBuffer: 25,
  attempts: 0,
  averageBubbleArea: Ember.computed('averageHeight', 'averageWidth', 'heightBuffer', 'widthBuffer', function() {
    return ( this.get('averageHeight') + this.get('heightBuffer') ) *
           ( this.get('averageWidth')  + this.get('widthBuffer') ) ;
  }),


  addPosition(coordinates){
    let positions = this.get('positions');
    positions.push(coordinates);
  },

  isDocumentFull(){
    let quoteContainingElement = this.get('quoteContainingElement');
    let documentArea = Ember.$(quoteContainingElement).width() * Ember.$(quoteContainingElement).height();

    let averageBubbleArea = this.get('averageBubbleArea');
    let totalAreaCoveredByQuoteBubbles = ( Ember.$('.quote').length + this.get('negativeSpaceBuffer') ) * averageBubbleArea;
    return totalAreaCoveredByQuoteBubbles > documentArea;
  },

  generateNotOverlappingPosition(){
    let positionToTry = this.generateRandomPosition();
    let attempts = this.get('attempts');

    if ( this.isDocumentFull() ) {
      return false;
    } else {
      if ( !this.isOverlap(positionToTry) ) {
        this.set('attempts', 0);
        this.addPosition(positionToTry);
        return positionToTry;
      } else if (attempts > tooManyTries) {
        console.log('too many tries');
        return false;
      } else {
        this.incrementProperty('attempts');
        console.log('attempts' + this.get('attempts'));

        // TODO write test for bug of the following line
        // being this.generateNotOverlappingPosition();
        return this.generateNotOverlappingPosition();
      }
    }
  },

  generateRandomPosition(){
    let quoteContainer = Ember.$(this.get('quoteContainingElement'));
    let randomCssLeft =
      steppedRandomInteger(0, quoteContainer.width(), 10);
    let randomCssTop =
      steppedRandomInteger(0, quoteContainer.height(), 10);

    return {
      left: randomCssLeft,
      top: randomCssTop,
      right: randomCssLeft + this.get('averageWidth'),
      bottom: randomCssTop + this.get('averageHeight')
    };
  },

  isOverlap(coordinates){
    let positions = this.get('positions');
    for (var rectangle of positions) {
      return (this.isLeftEdgeOverlap(rectangle,   coordinates)   ||
              this.isRightEdgeOverlap(rectangle,  coordinates)   ||
              this.isTopEdgeOverlap(rectangle,    coordinates)   ||
              this.isBottomEdgeOverlap(rectangle, coordinates) );
    }
  },

  isLeftEdgeOverlap(rectangle, newCoordinates){
    return newCoordinates.left.between(
      rectangle.left,
      rectangle.right
    );
  },

  isRightEdgeOverlap(rectangle, newCoordinates){
    return newCoordinates.right.between(
      rectangle.left,
      rectangle.right
    );
  },

  isTopEdgeOverlap(rectangle, newCoordinates){
    return newCoordinates.top.between(
      rectangle.bottom,
      rectangle.top
    );
  },

  isBottomEdgeOverlap(rectangle, newCoordinates){
    return newCoordinates.bottom.between(
      rectangle.bottom,
      rectangle.top
    );
  },


});
