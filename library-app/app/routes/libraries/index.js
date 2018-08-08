import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('library');
  },
  actions: {
    deleteLibrary(library) {
      console.log('DELETE');
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        library.destroyRecord();
      }
    }
  }
});
