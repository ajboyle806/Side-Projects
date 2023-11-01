bagreader = rosbagreader("file.bag")
pcbag = select(bagreader,...
    Time=[bagreader.StartTime, bagreader.EndTime],...
    Topic='/ouster/points')
msgStructsBase = readMessages(pcbag,'DataFormat','struct');
disp("Loaded!")

dims = size(msgStructsBase)
length = size_a(1)
scan_list = {}
scan_list{length} = []

for i=1:size(msgStructsBase)
    disp(i);
    msgStructs = msgStructsBase{i};
    intensity = rosReadField(msgStructs, "intensity");
    xyz = rosReadXYZ(msgStructs);
    rgb = repmat(intensity,1,3);
    disp(class(double(intensity)));
    ptCloud = pointCloud(xyz,"Color",rgb,'Intensity',double(intensity));
    scan = pc2scan(ptCloud);
    ranges = double(scan.Ranges);
    angles = double(scan.Angles);
    scan_list{i} = lidarScan(ranges, angles);
end

maxLidarRange = 30;
mapResolution = 20;
frequency = 25;

slamAlg = lidarSLAM(mapResolution, maxLidarRange);
slamAlg.LoopClosureThreshold = 350;  
slamAlg.LoopClosureSearchRadius = 30;

for i=1:size(msgStructsBase)
    if mod(i, frequency) == 0
        disp(scan_list{i})
        [isScanAccepted, loopClosureInfo, optimizationInfo] = addScan(slamAlg, scan_list{i});
        if isScanAccepted
            fprintf('Added scan %d \n', i);
        end
        if optimizationInfo.ResidualError > 1e-02 & optimizationInfo.IsAccepted
            removeLoopClosures(slamAlg,loopClosureInfo.EdgeIDs);
            temp = optimizePoseGraph(slamAlg.PoseGraph);
            slamAlg.PoseGraph.updatePoseGraph(temp);
        end
    end
end

figure
show(slamAlg)