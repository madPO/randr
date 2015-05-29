# randr
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dolphin4ik/randr?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

randr • html dom from json on javascript

### How to start?

* Create json like this:
```javascript
var json = {
  node: 'div',
  defaults: [
    {
      type: 'class',
      data: 'super-block'
    }
  ],
  content: [
    {
      node: 'div',
      implement: false,
      defaults: [
        {
          type: 'class',
          data: 'text-block'
        }
      ],
      content: [
        {
          node: 'p',
          content: 'p tag which doesnt inherit parent defaults attributes, cause of a parents implement flag'
        }
      ]
    },
    {
      node: 'img',
      extend: false,
      defaults: [
        {
          type: 'src',
          data: 'http://sh.uploads.ru/9F2LR.png'
        },
        {
          type: 'title',
          data: 'json image'
        }
      ]
    }
  ]
}
```

* Append this json somewhere with randr:
```javascript
document.body.appendChild(randr(json));
```
# randr!

randr object consists of:

> *node*

> *defaults*

> *content*

and some flags:

> *imlement*

> *extend*

*node* is a typical DOM node

*defaults* is an array of attribute objects for this DOM node:

```javascript
{
  type: 'attribute',<!-- required -->
  data: 'attribute option'
}
```

*content* can be a **string**, **object** and **array** of objects

*implement* flag implements the **defaults** attributes to childs, if not *false*. <!-- not required -->

```javascript
implement: false
```

*extend* flag extends the **defaults** attributes from parent, if not *false*. <!-- not required -->

>> Note, that parent "class" attributes stacks with child "class", but another attributes will be overwrited with childs..


Its simple, but its not all that randr can.

U can shrink the json:
```javascript
{
  content: 'alone content with text makes p tag with this text'
}
```
If content is not a string randr automatically makes div node:
```javascript
{
  content: {content:'p tag in div parent'}
}
```
And u can do it infinitely:
```javascript
{
  content: {
    content:{
      content:{
        content:{
          content: 'hey, lets finish it!'
        }
      }
    }
  }
}
```
