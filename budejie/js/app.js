angular.module('myApp', ['ionic','ngRoute','myService','ngSanitize'])
.config(['$routeProvider',function($routeProvider) {
	console.log('config')
	// 配置路由规则
    $routeProvider
    // .when('/gif',{
    // 	templateUrl: 'view/gif.html',
    //     controller: 'gifCtrl'
    // })
    .when('/all', {
        templateUrl: 'view/all.html',
        controller: 'allCtrl'
    })
    .when('/video', {
        templateUrl: 'view/video.html',
        controller: 'videoCtrl'
    })
    .when('/picture', {
        templateUrl: 'view/picture.html',
        controller: 'picCtrl'
    })
    .when('/text', {
        templateUrl: 'view/text.html',
        controller: 'textCtrl'
    })
    .when('/voice', {
        templateUrl: 'view/voice.html',
        controller: 'voiceCtrl'
    })
    .when('/hot', {
        templateUrl: 'view/hot.html',
        controller: 'hotCtrl'
    })
    .otherwise({
        redirectTo: '/all'
    }) 
}])
.run(['$rootScope','dataServ','$http', function($rootScope,dataServ,$http) {
	console.log('run')

	//工具栏按钮
	$rootScope.tabBtns = [
        {'name': '全部', 'isOk': false,'type': ''},
        {'name': '视频', 'isOk': false,'type': 41},
        {'name': '图片', 'isOk': false,'type': 10},
        {'name': '段子', 'isOk': true,'type': 29},
        {'name': '声音', 'isOk': false,'type':31},
        {'name': '热门', 'isOk': false,'type': ''}
    ];

    $rootScope.change = function(index){
        $rootScope.index = index;
    	switch(index){
    		case 0 :
    			location.href = '#/all';
                break;
            case 1 :
            	location.href = '#/video';
            	break;
            case 2 :
    			location.href = '#/picture';
                break;
            case 3 :
            	location.href = '#/text';
            	break;
            case 4 :
    			location.href = '#/voice';
                break;
            case 5 :
            	location.href = '#/hot';
            	break;
            default:
                location.href = '#/all';
                break;
    	}

    	angular.forEach($rootScope.tabBtns, function(value, key){
    		value.isOk = false;
    		if(index == key ){
    			value.isOk = true;
    		}
    	});
    }

    $rootScope.index = 0;  //默认显示quanbu
	$rootScope.pageList = [1,2,3,4,5];  //页数按钮
	$rootScope.page = 1;   //当前页数
	//页数
	$rootScope.browsePage = function(page){
		$rootScope.page = page;
		dataServ.getUrl($rootScope.page,$rootScope.tabBtns[$rootScope.index].type);
		// console.log(page);
	}
	//下一页
	$rootScope.nextPage = function(){
		$rootScope.page++;
		dataServ.getUrl($rootScope.page,$rootScope.tabBtns[$rootScope.index].type);
	}


	// 下拉刷新请求数据。。。
	$rootScope.page_2 = 210;
	$rootScope.items_2 = [];
	$rootScope.pullingText = "下拉刷新";
    $rootScope.doRefresh = function() {
    	var url = 'http://route.showapi.com/255-1?showapi_appid=26643&showapi_sign=48e5d9643808423da3033f05682d000f&type=29&page='+$rootScope.page_2;
    	$rootScope.page_2++;
    	$http.get(url).success(function(data){
	    	$rootScope.items_2 = data.showapi_res_body.pagebean.contentlist.slice(0,5);
	    	// console.log($rootScope.items_2);
	    	for(var i = 0 ; i < $rootScope.items_2.length;i++){
	    		$rootScope.items.unshift($rootScope.items_2[i]);
	    	}
	    	// 一定要记住：我们数据加载完之后，需要广播一下。
    		$rootScope.$broadcast("scroll.refreshComplete");
	    });
	    // console.log($rootScope.items,$scope.items_2.length);
    	
    }
}])




// all的控制器
.controller('allCtrl', ['$rootScope','$http','dataServ','btnAction',function($rootScope,$http,dataServ,btnAction){
	console.log($rootScope.index)
	$rootScope.items = [];  //请求的数据
	
	
	dataServ.getUrl($rootScope.page,$rootScope.tabBtns[$rootScope.index].type);  //默认请求第一页
    btnAction.set();	
}])

// 视频的控制器
.controller('videoCtrl', ['$rootScope','$http','dataServ','btnAction',function($rootScope,$http,dataServ,btnAction){
    console.log($rootScope.index)
    $rootScope.items = [];  //请求的数据
    
    
    dataServ.getUrl($rootScope.page,$rootScope.tabBtns[$rootScope.index].type);  //默认请求第一页
    btnAction.set();    
}])

// 图片的控制器
.controller('picCtrl', ['$rootScope','$http','dataServ','btnAction',function($rootScope,$http,dataServ,btnAction){
    console.log($rootScope.index)
    $rootScope.items = [];  //请求的数据
    console.log('picCtrl');
    dataServ.getUrl($rootScope.page,$rootScope.tabBtns[$rootScope.index].type);  //默认请求第一页
    btnAction.set();    
}])

// 段子的控制器
.controller('textCtrl', ['$rootScope','$http','dataServ','btnAction',function($rootScope,$http,dataServ,btnAction){
    console.log($rootScope.index)
    $rootScope.items = [];  //请求的数据
    
    
    dataServ.getUrl($rootScope.page,$rootScope.tabBtns[$rootScope.index].type);  //默认请求第一页
    btnAction.set();    
}])

// 声音的控制器
.controller('voiceCtrl', ['$rootScope','$http','dataServ','btnAction',function($rootScope,$http,dataServ,btnAction){
    console.log($rootScope.index)
    $rootScope.items = [];  //请求的数据
    
    
    dataServ.getUrl($rootScope.page,$rootScope.tabBtns[$rootScope.index].type);  //默认请求第一页
    btnAction.set();    
}])

// 热门控制器
.controller('hotCtrl', ['$rootScope','$http','dataServ','btnAction',function($rootScope,$http,dataServ,btnAction){
    console.log($rootScope.index)
    $rootScope.items = [];  //请求的数据
    
    
    dataServ.getUrl($rootScope.page,$rootScope.tabBtns[$rootScope.index].type);  //默认请求第一页
    btnAction.set();    
}])

