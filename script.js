
///// Plain JS /////

//list of alternative sounds stored in one object. IDs of element will be used to access alt sounds.
//Second value is original sound (for switching back)
//Nested within the deepest level, is the audio file name and display name for the sound effect
var altSounds = {
  'Q' : [['chord1.wav','Chord 1'], ['snare.wav', 'Snare']],
  'W' : [['chord2.wav', 'Chord 2'], ['tom1.wav', 'Tom 1']],
  'E' : [['a6.mp3', 'Piano A6'], ['tom2.wav', ' Tom 2']],
  'A' : [['b6.mp3', 'Piano B6'], ['tom3.wav', 'Tom 3']],
  'S' : [['c6.wav', 'Piano C6'] , ['ride.wav', 'Ride Cymbal']],
  'D' : [['d6.wav', 'Piano D6'], ['bell.wav', 'Crash Bell']],
  // can't add anymore properties or it won't work for some reason
};

//Couldn't intialize the rest of key-value pairs in original object.
//Work Around...
altSounds['Z'] = [['e6.wav', 'Piano E6'], ['kick.wav', 'Bass Kick']];
altSounds['X'] = [['f6.mp3', 'Piano F6'], ['hi-hat1.wav', 'Hi-Hat 1']];
altSounds['C'] = [['g6.mp3', 'Piano G6'], ['hi-hat2.wav', 'Hi-Hat 2']];


/////// jQuery ///////

$('document').ready( function() {

  //start with all buttons disabled
  $(':button').prop('disabled', true);
  $('input[id="setToggle"]').prop('disabled', true);


  //handles power switch
  $('#powerToggle').click( function (e) {

    if (document.getElementById('powerToggle').checked) {

      $(':button').prop('disabled', false);
      $('input[id="setToggle"]').prop('disabled', false);

    } else {

      $(':button').prop('disabled', true);
      $('input[id="setToggle"]').prop('disabled', true);
      $('#display').text('');

    }

  });

  //Master Volume Control
  $('#volume').change( function (e) {

    let vol = document.getElementById('volume').value;
    vol /= 100;

    $('audio').prop('volume', vol);

  });

  //Handles key presses and clicks the associated button
  $('html').keypress(function (e) {

    //Code to match keypress and button click
    let unicode = e.which;


    //Work around for powerToggle. The above original toggle
    //does not disable keypress

    if(document.getElementById('powerToggle').checked) {

      switch (unicode) {

        case 113:
          $('#sound-1').click();
          break;

        case 119:
          $('#sound-2').click();
          break;

        case 101:
          $('#sound-3').click();
          break;

        case 97:
          $('#sound-4').click();
          break;

        case 115:
          $('#sound-5').click();
          break;

        case 100:
          $('#sound-6').click();
          break;

        case 122:
          $('#sound-7').click();
          break;

        case 120:
          $('#sound-8').click();
          break;

        case 99:
          $('#sound-9').click();
          break;

        default:
          return;

      }

    }

  });

  //to handle button clicks for each instrumental sound
  $('button').click( function (e) {

    //prevent default action to take place when clicking button
    e.preventDefault();

    //finds the audio child element of sound element and converts to DOM element
    let soundElement = $(this).find('audio').get(0);

    //if setToggle is active, change associated keys to that sound
    //also changes text in box
    if(document.getElementById('setToggle').checked) {

      $(soundElement).attr('src', altSounds[soundElement.id][0][0]);
      $('#display').text(altSounds[soundElement.id][0][1]);

    } else { //Changes back to the original src value

      $(soundElement).attr('src', altSounds[soundElement.id][1][0]);
      $('#display').text(altSounds[soundElement.id][1][1]);

    }

    //plays the child audio element of button
    soundElement.play();

  });

});
