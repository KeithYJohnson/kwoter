import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'kwoter/tests/helpers/start-app';

module('Acceptance | quotes', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /quotes', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('visiting /quotes', function(assert) {
  visit('/');

  andThen(function() {
    var quotes = find('.quote');

    assert.equal(quotes.length, 3);
  });
});
