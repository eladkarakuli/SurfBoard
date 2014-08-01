'use strict';

angular.module('surfBoardApp')
.controller('feedController', ['$scope', function($scope, GoogleApi) {
 /* $scope.googleapi = new GoogleApi();*/
}])

// GoogleApi constructor function to encapsulate HTTP and pagination logic
.directive('googleApiFeed', function($http) {
  return {
    restrict: 'E',
    templateUrl: 'app/feed/feed.html',
    link: function(scope, element, attrs) {

      var GoogleApi = function() {
        this.items = [];
        this.busy = false;
        this.resultSize = parseInt(attrs.resultSize) || 5;
        this.resultIndex = 0;
      };

      GoogleApi.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;
        
        var url = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=surf%20quets&imgsz=large&rsz=" + this.resultSize + "&start=" + this.resultIndex + "&callback=JSON_CALLBACK";
        $http.jsonp(url).success(function(data) {
          var items = data.responseData.results;
          for (var i = 0; i < items.length; i++) {
            this.items.push(items[i].url);
          }
          this.resultIndex += this.resultSize;
          this.busy = false;
        }.bind(this)).
        error(function(data, status, headers, config) {
          scope.error = true;
          console.log(data);  
        });;
      };

      scope.googleapi = new GoogleApi();
    }
    
  };
});