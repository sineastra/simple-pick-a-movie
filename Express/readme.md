<p> Not Swagger, and definitely not interactive but I feel some basic documentation would be nice. </p>

<h3> All endpoints follow the same json pattern return with the exception of soft error endpoints (described below) </h3>

- Pattern 1: Endpoint JSON Return Pattern: { "status": string, "statusCode": number, "data": any }
- Pattern 2: Endpoint JSON Soft Errors: {"status": string, "statusCode": number, "softError": boolean, "errors": {"msg": string}[]}

<i>Soft Errors are the way Express tells the SPA: "Hey, there is an error here, but dont break, just show notification" 
e.g.: Wrong username or password/Existing user when logging in</i>
<hr/>

<h3> Url Notes </h3
  
Default port, hardcoded: 3030
  
Base Api Url for requests {baseUrl}: http://localhost:3030/api

Endpoints: 
  - GET
    - User: 
      - {baseUrl}/user/favourites - gets user favourites, user taken from token. --> Returns pattern 1
      - {baseUrl}/user/notes/:movieId - gets user note about movie, user taken from token. --> Returns pattern 1
      - {baseUrl}/user/ratings/:movieId - gets user rating about movie, user taken from token. --> Returns pattern 1
    - Movie: 
      - {baseUrl}/movies?q={SEARCH_QUERY} - gets movies based on search query from https://www.tvmaze.com/api --> Returns pattern 1
      - {baseUrl}/movies/:id - gets movie details from https://www.tvmaze.com/api --> Returns pattern 1
  
   - POST
      - {baseUrl}/user/login - logins user with body: { "name": string, "password": string }, --> Returns pattern 1 or Pattern 2
      - {baseUrl}/user/register - registers user with body: { "name": string, "password": string } then logins them. --> Returns pattern 1 or Pattern 2
      - {baseUrl}/user/favourites/:movieId - adds/removes movie to the user favourites, user taken from token --> Returns pattern 1
      - {baseUrl}/user/notes/:movieId - adds/changes note to the user notes about movie, user taken from token --> Returns pattern 1
      - {baseUrl}/user/ratings/:movieId - adds/changes rating to the user rating about movie, user taken from token --> Returns pattern 1

  - DELETE
    - {baseUrl}/user/logout - logouts user and deletes token.

