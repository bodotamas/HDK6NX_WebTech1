$(document).ready(function() 
{
    const video = document.getElementById("introVideo");

    if (video) 
    {
      $("#playBtn").on("click", function() 
      {
        video.play();
      });
  
      $("#pauseBtn").on("click", function() 
      {
        video.pause();
      });
  
      $("#skipBtn").on("click", function() 
      {
        if (video.duration) 
        {
          video.currentTime = Math.min(video.currentTime + 10, video.duration);
        }
      });
    }
  
    $(".hero-title").hide().fadeIn(1000);
    $(".hero-sub").hide().delay(300).fadeIn(1200);
  });
  