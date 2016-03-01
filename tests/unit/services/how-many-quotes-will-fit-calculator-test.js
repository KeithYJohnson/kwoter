import { moduleFor, test } from 'ember-qunit';
let startingScreenWidth, startingScreenHeight;

moduleFor('service:how-many-quotes-will-fit-calculator', 'Unit | Service | how many quotes will fit calculator', {
  // Specify the other units that are required for this test.
  needs: ['service:quote-bubbles-positions-service',
          'service:how-many-quotes-will-fit-calculator'],

  beforeEach(){
    startingScreenWidth  = $(window).width();
    startingScreenHeight = $(window).height();
  },
  afterEach(){
    window.resizeTo(startingScreenWidth,startingScreenHeight);
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

// Purpose of these two tests is mainly to run the calculation
// against two different known sizes to ensure they're different
test('calculate() with some <body> dimension', function(assert){
  let height = 1000;
  let width = 1000;

  let service = this.subject();
  let viewportsToFill = service.get('viewportsToFill');

  let positioner = service.get('positioner');
  let elementString = positioner.get('quoteContainingElement');
  let element = $(elementString);
  element.height(height);
  element.width(width);

  let expected = Math.floor((viewportsToFill * height * width) / positioner.get('averageBubbleArea'));
  let actual = service.calculate();

  assert.equal(expected, actual, 'It calculated how many more quotes to get');
});

test('calculate() with some other <body> dimension', function(assert){
  let height = 1500;
  let width = 1500;

  // Arranging up a document size
  let service = this.subject();
  let viewportsToFill = service.get('viewportsToFill');

  let positioner = service.get('positioner');
  let elementString = positioner.get('quoteContainingElement');
  let element = $(elementString);
  element.height(height);
  element.width(width);

  let expected = Math.floor((viewportsToFill * height * width) / positioner.get('averageBubbleArea'));
  let actual = service.calculate();

  assert.equal(expected, actual, 'It calculated how many more quotes to get');
});
