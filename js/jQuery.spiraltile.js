(function() {
  (function($) {
    var calcNth;
    $.fn.spiralTile = function(options) {
      var defaults, height, ratio, setting, width;
      defaults = {
        mode: "non-layer",
        orientation: "landscape",
        clockwise: true,
        beginning: "auto",
        ratio: "auto",
        width: "auto",
        height: "auto"
      };
      setting = $.extend(defaults, options);
      if (setting.ratio === "golden") {
        setting.ratio = 1.618;
      }
      if (setting.ratio === "silver") {
        setting.ratio = 1.414;
      }
      if (setting.beginning === "auto") {
        if (setting.orientation === "portrait") {
          setting.beginning = "top";
        }
        if (setting.orientation === "landscape") {
          setting.beginning = "left";
        }
      }
      ratio = width = height = 0;
      if (setting.ratio === "auto") {
        width = setting.width;
        height = setting.height;
        ratio = height / width;
      } else if (setting.width === "auto") {
        if (setting.orientation === "landscape") {
          ratio = setting.ratio;
          if (ratio < 1) {
            ratio = 1.0 / ratio;
          }
          height = setting.height;
          width = height * ratio;
        } else if (setting.orientation === "portrait") {
          ratio = setting.ratio;
          if (ratio > 1) {
            ratio = 1.0 / ratio;
          }
          height = setting.height;
          width = height * ratio;
        }
      } else if (setting.height === "auto") {
        if (setting.orientation === "landscape") {
          ratio = setting.ratio;
          if (ratio < 1) {
            ratio = 1.0 / ratio;
          }
          width = setting.width;
          height = width / ratio;
        } else if (setting.orientation === "portrait") {
          ratio = setting.ratio;
          if (ratio > 1) {
            ratio = 1.0 / ratio;
          }
          width = setting.width;
          height = width / ratio;
        }
      }
      this.each(function(index, elem) {
        var max;
        max = $(this).children().size() - 1;
        return $(this).width(width).height(height).css("position", "relative").children().each(function(i, e) {
          var res;
          res = calcNth(i, max, width, height, setting.beginning, setting.clockwise, setting.mode === "layer");
          return $(this).css("position", "absolute").css("left", res.x).css("top", res.y).width(res.w - ($(this).outerWidth(true) - $(this).width())).height(res.h - ($(this).outerHeight(true) - $(this).height()));
        });
      });
      return this;
    };
    return calcNth = function(n, maxn, outerW, outerH, beginning, clockwise, layermode) {
      var i, j, k, oh, ow, ox, oy, r, ref, ref1, th, tw, tx, ty;
      ow = outerW;
      oh = outerH;
      ox = 0;
      oy = 0;
      r = {
        x: ox,
        y: oy,
        w: ow,
        h: oh
      };
      if (n === 0 && maxn === 0) {
        return r;
      }
      if (outerW > outerH) {
        r.w = ow - oh * oh / ow;
        ox += ow - oh * oh / ow;
        ow = oh * oh / ow;
        if (n > 0) {
          for (i = j = 0, ref = n - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
            if (i === maxn - 1) {
              r = {
                x: ox,
                y: oy,
                w: ow,
                h: oh
              };
              break;
            }
            tw = ow;
            th = oh;
            tx = ox;
            ty = oy;
            if (i % 4 === 0) {
              r.x = tx;
              r.y = ty;
              r.w = tw;
              r.h = th - tw * tw / th;
              oy += th - tw * tw / th;
              oh = tw * tw / th;
            } else if (i % 4 === 1) {
              r.x = tx + th * th / tw;
              r.y = ty;
              r.w = tw - th * th / tw;
              r.h = th;
              ow = th * th / tw;
            } else if (i % 4 === 2) {
              r.x = tx;
              r.y = ty + tw * tw / th;
              r.w = tw;
              r.h = th - tw * tw / th;
              oh = tw * tw / th;
            } else if (i % 4 === 3) {
              r.x = tx;
              r.y = ty;
              r.w = tw - th * th / tw;
              r.h = th;
              ox += tw - th * th / tw;
              ow = th * th / tw;
            }
          }
        }
        if (!clockwise) {
          r.y = outerH / 2 + (outerH / 2 - r.y - r.h);
        }
        if (beginning === "right") {
          r.x = outerW / 2 + (outerW / 2 - r.x - r.w);
        }
      } else {
        r.h = oh - ow * ow / oh;
        oy += oh - ow * ow / oh;
        oh = ow * ow / oh;
        if (n > 0) {
          for (i = k = 0, ref1 = n - 1; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
            if (i === maxn - 1) {
              r = {
                x: ox,
                y: oy,
                w: ow,
                h: oh
              };
              break;
            }
            tw = ow;
            th = oh;
            tx = ox;
            ty = oy;
            if (i % 4 === 0) {
              r.x = tx + th * th / tw;
              r.y = ty;
              r.w = tw - th * th / tw;
              r.h = th;
              ow = th * th / tw;
            }
            if (i % 4 === 1) {
              r.x = tx;
              r.y = ty + tw * tw / th;
              r.w = tw;
              r.h = th - tw * tw / th;
              oh = tw * tw / th;
            }
            if (i % 4 === 2) {
              r.x = tx;
              r.y = ty;
              r.w = tw - th * th / tw;
              r.h = th;
              ox += tw - th * th / tw;
              ow = th * th / tw;
            }
            if (i % 4 === 3) {
              r.x = tx;
              r.y = ty;
              r.w = tw;
              r.h = th - tw * tw / th;
              oy += th - tw * tw / th;
              oh = tw * tw / th;
            }
          }
        }
        if (!clockwise) {
          r.x = outerW / 2 + (outerW / 2 - r.x - r.w);
        }
        if (beginning === "bottom") {
          r.y = outerH / 2 + (outerH / 2 - r.y - r.h);
        }
      }
      return r;
    };
  })(jQuery);

}).call(this);
