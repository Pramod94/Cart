var app = angular.module('shopingItems', []);

app.factory("shopingItems", function ($http) {

  function getData(callback) {
    $http({
      method: "GET",
      url: "groceries.json",
      cache: true
    }).then(function (response) {
      var list = response.data;
      callback(list);
    });
  };


  var cartItem = [];



  // app.directive('sitems', function () {
  //   return {
  //     scope: {
  //       sitems: '='
  //     }
  //   };
  // });


  return {
    list: getData,
    add: function (item) {
      if (item.name == cartItem.name) {
        alert("item already exists in cart");
      } else {
        cartItem.push(angular.copy(item));
        return cartItem; // if we don't return, $scope object will refer to the original cartItem array which is empty
      }
    }


  };

});