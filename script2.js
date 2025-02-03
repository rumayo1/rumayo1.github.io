let handPose;
let video;
let hands = [];
let handDetails;
const htmlText = document.querySelector('.details1')
const htmlText2 = document.querySelector('.details2')
const htmlText3 = document.querySelector('.details3')
const htmlText4 = document.querySelector('.details4')
const body = document.querySelector('body')

function preload() {
  // Load the handPose model
  handPose = ml5.handPose({
    flipHorizontal: true
  });
}

function setup() {
  createCanvas(body.offsetWidth, body.offsetHeight);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(body.offsetWidth, body.offsetHeight);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  //image(video, 0, 0, width, height);
  background('black');

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
    // save the output to the hands variable
    hands = results;
    //console.log(results)
    handDetails = {
        firsthand: results[0]?.handedness,
        secondhand: results[1]?.handedness

    }
    console.log(results[0]?.handedness);

    fingerDetails = {
        firstindex: results[0]?.index_finger_tip.x,
       secondindex: results[1]?.index_finger_tip.x
    }
    //console.log(results[0]?.index_finger_tip.x);
    htmlText.innerText = "Hand 1: "+handDetails.firsthand;
    htmlText2.innerText = "Hand 2: " + handDetails.secondhand;
    htmlText3.innerText = "Index Finger 1 Location: "+fingerDetails.firstindex;
    htmlText4.innerText = "Index Finger 2 Location: "+fingerDetails.secondindex;
}
