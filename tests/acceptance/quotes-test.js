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

test('visiting /quotes loads all the quotes, their text, and author name', function(assert) {
  var createdQuotes = server.createList('quote', 3);
  var firstCreatedQuote = createdQuotes[0];
  var secondCreatedQuote = createdQuotes[1];
  var thirdCreatedQuote = createdQuotes[2];

  visit('/');

  andThen(function() {
    var quotes = find('.quote');
    assert.equal(quotes.length, 3);

    // Test that all the quotes text is rendered
    assert.equal(find(`div:first:contains(${firstCreatedQuote.text})`).length,
                       1, 'the first quotes text is there');
    assert.equal(find(`div:nth-of-type(2):contains(${secondCreatedQuote.text})`).length,
                       1,'the second quotes text is there');
    assert.equal(find(`div:nth-of-type(3):contains(${thirdCreatedQuote.text})`).length,
                       1, 'the third quotes text is there');

    // Test that another attribute, the quotee, is also rendered
    assert.equal(find(`div:first:contains(${firstCreatedQuote.quotee})`).length,
                       1, 'the first quotes quotee is there');
    assert.equal(find(`div:nth-of-type(2):contains(${secondCreatedQuote.quotee})`).length,
                       1,'the second quotes quotee is there');
    assert.equal(find(`div:nth-of-type(3):contains(${thirdCreatedQuote.quotee})`).length,
                       1,'the third quotes quotee is there');

  });
});

test('user sees a form to submit a quote', function(assert){
  visit('/');

  andThen(function(){
    assert.equal(find('.create-quote-form').length, 1, 'theres a quote form');
  });
});

