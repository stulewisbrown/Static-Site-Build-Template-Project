Static Site Build Template Project - powerful & extendable
=============================

This is a starter project for quickly & easily building a completely bespoke and powerful static site.

The project is put together with complete extendability and modularity in mind, so all you have to do is stitch your site together with the responsive building blocks, however you want to use them. The project is built on a solid foundation of sound build structure and a powerful CSS framework, so all you have to do is extend it to fit your style and grow it into as big or small a site as you want.

What's in it?
-------------

At your disposal is the power of the [Inuit.css](https://github.com/inuitcss/inuitcss) framework and the site generation capabilities of [Jekyll](http://jekyllrb.com/). This is all rolled out in one easy to manage [GulpJS](https://github.com/gulpjs/gulp) file that implements the Jekyll build as well as every other tool a front end dev could want in one command, such as BrowserSync, Autoprefixing, plumber notifications etc..

## Installation

### System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [NodeJS](http://nodejs.org) - use the installer.
3. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo)

### Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Fire it up

All you need to do to get this project running in development mode is:

```shell
$ gulp
```
This will implement the Jekyll build, give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

BrowserSync is not set to open a new window everytime you 'build' (trust me, it gets annoying). So you'll need to navigate to the local address it gives you after running `gulp` (usually something like 'localhost:3000'). After that, if you quit and re-run gulp, you will need to reload the page manually just for the first time. If you prefer opening a new tab every time, simply change `open: false` to `open: true` in the browsersync settings in gulpfile.js.

## How to use

