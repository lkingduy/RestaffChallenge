var app = angular.module('RestaffChallenge', ['ui.bootstrap']);

app.controller('listController', function ($scope, $http) {

  $scope.videos = [];
  // set page
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  // page changed
  $scope.pageChanged = function () {
    paginateMethod()
  };

  $scope.search = function () {
    paginateMethod()
  }

  paginateMethod()

  /* http and paginate object */
  function paginateMethod () {

    var search = ($scope.input) ? $scope.input : null;
    var currentPage = $scope.currentPage;
    var data = { page: currentPage, search: search };

    $http.get('api/video', { params: data })
      .then(function (response) {
        $scope.videos = response.data.data;
        /* Update pagination object */
        $scope.pagination = {
          currentPage: 1,
          maxSize: 50,
          totalItems: response.data.count,
        };
      }, function (response) {
        // not found videos
      });
  }

});