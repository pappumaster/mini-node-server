var fs = require('fs'),
    dbOperations = require('./dbOperations');

module.exports = {
    'profileBrowser' : profileBrowser,
    'addProfile' : addProfile,
    'fetchProfiles' : fetchProfiles,
    'browserids' : browserids,
    'getids' : getids
};

function profileBrowser(response) { 
    fs.readFile('../files/profileBrowser.html', function(err, data) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    });
}
function addProfile(response, postData, headers) {
    try {
        var postObject = JSON.parse(postData);
        postObject.acceptHeaders = {};
	postObject.acceptHeaders['accept'] = headers['accept'];
	postObject.acceptHeaders['accept-language'] = headers['accept-language'];
	postObject.acceptHeaders['accept-encoding'] = headers['accept-encoding'];
        if (Object.keys(postObject.screen).length > 0) {
            postObject.ID = djb2Code(postObject.navigator.UserAgent + postObject.screen.width.toString() + postObject.screen.height.toString() + postObject.navigator.plugins.length.toString() + postObject.navigator.mimeTypes.length.toString());
        } else {
	    postObject.ID = djb2Code(postObject.navigator.UserAgent + postObject.navigator.plugins.length.toString() + postObject.navigator.mimeTypes.length.toString());
        }
        dbOperations.writeProfileToDB(postObject);
    } catch(e) {
        console.log(e);
    }
    response.writeHead(200);
    response.write('Thanks for letting us fingerprint your browser!\nHave a good day!');
    response.end();
    function djb2Code(str){
        var hash = 5381;
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            hash = ((hash << 5) + hash) + code;/* hash * 33 + c */
        }
        return hash;
    };
}
function fetchProfiles(response) {
    dbOperations.fetchProfilesFromDB(response);
}
function browserids(response) {
    fs.readFile('../files/browserids.html', function(err, data) {
	if (err) {
	    throw err;
        }
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    });
}
function getids(response) {
    dbOperations.listIDs().then(function(objectPairs){
        var table_add_script = "$(function() {";
        var code_to_ret = "";
        var i = 0;
        while (true) {
            console.log(i);
            table_add_script += "$('#ids').append('<tr><td>' + " + objectPairs[i].ID + " + '</td><td>' + '";
            var words = objectPairs[i].user_agent.split(" ");
            table_add_script += words.join("' + ' ' + '");
            table_add_script += "' + '</td></tr>');";
            i += 1;
            if (i === objectPairs.length){
                console.log("BIGGER");
                break;
            }
        }
        //table_add_script += craft_jquery(objectPairs);
        table_add_script += "});";
        console.log(table_add_script);
        response.writeHead(200, {'Content-Type' : 'application/javascript'});
        //response.write(table_add_script);
        response.write(table_add_script);
        response.end();
    });
    craft_jquery = function(items) {
        var code_to_ret = "";
        console.log(items);
        var i = 0;
        while (true) {
            console.log(i);
            code_to_ret += "$('#ids').append('<tr><td>' + " + items[i].ID + " + '</td><td>' + '";
            var words = items[i].user_agent.split(" ");
            code_to_ret += words.join("' + ' ' + '");
            code_to_ret += "' + '</td></tr>');\n";
            ++i;
            if (i == items.length)
		break;
        }
        console.log(code_to_ret);
        return code_to_ret;
    };
}
