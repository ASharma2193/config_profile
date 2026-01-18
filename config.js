// config.js - Complete Config Profile Management Application
const fs = require('fs');
const path = require('path');

// Function to generate the entire HTML content
function generateHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Config Profiles Management</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            color: #333;
            min-height: 100vh;
        }
        
        /* Header Styles */
        .header {
            background-color: #6245d9;
            color: white;
            padding: 20px 25px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-weight: 700;
            font-size: 22px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .logo i {
            font-size: 24px;
        }
        
        /* Main Content Styles */
        .main-content {
            padding: 25px;
            max-width: 1600px;
            margin: 0 auto;
        }
        
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .page-title {
            font-size: 24px;
            font-weight: 600;
            color: #333;
        }
        
        .btn {
            padding: 10px 20px;
            border-radius: 6px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
        }
        
        .btn-primary {
            background-color: #6245d9;
            color: white;
        }
        
        .btn-primary:hover {
            background-color: #5238c9;
        }
        
        .btn-secondary {
            background-color: #f0f0f0;
            color: #333;
        }
        
        .btn-secondary:hover {
            background-color: #e0e0e0;
        }
        
        .btn-sm {
            padding: 6px 12px;
            font-size: 14px;
        }
        
        .btn i {
            margin-right: 8px;
        }
        
        /* Table Styles */
        .table-container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            margin-top: 20px;
            overflow-x: auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 1200px;
        }
        
        thead {
            background-color: #6245d9;
            color: white;
        }
        
        th {
            padding: 18px 15px;
            text-align: left;
            font-weight: 600;
            font-size: 15px;
        }
        
        tbody tr {
            border-bottom: 1px solid #eee;
        }
        
        tbody tr:hover {
            background-color: #f9f9f9;
        }
        
        td {
            padding: 16px 15px;
            color: #555;
            vertical-align: top;
        }
        
        .action-buttons {
            display: flex;
            gap: 10px;
        }
        
        .btn-edit {
            color: #6245d9;
            background-color: rgba(98, 69, 217, 0.1);
        }
        
        .btn-delete {
            color: #e74c3c;
            background-color: rgba(231, 76, 60, 0.1);
        }
        
        /* Command Set Styles - Modified for black text */
        .command-set {
            max-width: 400px;
        }
        
        .command-tag {
            display: block;
            background-color: #f8f9fa;
            color: #333;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            margin: 4px 2px;
            border-left: 3px solid #6245d9;
            font-family: 'Courier New', monospace;
        }
        
        /* Config Set Styles */
        .config-set {
            max-width: 250px;
        }
        
        .config-tag {
            display: block;
            background-color: #f0f7ff;
            color: #333;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            margin: 4px 2px;
            border-left: 3px solid #34c759;
        }
        
        /* Form Styles */
        .form-container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            padding: 30px;
            max-width: 900px;
            margin: 20px auto 0;
        }
        
        .form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .form-title {
            font-size: 20px;
            font-weight: 600;
            color: #333;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #555;
        }
        
        .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 15px;
            transition: border 0.3s;
        }
        
        .form-control:focus {
            border-color: #6245d9;
            outline: none;
        }
        
        select.form-control {
            cursor: pointer;
        }
        
        .radio-group, .checkbox-group {
            display: flex;
            gap: 20px;
            margin-top: 8px;
        }
        
        .radio-option, .checkbox-option {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .checkbox-options {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 8px;
        }
        
        .manual-command {
            margin-top: 10px;
            display: none;
        }
        
        .manual-command.active {
            display: block;
        }
        
        .prf-options {
            margin-top: 10px;
            display: none;
        }
        
        .prf-options.active {
            display: block;
        }
        
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        
        .form-row {
            display: flex;
            gap: 20px;
        }
        
        .form-col {
            flex: 1;
        }
        
        /* Utility Classes */
        .hidden {
            display: none !important;
        }
        
        .text-center {
            text-align: center;
        }
        
        .empty-state {
            padding: 50px 20px;
            color: #888;
        }
        
        .empty-state i {
            font-size: 40px;
            margin-bottom: 15px;
            color: #ccc;
        }
        
        .info-text {
            font-size: 12px;
            color: #666;
            margin-top: 4px;
        }
        
        .sensor-info {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: 6px;
            margin-top: 10px;
            font-size: 13px;
        }
        
        .sensor-info strong {
            color: #6245d9;
        }
        
        .command-info {
            background-color: #f0f7ff;
            padding: 10px;
            border-radius: 6px;
            margin-top: 5px;
            font-size: 12px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="logo">
            <i class="fas fa-sliders-h"></i>
            Config Profiles Management
        </div>
    </div>
    
    <!-- Main Content Area -->
    <div class="main-content">
        <!-- Table View -->
        <div id="tableView">
            <div class="page-header">
                <h1 class="page-title">Config Profiles</h1>
                <button class="btn btn-primary" id="createProfileBtn">
                    <i class="fas fa-plus-circle"></i> Create Profile
                </button>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>PROFILE NAME</th>
                            <th>ACCOUNT NAME</th>
                            <th>DEVICE TYPE</th>
                            <th>CONFIGURATIONS</th>
                            <th>COMMAND SET</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody id="profilesTableBody">
                        <!-- Table rows will be populated by JavaScript -->
                    </tbody>
                </table>
                
                <div id="emptyState" class="empty-state hidden">
                    <i class="fas fa-sliders-h"></i>
                    <h3>No Config Profiles Found</h3>
                    <p>Create your first config profile to get started.</p>
                </div>
            </div>
        </div>
        
        <!-- Create/Edit Form View -->
        <div id="formView" class="hidden">
            <div class="form-header">
                <h2 class="form-title" id="formTitle">Create Config Profile</h2>
                <button class="btn btn-secondary" id="backToListBtn">
                    <i class="fas fa-arrow-left"></i> Back to List
                </button>
            </div>
            
            <div class="form-container">
                <form id="configProfileForm">
                    <div class="form-row">
                        <div class="form-col">
                            <div class="form-group">
                                <label for="profileName">Config Profile Name *</label>
                                <input type="text" id="profileName" class="form-control" placeholder="Enter profile name" required>
                            </div>
                        </div>
                        <div class="form-col">
                            <div class="form-group">
                                <label for="accountName">Account Name *</label>
                                <input type="text" id="accountName" class="form-control" placeholder="Enter account name" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-col">
                            <div class="form-group">
                                <label for="deviceType">Device Type *</label>
                                <select id="deviceType" class="form-control" required>
                                    <option value="BSFlex">BSFlex</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Configuration Selection</label>
                        
                        <div class="form-group">
                            <label>GPS</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="gpsOn" name="gps" value="ON" checked>
                                    <label for="gpsOn">ON</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="gpsOff" name="gps" value="OFF">
                                    <label for="gpsOff">OFF</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>WiFi</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="wifiOn" name="wifi" value="ON" checked>
                                    <label for="wifiOn">ON</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="wifiOff" name="wifi" value="OFF">
                                    <label for="wifiOff">OFF</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>BLE</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="bleOn" name="ble" value="ON">
                                    <label for="bleOn">ON</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="bleOff" name="ble" value="OFF" checked>
                                    <label for="bleOff">OFF</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Ambient Trigger</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="ambientOff" name="ambient" value="OFF" checked>
                                    <label for="ambientOff">OFF</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="ambientOn" name="ambient" value="ON">
                                    <label for="ambientOn">ON</label>
                                </div>
                            </div>
                            <div class="command-info">
                                When Ambient Trigger is ON: AT+LIGHT=1,516,300 will be added
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Shock Trigger</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="shockOff" name="shock" value="OFF" checked>
                                    <label for="shockOff">OFF</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="shockOn" name="shock" value="ON">
                                    <label for="shockOn">ON</label>
                                </div>
                            </div>
                            <div class="command-info">
                                When Shock Trigger is ON: AT+MOTION=2,10,3600 & AT+VIBPARAM=1,0,160 will be added
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Sensor Enable</label>
                            <div class="checkbox-options">
                                <div class="checkbox-option">
                                    <input type="checkbox" id="sensorAmb" name="sensor" value="Amb">
                                    <label for="sensorAmb">Ambient Light</label>
                                </div>
                                <div class="checkbox-option">
                                    <input type="checkbox" id="sensorTemp" name="sensor" value="Temp">
                                    <label for="sensorTemp">Temperature</label>
                                </div>
                                <div class="checkbox-option">
                                    <input type="checkbox" id="sensorHum" name="sensor" value="Hum">
                                    <label for="sensorHum">Humidity</label>
                                </div>
                            </div>
                            <div class="sensor-info">
                                <strong>Note:</strong> AT+SENSORMASK command will be generated based on sensor selection
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>PRF/Reporting Interval</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="prfNo" name="prfEnabled" value="NO" checked>
                                    <label for="prfNo">NO</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="prfYes" name="prfEnabled" value="YES">
                                    <label for="prfYes">YES</label>
                                </div>
                            </div>
                            <div id="prfOptions" class="prf-options">
                                <div class="form-row">
                                    <div class="form-col">
                                        <div class="form-group">
                                            <label for="prfValue">PRF/Reporting Interval (seconds) *</label>
                                            <input type="number" id="prfValue" class="form-control" placeholder="Enter PRF in seconds" min="300" value="300">
                                            <div class="info-text">Minimum allowed value: 300 seconds</div>
                                        </div>
                                    </div>
                                    <div class="form-col">
                                        <div class="form-group">
                                            <label for="sensorFreqValue">Sensor/Sample Frequency (seconds) *</label>
                                            <input type="number" id="sensorFreqValue" class="form-control" placeholder="Enter sampling frequency" min="300" value="300">
                                            <div class="info-text">Minimum allowed value: 300 seconds</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
                        <button type="submit" class="btn btn-primary" id="saveBtn">
                            <i class="fas fa-save"></i> Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <script>
    
        
        // DOM Elements
        const tableView = document.getElementById('tableView');
        const formView = document.getElementById('formView');
        const createProfileBtn = document.getElementById('createProfileBtn');
        const backToListBtn = document.getElementById('backToListBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const configProfileForm = document.getElementById('configProfileForm');
        const profilesTableBody = document.getElementById('profilesTableBody');
        const emptyState = document.getElementById('emptyState');
        const formTitle = document.getElementById('formTitle');
        
        // Manual command toggles removed
        const prfRadios = document.querySelectorAll('input[name="prfEnabled"]');
        const prfOptions = document.getElementById('prfOptions');
        
        // State
        let isEditing = false;
        let currentProfileId = null;
        
        // Event Listeners
        createProfileBtn.addEventListener('click', showCreateForm);
        backToListBtn.addEventListener('click', showTable);
        cancelBtn.addEventListener('click', showTable);
        configProfileForm.addEventListener('submit', handleFormSubmit);
        
        // Toggle PRF options
        prfRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'YES') {
                    prfOptions.classList.add('active');
                    document.getElementById('prfValue').required = true;
                    document.getElementById('sensorFreqValue').required = true;
                } else {
                    prfOptions.classList.remove('active');
                    document.getElementById('prfValue').required = false;
                    document.getElementById('sensorFreqValue').required = false;
                }
            });
        });
        
        // Functions
        function showCreateForm() {
            isEditing = false;
            currentProfileId = null;
            formTitle.textContent = "Create Config Profile";
            resetForm();
            tableView.classList.add('hidden');
            formView.classList.remove('hidden');
        }
        
        function showEditForm(profileId) {
            isEditing = true;
            currentProfileId = profileId;
            formTitle.textContent = "Edit Config Profile";
            
            // Find the profile to edit
            const profile = profiles.find(p => p.id === profileId);
            if (!profile) {
                alert("Profile not found");
                return;
            }
            
            // Populate form with profile data
            document.getElementById('profileName').value = profile.profileName;
            document.getElementById('accountName').value = profile.accountName;
            document.getElementById('deviceType').value = profile.deviceType;
            
            // Set GPS radio
            document.querySelector('input[name="gps"][value="' + profile.gps + '"]').checked = true;
            
            // Set WiFi radio
            document.querySelector('input[name="wifi"][value="' + profile.wifi + '"]').checked = true;
            
            // Set BLE radio
            document.querySelector('input[name="ble"][value="' + profile.ble + '"]').checked = true;
            
            // Set Ambient radio
            document.querySelector('input[name="ambient"][value="' + profile.ambient + '"]').checked = true;
            
            // Set Shock radio
            document.querySelector('input[name="shock"][value="' + profile.shock + '"]').checked = true;
            
            // Set Sensors checkboxes
            document.querySelectorAll('input[name="sensor"]').forEach(checkbox => {
                checkbox.checked = profile.sensors.includes(checkbox.value);
            });
            
            // Set PRF options
            document.querySelector('input[name="prfEnabled"][value="' + profile.prfEnabled + '"]').checked = true;
            if (profile.prfEnabled === 'YES') {
                prfOptions.classList.add('active');
                document.getElementById('prfValue').value = profile.prfValue;
                document.getElementById('sensorFreqValue').value = profile.sensorFreqValue;
            } else {
                prfOptions.classList.remove('active');
            }
            
            tableView.classList.add('hidden');
            formView.classList.remove('hidden');
        }
        
        function showTable() {
            tableView.classList.remove('hidden');
            formView.classList.add('hidden');
            renderProfilesTable();
        }
        
        function resetForm() {
            configProfileForm.reset();
            prfOptions.classList.remove('active');
            document.getElementById('prfValue').value = '300';
            document.getElementById('sensorFreqValue').value = '300';
            document.getElementById('deviceType').value = 'BSFlex';
            document.querySelector('input[name="gps"][value="ON"]').checked = true;
            document.querySelector('input[name="wifi"][value="ON"]').checked = true;
            document.querySelector('input[name="ble"][value="OFF"]').checked = true;
            document.querySelector('input[name="ambient"][value="OFF"]').checked = true;
            document.querySelector('input[name="shock"][value="OFF"]').checked = true;
            document.querySelector('input[name="prfEnabled"][value="NO"]').checked = true;
        }
        
        function handleFormSubmit(e) {
            e.preventDefault();
            
            // Get form values
            const profileName = document.getElementById('profileName').value;
            const accountName = document.getElementById('accountName').value;
            const deviceType = document.getElementById('deviceType').value;
            const gps = document.querySelector('input[name="gps"]:checked').value;
            const wifi = document.querySelector('input[name="wifi"]:checked').value;
            const ble = document.querySelector('input[name="ble"]:checked').value;
            const ambient = document.querySelector('input[name="ambient"]:checked').value;
            const shock = document.querySelector('input[name="shock"]:checked').value;
            
            // Get selected sensors
            const sensorCheckboxes = document.querySelectorAll('input[name="sensor"]:checked');
            const sensors = Array.from(sensorCheckboxes).map(cb => cb.value);
            
            const prfEnabled = document.querySelector('input[name="prfEnabled"]:checked').value;
            const prfValue = prfEnabled === 'YES' ? parseInt(document.getElementById('prfValue').value) : 0;
            const sensorFreqValue = prfEnabled === 'YES' ? parseInt(document.getElementById('sensorFreqValue').value) : 0;
            
            // Validate PRF values if enabled
            if (prfEnabled === 'YES') {
                if (prfValue < 300) {
                    alert("PRF value must be at least 300 seconds");
                    return;
                }
                if (sensorFreqValue < 300) {
                    alert("Sensor/Sample Frequency value must be at least 300 seconds");
                    return;
                }
            }
            
            // Create profile object
            const profileData = {
                id: isEditing ? currentProfileId : profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1,
                profileName,
                accountName,
                deviceType,
                gps,
                wifi,
                ble,
                ambient,
                shock,
                sensors,
                prfEnabled,
                prfValue,
                sensorFreqValue
            };
            
            // In a real application, you would make an API call here
            if (isEditing) {
                // Update existing profile
                const index = profiles.findIndex(p => p.id === currentProfileId);
                if (index !== -1) {
                    profiles[index] = profileData;
                }
            } else {
                // Add new profile
                profiles.push(profileData);
            }
            
            // Show success message
            alert('Profile ' + (isEditing ? 'updated' : 'created') + ' successfully!');
            
            // Return to table view
            showTable();
        }
        
        function editProfile(profileId) {
            showEditForm(profileId);
        }
        
        function deleteProfile(profileId) {
            if (confirm("Are you sure you want to delete this profile?")) {
                // In a real application, you would make an API call here
                profiles = profiles.filter(p => p.id !== profileId);
                
                // Update table
                renderProfilesTable();
                
                // Show message
                alert("Profile deleted successfully!");
            }
        }
        
        // Function to calculate sensor mask
        function calculateSensorMask(sensors) {
            // BIT 0: Ambient Light (1 if selected)
            const bit0 = sensors.includes('Amb') ? 1 : 0;
            
            // BIT 1: Temperature (1 if selected)
            const bit1 = sensors.includes('Temp') ? 1 : 0;
            
            // BIT 2: Humidity (1 if selected)
            const bit2 = sensors.includes('Hum') ? 1 : 0;
            
            // BIT 3: Always 1
            const bit3 = 1;
            
            // BIT 4: Always 1
            const bit4 = 1;
            
            // BIT 5: Always 0
            const bit5 = 0;
            
            // BIT 6: Always 1
            const bit6 = 1;
            
            // BIT 7: Always 1
            const bit7 = 1;
            
            // Create binary string (MSB first)
            const binaryString = '' + bit7 + bit6 + bit5 + bit4 + bit3 + bit2 + bit1 + bit0;
            
            // Convert binary to decimal
            return parseInt(binaryString, 2);
        }
        
        // Function to generate AT+SENSORSTATUS command
        function generateSensorStatusCommand(profile) {
            // Convert ON/OFF to 1/0
            const gpsBit = profile.gps === 'ON' ? '1' : '0';
            const wifiBit = profile.wifi === 'ON' ? '1' : '0';
            const bleBit = profile.ble === 'ON' ? '1' : '0';
            const ambientBit = profile.ambient === 'ON' ? '1' : '0';
            const shockBit = profile.shock === 'ON' ? '1' : '0';
            // Last bit is always 0 (Temp&Humi Trigger - not used)
            const lastBit = '0';
            
            return `AT+SENSORSTATUS=${gpsBit},${wifiBit},${bleBit},${ambientBit},${shockBit},${lastBit}`;
        }
        
        function generateCommandSet(profile) {
            const commands = [];
            
            // Add AT+SENSORSTATUS command
            commands.push(generateSensorStatusCommand(profile));
            
            // Add Ambient Light command if ON
            if (profile.ambient === 'ON') {
                commands.push('AT+LIGHT=1,516,300');
            }
            
            // Add Shock command if ON
            if (profile.shock === 'ON') {
                commands.push('AT+MOTION=2,10,3600 & AT+VIBPARAM=1,0,160');
            }
            
            // Add Sensor mask command if sensors are selected
            if (profile.sensors.length > 0) {
                const sensorMask = calculateSensorMask(profile.sensors);
                commands.push('AT+SENSORMASK=' + sensorMask);
            }
            
            // Add PRF commands if enabled
            if (profile.prfEnabled === 'YES') {
                if (profile.prfValue === profile.sensorFreqValue) {
                    commands.push('AT+TIMEGAP=0,' + profile.prfValue + ',1,' + profile.prfValue + ' & AT+SAMPLEMODE=0,0');
                } else {
                    commands.push('AT+TIMEGAP=0,' + profile.prfValue + ',1,' + profile.sensorFreqValue + ' & AT+SAMPLEMODE=1,1');
                }
            }
            
            return commands;
        }
        
        function generateConfigSet(profile) {
            const configs = [];
            
            // Add GPS config
            configs.push('GPS: ' + profile.gps);
            
            // Add WiFi config
            configs.push('WiFi: ' + profile.wifi);
            
            // Add BLE config
            configs.push('BLE: ' + profile.ble);
            
            // Add Ambient config
            configs.push('Ambient: ' + profile.ambient);
            
            // Add Shock config
            configs.push('Shock: ' + profile.shock);
            
            // Add Sensors config
            if (profile.sensors.length > 0) {
                const sensorMask = calculateSensorMask(profile.sensors);
                configs.push('Sensors: ' + profile.sensors.join(', ') + ' (Mask: ' + sensorMask + ')');
            } else {
                configs.push('Sensors: None (Mask: 216)');
            }
            
            // Add PRF config if enabled
            if (profile.prfEnabled === 'YES') {
                configs.push('PRF: ' + profile.prfValue + 's');
                configs.push('Sample Freq: ' + profile.sensorFreqValue + 's');
            } else {
                configs.push('PRF: Disabled');
            }
            
            // Add Device Type
            configs.push('Device: ' + profile.deviceType);
            
            return configs;
        }
        
        function renderCommandSet(commands) {
            return commands.map(function(command) {
                return '<span class="command-tag">' + command + '</span>';
            }).join('');
        }
        
        function renderConfigSet(configs) {
            return configs.map(function(config) {
                return '<span class="config-tag">' + config + '</span>';
            }).join('');
        }
        
        function renderProfilesTable() {
            if (profiles.length === 0) {
                profilesTableBody.innerHTML = '';
                emptyState.classList.remove('hidden');
                return;
            }
            
            emptyState.classList.add('hidden');
            
            let tableHTML = '';
            
            profiles.forEach(function(profile) {
                // Generate command set
                const commands = generateCommandSet(profile);
                
                // Generate config set
                const configs = generateConfigSet(profile);
                
                tableHTML += '                    <tr>' +
                           '                        <td>' + profile.profileName + '</td>' +
                           '                        <td>' + profile.accountName + '</td>' +
                           '                        <td>' + profile.deviceType + '</td>' +
                           '                        <td class="config-set">' + renderConfigSet(configs) + '</td>' +
                           '                        <td class="command-set">' + renderCommandSet(commands) + '</td>' +
                           '                        <td>' +
                           '                            <div class="action-buttons">' +
                           '                                <button class="btn btn-secondary btn-sm btn-edit" onclick="editProfile(' + profile.id + ')">' +
                           '                                    <i class="fas fa-edit"></i> Edit' +
                           '                                </button>' +
                           '                                <button class="btn btn-secondary btn-sm btn-delete" onclick="deleteProfile(' + profile.id + ')">' +
                           '                                    <i class="fas fa-trash"></i> Delete' +
                           '                                </button>' +
                           '                            </div>' +
                           '                        </td>' +
                           '                    </tr>';
            });
            
            profilesTableBody.innerHTML = tableHTML;
        }
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Render profiles table
            renderProfilesTable();
        });
    </script>
