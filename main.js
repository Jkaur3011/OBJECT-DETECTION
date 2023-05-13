img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("girl and dog.jpg")
}

function setup() {
    canvas = createCanvas(800, 500);
    canvas.position(350, 130);
    object_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelloaded() {
    console.log("Model Loaded!");
    status = true;
    object_detector.detect(img, gotResults);

}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        //console.log(results);
        objects = results;

    };

}

function draw() {
    image(img, 0, 0, 800, 500);
    console.log(objects);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;
            name = objects[i].label;
            confidence = objects[i].confidence;
            percent = floor(confidence * 100);

            fill("black");
            textSize(20);
            noStroke();
            text(name + " " + percent + "%", x - 40, y + 20);

            noFill();

            strokeWeight(2);
            stroke("blue");
            rect(x - 50, y, width - 100, height - 100);
            // circle(x+50, y+100, 300);

        }
    }
}