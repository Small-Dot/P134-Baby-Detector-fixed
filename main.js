 baby_status = ""; 
 objects = [];
 alarm = "";
 
 function preload(){
   alarm = loadSound("alarm.mp3.mp3");
 }
 
 function setup(){
     canvas = createCanvas(480, 480);
     canvas.center();
     video = createCapture(VIDEO);
     video.hide();
     objectDetector = ml5.objectDetector('coco SSD', modelLoaded);
     document.getElementById("baby_status").innerHTML ="detecting objects";
 }

function modelLoaded(){
    console.log("model loaded.");
    baby_status = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
 function draw(){
     image(video, 0, 0, 480, 480);
     
   if(baby_status != ""){
      r = random(255);
      g = random(255);
      b = random(255);
       objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++){
        document.getElementById("baby_status").innerHTML = "Objects Detected";

        fill(r, g, b)
        percentageindecimals = objects[i].confidence;
        percentage = floor(percentageindecimals*100) + " %";
        text(objects[i].label + "  " + percentage, objects[i].x, objects[i].y);
        stroke(r, g, b);
        noFill();
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if (objects[i].label = "person"){
            document.getElementById("number_of_objects").innerHTML = "Baby Detected";
            console.log("alarm.stop")
            alarm.stop();
        }
        else{
            document.getElementById("number_of_objects").innerHTML = "Baby NOT Detected";
            alarm.play();
            
        }
    }
    if(objects.length == 0){
      document.getElementById("number_of_objects"). innerHTML = "Warning! Baby NOT found.";
      alarm.play();
    }

   }
 }
