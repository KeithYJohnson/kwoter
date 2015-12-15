import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('submit-quote-form', 'Integration | Component | submit quote form', {
  integration: true
});

let quoteeInput = 'abe';
let textInput = 'hi there buddy';

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{submit-quote-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#submit-quote-form}}
    This should render
    {{/submit-quote-form}}
  `);

  assert.equal(this.$().text().trim(), 'This should render');
});

// test('closing an alert', function(assert) {
//   assert.expect(2);

//   var hello = Alert.create({ text: 'Hello, world!' });
//   this.set('helloAlert', hello);

//   this.render(hbs`
//     {{alert-banner alert=helloAlert closeAction='assertClosed'}}
//   `);

//   var $button = this.$('.alert-banner button');
//   assert.equal($button.length, 1);

//   this.on('assertClosed', a => assert.deepEqual(a, hello));
//   $button.click();
// });


test('user can set the quotes properties and create a record', function(assert) {
  assert.expect(2);

  // Simulate user input
  // https://github.com/ember-cli/ember-cli/issues/4532
  // In component this is actually an Ember.Object
  // but we do not have access to Ember in this test.
  let quote = {
    text: textInput,
    quotee: quoteeInput
  };

  this.set('quote',quote);

  this.set('text',textInput);
  this.set('quotee',quoteeInput);

  // Handle any anyctions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{submit-quote-form quote=quote submit='assertSubmitted'}}`);

  let foundTextInput = $('input.quote-text').val();
  let foundQuoteeInput = $('input.quote-quotee').val();
  let button = this.$('.quote-button');

  assert.equal(foundTextInput, textInput, "User set the quotes text in the form");
  assert.equal(foundQuoteeInput, quoteeInput, "User set the quotes quotee in the form");


  button.click();
});

