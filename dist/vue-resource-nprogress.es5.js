'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

//
// Interceptor that adds progressbar to all requests
//

var VueResourceNProgress = {
  install: function install(Vue) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


    var progress = window.NProgress;

    if (progress == null) {
      console.error('vue-resouce-nprogress: NProgress is not installed globally. ' + 'Please install it from https://github.com/rstacruz/nprogress');
      return;
    }

    var requestsTotal = 0;
    var requestsCompleted = 0;

    var latencyThreshold = options.latencyThreshold || 100;

    function setComplete() {
      requestsTotal = 0;
      requestsCompleted = 0;
      progress.done();
    }

    Vue.http.interceptors.push(function (request, next) {

      var showProgressBar = true;
      if (request.showProgressBar != null) {
        showProgressBar = request.showProgressBar;
        delete request.showProgressBar;
      }

      var completed = void 0;

      if (showProgressBar) {
        if (requestsTotal === 0) {
          setTimeout(function () {
            progress.start();
          }, latencyThreshold);
        }
        requestsTotal++;
        completed = requestsCompleted / requestsTotal;
        progress.set(completed);
      }

      next(function (response) {
        if (!showProgressBar) {
          return response;
        }

        if (!response.ok) {
          progress.done();
          setComplete();
        }
        // Finish progress bar 50 ms later
        setTimeout(function () {
          requestsCompleted++;

          if (requestsCompleted >= requestsTotal) {
            setComplete();
          } else {
            completed = requestsCompleted / requestsTotal - 0.1;
            progress.set(completed);
          }
        }, latencyThreshold + 50);
        return response;
      });
    });
  }
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
  module.exports = VueResourceNProgress;
}