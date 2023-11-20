This folder contains code from a stable version of Coderverse, the educational youth coding app showcased within my portfolio. 

Notable Code Snippet:
client/src/Challenge.js Lines 857-922

This code snippet is executed when a daily challenge module like the one included is completed. As can be seen, the snippet first defines the present date as a variable (858-864) and then marks the daily challenge’s completion in the user object (865-868). Following this, the user object adds the points earned, accounting for any streak bonus if there is one (869-871). In addition, the points are recorded for the current date, such that the user’s streak and activity calendar are updated on the profile page (873-890). After all of this, local changes are committed to the app’s state (891) and then to the backend through three flask functions that update the user’s profile as well as rankings within the database (892, 905, and 916).

I chose this snippet as it demonstrates connections between the front end and back-end as well as the means through which data is handled within the app (which is secured in accounts with hashed passwords) to ensure consistency between activities, profile information, and rankings.

Notable Files:

/client/src/App.js - Log-in system<br>
/client/src/Learn.js - Home page<br>
/client/src/WevDev.js - Web Development course home<br>
/client/src/Python.js - Python course home<br>
/client/src/Javascript.js - JavaScript course home<br>
/client/src/Lesson_Py_1_2.js - Lesson example<br>
/client/src/Lesson_Py_1_2a.js - Activity example<br>
/client/src/Assistant.js - AI Assistant page<br>
/client/src/Rankings.js - Leaderboard page<br>
/client/src/Profile.js - Profile page<br>
/flask-server/server.py - Back-end script

Note: I am continuing to work on implementing cloud connectivity through AWS and procedurally creating additional lessons/activities on a local development version of this project (presently unstable/in progress)
