import { moduleFor, test } from 'ember-qunit';
import _ from 'lodash/lodash';
import Ember from 'ember';
import between from 'kwoter/initializers/number-between';

let getBoundingClientRect = {
  id: 'ember-123',
  bottom: 95.8125,
  height: 28,
  left: 18,
  right: 528,
  top: 67.8125,
  width: 510
};

let leftEdgeOverlappingRect = {
  bottom: 95.8125,
  height: 28,
  left: 65,
  right: 1038,
  top: 67.8125,
  width: 510
};


moduleFor('service:quote-bubbles-positions-service', 'Unit | Service | quote bubbles positions', {
  // Specify the other units that are required for this test.
  needs: ['model:quote-bubble'],
  beforeEach(){
    between.initialize();
  }
});

test('generateNotOverlappingPosition() when theres room', function(assert){
  let service = this.subject();
  let position = Ember.run(service, 'generateNotOverlappingPosition', getBoundingClientRect);
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

  assert.notOk(service.generateNotOverlappingPosition(getBoundingClientRect));
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

  let position = service.generateRandomPosition(getBoundingClientRect);

  assert.ok(position.top, 'it has a value for top');
  assert.ok(position.left, 'it has a value for left');
});

test('addPosition', function(assert){
  let service = this.subject();
  let store = service.get('store');
  let startingLength = store.peekAll('quote-bubble').get('content').length;

  Ember.run(service, 'addPosition', getBoundingClientRect);
  assert.equal(
    store.peekAll('quote-bubble').get('content').length,
    startingLength += 1, 'it pushes the positions onto the array'
  );
});

test('isOverlap', function(assert){
  var service = this.subject();
  // Ember.run(service, 'addPosition', getBoundingClientRect);

  let store = service.get('store');
  Ember.run(store, 'createRecord', 'quote-bubble', { id: 1, left: 60, right:70 } );
  assert.equal(
    service.isOverlap(leftEdgeOverlappingRect),
    true, 'any edge of the rectangle overlaps'
  );
});

test('isLeftEdgeOverlap', function(assert){
  let service = this.subject();
  let store = service.get('store');
  let quoteBubble = Ember.run(store, 'createRecord', 'quote-bubble', { id: 1, left: 60, right:70 } );

  assert.equal(
    service.isLeftEdgeOverlap(quoteBubble, {left: 65 }),
    true, 'left edge of the rectangle overlaps'
  );
});

test('isRightEdgeOverlap', function(assert){
  let service = this.subject();
  let store = service.get('store');
  let quoteBubble = Ember.run(store, 'createRecord', 'quote-bubble', { id: 1, left: 60, right:70 } );

  assert.equal(
    service.isRightEdgeOverlap(quoteBubble, {right: 65 }),
    true, 'right edge of the rectangle overlaps'
  );
});

test('isTopEdgeOverlap', function(assert){
  let service = this.subject();
  let store = service.get('store');
  let quoteBubble = Ember.run(store, 'createRecord', 'quote-bubble', { id: 1, top: 60, bottom:70 } );

  assert.equal(
    service.isTopEdgeOverlap(quoteBubble, { top: 65 }),
    true, 'top edge of the new coordinates overlaps an already placed quote-bubble'
  );
});

test('isBottomEdgeOverlap', function(assert){
  let service = this.subject();
  let store = service.get('store');
  let quoteBubble = Ember.run(store, 'createRecord', 'quote-bubble', { id: 1, top: 60, bottom:70 } );

  assert.equal(
    service.isBottomEdgeOverlap(quoteBubble, { bottom: 65 }),
    true, 'bottom edge of the new coordinates overlaps an already placed quote-bubble'
  );
});
