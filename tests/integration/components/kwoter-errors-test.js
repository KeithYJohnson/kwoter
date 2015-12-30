import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('kwoter-errors', 'Integration | Component | kwoter errors', {
  integration: true
});

test('if renders errors in kwoter-error if they are present', function(assert) {
  assert.expect(1);

  let errors = [
    { message: 'you forgot to add text you dummy' },
    { message: 'who uttereth\'d the quote?' }
  ];

  this.set('errors', errors);

  this.render(hbs`{{kwoter-errors errors=errors}}`);

  // Not sure the best way to test that it simply renders one
  // kwoter-error component for each error in this.errors.
  // So I'm coupling the test to the className of the kwoter-error component.
  // Ideally I could import the class name of kwoter-error here
  // or do something like errorComponents = find(#kwoter-error)
  let foundErrors = $('.kwoter-error');
  assert.equal(foundErrors.length, errors.length);
});
