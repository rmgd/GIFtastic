$(document).ready(function() {
  // VARIABLES
  var topicsArray = ['Lion', 'Tiger', 'Bear'];

  // LOAD BUTTONS
  function populateButtons() {
    $('buttonsArea').empty();

    $.each(topicsArray, function(index, topic) {
      console.log(topic);

      var topicButton = $('<button>')
        .text(topic)
        .addClass('btn btn-primary');

      $('#buttonsArea').append(topicButton);
    });

    /*
    OLD CODE FOR REFERENCE -- USE FOR EACH!!!!!!!
    for (var i = 0; i < topicsArray.length; i++) {
      var a = $('<button>');
      a.addClass('animals');
      a.attr('data-type', topicsArray[i]);
      a.text(topicsArray[i]);
      $('areaToAddTo').append(a);
    }*/
  }

  function searchTopics(e) {
    e.preventDefault();
    topic = e.target.textContent;
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?api_key=42aMQytwNOPHbQWFaz3J9BDTvrbEHspp&q=' +
      topic +
      '&limit=10&offset=10&rating=G&lang=en';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(response => console.log(response));
  }

  //OLD AJAX CALL
  /*$.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var searchDiv = $('<div class = "search item">');
        var ratings = response.data[i].ratings;
        var p = $('<p>').text('Ratings:' + ratings);
        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;
        var image = $('<img>');
        image.attr('src', still);
        image.attr('data-still', still);
        image.attr('data-animated', animated);
        image.attr('data-state', 'still');
        image.AddClass('searchImage');
        searchDiv.append(p);
        searchDiv.append(image);
        $('#searches').append(searchDiv);
    }
    });*/

  $(document).on('click', '.searchImage', function() {
    var state = $(this).attr('data-state');
    if (state == 'still') {
      $(this).attr('src', $(this).data('animated'));
      $(this).attr('data-state', 'animated');
    } else {
      $(this).attr('src', $(this).data(animated));
      $(this).attr('data-state', 'still');
    }
  });

  $('#addSearch').on('click', function() {
    var newSearch = $('input')
      .eq(0)
      .val();
    searchArray.push(newSearch);
    populateButtons(searchArray);
  });

  // RUN THE APP
  populateButtons();
  $('#buttonsArea').on('click', 'button', searchTopics);
});
