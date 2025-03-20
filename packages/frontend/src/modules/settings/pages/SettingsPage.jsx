import React, { useState } from 'react';
import {
  makeStyles,
  tokens,
  Button,
  Input,
  Dropdown,
  TabList,
  Tab,
  Text,
  Avatar,
  Divider,
  Switch,
  Checkbox,
  MessageBar,
  Field
} from '@fluentui/react-components';
import {
  Upload24Regular,
  Download24Regular
} from '@fluentui/react-components/icons';

import { Upload24Regular, Download24Regular } from '@fluentui/react-components/icons';
import { Upload24Regular, Download24Regular } from '@fluentui/react-icons';

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
    { key: 'Pacific', text: 'Pacific Standard Time (UTC-08:00)' },
    { key: 'Mountain', text: 'Mountain Standard Time (UTC-07:00)' },
    { key: 'Central', text: 'Central Standard Time (UTC-06:00)' },
    { key: 'Eastern', text: 'Eastern Standard Time (UTC-05:00)' }
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
    <div className={styles.container}>
      <Text size={500} as="h1">Settings</Text>

      {savedSuccessfully && (
        <MessageBar
          intent="success"
          onDismiss={() => setSavedSuccessfully(false)}
        >
          Your settings have been saved successfully.
        </MessageBar>
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
              <Button icon={<Upload24Regular />} appearance="secondary">
                Change Photo
              </Button>
            </div>

            <Divider />

            <div className={styles.formField}>
              <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
                <Field style={{ flex: 1 }}>
                  <Text size={200} weight="semibold">First Name</Text>
                  <Input
                    value={userProfile.firstName}
                    onChange={(_, data) => handleUserProfileChange('firstName', data.value)}
                  />
                </Field>
                <Field style={{ flex: 1 }}>
                  <Text size={200} weight="semibold">Last Name</Text>
                  <Input
                    value={userProfile.lastName}
                    onChange={(_, data) => handleUserProfileChange('lastName', data.value)}
                  />
                </Field>
              </div>

              <Field>
                <Text size={200} weight="semibold">Email Address</Text>
                <Input
                  type="email"
                  value={userProfile.email}
                  onChange={(_, data) => handleUserProfileChange('email', data.value)}
                />
              </Field>

              <Field>
                <Text size={200} weight="semibold">Job Title</Text>
                <Input
                  value={userProfile.jobTitle}
                  onChange={(_, data) => handleUserProfileChange('jobTitle', data.value)}
                />
              </Field>

              <Field>
                <Text size={200} weight="semibold">Phone</Text>
                <Input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(_, data) => handleUserProfileChange('phone', data.value)}
                />
              </Field>

              <Field>
                <Text size={200} weight="semibold">Time Zone</Text>
                <Dropdown
                  selectedKey={userProfile.timeZone}
                  options={timeZoneOptions.map(option => ({
                    key: option.key,
                    text: option.text
                  }))}
                  onOptionSelect={(_, option) => handleUserProfileChange('timeZone', option.optionValue)}
                />
              </Field>

              <Field>
                <Text size={200} weight="semibold">Date Format</Text>
                <Dropdown
                  selectedKey={userProfile.dateFormat}
                  options={dateFormatOptions.map(option => ({
                    key: option.key,
                    text: option.text
                  }))}
                  onOptionSelect={(_, option) => handleUserProfileChange('dateFormat', option.optionValue)}
                />
              </Field>
            </div>
          </div>

          <div className={styles.section}>
            <Text size={400}>Password</Text>
            <div className={styles.formField}>
              <Field>
                <Text size={200} weight="semibold">Current Password</Text>
                <Input type="password" />
              </Field>

              <Field>
                <Text size={200} weight="semibold">New Password</Text>
                <Input type="password" />
              </Field>

              <Field>
                <Text size={200} weight="semibold">Confirm New Password</Text>
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
              <Button icon={<Upload24Regular />} appearance="secondary">
                Import Contacts
              </Button>
              <Button icon={<Upload24Regular />} appearance="secondary">
                Import Leads
              </Button>
              <Button icon={<Upload24Regular />} appearance="secondary">
                Import Opportunities
              </Button>
            </div>
          </div>

          <Divider />

          <Text size={400}>Export Data</Text>
          <div className={styles.formField}>
            <Text>Export your CRM data as CSV files</Text>
            <div className={styles.importExportButtons}>
              <Button icon={<Download24Regular />} appearance="secondary">
                Export Contacts
              </Button>
              <Button icon={<Download24Regular />} appearance="secondary">
                Export Leads
              </Button>
              <Button icon={<Download24Regular />} appearance="secondary">
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
              <Field>
                <Text size={200} weight="semibold">Theme</Text>
                <Dropdown
                  selectedKey={userProfile.theme}
                  options={themeOptions.map(option => ({
                    key: option.key,
                    text: option.text
                  }))}
                  onOptionSelect={(_, option) => handleUserProfileChange('theme', option.optionValue)}
                />
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