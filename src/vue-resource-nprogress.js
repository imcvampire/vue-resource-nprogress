//
// Interceptor that adds progressbar to all requests
//

const VueResourceNProgress = {
  install: (Vue, options = {}) => {

    const progress = window.NProgress;

    if (progress == null) {
      console.error('vue-resouce-nprogress: NProgress is not installed globally. ' +
        'Please install it from https://github.com/rstacruz/nprogress');
      return;
    }

    let requestsTotal = 0;
    let requestsCompleted = 0;

    const latencyThreshold = options.latencyThreshold || 100;

    function setComplete() {
      requestsTotal = 0;
      requestsCompleted = 0;
      progress.done();
    }

    Vue.http.interceptors.push((request, next) => {

      let showProgressBar = true;
      if (request.showProgressBar != null) {
        showProgressBar = request.showProgressBar;
        delete request.showProgressBar;
      }

      let completed;

      if (showProgressBar) {
        if (requestsTotal === 0) {
          setTimeout(() => {
            progress.start();
          }, latencyThreshold);
        }
        requestsTotal++;
        completed = requestsCompleted / requestsTotal;
        progress.set(completed);
      }

      next((response) => {
        if (!showProgressBar) {
          return response;
        }

        if (!response.ok) {
          progress.done();
          setComplete();
        }
        // Finish progress bar 50 ms later
        setTimeout(() => {
          requestsCompleted++;

          if (requestsCompleted >= requestsTotal) {
            setComplete();
          }
          else {
            completed = (requestsCompleted / requestsTotal) - 0.1;
            progress.set(completed);
          }
        }, latencyThreshold + 50);
        return response;
      });
    });
  },
};

if (typeof module === 'object' && module.exports) {
  module.exports = VueResourceNProgress;
}
