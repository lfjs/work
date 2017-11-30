/**
 * Created by Administrator on 2017/11/17.
 */
var keysBg = document.getElementById('keysBg');
var keys = document.getElementById('keys');
var keysInput = document.getElementById('keysInput');
var payBtn = document.getElementById('payBtn');
var loading = document.getElementById('loading');
var channelSelected = document.getElementById('channelSelected');
var inputValue =[];
var keyFlag = false;
var decimalFlag = false;
var checkPay = function(){
	inputValue.length?payBtn.title='pay':payBtn.title=''
};
var checkInput = function(value,backspace){
	if(backspace){
		inputValue.pop()
	}else{
		//value?inputValue.push(value):void(0);
		if(decimalFlag){
			var temp = true;
			for(var i=0;i<inputValue.length;i++){
				if(inputValue[i] == '.'){
					console.log(inputValue.length-i)
					inputValue.length-i>2?temp=false:void(0)
				}
			}
			if(temp){
				if(value) inputValue.push(value);
				else value == 0? inputValue.push(value):void(0)
			}
			console.log(111111)
		}else{
			if(value) inputValue.push(value);
			else value == 0? inputValue.push(value):void(0)
		}
	}
	keysInput.innerText = inputValue.join('');
	if(!inputValue.length){
		keysInput.innerText = '0.00'
	}
};
var checkKeys = function(){
	if(keyFlag){
		keysBg.style.height = '50px';
		keys.style.height = '0%';
		keysInput.style.borderRightWidth = '0';
		keyFlag = false;
	}else{
		keysBg.style.height = '30%';
		keys.style.height = '30%';
		keysInput.style.borderRightWidth = '2px';
		keyFlag = true;
	}
};
	document.onclick = function(e){
		var evt = e || window.event;
		var target = evt.target || evt.srcElement;
		//console.log([target]);
		//alert(target.id,keys);
		if(target.id == 'inputBar'||target.className.indexOf('hideKeys')+1){
			checkKeys()
		}else if(target.id =='keysClear'){
			(inputValue=[]);
			keysInput.innerText = '0.00'
		}else if(target.className.indexOf('channel')+1){
			var channels = document.getElementsByClassName('channel');
			channelSelected.value = target.title;
			for(var i=0;i<channels.length;i++){
				;(function locateChildA(locateObj){
					if(locateObj.className.indexOf('checked')+1){
						//locateObj.style[matchStyle(x)] = obj.style[0][x] *2 +'px';
						locateObj.style.display = 'none';
						return
					}
					if(locateObj.children.length == 0) return;
					for(var j=0;j<locateObj.children.length;j++){
						locateChildA(locateObj.children[j])
					}
				})(channels[i])
			}
			;(function locateChildA(locateObj){
				if(locateObj.className.indexOf('checked')+1){
					//locateObj.style[matchStyle(x)] = obj.style[0][x] *2 +'px';
					locateObj.style.display = 'block';
					return
				}
				if(locateObj.children.length == 0) return;
				for(var j=0;j<locateObj.children.length;j++){
					locateChildA(locateObj.children[j])
				}
			})(target)
		}else if(target.className.indexOf('numBtn')+1){
			checkInput(parseInt(target.innerText));
		}else if(target.className.indexOf('backspaceBtn')+1){
			checkInput(parseInt(target.innerText),true);
		}else if(target.id.indexOf('payBtn')+1){
			if(target.title){
				loading.style.display = 'table'
			}else{
			}
		}else if(target.className.indexOf('decimalBtn')+1){
			for(var i=0;i<inputValue.length;i++ ){
				if(inputValue[i] == '.'){
					decimalFlag = true;
					break
				}else{
					decimalFlag = false;
				}
			}
			if(!decimalFlag){
				inputValue.push('.');
				keysInput.innerText = inputValue.join('');
				decimalFlag = true;
			}
		}else{
			//console.log(evt)
		}
		checkPay();
	};
checkKeys();
checkInput();
checkPay();