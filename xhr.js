var APP = APP || {};
(function(app) {

    var API_URLROOT = 'https://api.stackexchange.com/2.2/questions/';

    app.xhr = {};

    app.xhr.fetch = function(ids) {
        return new Promise(function(resolve, reject) {
            var url = makeApiUrl(ids);
            var req = new XMLHttpRequest();
            req.responseType = "json";
            req.onload = function() {
                if (this.status === 200) {
                    return resolve(this.response);
                } else {
                    return reject('shit dun goofed');
                }
            }
            req.open('GET', url);
            req.send();
        });
    };

    function makeApiUrl(questionIds) {
        return API_URLROOT + questionIds + '?site=stackoverflow';
    };

}(APP));
