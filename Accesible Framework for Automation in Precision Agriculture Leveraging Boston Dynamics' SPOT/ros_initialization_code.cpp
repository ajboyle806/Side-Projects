- - Initializing ROS Core - -

roscore
rosrun rviz rviz

- - Initializing Ouster Sensor - -

cd '/home/spot/rosmelodic_u18'
source catkin_ws/devel/setup.bash

- - Entering Record Mode - - 

roslaunch ouster ros record.launch
    sensor hostname:=<Host IP>
lidar_port:=7502 \
imu_port: =7503 \
    metadata:=/home/spot/lidarbag_testing/cornwalk
    bag_file:=/home/spot/lidarbag_testing/cornwalk
roslaunch ouster ros replay. launch
    metadata: =/home/spot/lidarbag_testing/labjson1
    bag_file:=/home/spot/lidarbag_testing/labbag1
roslaunch ouster ros sensor. launch sensor hostname:=<Host IP>
    lidar_port:=7502 \
imu_port:=7503 \
    metadata:=/home/spot/lidarbag_testing/get
    bag_file:=/home/spot/lidarbag_ _testing/get

- - Recording with ROS - -

rostopic list
rosbag record -a
rosbag record /ouster /points \
/ouster/points2 \
/ouster/imu
rosbag play