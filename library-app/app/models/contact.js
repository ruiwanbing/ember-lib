import DS from 'ember-data';

export default DS.Model.extend({
  emailAddress: DS.attr('string'),
  message: DS.attr('string')
});
