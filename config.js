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
            max-width: 1400px;
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
            min-width: 1000px;
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
        
        /* Command Set Styles */
        .command-set {
            max-width: 300px;
        }
        
        .command-tag {
            display: inline-block;
            background-color: #eef2ff;
            color: #6245d9;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            margin: 2px;
            white-space: nowrap;
        }
        
        .command-tag.ambient {
            background-color: #e0f7fa;
            color: #006064;
        }
        
        .command-tag.shock {
            background-color: #fff3e0;
            color: #e65100;
        }
        
        .command-tag.sensor {
            background-color: #e8f5e9;
            color: #1b5e20;
        }
        
        /* Form Styles */
        .form-container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            padding: 30px;
            max-width: 800px;
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
        
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
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
                    <div class="form-group">
                        <label for="profileName">Config Profile Name *</label>
                        <input type="text" id="profileName" class="form-control" placeholder="Enter profile name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="accountName">Account Name *</label>
                        <input type="text" id="accountName" class="form-control" placeholder="Enter account name" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Configuration Selection</label>
                        
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
                                <div class="radio-option">
                                    <input type="radio" id="ambientManual" name="ambient" value="MANUAL">
                                    <label for="ambientManual">Manual Command</label>
                                </div>
                            </div>
                            <div id="ambientManualCommand" class="manual-command">
                                <input type="text" id="ambientCommand" class="form-control" placeholder="Enter manual command for ambient trigger">
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
                                <div class="radio-option">
                                    <input type="radio" id="shockManual" name="shock" value="MANUAL">
                                    <label for="shockManual">Manual Command</label>
                                </div>
                            </div>
                            <div id="shockManualCommand" class="manual-command">
                                <input type="text" id="shockCommand" class="form-control" placeholder="Enter manual command for shock trigger">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Sensor Enable</label>
                            <div class="checkbox-options">
                                <div class="checkbox-option">
                                    <input type="checkbox" id="sensorTemp" name="sensor" value="Temp">
                                    <label for="sensorTemp">Temperature</label>
                                </div>
                                <div class="checkbox-option">
                                    <input type="checkbox" id="sensorHum" name="sensor" value="Hum">
                                    <label for="sensorHum">Humidity</label>
                                </div>
                                <div class="checkbox-option">
                                    <input type="checkbox" id="sensorAmb" name="sensor" value="Amb">
                                    <label for="sensorAmb">Ambient Light</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="prf">PRF (in seconds) *</label>
                            <input type="number" id="prf" class="form-control" placeholder="Enter PRF in seconds" min="1" value="60" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="sensorSampling">Sensor Sampling (in seconds) *</label>
                            <input type="number" id="sensorSampling" class="form-control" placeholder="Enter sensor sampling interval in seconds" min="1" value="30" required>
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
        // Sample data for profiles (will be replaced with API data)
        let profiles = [
            {
                id: 1,
                profileName: "Default Shipping",
                accountName: "Roambee_Engineering",
                wifi: "ON",
                ble: "OFF",
                ambient: "OFF",
                ambientCommand: "",
                shock: "OFF",
                shockCommand: "",
                sensors: ["Temp"],
                prf: 60,
                sensorSampling: 30
            },
            {
                id: 2,
                profileName: "High Sensitivity",
                accountName: "Roambee_Engineering",
                wifi: "ON",
                ble: "ON",
                ambient: "MANUAL",
                ambientCommand: "TRIGGER_AMBIENT_HIGH",
                shock: "ON",
                shockCommand: "",
                sensors: ["Temp", "Hum"],
                prf: 30,
                sensorSampling: 15
            },
            {
                id: 3,
                profileName: "Cold Storage",
                accountName: "Roambee_Engineering",
                wifi: "OFF",
                ble: "ON",
                ambient: "OFF",
                ambientCommand: "",
                shock: "ON",
                shockCommand: "",
                sensors: ["Temp", "Amb"],
                prf: 120,
                sensorSampling: 60
            }
        ];
        
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
        
        // Manual command toggles
        const ambientRadios = document.querySelectorAll('input[name="ambient"]');
        const ambientManualCommand = document.getElementById('ambientManualCommand');
        const shockRadios = document.querySelectorAll('input[name="shock"]');
        const shockManualCommand = document.getElementById('shockManualCommand');
        
        // State
        let isEditing = false;
        let currentProfileId = null;
        
        // Event Listeners
        createProfileBtn.addEventListener('click', showCreateForm);
        backToListBtn.addEventListener('click', showTable);
        cancelBtn.addEventListener('click', showTable);
        configProfileForm.addEventListener('submit', handleFormSubmit);
        
        // Toggle manual command fields
        ambientRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'MANUAL') {
                    ambientManualCommand.classList.add('active');
                } else {
                    ambientManualCommand.classList.remove('active');
                }
            });
        });
        
        shockRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'MANUAL') {
                    shockManualCommand.classList.add('active');
                } else {
                    shockManualCommand.classList.remove('active');
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
            
            // Set WiFi radio
            document.querySelector('input[name="wifi"][value="' + profile.wifi + '"]').checked = true;
            
            // Set BLE radio
            document.querySelector('input[name="ble"][value="' + profile.ble + '"]').checked = true;
            
            // Set Ambient radio
            document.querySelector('input[name="ambient"][value="' + profile.ambient + '"]').checked = true;
            if (profile.ambient === 'MANUAL') {
                ambientManualCommand.classList.add('active');
                document.getElementById('ambientCommand').value = profile.ambientCommand;
            } else {
                ambientManualCommand.classList.remove('active');
            }
            
            // Set Shock radio
            document.querySelector('input[name="shock"][value="' + profile.shock + '"]').checked = true;
            if (profile.shock === 'MANUAL') {
                shockManualCommand.classList.add('active');
                document.getElementById('shockCommand').value = profile.shockCommand;
            } else {
                shockManualCommand.classList.remove('active');
            }
            
            // Set Sensors checkboxes
            document.querySelectorAll('input[name="sensor"]').forEach(checkbox => {
                checkbox.checked = profile.sensors.includes(checkbox.value);
            });
            
            // Set PRF and Sensor Sampling
            document.getElementById('prf').value = profile.prf;
            document.getElementById('sensorSampling').value = profile.sensorSampling;
            
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
            ambientManualCommand.classList.remove('active');
            shockManualCommand.classList.remove('active');
            document.getElementById('ambientCommand').value = '';
            document.getElementById('shockCommand').value = '';
            document.querySelector('input[name="wifi"][value="ON"]').checked = true;
            document.querySelector('input[name="ble"][value="OFF"]').checked = true;
            document.querySelector('input[name="ambient"][value="OFF"]').checked = true;
            document.querySelector('input[name="shock"][value="OFF"]').checked = true;
        }
        
        function handleFormSubmit(e) {
            e.preventDefault();
            
            // Get form values
            const profileName = document.getElementById('profileName').value;
            const accountName = document.getElementById('accountName').value;
            const wifi = document.querySelector('input[name="wifi"]:checked').value;
            const ble = document.querySelector('input[name="ble"]:checked').value;
            const ambient = document.querySelector('input[name="ambient"]:checked').value;
            const ambientCommand = ambient === 'MANUAL' ? document.getElementById('ambientCommand').value : '';
            const shock = document.querySelector('input[name="shock"]:checked').value;
            const shockCommand = shock === 'MANUAL' ? document.getElementById('shockCommand').value : '';
            
            // Get selected sensors
            const sensorCheckboxes = document.querySelectorAll('input[name="sensor"]:checked');
            const sensors = Array.from(sensorCheckboxes).map(cb => cb.value);
            
            const prf = parseInt(document.getElementById('prf').value);
            const sensorSampling = parseInt(document.getElementById('sensorSampling').value);
            
            // Create profile object
            const profileData = {
                id: isEditing ? currentProfileId : profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1,
                profileName,
                accountName,
                wifi,
                ble,
                ambient,
                ambientCommand,
                shock,
                shockCommand,
                sensors,
                prf,
                sensorSampling
            };
            
            // In a real application, you would make an API call here
            // For now, we'll update the local array
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
            
            // Show success message (in real app, this would be based on API response)
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
        
        function generateCommandSet(profile) {
            const commands = [];
            
            // Add WiFi command
            commands.push('WiFi: ' + (profile.wifi === 'ON' ? 'ENABLE_WIFI' : 'DISABLE_WIFI'));
            
            // Add BLE command
            commands.push('BLE: ' + (profile.ble === 'ON' ? 'ENABLE_BLE' : 'DISABLE_BLE'));
            
            // Add Ambient command
            if (profile.ambient === 'ON') {
                commands.push('Ambient: ENABLE_AMBIENT_TRIGGER');
            } else if (profile.ambient === 'MANUAL' && profile.ambientCommand) {
                commands.push('Ambient: ' + profile.ambientCommand);
            }
            
            // Add Shock command
            if (profile.shock === 'ON') {
                commands.push('Shock: ENABLE_SHOCK_TRIGGER');
            } else if (profile.shock === 'MANUAL' && profile.shockCommand) {
                commands.push('Shock: ' + profile.shockCommand);
            }
            
            // Add Sensor commands
            profile.sensors.forEach(sensor => {
                commands.push(sensor + ': ENABLE_SENSOR');
            });
            
            // Add PRF command
            commands.push('PRF: SET_' + profile.prf + 'S');
            
            // Add Sensor Sampling command
            commands.push('Sampling: SET_' + profile.sensorSampling + 'S');
            
            return commands;
        }
        
        function renderCommandSet(commands) {
            return commands.map(function(command) {
                let className = 'command-tag';
                if (command.includes('Ambient')) className += ' ambient';
                else if (command.includes('Shock')) className += ' shock';
                else if (command.includes('Temp') || command.includes('Hum') || command.includes('Amb')) className += ' sensor';
                
                return '<span class="' + className + '">' + command + '</span>';
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
                // Create configuration summary
                let configSummary = 'WiFi: ' + profile.wifi + ', BLE: ' + profile.ble;
                
                if (profile.ambient !== 'OFF') {
                    configSummary += ', Ambient: ' + profile.ambient;
                }
                
                if (profile.shock !== 'OFF') {
                    configSummary += ', Shock: ' + profile.shock;
                }
                
                if (profile.sensors.length > 0) {
                    configSummary += ', Sensors: ' + profile.sensors.join('/');
                }
                
                configSummary += ', PRF: ' + profile.prf + 's, Sampling: ' + profile.sensorSampling + 's';
                
                // Generate command set
                const commands = generateCommandSet(profile);
                
                tableHTML += '                    <tr>' +
                           '                        <td>' + profile.profileName + '</td>' +
                           '                        <td>' + profile.accountName + '</td>' +
                           '                        <td>' + configSummary + '</td>' +
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

// If running directly with Node.js, create the file
if (require.main === module) {
    createConfigProfileApp();
}

// Export the function for module systems
module.exports = { generateHTML, createConfigProfileApp };

// Start a simple HTTP server for Render
const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const html = generateHTML();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('HTML content will be served at the root path');
  
  // Also create the HTML file
  createConfigProfileApp();
});
