/*====================================
=            ON DOM READY            =
====================================*/
$(function() {

    // get height of window and set it as height of our main element
    var wheight = $(window).height() -80;// get height - 80px
    $('#wrapper').css('height', wheight);
    var x = $('.header__messages--icon').offset();

    var winWidth;
    winWidth = $(window).width();
    if ( winWidth <= 955 ) {
      $('.messages').css({"top": x.top + 52 , "left": 0, "position":"absolute"});
    } else {
      $('.messages').css({"top": x.top + 52 , "left": x.left, "position":"absolute"});
    }

    $(window).resize(function() {
        var wheight = $(window).height() -80;//get height of wondow after resize
        $('#wrapper').css('height', wheight);  //add that height
        var x = $('.header__messages--icon').offset();
        var winWidth = $(window).width();
        if ( winWidth <= 955 ) {
          $('.messages').css({"top": x.top + 52 , "left": 0, "position":"absolute"});
        } else {
          $('.messages').css({"top": x.top + 52 , "left": x.left, "position":"absolute"});
        }
    });//on resize


    // Toggle Nav on Click
    $('.toggle-nav').click(function() {
        // Calling a function in case you want to expand upon this.
        toggleNav();
    });
    // Close Nav on Click
    $('#sidenav-close').click(function(event) {
        event.preventDefault();
        closeNav();
    });

    // Open user profile
    $('#user-profile').click( function(e){
        e.stopPropagation();
        $('.profile').toggle(300);
      });
    $(document).click( function(){
      $('.profile').hide();
    });

    // Scrollbar for messages
    $('.messages__body').slimScroll({
        height: '222px'
    });

    // Open messages
    $('#msg').click( function(e){
        e.stopPropagation();
        //var x = $('.header__messages--icon').offset();
        //$('.messages').css({"top": x.top + 52 , "left": x.left, "position":"absolute"});
        $('.messages').toggle(300);
      });
    $(document).click( function(){
      $('.messages').hide();
    });

    /*========================================
    =               OPEN MODALS              =
    ========================================*/
    //select all the a tag with name equal to modal
    $('#sendMessage').click(function(e) {
        //Cancel the link behavior
        e.preventDefault();
        //Get the A tag
        var a, winH, winW, ah, aw, b;

        a = $(".msgmodal");
        b = $(".modal-bkg");
        //Get the window height and width
        ah = a.height();
        aw = a.width();
        winH = $(window).height();
        winW = $(window).width();
        //Set the popup window to center
        a.css('top', winH/2 - ah /2);
        a.css('left', winW/2 - aw /2);
        //transition effect
        a.fadeIn(500);
        b.addClass("modal-over");
        b.fadeIn(500);
    });

    //if close button is clicked
    $('.closeModal').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        $(".msgmodal").hide();
        $(".modal-bkg").removeClass("modal-over");
    });

    /*========================================
    =            CUSTOM FUNCTIONS            =
    ========================================*/
    // SideNav togle function
    function toggleNav() {
        if ($('#wrapper').hasClass('show-nav')) {
            // Do things on Nav Close
            $('#wrapper').removeClass('show-nav');
        } else {
            // Do things on Nav Open
            $('#wrapper').addClass('show-nav');
        }

        //$('#site-wrapper').toggleClass('show-nav');
    }
    // Function for closing sideNav
    function closeNav() {
        $('#wrapper').addClass('show-nav');
        $('.customMarker-active').removeClass('active');
    }
    // Function for adding active class to custom markers
    function addActive() {
      if ($('.customMarker-active').hasClass('active')) {
          // Do things on Nav Close
          $('.customMarker-active').removeClass('active');
      } else {
          // Do things on Nav Open
          $('.customMarker-active').addClass('active');
      }
    }

    /*========================================
    =               Toastr setup             =
    ========================================*/
    toastr.options = {
      closeButton: true,
      closeMethod: 'fadeOut',
      closeDuration: 300,
      closeEasing: 'swing',
      preventDuplicates: true,
      positionClass: 'toast-bottom-left',
      timeOut: 3000,
      extendedTimeOut: 6000
    };

    $('#connectTo').click(function() {
      toastr.success('Successfully added');
      $('#connectTo').html('Conected').css('color','#f38a1a');
    });
    $('#sendMsg').click(function() {
      swal("Good job!", "Message successfully sent!", "success");
      $(".msgmodal").hide();
      $(".modal-bkg").removeClass("modal-over");
    });

