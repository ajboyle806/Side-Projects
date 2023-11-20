This folder contains code written and imeplemented to enable functionality of the SPOT framework showcases. Notably, there weren't any documented means of handling the Near IR data recording from the Ouster OS1-32 sensor and transmuting it into rosbag data, so the difficult part of this project wasn't simply writing out the algorithms, but fitting together a significant amount of disconnected functions and methodologies in unconventional means.

Notable Code Snippet:
pointpillars_model_creator.mat Lines 1-53

This code snippet formats raw LiDAR data in the form of a bag file such that it can be leveraged to train a PointPillars object detection model. First, the bag file is read as a ROS message and transmuted into a struct type containing a series of several thousand point clouds (1-8). Following this, the ground truth defined for that file is loaded and iterated over to determine the range of point clouds within the original bag file that have defined ground truth labels (10-30). Following this, the point clouds with defined ground truth are iterated over such that characteristics like 3D coordinates and intensity can be extracted, saved to a file, and later be used as training data to validate with ground truth. Additional data formatting is performed to conform to the requirements of PointPillars algorithms. 

I chose to describe this code snippet as I felt it showcased the manipulations necessary to transform the raw data into usable information within this project.
