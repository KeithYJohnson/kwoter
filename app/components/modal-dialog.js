import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  actions: {
    toggleModal() {
      console.log('hi from app/components/modal-dialog#toggleModal');
      this.sendAction('toggleModal');
    }
  }
});
