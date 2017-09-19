angular.module('myService', ['ngSanitize'])

.service('dataServ', ['$http', '$rootScope','$ionicScrollDelegate','$timeout','$sce', function($http, $rootScope,$ionicScrollDelegate,$timeout,$sce){

    /*
        page        当前请求的页
        maxResult   每页显示的条数
    */

    this.getUrl = function(page,type){
		$rootScope.flag = true;
		var url = 'http://route.showapi.com/255-1?showapi_appid=26643&showapi_sign=48e5d9643808423da3033f05682d000f&type='+type+'&page='+page;

		$http.get(url).success(function(data){
			$rootScope.items = data.showapi_res_body.pagebean.contentlist; //请求的数据
			$rootScope.currentPage = data.showapi_res_body.pagebean.currentPage; //当前页
			var allPage = data.showapi_res_body.pagebean.allPages;  //总页数
			// $rootScope.items.splice(0,19);
			console.log(data);

			angular.forEach($rootScope.items,function(value, key){
				// console.log(value,key);
				if(value.video_uri || value.voice_uri){
					$rootScope.src = function(urls){
						return $sce.trustAsResourceUrl(urls)
					}
				}	
			})
			

			$ionicScrollDelegate.scrollTop();
			$rootScope.flag  =  false;

			if (page < 4) {
                $rootScope.pageList = [1, 2, 3, 4, 5];
            } else {
                $rootScope.pageList = [1, '...', page-2, page-1, page, page+1, page+2];
                
                if (page > (allPage - 2) && page < allPage) {
		            $rootScope.pageList = [1, '...', page-3, page-2, page-1, page, page+1];
		        } 
		        if (page == allPage) {
		            $rootScope.pageList = [1, '...', page-4, page-3, page-2, page-1, page];
		        }
            }
		});
	}
   
}])


.service('btnAction', ['$rootScope', function($rootScope){
    this.index = 0;
    this.light = function(index) {
        angular.forEach($rootScope.tabBtns, function(btn, key) {
            btn.isOk = false;
            if (key == index) {
                btn.isOk = true;
            }
        })
    };
    this.set = function() {
        var ll = location.hash;
        switch (ll) {
            case '#/all':
                this.index = 0;
                this.light(this.index);
                break;
            case '#/video':
                this.index = 1;
                this.light(this.index);
                break;
            case '#/picture':
                this.index = 2;
                this.light(this.index);
                break;
            case '#/text':
                this.index = 3;
                this.light(this.index);
                break;
            case '#/voice':
                this.index = 4;
                this.light(this.index);
                break;
            case '#/hot':
                this.index = 5;
                this.light(this.index);
                break;
        }
    }
}]) 