- [List](#list)
  - [Filters](#filters)
  - [Layout](#layout)
- [Details](#details)
  - [Icon properties](#icon-properties)
    - [Change brand version](#change-brand-version)
    - [Modfy icon size](#modify-icon-size)
    - [Modify artboard](#modify-artboard)
    - [Modify icon color](#modify-icon-color)
  - [Options](#options)
    - [Show icon limits](#show-icon-limits)
    - [Sharing modified icon](#sharing-modified-icon)
  - [Downloads](#downloads)

# List

Icons list is the main screen, where you can find a list of all the icons (filtered by brand) have been detected. On
this screen, you can have a quick look to all your icons, and you also can search/filter on this list, so you can find
your icons easily.

## Filters

The principal component of this screen is the searchbar. You can write anything you want on this bar, and it will get a
list of keywords (separated by space). Then, it wiil filter the icon list with any icon that matches:

- Icons that have a similar fileName to any keyword.
- Icons that have a similar brand to any keyword.
- Icons that have a similar main color (in hexadecimal) to any keyword starting with `#`.
- Icons that have any similar tag to any keyword.

In this search bar, there is a number at the right side, that reflects the number of icons that "pass" the filter you
have made.

## Layout

Below the search bar, there are two buttons that will allow you to switch from `list` mode to `grid` mode, and
viceversa. So you can display icons as you preffer.

The option you select will be recorded in your following visits.

# Details

When you click on any icon, Details screen will be open. Here is where all the power resides. On this screen, you'll be
able to operate with the icon, so you can save your designer's time, or even make some design modifications if you don't
have a designer.

## Icon properties

### Change brand version

If an icon is available in several brands (with the same fileName), you'll se a dropdown, so you can quickly switch from
brands, and see how your icon looks in another brand.

### Modify icon size

SVG files are vectorial files, so you can modify its size without loosing quality. Theorically, you won't need to change
the icon size, since it can scale to any size, but there are scenarios where you want the file to have a particular
size.

For example, in this tool you can convert an SVG to PNG. In that case, you'll probably need to modify the icon size.

### Modify artboard

This modification doesn't affect the icon itself, but can help you to see how your icon will look on different
backgrounds, so you can adjust the color for a better look.

### Modify icon color

This control will allow you to modify the main color of your icon, so yo can modify it easily without the need of
opening a design tool.

_\*Note: If you want to understand how this tool is detecting the main color, please read the_
_[how it works](./how-it-works#color) docs._

## Options

### Show icon limits

This toggle will enable/disable a blue line that will show the limits of your SVG. This is usefull when you have
transparent backgrounds, and you want to see how much space there is between the "limit of the file" and the "visible
part" of your icon.

The option you select will be recorded in your following visits.

### Sharing modified icon

This input will be updated on each change you make, so you'll have a link that can be shared to any other person. This
is very useful if you make some modifications and want to share them with someone, maybe to ask for feedback.

## Downloads

By default, you'll be able to download the icon in SVG and PNG. If you have made some modifications, the icon that you
download will have those modifications applied.

TODO: I'm working in adding compatibility to download a PDF version, since I've known that some iOS developers use icons
embeded in PDF files.
