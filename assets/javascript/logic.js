// Global variables
/////////////////////////////////////////////////////
var gifCategoryArray = ["volleyball", "chess", "dogs", "javascript"];
var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
var categoryValue;
var apiKey = "&api_key=dc6zaTOxFJmzC";


// Functions
/////////////////////////////////////////////////////

// for each item in the array, create a button with a unique value
function arrayButtons(){

    $(".buttonContainer").empty();


    for (var i =0; i < gifCategoryArray.length; i++) {
        var button = $("<button>");
        button.attr("id", "category" + i);
        button.addClass("categoryButton");
        $(button).text(gifCategoryArray[i]);
        $(".buttonContainer").append(button);
    }
};

arrayButtons();

// Main Processes
/////////////////////////////////////////////////////

// 1. on click of submit - add item to array
$(".submit").on("click", function(event){
    event.preventDefault();
    
    var userInput = $("#gifInput").val().trim();
    gifCategoryArray.push(userInput);
    arrayButtons();
});

// 2. on click of button from array produce gifs
$(document).on("click", ".categoryButton", function(){
    var clickedValue = $(this).text();
    $.ajax({
        url: baseURL + clickedValue + apiKey,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        $(".gifContainer").html("");
        for (var j = 0; j < 10; j++) {
            var gifImg = $("<img class='gifClick' alt=gifImg>");
            gifImg.attr("src", response.data[j].images.fixed_height_still.url);
            gifImg.attr("data-animate", response.data[j].images.fixed_height.url);
            gifImg.attr("data-still", response.data[j].images.fixed_height_still.url);
            gifImg.attr("data-state", "still");
            $(".gifContainer").append(gifImg);
        }
      });
});

// 3. on click of gif animate and then back to still.
$(document).on("click", ".gifClick", function(){
    var state = $(this).attr("data-state");

    if (state === "still")  {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }  else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
