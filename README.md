# Gathr

Host, Plan, Gather your next event!

**Gathr** is a single-page application that helps groups of friends and small communities organize and manage events.

# Description

Event hosts can create events, ask guests to bring items, keep track of Event dates, and see who RSVPs.  Attendees can respond to invites without even creating an account.

Gathr is built with the MERN stack framework, using Nodejs, MongoDB, Express.js, and React.js.  Supporting technologies are Mongoose (ODM), Apollo graphQL, React Bootstrap, and npm packages jsonwebtoken and concurrently.  The db is hosted by MongoDB Atlas and the 

# How to Use

Visit the [deployed Gathr application](https://gathr.herokuapp.com/) hosted by Heroku.

Create a user account using the signup page linked to from the home page.  After your account is created, you will have access to your dashboard through "My Events", which lists your current and upcoming events.  From the homepage or the dashboard, you can click Create an Event to reach the new Event form.

When creating an event, supply an Event name, date, and description.  Supply time and address information in the description field.  In the items field, make a comma-separated list of things you would like your guests to bring.  For example, "party hats, whistles, kazoos" will make a request for party hats, whistles, and kazoos.

After creating an event, you will be at your dashboard list of events.  Click the new event to go to its event details page.  On the events page, a logged-in host can update the event details (name, date, description) and add additional item requests, or delete the event.

When a user who is not logged in views an event page, they will be able to submit an RSVP to that event.

# Technologies Used

- React.js
- Node.js
- ExpressJS
- MongoDB
- React Bootstrap
- Apollo GraphQL
- Mongoose (ODM)

## Additional npm packages

- concurrently
- jsonwebtoken

# Collaborators

Gathr was developed by [Rob Benney](github), [SD](), [SK](), and [TR]()