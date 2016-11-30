(function(){
	
	var dataUrl= "../JSON-Airports/airports.json";

	var ajax= {};

	var display= document.querySelector('#test');
	
	// returns http request object
	function getRequestObject() {
	  if (window.XMLHttpRequest) {
	    return (new XMLHttpRequest());
	  } 
	  else if (window.ActiveXObject) {
	    // For very old IE browsers (optional)
	    return (new ActiveXObject("Microsoft.XMLHTTP"));
	  } 
	  else {
	    global.alert("Ajax is not supported!");
	    return(null); 
	  }
	}

	ajax.sendGetRequest= function(requestUrl, responseHandler, isJsonResponse){
		var request= getRequestObject();
		request.onreadystatechange = 
	      function() { 
	        handleResponse(request, 
	                       responseHandler,
	                       isJsonResponse); 
	      };
	  request.open("GET", requestUrl, true);
	  request.send(null); // for POST only
	 
	};

	// Only calls user provided 'responseHandler'
	// function if response is ready
	// and not an error
	function handleResponse(request,
	                        responseHandler,
	                        isJsonResponse) {
	  if ((request.readyState == 4) &&
	     (request.status == 200)) {

	    // Default to isJsonResponse = true
	    if (isJsonResponse == undefined) {
	      isJsonResponse = true;
	    }

	    if (isJsonResponse) {
	      responseHandler(JSON.parse(request.responseText));
	    }
	    else {
	      responseHandler(request.responseText);
	    }
	  }
	}

	function loadData(data){
		var airports= {};

		for(var i=0; i < data.length; i++){
			airports[data[i].name]= data[i];
		}
		console.log(airports);
		//display.innerHTML= data;
	}

	ajax.sendGetRequest(dataUrl, loadData, true);
})();