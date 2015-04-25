var APP = APP || {};
(function(app) {

    var API_URLROOT = 'https://api.stackexchange.com/2.2/questions/';

    app.xhr = {};

    app.xhr.fetch = function(ids) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            var url = app.xhr.makeApiUrl(ids);
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        return resolve(JSON.parse(req.responseText));
                    } else {
                        return reject('shit dun goofed');
                    }
                }
            };
            req.open('GET', url);
            req.send();
        });
    };

    app.xhr.makeApiUrl = function(questionIds) {
        return API_URLROOT + questionIds + '?site=stackoverflow';
    };

}(APP));
