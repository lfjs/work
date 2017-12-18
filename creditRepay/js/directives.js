angular.module("directives", [])
	.directive('echartsBar', function() {
		return {
			scope: {
				id: "@",
				data: "="
			},
			restrict: 'E',
			template: '<div style="height:150px;"></div>',
			replace: true,
			link: function($scope, element, attrs, controller) {
				var option1 = {
					tooltip : {
						show:false,
					},
					toolbox: {
						show : false,
					},
					series : [
						{
							type:'gauge',
							//startAngle: 225,
							//endAngle: 45,
							center : ['50%', '50%'],    // 默认全局居中
							radius : '65',
							axisLine: {            // 坐标轴线
								lineStyle: {       // 属性lineStyle控制线条样式
									width: 7,
									color: [[0, '#ffae00'],[1, '#fff']],
								}
							},
							splitLine:{//坐标轴大标记 大刻度线
								show:false
							},
							axisTick: {            // 坐标轴小标记
								show:false,
							},
							axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
								show:false,
							},
							pointer: {
								show:false,
							},
							title : {
								show : false,
							},
							detail : {
								show : false,
							},
							data:[0]
						}
					]
				};
				var myChart = echarts.init(document.getElementById($scope.id),'macarons');
				myChart.setOption(option1);
				$scope.$watch('data', function(newValue, oldValue) {
					//update the DOM with newValue
					//console.log(newValue);
					var noneZero = (newValue[0].value/newValue[1].value)||0.001;
					myChart.setOption({
						series: [{
							axisLine: {            // 坐标轴线
								lineStyle: {       // 属性lineStyle控制线条样式
									color: [[noneZero, '#ffae00'],[1, '#fff']],
									shadowColor: '#127dd7', //默认透明
									shadowOffsetY: 5,
									shadowBlur: 10
								}
							},
						}]
					});
				},true);
			}
		};
	})
	.directive("uploadTrigger", [function () {
		return {
			link: function (scope, element, attributes) {
				element.bind("click", function () {
					document.getElementById(element[0].title).click();
				});
			}
		}
	}])
	.directive("uploadImg", ['$http','jsonToStr',function ($http,jsonToStr) {
		return {
			scope: {
				uploadImg: "="
			},
			link: function (scope, element, attributes) {
				element.bind("change", function (changeEvent) {
					var reader = new FileReader();
					reader.onload = function (loadEvent) {
						scope.$apply(function () {
							//console.log(loadEvent.target.result.replace("data:image/png;base64,", ""))
							scope.uploadImg.file = encodeURIComponent(loadEvent.target.result.replace(/data(.*)base64,/, ""));
							$http({
								method: 'POST',
								url: 'http://47.96.128.18/aiyongka/mobile/index.php/user/upload',
								data: jsonToStr.transform(scope.uploadImg),//对提交的数据格式化
								headers: {
									'Accept': '*/*',
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then(function successCallback(response) {
								//$scope.names = response.data.sites;
								//console.log(response.data)
								//alert(response.data.msg);
								scope.uploadImg.data = response.data.data;
								//console.log(scope.uploadImg)
							}, function errorCallback(response) {
								console.log(response.data)
								console.log(scope.uploadImg)
							});
						});
					};
					reader.readAsDataURL(changeEvent.target.files[0]);
				});
			}
		}
	}])
.directive("cardDirective", function() {
	return {
		scope : {
			bank : '=bank'
		},
		templateUrl : "tpl/card.html",
		controller: function ($scope) {
			$scope.matchLogo = function(bankName){
				switch (bankName) {
					//case '浦发银行': return "pufa";
					//case '工商银行': return "gongshang";
					//case '交通银行': return "jiaotong";
					//case '中信银行': return "zhongxin";
					//case '华夏银行': return "huaxia";
				}
			}
		}
		};
})
.directive("planDirective", function() {
	return {
		scope : {
			plan : '=',
			index : '=',
			bankid : '=',
			creditNew : '=creditnew',
			token : '=',
		},
		templateUrl : "tpl/plan.html",
		link: function (scope, element,$http,jsonToStr) {
			//console.log(scope)
		},
		controller: function (ipCookie,$state,$stateParams,$scope,$ionicActionSheet,$timeout,$ionicPopup,$http,jsonToStr,$window) {
			//console.log($scope.banks)
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
			$scope.$stateParams = $stateParams;
			$scope.repay_detail = function() {
				//console.log($scope.plan.repay)
				$http({
					method: 'POST',
					url: 'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_detail',
					data: jsonToStr.transform({key:$scope.token,repay_id:$scope.plan.repay.id}),//对提交的数据格式化
					headers: {
						'Accept': '*/*',
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(function successCallback(response) {
					//$scope.bank_list = response.data.data;
					//console.log(response);
					console.log(response.data);
					var repay_detailTemp = {
					//$scope.creditNew = {
						key: $scope.token,
						card_id: $stateParams.cardId,
						amount: response.data.data.amount,
						amount_principal: response.data.data.amount_principal,
						mode: response.data.data.mode,
						date: response.data.data.date_select,
						typeFlag:response.data.data.id
					};
					ipCookie('creditNew', repay_detailTemp);
					$state.go('creditNew',{cardId:$stateParams.cardId});
					//$timeout(function(){
					//	$window.location.reload();
					//},1500);
					//if(response.data.code){
					//	$window.location.reload();
					//}
					//$scope.ionicHistoryGoBack();
					//if($scope.checkBackToLog(response.data.msg)){
					//	$scope.banks = response.data.data.list;
					//}
				}, function errorCallback(response) {
					// 请求失败执行代码
				});
			};
			$scope.cancelPlan = function() {
				var confirmPopup = $ionicPopup.confirm({
					template: ' <div class="text-center"> <img style="width:60px;margin-bottom: 20px" src="img/img_tishi.png" alt=""/> <div style="margin-bottom: 20px" class="text_bold ">确定取消计划？</div> <div style="margin-bottom: 20px;color: #0082ff; ">（确定后不可撤销）</div> </div>',
					okText: '确定', // String (默认: 'OK')。OK按钮的文字。
					okType: 'button-default', // String (默认: 'button-positive')。OK按钮的类型。
					cancelText: '取消', // String (默认: 'Cancel')。一个取消按钮的文字。
					cancelType: '' // String (默认: 'button-default')。取消按钮的类型。
				});
				confirmPopup.then(function(res) {
					console.log($scope.plan.repay);
					if(res) {
						$http({
							method: 'POST',
							url: 'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_cancel',
							data: jsonToStr.transform({key:$scope.token,repay_id:$scope.plan.repay.id}),//对提交的数据格式化
							headers: {
								'Accept': '*/*',
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
						}).then(function successCallback(response) {
							//$scope.bank_list = response.data.data;
							console.log(response);
							console.log(response.data);
							if(response.data.code){
								$window.location.reload();
							}
							//$scope.ionicHistoryGoBack();
							//if($scope.checkBackToLog(response.data.msg)){
							//	$scope.banks = response.data.data.list;
							//}
						}, function errorCallback(response) {
							// 请求失败执行代码
						});
					} else {
						console.log('You are not sure');
					}
				});
			};
			$scope.launchPay = function() {
				var hideSheet = $ionicActionSheet.show({
					buttons: [
						{ text: '<div class="btnSlideCon"><div class="button button-positive button-block bg_blue btnSlide"><input id="aliPay" type="checkbox"/>确认充值</div></div>' }
					],
					titleText: '<div class="downSlideCon"><p class="slideNote">您将执行该计划，请先确保您的信用卡 <span class="slideAlert">(尾号1042)</span>有足够的额度 <span class="slideAlert">(200元)</span>来执行，若因卡片额度不够导致计划失败，概不负责。</p><p class="slideInfo text_bold">手续费：36.98</p><div class="list"><a class="item item-icon-left item-icon-right text-left text_bold"><i class="icon"><img src="img/zhifubao.png" alt=""/></i>支付宝<i class="icon ion-ios-circle-filled"></i></a></div></div>',
					cancel: function() {
						// add cancel code..
					},
					buttonClicked: function(index) {
						console.log(index,this);
						$http({
							method: 'POST',
							url: 'http://47.96.128.18/aiyongka/mobile/index.php/repay/repay_start',
							data: jsonToStr.transform({key:$scope.token,repay_id:$scope.plan.repay.id}),//对提交的数据格式化
							headers: {
								'Accept': '*/*',
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
						}).then(function successCallback(response) {
							//$scope.bank_list = response.data.data;
							console.log(response.data);
							$scope.al(response.data.msg);
							if(response.data.code){
								$window.location.reload();
							}
							//$scope.ionicHistoryGoBack();
							//if($scope.checkBackToLog(response.data.msg)){
							//	$scope.banks = response.data.data.list;
							//}
						}, function errorCallback(response) {
							// 请求失败执行代码
						});
						return true;
					}
				});
				$timeout(function() {
					//hideSheet();
				}, 2000);
			};
		}
	};
})
;
