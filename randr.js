/* randr: a js library, which makes html dom from json */
/* author: denyzhirkov@yandex.ru @dolphin4ik */
/* version: 0.3.2 */
;var randr = function(json,nodes){
	this.version = '0.3.2';
	this.nodes = function(t){return document.createElement(t);}
	var flag = true;
	var stack = function(a,b){
		var c = '';
		var stack = [];
		for (var i in b) {
			if(b[i].type!='class'){stack.push({type:b[i].type,data:b[i].data});}
			else{c = b[i].data;}
		};
		for (var i in a) {
			if(a[i].type!='class'){stack.push({type:a[i].type,data:a[i].data});}
			else{c += ' '+a[i].data;}
		};
		stack.push({type:'class',data:c});
		return stack;
	}
	var render = function(k){
		k.implement = (k.implement==undefined || k.implement==true)? true : false;
		k.extend = (k.extend==undefined || k.extend==true)? true : false;
		var node;
		if(k.node==undefined){
			if(k.content==undefined || typeof(k.content)!='string'){node=this.nodes('div');}else{node=this.nodes('p');}
		}else{
			if(nodes!=undefined && nodes[k.node]!=undefined){node=nodes[k.node](k.content);flag=false;}else{node=this.nodes(k.node);}
		}
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
		if(k.content!==undefined && flag){
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