OK so as mentioned, this project relies heavily on [Inuit.css](https://github.com/inuitcss/inuitcss) and [Jekyll](http://jekyllrb.com/), so you should familiarise yourself with their documentation, but I'll go over a few features here to highlight how they're being used.

### File structure

Here's a quick walkthrough of what every top level file is on the build:

- **_data** - a place where you can create yaml databases to serve data to your site, such as contact details
- **_includes** - a home to all the HTML partials that make up your page components. The component templates are all in 'partials' and the custom page content should be represented in the equivalent page folder. See 'Includes' section below for more.
- **_js** - all your JS files should be in here. Gulp will concat them all into one, so beware of source order.
- **_layouts** - These are the overall page templates.
- **_plugins** - Any plugins you want installed that work with Jekyll should go here.
- **_posts** - since Jekyll is a 'blog aware' platform, you are encouraged to use posts as your updates to the site, however you can make this work to your advantage if you don't want to do that, by making it your news section, or ignoring it entirely.
- **_scss** - this is a biggie. Your inuitcss framework lives in here. For more details, see the 'Inuit' section below.
- **_site** - never edit anything yourself in here, this is where your site gets built into by Jekyll
- **other folders** - any folders such as 'assets' or 'css' that do not have an underscore in front of them will not be processed by Jekyll other than to include them in your final site. 

⋅⋅⋅ **_Quick note_** on why we have 'css' and 'js' folders in the site root as well as in the above files: only HTML changes necessitate a Jekyll rebuild. When this happens, it processes all of the folders and files and distributes them into our site folder. So we need to have our gulpfile output our js and css in these root level files so that Jekyll will include them in the final site. HOWEVER - we don't want to have to rebuild the site everytime we make a change to css or js as well, so the gulpfile _also_ updates the existing files in site so that a rebuild is not required to make changes. When we do rebuild, whatever is in the site folder will be overwritten by what's in the root level. Still with me? Trust me, it's fine, don't worry about it...

### Basic page setup

Create an HTML file in the build site root and stick your YAML front matter at the top of the page (again, see Jeykll documentation for more info). It looks like this:
```yaml
---
layout: default
title: Example Page
navigation-order: 2
---
```
Here you assign it the layout you want (see _layouts file), the page name and what order it should sit in the navigation. If you're in development mode (see Fire it up section above) you should now see this page in navigation when you save it. Click into it and you'll see it has all the components and layout you assigned in the layout HTML file. You're now free to put whatever you want in this main body of page. Read the next two sections for advice on what that should be to get the most out of the project.

### Includes

You can import your components to make up your page with the use of the `{% include %}` tag. Jekyll uses the [liquid templating language](https://help.shopify.com/themes/liquid) to pass parameters around and work with dynamic content. 

Say that we want to use a hero-banner at the top of a page we could write something like:

`{% include partials/hero-banner.html %}`

This will look into our includes folder, and we've specified the file we want it to include in our page. Easy.

#### Custom Parameters

We can also pass it parameters through including custom attributes in our tag such as:

`{% include partials/hero-banner.html imgsrc="/bg/homepage-hero-touch@1600px.jpg" %}`

How does this work? If we look in any of our already existing partial files we can see a lot of liquid template logic going on which is often there to react to whether or not we've passed in a custom parameter in the include. In this case we've passed in 'imgsrc' value.

In partials/hero-banner.html we have the following logic:
```liquid
{% if include.imgsrc == nil %}
	{% assign imgsrc = "/assets/banner@1280.jpg" %}
	{% else %}
	{% assign imgsrc = {{include.imgsrc}} %}
{% endif %}
...
<section style="background-image:url( {{ imgsrc }} );">
```
If imgsrc doesn't exist, use the default site banner, if not, use the value in imgsrc as the banner. You can create whatever parameters you want like this.

#### Custom Classes

If you want to extend the component with an extender class, you can usually simply pass this in with 

`{% include partials/hero-banner.html class="example--extender" %]` 

so long as the logic is set up in the partial file to accomodate this. Again, the HTML (with the liquid logic) would look something like this: 

`class="c-hero {{include.class}}"`

#### Custom Content

You don't want every component on your site to have the same content do you? You want to be able to pass in custom content now and again right? Well this is where we get a bit Inception on you. We achieve this by creating includes _within_ includes. So on our HTML page, we have our include tag:

`{% include partials/hero-banner.html class="c-hero--overlay" imgsrc="/bg/homepage-hero-touch@1600px.jpg" content="kitchensink/hero-banner-example.html" %}`

This time we've included a 'content' attribute. The logic in the partial file 'partials/hero-banner.html' is looking for this content value to be passed. If it sees it, it doesn't use the default content for the component, rather uses the value of 'content' as the source of your custom content to be included. In this case that would be 'kitchensink/hero-banner-example.html'. So our partial files also use includes to optionally include custom content: 

`{% include {{include.content}} %}`

## Inuit

Inuit is a totally awesome, open-source CSS framework. I heavily suggest you go and read about [how it works](https://github.com/inuitcss/inuitcss). However, to make life easier for you so you can get up and running super quick, I'll take you through some of the fundamental ways in which you should use inuit on this project.

### Layout

All components that are included on the site are pretty much designed to take the full width of their parent container, so to structure your pages, you should put them inside Inuit's layout object. You can read more about how to use this properly in the object.layout.scss file. So your page HTML files should end up looking something like this:
```html
<div class="o-layout">
 <div class="o-layout__item  u-1/2">
 {% include partials/hero-banner.html %}
 </div>
 <div class="o-layout__item  u-1/2">
 {% include partials/menu.html %}
 </div>
</div>
```

### Spacing

Most components also come with no margins around them so they can stack like blocks. Obviously in most situations you're going to want to apply some margins, so be sure to achieve this by passing in a custom class in the include tag (see Custom Classes above). You can use inuit's spacing suite of classes for this. e.g:

`{% include partials/hero-banner.html class="u-margin-bottom" %}`

To get a consistent vertical rhythm, be sure to always use inuits spacing units rather than arbitrary '[magic numbers](http://csswizardry.com/2012/11/code-smells-in-css/#magic-numbers)'.

## Go, get started!

The site comes with a select few of the most commonly occuring design patterns, a couple of examples of pages and a Kitchen Sink of components. Just start building, that's all you have to do.

## Deploy with Gulp

You can easily deploy your site build to a gh-pages branch. First, follow the instructions at [gulp-gh-pages](https://github.com/rowoot/gulp-gh-pages) to get your branch prepared for the deployment and to install the module. Then, in `gulpfile.js` you'll want to include something like the code below. `gulp.src()` needs to be the path to your final site folder, which by default will be `_site`. If you change the `destination` in your `_config.yml` file, be sure to reflect that in your gulpfile.



```javascript
var deploy = require("gulp-gh-pages");

gulp.task("deploy", ["jekyll-build"], function () {
    return gulp.src("./_site/**/*")
        .pipe(deploy());
});
```
