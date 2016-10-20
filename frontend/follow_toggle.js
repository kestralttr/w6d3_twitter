class FollowToggle {

  constructor($el) {
    this.$el = $el;
    this.user_id = this.$el.data("user_id");
    this.initial_follow_state = this.$el.data("initial_follow_state");
    this.render();
    this.handleClick();
  }

  render(){
    this.$el.prop("disabled", false);
    if (this.initial_follow_state === true) {
      this.$el.val("Unfollow!");
    } else if (this.initial_follow_state === false) {
      this.$el.val("Follow!");
    } else {
      this.$el.prop("disabled", true);
    }

  }
  //set userId and follows

  handleClick() {
    let that = this;
    this.$el.click(function(e) {
      e.preventDefault();
      if (that.initial_follow_state === false) {
        that.initial_follow_state = "disabled";
        that.render();
      $.ajax({
        url: `/users/${that.user_id}/follow`,
        type: "POST",
        dataType: "json",
        success: function() {
          that.initial_follow_state = true;
          that.render();
        }
      });
    } else {
      that.initial_follow_state = "disabled";
      that.render();
        $.ajax({
          url: `/users/${that.user_id}/follow`,
          type: "DELETE",
          dataType: "json",
          success: function() {
            that.initial_follow_state = false;
            that.render();
          }
        });
      }
    });
  }

}

module.exports = FollowToggle;
