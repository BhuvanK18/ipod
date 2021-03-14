// IPOD'S SCRIPT SHEET!

// I HAVE USED JAVASCRIPT JQUERY AND REACT ZINGTOUCH LIBRARY SCRIPTS IN THIS SINGLE JS FILE!.


// HIDING UNWANTED CONTENT ON LOADING OF THE PAGE.
    
    // Hiding certain contents of the web page on loading to display relative content according to user.
    // I have used jquery's hide effect here.
     $("#menu").hide()
     $("#songs").hide();
     $("#albums").hide();
     $("#artists").hide();
     $("#playlists").hide();
     $("#rotatable").hide();
     $("#play").hide();


//GLOBAL VARIABLES

    //Initialized Global variables(used inside various functions).

    //Angle of rotation of wheel. 
    var currentAngle = 0;

    //Selected option from rotating the wheel. 
    var main = 0; 

    //Used for assigning and removing active class from menu page's elements.
    var nodes = document.querySelectorAll("li");

    // Used inside fast forward button to toggle between speeds.
    var count = 0

// FUNCTIONS USED

    //Selected option from menu items.
    function activeOption(){
    for (i = 0; i < 4; i++){
      if ((nodes[i].classList.contains("active"))==true) {
        
        var main = i;
        return main;
        }
        ;
      }
    }

    //Removing .active class from each option in the Menu page.
    //This helps in highlighting an individual option while rotating the wheel and to avoid selection of multiple options
    function activeRemove(){
    for (i = 0; i < 4; i++){
      nodes[i].classList.remove("active");
      }
      
    }

    //Displaying the selected option 
    function activeScreen(){
      
      //Calling of the activeOption function for knowing the user's desire or chosen option.
      //Displaying songs screen.
      
      if (activeOption()==0){
        $("#menu").hide();
        $("#songs").show();

      }

      //Displaying albums screen.
      else if (activeOption()==1) {
        $("#menu").hide();
        $("#albums").show();


      }

      //Displaying artists screen.
      else if (activeOption()==2) {
        $("#menu").hide();
        $("#artists").show();


      }

      //Displaying playlists screen.
      else if (activeOption()==3) {
        $("#menu").hide();
        $("#playlists").show();

      }
      } 


//HANDLING ROTATION OF THE WHEEL AND INTEGRATION OF USER'S CHOICE USING THE ROTATING WHEEL.
//REACT'S ZINGTOUCH LIBRARY HAS BEEN USED HERE!

    //Rotating the wheel using click and rotation of mouse.
    //This part is a reference from Rotate part of React Zing Touch Documentation "https://zingchart.github.io/zingtouch/" . 
    document.getElementById('rotatable').style.transform = 'rotate(0deg)';

    var target = document.getElementById('box');
    var region = new ZingTouch.Region(target);

    region.bind(target, 'rotate', function(e) {
      var rotatable = document.getElementById('rotatable');
      currentAngle += e.detail.distanceFromLast;


    //Stopping the rotation of the wheel beyond 90 degrees to provide a smooth ui by avoiding over rotation of wheel and thus avoiding mess.
      if(currentAngle<=90){
      rotatable.style.transform = 'rotate(' + currentAngle + 'deg)';}

    //Attatching active class to the desired option using rotate wheel and mousemove event.
    //Also using activeRemove function to avoid selection of multiple options.
      document.getElementById('rotatable').addEventListener("mousemove", function (){
      document.getElementById('rotatable').style.transform = 'rotate(0deg)';
        var selection = e.detail.distanceFromOrigin;
        if (selection<=5) {
          activeRemove();
          nodes[0].classList.add('active');
          selection = 0;}
        else if (selection>5&& selection<=10) {
          activeRemove();
          nodes[1].classList.add('active');
          selection = 0;
        }
        else if (selection>10&& selection<=20) {
          activeRemove();
          nodes[2].classList.add('active');
          selection = 0;}
        else if (selection>20&& selection<=30) {
          activeRemove();
          nodes[3].classList.add('active');
          selection = 0;
          }
        });
    
    //Calling of activeScreen function on click event to display desired screen.
    document.getElementById('inner').addEventListener("click", function (){
      activeScreen();});
    //Stopping the rotation of the wheel beyond 90 degrees to provide a smooth ui.
    if(currentAngle<=90){
    rotatable.style.transform = 'rotate(' + currentAngle + 'deg)';}

  });



