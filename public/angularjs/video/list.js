var app = angular.module('RestaffChallenge', ['ui.bootstrap']);
var videos = []
app.controller('listController', function ($scope, $http, $sce) {
  $scope.videos = [];
  $scope.nextPageToken = null;
  $scope.prevPageToken = null;
  $scope.isPrevPage = true
  $scope.checkHavePrevPage = 0
  $scope.prevPage = function () {
    setTimeout(function() {
      paginateMethod(true)
    }, 1000)
    // paginateMethod(true)
    $scope.checkHavePrevPage = $scope.checkHavePrevPage > 0 ? $scope.checkHavePrevPage - 1 : $scope.checkHavePrevPage 
  }

  $scope.nextPage = function () {
    setTimeout(function() {
      paginateMethod(false)
    }, 1000)
    // paginateMethod(false)
    $scope.checkHavePrevPage += 1
  }

  $scope.detailVideo = function(id) {
      window.location.href = '/' + id
  }

  $("form").on("submit", function (e) {
    // paginateMethod(null)
    $scope.checkHavePrevPage = 0
    setTimeout(function() {
      paginateMethod(null)
    }, 1000)
  })
  
  setTimeout(function() {
    paginateMethod(null)
  }, 1000)
  

  function paginateMethod(isPrevPage) {
    var page = null
    if(isPrevPage != null) {
      page = isPrevPage ? $scope.prevPageToken : $scope.nextPageToken
    }
    // var data = {
    //   location: $('#location').val() != '' ? $('#location').val() : null,
    //   locationRadius: $('#locationRadius').val() != '' ? $('#locationRadius').val() + 'km' : null,
    //   pageToken: page
    // }
    var latitude = $('#latitude').val()
    var longtitude = $('#longtitude').val()
    var locationRadius = $('#locationRadius').val()

    var data = {
      location: latitude != '' && longtitude != '' 
      ? latitude + ',' + longtitude : null,
      locationRadius: locationRadius != '' ? locationRadius + 'km' : null,
      pageToken: page
    }

    $http.get('api/video', { params: data })
      .then(function (response) {
        $scope.videos = response.data.items
        $scope.nextPageToken = response.data.nextPageToken ? response.data.nextPageToken : null
        $scope.prevPageToken = response.data.prevPageToken ? response.data.prevPageToken : null
      }, function (err) {
        console.log(err);
      });
  }
});