// Build a list page where users can add and rate examples from a category (e.g. movies, albums, or sports). 
// This page should include the following:
// A form, where you can add something to the list and rate it.
// A table of all of the things you've added.
// A delete button for each row of the table that lets you remove elements from the list.
// BONUS: a sorting feature, so you can sort entries in the table by their title or their rating. (To implement this you 
// may need to research JavaScript's sort method.)


$(document).ready(function(){
    var GenRandom =  {

        Stored: [],
    
        Job: function(){
            var newId = Date.now().toString().substr(6); // or use any method that you want to achieve this string
    
            if( this.Check(newId) ){
                this.Job();
            }
    
            this.Stored.push(newId);
            return newId; // or store it in sql database or whatever you want
    
        },
    
        Check: function(id){
            for( var i = 0; i < this.Stored.length; i++ ){
                if( this.Stored[i] == id ) return true;
            }
            return false;
        }
    
    };

    // Task Class Declaration
    class Movie{
        constructor(movieTitle, movieRating, movieID){
            this.movieTitle = movieTitle,
            this.movieRating = movieRating,
            this.movieID = movieID
        }
    };

    // Store Class: To Handle My storage
    class Store {
        static getMovies() {
            let movies;
            if(localStorage.getItem('movies') === null){
                movies = [];
            } else {
                movies = JSON.parse(localStorage.getItem('movies'));
            }
            return movies;
        };

        static addMovie(movie) {
            const movies = Store.getMovies();

            movies.push(movie);

            localStorage.setItem('movies', JSON.stringify(movies));
        };

        static deleteMovie($el){
            const movies = Store.getMovies();

            if($el.hasClass('delete')){
                let element = $el.parent().prev().attr('id');
                console.log(element);
                movies.forEach((movie, index) => {
                    if(movie.movieID == element){
                        movies.splice(index, 1);
                    }
                });
                localStorage.setItem('movies', JSON.stringify(movies))
            }
        };
    };


    //UI Class Declaration
    class UI{
        static displayMovies(){
            const movies = Store.getMovies();

            movies.forEach((movie) => UI.addMovieToList(movie))
        }

        static addMovieToList(movie){
            let $tableBody = $('tbody');

            // Create the table row that will contain all my stuff
            let $myTableRow = $('<tr>');

            // Create the title element
            let $myTitleRow = $('<td>');
            $myTitleRow.addClass('titleItems text-info');
            $myTitleRow.attr('id', movie.movieID);

            // Create the ratings element
            let $myRatingRow = $('<td>');
            $myRatingRow.addClass('ratingItems text-info');
            $myRatingRow.attr('id', movie.movieID);

            // Validate the Input
            if(movie.movieTitle === '' || movie.movieRating === ''){
                showAlert('Please Fill the Input', 'danger');
            } else {
                $myTitleRow.text(movie.movieTitle);
                if(movie.movieRating >= 0 && movie.movieRating <= 10){
                    $myRatingRow.text(movie.movieRating);

                     // Create the icon
                    let $deleteIcon = $('<td>');
                    $deleteIcon.html('<button type="button" class="btn btn-danger delete">Delete</button>');
                    
                    // Attachment time!!
                    $myTableRow.append($myTitleRow);
                    $myTableRow.append($myRatingRow);
                    $myTableRow.append($deleteIcon);

                    $tableBody.append($myTableRow);
                } else {
                    showAlert('Your rating MUST be between 0 and 10', 'danger');
                };
            };
        };

        static deleteMovie($el){
            if($el.hasClass('delete')){
                $el.parent().parent().remove();
                showAlert('Movie deleted successfully', 'danger');
            };
        };

        static clearField(){
            $('#title').val('');
            $('#rating').val('');
        }
    };

    // Event: Display Books THE VERY IGNITION OF THE CODE
    UI.displayMovies();

    // Event Add a Task
    $('#myForm').on('submit', (e) => {
        e.preventDefault();

        // Target the new task div
        let $myMovieTitle = $('#title').val();
        let $myMovieRating = $('#rating').val();
        let movieID = GenRandom.Job();

        // Instatiate a Task
        const movie  = new Movie($myMovieTitle, +$myMovieRating, movieID);

        // Add Task to the UI
        UI.addMovieToList(movie);

        // Add Task to Local storage
        Store.addMovie(movie);

        // Clear the UI
        UI.clearField();
    });


    // Event Delete a Task
    $('section').on('click', (e) => {
        // Remove Task from UI
        UI.deleteMovie($(e.target));

        // Remove Task from Storage
        Store.deleteMovie($(e.target));
    });


    // Sorting Handlers
    $('.myCols').on('click', function(){
        let $tableBody = $('tbody');
        $tableBody.html('');

        var text = $(this).html();
        text = text.substring(0, text.length -1);

        let movies = Store.getMovies();

        var column = $(this).data('column');
        var order = $(this).data('order');

        if(order == 'desc'){
            $(this).data('order', 'asc');
            movies = movies.sort((a, b) => a[column] > b[column] ? 1 : -1);
            text += '&#9650'
        } else {
            $(this).data('order', 'desc');
            movies = movies.sort((a, b) => a[column] < b[column] ? 1 : -1);
            text += '&#9660'
        }

        $(this).html(text);
        movies.forEach((movie) => UI.addMovieToList(movie));
        
    });

    

    // The show alert function
    function showAlert(message, className){
        let $alertDiv = $('<div>');
        $alertDiv.addClass('alert alert-'+className);
        $alertDiv.append(document.createTextNode(message));

        let $myArticle = $('article');

        $myArticle.prepend($alertDiv);

        // Disappear in 2 seconds
        setTimeout(() => $('.alert').remove(), 2000);
    };
})