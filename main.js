img =""
status =""
objects = [];

function setup()
{
    canvas = createCanvas(300,300);
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    //its Loading cocossd
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded()
{
    status=true
    console.log("Model Loaded!")
    //running the module here. The img is input, the output is the gotResult
    
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error)
    }
    console.log(results)
    objects = results;
}


function preload()
{
    img = loadImage('dog_cat.jpg')
}

function draw()
{
    image(video, 0, 0, 380, 380)
    if(status  != "")
    {
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResult)
        for(i = 0; i <objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects are" + objects.length
            fill(r,g,b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
   
}