# Pixel Art - Sketchpad
This is a browser version of a Pixel Art Sketchpad. I started this project to practice my DOM manipulation skills. 
It was built using HTML, CSS, and vanilla JS.

🔗 Live preview of my sketchpad: [Live Demo](https://josefggx.github.io/pixel-art-sketchpad/)

## Functionality
- **Pen:** The functionality of the Pen mode, which is the default mode of the sketchpad, is that when you click on a square on the canvas, it will be painted in the color that is selected. It should be noted that if you keep the click pressed, you can paint squares just by dragging the mouse.
- **Eraser:** It works in an equivalent way to the Pen, but with the difference that instead of painting squares, it erases the content of those squares that you click on.
- **Eyedropper:** The eyedropper turns the mouse pointer into a canvas color listener. You can click on any square on the canvas and automatically, the color of your Pen will turn to the color of that square when you release the click, and it will be immediately ready to draw.
- **Rainbow Mode**: Turn the pointer into a rainbow Pen! Now when you draw on the canvas, it will choose a random color from the rainbow and paint the square with that color.
- **Lightening Tool:** Basically our pointer is capable of clarifying those things that we draw, it is ideal for adding brightness and details to our drawings. It takes 15 clicks to go from black to white with this tool.
- **Shading Tool:** It does the opposite of our Lightening tool, it adds a touch of black to the square we decide to apply to it. It takes about 16 clicks to go from white to black.
- **Save Button:** Take a screenshot of our drawing and automatically download it to our device. Honestly, this was a feature I wanted to include, but the quality of the screenshots is not the best due to limitations of the tool used. However, it's a cool addition for those who don't have a way to take quick screenshots on their PC.
- **Toggle Grid Lines:** This button is used to activate and deactivate the guide lines of our canvas. It can be very useful for some to have them active, others will prefer a cleaner canvas. The option is disabled by default, it can be easily activated with a click.
- **Canvas Size Slider:** This slider is used to decide how we want to divide our canvas. By default it comes in dimensions of 16x16, but we can change it at any time just by moving the slider to the value we want. It is important to note that when we resize, our previous drawing is automatically deleted to generate a new canvas with the new sizing.
- **Clear Button:** This button completely erases whatever we have drawn on our canvas, keeping our color and size settings. It only deletes the content that we had drawn on the canvas.

## Learning Outcome:
- I greatly improved my DOM manipulation skills. It was one of the points that I most wanted to work on and I think this project was excellent to improve.
- I improved my CSS skills, I used both Grid and Flexbox for this project, my confidence using them and my understanding of how they work improved a lot.
- The reusability of functions, and the handling of combined event listeners was one of the most necessary things to satisfactorily achieve the expected result.
Greatly improved functionality in general (shortened, optimized and reusable functions).
- Although I'm not a UI designer, it was fun to design the project on my own and honestly, I really liked the end result. I used Figma for this purpose.
- Lastly, I would like to say that I really enjoyed building this project. It is the first project that I complete and make public, so probably the ones I publish in the future will be much more polished in all senses, but this project will always have a special place in my memory because of how much I enjoyed doing it and all the learning that it provided.

## My PixelArt Sketchpad in action:
![demo of Sketchpad](/demo.png)