</body>
</html>`;
}

// Main function to create the HTML file
function createConfigProfileApp() {
    const htmlContent = generateHTML();
    
    // Write to a file
    const outputPath = path.join(__dirname, 'CONFIG_PROFILE.html');
    
    fs.writeFile(outputPath, htmlContent, (err) => {
        if (err) {
            console.error('Error creating HTML file:', err);
            return;
        }
        console.log('Successfully created CONFIG_PROFILE.html');
        console.log('File saved at:', outputPath);
    });
    
    return htmlContent;
}

// Start a simple HTTP server for Render
const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const html = generateHTML();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url === '/download') {
    // Also create the HTML file for download
    const htmlContent = generateHTML();
    const outputPath = path.join(__dirname, 'CONFIG_PROFILE.html');
    
    fs.writeFileSync(outputPath, htmlContent);
    
    res.setHeader('Content-Disposition', 'attachment; filename=CONFIG_PROFILE.html');
    res.setHeader('Content-Type', 'text/html');
    const fileStream = fs.createReadStream(outputPath);
    fileStream.pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('HTML content will be served at the root path');
  console.log(`Access the application at: http://localhost:${PORT}`);
  
  // Also create the HTML file
  createConfigProfileApp();
});

// Export the function for module systems
module.exports = { generateHTML, createConfigProfileApp };

