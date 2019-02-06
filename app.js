import data from "./data.js";
class LazyloadImages {
  constructor() {
    this.hipHopAlbums = data.hipHopAlbums;
    this.rnbAlbums = data.rnbAlbums;
  }
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
<<<<<<< HEAD
            class ="lazy"
              src=${"images-poor-quality/" + albums[album].image}
              data-src=${"images-small/" + albums[album].image}
              data-srcset=${"images-small/" + albums[album].image}
              class="card-image img-fluid"
              width="100%"
=======
              src=${"images/" + albums[album].image}
              class="card-image img-fluid"
>>>>>>> d09e3ccecc715d314d7bfa68e61220b5775b372f
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

<<<<<<< HEAD
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
=======
  lazyloadImages() {}
>>>>>>> d09e3ccecc715d314d7bfa68e61220b5775b372f
}
const lazyLoad = new LazyloadImages();
lazyLoad.renderAlbums("hip-hop");
lazyLoad.renderAlbums("rnb");
<<<<<<< HEAD
lazyLoad.lazyloadImages();
=======
>>>>>>> d09e3ccecc715d314d7bfa68e61220b5775b372f
