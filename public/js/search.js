console.log("search.js loaded");

//On page load, populates dropdown of states' names
//statesArray is in a separate file: statesArray.js
$(document).ready(function(){
	populateDropdown(statesArray);
});

//Assigns user search input to variables and passes them as key/value
//pairs in an object to the searchCampaigns function 
$("#searchSubmit").on("click", function (event){
	event.preventDefault();
	let employer = $("#employer-name").val().trim();
	let city  = $("#city").val().trim();
	let state = $("#state-dropdown").text().slice(5);
	let searchObj = {
		employer: employer,
		city: city,
		state: state
	}
	$("#exampleModal").toggle();
	try{
		searchCampaigns (searchObj);
	}
	catch(e){
		console.log(e);
		return location = "/";
	}
	
});

//Searches the database for existing campaigns associated with an employer
function searchCampaigns (searchObj){
	var employer = encodeURI(searchObj.employer);
	$("html").load(`/findCampaign/${employer}`, function(response, status){
		console.log('status', status);
		if(status === "nocontent"){
			location = "/newcampaign";
		}
	});
}

//Performs an employer search through Glassdoor's api
function searchGlassdoor (searchObj, callback){
	$.get("ext_api/employer-search", JSON.stringify(searchObj)).done(function (data){
		console.log("sending get request");
		console.log("* data = ", data);
		return callback(data);
	});
}

//Populates the dropdown with options from an array argument
function populateDropdown (optionArray){
	optionArray.forEach(function (option){
		let line = $("<li role='presentation'>").val(option);
		let anchor = $("<a role='menuitem' class='stateOption'>").text(option);
		line.append(anchor);
		$("#states").append(line);
	});
}

//This script causes the bootstrap dropdown button to behave more like a
//normal <select> dropdown.
$(document).on("click", ".stateOption", function (event){
	event.preventDefault();
	$("#state-dropdown").text(this.innerHTML);
	console.log(this.text + " !");
});

$("#header-button-scroll").on("click", function(){
	scrollToDiv("middle-section");
});

function scrollToDiv(div_id) {
  $("html,body").animate({
    scrollTop: $("#" + div_id).offset().top
  },"slow");
  console.log("this is the scroll click...")
}

//Open modal
$("#header-button-modal").on("click", function(){
	console.log("click");
	$("#exampleModal").toggle();
})

