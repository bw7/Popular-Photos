// New module defined with dependency declared on the 
// the ngResource module, allowing us to work with the Instagram API

var app = angular.module("PopularPhotos", ['ngResource']);

// Creates and registers the new "instagram" service
app.factory('instagram', function($resource){

	return {
		retrievePopular: function(callback){

			// The ngResource module gives us the $resource service. It makes working with
			// AJAX easy. The client_id of the app is included below. 

			var api = $resource('https://api.instagram.com/v1/media/popular?client_id=90b8cb3e308146c29c18ad7c85b555ad&callback=JSON_CALLBACK',{
				client_id: '90b8cb3e308146c29c18ad7c85b555ad'
			},{
				// This creates an action which we've chosen to name "retrieve". It issues
				// an JSONP request to the URL of the resource. JSONP requires that the
				// callback=JSON_CALLBACK part is added to the URL.

				retrieve:{method:'JSONP'}
			});

			api.retrieve(function(response){

				// Calls the supplied callback function
				callback(response.data);

			});
		}
	}

});

// The controller is below. Instagram service is included and will 
// be available inside the function automatically.

function PopularPhotosController($scope, instagram){

	// Default layout of the app. Clicking the buttons on the toolbar
	// will change this value.

	$scope.layout = 'grid';

	$scope.pics = [];

	// Uses the instagram service to retrieve a list of the popular pics
	instagram.retrievePopular(function(data){

		// Assigning the pics array will cause the view
		// to be automatically updated by Angular.
		$scope.pics = data;
	});

}
