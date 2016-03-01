import { moduleFor, test } from 'ember-qunit';

moduleFor('service:right-scroll-listener', 'Unit | Service | right scroll listener', {
  // Specify the other units that are required for this test.
  needs: ['service:quote-bubbles-positions-service',
          'service:how-many-quotes-will-fit-calculator',
          'model:quote']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('didScroll', function(assert) {
  var service = this.subject();
  service.didScroll();
  assert.ok(service, 'remove this test');
});


test('isScrolledRight', function(assert){
  var service = this.subject();
  assert.equal(service.isScrolledRight(),false, 'returns false when the user isnt scrolled past the right boundary');

  let $viewportWidth = $(window).width();
  let $documentWidth = $(document).width();

  let $breakpoint = $documentWidth - $viewportWidth;

  let $pastBreakpoint = $breakpoint + 50;

  $().animate({
    scrollLeft: $pastBreakpoint
  });

  assert.equal(service.isScrolledRight(),true, 'returns true when the user is scrolled past the right boundary');

});
