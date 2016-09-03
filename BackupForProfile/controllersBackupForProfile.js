angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) { 
})

.controller('LoginCtrl', function($scope) {  
    
    // Get phrases from services.js Phrases Factory 
    var ran;
    $scope.randomeII = function(){
        $scope.avataa = false;        
        console.log($scope.avataa);
        ran = Math.floor((Math.random()*18));
        $scope.randomeImage = ran;  
        $scope.ctrlData.newPhrase.avata = ran;
    };
 
    $scope.ctrlData = {
      newPhrase : {"name" : "", "avata" : ""}
    };

    //Add data to localStorage 
    $scope.addData = function() {

        $scope.removeData(0);

        var phraseToAdd = '';
            phraseToAdd = $scope.ctrlData.newPhrase;

        $scope.storedData.push(phraseToAdd);
        localStorage.setItem('storedData', JSON.stringify($scope.storedData)); 
        location.reload();
    } 

    //Add data from localStorage 
    $scope.removeData = function(index) {
        $scope.storedData.splice(index, 1);
        $scope.storedData.splice(index, 1);
        $scope.storedData.splice(index, 1);
        $scope.storedData.splice(index, 1);
        localStorage.setItem('storedData', JSON.stringify($scope.storedData));
    }

    $scope.showDelete = function() {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
    }

    $scope.$on('$ionicView.enter', function() {
        $scope.storedData = JSON.parse(localStorage.getItem('storedData')) || [];

        //Count timesVisited
        $scope.timesVisited = localStorage.getItem('timesVisited') || 0;
        $scope.timesVisited++;
        localStorage.setItem('timesVisited', $scope.timesVisited);
    }); 
}) 

.controller('PlaylistsCtrl', function($scope, tasks, $cordovaGeolocation) {    


    $scope.nickName = tasks.nickName;

// Nickname

    $scope.tasks = tasks.itens; // initial DB

    $scope.items = tasks.items;	// the DB will be added. 

////// GeoLocation my location starts ///////////////////////////


    $scope.threads = tasks.items;		// DB for geolocaiton

    var threads = $scope.threads;  



    var distance = function(thread){

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
  
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
            $scope.lat  = position.coords.latitude;
            $scope.long = position.coords.longitude;       

        var earthRadiusInKm    = 6371;
        var earthRadiusInMiles = 3959; 

        var lat = thread.lat - $scope.lat; // Difference of latitude
        var long = thread.lng - $scope.long; // Difference of longitud  

        // Vertical distance
        var disLat = (lat * Math.PI * earthRadiusInMiles) / 180;

        // Horizontal distance
        var disLon = (long * Math.PI * earthRadiusInMiles) / 180;

        // Total distance (calculated by Pythagore: a^2 + b^2 = c^2)
        var calculation = Math.sqrt(Math.pow(disLat, 2) + Math.pow(disLon, 2)); 

        thread.dist   = (calculation).toFixed(2);   

        }, function(error) { 
          console.log('Your Geolocation is messed up!')
        });    
	};  


     
    angular.forEach($scope.items, function(thread) {  
            distance(thread); 
        });
     

////// GeoLocation my location Ends //////////////////////////////



////// Infinity Scroll Ends //////////////////////////////////////////////

    var currentStart = 2;
    

    
    $scope.maxItems = function(){
        return ($scope.tasks.length <= $scope.items.length)? true : false; 
    };
    
    $scope.refreshList = function(){
        tasks.refresh();
        $scope.$broadcast('scroll.refreshComplete'); 
    };

    var num = 0;

    $scope.addItems = function (){ 

        tasks.add( $scope.items[num] ); 
        if($scope.items[num+1]){
           tasks.add( $scope.items[num+1] );  
        }     
        if($scope.items[num+2]){
           tasks.add( $scope.items[num+2] );  
        }    
        if($scope.items[num+3]){
           tasks.add( $scope.items[num+3] );  
        }    
        if($scope.items[num+4]){
           tasks.add( $scope.items[num+4] );  
        }    
        if($scope.items[num+5]){
           tasks.add( $scope.items[num+5] );  
        }    
        if($scope.items[num+6]){
           tasks.add( $scope.items[num+6] );   
        } else {
            tasks.add( {
                      "title": "Finished! No more item!!"
                    })
        }       
        num += 7;
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };  
 
////// Infinity Scroll Ends //////////////////////////////////////////////

////// Search Begins //////////////////////////////////////////////

    var options = {
		caseSensitive: false,
		includeScore: false,
		shouldSort: true,
		threshold: 0,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		keys: ["title"]
    };

	var books = [];
	books =  tasks.items;

	var fuse = new Fuse(books, options);

	$scope.searchText = {};
	//$scope.searchText.text = "1234";

	$scope.$watch('searchText.text', searchChange);

	function searchChange() {
		if($scope.searchText.text){
			var result = fuse.search($scope.searchText.text); 
			$scope.booktitles =  result;
		}
		else {
			$scope.booktitles =  tasks.itens;         
		}
	}

// $scope.playlists => searchChange(input) => $scope.booktitles;

////// Search Ends //////////////////////////////////////////////























})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
