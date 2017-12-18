angular.module("controllers", [])
	.controller('MyCtrl', function($ionicModal,$window,$timeout,$ionicNavBarDelegate,$scope,$stateParams, $ionicPopup ,$state,$http,jsonToStr,ipCookie,$filter,$rootScope,$ionicHistory) {
		$scope.$stateParams = $stateParams;
		$scope.checkBackToLog = function(msg){
			//if(response.data.msg.indexOf("请登录")+1) $state.go('login');
			if(msg.indexOf("请登录")+1){
				$state.go('login');
				return false
			}else return true
		};
		$scope.promotionBarChartsData = [
			{value:55, name:''},{value:56,name:''} //Berlin
		];

		$scope.ifApp = true;

		var ua = window.navigator.userAgent.toLowerCase();
		//alert(ua);
		//$scope.ua = ua;
		if(ua.match(/aiyongka/i) == 'aiyongka'){
			$scope.ifApp = false;
		}else{
			$scope.ifApp = true;
		}
		$scope.creditBank =
			ipCookie('creditBank')||
			{};
		$scope.ls = function() {
			console.log($scope)
			console.log($stateParams)
		};
		$scope.ls();
		$scope.api = {
			reg : 'http://47.96.128.18/aiyongka/mobile/index.php/site/register',//注册
			verify : 'http://47.96.128.18/aiyongka/mobile/index.php/site/sendMsg',//验证码
			login : 'json/login.json',//登录
			idCer : 'http://47.96.128.18/aiyongka/mobile/index.php/user/verify',//实名认证
			changePsw : 'http://47.96.128.18/aiyongka/mobile/index.php/site/password_reset',//实名认证
			bank_list : 'json/bank_list.json',//登录

			//bank_list : 'http://47.96.128.18/aiyongka/mobile/index.php/site/bank_list',//
			get_area : 'json/get_area.json',//登录

			//get_area : 'http://47.96.128.18/aiyongka/mobile/index.php/user/get_area',//
			addCard : 'http://47.96.128.18/aiyongka/mobile/index.php/repay/card_add',//
			credit : 'json/credit.json',//登录
			creditView : 'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_add',//
			creditNew : 'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_add_confirm',//
			creditPrev : 'json/repay_list.json',//登录

			//creditPrev : 'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_list',//
			card_unbind : 'http://47.96.128.18/aiyongka/mobile/index.php/repay/card_unbind',//
			card_edit : 'http://47.96.128.18/aiyongka/mobile/index.php/repay/card_edit',//
			//userInfo : 'http://47.96.128.18/aiyongka/mobile/index.php/user/userinfo',//
			userInfo : 'json/userInfo.json',//登录
			repay_latest7 : 'json/repay_latest7.json',//
			repay_latest10 : 'json/repay_latest10.json',//
			repay_latest26 : 'json/repay_latest26.json',//
			card_detail : 'json/card_detail.json',//
			//url: 'http://47.96.128.18/aiyongka/mobile/index.php/repay/card_detail',

			count_recommended : 'json/count_recommended.json',//
			//url: 'http://47.96.128.18/aiyongka/mobile/index.php/user/count_recommended',
			recommended_list : 'json/recommended_list.json',//

			//url: 'http://47.96.128.18/aiyongka/mobile/index.php/user/recommended_list',


			//repay_latest : 'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_latest',//
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
			//$scope.cardKind = [{id:1,name:'借记卡'}, {id:2,name:'信用卡'}];
			$scope.cardKind = [];
		}else{
			//$scope.cardKind = [];
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
			//{name:'浦发银行',id:110110110,plan:false},
		];
		//$scope.creditNew = ipCookie('creditNew')||{
		$scope.creditNew = {
			key: '',
			card_id: '',
			amount: '',
			amount_principal: '',
			mode: 1,
			date: '',
			//date: '',
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
			//console.log(newValue,oldValue);
			//console.log($scope.addCard.key);
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
			//console.log(
			//	$window.location
			//)
		};
		$scope.al = function(titleStr){
			var alertPopup = $ionicPopup.alert({
				title: '<div class="text_bold">'+titleStr+'</div>',
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
				if(response.data.code){
					$scope.ionicHistoryGoBack();
				}
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
						//$state.go('credit');
						$scope.ionicHistoryGoBack();
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
			$state.go('creditBank',{cardId:$stateParams.cardId})

			//console.log($scope.creditView);
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
			//return
			$http({
				method: 'POST',
				//url: editFlag[0],
				url: '',
				data: editFlag[1],//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.bank_list = response.data.data;
				console.log(response);
				if(response.data.code == 1){
					$scope.al(response.data.msg);
					//$scope.creditView = response.data.msg;
					//console.log($scope.creditView)
					$state.go('creditBank',{cardId:$stateParams.cardId})
					//$timeout(function(){
					//
					//	if(ipCookie('creditNew')){
					//		console.log('检测到creditNew并删除！2000');
					//		ipCookie.remove('creditNew');
					//	}
					//},2000);
				}else console.log(response);
					//if($scope.checkBackToLog(response.data.msg)){
				//	$scope.banks = response.data.data.list;
				//}
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.launchCreditView = function(){
			$state.go('creditView',{cardId:$stateParams.cardId})

			$scope.creditNew.key = $scope.token;
			$http({
				method: 'POST',
				url: $scope.api.creditView,
				data: jsonToStr.transform($scope.creditNew),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.bank_list = response.data.data;
				if(response.data.code == 1){
					$scope.creditView = response.data.data;
					console.log($scope.creditView,44444444444)

					//ipCookie('creditNew', $scope.creditNew);
					//ipCookie.remove('creditNew');
					//if(ipCookie('creditNew')){
					//	//$scope.al('已存在用户：'+ipCookie('token'));
					//	$scope.token = ipCookie('token');
					//	//$state.go('main.credit')
					//
					//	//return
					//}
					$state.go('creditView',{cardId:$stateParams.cardId})
				}else {
					console.log(response.data);
					$scope.al(response.data.msg)
				};
					//if($scope.checkBackToLog(response.data.msg)){
				//	$scope.banks = response.data.data.list;
				//}
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.aboutMode = function(){
			$scope.al('<div>消费模式<br/><br/> 1-1：还款一次 固定消费一次<br/>1-2：还款一次 随机消费一到二次<br/>1-3：还款一次 随机消费一到三次</div>')
		};
		$scope.switchMode = function(mode){
			$scope.creditNew.mode = mode;
		};
		$scope.backToNew = function(){
			//		http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_delete
			$http({
				method: 'POST',
				url: 'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_delete',
				data: jsonToStr.transform({key:$scope.token,order_id:''}),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.bank_list = response.data.data;
				console.log(response.data);
				//console.log($scope.banksWhite);
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
			//ui-sref="creditNew({'cardId':$stateParams.cardId})"
			$state.go('creditNew',{cardId:$stateParams.cardId});

			//$timeout(function(){
			//	$window.location.reload();
			//},1000);
			//$window.location.reload();
		};

		$scope.oneShare = function(){

			$scope.modal ={};

			$ionicModal.fromTemplateUrl('modal.html', {
				//$ionicModal.fromTemplate('', {
				scope: $scope
			}).then(function(modal) {
				$scope.modal = modal;

				//console.log('down');

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
			//console.log(toState.name);
			$scope.token?void(0):$scope.checkBackToLog('请登录');

			switch (toState.name) {

				case 'creditView':

					$http({
						method: 'POST',
						url: 'json/repay_add.json',

						data: jsonToStr.transform({key:$scope.token,grade_id:$stateParams.grade_id}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						$scope.creditView = response.data.data;

						console.log($scope.creditView)
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
					break;
				case 'promotionDetail':

					$http({
						method: 'POST',
						url: $scope.api.recommended_list,

						data: jsonToStr.transform({key:$scope.token,grade_id:$stateParams.grade_id}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						$scope.promotionDetail = response.data.data;
						console.log($scope.promotionDetail)
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
					break;
				case 'creditPrev':

					$http({
						method: 'POST',
						url: $scope.api.card_detail,

						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						$scope.creditBankPrev = response.data.data;
						console.log($scope.creditBankPrev)
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
					$http({
						method: 'POST',
						url: $scope.api.creditPrev,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						$scope.creditPrev = response.data.data;
						console.log($scope.creditPrev)
					}, function errorCallback(response) {
						// 请求失败执行代码
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
						method: 'POST',
						url: latestApiTemp,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						//console.log(response.data.data);
						$scope.creditBank =response.data.data;
						console.log($scope.creditBank);
						ipCookie('creditBank', $scope.creditBank);

						//$scope.banksWhite = response.data.data.list;
						//console.log($scope.banksWhite);
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
				//console.log($scope.bankIndex);
				break;
				case 'creditNew':
					($scope.bankIndex = $scope.$stateParams.index);
				//http://47.96.128.18/aiyongka/mobile/index.php/repay/card_detail

					//$timeout(function(){

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
					//},2000);
					console.log($scope.creditNew);

					$http({
						method: 'POST',
						url: $scope.api.card_detail,
						//url: 'http://47.96.128.18/aiyongka/mobile/index.php/repay/card_detail',
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						//console.log(response.data);

						$scope.card_detail =response.data.data;
						//console.log($scope.card_detail);
						$scope.dateDisable = $scope.card_detail?[($scope.card_detail.date_repay)]:[];
						for(var i=0;i<$scope.dateDisable.length;i++){
							var dateStrTemp = $scope.dateDisable[i].match(/\d\d/g);
							//$scope.dateToHighlights[i] = dateStrTemp;
							if ($scope.dateDisable[i] != null) {
								var dateFormatted = new Date(dateStrTemp[0].toString()+dateStrTemp[1].toString(), (dateStrTemp[2]-1).toString(), dateStrTemp[3].toString());
								$scope.dateDisable[i] =
									dateFormatted;
									//[
									//	new Date(date.getFullYear(), date.getMonth(), 25)
									//	new Date(date.getFullYear(), date.getMonth(), 26),
									//	new Date(date.getFullYear(), date.getMonth(), 29)
									//];
								//{
								//	date: dateFormatted
								}
						}
						$scope.dateDisable.push(new Date(date.getFullYear(), date.getMonth(), 27));
						//console.log($scope.onezoneDatepicker)
						//$scope.banksWhite = response.data.data.list;
						//console.log($scope.banksWhite);
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
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
					var currentDate = new Date();
					//var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 23);
					var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
					$scope.card_detail = '';
					//$scope.dateDisable =
					//	[];
					//[
					//	new Date(date.getFullYear(), date.getMonth(), 25),
					//	new Date(date.getFullYear(), date.getMonth(), 26),
					//	new Date(date.getFullYear(), date.getMonth(), 29)
					//];
					$scope.dateToHighlights = $scope.creditNew.date?$scope.creditNew.date.split(','):[];
					for(var i=0;i<$scope.dateToHighlights.length;i++){
						var dateStrTemp = $scope.dateToHighlights[i].match(/\d\d/g);
						//$scope.dateToHighlights[i] = dateStrTemp;
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
					//$scope.onezoneDatepicker.endDate= new Date(2017, 11, 25);


					var dateRepayTemp = $scope.creditBank.card.date_repay.match(/\d\d/g);
					dateRepayTemp = new Date(dateRepayTemp[0].toString()+dateRepayTemp[1].toString(), (dateRepayTemp[2]-1).toString(), (dateRepayTemp[3]-1).toString());

					$scope.dateSelectedCheck = function(dateYMD,dateOriginal){
						//console.log(dateOriginal);
						//console.log($scope.onezoneDatepicker.highlights);

						//$scope.onezoneDatepicker.highlights =[];
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
						//months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
						months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
						//daysOfTheWeek: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"],
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
							//console.log($scope.creditNew.date);
							//var tempList = $scope.creditNew.date.split(',');
							//console.log(tempList);
							//for(var i=0;i<tempList.length;i++){
							//	console.log(tempList[i])
							//	//if($scope.onezoneDatepicker.highlights[i].date == new Date(date.getFullYear(), date.getMonth(), 19)){
							//	//	console.log(564654)
							//	//}
							//}
							////$scope.onezoneDatepicker.highlights =[];
							//$scope.onezoneDatepicker.highlights.push(
							//	{
							//		date: $scope.onezoneDatepicker.date,
							//		//date: new Date(date.getFullYear(), date.getMonth(), 19),
							//		//date: 'Fri Nov 17 2017 00:00:00 GMT+0800 (中国标准时间)',
							//		color: '#c2e4ff',
							//		textColor: '#3391ff'
							//	}
							//);
							//console.log('highlights',$scope.onezoneDatepicker.highlights)
							//console.log('date',$scope.onezoneDatepicker.date)
						}
					};
					$scope.showDatepicker = function () {
						$scope.onezoneDatepicker.showDatepicker = !$scope.onezoneDatepicker.showDatepicker;
					};
					//日历
					//$scope.$watch('dateDisable', function(newValue,oldValue, scope) {
					//	console.log(newValue,oldValue);
					//	//console.log($scope.addCard.key);
					//	$scope.onezoneDatepicker.disableDates =newValue;
					//}, true);
				break;
				case 'creditEdit':

					$http({
						method: 'POST',
						url: $scope.api.card_detail,
						data: jsonToStr.transform({key:$scope.token,card_id:$scope.$stateParams.cardId}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						//console.log(response.data);

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


						$scope.card_detail =response.data.data;
						//console.log($scope.card_detail);

						$scope.card_edit.card_id = $scope.card_detail.id;
						//$scope.card_edit.type = $scope.card_detail.type;
						$scope.card_edit.phone = $scope.card_detail.phone;
						$scope.card_edit.bankcardnum = $scope.card_detail.bankcardnum;
						$scope.card_edit.bank_id = $scope.card_detail.bank_id;
						$scope.card_edit.cvn2 = $scope.card_detail.cvn2;
						$scope.card_edit.date_valid = $scope.card_detail.date_valid;


						$scope.card_edit.date_bill = ($filter('last2')($scope.card_detail.date_bill));
						$scope.card_edit.date_repay = ($filter('last2')($scope.card_detail.date_repay));

						console.log($scope.card_detail)

					}, function errorCallback(response) {
						// 请求失败执行代码
					});
					break;

				case 'cardManage':
					//break;
				case 'main.credit':
					//———————————————白底logo—————————————————
					$http({
						method: 'POST',
						url: $scope.api.credit,
						data: jsonToStr.transform({key:$scope.token,type:2}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//$scope.bank_list = response.data.data;
						console.log(response.data);
						if(response.data.code==1){
							$scope.banksWhite = response.data.data.list;

						}
						//console.log($scope.banksWhite);
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
					//———————————————白底logo—————————————————
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
						if($scope.checkBackToLog(response.data.msg)){
							$scope.banks = response.data.data.list;
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
									//url: 'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_latest',
									url: $scope.api.repay_latest,

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
			console.log(toState.name);
			($ionicNavBarDelegate.showBar(false));
			$scope.stateName = $state.current.name;
			//console.log($scope.banks);
			//console.log($scope.bankIndex);
			$scope.regVerifyFillRequired = '';
			$scope.fillRequired = '';
			switch (toState.name) {
				case 'promotionCenter':
					$http({
						method: 'POST',
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
						// 请求失败执行代码
					});
					break;
				case 'reg':
					if((window.location.href.match(/refer_phone.*($|\&)/))){
						//console.log(window.location.href.match(/refer_phone.*?($|\&)/));
						$scope.reg.refer_phone = (window.location.href.match(/refer_phone.*?($|\&)/)[0].match(/\d+/))?(window.location.href.match(/refer_phone.*?($|\&)/)[0].match(/\d+/)):'';
					}
				break;
				//case 'promotionCenter':
				case 'main.promotion':
				//break;
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
						method: 'POST',
						url: $scope.api.userInfo,
						data: jsonToStr.transform({key:$scope.token}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						console.log(response.data);
						$scope.my = response.data.data;
						//console.log($scope.my)
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
				break;
				case 'addCard':
					console.log('addCard');
					$http({
						method: 'POST',
						url: $scope.api.userInfo,
						data: jsonToStr.transform({key:$scope.token}),//对提交的数据格式化
						headers: {
							'Accept': '*/*',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function successCallback(response) {
						//console.log(response.data)
						$scope.my = response.data.data;
						console.log($scope.my)
					}, function errorCallback(response) {
						// 请求失败执行代码
					});
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
				console.log(response.data);
				$scope.al(response.data.msg)
				if(response.data.code){
					$scope.ionicHistoryGoBack();
				}
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.changePswVerify = function(){
			$scope.verifyPsw.phone =  $scope.changePsw.phone;
			for(x in $scope.verifyPsw){
				if($scope.verifyPsw[x]){
					//console.log($scope.verifyPsw,'yes')
				}else{
					//console.log($scope.verifyPsw,'noooo');
					$scope.regVerifyFillRequired = 'fillRequired';
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
							//console.log($scope.verifySta)
							verifyCount();
						},1000);
					};
					verifyCount();
				}
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.launchChangePsw = function(){
			for(x in $scope.changePsw){
				//console.log($scope.login[x]?1:0)
				if(!$scope.changePsw[x] && x != 'refer_phone'){
					console.log('缺少字段：',x);
					$scope.fillRequired = 'fillRequired';
					return
				}
			}
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
				console.log(response.data);
				$scope.al(response.data.msg);
				if(response.data.code){
					$scope.ionicHistoryGoBack();
				}
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
					//return
				}
			}
			//ipCookie.remove('token');
			//if(ipCookie('token')){
			//	//$scope.al('已存在用户：'+ipCookie('token'));
			//	$scope.token = ipCookie('token');
			//	//$state.go('main.credit')
			//
			//	//return
			//}
			$http({
				method: 'GET',
				url: $scope.api.login,
				data: jsonToStr.transform($scope.login),//对提交的数据格式化
				headers: {
					'Accept': '*/*',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function successCallback(response) {
				//$scope.names = response.data.sites;
				console.log(response);
				if(response.data.data){
					//$scope.al(response.data.data.token);
					$scope.token = response.data.data.token;
					ipCookie('token', $scope.token);
					//$scope.ionicHistoryGoBack();
					$state.go('main.credit')
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
					//console.log($scope.verify,'yes')
				}else{
					//console.log($scope.verify,'noooo');
					$scope.regVerifyFillRequired = 'fillRequired';
					return
				}
			}
			//console.log(222)
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
							//console.log($scope.verifySta)
							verifyCount();
						},1000);
					};
					verifyCount();
				}
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
		$scope.launchReg = function(){
			for(x in $scope.reg){
				//console.log($scope.login[x]?1:0)
				if(!$scope.reg[x] && x != 'refer_phone'){
					console.log('缺少字段：',x);
					$scope.fillRequired = 'fillRequired';
					return
				}
			}
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
				$scope.al(response.data.msg);
				if(response.data.code){
					//$scope.al(response.data.data.token);
					//$scope.token = response.data.data.token;
					//ipCookie('token', $scope.token);
					//$scope.ionicHistoryGoBack();
					$state.go('login')
				}
				$scope.fillRequired = '';
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		};
	});
