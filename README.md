# SpiralTile.js
Make spirals with HTML block elements!!

## Usage
First, in the body tag, prepare elements to be tiled like this:
```html
<ul id="tile-container">
<li>Tile 1</li>
<li>Tile 2</li>
<li>Tile 3</li>
<li>Tile 4</li>
<li>Tile 5</li>
</ul>
```
Each li element becomes a tile, and the ul element becomes the container of them.

Then add the following to the header.
```html
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="js/jQuery.spiraltile.min.js"></script>
<script>
	$(function(){
		$("#tile-container").spiralTile({width: 600, ratio: "golden"});
	});
</script>
```
That's it! You will get a nice spiral.

Here are all the currently available options.

## Margin and padding support
The elements in the spiral can have margins and paddings.
SpiralTile.js tiles the elements following the stylesheets.
See the example below(a screenshot of [examples/index.html](https://github.com/akayado/spiraltilejs/blob/master/examples/index.html)).
!["examples/index.html"](https://github.com/akayado/spiraltilejs/blob/master/example.png)

## Options

* width : a number or "auto"
* height : a number or "auto"
* ratio : "golden", "silver", "auto" or a decimal.
* orientation : "landscape" or "portrait". See "Details".
* clockwise : true or false. Determins whether the spiral goes clockwise or not.
* beginning : "top" or "bottom" for vertically long spirals, "left" or "right" for horizontally long spirals.

### Defaults
* width : "auto"
* height : "auto"
* ratio : "auto"
* orientation : "landscape"
* clockwise : true
* beginning : "top" for vertically long spirals, "left" for horizontally long spirals.

### Details
The options width, height and ratio are all set to "auto" by default, but the user must set 2 out of these 3 options in order to determine the area of the spiral.

Good examples:
```javascript
$("#tile-container").spiralTile({width: 600, ratio: "silver"});
$("#tile-container").spiralTile({width: 600, height: 400});
$("#tile-container").spiralTile({height: 600, ratio: 1.5});
```
Bad examples:
```javascript
$("#tile-container").spiralTile({ratio: "silver"});
$("#tile-container").spiralTile({width: 600, height: 400, ratio: "golden"});
```

`ratio` represents either the ratio of the length of the left edge to the length of the top edge, or the other way around.
So, when the user sets the `ratio` and (`width` or `height`), the orientation of the spiral is determined by `orientation` option.

That means, when the user sets both `width` and `height`, he or she does not need to set the `orientation` option.
