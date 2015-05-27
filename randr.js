;var randr = function(json,callback){
	this.version = '0.1.0';
	this.nodes = function(t){
		return document.createElement(t);
	}

	var render = function(k){
		k.implement = (k.implement==undefined || k.implement==true)? true : false;
		k.extend = (k.extend==undefined || k.extend==true)? true : false;
		var node = (k.node==undefined)? this.nodes('div') : this.nodes(k.node);
		if(k.defaults!==undefined && k.defaults!==false){
			for (var i = k.defaults.length - 1; i >= 0; i--){
				node.setAttribute(k.defaults[i].type, k.defaults[i].data || '');
			};
		}
		if(k.content!==undefined){
			//array
			if(k.content instanceof Array){
				k.content.reverse();
				for(var i = k.content.length - 1; i >= 0; i--){
					if(k.defaults!==undefined && k.implement!==false && k.content[i].extend!==false){
						k.content[i].defaults + k.defaults;
					}
					node.appendChild(render(k.content[i]));
				}
			}
			//object
			else if(k.content instanceof Object){
				if(k.defaults!==undefined && k.implement!==false && k.content.extend!==false){
					k.content.defaults + k.defaults;
				}
				node.innerHTML = render(k.content);
			}
			//string
			else{
				node.innerHTML = k.content;
			}
		}
		return node;
	}

	if(callback!==undefined){
		callback(render(json));
	}else{
		return render(json);
	}
};
