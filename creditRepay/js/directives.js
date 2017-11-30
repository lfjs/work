
angular.module("directives", [])
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
								url: 'http://www.aiyongka.cn/mobile/index.php/user/upload',
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
					case '浦发银行': return "pufa";
					case '工商银行': return "gongshang";
					case '交通银行': return "jiaotong";
					case '中信银行': return "zhongxin";
					case '华夏银行': return "huaxia";

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
			token : '=',
		},
		templateUrl : "tpl/plan.html",
		link: function (scope, element,$http,jsonToStr) {
			//console.log(scope)
		},
		controller: function ($scope,$ionicActionSheet,$timeout,$ionicPopup,$http,jsonToStr) {
			//console.log($scope.banks)
			//console.log($scope.index)


			$scope.cancelPlan = function() {
				var confirmPopup = $ionicPopup.confirm({
					template: ' <div class="text-center"> <img style="width:60px;margin-bottom: 20px" src="img/img_tishi.png" alt=""/> <div style="margin-bottom: 20px" class="text_bold ">确定取消计划？</div> <div style="margin-bottom: 20px;color: #0082ff; ">（确定后不可撤销）</div> </div>',
					okText: '确定', // String (默认: 'OK')。OK按钮的文字。
					okType: 'button-default', // String (默认: 'button-positive')。OK按钮的类型。
					cancelText: '取消', // String (默认: 'Cancel')。一个取消按钮的文字。
					cancelType: '' // String (默认: 'button-default')。取消按钮的类型。
				});
				confirmPopup.then(function(res) {
					if(res) {
						$http({
							method: 'POST',
							url: 'http://www.aiyongka.cn/mobile/index.php/repay/repay_delete',
							data: jsonToStr.transform({key:$scope.token}),//对提交的数据格式化
							headers: {
								'Accept': '*/*',
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
							}
						}).then(function successCallback(response) {
							//$scope.bank_list = response.data.data;
							console.log($scope.token);
							console.log(response.data);

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
						//console.log(index,this);
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
