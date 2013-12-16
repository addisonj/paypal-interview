# Paypal Interview Demo
This is a small demo app for a paypal interview

I tried to build this app like I would build a real application of this size. I wanted to give a good sense of how I write code instead of just something thrown together.

The problem statement wasn't super clear on a size to design for, so this is an attempt at something semi-responsive, but definitely intended for mobile.

On the backend, I used express and a few other small npm libraries to create the transaction resource. Its pretty basic.

On the frontend, I created a single page app using backbone, rivetsjs (for two-way data-binding), jade (for templating), stylus, and requirejs. I used jamjs package manager to pull in code and used a few other random libraries (momentjs, spinjs, underscore).

For styling, I started with a minimal CSS framework, base (http://matthewhartman.github.io/base/).

### Using the code
Run `node app.js` and hit `localhost:3000`

### Code Notes
For an app of this size, I am a big of fan of backbone with some simple data-binding. All of the magic that makes that happen is in `public/js/views/View.js`, which is the base backbone view I use. It provides a few abstractions for creating views from templates and setting up all the data-binding, as well as tracking dependencies throughout the app.

The rest of the app is hopefully pretty self explanatory. Feel free to send me an email with any questions.


