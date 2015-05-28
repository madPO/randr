/* randr: a js library, which makes html dom from json */
/* author: denyzhirkov@yandex.ru @dolphin4ik */
/* cersion: 0.3.1 */
;var randr = function(json,nodes){
	this.version = '0.3.1';
	this.nodes = function(t){return document.createElement(t);}

	var stack = function(a,b){
		var c = '';
		var stack = [];
		for (var i = b.length - 1; i >= 0; i--) {
			if(b[i].type!='class'){stack.push({type:b[i].type,data:b[i].data});}
			else{c = b[i].data;}
		};
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].type!='class'){stack.push({type:a[i].type,data:a[i].data});}
			else{c += ' '+a[i].data;}
		};
		stack.push({type:'class',data:c});
		return stack;
	}

	var render = function(k){
		k.implement = (k.implement==undefined || k.implement==true)? true : false;
		k.extend = (k.extend==undefined || k.extend==true)? true : false;
		var node = (k.node==undefined)?
			( (k.content==undefined || typeof(k.content)!='string')? this.nodes('div') : this.nodes('p') )
			:
			( (nodes!=undefined && nodes[k.node]!=undefined)? nodes[k.node]() : this.nodes(k.node) );
		if(k.defaults!==undefined){
			for (var i = k.defaults.length - 1; i >= 0; i--){
				node.setAttribute(k.defaults[i].type, k.defaults[i].data || '');
			};
		}
		if(k.events!==undefined){
			for (var i = k.events.length - 1; i >= 0; i--){
				$(node).on(k.events[i].type,k.events[i].action);
			};
		}
		if(k.content!==undefined){
			//array
			if(k.content instanceof Array){
				k.content.reverse();
				for(var i = k.content.length - 1; i >= 0; i--){
					if(k.defaults!==undefined && k.implement!==false && k.content[i].extend!==false){
						if(k.content[i].defaults!==undefined){
							k.content[i].defaults = stack(k.content[i].defaults,k.defaults);
						}else{
							k.content[i].defaults = k.defaults;
						}
					}
					node.appendChild(render(k.content[i]));
				}
			}
			//object
			else if(k.content instanceof Object){
				if(k.defaults!==undefined && k.implement!==false && k.content.extend!==false){
					if(k.content.defaults!==undefined){
						k.content.defaults = stack(k.content.defaults,k.defaults);
					}else{
						k.content.defaults = k.defaults;
					}
				}
				node.appendChild(render(k.content));
			}
			//string
			else{
				node.innerHTML = k.content;
			}
		}
		return node;
	}

	return render(json);

};
