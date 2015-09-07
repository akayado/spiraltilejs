(($) ->
  $.fn.spiralTile = (options) ->
    defaults = {
      mode: "non-layer",            #modes: "layer" or "non-layer"
      orientation: "landscape",      #"landscape" or "portrait"
      clockwise: true,              #true for clockwise, false for counter-clockwise
      beginning: "auto"           #"left" or "right" for landscape orientation, "top" or "bottom" for portrait orientation
      ratio: "auto",              #ratio of rectangle edge lengths: "golden", "silver", "auto", or any number(e.g., 1.5)
      width: "auto",                 #width/height: a number or "auto"
      height: "auto"                #one (ONLY one) of ratio/width/height must be set to "auto".
    }
    setting = $.extend(defaults, options)

    setting.ratio = 1.618 if setting.ratio == "golden"
    setting.ratio = 1.414 if setting.ratio == "silver"

    if setting.beginning == "auto"
      setting.beginning = "top" if setting.orientation == "portrait"
      setting.beginning = "left" if setting.orientation == "landscape"
    
    ratio = width = height = 0
    if setting.ratio == "auto"
      width = setting.width
      height = setting.height
      ratio = height / width
    else if setting.width == "auto"
      if setting.orientation == "landscape"
        ratio = setting.ratio
        ratio = 1.0 / ratio if ratio < 1
        height = setting.height
        width = height * ratio
      else if setting.orientation == "portrait"
        ratio = setting.ratio
        ratio = 1.0 / ratio if ratio > 1
        height = setting.height
        width = height * ratio
    else if setting.height == "auto"
      if setting.orientation == "landscape"
        ratio = setting.ratio
        ratio = 1.0 / ratio if ratio < 1
        width = setting.width
        height = width / ratio
      else if setting.orientation == "portrait"
        ratio = setting.ratio
        ratio = 1.0 / ratio if ratio > 1
        width = setting.width
        height = width / ratio
    #consequently, ratio == width / height 

    this.each (index, elem) ->
      max = $(this).children().size()-1
      $(this).width(width).height(height).css("position", "relative").children().each (i, e) ->
        res = calcNth(i, max, width, height, setting.beginning, setting.clockwise, setting.mode=="layer")
        $(this).css("position", "absolute").css("left", res.x).css("top", res.y).width(res.w - ($(this).outerWidth(true)-$(this).width())).height(res.h - ($(this).outerHeight(true)-$(this).height()))

    return this

  #Calculate position and size of the nth child.
  calcNth = (n, maxn, outerW, outerH, beginning, clockwise, layermode) ->
    ow = outerW
    oh = outerH
    ox = 0
    oy = 0

    r = {x:ox, y:oy, w:ow, h:oh}
    return r if n == 0 and maxn == 0

    if outerW > outerH

      r.w = ow - oh*oh/ow
      ox += ow-oh*oh/ow
      ow = oh*oh/ow

      if n > 0
        for i in [0..(n-1)]
          #return the rest of the area if this is the last rectangle
          if i == maxn - 1
            r = {x:ox, y:oy, w:ow, h:oh}
            break

          #temporary variables
          tw = ow
          th = oh
          tx = ox
          ty = oy
          
          if i%4==0
            r.x = tx
            r.y = ty
            r.w = tw
            r.h = th - tw*tw/th
            oy += th - tw*tw/th
            oh = tw*tw/th
          else if i%4==1
            r.x = tx + th*th/tw
            r.y = ty
            r.w = tw - th*th/tw
            r.h = th
            ow = th*th/tw
          else if i%4==2
            r.x = tx
            r.y = ty + tw*tw/th
            r.w = tw
            r.h = th - tw*tw/th
            oh = tw*tw/th
          else if i%4==3
            r.x = tx
            r.y = ty
            r.w = tw - th*th/tw
            r.h = th
            ox += tw - th*th/tw
            ow = th*th/tw

      if !clockwise #if counter-clockwise, inverse all rectangles (y)
        r.y = outerH/2 + (outerH/2 - r.y - r.h)

      if beginning == "right" #if beginning is right, inverse all rectangles (x)
        r.x = outerW/2 + (outerW/2 - r.x - r.w)
    
    else

      r.h = oh - ow*ow/oh
      oy += oh-ow*ow/oh
      oh = ow*ow/oh

      if n > 0
        for i in [0..(n-1)]
          #return the rest of the area if this is the last rectangle
          if i == maxn - 1
            r = {x:ox, y:oy, w:ow, h:oh}
            break

          #temporary variables
          tw = ow
          th = oh
          tx = ox
          ty = oy

          if i%4==0
            r.x = tx + th*th/tw
            r.y = ty
            r.w = tw - th*th/tw
            r.h = th
            ow = th*th/tw
          if i%4==1
            r.x = tx
            r.y = ty + tw*tw/th
            r.w = tw
            r.h = th - tw*tw/th
            oh = tw*tw/th
          if i%4==2
            r.x = tx
            r.y = ty
            r.w = tw - th*th/tw
            r.h = th
            ox += tw - th*th/tw
            ow = th*th/tw
          if i%4==3
            r.x = tx
            r.y = ty
            r.w = tw
            r.h = th - tw*tw/th
            oy += th - tw*tw/th
            oh = tw*tw/th
          
      if !clockwise #if counter-clockwise, inverse all rectangles (x)
        r.x = outerW/2 + (outerW/2 - r.x - r.w)

      if beginning == "bottom" #if beginning is right, inverse all rectangles (y)
        r.y = outerH/2 + (outerH/2 - r.y - r.h)
       
        
    return r

)(jQuery)
