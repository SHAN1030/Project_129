song = "";
song2 = "";
leftwristx = "";
leftwristy = "";
rightwristx = "";
rightwristy = "";
song_status = ""; //2 define empty variable with a empty string value.
song2_status = "";
scoreleftwrist = ""; //1 define a variable to store the score of the left wrist.
scorerightwrist = "";

function setup(){
    canvas = createCanvas(600,600);
    video = createCapture(VIDEO);
    video.hide();
    canvas.center();
    posenet = ml5.poseNet(video,modelloaded);
    posenet.on('pose', gotPoses);
} 


function draw(){
    image(video, 0, 0, 600, 600);
    song_status = song.isPlaying();
    song2_status = song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist > 0.2){
    circle(leftwristx, leftwristy, 20);
    song.stop();
    if(song2_status == false){
        song2.play();
        document.getElementById("songname").innerHTML = "Playing - Pangea";
    }
    }
    if(scorerightwrist > 0.2){
        circle(rightwristx, rightwristy, 20);
        song2.stop();
        if(song_status == false){
            song.play();
            document.getElementById("songname").innerHTML = "Playing - Disco";
        }
        }
}

function preload(){
    song = loadSound("disco.mp3");
    song2 = loadSound("pangea.mp3");
    console.log("Sounds Loaded");
}

function play(){
    song.play();
}

function modelloaded(){
    console.log("The poseNet is loaded.");
}

function gotPoses(results)
{
if(results.length>0)
{
console.log(results);
leftwristx = results[0].pose.leftWrist.x;
leftwristy = results[0].pose.leftWrist.y;
rightwristx = results[0].pose.rightWrist.x;
rightwristy = results[0].pose.rightWrist.y;
console.log(leftwristx + leftwristy + rightwristx + rightwristy);
scoreleftwrist = results[0].pose.keypoints[9].score; //3 fetching the score of the left wrist.
scorerightwrist = results[0].pose.keypoints[10].score;
console.log(scoreleftwrist);
console.log(scorerightwrist);
}
}