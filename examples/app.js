'use strict';

angular.module('linkedInExamples', [
  'ui.router',
  'linkedin'
])

.config(function configStates($stateProvider) {
  $stateProvider
    .state('main', {
      url: '',
      templateUrl: 'main.html',
    })
    .state('authExample', {
      url: 'example-authentication',
      templateUrl: 'authentication/template.html',
      controller: 'AuthenticationController'
    });
})

.config(function configLinkedIn(LinkedInProvider) {
  LinkedInProvider.init({
    apiKey: '77vy95tri8ricx' // Demo app
  });
});
