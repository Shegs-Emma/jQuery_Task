$(document).ready(function(){
    // 1. When the DOM is ready, console.log the message "Let's get ready to party with jQuery!"
    console.log('Lets get ready tp party with jquery!');

    // 2. Give all images inside of an article tag the class of image-center (this class is defined inside of the style tag in the head).
    $('article').find('img').eq(0).addClass('image-center');
    
    // 3. Remove the last paragraph in the article.
    $('article').find('p').eq(5).remove();

    // 4. Set the font size of h1 with an id of title to be a random pixel size from 0 to 100.
    let randomFig = Math.floor(Math.random() * 100);
    $('#title').css('font-size', randomFig);

    // 5. Add an item to the list; it can say whatever you want.
    let $newListItem = $('<li>', {
        text: 'Boo of the Booless on Repeat!!'
    });
    $('ol').append($newListItem);

    // 6. Scratch that; the list is silly. Empty the aside and put a paragraph in it apologizing for the list's existence.
    let $newPara = $('<p>', {
        text: 'Sorry for creating that list, silly of me!',
        css: {
            color: 'red'
        }
    });
    $('aside').empty();
    $('aside').append($newPara);

    // 7. When you change the numbers in the three inputs on the bottom, the background color of the body should change to match whatever
    // the three values in the inputs are.
    let $inputChildren = $('.row').find('div').children();
    
    $('.row').find('div').on('change', 'input', function(){
        let red = $inputChildren.eq(0).val();
        let blue = $inputChildren.eq(1).val();
        let green = $inputChildren.eq(2).val();

        $('body').css('background-color', 'rgb('+red+','+green+','+blue+')');
    });

    // 8. Add an event listener so that when you click on the image, it is removed from the DOM.
    $('img').on('click', function(){
        $('img').remove();
    });
});


