import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from '../../helpers/mirage-integration';

moduleForComponent('submit-quote-form', 'Integration | Component | submit quote form', {
  integration: true,
  setup() {
    setupMirage(this.container);
  }
});

let quoteeInput = 'abe';
let textInput = 'hi there buddy';

test('user can set the quotes properties and create a record', function(assert) {
  assert.expect(3);

  // Simulate user input
  // https://github.com/ember-cli/ember-cli/issues/4532

  this.set('text',textInput);
  this.set('quotee',quoteeInput);

  // Handle any anyctions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{submit-quote-form text=text quotee=quotee submit='assertSubmitted'}}`);
  let foundTextInput   = $('input.quote-text').val();
  let foundQuoteeInput = $('input.quote-quotee').val();

  assert.equal(foundTextInput, textInput, "User set the quotes text in the form");
  assert.equal(foundQuoteeInput, quoteeInput, "User set the quotes quotee in the form");
  assert.equal(this.$('.quote-button:disabled').length, 0, 'The button is enabled');

});

test('it is invalid if the user doesnt enter the quotes text', function(assert) {
  assert.expect(1);

  this.set('text','');
  this.set('quotee',quoteeInput);

  // Handle any anyctions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{submit-quote-form text=text quotee=quotee submit='assertSubmitted'}}`);
  let disabledButton = this.$('.quote-button:disabled');

  assert.equal(disabledButton.length, 1, 'The button is disabled');
});


test('it is invalid if the user doesnt enter the quotee', function(assert) {
  assert.expect(1);

  this.set('text',textInput);
  this.set('quotee','');

  // Handle any anyctions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{submit-quote-form text=text quotee=quotee submit='assertSubmitted'}}`);
  let disabledButton = this.$('.quote-button:disabled');

  assert.equal(disabledButton.length, 1, 'The button is disabled');
});

