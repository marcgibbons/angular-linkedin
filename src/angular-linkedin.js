var IN;  // Global LinkedIn JSAPI Object

(function (angular) {
  'use strict';

  var settings = {
    apiKey: undefined,
    onLoad: undefined,
    authorize: false,
    lang: 'en_US'
  };

  angular.module('linkedin', [])
    .value('LinkedInSettings', settings)

    .provider('LinkedIn', [function () {
      this.init = function (_settings) {
        if (typeof _settings !== 'object' || _settings.apiKey === undefined) {
          throw 'Error in LinkedInProvider.init(). Please provide settings ' +
            'object with a value for apiKey';
        }
        settings.apiKey = _settings.apiKey;
        settings.onLoad = _settings.onLoad || _settings.onLoad;
        settings.authorize = _settings.authorize || settings.authorize;
        settings.lang = _settings.lang || settings.lang;
      };

      this.$get = [function () {
        return IN;
      }];
    }])

    .run(['$window', 'LinkedInSettings', function ($window, LinkedInSettings) {
      if ($('script[src="http://platform.linkedin.com/in.js"]').length) {
        return;
      }
      var settingsString = '';
      angular.forEach(LinkedInSettings, function (value, key) {
        if (value !== undefined) {
          key = key === 'apiKey' ? 'api_key' : key;
          settingsString += key + ':  ' + value + '\n';
        }
      });

      var parent = $window.document.getElementsByTagName('script')[0];
      var script = $window.document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'http://platform.linkedin.com/in.js';
      script.innerHTML = settingsString;
      parent.parentNode.insertBefore(script, parent);
    }]);
})(angular);
