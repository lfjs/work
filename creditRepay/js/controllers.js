angular.module("controllers", [])
	.controller('MyCtrl', function($ionicModal,$window,$timeout,$ionicNavBarDelegate,$scope,$stateParams, $ionicPopup ,$state,$http,jsonToStr,ipCookie,$filter,$rootScope,$ionicHistory) {
		$scope.$stateParams = $stateParams;
		$scope.checkBackToLog = function(msg){
			if(msg.indexOf("请登录")+1){
				$state.go('login');
				console.log('通过checkBackToLog跳转');
				return false
			}else return true
		};
		$scope.promotionBarChartsData = [
			{value:55, name:''},{value:56,name:''} //Berlin
		];
		$scope.ifApp = true;
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/aiyongka/i) == 'aiyongka'){
			$scope.ifApp = false;
		}else{
			$scope.ifApp = true;
		}
		$scope.creditBank =
			ipCookie('creditBank')||
			{};
		$scope.ls = function() {
			//console.log($scope)
			//console.log($stateParams)
		};
		$scope.ls();
		$scope.api = {
			login : 'json/login.json',//
			bank_list : 'json/bank_list.json',//
			get_area : 'json/get_area.json',//
			credit : 'json/credit.json',//
			creditPrev : 'json/repay_list.json',//
			userInfo : 'json/userInfo.json',//
			repay_latest7 : 'json/repay_latest7.json',//
			repay_latest10 : 'json/repay_latest10.json',//
			repay_latest26 : 'json/repay_latest26.json',//
			card_detail : 'json/card_detail.json',//
			count_recommended : 'json/count_recommended.json',//
			recommended_list : 'json/recommended_list.json',//
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
			phone : '',
			password : ''
		};
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
			merchant_name: '',
			realname: '',
			idcard: '',
			bankcardnum: '',
			bankcardnum_confirm: '',
			bank_id: '',
			bank_branch: '',
			bank_province_id: '',
			bank_city_id: '',
			bank_area_id: '',
			bank_address: '',
			address: '',
			idcard_f: '',
			idcard_b: '',
			bankcard_f: '',
			bankcard_b: '',
			idcard_hand: '',
			cnaps_code: '',
		};
		$scope.changePsw = {
			phone:'',
			verify_code:'',
			password:'',
			password_confirm:'',
		};
		$scope.verifyPsw = {
			phone : $scope.changePsw.phone,
			type : 'reset'
		};
		$scope.get_areaName = '';
		$scope.get_areaCityName = '';
		$scope.get_areaAreaName = '';
		$scope.bank_addressName = '';
		$scope.billDate = [];
		for(var i=1;i<29;i++){
			var temp = '00000'+i;
			temp = temp.match(/..$/)[0];
			$scope.billDate.push(temp)
		}
		// check for ios device
		nP = navigator.platform;
		if (nP == "iPad" || nP == "iPhone" || nP == "iPod" || nP == "iPhone Simulator" || nP == "iPad Simulator"){
			$scope.cardKind = [];
		}else{
			$scope.cardKind = [{id:1,name:'借记卡'}, {id:2,name:'信用卡'}];
		}
		$scope.addCard = {
			key: '',
			type: 2,
			phone: '',
			bankcardnum: '',
			bank_id: '',
			cvn2: '',
			date_valid: '',
			date_bill: '',
			date_repay: '',
		};
		$scope.bankIndex = '';
		$scope.banks = [
		];
		$scope.creditNew = {
			key: '',
			card_id: '',
			amount: '',
			amount_principal: '',
			mode: 1,
			date: '',
		};
		$scope.repay_latest = {
			repay:true
		};
		$scope.creditPrev = {
		};
		$scope.card_edit = {
			type:2
		};
		$scope.$watch('token', function(newValue,oldValue, scope) {
			$scope.addCard.key =$scope.token;
			$scope.creditNew.key =$scope.token;
			$scope.card_edit.key =$scope.token;
		}, true);
		$scope.matchLogo = function(bankName){
			switch (bankName) {
				//case '浦发银行': return "pufa";
				//case '工商银行': return "gongshang";
				//case '交通银行': return "jiaotong";
				//case '中信银行': return "zhongxin";
				//case '华夏银行': return "huaxia";
			}
		};
		$scope.ionicHistoryGoBack = function(){
			//$ionicHistory.goBack();
			window.history.back();
		};
		$scope.al = function(titleStr){
			var alertPopup = $ionicPopup.alert({
				title: '<div class="text_bold">'+titleStr+'</div>',
				okText: '确定', // String (默认: 'OK')。OK按钮的文字。
				okType: 'button-default', // String (默认: 'button-positive')。OK按钮的类型。
			});
			alertPopup.then(function(res) {
			});
		};
		$scope.launchCard_edit = function(){
			console.log($scope.card_edit)
			$http({
				method: 'GET',
				url: $scope.api.card_edit,
				data: jsonToStr.transform($scope.card_edit),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response);
				$scope.al(response.data.msg);
				if(response.data.code){
					$scope.ionicHistoryGoBack();
				}
			}, function errorCallback(response) {
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
						method: 'GET',
						url: $scope.api.card_unbind,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.banks[$scope.$stateParams.index].id}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$scope.al(response.data.msg);
						$scope.ionicHistoryGoBack();
					}, function errorCallback(response) {
					});
					console.log('You are sure');
				} else {
					console.log('You are not sure');
				}
			});
		};
		$scope.launchCreditNew = function(){
			$state.go('creditBank',{cardId:$stateParams.cardId})
			var repay_add_confirm = [
				$scope.api.creditNew,
				jsonToStr.transform({key:$scope.token,order_id:$scope.creditView.order_id})
			];
			var repay_edit_confirm = [
				'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_edit_confirm',
				jsonToStr.transform({
					key:$scope.token,
					order_id:$scope.creditView.order_id,
					repay_id:$scope.creditNew.typeFlag
				})
			];
			var editFlag = repay_add_confirm;
			if($scope.creditNew.typeFlag){
				editFlag = repay_edit_confirm;
			}
			console.log('选择提交：',editFlag);
			$http({
				method: 'GET',
				url: '',
				data: editFlag[1],//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response);
				if(response.data.code == 1){
					$scope.al(response.data.msg);
					$state.go('creditBank',{cardId:$stateParams.cardId})
				}else console.log(response);
			}, function errorCallback(response) {
			});
		};
		$scope.launchCreditView = function(){
			$state.go('creditView',{cardId:$stateParams.cardId})
			$scope.creditNew.key = $scope.token;
			$http({
				method: 'GET',
				url: $scope.api.creditView,
				data: jsonToStr.transform($scope.creditNew),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				if(response.data.code == 1){
					$scope.creditView = response.data.data;
					console.log($scope.creditView,44444444444)
					$state.go('creditView',{cardId:$stateParams.cardId})
				}else {
					console.log(response.data);
					$scope.al(response.data.msg)
				};
			}, function errorCallback(response) {
			});
		};
		$scope.aboutMode = function(){
			$scope.al('<div>消费模式<br/><br/> 1-1：还款一次 固定消费一次<br/>1-2：还款一次 随机消费一到二次<br/>1-3：还款一次 随机消费一到三次</div>')
		};
		$scope.switchMode = function(mode){
			$scope.creditNew.mode = mode;
		};
		$scope.backToNew = function(){
			$http({
				method: 'GET',
				url: '',
				data: jsonToStr.transform({key:$scope.token,order_id:''}),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response.data);
			}, function errorCallback(response) {
			});
			$state.go('creditNew',{cardId:$stateParams.cardId});
		};
		$scope.oneShare = function(){
			$scope.modal ={};
			$ionicModal.fromTemplateUrl('modal.html', {
				scope: $scope
			}).then(function(modal) {
				$scope.modal = modal;
				var ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) != 'micromessenger'){
					console.log('微信分享提示遮罩，启动！');
					$scope.modal.show();
				}else{
					$scope.modal.show();
				}
			})
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
		$rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
			if($scope.token || $scope.stateName == 'login'){

			}else{
				console.log('没有token页面：'+$scope.stateName);
				$scope.checkBackToLog('请登录')
			}
			//$scope.token?void(0):$scope.checkBackToLog('请登录');
			switch (toState.name) {
				case 'creditView':
					$http({
						method: 'GET',
						url: 'json/repay_add.json',
						data: jsonToStr.transform({key:$scope.token,grade_id:$stateParams.grade_id}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$scope.creditView = response.data.data;
						console.log($scope.creditView)
					}, function errorCallback(response) {
					});
					break;
				case 'promotionDetail':
					$http({
						method: 'GET',
						url: $scope.api.recommended_list,
						data: jsonToStr.transform({key:$scope.token,grade_id:$stateParams.grade_id}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$scope.promotionDetail = response.data.data;
						console.log($scope.promotionDetail)
					}, function errorCallback(response) {
					});
					break;
				case 'creditPrev':
					$http({
						method: 'GET',
						url: $scope.api.card_detail,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$scope.creditBankPrev = response.data.data;
						console.log($scope.creditBankPrev)
					}, function errorCallback(response) {
					});
					$http({
						method: 'GET',
						url: $scope.api.creditPrev,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$scope.creditPrev = response.data.data;
						console.log($scope.creditPrev)
					}, function errorCallback(response) {
					});
					break;
				case 'creditBank':
					$scope.creditNew = {};
					$scope.creditNew.mode = 1;
					$scope.creditNew.date = '';
					console.log('检测到creditNew重置creditNew！');
					console.log('creditBank');
					console.log($scope.$stateParams);
					var latestApiTemp = '';
					switch ($scope.$stateParams.cardId) {
						case '7':
							latestApiTemp = $scope.api.repay_latest7;
							break;
						case '10':
							latestApiTemp = $scope.api.repay_latest10;
							break;
						case '26':
							latestApiTemp = $scope.api.repay_latest26;
							break;
					}
					$http({
						method: 'GET',
						url: latestApiTemp,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$scope.creditBank =response.data.data;
						console.log($scope.creditBank);
						ipCookie('creditBank', $scope.creditBank);
					}, function errorCallback(response) {
					});
				break;
				case 'creditNew':
					($scope.bankIndex = $scope.$stateParams.index);
					if($scope.creditNew.typeFlag){
						$scope.creditNew = {};
						$scope.creditNew.mode = 1;
						$scope.creditNew.date = '';
						console.log('检测到typeFlag重置creditNew！');
					}
					if(ipCookie('creditNew')){
						$scope.creditNew = ipCookie('creditNew')
						console.log('已调用creditNew并删除！2000');
						ipCookie.remove('creditNew');
					}
					console.log($scope.creditNew);
					$http({
						method: 'GET',
						url: $scope.api.card_detail,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$scope.card_detail =response.data.data;
						$scope.dateDisable = $scope.card_detail?[($scope.card_detail.date_repay)]:[];
						for(var i=0;i<$scope.dateDisable.length;i++){
							var dateStrTemp = $scope.dateDisable[i].match(/\d\d/g);
							if ($scope.dateDisable[i] != null) {
								var dateFormatted = new Date(dateStrTemp[0].toString()+dateStrTemp[1].toString(), (dateStrTemp[2]-1).toString(), dateStrTemp[3].toString());
								$scope.dateDisable[i] =
									dateFormatted;
								}
						}
						$scope.dateDisable.push(new Date(date.getFullYear(), date.getMonth(), 27));
					}, function errorCallback(response) {
					});
					//日历
					var currentDate = new Date();
					var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
					$scope.card_detail = '';
					$scope.dateToHighlights = $scope.creditNew.date?$scope.creditNew.date.split(','):[];
					for(var i=0;i<$scope.dateToHighlights.length;i++){
						var dateStrTemp = $scope.dateToHighlights[i].match(/\d\d/g);
						if ($scope.dateToHighlights[i] != null) {
							var dateFormatted = new Date(dateStrTemp[0].toString()+dateStrTemp[1].toString(), (dateStrTemp[2]-1).toString(), dateStrTemp[3].toString());
							$scope.dateToHighlights[i] =
							{
								date: dateFormatted,
								//date: 'Fri Nov 17 2017 00:00:00 GMT+0800 (中国标准时间)',
								color: '#c2e4ff',
								textColor: '#3391ff'
							}
						}
					}
					$scope.date = date;
					var dateRepayTemp = $scope.creditBank.card.date_repay.match(/\d\d/g);
					dateRepayTemp = new Date(currentDate.getFullYear(), currentDate.getMonth(), (dateRepayTemp[3]-1).toString());
					$scope.dateSelectedCheck = function(dateYMD,dateOriginal){
						var tempList = $scope.creditNew.date.split(',');
						if(!$scope.creditNew.date){
							$scope.creditNew.date+=dateYMD;
							$scope.onezoneDatepicker.highlights = [];
							$scope.onezoneDatepicker.highlights.push(
								{
									date: dateOriginal,
									color: '#c2e4ff',
									textColor: '#3391ff'
								}
							);
							return
						}
						for(var i=0;i<tempList.length;i++){
							if(tempList[i]==dateYMD){
								tempList.splice(i,1);
								$scope.creditNew.date=tempList.join(',');
								for(var j=0;j<$scope.onezoneDatepicker.highlights.length;j++){
									if($scope.onezoneDatepicker.highlights[j].date.toString()==dateOriginal.toString()){
										//console.log('已存在高亮！');
										$scope.onezoneDatepicker.highlights.splice(j,1);
										break
									}
								}
								return
							}
						}
						tempList.push(dateYMD);
						$scope.onezoneDatepicker.highlights.push(
							{
								date: dateOriginal,
								color: '#c2e4ff',
								textColor: '#3391ff'
							}
						);
						$scope.creditNew.date=tempList.join(',')
					};
					$scope.onezoneDatepicker = {
						date: date,
						mondayFirst: false,
						months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
						daysOfTheWeek: ["S", "M", "T", "W", "T", "F", "S"],
						startDate: new Date(1989, 1, 26),
						//endDate: new Date(2017, 11, 25),
						endDate: dateRepayTemp,
						disablePastDays: true,
						disableSwipe: false,
						disableWeekend: false,
						//disableDates: $scope.dateDisable,
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
						highlights : $scope.dateToHighlights,
						hideSetButton: false,
						callback: function(date){
							$scope.dateSelectedCheck($filter('date')($scope.onezoneDatepicker.date,'yyyyMMdd'),date);
						}
					};
					$scope.showDatepicker = function () {
						$scope.onezoneDatepicker.showDatepicker = !$scope.onezoneDatepicker.showDatepicker;
					};
					//日历
				break;
				case 'creditEdit':
					$http({
						method: 'GET',
						url: $scope.api.card_detail,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$http({
							method: 'GET',
							url: $scope.api.bank_list,
						}).then(function successCallback(response) {
							$scope.bank_list = response.data.data;
						}, function errorCallback(response) {
						});
						$scope.card_detail =response.data.data;
						$scope.card_edit.card_id = $scope.card_detail.id;
						$scope.card_edit.phone = $scope.card_detail.phone;
						$scope.card_edit.bankcardnum = $scope.card_detail.bankcardnum;
						$scope.card_edit.bank_id = $scope.card_detail.bank_id;
						$scope.card_edit.cvn2 = $scope.card_detail.cvn2;
						$scope.card_edit.date_valid = $scope.card_detail.date_valid;
						$scope.card_edit.date_bill = ($filter('last2')($scope.card_detail.date_bill));
						$scope.card_edit.date_repay = ($filter('last2')($scope.card_detail.date_repay));
						console.log($scope.card_detail)
					}, function errorCallback(response) {
					});
					break;
				case 'cardManage':
				case 'main.credit':
					//———————————————白底logo—————————————————
					$http({
						method: 'GET',
						url: $scope.api.credit,
						data: jsonToStr.transform({key:$scope.token,type:2}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						console.log(response.data);
						if(response.data.code==1){
							$scope.banksWhite = response.data.data.list;
						}
					}, function errorCallback(response) {
					});
					//———————————————白底logo—————————————————
					$http({
						method: 'GET',
						url: $scope.api.credit,
						data: jsonToStr.transform({key:$scope.token}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						if($scope.checkBackToLog(response.data.msg)){
							$scope.banks = response.data.data.list;
							if($scope.banks[$scope.bankIndex]){
								$scope.card_edit.card_id = $scope.banks[$scope.bankIndex].id;
								$scope.card_edit.type = $scope.banks[$scope.bankIndex].type;
								$scope.card_edit.phone = $scope.banks[$scope.bankIndex].phone;
								$scope.card_edit.bankcardnum = $scope.banks[$scope.bankIndex].bankcardnum;
								$scope.card_edit.bank_id = $scope.banks[$scope.bankIndex].bank_id;
								$scope.card_edit.cvn2 = $scope.banks[$scope.bankIndex].cvn2;
								$scope.card_edit.date_valid = $scope.banks[$scope.bankIndex].date_valid;
								$scope.card_edit.date_bill = $scope.banks[$scope.bankIndex].date_bill;
								$scope.card_edit.date_repay = $scope.banks[$scope.bankIndex].date_repay;
								$http({
									method: 'GET',
									url: $scope.api.bank_list,
								}).then(function successCallback(response) {
									$scope.bank_list = response.data.data;
								}, function errorCallback(response) {
								});
								$http({
									method: 'GET',
									url: $scope.api.creditPrev,
									data: jsonToStr.transform({key:$scope.token,card_id:$scope.banks[$scope.bankIndex].id}),//对提交的数据格式化
									headers: {
										'Accept': '*/*',
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
								}).then(function successCallback(response) {
									$scope.creditPrev = response.data.data;
								}, function errorCallback(response) {
								});
								$http({
									method: 'GET',
									url: $scope.api.repay_latest,
									data: jsonToStr.transform({key:$scope.token,card_id:$scope.banks[$scope.bankIndex].id}),//对提交的数据格式化
									headers: {
										'Accept': '*/*',
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
								}).then(function successCallback(response) {
									$scope.repay_latest = response.data.data
								}, function errorCallback(response) {
									console.log(response)
								});
							}
						}
					}, function errorCallback(response) {
					});
			}
		});
		$rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
			console.log(toState.name);
			($ionicNavBarDelegate.showBar(false));
			$scope.stateName = $state.current.name;
			$scope.regVerifyFillRequired = '';
			$scope.fillRequired = '';
			switch (toState.name) {
				case 'promotionCenter':
					$http({
						method: 'GET',
						url: $scope.api.count_recommended,
						data: jsonToStr.transform({key:$scope.token}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$scope.count_recommended = response.data.data;
						console.log($scope.count_recommended);
						$scope.promotionBarChartsData = [
							{value:$scope.count_recommended.active, name:''},
							{value:$scope.count_recommended.total,name:''} //Berlin
						];
					}, function errorCallback(response) {
					});
					break;
				case 'reg':
					if((window.location.href.match(/refer_phone.*($|\&)/))){
						$scope.reg.refer_phone = (window.location.href.match(/refer_phone.*?($|\&)/)[0].match(/\d+/))?(window.location.href.match(/refer_phone.*?($|\&)/)[0].match(/\d+/)):'';
					}
				break;
				case 'main.promotion':
				case 'main.my':
					$scope.checkIdCer = function(){
						if($scope.my.status_verify > 2){
							$scope.al('实名认证已通过！请勿重复操作！')
							$state.go('idCer')
						}else{
							$state.go('idCer')
						}
					};
					$http({
						method: 'GET',
						url: $scope.api.userInfo,
						data: jsonToStr.transform({key:$scope.token}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						console.log(response.data);
						$scope.my = response.data.data;
					}, function errorCallback(response) {
					});
				break;
				case 'addCard':
					console.log('addCard');
					$http({
						method: 'GET',
						url: $scope.api.userInfo,
						data: jsonToStr.transform({key:$scope.token}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						$scope.my = response.data.data;
						console.log($scope.my)
					}, function errorCallback(response) {
					});
				case 'idCer':
					console.log('idCer');
					$http({
						method: 'GET',
						url: $scope.api.bank_list,
					}).then(function successCallback(response) {
						$scope.bank_list = response.data.data;
					}, function errorCallback(response) {
					});
					$http({
						method: 'GET',
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
							$http({
								method: 'GET',
								url: $scope.api.get_area,
								data: jsonToStr.transform({key:$scope.token,parent_id:$scope.idCer.bank_province_id}),//对提交的数据格式化
								headers: {
									'Accept': '*/*',
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then(function successCallback(response) {
								$scope.get_areaCity = response.data.data.list;
							}, function errorCallback(response) {
							});
						}, true);
						$scope.$watch('idCer.bank_city_id', function(newValue,oldValue, scope) {
							$http({
								method: 'GET',
								url: $scope.api.get_area,
								data: jsonToStr.transform({key:$scope.token,parent_id:$scope.idCer.bank_city_id}),//对提交的数据格式化
								headers: {
									'Accept': '*/*',
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then(function successCallback(response) {
								$scope.get_areaArea = response.data.data.list;
							}, function errorCallback(response) {
							});
						}, true);
					}, function errorCallback(response) {
					});
					break;
			}
		});
		$scope.launchAddCard = function(){
			$http({
				method: 'GET',
				url: $scope.api.addCard,
				data: jsonToStr.transform($scope.addCard),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.al(response.data.msg)
				if(response.data.code){
					$scope.ionicHistoryGoBack();
				}
			}, function errorCallback(response) {
			});
		};
		$scope.changePswVerify = function(){
			$scope.verifyPsw.phone =  $scope.changePsw.phone;
			for(x in $scope.verifyPsw){
				if($scope.verifyPsw[x]){
				}else{
					$scope.regVerifyFillRequired = 'fillRequired';
					return
				}
			}
			$http({
				method: 'GET',
				url: $scope.api.verify,
				data: jsonToStr.transform($scope.verifyPsw),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.al(response.data.msg);
				if(response.data.code){
					$scope.verifySta = 60;
					$scope.verifyStaDisabled = true;
					var verifyCount = function(){
						if($scope.verifySta==0||!$scope.verifySta){
							$scope.verifySta = '再次发送';
							$scope.verifyStaDisabled = false;
							return
						}
						$timeout(function(){
							$scope.verifySta--;
							verifyCount();
						},1000);
					};
					verifyCount();
				}
			}, function errorCallback(response) {
			});
		};
		$scope.launchChangePsw = function(){
			for(x in $scope.changePsw){
				if(!$scope.changePsw[x] && x != 'refer_phone'){
					console.log('缺少字段：',x);
					$scope.fillRequired = 'fillRequired';
					return
				}
			}
			$http({
				method: 'GET',
				url: $scope.api.changePsw,
				data: jsonToStr.transform($scope.changePsw),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.al(response.data.msg);
				if(response.data.code){
					$scope.ionicHistoryGoBack();
				}
			}, function errorCallback(response) {
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
				method: 'GET',
				url: $scope.api.idCer,
				data: jsonToStr.transform($scope.idCer),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.checkBackToLog(response.data.msg);
			}, function errorCallback(response) {
			});
		};
		$scope.fillRequired = '';
		$scope.launchLogin = function(){
			for(x in $scope.login){
				if(!$scope.login[x]){
					$scope.fillRequired = 'fillRequired';
				}
			}
			$http({
				method: 'GET',
				url: $scope.api.login,
				data: jsonToStr.transform($scope.login),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response);
				if(response.data.data){
					$scope.token = response.data.data.token;
					ipCookie('token', $scope.token);
					$state.go('main.credit')
				}else{
					$scope.al(response.data.msg);
				}
					$scope.fillRequired = '';
			}, function errorCallback(response) {
			});
		};
		$scope.regVerify = function(){
			$scope.verify.phone =  $scope.reg.phone;
			for(x in $scope.verify){
				if($scope.verify[x]){
				}else{
					$scope.regVerifyFillRequired = 'fillRequired';
					return
				}
			}
			$http({
				method: 'GET',
				url: $scope.api.verify,
				data: jsonToStr.transform($scope.verify),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response.data)
				$scope.al(response.data.msg);
				if(response.data.code){
					$scope.verifySta = 60;
					$scope.verifyStaDisabled = true;
					var verifyCount = function(){
						if($scope.verifySta==0||!$scope.verifySta){
							$scope.verifySta = '再次发送';
							$scope.verifyStaDisabled = false;
							return
						}
						$timeout(function(){
							$scope.verifySta--;
							verifyCount();
						},1000);
					};
					verifyCount();
				}
			}, function errorCallback(response) {
			});
		};
		$scope.launchReg = function(){
			for(x in $scope.reg){
				if(!$scope.reg[x] && x != 'refer_phone'){
					console.log('缺少字段：',x);
					$scope.fillRequired = 'fillRequired';
					return
				}
			}
			$http({
				method: 'GET',
				url: $scope.api.reg,
				data: jsonToStr.transform($scope.reg),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				console.log(response.data)
				$scope.al(response.data.msg);
				if(response.data.code){
					$state.go('login')
				}
				$scope.fillRequired = '';
			}, function errorCallback(response) {
			});
		};
	});
