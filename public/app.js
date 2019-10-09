// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<div class='card' data-id='" + data[i]._id + "' style ='width: 36rem;'><div class='card-body'><h5 class=' border-bottom card-title'>" + data[i].title + "</h5><p>" + data[i].story + "</p> <a href='http://www.destructoid.com/" + data[i].link + "' target='_blank'>Full Article</a></div>");
  }
});


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

    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      name: $("#name-input").val(),
      // Value taken from note textarea
      body: $("#body-input").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#name-input").val("");
  $("#body-input").val("");
});
