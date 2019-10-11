
$.getJSON("/articles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      "<div class='card' data-id='" + data[i]._id + "' style ='width: 36rem;'><div class='card-body'><h5 class=' border-bottom card-title'>" + data[i].title + "</h5><p>" + data[i].story + "</p> <a href='http://www.destructoid.com/" + data[i].link + "' target='_blank'>Full Article</a></div>");
  }
});

//Creates the comment section on the right-hand part of the window//

$(document).on("click", "div .card", function () {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      console.log(data);
      $("#notes").append("<h3 class='border-bottom'>" + data.title + "</h3>");
      $("#notes").append("<h4>Leave a comment<h4>")
      $("#notes").append("<form class='border-bottom p-2'><div class='form-group'><label for='name-input'>Name</label><br><input class='w-75 p-1' id='name-input' name='title' ></input></div><div class='form-group'><label for='body-input'>Comment</label><br><textarea class='w-75 p-1' id='body-input' style='resize:none' name='body'></textarea></div><button class='btn btn-secondary' data-id='" + data._id + "' id='savenote'>Submit</button></form><br><h3>Comments</h3>");

      //Need to append each note associated with the article below the comment entry fields//
    });
});


$(document).on("click", "#savenote", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      name: $("#name-input").val(),
      body: $("#body-input").val()
    }
  })
    .then(function (data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#name-input").val("");
  $("#body-input").val("");
});

//Need to make a click event handler to call the DELETE route on a given note when its delete button is clicked//
