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

test('visiting /quotes loads all the quotes', function(assert) {
  server.createList('quote', 3);
  visit('/');

  andThen(function() {
    var quotes = find('.quote');
    assert.equal(quotes.length, 3);
  });
  // andThen(function() {
  //   equal( find('li').length, 3 );
  //   equal( find('li:first').text(), users[0].name );
  // });
});
