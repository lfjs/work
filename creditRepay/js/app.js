/**
 * Created by Administrator on 2017/6/27.
 */
angular.module('ionicApp', ['ionic','ui.router','directives','controllers', 'onezone-datepicker','ipCookie'])
	.filter('last4', function() {
		return function(text) {
			//console.log(text?text.match(/....$/)[0]:'0000');
			return text?text.match(/....$/)[0]:'0000';
		}
	})
	.filter('cardUniform', function() {
		return function(text) {
			var temp = (text?text.match(/\d{12}|\d*/g):'000000');
			//console.log('**** **** **** '+temp[1]);
			return ('**** **** **** '+temp[1]);
		}
	})
	.filter('dateCn', function() {
		return function(text) {
			var temp = (text?text.match(/../g):'000000');
			//console.log(temp[0]+temp[1]+'年'+temp[2]+'月'+temp[3]+'日');
			return text?(temp[0]+temp[1]+'-'+temp[2]+'-'+temp[3]):'年-月-日';
		}
	})
	.filter('hideMiddleName', function() {
		return function(text) {
			var temp = text?text.split(""):'0000'.split("");
			//var temp = '王大拿与猪肉王子'.split("");
			//console.log(Math.floor(temp.length/3));
			for(var i=1;i<temp.length;i++){
				if(i>=Math.floor(temp.length/3)&&i<temp.length-Math.floor(temp.length/3)){
					temp.splice(i,1,"*")
				}
			}
			//console.log(temp.join(''));
			return temp.join('');
		}
	})
	.service('jsonToStr',function(){
		this.transform = function(jsonData){
			var string = '';
			for(str in jsonData){
				string = string + str +'=' + jsonData[str] +'&';
			}
			var _last = string.lastIndexOf('&');
			string = string.substring(0,_last);
			return string;
		};
	})
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('main', {
				url: '/main',
				templateUrl: 'main.html'
			})
			.state('promotionDetail', {
				url: '/main/promotionDetail',
				templateUrl: 'promotionDetail.html'
			})
			.state('cardManage', {
				url: '/main/cardManage',
				templateUrl: 'cardManage.html'
			})
			.state('idCer', {
				url: '/main/idCer',
				templateUrl: 'idCer.html'
			})
			.state('my', {
				url: '/main/my',
				templateUrl: 'my.html'
			})
			.state('promotion', {
				url: '/main/promotion',
				templateUrl: 'promotion.html'
			})
			.state('changePsw', {
				url: '/main/changePsw',
				templateUrl: 'changePsw.html'
			})
			.state('reg', {
				url: '/main/reg',
				templateUrl: 'reg.html'
			})
			.state('login', {
				url: '/main/login',
				templateUrl: 'login.html'
			})
			.state('credit', {
				url: '/main/credit',
				templateUrl: 'credit.html'
			})
			.state('addCard', {
				url: '/main/addCard',
				templateUrl: 'addCard.html'
			})
			.state('creditEdit', {
				url: '/main/credit/creditBank/creditEdit/:cardId/:index',
				templateUrl: 'creditEdit.html'
			})
			.state('creditPrev', {
				url: '/main/credit/creditBank/creditPrev/:cardId/:index',
				templateUrl: 'creditPrev.html'
			})
			.state('creditView', {
				url: '/main/credit/creditBank/creditNew/creditView/:index',
				templateUrl: 'creditView.html'
			})
			.state('creditNew', {
				url: '/main/credit/creditBank/creditNew/:cardId/:index',
				templateUrl: 'creditNew.html'
			})
			.state('creditBank', {
				url: '/main/credit/creditBank/:cardId/:index',
				templateUrl: 'creditBank.html'
			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/main');
	});
