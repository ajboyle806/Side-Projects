This folder contains code from a stable version of PetFindr, a pet adoption app I had been working on to improve my abilities with React before taking on Coderverse.

Notable Code Snippet:
src/Pets.js Lines 701-826

This code snippet showcases how the Pets page of the adoption app is rendered. Notably, it contains everything within a styled app object and displays available pets to the user based on characteristics they designate within dropdowns. As seen, the dropdowns are abstractly generated with react-select components and are linked to functions that update the state such that changes to them will be reflected within the showcased list of pets. To that end, information tiles about dogs are procedurally generated from a filtered list that is mapped over, such that any amount of pets can be accommodated by the app. I chose to discuss this code snippet, as I felt it best showcased how I used React to allow for compact, variable-based generation of visual components.

