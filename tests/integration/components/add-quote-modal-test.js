import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from '../../helpers/mirage-integration';

moduleForComponent('add-quote-modal', 'Integration | Component | add quote modal', {
  integration: true,
  setup() {
    // Setting up for ember wormhole
    // https://github.com/yapplabs/ember-modal-dialog/issues/78.
    var modalContainerEl = document.createElement("div");
    modalContainerEl.id = 'modal-overlays';
    var rootEl = document.querySelector("#ember-testing");
    rootEl.appendChild(modalContainerEl);
    this.container.register('config:modals-container-id', 'modal-overlays', {instantiate: false});
    this.container.injection('component:modal-dialog', 'destinationElementId', 'config:modals-container-id');

    // Intercept HTTP POSTs with mirage.
    setupMirage(this.container);
  }
});

test('it closes after successful submit', function(assert) {
  assert.expect(1);

  // These get pushed down into submit-quote-form.js
  this.set('text','oh hai');
  this.set('quotee','romulus');

  this.render(hbs`{{add-quote-modal text=text quotee=quotee}}`);

  let triggerModalIcon = $('.fa-plus-square-o');
  triggerModalIcon.click();

  let quoteFormSubmitButton = $('.quote-button');
  quoteFormSubmitButton.click();


  let isTheModalStillAround = $('.ember-modal-dialog');
  assert.equal(isTheModalStillAround.length, 0, 'The user successfully submitted the quote and the modal disappears');
});
