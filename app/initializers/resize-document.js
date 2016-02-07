import Ember from 'ember';

export function initialize(/* container, application */) {
  let doc = Ember.$(document);
  let documentHeight = doc.height();
  let documentWidth = doc.width();
  console.log('Original Height: ' + documentHeight + " Original Width: " + documentWidth);

  let resizedElement = Ember.$('body');
  resizedElement.height(3*documentHeight);
  resizedElement.width( 3*documentWidth);
  console.log('New Height: ' + resizedElement.height()  + " New Width: " + resizedElement.width());
}

export default {
  name: 'resize-document',
  initialize: initialize
};
