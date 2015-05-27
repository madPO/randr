# randr
randr • html dom from json

1.Create JSON object like this:
json = {
  node: 'div', <!-- any node. 'div' is default if no node -->
  defaults: [
    {
      type: 'class',
      data: 'some awesome styles and classes'
    },
    {
      type: 'any-cool-attribute',
      data: 'if attribute will have params'
    }
  ],
  content: [ <!-- array of nodes, alone node or text content -->
    
  ]
}
