GoogleService = {
    GoogleAuth: null,
    // SCOPE: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    SCOPE: 'https://www.googleapis.com/auth/drive',

    handleClientLoad: function () {
        gapi.load('client:auth2', GoogleService.initClient);
    },

    initClient: function () {
        var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

        gapi.client.init({
            'apiKey': 'AIzaSyDEys7irs70PYxmr7Srn8gWfCDysbuohHo',
            'discoveryDocs': [discoveryUrl],
            'clientId': '955915951176-v9nvs56thkpg7l51palu1g751cacmkhf.apps.googleusercontent.com',
            'scope': GoogleService.SCOPE
        }).then(function () {
            GoogleService.GoogleAuth = gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            GoogleService.GoogleAuth.isSignedIn.listen(GoogleService.updateSigninStatus);

            // Handle initial sign-in state. (Determine if user is already signed in.)
            var user = GoogleService.GoogleAuth.currentUser.get();
            GoogleService.setSigninStatus();

            // Call handleAuthClick function when user clicks on
            //      "Sign In/Authorize" button.
            $('#sign-in-or-out-button').click(function () {
                GoogleService.handleAuthClick();
            });
            $('#revoke-access-button').click(function () {
                GoogleService.revokeAccess();
            });

            $('#button-load').click(function() {
                GoogleService.loadFile();
            })

            $('#button-create').click(function() {
                GoogleService.createFile();
            })

            $('#button-export').click(function() {
                GoogleService.exportFile();
            })

            $('#button-print').click(function() {
                GoogleService.printFile('1lfhvaIwvhM1wgY8y0RnPbbgi_rA1j5WWpDirtrDwfI4');
            })

            $('#button-list').click(function() {
                GoogleService.listFiles();
            })

        });
    },

    handleAuthClick: function () {
        if (GoogleService.GoogleAuth.isSignedIn.get()) {
            // User is authorized and has clicked 'Sign out' button.
            GoogleService.GoogleAuth.signOut();
        } else {
            // User is not signed in. Start Google auth flow.
            GoogleService.GoogleAuth.signIn();
        }
    },

    revokeAccess: function () {
        GoogleService.GoogleAuth.disconnect();
    },

    setSigninStatus: function (isSignedIn) {
        var user = GoogleService.GoogleAuth.currentUser.get();
        var isAuthorized = user.hasGrantedScopes(GoogleService.SCOPE);
        if (isAuthorized) {
            $('#sign-in-or-out-button').html('Sign out');
            $('#revoke-access-button').css('display', 'inline-block');
            $('#auth-status').html('You are currently signed in and have granted access to this app.');
        } else {
            $('#sign-in-or-out-button').html('Sign In/Authorize');
            $('#revoke-access-button').css('display', 'none');
            $('#auth-status').html('You have not authorized this app or you are signed out.');
        }

    },

    updateSigninStatus: function (isSignedIn) {
        GoogleService.setSigninStatus();
    },


    /**
     * Print a file's metadata.
     *
     * @param {String} fileId ID of the file to print metadata for.
     */
    printFile: function (fileId) {
        var request = gapi.client.drive.files.get({
            'fileId': fileId,
            'alt': 'media',
            'fields': 'webContentLink'
        });
        console.log('request===', request)

        request.execute(
            GoogleService.proba
            /*function (resp) {
            console.log(resp)
            console.log('Name: ' + resp.name);
            console.log('Description: ' + resp.description);
            console.log('MIME type: ' + resp.mimeType);
        }*/);
    },

    proba: function(p1, p2, p3) {
        console.log('p1===', p1)
        console.log('p2===', p2)
        console.log('p3===', p3)

        $('#image').attr('src',p1.webContentLink);
    },

    /**
     * Download a file's content.
     *
     * @param {File} file Drive File instance.
     * @param {Function} callback Function to call when the request is complete.
     */
    downloadFile: function (file, callback) {
        if (file.downloadUrl) {
            var accessToken = gapi.auth.getToken().access_token;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file.downloadUrl);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            xhr.onload = function () {
                callback(xhr.responseText);
            };
            xhr.onerror = function () {
                callback(null);
            };
            xhr.send();
        } else {
            console.log(callback)
            if(callback)
            callback(null);
        }
    },

    loadFile: function() {
        GoogleService.printFile('1c2tsfVecs7T4gHDu2xPAM47qnvp9OyiC')
    },

    createFile: function() {
        console.log('---createFile')
        var fileMetadata = {
            name: "state.json"
            // mimeType: 'text/plain',
        };
        var media = {
            mimeType: "application/json",
            body: JSON.stringify({}) // I want to dynamically determine the file's contents, not copy an existing file onto Google Drive
            // mimeType: 'text/plain',
            // body: '12345++098765'
        };
        /*var request = */

        gapi.client.drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }).then(function(response){
            console.log(response);
        });


    //     const fileMetadata = {
    //         name: "state.json"
    //     };
    //     const media = {
    //         mimeType: "application/json",
    //         body: JSON.stringify({}) // I want to dynamically determine the file's contents, not copy an existing file onto Google Drive
    //     };
    //     gapi.client.drive.files.create({
    //         resource: fileMetadata,
    //         media: media,
    //         fields: "id" // The 'fields' property tells the API what properties of the created file to return back with the response
    //     }).then(response = > {
    //         console.log('File Id:', response.result.id);
    // })
    //     ;
        },

    exportFile: function() {
        gapi.client.drive.files.export({
            fileId: '1lfhvaIwvhM1wgY8y0RnPbbgi_rA1j5WWpDirtrDwfI4',
            mimeType: 'text/plain',
            // alt: 'media',
            // fields: 'webContentLink'
        }).then(function(response){
            console.log(response.body);
        });
    },

    listFiles: function () {
        gapi.client.drive.files.list({
            'pageSize': 15,
            'fields': "nextPageToken, files(id, name)"
        }).then(function(response) {
            GoogleService.appendPre('Files:');
            var files = response.result.files;
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    GoogleService.appendPre(file.name + ' (' + file.id + ')');
                }
            } else {
                GoogleService.appendPre('No files found.');
            }
        });
    },

    appendPre: function (message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

};

// 1lfhvaIwvhM1wgY8y0RnPbbgi_rA1j5WWpDirtrDwfI4 - список 3 курса 2013
