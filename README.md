# randr
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dolphin4ik/randr?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

randr • html dom from json on javascript

### How to start?

* Create json like this:
```javascript
var json = {
  node: 'div',
  implement: true,
  defaults: [
    {
      type: 'class',
      data: 'super-block'
    }
  ],
  content: [
    {
      node: 'div',
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

* Append\insert this json somewhere with randr:
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

``node`` is a typical DOM node

``defaults`` is an array (or object with attr:value properties) of attribute objects for this DOM node:

```javascript
defaults: [
  {
    type: 'attribute',<!-- required -->
    data: 'value'
  },
  {
    type: 'attribute2',<!-- required -->
    data: 'value2'
  }
]

or

defaults: {
  attribute: value,
  attribute2: value2
}
```

``content`` can be a **string**, **object** and **array** of objects

``implement`` flag implements the **defaults** attributes to childs, if *true*. <!-- not required -->

```javascript
implement: true
```

``extend`` flag extends the **defaults** attributes from parent, if *true*. <!-- not required -->

>> ! Note, that parent "class" attributes stacks with child "class", but another attributes will be overwrited with childs..
>> ! Note2, that implemented or extended "defaults" must be the same types (object or array)


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
And here's a pie!</br>
You can make ur own ``nodes``, just create an object, each option of it must be a function:

```js
var myNodes = {
  profile: function(options){
    var d = document.createElement('div');
    var p = document.createElement('p');
    var a = document.createElement('a');
    a.setAttribute('href',options.href);
    a.innerHTML = options.name;
    var i = document.createElement('img');
    i.setAttriute('src',options.image);
    p.appendChild(a);
    p.appendChild(i);
    d.appendChild(p);
    return d;
  }
}
```
And after only enter this node in json and randr object:

```js
var json = {
  node: 'profile',<!-- Your node -->
  content: {
    href: 'https://github.com/dolphin4ik',
    image: 'https://avatars0.githubusercontent.com/u/2123689?v=3&s=96',
    name: 'dolphin4ik'
  }
}
```
Enter this new nodes as a second option in randr:
```js
document.body.appendChild(randr(json, myNodes));
```


### !Note
Third option (if ``true``) in randr returns **rendered** ``json`` as text
```js
document.body.innerHTML = randr(json, myNodes, true);
```
