# Müvie Haus

You have just been hired by a small independent movie house, appropriately named - Müvie Haus. 

## Problem

Müvie Haus's owner, Gerard Von Schtieffel, needs a way of creating informative posters to display on his cinema's website for each movie that is playing.

When Mr. Schtieffel visits his movie management app, he is directed to
a landing page that lists all of the movies currently playing in his
theater. These movies should be stored in his own database, with all
their relevant information, including show times.

Each movie listing on the index (landing) page contains a **title**
and **list of playing times**. Clicking on a movie will direct the
user to the show page for that particular movie. Additionally, each
movie in the list has two buttons: "Delete", and "Update Movie".

Clicking on one of the movies listed on the landing page will result
in the user being taken to a more detailed description of the movie,
including:

 - The movie poster (use width and height to make it fit well on the
 page). ps - sometimes the link doesn't work :$
 - The title of the movie
 - the year
 - the rating
 - the director
 - a list of actors
 - the plot
 - the show times for the movie

At the bottom of this landing page there should also be a text field and a Search button. When the Mr. Schtieffel clicks the Search button, the server will hit up the OMDB API and search for a movie by the title entered in the text field.  The server will then render a template with all the results (assuming the movie exists).  For each result, show:

 - The movie poster (use width and height to make it fit well on the page).
 - The title of the result
 - The year
 - an input text field which allows the user to input the show times.
 - an "Add Movie" button that allows you to add this new movie to your
   personal collection of movies running in your theater. 

The page should also have a "Cancel" button that returns the user to the original landing page

If the "Add Movie" button is clicked, info is submitted via a POST request and the appropriate movie will be added to the collection. Confirmation of this action is given by returning the user to the original landing page.

*Note*: Note that if you see the information required to be displayed in
 the movie show page is more than the information required to be
 displayed on the search page (f.e. the director). You will have to
 make another request to OMBD to get all the required information.

(*HINT*: HTML form hidden fields)


## Approach

1. This project has a lot of moving parts. Make sure you break it down and
make wireframes so that you are aware of what each page should look
like and which buttons hit which routes on your server.
2. You can approach the problem from many directions. Here are
possible high - level steps to follow
  - Design your ERDs, create your schema file and create the database. Seed it with some dummy
  data
  - Setup a new express app, and create all the REST routes as a
  separate router.
  - Create files for all of the views you will need, with some dummy
  HTML and render them from the correct routes.
  - Hook up postgres to the express application through a separate
  file.
  - Start with the index page and render the placeholder information
  you seeded you database with.
  - Build the delete functionality
  - Build the edit view and allow it to edit information in your
  database
  - Build the search field and build the route which queries the omdb
  database
  - Build a view for the results page
  - Implement the create route which is hit by the buttons on the
  results page

## Bonus

1. Allow Mr. Schtieffel to select multiple movies and add them all at
ones to his database with one click
2. Make you application look good
3. Allow Mr. Schtieffel to maintain and display a collection of movies for all of his theaters. Instead of landing on a list of movies, create a landing page that maintains a list of theaters. Each theater should maintain a collection of movies in a similar manner. 
