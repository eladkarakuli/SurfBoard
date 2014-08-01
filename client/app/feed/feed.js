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
        this.after = '';
      };

      GoogleApi.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;

        var url = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=surf%20quets" + this.after + "&callback=JSON_CALLBACK";
        $http.jsonp(url).success(function(data) {
          var items = data.responseData.results;
          for (var i = 0; i < items.length; i++) {
            this.items.push(items[i].url);
          }
          this.after = "t3_" + this.items[this.items.length - 1].url;
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