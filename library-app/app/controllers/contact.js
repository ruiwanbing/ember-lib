import { gte } from '@ember/object/computed';
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
  emailAddressChanged: observer('message', function() {
    console.log('observer is called', this.get('emailAddress'));
    console.log(this.get('isLongEnough'));
  }),

  // isDisabled:computed('emailAddrss', function() {
  //   return this.get('emailAddress') === '';
  // }),
  // isDisabled: empty('emailAddress'),
  isValidEmail: match('emailAddress', /^.+@.+\..+$/),
  isNotEmptyMsg: notEmpty('message'),
  isLongEnough: gte('message.length', 5),
  isValidMsg: and('isNotEmptyMsg', 'isLongEnough'),

  isValid: and('isValidEmail', 'isValidMsg'),
  isDisabled: not('isValid'),
  responseMessage: '',

  actions: {
    saveContact() {
      // alert(`Saving the email ddress is in progress: ${this.get('emailAddress')}`);
      const emailAddress = this.get('emailAddress');
      const message = this.get('message');

      const newContact = this.store.createRecord('contact', {emailAddress: emailAddress, message:message});
        newContact.save().then(response => {
          console.log('saved');
          this.set('responseMessage', `Thank you. We've just got your email address with this id: ${response.get('id')}`);
          this.set('emailAddress', '');
      });
    }
  }
});
