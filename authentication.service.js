;(function(){
	'use strict'

	angular
		.module('Authentication', [
				'firebase'
			])
		.factory('authentication', AuthenticationFactory)

		function AuthenticationFactory( $rootScope, $log, $q ){

			var deferred = $q.defer();

			var API = {
				login: login,
				signIn: signIn,
				signOut: signOut,
				googleLogin : googleLogin,
				facebookLogin: facebookLogin,
				gitHubLogin: gitHubLogin
			}

			return API;

			function login(loginData) {

				firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password).catch(function(error) {

				  	var errorCode = error.code;
				  	var errorMessage = error.message;
				  	$log.error('login failure: ', errorMessage);

				});
			}

			function signIn(signInData) {

				firebase.auth().createUserWithEmailAndPassword(signInData.email, signInData.password).catch(function(error) {

					var errorCode = error.code;
					var errorMessage = error.message;
					$log.error('signIn failure: ', errorMessage);

				});

			}

			function signOut() {

				firebase.auth().signOut().then(function() {
					$log.info('signOut successful');
				}, function(error) {
				  	$log.error('signOut failure: ', error);
				});

			}

			function googleLogin() {

				var googleProvider = new firebase.auth.GoogleAuthProvider();
				googleProvider.addScope('https://www.googleapis.com/auth/plus.login');

				firebase.auth().signInWithPopup(googleProvider).then(function(result) {

					var token = result.credential.accessToken;
					var user = result.user;
					$log.info('token ', token);
					$log.info('user ', user);
					deferred.resolve( user );

				}).catch(function(error) {

				  var errorCode = error.code;
				  var errorMessage = error.message;
				  var email = error.email;
				  var credential = error.credential;
				  $log.error('errorMessage', errorMessage);
				  deferred.reject( error );

				});

				return deferred.promise;
			}

			function facebookLogin() {

				var facebookProvider = new firebase.auth.FacebookAuthProvider();
				facebookProvider.addScope('public_profile');

				firebase.auth().signInWithPopup(facebookProvider).then(function(result) {

				  	var token = result.credential.accessToken;
				  	var user = result.user;
				  	$log.info('token ', token);
					$log.info('user ', user);
					deferred.resolve( user );

				}).catch(function(error) {

				  	var errorCode = error.code;
				  	var errorMessage = error.message;
				  	var email = error.email;
				  	var credential = error.credential;
				  	$log.error('errorMessage', errorMessage);
				  	deferred.reject( error );

				});

				return deferred.promise;
			}

			function gitHubLogin() {

				var gitHubProvider = new firebase.auth.GithubAuthProvider();
				gitHubProvider.addScope('user');

				firebase.auth().signInWithPopup(gitHubProvider).then(function(result) {

				  	var token = result.credential.accessToken;
				  	var user = result.user;
				  	$log.info('token ', token);
					$log.info('user ', user);
					deferred.resolve( user );

				}).catch(function(error) {

				  	var errorCode = error.code;
				  	var errorMessage = error.message;
				  	var email = error.email;
				  	var credential = error.credential;
				  	$log.error('errorMessage', errorMessage);
				  	deferred.reject( error );

				});

				return deferred.promise;

			}

		}
		
})();