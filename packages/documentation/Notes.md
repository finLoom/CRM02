
Instructions:
Each file shall not exceed 500 lines of code.
Need modular, reusable code approach.
Build components rather than single file, breaking down code in multiple files and folders, organized like an enterprise application.
need actual file names and folder path.



#ICONS
https://developer.microsoft.com/en-us/fluentui#/styles/web/icons




https://github.com/finLoom/CRM01.git


Branch Naming Conventions
It's good practice to use descriptive branch names. Common prefixes include:

feature/ - for new features
bugfix/ - for bug fixes
hotfix/ - for critical fixes
release/ - for release preparation
docs/ - for documentation updates




###### First time git ###

# Initialize a new Git repository
git init

# Add all files to the staging area
git add .

		# Alternatively, add specific files
		# git add src/ public/ package.json README.md


# Create your first commit with a descriptive message
git commit -m "Initial commit: Fluent CRM project with React and Fluent UI"


# Add the remote repository URL (replace with your actual URL)
git remote add origin https://github.com/finLoom/CRM02.git

# Verify the remote is set up correctly
git remote -v

# Push your changes to the remote repository
git push -u origin main

# If you're using the 'master' branch instead of 'main', use:
# git push -u origin master

###### git updates ###

# Check status of your files
git status

# Add changes to staging
git add .

# Commit changes
git commit -m "Description of changes made"

# Push changes to remote
git push




CRM 01
fluent-crm/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── logo.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx
│   │   │   ├── SideBar.jsx
│   │   │   └── Layout.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ActivityFeed.jsx
│   │   │   ├── SalesStats.jsx
│   │   │   └── TasksSummary.jsx
│   │   ├── contacts/
│   │   │   ├── ContactList.jsx
│   │   │   ├── ContactDetail.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── leads/
│   │   │   ├── LeadList.jsx
│   │   │   ├── LeadDetail.jsx
│   │   │   └── LeadForm.jsx
│   │   ├── opportunities/
│   │   │   ├── OpportunityList.jsx
│   │   │   ├── OpportunityDetail.jsx
│   │   │   └── OpportunityForm.jsx
│   │   └── common/
│   │       ├── SearchBar.jsx
│   │       ├── ProfileMenu.jsx
│   │       └── Notification.jsx
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ContactsPage.jsx
│   │   ├── LeadsPage.jsx
│   │   ├── OpportunitiesPage.jsx
│   │   ├── TasksPage.jsx
│   │   └── SettingsPage.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── mockData.js
│   ├── utils/
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── styles/
│   │   ├── theme.js
│   │   └── globalStyles.css
│   ├── App.jsx
│   ├── index.js
│   └── routes.js
├── package.json
└── README.md




   # h2 in-memory database for testing
   # Uncomment the following lines to use H2 database for testing
   # spring.datasource.url=jdbc:h2:mem:testdb
   # spring.datasource.driver-class-name=org.h2.Driver
   # spring.datasource.username=sa
   # spring.datasource.password=
   # spring.jpa.hibernate.ddl-auto=create-drop
   # spring.h2.console.enabled=true