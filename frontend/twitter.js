const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");


$( () => {
  $(".follow-toggle").each(FTcallback);
  function FTcallback(idx,el) {
    new FollowToggle($(el));
  }
  $(".users_search").each(UScallback);
  function UScallback(idx,el) {
    new UsersSearch($(el));
  }
  // alert($el.data("userId"));
  //each through el
});
