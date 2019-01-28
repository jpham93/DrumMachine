
///// Plain JS /////

//list of alternative sounds stored in one object. IDs of element will be used to access alt sounds.
//Second value is original sound (for switching back)
//Nested within the deepest level, is the audio file name and display name for the sound effect
var altSounds = {
  'Q' : [['http://freesound.org/data/previews/128/128794_2301351-lq.mp3','Chord 1'], ['http://freesound.org/data/previews/13/13750_32468-lq.mp3', 'Snare']],
  'W' : [['http://freesound.org/data/previews/4/4197_7740-lq.mp3', 'Chord 2'], ['http://freesound.org/data/previews/209/209875_3797507-lq.mp3', 'Tom 1']],
  'E' : [['http://freesound.org/data/previews/176/176482_3172867-lq.mp3', 'Piano A6'], ['http://freesound.org/data/previews/102/102797_480691-lq.mp3', ' Tom 2']],
  'A' : [['http://freesound.org/data/previews/176/176446_3172867-lq.mp3', 'Piano B6'], ['http://freesound.org/data/previews/244/244115_736471-lq.mp3', 'Tom 3']],
  'S' : [['http://freesound.org/data/previews/176/176443_3172867-lq.mp3', 'Piano C6'] , ['http://freesound.org/data/previews/13/13250_36719-lq.mp3', 'Ride Cymbal']],
  'D' : [['http://freesound.org/data/previews/176/176518_3172867-lq.mp3', 'Piano D6'], ['http://freesound.org/data/previews/70/70057_321967-lq.mp3', 'Crash Bell']],
  // can't add anymore properties or it won't work for some reason
};

//Couldn't intialize the rest of key-value pairs in original object.
//Work Around...
altSounds['Z'] = [['http://freesound.org/data/previews/176/176524_3172867-lq.mp3', 'Piano E6'], ['http://freesound.org/data/previews/385/385944_1743037-lq.mp3', 'Bass Kick']];
altSounds['X'] = [['http://freesound.org/data/previews/176/176499_3172867-lq.mp3', 'Piano F6'], ['http://freesound.org/data/previews/0/802_797-lq.mp3', 'Hi-Hat 1']];
altSounds['C'] = [['http://freesound.org/data/previews/176/176468_3172867-lq.mp3', 'Piano G6'], ['http://freesound.org/data/previews/103/103611_1755605-lq.mp3', 'Hi-Hat 2']];


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
  $('html').keypress(function (e, f) {

    //Code to match keypress and button click
    const unicode = e.which;   // minus 32 to get to capitalized characters 

    //Work around for powerToggle. The above original toggle
    //does not disable keypress
    console.log(unicode)

    if(document.getElementById('powerToggle').checked) {

      switch (unicode) {

        case 81:
          $('#sound-1').click();
          break;

        case 87:
          $('#sound-2').click();
          break;

        case 69:
          $('#sound-3').click();
          break;

        case 65:
          $('#sound-4').click();
          break;

        case 83:
          $('#sound-5').click();
          break;

        case 68:
          $('#sound-6').click();
          break;

        case 90:
          $('#sound-7').click();
          break;

        case 88:
          $('#sound-8').click();
          break;

        case 67:
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