angular.module("controllers", [])
	.controller('MyCtrl', function($scope,$stateParams, $ionicPopup ,$state,$http,jsonToStr,ipCookie,$filter,$rootScope,$ionicHistory) {
		$scope.$stateParams = $stateParams;
		//$scope.checkBackToLog = function(msg){
		//	//if(response.data.msg.indexOf("请登录")+1) $state.go('login');
		//	if(msg.indexOf("请登录")+1){
		//		$state.go('login');
		//		return false
		//	}else return true
		//};
		$scope.ls = function() {
			console.log($scope)
		};
		$scope.ls();
		$scope.api = {
			reg : 'http://www.aiyongka.cn/mobile/index.php/site/register',//注册
			verify : 'http://www.aiyongka.cn/mobile/index.php/site/sendMsg',//验证码
			login : 'http://www.aiyongka.cn/mobile/index.php/site/login',//登录
			idCer : 'http://www.aiyongka.cn/mobile/index.php/user/verify',//实名认证
			changePsw : 'http://www.aiyongka.cn/mobile/index.php/site/password_reset',//实名认证
			bank_list : 'http://www.aiyongka.cn/mobile/index.php/site/bank_list',//
			get_area : 'http://www.aiyongka.cn/mobile/index.php/user/get_area',//
			addCard : 'http://www.aiyongka.cn/mobile/index.php/repay/card_add',//
			credit : 'http://www.aiyongka.cn/mobile/index.php/repay/card_list',//
			creditView : 'http://www.aiyongka.cn/mobile/index.php/repay/repay_add',//
			creditNew : 'http://www.aiyongka.cn/mobile/index.php/repay/repay_add_confirm',//
			creditPrev : 'http://www.aiyongka.cn/mobile/index.php/repay/repay_list',//
			card_unbind : 'http://www.aiyongka.cn/mobile/index.php/repay/card_unbind',//
			card_edit : 'http://www.aiyongka.cn/mobile/index.php/repay/card_edit',//
		};
		$scope.reg = {
			phone : '',
			password : '',
			verify_code : '',
			refer_phone : ''//tuijianren
		};
		$scope.verify = {
			phone : $scope.reg.phone,
			type : 'reg'
		};
		$scope.login = {
			phone : '18706302611',
			password : '111111'
		};
		//$scope.token = 'de402e0f00bf735571ef217cbdec486a';
		$scope.token = ipCookie('token');
		$scope.img = {
			idcard_f: {
				key: $scope.token,
				file: 'img/sfrz_sfzzm.png',
			},
			idcard_b: {
				key: $scope.token,
				file: 'img/sfrz_sfzfm.png',
			},
			bankcard_f: {
				key: $scope.token,
				file: 'img/sfrz_yhkzm.png',
			},
			bankcard_b: {
				key: $scope.token,
				file: 'img/sfrz_yhkzm.png',
			},
			idcard_hand: {
				key: $scope.token,
				file: 'img/sfrz_yhkzm.png',
			},
		};
		$scope.bankArea = '';
		$scope.idCer = {
			key: $scope.token,
			merchant_name: '加帕里图书馆',
			realname: '汉字',
			idcard: '370202199011112111',
			bankcardnum: 622700000000000,
			bankcardnum_confirm: 622700000000000,
			bank_id: 1111,
			bank_branch: '加帕里支行',
			bank_province_id: 1111,
			bank_city_id: 222,
			bank_area_id: 33,
			bank_address: 1111,
			address: '加帕里公园',
			idcard_f: '',
			idcard_b: '',
			bankcard_f: '',
			bankcard_b: '',
			idcard_hand: '',
		};
		$scope.changePsw = {
			phone:18706302614,
			verify_code:111111,
			password:111111,
			password_confirm:111111,
		};
		$scope.verifyPsw = {
			phone : $scope.changePsw.phone,
			type : 'reset'
		};
		$scope.get_areaName = '';
		$scope.get_areaCityName = '';
		$scope.get_areaAreaName = '';
		$scope.bank_addressName = '';
		$scope.addCard = {
			key: '',
			type: 1,
			phone: 18700000000,
			bankcardnum: 622700000000000,
			bank_id: 1,
			cvn2: 134,
			date_valid: '0125',
			date_bill: '01',
			date_repay: '25',
		};
		$scope.bankIndex = '';
		$scope.banks = [
			{
				bank_id: "1",
				bank_name: "工商银行",
				bankcardnum: "622700000000010",
				cvn2: "134",
				date_bill: "20171101",
				date_repay: "20171125",
				date_valid: "0125",
				id: "10",
				idcard: "370202199011112111",
				phone: "18700000000",
				realname: "汉字二",
				status: "未处理",
				time_create: "1511923249",
				time_update: "0",
				type: "1",
				user_id: "1000000456"
			},
			{
				bank_id: "1",
				bank_name: "华夏银行",
				bankcardnum: "622700000000010",
				cvn2: "134",
				date_bill: "20171101",
				date_repay: "20171125",
				date_valid: "0125",
				id: "10",
				idcard: "370202199011112111",
				phone: "18700000000",
				realname: "汉字二",
				status: "未处理",
				time_create: "1511923249",
				time_update: "0",
				type: "2",
				user_id: "1000000456"
			},
			{
				bank_id: "1",
				bank_name: "浦发银行",
				bankcardnum: "622700000000010",
				cvn2: "134",
				date_bill: "20171101",
				date_repay: "20171125",
				date_valid: "0125",
				id: "10",
				idcard: "370202199011112111",
				phone: "18700000000",
				realname: "汉字二",
				status: "未处理",
				time_create: "1511923249",
				time_update: "0",
				type: "1",
				user_id: "1000000456"
			},
		];
		$scope.creditNew = {
			key: '',
			card_id: '',
			amount: 30000,
			amount_principal: 3000,
			mode: 1,
			date: '20171119,20171120',
			//date: '',
		};
		$scope.repay_latest = {
			repay:true
		};
		$scope.creditPrev = {
		};
		$scope.card_edit = {
		};
		$scope.$watch('token', function(newValue,oldValue, scope) {
			//console.log(newValue,oldValue);
			//console.log($scope.addCard.key);
			$scope.addCard.key =$scope.token;
			$scope.creditNew.key =$scope.token;
			$scope.card_edit.key =$scope.token;
		}, true);
		$scope.matchLogo = function(bankName){
			switch (bankName) {
				case '浦发银行': return "pufa";
				case '工商银行': return "gongshang";
				case '交通银行': return "jiaotong";
				case '中信银行': return "zhongxin";
				case '华夏银行': return "huaxia";
			}
		};
		$scope.ionicHistoryGoBack = function(){
			$ionicHistory.goBack();
		};
		$scope.al = function(titleStr){
			var alertPopup = $ionicPopup.alert({
				title: titleStr,
				//template: 'It might taste good'
				okText: '确定', // String (默认: 'OK')。OK按钮的文字。
				okType: 'button-default', // String (默认: 'button-positive')。OK按钮的类型。
			});
			alertPopup.then(function(res) {
				//console.log('Thank you for not eating my delicious ice cream cone');
			});
		};
		$scope.launchCard_edit = function(){
			console.log($scope.card_edit)
			$http({
				method: 'POST',
				url: $scope.api.card_edit,
				data: jsonToStr.transform($scope.card_edit),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.bank_list = response.data.data;
				console.log(response);
				$scope.al(response.data.msg);
				$scope.ionicHistoryGoBack();
				//if($scope.checkBackToLog(response.data.msg)){
				//	$scope.banks = response.data.data.list;
				//}
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.unbindCredit = function() {
			var confirmPopup = $ionicPopup.confirm({
				template: ' <div class="text-center"> <img style="width:60px;margin-bottom: 20px" src="img/img_tishi.png" alt=""/> <div style="margin-bottom: 20px" class="text_bold ">确定解绑银行卡？</div> <div style="margin-bottom: 20px;color: #0082ff; ">（确定后不可撤销）</div> </div>',
				okText: '确定', // String (默认: 'OK')。OK按钮的文字。
				okType: 'button-default', // String (默认: 'button-positive')。OK按钮的类型。
				cancelText: '取消', // String (默认: 'Cancel')。一个取消按钮的文字。
				cancelType: '' // String (默认: 'button-default')。取消按钮的类型。
			});
			confirmPopup.then(function(res) {
				if(res) {
					$http({
						method: 'POST',
						url: $scope.api.card_unbind,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.banks[$scope.$stateParams.index].id}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						//console.log(response.data.msg);
						$scope.al(response.data.msg);
						$state.go('credit');
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
					console.log('You are sure');
				} else {
					console.log('You are not sure');
				}
			});
		};
		$scope.launchCreditNew = function(){
			//console.log($scope.creditView);
			$state.go('creditBank',{})

			//$http({
			//	method: 'POST',
			//	url: $scope.api.creditNew,
			//	data: jsonToStr.transform({key:$scope.token,order_id:$scope.creditView.order_id}),//对提交的数据格式化
			//	headers: {
			//		'Accept': '*/*',
			//		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			//	}
			//}).then(function successCallback(response) {
			//	//$scope.bank_list = response.data.data;
			//	console.log(response);
			//	if(response.data.code == 1){
			//		$scope.al(response.data.msg);
			//		//$scope.creditView = response.data.msg;
			//		//console.log($scope.creditView)
			//		$state.go('creditBank',{})
			//	}else console.log(response);
			//		//if($scope.checkBackToLog(response.data.msg)){
			//	//	$scope.banks = response.data.data.list;
			//	//}
			//}, function errorCallback(response) {
			//	// 请求失败执行代码
			//});
		};
		$scope.launchCreditView = function(){
			$state.go('creditView')

			//$http({
			//	method: 'POST',
			//	url: $scope.api.creditView,
			//	data: jsonToStr.transform($scope.creditNew),//对提交的数据格式化
			//	headers: {
			//		'Accept': '*/*',
			//		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			//	}
			//}).then(function successCallback(response) {
			//	//$scope.bank_list = response.data.data;
			//
			//	if(response.data.code == 1){
			//		$scope.creditView = response.data.data;
			//		//console.log($scope.creditView)
			//		$state.go('creditView')
			//	}else console.log(response);
			//		//if($scope.checkBackToLog(response.data.msg)){
			//	//	$scope.banks = response.data.data.list;
			//	//}
			//}, function errorCallback(response) {
			//	// 请求失败执行代码
			//});
		};
			//日历
		$scope.dateSelected = [];
		$scope.dateSelectedRemove = function(removeDate){
			var tempList = $scope.creditNew.date.split(',');
			for(var i=0;i<tempList.length;i++){
				if(tempList[i]==removeDate){
					tempList.splice(i,1);
					$scope.creditNew.date=tempList.join(',');
					return
				}
			}
		};
		$scope.dateSelectedCheck = function(newDate){
			var tempList = $scope.creditNew.date.split(',');
			if(!$scope.creditNew.date){
				$scope.creditNew.date+=newDate;
				return
			}
			for(var i=0;i<tempList.length;i++){
				if(tempList[i]==newDate){
					tempList.splice(i,1);
					$scope.creditNew.date=tempList.join(',');
					return
				}
			}
			tempList.push(newDate);
			$scope.creditNew.date=tempList.join(',')
		};
		var currentDate = new Date();
		//var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 23);
		var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
		$scope.date = date;
		$scope.onezoneDatepicker = {
			date: date,
			mondayFirst: false,
			//months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
			months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
			//daysOfTheWeek: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"],
			daysOfTheWeek: ["S", "M", "T", "W", "T", "F", "S"],
			startDate: new Date(1989, 1, 26),
			endDate: new Date(2024, 1, 26),
			disablePastDays: true,
			disableSwipe: false,
			disableWeekend: false,
			//disableDates: [new Date(date.getFullYear(), date.getMonth(), 15), new Date(date.getFullYear(), date.getMonth(), 16), new Date(date.getFullYear(), date.getMonth(), 17)],
			showDatepicker: true,
			showTodayButton: false,
			calendarMode: true,//纯日历模式，取消确定取消等按钮
			hideCancelButton: false,
			//highlights : [
			//	{
			//		date: new Date(date.getFullYear(), date.getMonth(), 17),
			//		//date: 'Fri Nov 17 2017 00:00:00 GMT+0800 (中国标准时间)',
			//		color: '#c2e4ff',
			//		textColor: '#3391ff'
			//	}
			//],
			hideSetButton: false,
			callback: function(){
				$scope.dateSelectedCheck($filter('date')($scope.onezoneDatepicker.date,'yyyyMMdd'))
			}
		};
		$scope.showDatepicker = function () {
			$scope.onezoneDatepicker.showDatepicker = !$scope.onezoneDatepicker.showDatepicker;
		};
		//日历
		$scope.aboutMode = function(){
			$scope.al('<div class="text_bold">消费模式<br/><br/> 1-1：还款一次 固定消费一次<br/>1-2：还款一次 随机消费一到二次<br/>1-3：还款一次 随机消费一到三次</div>')
		};
		$scope.switchMode = function(mode){
			$scope.creditNew.mode = mode;
		};
		$rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
			//console.log(toState.name);
			switch (toState.name) {
				case 'creditEdit':
				case 'cardManage':
				case 'creditPrev':
				case 'creditNew':
					//console.log('creditNew');
				//break;
				case 'creditBank':
					//console.log('creditBank');
					($scope.bankIndex = $scope.$stateParams.index);
					//console.log($scope.bankIndex);
				//break;
				case 'credit':
					//console.log($state);
					$http({
						method: 'POST',
						url: $scope.api.credit,
						data: jsonToStr.transform({key:$scope.token}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						//console.log(response)
						if(true){
							//$scope.banks = response.data.data.list;
							//console.log($scope.banks);
							if($scope.banks[$scope.bankIndex]){
								//$scope.card_edit = $scope.banks[$scope.bankIndex];
								$scope.card_edit.card_id = $scope.banks[$scope.bankIndex].id;
								$scope.card_edit.type = $scope.banks[$scope.bankIndex].type;
								$scope.card_edit.phone = $scope.banks[$scope.bankIndex].phone;
								$scope.card_edit.bankcardnum = $scope.banks[$scope.bankIndex].bankcardnum;
								$scope.card_edit.bank_id = $scope.banks[$scope.bankIndex].bank_id;
								$scope.card_edit.cvn2 = $scope.banks[$scope.bankIndex].cvn2;
								$scope.card_edit.date_valid = $scope.banks[$scope.bankIndex].date_valid;
								$scope.card_edit.date_bill = $scope.banks[$scope.bankIndex].date_bill;
								$scope.card_edit.date_repay = $scope.banks[$scope.bankIndex].date_repay;
								//console.log($scope.card_edit)
								$http({
									method: 'POST',
									url: $scope.api.bank_list,
								}).then(function successCallback(response) {
									//console.log(response)
									$scope.bank_list = response.data.data;
									//console.log($scope.bank_list)
								}, function errorCallback(response) {
									// 请求失败执行代码
								});
								$http({
									method: 'POST',
									url: $scope.api.creditPrev,
									data: jsonToStr.transform({key:$scope.token,card_id:$scope.banks[$scope.bankIndex].id}),//对提交的数据格式化
									headers: {
										'Accept': '*/*',
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
								}).then(function successCallback(response) {
									//$scope.bank_list = response.data.data;
									$scope.creditPrev = response.data.data;
									//console.log($scope.creditPrev)
								}, function errorCallback(response) {
									// 请求失败执行代码
								});
								$http({
									method: 'POST',
									url: 'http://www.aiyongka.cn/mobile/index.php/repay/repay_latest',
									data: jsonToStr.transform({key:$scope.token,card_id:$scope.banks[$scope.bankIndex].id}),//对提交的数据格式化
									headers: {
										'Accept': '*/*',
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
								}).then(function successCallback(response) {
									//$scope.bank_list = response.data.data;
									//console.log(response)
									//console.log($scope.repay_latest)
									$scope.repay_latest = response.data.data
									//console.log($scope.repay_latest)
									//if($scope.checkBackToLog(response.data.msg)){
									//	$scope.banks = response.data.data.list;
									//}
								}, function errorCallback(response) {
									// 请求失败执行代码
									console.log(response)
								});
							}
						}
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
				//break;
			}
		});
		$rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
			//console.log(toState.name);
			//console.log($scope.banks);
			//console.log($scope.bankIndex);
			switch (toState.name) {
				case 'addCard':
					console.log('addCard');
				case 'idCer':
					console.log('idCer');
					$http({
						method: 'POST',
						url: $scope.api.bank_list,
					}).then(function successCallback(response) {
						$scope.bank_list = response.data.data;
						//console.log($scope.bank_list)
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
					$http({
						method: 'POST',
						url: $scope.api.get_area,
						data: jsonToStr.transform({key:$scope.token}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						console.log(response);
						if(response.data.msg.indexOf("请登录")+1){
							return
						}
						$scope.get_area = response.data.data.list;
						$scope.$watch('idCer.bank_province_id', function(newValue,oldValue, scope) {
							//console.log(newValue,oldValue);
							$http({
								method: 'POST',
								url: $scope.api.get_area,
								data: jsonToStr.transform({key:$scope.token,parent_id:$scope.idCer.bank_province_id}),//对提交的数据格式化
								headers: {
									'Accept': '*/*',
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then(function successCallback(response) {
								$scope.get_areaCity = response.data.data.list;
								//console.log($scope.get_areaCity)
							}, function errorCallback(response) {
								// 请求失败执行代码
							});
						}, true);
						$scope.$watch('idCer.bank_city_id', function(newValue,oldValue, scope) {
							//console.log(newValue,oldValue);
							$http({
								method: 'POST',
								url: $scope.api.get_area,
								data: jsonToStr.transform({key:$scope.token,parent_id:$scope.idCer.bank_city_id}),//对提交的数据格式化
								headers: {
									'Accept': '*/*',
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then(function successCallback(response) {
								$scope.get_areaArea = response.data.data.list;
								//console.log($scope.get_areaArea)
							}, function errorCallback(response) {
								// 请求失败执行代码
							});
						}, true);
						//console.log($scope.get_area)
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
					break;
			}
		});
		$scope.launchAddCard = function(){
			$http({
				method: 'POST',
				url: $scope.api.addCard,
				data: jsonToStr.transform($scope.addCard),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.get_areaCity = response.data.data.list;
				//console.log($scope.get_areaCity)
				console.log(response.data)
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.changePswVerify = function(){
			$scope.verifyPsw.phone =  $scope.changePsw.phone;
			for(x in $scope.verifyPsw){
				if($scope.verifyPsw[x]){
					console.log($scope.verifyPsw,'yes')
				}else{
					console.log($scope.verifyPsw,'noooo');
					return
				}
			}
			$http({
				method: 'POST',
				url: $scope.api.verify,
				data: jsonToStr.transform($scope.verifyPsw),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.names = response.data.sites;
				console.log(response.data)
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.launchChangePsw = function(){
			console.log($scope)
			$http({
				method: 'POST',
				url: $scope.api.changePsw,
				data: jsonToStr.transform($scope.changePsw),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.names = response.data.sites;
				console.log(response.data)
				//alert(response.data.msg)
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.launchIdCer = function(){
			for(x in $scope.img){
				if($scope.img[x].data){
					$scope.idCer[x] = $scope.img[x].data.file_name;
				}
			}
			console.log($scope)
			$http({
				method: 'POST',
				url: $scope.api.idCer,
				data: jsonToStr.transform($scope.idCer),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.names = response.data.sites;
				console.log(response.data);
				$scope.checkBackToLog(response.data.msg);
				//alert(response.data.msg)
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.fillRequired = '';
		$scope.launchLogin = function(){
			for(x in $scope.login){
				//console.log($scope.login[x]?1:0)
				if(!$scope.login[x]){
					//console.log('nooo',x);
					$scope.fillRequired = 'fillRequired';
					return
				}
			}
			//ipCookie.remove('token');
			if(ipCookie('token')){
				$scope.al('已存在用户：'+ipCookie('token'));
				$scope.token = ipCookie('token');
				return
			}
			$http({
				method: 'POST',
				url: $scope.api.login,
				data: jsonToStr.transform($scope.login),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.names = response.data.sites;
				//console.log(response.data);
				if(response.data.data){
					//$scope.al(response.data.data.token);
					$scope.token = response.data.data.token;
					ipCookie('token', $scope.token);
					$scope.ionicHistoryGoBack();
				}else{
					$scope.al(response.data.msg);
				}
					$scope.fillRequired = '';
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.regVerify = function(){
			$scope.verify.phone =  $scope.reg.phone;
			for(x in $scope.verify){
				if($scope.verify[x]){
					console.log($scope.verify,'yes')
				}else{
					console.log($scope.verify,'noooo');
					return
				}
			}
			$http({
				method: 'POST',
				url: $scope.api.verify,
				data: jsonToStr.transform($scope.verify),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.names = response.data.sites;
				console.log(response.data)
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.launchReg = function(){
			$http({
				method: 'POST',
				url: $scope.api.reg,
				data: jsonToStr.transform($scope.reg),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.names = response.data.sites;
				console.log(response.data)
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
	});
