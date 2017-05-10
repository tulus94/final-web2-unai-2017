

'use strict';
var app = angular.module('wikiSearch', []);


app.filter('renderHTMLCorrectly', function($sce)
{
	return function(stringToParse)
	{
		return $sce.trustAsHtml(stringToParse);
	}
});


app.filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
});

app.controller('searchCtrl', function($scope, $http, $rootScope, dataService){
  function constructQuery (searchTerm) {
    var query = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=info&list=search&srsearch=';
    query += searchTerm;
    return query;
  }
  var self = this;
  
  var search = document.getElementById('search');
  var button = document.getElementById('button');
  var input = document.getElementById('input');
  
  // Activates spinner animation
  $scope.loading = function() {
	  search.classList.add('loading');
	
	  setTimeout(function() {
		  search.classList.remove('loading');
	  }, 1500);
  }
  
  // Use is Focused to show or hide the exit button
  $scope.isFocused = false;
  // Use noEntries to either move search to middle of screen or not
  $scope.noEntries = true;
  
  // Called on input focus
  $scope.focus = function() {
    $scope.isFocused = true;
  };
  
  // Called when exit button is clicked
  // Removes entries and resets search box
  $scope.unFocus = function() {
    $scope.isFocused = false;
    $scope.searchInput = "";
    $rootScope.articles = null;
    $scope.noEntries = true;
  };
  
  
  $scope.search = function() {
    /*loadRemoteData();*/
    $scope.loading();
   var query = constructQuery($scope.searchInput);
 /*Couldnt figure out how to share without rootscope*/      dataService.getWikiResults(query).then(function(response){
     $rootScope.articles = response;
     console.log($rootScope.articles);
  });
    $scope.noEntries = false;
  };
  
});

app.service('dataService', function($http){
    return({
      getWikiResults: function (query) {
    return $http.jsonp(query + "&callback=JSON_CALLBACK").then(function(response){
      return response.data.query.search;
    });
  }
    });
  
 
  
});

app.directive('articles', function(){
  return {
    restrict: 'E',
    templateUrl: 'articles.html',
    controller: 'searchCtrl',
    replace: true,
    
  }
});