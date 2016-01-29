import { moduleFor, test } from 'ember-qunit';
import _ from 'lodash/lodash';
import Ember from 'ember';

let getBoundingClientRect = {
  bottom: 95.8125,
  height: 28,
  left: 18,
  right: 528,
  top: 67.8125,
  width: 510
};

let bottomEdgeOverlappingRect = {
  bottom: 68
};

let topEdgeOverlappingRect = {
  bottom: 95.8125,
  left: 18,
  right: 528,
  top: 94.8125,
  width: 510
};

let leftEdgeOverlappingRect = {
  bottom: 95.8125,
  height: 28,
  left: 527,
  right: 1038,
  top: 67.8125,
  width: 510
};

let rightEdgeOverlappingRect = {
  bottom: 95.8125,
  height: 28,
  left: 9,
  right: 19,
  top: 67.8125,
  width: 10
};

moduleFor('service:quote-bubbles-positions-service', 'Unit | Service | quote bubbles positions', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  beforeEach(){
    // var service = this.subject
  }
});

test('generateNotOverlappingPosition() when theres room', function(assert){
  let service = this.subject();

  let position = service.generateNotOverlappingPosition();

  assert.ok(position.top);
  assert.ok(position.left);
  assert.ok(position.right);
  assert.ok(position.bottom);
});

test('generateNotOverlappingPosition() when theres no room', function(assert){
  let service = this.subject();
  let body = $(service.get('quoteContainingElement'));

  _.times(100, function(){
    body.append( Ember.$("<div class='quote'/>") );
  });

  assert.notOk(service.generateNotOverlappingPosition());
});

test('document is not full: isDocumentFull()', function(assert){
  let service = this.subject();

  let body = Ember.$('body');

  // 97% of our visitors have a screen resolution of 1024x768 pixels or higher
  body.css({height: '768px', width: '1024px'});

  body.append( Ember.$("<div class='quote'/>") );
  assert.ok(service.isDocumentFull(), false, 'returns false when theres space for more quote bubbles');
});

test('document is full: isDocumentFull()', function(assert){
  let service = this.subject();

  let body = Ember.$('body');
  // 97% of our visitors have a screen resolution of 1024x768 pixels or higher
  Ember.$('body').css({height: '768px', width: '1024px'});

  _.times(100, function(){
    body.append( Ember.$("<div class='quote'/>") );
  });

  assert.ok(service.isDocumentFull(), true, 'returns true when theres no space for more quote bubbles');
});

test('generateRandomPosition', function(assert) {
  let service = this.subject();

  let position = service.generateRandomPosition();

  assert.ok(position.top, 'it has a value for top');
  assert.ok(position.bottom, 'it has a value for bottom');
  assert.ok(position.left, 'it has a value for left');
  assert.ok(position.right, 'it has a value for right');
});

test('addPosition', function(assert){
  var service = this.subject();
  var startingLength = service.get('positions').length;

  service.addPosition(getBoundingClientRect);
  assert.equal(
    service.get('positions').length,
    startingLength += 1, 'it pushses the positions onto the array'
  );
});

test('isOverlap', function(assert){
  var service = this.subject();
  service.addPosition(getBoundingClientRect);
  assert.equal(
    service.isOverlap(leftEdgeOverlappingRect),
    true, 'any edge of the rectangle overlaps'
  );
});

test('isLeftEdgeOverlap', function(assert){
  let service = this.subject();
  assert.equal(
    service.isLeftEdgeOverlap(getBoundingClientRect, leftEdgeOverlappingRect),
    true, 'the left edge of the rectangle overlaps'
  );
});

test('isRightEdgeOverlap', function(assert){
  let service = this.subject();
  assert.equal(
    service.isRightEdgeOverlap(getBoundingClientRect, rightEdgeOverlappingRect),
    true, 'right edge of the rectangle overlaps'
  );
});

test('isTopEdgeOverlap', function(assert){
  let service = this.subject();
  assert.equal(
    service.isTopEdgeOverlap(getBoundingClientRect, topEdgeOverlappingRect),
    true, 'top edge of the rectangle overlaps'
  );
});

test('isTopEdgeOverlap', function(assert){
  let service = this.subject();
  assert.equal(
    service.isBottomEdgeOverlap(getBoundingClientRect, bottomEdgeOverlappingRect),
    true, 'bottom edge of the rectangle overlaps'
  );
});
