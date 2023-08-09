// Ask the User to input their name when the 'Start Game' is clicked
document.querySelector('.control-buttons span').onclick = function () {
    const yourName = prompt('What\'s Your Name?') ;

    if(yourName == null || yourName == '') {
        document.querySelector('.name span').innerHTML = 'Unknown';
    } else {
        document.querySelector('.name span').innerHTML = yourName;
    }
    document.querySelector('.control-buttons').remove();
}

let duration = 1000;

const blocksContainer = document.querySelector('.memory-game-blocks');

// Convert the children of the 'blocksContainer' element into an array of 'blocks'.
const blocks = Array.from(blocksContainer.children);

// Create an array 'orderRange' containing a sequence of numbers from 0 to the length of the 'blocks' array.
const orderRange = [...Array(blocks.length).keys()];

// Shuffle the orderRange Array
shuffle(orderRange);

// Add order CSS property the to blocks
blocks.forEach((block, index) => {
    // shuffle the order of the blocks
    block.style.order = orderRange[index]; 

    // event listener
    block.addEventListener('click', function(){
        flipBlock(block);
    });
});










// Flip Block Function
function flipBlock (selcetedBlock) {
    // Add class (is-flipped) to the selected block
    selcetedBlock.classList.add('is-flipped');

    // Collect all flipped card
    let allFlippedBlockes = blocks.filter(flippedBlock => 
        flippedBlock.classList.contains('is-flipped'));

    // if there are 2 selected blocks 
    if (allFlippedBlockes.length === 2) {
        
        stopClicking();

        checkMatchedBlocks(allFlippedBlockes[0], allFlippedBlockes[1]);
    }
}



// Stop Clicking Function
function stopClicking() {
    // Add class no clicking on main container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        
        // Remove class no Clicking after the duration
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// check Matched Blocks function
function checkMatchedBlocks(firstBlock, secondBlock) {

    const triesElement = document.querySelector('.tries span');
    let triesCount = 0;

    // Get the values of Data-images attributes
    const firstData = firstBlock.dataset.image;
    const secondData = secondBlock.dataset.image;

    if(firstData === secondData) {

        // Remove is-flipped class
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        // Add has-match class
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        // play the success sound
        document.getElementById('success').play();
    } else {

        // increase the wrong tries by one
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        // play the failure sound
        document.getElementById('failure').play();

        // Wait 1 second so the user can see the difference between the 2 blocks befpre removing the is.flipped class
        setTimeout(() => {
            // Remove is-flipped class
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');           
        }, duration);

    }
}



// function to shuffle array
function shuffle(array) {
    // Setting variables
    let current = array.length;
    let temp, random;

    while (current > 0) {
        // Get random element
        random = Math.floor(Math.random() * current);

        // Decrease the length by one 
        current--;

        // Swap elements to shuffle the array
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}
