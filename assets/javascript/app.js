
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCRiEoXb5A2kXcabewUgyRpzqSoIAvkBj8",
    authDomain: "train-scheduler-24889.firebaseapp.com",
    databaseURL: "https://train-scheduler-24889.firebaseio.com",
    projectId: "train-scheduler-24889",
    storageBucket: "",
    messagingSenderId: "974558203088"
  };

  firebase.initializeApp(config);

  //firebase var
  var database = firebase.database();

  //vars
  var name = "";
  var dest = "";
  var time = "";
  var mins = "";

  //submit click
  $("#add-train").on("click", function(event) {

  	event.preventDefault();

    //user input
  	name = $("#train-name").val().trim();
  	dest = $("#train-dest").val().trim();
  	time = $("#train-time").val().trim();
  	mins = $("#train-mins").val().trim();

  	console.log(name, stop, time, mins);

    //push to database
  	database.ref().push({
      name: name,
      dest: dest,
      time: time,
      mins: mins
    });

    




    //clear form
    $("#train-name").val("");
    $("#train-dest").val("");
    $("#train-time").val("");
    $("#train-mins").val("");
    
});

  //adding trains to database and table body
  database.ref().on("child_added", function( childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var time = childSnapshot.val().time;
    var mins = childSnapshot.val().mins;

    // console.log(name dest time mins);

    //first time converted
    var timeConverted = moment(time, "hh:mm").subtract(1, "years");
      console.log(timeConverted);

    //current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //diff b/t times
    var diffTime = moment().diff(moment(timeConverted), "minutes");

    var tRemainder = diffTime % mins;
    console.log(tRemainder);

    //mins away
    var minsTilTrain = mins - tRemainder;
    console.log("MINUTES TIL TRAIN: " + minsTilTrain);

    //next train
    var nextTrain = moment().add(minsTilTrain, "minutes");
      nextTrain = moment(nextTrain).format("hh:mm");
    console.log("NEXT TRAIN: " + nextTrain);



    //add train info to table
     $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" +
  mins + "</td><td>" + nextTrain + "</td><td>" + minsTilTrain + "</td></tr>");

  });
