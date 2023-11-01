
  while 1 == 1
    readChannelID = 2071216;
    fieldID1 = 1;
    readAPIKey = '';

    %% Read Data %%
    
    [temp_data, temp_time] = thingSpeakRead(readChannelID, 'Field', fieldID1, 'NumPoints', 30, 'ReadKey', readAPIKey);
    [temp_data_c, temp_time_c] = thingSpeakRead(readChannelID, 'Field', fieldID1, 'NumPoints', 30, 'ReadKey', readAPIKey);
    

    for idx = find(temp_data > -1)
       temp_data(idx) = temp_data(idx) * 9 / 5 + 32;
    end

    M = max(temp_data) + (max(temp_data) - min(temp_data)) * 0.125
    m = min(temp_data) - (max(temp_data) - min(temp_data)) * 0.125

    % Visualize Data %%
    tiledlayout(3,2);
    ax1 = nexttile;
    stairs(ax1, temp_time, temp_data, '-s','MarkerSize',7,...
    'MarkerEdgeColor','#c96928',...
    'MarkerFaceColor','#c96928', 'color', '#802f2f', 'LineWidth', 1.5);
    ylim([m, M])

    ylabel( "Temperature (°F)")
    xlabel( "Time")
    grid on
    grid minor
    title('Room Temperature Over Time')
    drawnow
    
    readChannelID = 2071234;
    fieldID1 = 1;
    readAPIKey = '';
    [humidity_data, humidity_time] = thingSpeakRead(readChannelID, 'Field', fieldID1, 'NumPoints', 30, 'ReadKey', readAPIKey);
    
    M = max(humidity_data) + (max(humidity_data) - min(humidity_data)) * 0.125
    m = min(humidity_data) - (max(humidity_data) - min(humidity_data)) * 0.125
    if M == m
        M = M + 1
        m = m - 1
    end
    ax2 = nexttile;
    stairs(ax2, humidity_time, humidity_data, '-s','MarkerSize',7,...
    'MarkerEdgeColor','#3cabde',...
    'MarkerFaceColor','#3cabde', 'color', '#4f3478', 'LineWidth', 1.5);
    ylim([m, M])
    ylabel( "Humidity (%)")
    xlabel( "Time")
    grid on
    grid minor
    title('Relative Room Humidity Over Time')
    drawnow

    readChannelID = 2071296;
    fieldID1 = 1;
    readAPIKey = '';
    [pressure_data, pressure_time] = thingSpeakRead(readChannelID, 'Field', fieldID1, 'NumPoints', 30, 'ReadKey', readAPIKey);
    
    M = max(pressure_data) + (max(pressure_data) - min(pressure_data)) * 0.125
    m = min(pressure_data) - (max(pressure_data) - min(pressure_data)) * 0.125
    
    ax3 = nexttile;
    stairs(ax3, pressure_time, pressure_data, '-s','MarkerSize',7,...
    'MarkerEdgeColor','#78d943',...
    'MarkerFaceColor','#78d943', 'color', '#327558', 'LineWidth', 1.5);
    ylim([m, M])
    ylabel( "Barometric Pressure (ln. H g)")
    xlabel( "Time")
    grid on
    grid minor
    title('Barometric Pressure Over Time')
    drawnow

    readChannelID = 2071239;
    fieldID1 = 1;
    readAPIKey = '';
    [light_data, light_time] = thingSpeakRead(readChannelID, 'Field', fieldID1, 'NumPoints', 30, 'ReadKey', readAPIKey);
    
    M = max(light_data) + (max(light_data) - min(light_data)) * 0.125
    m = min(light_data) - (max(light_data) - min(light_data)) * 0.125
    
    ax4 = nexttile;
    stairs(ax4, light_time, light_data, '-s','MarkerSize',7,...
    'MarkerEdgeColor','#e075d7',...
    'MarkerFaceColor','#e075d7', 'color', '#75326f', 'LineWidth', 1.5);
    ylim([m, M])
    ylabel( "Light (Lux)")
    xlabel( "Time")
    grid on
    grid minor
    title('Light Over Time')
    drawnow
    
    [dew_point_data, dew_point_time] = thingSpeakRead(readChannelID, 'Field', fieldID1, 'NumPoints', 30, 'ReadKey', readAPIKey);
    
    a = 17.625
    b = 243.04
    for idx = find(dew_point_data > -1000)
        temp = temp_data_c(idx)
        humidity = humidity_data(idx)
        b = 17.62;
        c = 243.5;
        gamma = log(humidity/100) + b*temp./(c+temp);
        dewPoint = c*gamma./(b-gamma)
        dewPointF = (dewPoint*1.8) + 32;
        dew_point_data(idx) = dewPointF
    end 

    M = max(dew_point_data) + (max(dew_point_data) - min(dew_point_data)) * 0.125
    m = min(dew_point_data) - (max(dew_point_data) - min(dew_point_data)) * 0.125

    ax4 = nexttile;
    stairs(ax4, dew_point_time, dew_point_data, '-s','MarkerSize',7,...
    'MarkerEdgeColor','#80e0ed',...
    'MarkerFaceColor','#80e0ed', 'color', ' #368d99', 'LineWidth', 1.5);
    ylim([m, M])
    ylabel( "Dew Point (°F)")
    xlabel( "Time")
    grid on
    grid minor
    title('Dew Point Over Time')
    drawnow

    [head_indx_data, head_indx_time] = thingSpeakRead(readChannelID, 'Field', fieldID1, 'NumPoints', 30, 'ReadKey', readAPIKey);

    for idx = find(head_indx_data > -1000)
        temp = temp_data(idx, 1)
        humidity = humidity_data(idx, 1)
        one = 10.1 * humidity
        two = -0.22 * humidity
        three = -6.84 * 0.001 * temp .* temp
        four = -5.48 * 0.01 * humidity .* humidity
        five = 1.23 * 0.001 * temp .* temp
        six = 8.52 * 0.0001 * temp .* humidity .* humidity
        seven = -1.99 * 0.000001 * temp .* temp .* humidity .* humidity
        head_indx_data(idx) = -42.379 + one + two + three + four + five + six + seven
    end


    M = max(head_indx_data) + (max(head_indx_data) - min(head_indx_data)) * 0.125
    m = min(head_indx_data) - (max(head_indx_data) - min(head_indx_data)) * 0.125

    ax5 = nexttile;
    stairs(ax5, head_indx_time, head_indx_data, '-s','MarkerSize',7,...
    'MarkerEdgeColor','#f0e462',...
    'MarkerFaceColor','#f0e462', 'color', '#a89832', 'LineWidth', 1.5);
    ylim([m, M])
    ylabel( "Heat Index (°F)")
    xlabel( "Time")
    grid on
    grid minor
    title('Heat Index Over Time')
    drawnow

    pause(10)
  end