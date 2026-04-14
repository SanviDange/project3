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

//-----DOG API-----//

let dogImage; // Variable to store the dog's picture

function getDogDoppelganger() {
  let url = "https://dog.ceo/api/breeds/image/random";
  
  // Use fetch to get data from the API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // data.message is the URL of the random dog image
      dogImage = loadImage(data.message); 
      console.log("New buddy found: " + data.message);
    });
}

function gotFaces(results) {
  // If we see a face and haven't fetched a dog yet
  if (faces.length === 0 && results.length > 0) {
    getDogMatch(); // This calls your function that fills the HTML container
  }
  faces = results;
}

function getDogMatch() {
  let url = "https://dog.ceo/api/breeds/image/random";
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let container = document.getElementById('dog-image-container');
      
      // 2. Create an image element and set the source
      container.innerHTML = `<img src="${data.message}" alt="Dog Buddy">`;
    });
}