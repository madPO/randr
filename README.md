# randr
randr • html dom from json

1.Create JSON object like this:

<code>
{\n
	node: 'div',
	defaults: [
		{
			type: 'class',
			data: 'your awasome classes'
		},
		{
			type: 'super-attr',
			data: 'super-attr value'
		}
	],
	content: [
		{
			content: 'some child div text'
		},
		{
			node: 'img',
			extend: false,
			defaults: [
				{
					type: 'class',
					data: 'json-img-class without extended classes and attributes'
				},
				{
					type: 'src',
					data: 'http://sg.uploads.ru/QXJ5a.png'
				}
			]
		},
		{
			implement: false,
			content: [
				{
				 content: 'first child child div text, without extended attributes and classes'
				},
				{
				 content: 'second child child div text, without extended attributes and classes'
				}
			]
		}
	]
}
</code>
