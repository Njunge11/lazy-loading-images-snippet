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
              src=${"images/" + albums[album].image}
              class="card-image img-fluid"
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

  lazyloadImages() {}
}
const lazyLoad = new LazyloadImages();
lazyLoad.renderAlbums("hip-hop");
lazyLoad.renderAlbums("rnb");