/*========================================
=            Intercative MAP            =
========================================*/
  var map;
  var style;
  var options;

  // Styling of the map
  style = [
    {
      stylers: [
        { saturation: "-60" },
        { lightness: "20" }
      ]
      },{
      featureType: "poi",
      stylers: [
        { visibility: "off" }
      ]
      },{
        featureType: "transit",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "road",
        stylers: [
          { lightness: "50" },
          { visibility: "on" }
        ]
      },{
        featureType: "landscape",
        stylers: [
          { lightness: "50" }
        ]
    }
  ];

  // Map options
  options = {
      zoom: 4,
      center:  new google.maps.LatLng(38.628346, -90.200216),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
  };

  // Adding google map
  map = new google.maps.Map($('#map')[0], options);
  map.setOptions({
      styles: style
  });

  /*========================================
  =              Custom Marker             =
  ========================================*/
  function CustomMarker(latlng, map, imageSrc) {
      this.latlng_ = latlng;
      this.imageSrc = imageSrc;
      // Once the LatLng and text are set, add the overlay to the map.  This will
      // trigger a call to panes_changed which should in turn call draw.
      this.setMap(map);
  }

  CustomMarker.prototype = new google.maps.OverlayView();

  CustomMarker.prototype.draw = function () {
      // Check if the div has been created.
      var div = this.div_;
      if (!div) {
          // Create a overlay text DIV
          div = this.div_ = document.createElement('div');
          // Create the DIV representing our CustomMarker
          div.className = "customMarker";


          var img = document.createElement("img");
          img.src = this.imageSrc;
          div.appendChild(img);
          google.maps.event.addDomListener(div, "click", function (event) {
              //toggleNav();
          });

          // Then add the overlay to the DOM
          var panes = this.getPanes();
          panes.overlayImage.appendChild(div);
      }

      // Position the overlay
      var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
      if (point) {
          div.style.left = point.x + 'px';
          div.style.top = point.y + 'px';
      }
  };

  CustomMarker.prototype.remove = function () {
      // Check if the overlay was on the map and needs to be removed.
      if (this.div_) {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
      }
  };

  CustomMarker.prototype.getPosition = function () {
      return this.latlng_;
  };


  var data = [{
      profileImage: "../images/profile-pic.jpg",
      pos: [41.185830, -100.786119],
  }, {
      profileImage: "../images/brodie.jpg",
      pos: [47.606662, -122.330679],
  },  {
     profileImage: "../images/profile-pics-007.jpg",
     pos: [32.391575, -86.311283],
  },  {
     profileImage: "../images/profile2.jpg",
     pos: [38.932406, -77.056446],
  }];

  for(var i=0; i<data.length; i++) {
    new CustomMarker(new google.maps.LatLng(data[i].pos[0],data[i].pos[1]), map,  data[i].profileImage);
  }

  /*===============================================
  =              Custom Active Marker             =
  ================================================*/
  function CustomMarkerActive(latlng, map, imageSrc) {
      this.latlng_ = latlng;
      this.imageSrc = imageSrc;
      // Once the LatLng and text are set, add the overlay to the map.  This will
      // trigger a call to panes_changed which should in turn call draw.
      this.setMap(map);
  }

  CustomMarkerActive.prototype = new google.maps.OverlayView();

  CustomMarkerActive.prototype.draw = function () {
      // Check if the div has been created.
      var div = this.div_;
      if (!div) {
          // Create a overlay text DIV
          div = this.div_ = document.createElement('div');
          // Create the DIV representing our CustomMarker
          div.className = "customMarker-active active";


          var img = document.createElement("img");
          img.src = this.imageSrc;
          div.appendChild(img);
          google.maps.event.addDomListener(div, "click", function (event) {
              toggleNav();
              addActive();
          });

          // Then add the overlay to the DOM
          var panes = this.getPanes();
          panes.overlayImage.appendChild(div);
      }

      // Position the overlay
      var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
      if (point) {
          div.style.left = point.x + 'px';
          div.style.top = point.y + 'px';
      }
  };

  CustomMarkerActive.prototype.remove = function () {
      // Check if the overlay was on the map and needs to be removed.
      if (this.div_) {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
      }
  };

  CustomMarkerActive.prototype.getPosition = function () {
      return this.latlng_;
  };

  var dataActive = [{
      profileImage: "../images/adam-parker.jpg",
      pos: [37.458930, -122.141001],
  }];

  for(var i=0; i<dataActive.length; i++) {
    new CustomMarkerActive(new google.maps.LatLng(dataActive[i].pos[0],dataActive[i].pos[1]), map,  dataActive[i].profileImage);
  }

  /*==============================================
  =              Custom Green Marker             =
  ===============================================*/
  function CustomMarkerGreen(latlng, map, imageSrc) {
      this.latlng_ = latlng;
      this.imageSrc = imageSrc;
      // Once the LatLng and text are set, add the overlay to the map.  This will
      // trigger a call to panes_changed which should in turn call draw.
      this.setMap(map);
  }

  CustomMarkerGreen.prototype = new google.maps.OverlayView();

  CustomMarkerGreen.prototype.draw = function () {
      // Check if the div has been created.
      var div = this.div_;
      if (!div) {
          // Create a overlay text DIV
          div = this.div_ = document.createElement('div');
          // Create the DIV representing our CustomMarker
          div.className = "customMarkerGreen";


          var img = document.createElement("img");
          img.src = this.imageSrc;
          div.appendChild(img);
          google.maps.event.addDomListener(div, "click", function (event) {
              //toggleNav();
          });

          // Then add the overlay to the DOM
          var panes = this.getPanes();
          panes.overlayImage.appendChild(div);
      }

      // Position the overlay
      var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
      if (point) {
          div.style.left = point.x + 'px';
          div.style.top = point.y + 'px';
      }
  };

  CustomMarkerGreen.prototype.remove = function () {
      // Check if the overlay was on the map and needs to be removed.
      if (this.div_) {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
      }
  };

  CustomMarkerGreen.prototype.getPosition = function () {
      return this.latlng_;
  };

  var dataGreen = [{
      profileImage: "../images/profile-pics-20.jpg",
      pos: [32.472755, -99.749899],
  }];

  for (var i=0; i<dataGreen.length; i++) {
    new CustomMarkerGreen(new google.maps.LatLng(dataGreen[i].pos[0],dataGreen[i].pos[1]), map,  dataGreen[i].profileImage);
  }

  /*==================================================
  =              Custom Secondary Marker             =
  ====================================================*/
  function CustomMarkerSecound(latlng, map, imageSrc) {
      this.latlng_ = latlng;
      this.imageSrc = imageSrc;
      // Once the LatLng and text are set, add the overlay to the map.  This will
      // trigger a call to panes_changed which should in turn call draw.
      this.setMap(map);
  }

  CustomMarkerSecound.prototype = new google.maps.OverlayView();

  CustomMarkerSecound.prototype.draw = function () {
      // Check if the div has been created.
      var div = this.div_;
      if (!div) {
          // Create a overlay text DIV
          div = this.div_ = document.createElement('div');
          // Create the DIV representing our CustomMarker
          div.className = "secound-marker";


          //var img = document.createElement("img");
          //img.src = this.imageSrc;
          //div.appendChild(img);
          //google.maps.event.addDomListener(div, "click", function (event) {
          //    toggleNav();
          //    addActive();
          //});

          // Then add the overlay to the DOM
          var panes = this.getPanes();
          panes.overlayImage.appendChild(div);
      }

      // Position the overlay
      var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
      if (point) {
          div.style.left = point.x + 'px';
          div.style.top = point.y + 'px';
      }
  };

  CustomMarkerSecound.prototype.remove = function () {
      // Check if the overlay was on the map and needs to be removed.
      if (this.div_) {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
      }
  };

  CustomMarkerSecound.prototype.getPosition = function () {
      return this.latlng_;
  };

  var dataSecound = [{
      pos: [52.366588, -126.069590]
  },  {
      pos: [45.220295, -70.483335]
  },  {
      pos: [27.517488, -109.937201]
  }];

  for(var i=0; i<dataSecound.length; i++) {
    new CustomMarkerSecound(new google.maps.LatLng(dataSecound[i].pos[0],dataSecound[i].pos[1]), map);
  }

  /*==================================================
  =              Custom Third Marker             =
  ====================================================*/
  function CustomMarkerThird(latlng, map, imageSrc) {
      this.latlng_ = latlng;
      this.imageSrc = imageSrc;
      // Once the LatLng and text are set, add the overlay to the map.  This will
      // trigger a call to panes_changed which should in turn call draw.
      this.setMap(map);
  }

  CustomMarkerThird.prototype = new google.maps.OverlayView();

  CustomMarkerThird.prototype.draw = function () {
      // Check if the div has been created.
      var div = this.div_;
      if (!div) {
          // Create a overlay text DIV
          div = this.div_ = document.createElement('div');
          // Create the DIV representing our CustomMarker
          div.className = "third-marker";


          //var img = document.createElement("img");
          //img.src = this.imageSrc;
          //div.appendChild(img);
          //google.maps.event.addDomListener(div, "click", function (event) {
          //    toggleNav();
          //    addActive();
          //});

          // Then add the overlay to the DOM
          var panes = this.getPanes();
          panes.overlayImage.appendChild(div);
      }

      // Position the overlay
      var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
      if (point) {
          div.style.left = point.x + 'px';
          div.style.top = point.y + 'px';
      }
  };

  CustomMarkerThird.prototype.remove = function () {
      // Check if the overlay was on the map and needs to be removed.
      if (this.div_) {
          this.div_.parentNode.removeChild(this.div_);
          this.div_ = null;
      }
  };

  CustomMarkerThird.prototype.getPosition = function () {
      return this.latlng_;
  };

  var dataThird = [{
      pos: [50.564484, -98.659458]
  },  {
      pos: [46.833673, -87.820740]
  },  {
      pos: [24.897812, -103.717799]
  }];

  for(var i=0; i<dataThird.length; i++) {
    new CustomMarkerThird(new google.maps.LatLng(dataThird[i].pos[0],dataThird[i].pos[1]), map);
  }


});
