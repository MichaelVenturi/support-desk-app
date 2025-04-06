# Support Desk app
A small app utilizing the MERN stack and React Redux, where users can create an account and submit tech support tickets, as well as leave comments.  Built following Traversy Media's React front to back Udemy course from 2023. 
I decided to add TypeScript into the frontend in order to have type safety with all my redux reducers and slices, preventing unwanted errors.  
I also decided to add some additional features of my own, like allowing users to delete their tickets.  
Lastly, I chose to improve on some pitfalls in the course.  I found that the way state was populated from the backend was inefficient, and more API calls were made than necessary.  I reduced those numbers by refactoring components to only make API calls when the data is not already present in state.  This decreases load times on the deployed app, which you can find [here.](https://mventuri-support-desk-app.onrender.com/)
This is just to say that I did not simply listen and code along for this, I actively looked for opportunities to improve the project independently.
