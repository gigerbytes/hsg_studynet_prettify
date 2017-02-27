# Prettifying and improving the HSG [studynet](https://studynet.unisg.ch)

# Main Features

1. Colored Background (and Text) for the courses
2. Removing the ID from the Course Tabs - so you can see the actual name
3. <Experimental> Download Function

![Improved Interface](img/studynet_interface_full.png)

---

# Code

## NOTE

*There are 2 VERSIONS in this repository:*
1. **studynet_prettify_core.js**
With only the first two functions (colored backgrounds and making the tabs readable)

2. ** studynet_prettify_full.js **
 With all functions (including the *buggy* download one)

The First two features work properly in most major browsers (tested on firefox, safari and chrome)
The Experimental download funciton seems to only work on chrome/chromium at the moment.

# Installation

## 1. installing the required extensions
If you are using Chrome or Safari: Use [TamperMonkey](http://tampermonkey.net)

If you are using Firefox: Use [GreaseMonkey](http://www.greasespot.net)

Follow the instructions and install it as an extension on your browser.

These programs will allow you to run the code that changes the studynet interface and adds the additional feauters.

## 2. installing the script (actual code)




## 3. Modifying the Script

You may modify the colours you want to assign to classes. At the very top of the code, you will see some thing like.

There will be multiple *comma separated* blocks of {curly brackets}, each block corresponds to a course.

*NOTE* you may add more blocks, but please dont forget the **commas** between them.

```javascript
   var courseList = [
        {
            'course': 'Microeconomics',
            'bg_color': '#FFCC66',
            'text_color':'#000000',
        },
        ...
    ]
```
this is called a json (pronounced j-son) array, and it contains the data the program needs to correctly assign the colors. You will note a few things:

on the left side of the colon is a variable, and on the right side is the value - i.e.

```
	variable : value
```
DO NOT change the variable, only the values, and only in the following way:

```javascript
	{
		'course': 'name of the course that you want to apply a color to',
		'bg_color': 'the hexadecimal (hex) code of the background color you want',
		'text_color': 'the hex code of the text color you want'
	}
```

### COURSE  
1. The name doesnt have to be exact, it just has to be a subset of the actual name.
	
	e.g. If we have 'Microeconomics' as our name, it will match all rows with "Microeconomics" in it, including things like "Microeconomics 3" and "Microeconomics Exercises".

2. Capitalization is important
3. Commas are important, make sure your lines end with a comma


### HEX CODES

In the web, colors are usually represented via hex codes. you can head to [Color Picker](http://www.colorpicker.com) and just pick the colors you want.

Don't forget the Hashtag (#) at the front of the 6 character code.

---

## Security note: only install scripts you trust, I will not be responsible for any other scripts you install.