//DISPLAYING RELEVANT CONTENT ACCORDING TO USERS CHOICE(ON CLICK)
//JQUERY IS USED HERE!

    //Displaying main menu of the IPOD
    $("#menuB").click(function(){
      // Ipod unlock sound
      var unL_L = document.getElementById("lock");
      unL_L.load();      
      unL_L.play();
      $("#screen").hide();
      $("#menuB").hide();
       $("#menu").show(500);
       $("#rotatable").show(500);
    })

    //Displaying home page of the IPOD
    $("#home").click(function(){
        $("#menu").hide();
        $("#screen").show();
        window.location.reload();
       
    });

    //Returning back to main menu from songs screen.
    $("#back2").click(function(){
        $("#songs").hide();
        $("#menu").show();
       $("#rotatable").show();
    });
    
    //Returning back to main menu from albums screen.  
    $("#back3").click(function(){
        $("#albums").hide();
        $("#menu").show();
        $("#rotatable").show();
       
    });

    //Returning back to main menu from artists screen.
    $("#back4").click(function(){
        $("#artists").hide();
        $("#menu").show();
       $("#rotatable").show();
    });

    //Returning back to main menu from playlists screen.
    $("#back5").click(function(){
        $("#playlists").hide();
        $("#menu").show();
       $("#rotatable").show();
    });

  // MUSIC SCRIPTING
  
    // JQUERY IS USED HERE

    // Storing songs inside audioArray.
    var audioArray = document.getElementsByClassName("playsong");
    
    //Playing the first song and functioning of the media controls like
    // Play,Pause,Rewind and Fast Forward.
    $("#firstS").on("click",function()
      {audioArray[1].pause();
      audioArray[0].load();
      audioArray[0].play();
      
      // Pause Control
      $("#pause").on("click",function(){
      audioArray[0].pause();
      $("#play").show();
      $("#pause").hide();
      })
      
      // Play Control
      $("#play").on("click",function(){
      audioArray[0].play();
      audioArray[1].pause();
      $("#play").hide();
      $("#pause").show();
      })

      // Rewind Control
      $("#fr").on("click",function(){
      audioArray[1].pause();
      audioArray[0].load();
      audioArray[0].play();
      })

      // Fast Forward Control
      $("#ff").on("click",function(){ 
      audioArray[1].pause();
      audioArray[0].play();
      if (count==0) {
      audioArray[0].playbackRate = 1.25;
      count+=1;}
      else if (count==1) {
      audioArray[0].playbackRate = 1.5;
      count+=1;}
      else if (count==2) {
      audioArray[0].playbackRate = 2.0;
      count+=1;}
      else if (count==3) {
      audioArray[0].playbackRate = 1.0;
      count = 0;}

      })

    })  

    //Playing the first song and functioning of the media controls like
    // Play,Pause,Rewind and Fast Forward.    
    $("#secondS").on("click",function()
    { audioArray[0].pause();
      audioArray[1].load();
      audioArray[1].play();
      
      // Pause Control
      $("#pause").on("click",function(){
      audioArray[1].pause();
      $("#play").show();
      $("#pause").hide();
      })

      // Play Control
      $("#play").on("click",function(){
      audioArray[1].play();
      audioArray[0].pause();
      $("#play").hide();
      $("#pause").show();
      })

      // Rewind Control
      $("#fr").on("click",function(){
      audioArray[0].pause();
      audioArray[1].load();
      audioArray[1].play();
      })

      // Fast Forward Control
      $("#ff").on("click",function(){  
      audioArray[0].pause();
      audioArray[1].play();
      if (count==0) {
      audioArray[1].playbackRate = 1.25;
      count+=1;}
      else if (count==1) {
      audioArray[1].playbackRate = 1.5;
      count+=1;}
      else if (count==2) {
      audioArray[1].playbackRate = 2.0;
      count+=1;}
      else if (count==3) {
      audioArray[1].playbackRate = 1.0;
      count = 0;}
      })

    })



    // Displaying Songs of an Album.
    $("#fof").on("click",function(){
      $("#albums").hide();
      $("#songs").show();
    })

    // Displaying Songs of first Artist.
    $("#firstA").on("click",function(){
      $("#artists").hide();
      $("#songs").show();
      $("#artist2").hide();
    })

    // Displaying Songs of second Artist.
    $("#secondA").on("click",function(){
      $("#artists").hide();
      $("#songs").show();
      $("#artist1").hide();
    })

    // Displaying Songs of a Playlist.
    $("#firstP").on("click",function(){
      $("#playlists").hide();
      $("#songs").show();
    })

// Made by – 
// Bhuvan Kohli
// bhuvankohli16@gmail.com
// www.linkedin.com/in/bhuvan-kohli-4916911b7
// https://github.com/BhuvanK18
