/**
 * Created by Administrator on 2017/8/15.
 */
//window.onclick = function(e){//ios配合啥 亲测都不管用
document.onclick = function(e){//ios配合{cursor：pointer}亲测管用
		var tar = e.target;
	//console.log([tar][0].parentNode.nodeName);
	if([tar][0].className == 'name'||[tar][0].className == 'logo'){
		window.location.href = 'index.html';
	}else if([tar][0].parentNode.nodeName == 'UL'&&[tar][0].className != ''){
		if([tar][0].className == 'product'){
			window.location.href = 'product.html';
		}else if([tar][0].className == 'about'){
			window.location.href = 'about.html';
		}else if([tar][0].className == 'solution'){
			window.location.href = 'solution.html';
		}else if([tar][0].className == 'service'){
			window.location.href = 'service.html';
		}
	}else if([tar][0].parentNode.className.indexOf('serviceSelect')+1) {
		for(i = 0 ; i < [[tar][0].parentNode][0].children.length ; i++){
			[[tar][0].parentNode][0].children[i].className = [tar][0].className
		}
		[tar][0].className += ' on';

		var ser = document.getElementsByClassName('services');
		for(i = 0 ; i < ser.length ; i++){
			if(ser[i].title != [[tar][0]][0].title){
				ser[i].style.display = 'none';
			}else{
				ser[i].style.display = 'block';
			}
		}
	}else if([tar][0].parentNode.className.indexOf('solutionSelect')+1) {
		for(i = 0 ; i < [[tar][0].parentNode][0].children.length ; i++){
			[[tar][0].parentNode][0].children[i].className = [tar][0].className
		}
		[tar][0].className += ' on';
		var sol = document.getElementsByClassName('solutions');
		for(i = 0 ; i < sol.length ; i++){
			if(sol[i].title != [[tar][0]][0].children[0].title){
				sol[i].style.display = 'none';
			}else{
				sol[i].style.display = 'block';
			}
		}
	}
};