document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("scrollVideo");
  const videoContainer = document.querySelector('.video-container');
  const closeButton = document.getElementById("closeVideoButton"); 
  const themeToggleButton = document.getElementById("themeToggleButton"); 
  const body = document.body;

  const options = {
    root: null, 
    threshold: 0.1 
  };

  let isVideoVisible = false; 


  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVideoVisible = true; 
        video.play();
      } else {
        isVideoVisible = false; 
        video.pause(); 
      }
    });
  };


  const observer = new IntersectionObserver(observerCallback, options);
  observer.observe(videoContainer);


  video.addEventListener('loadedmetadata', function () {
    const videoDuration = video.duration;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;


      if (isVideoVisible) {

        const scrollPercent = Math.min(scrollTop / scrollableHeight, 1);


        video.currentTime = scrollPercent * videoDuration;
      }
    });


    let isScrolling;
    window.addEventListener('scroll', function () {
      window.clearTimeout(isScrolling);

      if (isVideoVisible) {
        video.play(); 
        isScrolling = setTimeout(function () {
          video.pause();
        }, 150);
      }
    });
  });

  closeButton.addEventListener("click", function() {
    video.remove(); 
  });

  
  themeToggleButton.addEventListener("click", function() {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    }
  });
});

window.onload = function () {
    // Select all the ships
    var ships = document.querySelectorAll('.ship');

    ships.forEach(function (ship) {
        // Randomize position and movement for each ship
        randomizeShipMovement(ship);
    });
};

function randomizeShipMovement(ship) {
    // Get viewport dimensions
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    // Random start position (anywhere on the screen)
    var startX = Math.random() * screenWidth;
    var startY = Math.random() * screenHeight;

    // Random movement distance (move across the screen)
    var endX = (Math.random() * screenWidth) - startX;
    var endY = (Math.random() * screenHeight) - startY;

    // Random rotation (0 to 360 degrees)
    var rotateAngle = Math.random() * 360;

    // Random speed (between 10s to 30s)
    var duration = Math.random() * 20 + 10; // Random duration between 10s and 30s

    // Apply styles to the ship
    ship.style.top = startY + 'px';
    ship.style.left = startX + 'px';

    // Use CSS variables and keyframes to animate ship
    ship.style.animation = `moveShip ${duration}s linear infinite`;
    ship.style.transform = `translate(${endX}px, ${endY}px) rotate(${rotateAngle}deg)`;
}
