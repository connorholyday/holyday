---
title: "Margins, Line Heights, and Vertical Rhythms"
date: "2017-09-17"
type: Blog
url: https://medium.com/@ConnorHolyday/margins-line-heights-and-vertical-rhythms-cda01db90c38
---

Recently the whole team seems to have fallen victim to the 8pt Grid as a method of keeping spacing consistent. For those that haven’t read into it — the idea is that all spacing is a multiple of 8, which is by default: half the root font size or .5rem.

This works beautifully in design but the real bugbear shows itself when you port it over to the code. The best example of this is a heading followed by a paragraph. Let’s say we’re using a H1 with a font-size of 50px and a line-height of 1.3. If we calculate this line-height to a pixel-value we get 65px, now that’s a 15px difference to the font-size, so what happens to it?

This extra space is distributed directly above and below the characters of your content itself. The purpose of this is so that when text spans multiple lines there is space between the words so they’re not stacked on-top of each other. The trouble with this is that we now have a rogue 15px of space to account for, and as this value is evenly distributed we’re actually only dealing with the bottom half of the extra space: 7.5px. So when we add a margin of 16px we end up having a complete space of 23.5px between the bottom of the text and the next element — throwing out our 8pt vertical rhythm.

In an attempt to make this easier I’ve created a small Sass function that removes the extra-space of the line-height from the value that you pass in:

```scss
// calculates a value by adjusting for the line-height
function line-height-adjust($distance, $line-height) {
    return calc(#{$distance} — (((1em * #{$line-height}) — 1em) / 2));
}
```

You could make this function more useful by adding default values but in this case I’ve left them blank. It works by first multiplying the line-height by 1em to figure out the actual value of the line-height for your element, we’re using em's to automatically get the current font size. Then it subtracts 1em so that what we have left is the extra space — this is then halved because we only need to account for the space on one side of the element. Finally, because we’re using em's and Sass doesn’t know how much 1em is, we need to return a calc() function for it to work properly in CSS.

> **tl;dr — use the calc function, add an em value to the end of the line-height, subtract 1, and halve it.**

For example, if we wanted to add a bottom margin of 16px and the element had a line-height of 1.3, we would use: margin-bottom: line-height-adjust(16px, 1.3);. This would then show in the CSS as margin-bottom: calc(16px — .15em);.

I mean, I could just learn to use the method and type the CSS myself but by using this named function it reminds me or any future developers why there’s an odd calc function there in the first place.
