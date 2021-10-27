# P5-Arduino-Abstract-Art-Generator
My Arduino + p5.js painter is a simple handheld device that controls a randomizered color pattern than the user can drag across a canvas to create a customized pattern wallpaper. It is inspired by the color and circular patterns by Kandinsky paintings.

It features an LCD screen to alert the user of when the program is running and the cursor placement and brush size in pixels. This is useful since the potentiometer controls both brush (circle) size and and opacity. There is a joystick that controls the brush movement and two buttons to reset the canvas or save a screenshot of your final masterpiece. It is meant as a playful device that can potentially be scaled for additional interactions and pattern designs.

## Materials
![Image](https://gregdchan.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-10-at-1.05.35-PM-980x625.png)

The device uses the following materials

* Breadboard x 2
* Arduino Nano 33 IoT
* X, Y, Button Joystick
* LCD 16×2 display
* Mini push buttons x 2
* Potentiometer

## Interaction
The device boots up and the LCD notifies you if your P5.js Serial is not open. If the serial app is running already, you can simply select the port of choice from the screen. Once open, the display switches to show feedback interaction with the joystick or potentiometer. On the P5 sketch’s canvas you can also select your port.

The input controls include the following:
* Joystick
* Circle and opacity size change via potentiometer
* Canvas Clear button
* Canva Save button

The user can simply move the joystick and adjust the potentiometer simultaneously to draw patterns.

![Image](https://i2.wp.com/gregdchan.com/wp-content/uploads/2021/08/myPortrait4.jpeg)
![Image](https://i1.wp.com/gregdchan.com/wp-content/uploads/2021/08/myPortrait-3.jpeg)
