/**
 * Copyright(c) 2019 Njunge Njenga.
 * MIT Licensed
 */
import data from "./data.js";
class LazyloadImages {
  constructor() {
    this.hipHopAlbums = data.hipHopAlbums;
    this.rnbAlbums = data.rnbAlbums;
  }

  /**
   * whichAnimationEvent
   * * Detect when the animation has ended.
   */
  whichAnimationEvent() {
    let t;
    let el = document.createElement("fakelement");
    let animations = {
      animation: "animationend",
      OAnimation: "oAnimationend",
      MozAnimation: "animationend",
      WebkitAnimation: "webkitAnimationEnd"
    };
    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  }
  /**
   * animateJumbotronContents
   * * Animate and control the sequencing of the contents in the jumbotron i.e the image, title and descriptions.
   * TODO: Find a way to refactor this
   */
  animateJumbotronContents() {
    const jumbotronImage = document.querySelector(".jumbotron-img");
    const jumbotronTitle = document.querySelector(".jumbotron-title");
    const jumbotronDesc = document.querySelector(".jumbotron-desc");
    const animationEvent = this.whichAnimationEvent();
    jumbotronImage.addEventListener(animationEvent, animateJumbotronTitle);
    function animateJumbotronTitle() {
      jumbotronImage.removeEventListener(animationEvent, animateJumbotronTitle);
      jumbotronTitle.style.display = "block";
      jumbotronTitle.classList.add("animated");
      jumbotronTitle.classList.add("slideInRight");
      jumbotronTitle.classList.add("fast");
      jumbotronTitle.addEventListener(animationEvent, animateJumbotronDec);
      function animateJumbotronDec() {
        jumbotronDesc.style.display = "block";
        jumbotronDesc.classList.add("animated");
        jumbotronDesc.classList.add("fadeInUp");
        jumbotronDesc.classList.add("fast");
      }
    }
  }

  /**
   *  renderAlbums
   * * Renders the album info on the web page i.e album cover, title and artist.
   * @param {*} id The id of the div which we will append the album info to.
   */
  renderAlbums(id) {
    const albums = id === "hip-hop" ? this.hipHopAlbums : this.rnbAlbums;
    const root = document.querySelector("#" + id);
    const markup = `
        ${Object.keys(albums)
          .map(album => {
            return `  
           <div class="col-3">
          <div class="card bg-dark text-white">
            <img
            class ="lazy"
              src=${"images-poor-quality/" + albums[album].image}
              data-src=${"images-small/" + albums[album].image}
              data-srcset=${"images-small/" + albums[album].image}
              class="card-image img-fluid"
              width="100%"
              alt=""
            />
          </div>
          <p class="title">${albums[album].albumTitle}</p>
          <p class="artist">${albums[album].artist}</p>
        </div>
        `;
          })
          .join("")}
  `;
    root.innerHTML = markup;
  }

  /**
   *  lazyLoadImages
   * * Use the Intersection Observer API to lazy load images.
   * TODO: Implement a fallback for browsers that do not support the API.
   */
  lazyloadImages() {
    document.addEventListener("DOMContentLoaded", function() {
      var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
      if (
        "IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in window.IntersectionObserverEntry.prototype
      ) {
        let lazyImageObserver = new IntersectionObserver(function(
          entries,
          observer
        ) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.classList.remove("lazy");
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });

        lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
        });
      }
    });
  }
}
const lazyLoad = new LazyloadImages();
lazyLoad.renderAlbums("hip-hop");
lazyLoad.renderAlbums("rnb");
lazyLoad.animateJumbotronContents();
lazyLoad.lazyloadImages();
