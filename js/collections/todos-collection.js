var app = app || {};

var TodoList = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: app.Todo,
    /// Save all of the todo items under this example's namespace.
    localStorage: new Backbone.LocalStorage('todos-backbone'),
    // Filter down the list of all todo items that are finished.
    completed: function () {
        return this.filter(function (todo) {
            return todo.get('completed');
        });
    },
    // Filter down the list to only todo items that are still not finished.
    remaining: function () {
        // apply helps to determine context this in our function scope
        return this.without.apply(this, this.completed());
    },

    nextOrder: function () {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },
// Tasks are sorted in order of their entry
    comparator: function (todo) {
        return todo.get('order');
    }

});
// Create our global collection of **Todos**.
app.Todos = new TodoList();

//Methods this.filter, this.without this.last and are part of the Underscore lib

/* completed: function () {                                      2-d variant
 return this.where({completed: true});
 },

 // Filter down the list to only todo items that are still not finished.
 remaining: function () {
 return this.where({completed: false});
 }, */