bagreader = rosbagreader("file.bag")
pcbag = select(bagreader,...
    Time=[bagreader.StartTime, bagreader.EndTime],...
    Topic='/ouster/points')
nearir = select(bagreader,...
    Time=[bagreader.StartTime, bagreader.EndTime],...
    Topic='/ouster/nearir_image')
msgStructsBase = readMessages(pcbag,'DataFormat','struct');

gTruthBush = load("groundTruth.mat").gTruth

%%

labelData = gTruthBush.LabelData
start = 0;
stop = size(labelData);
stop = stop(1);
halt = stop
for i=1:stop
    length = size(labelData.labelName{i});
    length = length(1);
    if length ~= 0
        halt = i
    end
    length_backwards = size(labelData.labelName{stop - i + 1});
    length_backwards = length_backwards(1)
    if length_backwards ~= 0
        start = stop - i + 1
    end
end

%%

training_data = []
training_data{halt - start, 2} = []

for i=start:halt
    msgStructs = msgStructsBase{i};
    xyz = rosReadXYZ(msgStructs);
    intensity = rosReadField(msgStructs, "intensity");
    ptCloud = pointCloud(xyz,'Intensity',double(intensity));
    filename = "p_clouds_i/p_cloud_" + i + ".pcd"
    pcwrite(ptCloud, filename)
    training_data{i - 1521, 1} = filename;
    table = timetable2table(gTruthBush.LabelData);
    cell = table(i,"bush").bush{1};
    training_data{i - 1521, 2} = cell;
end

training_data = cell2table(training_data,...
    "VariableNames",["files", "label_name"])

%%

classNames = "label_name";
% anchorBoxes variable should be assigned a 2 x 5 array with format
% [length width height zcenter yaw; length width height zcenter yaw]
anchorBoxes = {[]};
pcRange = [0,69.12,-39.68,39.68,-5,5];
range = [min(cell2mat(xmins)), max(cell2mat(xmaxes)), min(cell2mat(ymins)), max(cell2mat(ymaxes)), min(cell2mat(zmins)), max(cell2mat(zmaxes))];
voxSize = [0.16,0.16];
    detector = pointPillarsObjectDetector(pcRange,classNames,anchorBoxes,...
        VoxelSize=voxSize);

options = trainingOptions("adam",...
    Plots="none",...
    MaxEpochs=5,...
    MiniBatchSize=1,...
    GradientDecayFactor=0.9,...
    SquaredGradientDecayFactor=0.999,...
    InitialLearnRate=0.0002,...
    LearnRateDropPeriod=15,...
    LearnRateDropFactor=0.8,...
    ExecutionEnvironment="cpu",...+
    DispatchInBackground=false,...
    BatchNormalizationStatistics="moving",...
    ResetInputNormalization=false);

[detector,info] = trainPointPillarsObjectDetector(training_data,detector,options);

%%

% assign index of point cloud you wish to perform detection on to num
num = 1;
% assign threshold to threshold
threshold = 0.45;
msgStructs = msgStructsBase{num};
xyz = rosReadXYZ(msgStructs);
intensity = rosReadField(msgStructs, "intensity");
ptCloud = pointCloud(xyz,'Intensity',double(intensity));
[bboxes,~,~] = detect(detector, ptCloud, threshold=threshold);

figure
ax = pcshow(ptCloud.Location);
showShape("cuboid",bboxes,"Parent",ax,"Opacity",0.1,"Color","green","LineWidth",0.5)
hold on
zoom(ax,2.5)