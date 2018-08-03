import {match, not, notEmpty, and} from '@ember/object/computed';
import {computed, observer} from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  headerMessage: 'Contact us',
  emailAddress:  '',
  message:'',
  // actualEmailAddress: computed('emailAddress', function() {
  //   console.log('actual emailAddress function is called', this.get('emailAddress'));
  // }),
  //
  emailAddressChanged: observer('emailAddress', function() {
    console.log('observer is called', this.get('emailAddress'));
    console.log(this.get('isValid'));
  }),

  // isDisabled:computed('emailAddrss', function() {
  //   return this.get('emailAddress') === '';
  // }),
  // isDisabled: empty('emailAddress'),
  isValidEmail: match('emailAddress', /^.+@.+\..+$/),
  isValidMsg: notEmpty('message'),
  isValid: and('isValidEmail' , 'isValidMsg'),
  isDisabled: not('isValid'),

  actions: {
    saveInvitation() {
      alert(`Saving the email ddress is in progress: ${this.get('emailAddress')}`);
      this.set('responseMessage', `Thank you. We've just got your email address: ${this.get('emailAddress')}`);
      this.set('emailAddress', '');
    }
  }
});
