
function init(){

  var song;
  var tracker = $('.tracker');
  var volume = $('.volume');

   var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
  $("#showPopupNotification").click(function(){             
		popupNotification.show("item added");
   });

  function initAudio(elem) {
    var url = elem.attr('audiourl');

    var title = elem.text();
    var artist = elem.attr('artist');

    $('.player .title').text(title);
    $('.player .artist').text(artist);

   var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
  $("#showPopupNotification").click(function(){             
		popupNotification.show("You are playing "+ title);
   });
    // song = new Audio('media/'+url);
    song = new Audio(url);

    // timeupdate event listener
    song.addEventListener('timeupdate', function() {
      var curtime = parseInt(song.currentTime, 10);
      tracker.slider('value', curtime);
    });

    $('.playlist li').removeClass('active');
    elem.addClass('active');
  }

  function playAudio() {
    song.play();

    tracker.slider("option", "max", song.duration);

    $('.play').addClass('hidden');
    $('.pause').addClass('visible');
  }

  function stopAudio() {
    song.pause();

    $('.play').removeClass('hidden');
    $('.pause').removeClass('visible');
  }

  // play click
  $('.play').click(function(e) {
    e.preventDefault();
    // playAudio();

    song.addEventListener('ended', function() {
      var next = $('.playlist li.active').next();
      if (next.length == 0) {
        next = $('.playlist li:first-child');
      }
      initAudio(next);

      song.addEventListener('loadedmetadata', function() {
        playAudio();
      });

    }, false);

    tracker.slider("option", "max", song.duration);
    song.play();
    $('.play').addClass('hidden');
    $('.pause').addClass('visible');

  });

  // pause click
  $('.pause').click(function(e) {
    e.preventDefault();
    stopAudio();
  });

  // next track
  $('.fwd').click(function(e) {
    e.preventDefault();

    stopAudio();

    var next = $('.playlist li.active').next();
    if (next.length === 0) {
      next = $('.playlist li:first-child');
    }
    initAudio(next);
    song.addEventListener('loadedmetadata', function() {
      playAudio();
    });
  });

  // prev track
  $('.rew').click(function(e) {
    e.preventDefault();

    stopAudio();

    var prev = $('.playlist li.active').prev();
    if (prev.length === 0) {
      prev = $('.playlist li:last-child');
    }
    initAudio(prev);

    song.addEventListener('loadedmetadata', function() {
      playAudio();
    });
  });


  // playlist elements - click
  $('.playlist li').click(function() {
    stopAudio();
    initAudio($(this));
  });

  // initialization - first element in playlist
  initAudio($('.playlist li:first-child'));

  song.volume = 0.8;

  volume.slider({
    orientation: 'vertical',
    range: 'max',
    max: 100,
    min: 1,
    value: 80,
    start: function(event, ui) {},
    slide: function(event, ui) {
      song.volume = ui.value / 100;
    },
    stop: function(event, ui) {},
  });

  $('.volumeIcon').click(function(e) {
    e.preventDefault();
    $('.volume').toggleClass('show');
  });

  // empty tracker slider
  tracker.slider({

    range: 'min',
    min: 0,
    max: 10,
    start: function(event, ui) {},
    slide: function(event, ui) {
      song.currentTime = ui.value;
    },
    stop: function(event, ui) {}
  });

}

$(init);