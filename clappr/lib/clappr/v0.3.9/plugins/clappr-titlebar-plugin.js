var ClapprTitleBarPlugin = Clappr.UIContainerPlugin.extend({
  name: 'titlebar',
  initialize: function() {
    this.render();
  },
  bindEvents: function() {
    this.listenTo(this.container, Clappr.Events.CONTAINER_PAUSE, this.show);
    this.listenTo(this.container, Clappr.Events.CONTAINER_PLAY, this.hide);
  },
  hide: function() {
    this.$el.hide();
  },
  show: function() {
    this.$el.show();
  },
  render: function() {
    this.$el.html('Hello World!');
    this.$el.css('font-size', '100px');
    this.$el.css('color', 'white');
    this.$el.css('background-color', 'red');
    this.$el.css('position', 'relative');
    this.container.$el.append(this.$el);
    return this;
  }
});