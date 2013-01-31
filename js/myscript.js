window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '504182809622316', // App ID from the App Dashboard
      channelUrl : '//localhost/dev_app/channel.php', // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      frictionlessRequests : true, // enable frictionless requests
      xfbml      : true  // parse XFBML tags on this page?
    });

    // Additional initialization code such as adding Event Listeners goes here
    //Next, find out if the user is logged in
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        
        accessToken = response.authResponse.accessToken;
        FB.api('/me', function(info) {
        
          console.log(info);
          
          var id = info.id;
          var name = info.name;
          var link = info.link;
          if(info.work) {
            if(info.work[0].position) {
              var work = info.work[0].position.name + ' at ' + info.work[0].employer.name;
            } else {
              var work = 'Works at ' + info.work[0].employer.name;
            }
          } else {
            var work = "No job :("
          }
          
          //console.log(info.work[0].position.name + ' at ' + info.work[0].employer.name);
          if(info.education) {
            var ed = info.education.length;
            var edu = info.education[(ed-1)].school.name;  
          } else {
            var edu = "Uneducated person!";
          }
          
          
          if(info.location) {
            var loc = info.location.name;
          } else {
            var loc = "nowhere!";
          }
          $('h3.left').html('Welcome, <a href="'+link+'">'+name+'</a>');
          $('h3.user_name').html('<a href="'+link+'">'+name+'</a>');
          $('p.works').append('<i class="work"></i>'+work);
          $('p.education').append('<i class="study"></i>'+edu);
          $('p.user_loc').append('<i class="home"></i>Lives in '+loc);
          
          var pro_pic = '<a href="https://www.facebook.com/'+id+'" target="_blank"><img src="https://graph.facebook.com/'+id+'/picture?type=large" width="110" /></a>';
          $('.user_img').html(pro_pic);

        });

        

        FB.api('/me/friends', function(info) {
          //console.log(info.data[0].name);
          //console.log(info.data[0].id);

          var output = "<ul>";
          for(var i = 0; i < info.data.length; i++) {
            output += "<li class='frnd'><a href='#" + info.data[i].id + "' onclick='Hello(" + info.data[i].id + ")'>" + info.data[i].name + "</a></li>";
          }
          output += "</ul>";

          $('.friend_list').html(output);
          
          // facebook style scrollbar
          $('.friend_list').jScrollPane({
          horizontalGutter:5,
          verticalGutter:5,
          'showArrows': false
          });
          $('.jspDrag').hide();
          $('.jspScrollable').mouseenter(function(){
            $('.jspDrag').stop(true, true).fadeIn('slow');
          });
          $('.jspScrollable').mouseleave(function(){
            $('.jspDrag').stop(true, true).fadeOut('slow');
          });
          //Filter Search
          
          $('.search').keyup(function() {
            var $this = $(this),
              filter = $this.val(),
              count = 0;
            $('.frnd').each(function() {
              var $this = $(this);
              if($this.text().search(new RegExp(filter, 'i')) < 0) {
                $this.hide();
              } else {
                $this.show();
              }
            });
          });
          

        });


        /*
        FB.api('/me?fields=id,name,statuses', { limit: 3 }, function(response) {
          console.log(response.statuses.data);
          var stat = response.statuses;
          for(var i = 0; i<stat.data.length; i++ ) {
            $('#statuses').append('<br>' + stat.data[i].message + '<br>' + stat.data[i].updated_time);
          }
        });
        */
        
      } else if (response.status === 'not_authorized') {
        //User is logged into Facebook, but not your App
        var oauth_url = 'https://www.facebook.com/dialog/oauth/';
        oauth_url += '?client_id=504182809622316'; // Your Client ID
        oauth_url += '&redirect_uri=' + 'https://apps.facebook.com/devzoneplus/'; // Send them if they're not logged in
        oauth_url += '&scope=user_about_me,user_status,friends_status,user_location,friends_location,friends_education_history,friends_work_history';
        //user_status,friends_status,user_about_me,email,user_location,user_photos,friends_photos,read_friendlists,user_checkins,friends_checkins,user_hometown,friends_hometown,friends_location,friends_work_history,user_work_history
        window.top.location = oauth_url;

      } else {
        // User is not logged into Facebook at all
        alert("You need to sign in to facebook.com for using this app!");
        window.top.location ='https://www.facebook.com/index.php';
      } //response.status
    }); //getLoginStatus


  }; //fbAsyncInit

  // Load the SDK's source Asynchronously
  // Note that the debug version is being actively developed and might 
  // contain some type checks that are overly strict. 
  // Please report such bugs using the bugs tool.
  (function(d, debug){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
     ref.parentNode.insertBefore(js, ref);
   }(document, /*debug*/ false));