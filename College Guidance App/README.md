This folder contains code from a stable version of US College Searcher, which was the first React app I made, and had the goal of helping students find higher education schools relvant to them.

Notable Code Snippet:
src/Routes/Find.js Lines 179-249

This code snippet showcases how the colleges that are found to be a partial match with the stats and interests of an app user are rendered to be suggested to them. First, a custom reorder function is used to split these schools into safeties, targets, and reaches and return a sorted concatenated list of the three types. Then, this list is iterated to procedurally generate school tiles that showcase details such as school name and location. Notably, styles such as color are configured to correspond with the school type and a “Save College” button is attached to the tiles which will save the college to the user's profile for later viewing if they have not already. I felt like discussing this code snippet as I believe it best showcases how the app intends to match students with schools that might be relevant to them in an engaging manner.
