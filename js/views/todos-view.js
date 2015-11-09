var app = app || {};

app.TodoView = Backbone.View.extend({
    tagName: 'li',
    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),
    events: {
        'click .toggle': 'toggleCompleted',
        'click .destroy': 'clear',
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },
    // The TodoView listens for changes to its model, re-rendering. Since
    // there's a one-to-one correspondence between a **Todo** and a
    // **TodoView** in this app, we set a direct reference on the model for
    // convenience.
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    // Re-render the titles of the todo item
    render: function () {
        if (this.model.changed.id !== undefined) {
            return;
        }
        this.$el.html(this.template(this.model.toJSON()));
        this.$input = this.$('.edit');
        this.toggleVisible();
        this.$el.toggleClass('completed', this.model.get('completed'));
        return this;
    },

    toggleVisible: function () {
        this.$el.toggleClass('hidden', this.isHidden());
    },

    isHidden: function () {
        return this.model.get('completed') ?
        app.TodoFilter === 'active' :
        app.TodoFilter === 'completed';
    },
    // Switch this view into `"editing"` mode, displaying the input field
    edit: function () {
        this.$el.addClass('editing');
        this.$input.focus();
    },
    // Close the `"editing"` mode, saving changes to the todo.
    close: function () {
        var value = this.$input.val().trim();
        if (value) {
            this.model.save({title: value});
        }
        this.$el.removeClass('editing');
    },
    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function (e) {
        if (e.which === ENTER_KEY) {
            this.close();
        }
    },
    // Toggle the `"completed"` state of the model.
    toggleCompleted: function () {
        this.model.toggle();
    },
    // Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function () {
        this.model.destroy();
    }

});