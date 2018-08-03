import {match, not} from '@ember/object/computed';
import {computed, observer} from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  headerMessage: 'haha~ Coming Soon',
  emailAddress:  '',

  actualEmailAddress: computed('emailAddress', function() {
    console.log('actual emailAddress function is called', this.get('emailAddress'));
  }),

  emailAddressChanged: observer('emailAddress', function() {
    console.log('observer is called', this.get('emailAddress'));
  }),

  // isDisabled:computed('emailAddrss', function() {
  //   return this.get('emailAddress') === '';
  // }),
  // isDisabled: empty('emailAddress'),

  isValid: match('emailAddress', /^.+@.+\..+$/),
  isDisabled: not('isValid'),

  actions: {
    saveInvitation() {
      const email = this.get('emailAddress');

      const newInvitation = this.store.createRecord('invitation', {  email:email });
      // newInvitation.save().then()
      //   .catch(e => {
      //     console.log(e.errors);
      //   });

      newInvitation.save().then(response => {
        this.set('responseMessage', `Thank you. We've just got your email address with the follwing ID:  ${response.get('id')}`);
        this.set('emailAddress', '');
      });

    }
  }
});
