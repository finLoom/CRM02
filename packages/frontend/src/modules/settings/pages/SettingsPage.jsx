// packages/frontend/src/modules/settings/pages/SettingsPage.jsx
import React, { useState } from 'react';
import {
  makeStyles,
  tokens,
  Button,
  Input,
  Dropdown,
  Option,
  TabList,
  Tab,
  Text,
  Avatar,
  Divider,
  Switch,
  Checkbox,
  Field
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import {
  ArrowUploadRegular,
  ArrowDownloadRegular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL,
    maxWidth: '800px',
    margin: '0 auto'
  },
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL
  },
  importExportButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  }
});

const SettingsPage = () => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState({
    firstName: 'Jane',
    lastName: 'Cooper',
    email: 'jane.cooper@example.com',
    jobTitle: 'Sales Manager',
    phone: '(555) 123-4567',
    timeZone: 'Pacific',
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

  const [dashboardSettings, setDashboardSettings] = useState({
    salesPerformanceChart: true,
    recentLeads: true,
    openOpportunities: true,
    tasksDueToday: true,
    activityTimeline: true
  });

  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  const handleUserProfileChange = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
    setSavedSuccessfully(false);
  };

  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setSavedSuccessfully(false);
  };

  const handleDashboardSettingsChange = (field, checked) => {
    setDashboardSettings(prev => ({
      ...prev,
      [field]: checked
    }));
    setSavedSuccessfully(false);
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log('Saving profile:', userProfile);
    console.log('Saving notification settings:', notificationSettings);
    console.log('Saving dashboard settings:', dashboardSettings);
    setSavedSuccessfully(true);

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSavedSuccessfully(false);
    }, 3000);
  };

  const timeZoneOptions = [
    { id: 'Pacific', value: 'Pacific Standard Time (UTC-08:00)' },
    { id: 'Mountain', value: 'Mountain Standard Time (UTC-07:00)' },
    { id: 'Central', value: 'Central Standard Time (UTC-06:00)' },
    { id: 'Eastern', value: 'Eastern Standard Time (UTC-05:00)' }
  ];

  const dateFormatOptions = [
    { id: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { id: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { id: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
  ];

  const themeOptions = [
    { id: 'Light', value: 'Light' },
    { id: 'Dark', value: 'Dark' },
    { id: 'System', value: 'System Default' }
  ];

  return (
    <div className={styles.container}>
      <Text size={500} as="h1">Settings</Text>

      {savedSuccessfully && (
        <Alert intent="success" dismissible onDismiss={() => setSavedSuccessfully(false)}>
          Your settings have been saved successfully.
        </Alert>
      )}

      <TabList
        selectedValue={activeTab}
        onTabSelect={(_, data) => setActiveTab(data.value)}
      >
        <Tab value="profile">My Profile</Tab>
        <Tab value="notifications">Notifications</Tab>
        <Tab value="import-export">Import/Export</Tab>
        <Tab value="appearance">Appearance</Tab>
      </TabList>

      {activeTab === 'profile' && (
        <>
          <div className={styles.section}>
            <div className={styles.avatarContainer}>
              <Avatar
                name={`${userProfile.firstName} ${userProfile.lastName}`}
                size={72}
              />
              <Button icon={<ArrowUploadRegular />} appearance="secondary">
                Change Photo
              </Button>
            </div>

            <Divider />

            <div className={styles.formField}>
              <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
                <Field style={{ flex: 1 }} label="First Name">
                  <Input
                    value={userProfile.firstName}
                    onChange={e => handleUserProfileChange('firstName', e.target.value)}
                  />
                </Field>
                <Field style={{ flex: 1 }} label="Last Name">
                  <Input
                    value={userProfile.lastName}
                    onChange={e => handleUserProfileChange('lastName', e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Email Address">
                <Input
                  type="email"
                  value={userProfile.email}
                  onChange={e => handleUserProfileChange('email', e.target.value)}
                />
              </Field>

              <Field label="Job Title">
                <Input
                  value={userProfile.jobTitle}
                  onChange={e => handleUserProfileChange('jobTitle', e.target.value)}
                />
              </Field>

              <Field label="Phone">
                <Input
                  type="tel"
                  value={userProfile.phone}
                  onChange={e => handleUserProfileChange('phone', e.target.value)}
                />
              </Field>

              <Field label="Time Zone">
                <Dropdown
                  value={userProfile.timeZone}
                  onOptionSelect={(_, data) => handleUserProfileChange('timeZone', data.optionValue)}
                >
                  {timeZoneOptions.map(option => (
                    <Option key={option.id} value={option.id}>
                      {option.value}
                    </Option>
                  ))}
                </Dropdown>
              </Field>

              <Field label="Date Format">
                <Dropdown
                  value={userProfile.dateFormat}
                  onOptionSelect={(_, data) => handleUserProfileChange('dateFormat', data.optionValue)}
                >
                  {dateFormatOptions.map(option => (
                    <Option key={option.id} value={option.id}>
                      {option.value}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
            </div>
          </div>

          <div className={styles.section}>
            <Text size={400}>Password</Text>
            <div className={styles.formField}>
              <Field label="Current Password">
                <Input type="password" />
              </Field>

              <Field label="New Password">
                <Input type="password" />
              </Field>

              <Field label="Confirm New Password">
                <Input type="password" />
              </Field>

              <Button appearance="primary">Change Password</Button>
            </div>
          </div>
        </>
      )}

      {activeTab === 'notifications' && (
        <div className={styles.section}>
          <Text size={400}>Email Notifications</Text>
          <div className={styles.formField}>
            <Switch
              label="Email Notifications"
              checked={notificationSettings.emailNotifications}
              onChange={(_, data) => handleNotificationChange('emailNotifications', data.checked)}
            />

            <Switch
              label="Task Reminders"
              checked={notificationSettings.taskReminders}
              onChange={(_, data) => handleNotificationChange('taskReminders', data.checked)}
              disabled={!notificationSettings.emailNotifications}
            />

            <Switch
              label="Lead Assignments"
              checked={notificationSettings.leadAssignments}
              onChange={(_, data) => handleNotificationChange('leadAssignments', data.checked)}
              disabled={!notificationSettings.emailNotifications}
            />

            <Switch
              label="Opportunity Updates"
              checked={notificationSettings.opportunityUpdates}
              onChange={(_, data) => handleNotificationChange('opportunityUpdates', data.checked)}
              disabled={!notificationSettings.emailNotifications}
            />

            <Switch
              label="Daily Summary"
              checked={notificationSettings.dailySummary}
              onChange={(_, data) => handleNotificationChange('dailySummary', data.checked)}
              disabled={!notificationSettings.emailNotifications}
            />
          </div>
        </div>
      )}

      {activeTab === 'import-export' && (
        <div className={styles.section}>
          <Text size={400}>Import Data</Text>
          <div className={styles.formField}>
            <Text>Import data from CSV files</Text>
            <div className={styles.importExportButtons}>
              <Button icon={<ArrowUploadRegular />} appearance="secondary">
                Import Contacts
              </Button>
              <Button icon={<ArrowUploadRegular />} appearance="secondary">
                Import Leads
              </Button>
              <Button icon={<ArrowUploadRegular />} appearance="secondary">
                Import Opportunities
              </Button>
            </div>
          </div>

          <Divider />

          <Text size={400}>Export Data</Text>
          <div className={styles.formField}>
            <Text>Export your CRM data as CSV files</Text>
            <div className={styles.importExportButtons}>
              <Button icon={<ArrowDownloadRegular />} appearance="secondary">
                Export Contacts
              </Button>
              <Button icon={<ArrowDownloadRegular />} appearance="secondary">
                Export Leads
              </Button>
              <Button icon={<ArrowDownloadRegular />} appearance="secondary">
                Export Opportunities
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appearance' && (
        <>
          <div className={styles.section}>
            <Text size={400}>Theme Settings</Text>
            <div className={styles.formField}>
              <Field label="Theme">
                <Dropdown
                  value={userProfile.theme}
                  onOptionSelect={(_, data) => handleUserProfileChange('theme', data.optionValue)}
                >
                  {themeOptions.map(option => (
                    <Option key={option.id} value={option.id}>
                      {option.value}
                    </Option>
                  ))}
                </Dropdown>
              </Field>

              <Switch
                label="Use compact mode"
                defaultChecked={false}
              />

              <Switch
                label="Show animations"
                defaultChecked={true}
              />
            </div>
          </div>

          <div className={styles.section}>
            <Text size={400}>Dashboard Customization</Text>
            <div className={styles.formField}>
              <Text>Customize which widgets appear on your dashboard</Text>

              <Checkbox
                label="Sales Performance Chart"
                checked={dashboardSettings.salesPerformanceChart}
                onChange={(_, data) => handleDashboardSettingsChange('salesPerformanceChart', data.checked)}
              />
              <Checkbox
                label="Recent Leads"
                checked={dashboardSettings.recentLeads}
                onChange={(_, data) => handleDashboardSettingsChange('recentLeads', data.checked)}
              />
              <Checkbox
                label="Open Opportunities"
                checked={dashboardSettings.openOpportunities}
                onChange={(_, data) => handleDashboardSettingsChange('openOpportunities', data.checked)}
              />
              <Checkbox
                label="Tasks Due Today"
                checked={dashboardSettings.tasksDueToday}
                onChange={(_, data) => handleDashboardSettingsChange('tasksDueToday', data.checked)}
              />
              <Checkbox
                label="Activity Timeline"
                checked={dashboardSettings.activityTimeline}
                onChange={(_, data) => handleDashboardSettingsChange('activityTimeline', data.checked)}
              />
            </div>
          </div>
        </>
      )}

      <div className={styles.buttonGroup}>
        <Button appearance="secondary">Cancel</Button>
        <Button appearance="primary" onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsPage;