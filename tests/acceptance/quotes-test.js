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

const addQuoteIconClass =          '.fa-plus-square-o';
const addQuoteModalClass =         '.add-quote-modal-form';
const quoteModalTextInputClass =   '.quote-text';
const quoteModalQuoteeInputClass = '.quote-quotee';

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
    assert.equal(find(`div.quote:first:contains(${firstCreatedQuote.text})`).length,
                       1, 'the first quotes text is there');
    // Saw this style from testing Global Ember Meet up Vid
    // div.quote:eq(0)
    assert.equal(find(`div.quote:nth-of-type(2):contains(${secondCreatedQuote.text})`).length,
                       1,'the second quotes text is there');
    assert.equal(find(`div.quote:nth-of-type(3):contains(${thirdCreatedQuote.text})`).length,
                       1, 'the third quotes text is there');

    // Test that another attribute, the quotee, is also rendered
    assert.equal(find(`div.quote:first:contains(${firstCreatedQuote.quotee})`).length,
                       1, 'the first quotes quotee is there');
    assert.equal(find(`div.quote:nth-of-type(2):contains(${secondCreatedQuote.quotee})`).length,
                       1,'the second quotes quotee is there');
    assert.equal(find(`div.quote:nth-of-type(3):contains(${thirdCreatedQuote.quotee})`).length,
                       1,'the third quotes quotee is there');

  });
});

test('user sees modal after clicking the add-quote-icon', function(assert){
  visit('/');
  andThen( () => {
    click(addQuoteIconClass);
  });

  andThen( () => {
    assert.equal(find(addQuoteModalClass).length, 1, 'The quote modal renders');
    assert.equal(find(quoteModalTextInputClass).length, 1, 'quote modal has a text input');
    assert.equal(find(quoteModalQuoteeInputClass).length, 1, 'quote modal has a quotee input');
  });
});

test('after adding quote through the modal, user sees quote added to UI', function(assert){
  let currentNumberOfQuotesRendered;
  let createQuoteFormInputData = {
    text: faker.lorem.sentence(),
    quotee: 'Harry McGee'
  };

  visit('/');
  andThen( () => {
    // So that we can just test that amount rendered increase by one.
    currentNumberOfQuotesRendered = find('quote').length;
    click(addQuoteIconClass);
  });
  andThen( () => {
    fillIn('.quote-text',   createQuoteFormInputData.text);
    fillIn('.quote-quotee', createQuoteFormInputData.quotee);
    click('.quote-button');
  });

  andThen( () => {
    var lastQuoteIndex = server.db.quotes.length - 1;
    assert.equal(server.db.quotes[lastQuoteIndex].quotee, createQuoteFormInputData.quotee);

    var quotes = find('.quote');
    assert.equal(quotes.length, currentNumberOfQuotesRendered+1, 'one quote is added to the UI');
    assert.equal(find(addQuoteModalClass).length,0,'Modal exits the UI and user just sees the quotes');
  });
});

