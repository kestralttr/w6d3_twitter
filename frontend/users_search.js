const FollowToggle = require("./follow_toggle.js");

class UsersSearch {

  constructor($el) {
    this.$el = $el;
    this.handleInput();
  }

  handleInput() {
    let that = this;
    $("#users_searchbar").on("input",function(e) {
      e.preventDefault();
      const searchData = {query: $("#users_searchbar").val()};
      $.ajax({
        url: "/users/search",
        type: "GET",
        dataType: "json",
        data: searchData,
        success: function(data){
          that.renderResults(data);
        }
      });

    });

  }

  renderResults(data) {
    $(".users").empty();
    console.log(data);
    let users = {};
    for (var i = 0; i < data.length; i++) {
      users[data[i].username] = [data[i].id, data[i].followed];
    }

    $.each(users,userCallback);
    function userCallback(key,val) {
      let $li = $("<li></li>");

      // $li.text(key);
      let $a = $("<a></a>");
      $a.attr("href", `/users/${val[0]}`);
      $a.text(key);
      $li.append($a);
      let $button = $("<input></input>");
      $button.addClass("follow-toggle");
      $button.data("user_id", val[0]);
      $button.data("initial_follow_state", val[1]);
      $button.attr("type", "button");
      let button = new FollowToggle($button);
      //val[1] button value
      $li.append($button);
      $(".users").append($li);
    }
  }

}

module.exports = UsersSearch;
