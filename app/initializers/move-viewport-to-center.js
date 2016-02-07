import Ember from 'ember';

export function initialize(/* container, application */) {
  // Resize-document Whatever-x'ed the document size by area
  // This moves the viewport to the center of the newly
  // enlarged document
  let viewport = {
    l: Ember.$(window).scrollLeft(),
    t: Ember.$(window).scrollTop(),
    w: Ember.$(window).width(),
    h: Ember.$(window).height()
  };

  function addElementAtCenterOfBody(width, height){
    let body = Ember.$('body');
    let centeredHeight = `Ember.${height / 3}px`;
    let centeredWidth = `Ember.${width / 3}px`;

    body.append(
      Ember.$("<div class='for-centering'/>").css({ top:centeredHeight, left:centeredWidth })
    );
  }

  if ( viewport.l === 0 && viewport.t === 0){
    addElementAtCenterOfBody(viewport.width, viewport.height);
    Ember.$(window).scrollTop(Ember.$('div.for-centering').offset().top);
  }
}

export default {
  name: 'move-viewport-to-center',
  after: 'resize-document',
  initialize: initialize
};
