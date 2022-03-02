let height = 720;
let width = 1024;

const {PingPongDelay } =("tone");

let slider;
const synth = new Tone.FMSynth();
const drum = new Tone.AMSynth();
const metal = new Tone.Synth({
	"frequency"  : 45 ,
	"envelope"  : 
  {
		"attack"  : 0.001 ,
		"decay"  : 0.004 ,
		"release"  : 0.02
	}  ,
	"harmonicity"  : 8.5 ,
	"modulationIndex"  : 40 ,
	"resonance"  : 3 ,
	"octaves"  : 1
});
const reverb = new Tone.JCReverb(0.4).toDestination();
synth.connect(reverb);
drum.connect(reverb);
metal.connect(reverb);

const pingPong = new Tone.PingPongDelay().toDestination(
  {
  "delayTime": "4n",
  "feedback": 0.2,
  "wet": 0.5
  });



synth.connect(pingPong);


let notes = 
{
  'a': 'C5',
  's': 'D5',
  'd': 'E5',
  'f': 'F5',
  'g': 'G5',
  'h': 'A5',
  'j': 'B5',
  'k': 'C6'
}



function setup() 
{
  createCanvas(width, height);

  synth.release = .002;
  synth.resonance = 0.08;

  slider = new Nexus.Slider('#slider');
  slider.on('change', ()=>
  {
    pingPong.delayTime.value = slider.value;
  })
}

function draw() 
{
  background(220);
  textSize(20);
  textAlign(CENTER);
  text("Sam Nguyen's Synth", width / 2, 20);
  text(" Press", width / 2, 40);
  text("A S D F G H J K", width / 2, 60);
}

function keyPressed() 
{
  let toPlay = notes[key];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay, 0.05);

  drum.triggerAttackRelease("C6", "8n", '+.25');
  metal.triggerAttackRelease("C1", "8n");
}