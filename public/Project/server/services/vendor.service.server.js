/**
 * Created by mengxichen on 4/20/16.
 */
//YELP API
/* require the modules needed */
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');


module.exports = function(app) {
    app.get("/api/project/vendor", search);

    function search(req,res){
        var type = req.query.type;
        var location = req.query.location;
        console.log(type);
        console.log(location);
        request_yelp(
            {location:location,
                term: type},
        function(err, response, body){
            if(err){
                res.status(400).send(err);

            }
            if(body){
                res.send(body);
            }
        })
    }

    /* Function for yelp call
     * ------------------------
     * set_parameters: object with params to search
     * callback: callback(error, response, body)
     */
    function request_yelp (set_parameters, callback) {

        /* The type of request */
        var httpMethod = 'GET';

        /* The url we are using for the request */
        var url = 'http://api.yelp.com/v2/search';

        /* We can setup default parameters here */
        var default_parameters = {
            location: 'San+Francisco',
            sort: '2'
        };

        /* We set the require parameters here */
        var required_parameters = {
            oauth_consumer_key : "1M_96VMW70cWQDI1gR9tRQ",
            oauth_token : "SJroBIRL3kyN4eRv4q-UaZPq9LMkXBCT",
            oauth_nonce : n(),
            oauth_timestamp : n().toString().substr(0,10),
            oauth_signature_method : 'HMAC-SHA1',
            oauth_version : '1.0'
        };

        /* We combine all the parameters in order of importance */
        var parameters = _.assign(default_parameters, set_parameters, required_parameters);

        /* We set our secrets here */
        var consumerSecret = "EZvspOlLcsEdgIc0trY-V1aT3j8";
        var tokenSecret = "wKu0cQ4pxSvUcGCB6m0M7z68H9M";

        /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
        /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
        var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

        /* We add the signature to the list of paramters */
        parameters.oauth_signature = signature;

        /* Then we turn the paramters object, to a query string */
        var paramURL = qs.stringify(parameters);

        /* Add the query string to the url */
        var apiURL = url+'?'+paramURL;

        /* Then we use request to send make the API Request */
        request(apiURL, function(error, response, body){
            return callback(error, response, body);
        });

}



};