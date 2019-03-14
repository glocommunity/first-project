"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // Плавная прокрутка страницы
  const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));

  anchors.forEach(function(item) {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      const blockID = item.getAttribute("href");
      const elemID = blockID.slice(1, blockID.length);

      function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
          return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
      }
      console.log(elemID);
      function elmYPosition(elemID) {
        let elm = document.getElementById(elemID);
        console.log(elm);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        }
        return y;
      }

      function smoothScroll(elemID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(elemID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
          scrollTo(0, stopY);
          return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 30) speed = 30;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
          for (let i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
          }
          return;
        }
        for (let i = startY; i > stopY; i -= step) {
          setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
          leapY -= step;
          if (leapY < stopY) leapY = stopY;
          timer++;
        }
      }
      smoothScroll(elemID);
    });
  });
});
