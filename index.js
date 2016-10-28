
angular.module('starterApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'users'])
  
.run(function($log){
    $log.debug('MyApp is ready now!')
  })
.config(function($mdThemingProvider, $mdIconProvider){
  $mdThemingProvider
    .theme('default')
    .primaryPalette('brown')
    .accentPalette('red');
  /*https://material.angularjs.org/latest/api/service/$mdIconProvider*/
  /*id, url, viewBoxSize*/
  /*viewBoxSize is by default 24, sets width/height of the icons viewBox*/
  
  
$mdIconProvider.icon('share', 'svg/share.svg', 24)
               .icon('menu' , 'svg/menu.svg', 24)
               .icon("google_plus", 'svg/googlePlus.svg', 512)
               .icon("twitter"    , 'svg/twitter.svg', 512)
               .icon("facebook"    , 'svg/facebook.svg', 112.196);
     
});

(function(){
  'use strict';

  // Prepare the 'users' module for subsequent registration of controllers and delegates
  angular.module('users', [ 'ngMaterial' ]);


})();

(function(){
  'use strict';

  angular.module('users')
         .service('userService', ['$q', UserService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($q){
    var users = [
      {
        name: 'Meteor',
        image: 'images/Meteor.png',
        description: 'The fastest way to build javascript apps.'
      },
       {
        name: 'Meteor',
        image: 'images/Meteor.png',
        description: 'The fastest way to build javascript apps.'
      },
       {
        name: 'Meteor',
        image: 'images/Meteor.png',
        description: 'The fastest way to build javascript apps.'
      },
      
       {
        name: 'Meteor',
        image: 'images/Meteor.png',
        description: 'The fastest way to build javascript apps.'
      },
        {
        name: 'Meteor',
        image: 'images/Meteor.png',
        description: 'The fastest way to build javascript apps.'
      }
    ];

    // Promise-based API
    return {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        return $q.when(users);
      }
    };
  }

})();

(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $timeout, $log ) {
    var self = this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.title = 'Angular Material - Starter App';
    self.share        =share;
      //  $scope.title = 'UI Components with Dynamic Data';

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });

    // *********************************
    // Internal methods
    // *********************************
    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
        $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ?         $scope.users[user] : user;
    }
    
    /**
     * Show the bottom sheet
     *
     */
    function share(selectedUser){
      $mdBottomSheet.show({
        controller: ContactSheetController,
        controllerAs: 'vm',
        templateUrl: 'contactSheet.html',
        //if you want overlay to be over entire app, you can enter body
        // parent: angular.element(document.querySelector('#body'))
        parent: angular.element(document.querySelector('#content'))
      }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
      });

      
       /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.items = [
            
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'svg/googlePlus.svg'}
              ];
          this.contactUser = function(action) {
            
            $mdBottomSheet.hide(action);
          };
        }
      
    }


  
  }

})();
