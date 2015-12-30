import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'kwoter/tests/helpers/start-app';
import { faker } from 'ember-cli-mirage';

module('Acceptance | quotes', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

const addQuoteIconClass =          '.add-quote-icon';
const addQuoteModalClass =         '.add-quote-modal';
const quoteModalTextInputClass =   '.quote-modal-text-input';
const quoteModalQuoteeInputClass = '.quote-modal-quotee-input';

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
    assert.equal(find('.submit-quote-form').length, 1, 'theres a quote form');
  });
});

test('user can fill out the form and submit', function(assert){
  server.createList('quote', 3);

  let createQuoteFormInputData = {
    text: faker.lorem.sentence(),
    quotee: 'Harry McGee'
  };

  visit('/');

  andThen(function(){
    fillIn('.quote-text',   createQuoteFormInputData.text);
    fillIn('.quote-quotee', createQuoteFormInputData.quotee);
    click('.quote-button');

    andThen(() => {
      // Test that its persisted correctly
      var lastQuoteIndex = server.db.quotes.length - 1;
      assert.equal(server.db.quotes[lastQuoteIndex].quotee, createQuoteFormInputData.quotee);

      // Test that all the users quotes are still rendered plus the new one
      var quotes = find('.quote');
      assert.equal(quotes.length, 4);
    });
  });
});

test('user doesnt cant submit because the button is disabled', function(assert){
  visit('/');
  andThen(() => {
    fillIn('.quote-quotee', 'Harry McGeraldson');
    click('.quote-button');

    andThen(() =>{
      assert.equal(server.db.quotes.length, 0, 'The quote wasn\'t added to the store.');
      assert.equal(find('.quote-button:disabled').length, 1, 'the button is disabled');
    });
  });
});

test('user doesnt add the quote\'s quotee and sees errors', function(assert){
  visit('/');
  andThen(() =>{
    fillIn('.quote-text', 'I invented the internet.');
    click('.quote-button');

    andThen(() =>{
      assert.equal(server.db.quotes.length, 0, 'The quote wasn\'t added to the store.');
      assert.equal(find('.quote-button:disabled').length, 1, 'the button is disabled');
    });
  });
});

test('user sees modal after clicking the add-quote-icon', function(assert){
  visit('/');
  click(addQuoteIconClass);
  andThen( () => {
    assert.equal(find(addQuoteModalClass).length, 1, 'The quote modal renders');
    assert.equal(find(quoteModalTextInputClass).length, 1, 'quote modal has a text input');
    assert.equal(find(quoteModalQuoteeInputClass).length, 1, 'quote modal has a quotee input');
  });
});
