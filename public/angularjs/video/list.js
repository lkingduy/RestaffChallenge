var app = angular.module('RestaffChallenge', ['ui.bootstrap']);
var videos = []
app.controller('listController', function ($scope, $http) {
  $scope.videos = [];
  $scope.nextPageToken = null;
  $scope.prevPageToken = null;
  $scope.isPrevPage = true
  
  $scope.prevPage = function () {
    paginateMethod(true)
  }

  $scope.nextPage = function () {
    paginateMethod(false)
  }

  $("form").on("submit", function (e) {
    paginateMethod(null)
  })

  paginateMethod(null)

  function paginateMethod(isPrevPage) {
    var page = null
    if(isPrevPage != null) {
      page = isPrevPage ? $scope.prevPageToken : $scope.nextPageToken
    }
    var data = {
      location: $('#location').val() != '' ? $('#location').val() : null,
      locationRadius: $('#locationRadius').val() != '' ? $('#locationRadius').val() + 'km' : null,
      pageToken: page
    }

    $http.get('api/video', { params: data })
      .then(function (response) {
        $scope.videos = response.data.items
        $scope.nextPageToken = response.data.nextPageToken ? response.data.nextPageToken : null
        $scope.prevPageToken = response.data.prevPageToken ? response.data.prevPageToken : null
      }, function (response) {
      });
  }

});

// function init() {
//   gapi.client.setApiKey("AIzaSyAdpZAX_r0-ZH4GrdeCZOGpmMRqwAKRxdc");
//   return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//     .then(function () {
//         console.log("GAPI client loaded for API");
//       },
//       function (err) {
//         console.error("Error loading GAPI client for API", err);
//       });
// }