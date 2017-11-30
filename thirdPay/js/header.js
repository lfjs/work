
var path = window.location.pathname;
var on = {};
if(path.indexOf('product.html')+1){
	on = {};
	on.product = true
}else if(path.indexOf('about.html')+1){
	on = {};
	on.about = true
}else if(path.indexOf('solution.html')+1){
	on = {};
	on.solution = true
}else if(path.indexOf('service.html')+1){
	on = {};
	on.service = true
}

document.write('<div class="headerBg"></div>');
document.write('<div class="header">');
document.write('<div class="con clearAfter">');
document.write('<img class="logo" src="img/logo1.png" alt=""/><span class="name">深圳福然电子商务有限公司</span>');
document.write('<ul id="aaa">');
document.write('<li class="'+ (on.product? 'on ':'') +'product">产品与服务</li>');
document.write('<li class="'+ (on.solution? 'on ':'') +'solution">行业解决方案</li>');
document.write('<li class="'+ (on.service? 'on ':'') +'service">商务服务</li>');
document.write('<li class="'+ (on.about? 'on ':'') +'about">关于我们</li>');
document.write('</ul>');
document.write('</div>');
document.write('</div>');