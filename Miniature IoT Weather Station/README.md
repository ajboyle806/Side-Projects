This folder contains code I wrote for a miniature IoT weather station for a hack-a-thon. It is not a greatly substantial project considering the time limit, though led me to pursue more interests revolving around IoT.

Notable Code Snippet:
Display.m Lines 128-157

This code snippet is used to update a live heat index graph within MATLAB which is a component of a larger GUI that illustrates weather data recorded by a variety of sensors connected to a Particle Boron development board. First, necessary data was retrieved through webhooks I configured with the Particle Boron’s temperature and humidity sensors (128), and following this, the data was manipulated to calculate the heat index (130-141). Following this, the data is added to the mentioned live Heat Index graph, and the bounds and styles of the graph are adjusted for aesthetics' sake and the update is committed (142-157).

I chose to describe this code snippet, as I felt it demonstrated how this project integrated a GUI with a separate physical system and configured webhooks through data analysis and visualization within MATLAB.


