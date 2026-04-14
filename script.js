let faceMesh;
let video;
let faces = [];

function preload() {
  // In ml5 1.0+, faceMesh is loaded like this:
  faceMesh = ml5.faceMesh();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting!
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the video to the canvas
  image(video, 0, 0, width, height);

  // Draw the points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}

function gotFaces(results) {
  faces = results;
}