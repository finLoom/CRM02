import React, { useState } from 'react';
import {
  Stack,
  Text,
  TextField,
  Dropdown,
  PrimaryButton,
  DefaultButton,
  ToggleButton,
  Separator,
  Pivot,
  PivotItem,
  PersonaSize,
  Persona,
  Label,
  IconButton,
  mergeStyles,
  Toggle,
  MessageBar,
  MessageBarType,
  Checkbox
} from '@fluentui/react';

const containerStyles = mergeStyles({
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto'
});

const sectionStyles = mergeStyles({
  backgroundColor: 'white',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '20px'
});

const formLabelStyles = {
  root: {
    fontWeight: 600,
    paddingTop: 10
  }
};

const SettingsPage = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: 'Jane',
    lastName: 'Cooper',
    email: 'jane.cooper@example.com',
    jobTitle: 'Sales Manager',
    phone: '(555) 123-4567',
    timeZone: 'Pacific Standard Time',
    dateFormat: 'MM/DD/YYYY',
    theme: 'Light'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskReminders: true,
    leadAssignments: true,
    opportunityUpdates: true,
    dailySummary: true
  });
  
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  
  const handleUserProfileChange = (field, value) => {
    setUserProfile({
      ...userProfile,
      [field]: value
    });
    setSavedSuccessfully(false);
  };
  
  const handleNotificationChange = (field, value) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: value
    });
    setSavedSuccessfully(false);
  };
  
  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log('Saving profile:', userProfile);
    console.log('Saving notification settings:', notificationSettings);
    setSavedSuccessfully(true);
    
    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSavedSuccessfully(false);
    }, 3000);
  };
  
  const timeZoneOptions = [
    { key: 'Pacific Standard Time', text: 'Pacific Standard Time (UTC-08:00)' },
    { key: 'Mountain Standard Time', text: 'Mountain Standard Time (UTC-07:00)' },
    { key: 'Central Standard Time', text: 'Central Standard Time (UTC-06:00)' },
    { key: 'Eastern Standard Time', text: 'Eastern Standard Time (UTC-05:00)' }
  ];
  
  const dateFormatOptions = [
    { key: 'MM/DD/YYYY', text: 'MM/DD/YYYY' },
    { key: 'DD/MM/YYYY', text: 'DD/MM/YYYY' },
    { key: 'YYYY-MM-DD', text: 'YYYY-MM-DD' }
  ];
  
  const themeOptions = [
    { key: 'Light', text: 'Light' },
    { key: 'Dark', text: 'Dark' },
    { key: 'System', text: 'System Default' }
  ];
  
  return (
    <div className={containerStyles}>
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge">Settings</Text>
        
        {savedSuccessfully && (
          <MessageBar
            messageBarType={MessageBarType.success}
            isMultiline={false}
            dismissButtonAriaLabel="Close"
            onDismiss={() => setSavedSuccessfully(false)}
          >
            Your settings have been saved successfully.
          </MessageBar>
        )}
        
        <Pivot>
          <PivotItem headerText="My Profile">
            <div className={sectionStyles}>
              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }} styles={{ root: { marginBottom: 20 } }}>
                <Persona
                  // Replace imageUrl with imageInitials
                  imageInitials={`${userProfile.firstName.charAt(0)}${userProfile.lastName.charAt(0)}`}
                  size={PersonaSize.size72}
                  text={`${userProfile.firstName} ${userProfile.lastName}`}
                  secondaryText={userProfile.jobTitle}
                  // Add some colors for better appearance
                  initialsColor="darkBlue"
                />
                <DefaultButton iconProps={{ iconName: 'Upload' }} text="Change Photo" />
              </Stack>
              
              <Separator />
              
              <Stack tokens={{ childrenGap: 12 }}>
                <Stack horizontal tokens={{ childrenGap: 8 }}>
                  <Stack.Item grow={1}>
                    <TextField
                      label="First Name"
                      value={userProfile.firstName}
                      onChange={(_, value) => handleUserProfileChange('firstName', value)}
                      styles={{ label: formLabelStyles.root }}
                    />
                  </Stack.Item>
                  <Stack.Item grow={1}>
                    <TextField
                      label="Last Name"
                      value={userProfile.lastName}
                      onChange={(_, value) => handleUserProfileChange('lastName', value)}
                      styles={{ label: formLabelStyles.root }}
                    />
                  </Stack.Item>
                </Stack>
                
                <TextField
                  label="Email Address"
                  type="email"
                  value={userProfile.email}
                  onChange={(_, value) => handleUserProfileChange('email', value)}
                  styles={{ label: formLabelStyles.root }}
                />
                
                <TextField
                  label="Job Title"
                  value={userProfile.jobTitle}
                  onChange={(_, value) => handleUserProfileChange('jobTitle', value)}
                  styles={{ label: formLabelStyles.root }}
                />
                
                <TextField
                  label="Phone"
                  type="tel"
                  value={userProfile.phone}
                  onChange={(_, value) => handleUserProfileChange('phone', value)}
                  styles={{ label: formLabelStyles.root }}
                />
                
                <Dropdown
                  label="Time Zone"
                  selectedKey={userProfile.timeZone}
                  options={timeZoneOptions}
                  onChange={(_, option) => handleUserProfileChange('timeZone', option.key)}
                  styles={{ label: formLabelStyles.root }}
                />
                
                <Dropdown
                  label="Date Format"
                  selectedKey={userProfile.dateFormat}
                  options={dateFormatOptions}
                  onChange={(_, option) => handleUserProfileChange('dateFormat', option.key)}
                  styles={{ label: formLabelStyles.root }}
                />
                
                <Dropdown
                  label="Theme"
                  selectedKey={userProfile.theme}
                  options={themeOptions}
                  onChange={(_, option) => handleUserProfileChange('theme', option.key)}
                  styles={{ label: formLabelStyles.root }}
                />
              </Stack>
            </div>
            
            <div className={sectionStyles}>
              <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Password</Text>
              
              <Stack tokens={{ childrenGap: 12 }}>
                <TextField
                  label="Current Password"
                  type="password"
                  canRevealPassword
                  revealPasswordAriaLabel="Show password"
                  styles={{ label: formLabelStyles.root }}
                />
                
                <TextField
                  label="New Password"
                  type="password"
                  canRevealPassword
                  revealPasswordAriaLabel="Show password"
                  styles={{ label: formLabelStyles.root }}
                />
                
                <TextField
                  label="Confirm New Password"
                  type="password"
                  canRevealPassword
                  revealPasswordAriaLabel="Show password"
                  styles={{ label: formLabelStyles.root }}
                />
                
                <Stack.Item align="start">
                  <PrimaryButton text="Change Password" />
                </Stack.Item>
              </Stack>
            </div>
          </PivotItem>
          
          <PivotItem headerText="Notifications">
            <div className={sectionStyles}>
              <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Email Notifications</Text>
              
              <Stack tokens={{ childrenGap: 12 }}>
                <Toggle
                  label="Email Notifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={(_, checked) => handleNotificationChange('emailNotifications', checked)}
                  onText="On"
                  offText="Off"
                />
                
                <Toggle
                  label="Task Reminders"
                  checked={notificationSettings.taskReminders}
                  onChange={(_, checked) => handleNotificationChange('taskReminders', checked)}
                  onText="On"
                  offText="Off"
                  disabled={!notificationSettings.emailNotifications}
                />
                
                <Toggle
                  label="Lead Assignments"
                  checked={notificationSettings.leadAssignments}
                  onChange={(_, checked) => handleNotificationChange('leadAssignments', checked)}
                  onText="On"
                  offText="Off"
                  disabled={!notificationSettings.emailNotifications}
                />
                
                <Toggle
                  label="Opportunity Updates"
                  checked={notificationSettings.opportunityUpdates}
                  onChange={(_, checked) => handleNotificationChange('opportunityUpdates', checked)}
                  onText="On"
                  offText="Off"
                  disabled={!notificationSettings.emailNotifications}
                />
                
                <Toggle
                  label="Daily Summary"
                  checked={notificationSettings.dailySummary}
                  onChange={(_, checked) => handleNotificationChange('dailySummary', checked)}
                  onText="On"
                  offText="Off"
                  disabled={!notificationSettings.emailNotifications}
                />
              </Stack>
            </div>
          </PivotItem>
          
          <PivotItem headerText="Import/Export">
            <div className={sectionStyles}>
              <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Import Data</Text>
              
              <Stack tokens={{ childrenGap: 12 }}>
                <Text>Import data from CSV files</Text>
                
                <Stack horizontal tokens={{ childrenGap: 8 }}>
                  <DefaultButton iconProps={{ iconName: 'Upload' }} text="Import Contacts" />
                  <DefaultButton iconProps={{ iconName: 'Upload' }} text="Import Leads" />
                  <DefaultButton iconProps={{ iconName: 'Upload' }} text="Import Opportunities" />
                </Stack>
              </Stack>
              
              <Separator styles={{ root: { margin: '20px 0' } }} />
              
              <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Export Data</Text>
              
              <Stack tokens={{ childrenGap: 12 }}>
                <Text>Export your CRM data as CSV files</Text>
                
                <Stack horizontal tokens={{ childrenGap: 8 }}>
                  <DefaultButton iconProps={{ iconName: 'Download' }} text="Export Contacts" />
                  <DefaultButton iconProps={{ iconName: 'Download' }} text="Export Leads" />
                  <DefaultButton iconProps={{ iconName: 'Download' }} text="Export Opportunities" />
                </Stack>
              </Stack>
            </div>
          </PivotItem>
          
          <PivotItem headerText="Appearance">
            <div className={sectionStyles}>
              <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Theme Settings</Text>
              
              <Stack tokens={{ childrenGap: 12 }}>
                <Dropdown
                  label="Theme"
                  selectedKey={userProfile.theme}
                  options={themeOptions}
                  onChange={(_, option) => handleUserProfileChange('theme', option.key)}
                  styles={{ label: formLabelStyles.root, dropdown: { width: 200 } }}
                />
                
                <Toggle
                  label="Use compact mode"
                  onText="Yes"
                  offText="No"
                  defaultChecked={false}
                />
                
                <Toggle
                  label="Show animations"
                  onText="Yes"
                  offText="No"
                  defaultChecked={true}
                />
              </Stack>
            </div>
            
            <div className={sectionStyles}>
              <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Dashboard Customization</Text>
              
              <Stack tokens={{ childrenGap: 12 }}>
                <Text>Customize which widgets appear on your dashboard</Text>
                
                <Stack tokens={{ childrenGap: 8 }}>
                  <Checkbox label="Sales Performance Chart" defaultChecked />
                  <Checkbox label="Recent Leads" defaultChecked />
                  <Checkbox label="Open Opportunities" defaultChecked />
                  <Checkbox label="Tasks Due Today" defaultChecked />
                  <Checkbox label="Activity Timeline" defaultChecked />
                </Stack>
              </Stack>
            </div>
          </PivotItem>
        </Pivot>
        
        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }}>
          <DefaultButton text="Cancel" />
          <PrimaryButton text="Save Settings" onClick={handleSave} />
        </Stack>
      </Stack>
    </div>
  );
};

export default SettingsPage;