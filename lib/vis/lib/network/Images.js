/**
 * @class Images
 * This class loads images and keeps them stored.
 */
function Images(callback) {
  this.images = {};
  this.imageBroken = {};
  this.callback = callback;

}

/**
 *
 * @param {string} url          Url of the image
 * @param {string} url          Url of an image to use if the url image is not found
 * @return {Image} img          The image object
 */
Images.prototype.load = function(url, brokenUrl, id) {
  var img = this.images[url]; // make a pointer
  if (img === undefined) {
    // create the image
    var me = this;
    img = new Image();
    img.onload = function () {
      // IE11 fix -- thanks dponch!
      if (this.width === 0) {
        document.body.appendChild(this);
        this.width = this.offsetWidth;
        this.height = this.offsetHeight;
        document.body.removeChild(this);
      }

      if (me.callback) {
        me.images[url] = img;
        me.callback(this);
      }
    };

    img.onerror = function () {
      if (brokenUrl === undefined) {
        console.error("Could not load image:", url);
        delete this.src;
        if (me.callback) {
          me.callback(this);
        }
      }
      else {
        if (me.imageBroken[id] && me.imageBroken[id][url] === true) {
          console.error("Could not load brokenImage:", brokenUrl);
          delete this.src;
          if (me.callback) {
            me.callback(this);
          }
        }
        else {
          console.error("Could not load image:", url);
          this.src = brokenUrl;
          if (me.imageBroken[id] === undefined) {
            me.imageBroken[id] = {};
          }
          me.imageBroken[id][url] = true;
        }
      }
    };

    img.src = url;
  }

  return img;
};

module.exports = Images;
