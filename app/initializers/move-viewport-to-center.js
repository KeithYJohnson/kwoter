export function initialize(/* container, application */) {
  // Resize-document Whatever-x'ed the document size by area
  // This moves the viewport to the center of the newly
  // enlarged document
  let viewport = {
    l: $(window).scrollLeft(),
    t: $(window).scrollTop(),
    w: $(window).width(),
    h: $(window).height()
  };

  function addElementAtCenterOfBody(width, height){
    let body = $('body');
    let centeredHeight = `${height / 3}px`;
    let centeredWidth = `${width / 3}px`;

    body.append(
      $("<div class='for-centering'/>").css({ top:centeredHeight, left:centeredWidth })
    );
  }

  if ( viewport.l === 0 && viewport.t === 0){
    addElementAtCenterOfBody(viewport.width, viewport.height);
    $(window).scrollTop($('div.for-centering').offset().top);
  }
}

export default {
  name: 'move-viewport-to-center',
  after: 'resize-document',
  initialize: initialize
};
