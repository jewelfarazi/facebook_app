<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Facebook App</title>
	
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link type="text/css" href="css/jquery.jscrollpane.css" rel="stylesheet" media="all">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	
	<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
	<!--//-->
	
	<!--//-->
	<script type="text/javascript" src="js/jquery.mousewheel.js"></script> 
	<!--//-->
	<script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script> 
	<script type="text/javascript" src="js/myscript.js"></script>
	
	<script type="text/javascript">
	function Hello(data) {
		$('.details').html("");
		$('.details').css('background', '#FFF url(images/loading.gif) no-repeat 50% 50%');

		FB.api('/'+data, function(info) {
          
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
          
          $('h3.user_name').html('<a href="'+link+'">'+name+'</a>');
          $('p.works').html('<i class="work"></i>'+work);
          $('p.education').html('<i class="study"></i>'+edu);
          $('p.user_loc').html('<i class="home"></i>Lives in '+loc);
          
          var pro_pic = '<a href="https://www.facebook.com/'+id+'" target="_blank"><img src="https://graph.facebook.com/'+id+'/picture?type=large" width="110" /></a>';
          $('.user_img').html(pro_pic);

        });

		FB.api('/'+ data +'/statuses?limit=100&offset=0', function(info) {
	        //console.log(info.data[0].id);
	        $('.details').css('background', '#FFF');
	        var output = "<ul>";
	        for (var i = 0; i < info.data.length; i++) {
	          output += "<li>" + (i+1) + ": <a href='https://www.facebook.com/" + info.data[i].id + "' target='_blank'>"+info.data[i].message + "</a></li>";
	        }
	        output += "</ul>";
	        $('.details').html(output);
	        // facebook style scrollbar

	        
			$('.details').jScrollPane({
	          horizontalGutter:5,
	          verticalGutter:5,
	          'showArrows': false,
	          reinitialise:true
	          });
	          $('.jspDrag').hide();
	          $('.jspScrollable').mouseenter(function(){
	            $('.jspDrag').stop(true, true).fadeIn('slow');
	          });
	          $('.jspScrollable').mouseleave(function(){
	            $('.jspDrag').stop(true, true).fadeOut('slow');
	        	});	 
	        

	        
      	});


		return false;
	}
	</script>	

</head>
<body>
	<div id="fb-root"></div>
	<div id="layout">

		<div class="left_col left">
			<div class="search_box">
				<form action="#" method="get" id="find_friends">
		            <input name="search" class="search" placeholder="Find Friends">
		        </form>
			</div><!--End search box-->
			<div class="friend_list">
				
			</div><!--End friend list-->
		</div><!--End left column-->

		<div class="right_col right">
			<div class="welcome_info">
				<h3 class="left"></h3>
				<a href="#" class="right facebook-button" id="postToWall" data-url="">
                <span class="plus">Invite Friends</span>
              	</a>
              	<!--
               <a href="#" class="facebook-button speech-bubble" id="sendToFriends" data-url="">
                <span class="speech-bubble">Send Message</span>
              </a>
              <a href="#" class="facebook-button apprequests" id="sendRequest" data-message="Test this awesome app">
                <span class="apprequests">Send Requests</span>
              </a>
          		-->
          		<div class="clear"></div>
			</div><!--End welcome info-->
			<div class="user_info">
				<div class="user_image left">
					<div class="user_img">

					</div>
				</div><!--End user image section-->
				<div class="user_opt right">
					<div class="user_log">
						<p><h3 class="user_name"></h3></p>
						<p class="works"></p>
						<p class="education"></p>
						<p class="user_loc"></p>
					</div>
              		<a href="#" class="facebook-button apprequests" id="sendRequest" data-message="Test this awesome app">
                	<span class="apprequests">Post to wall</span>
              		</a>
              		<a href="#" class="facebook-button speech-bubble" id="sendToFriends" data-url="">
                	<span class="speech-bubble">Send Message</span>
              		</a>
				</div><!--End user all information-->
				<div class="clear"></div>
			</div><!--End User info-->
			<div class="details">

			</div><!--End user details-->
		</div><!--End right column-->

		<div class="clear"></div>
	</div><!--End main page layout-->
	<script type="text/javascript">
	$(document).ready(function() {
		$('#find_friends').submit(function() {
		  
		  return false;
		});
	});
	</script>

</body>
</html>