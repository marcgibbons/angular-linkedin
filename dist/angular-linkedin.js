var IN;  // LinkedIn JSAPI Object

(function (angular) {
  'use strict';

  var settings = {
    apiKey: undefined,
    onLoad: undefined,
    authorize: false,
    lang: 'en_US'
  };

  angular.module('linkedin', [])
    .value('settings', settings)
    .value('IN', IN)
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

    .run(['settings', function createLinkedInScriptTag(settings) {
      var script = angular.element('<script>');
      script.attr('type', 'text/javascript');
      script.attr('src', 'http://platform.linkedin.com/in.js');

      var settingsString = '';
      angular.forEach(settings, function (value, key) {
        if (value !== undefined) {
          key = key === 'apiKey' ? 'api_key' : key;
          settingsString += key + ':  ' + value + '\n';
        }
      });
      script.html(settingsString);
      angular.element('script').append(script);
    }]);
})(angular);
