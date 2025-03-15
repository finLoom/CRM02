// File: frontend/src/components/teams/TeamsList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  DetailsList, 
  DetailsListLayoutMode, 
  SelectionMode, 
  DetailsRow,
  Stack, 
  CommandBar,
  TextField, 
  Dropdown,
  SearchBox,
  PrimaryButton,
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Text,
  Icon,
  TooltipHost,
  Facepile,
  PersonaSize,
  mergeStyleSets
} from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import TeamService from '../../services/TeamService';

// Styles for the component
const styles = mergeStyleSets({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  headerContainer: {
    padding: '16px',
  },
  filtersContainer: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    padding: '0 16px 16px 16px',
  },
  searchContainer: {
    width: '300px',
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 16px',
  },
  noResults: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0',
  },
  teamNameCell: {
    fontWeight: '600',
  },
  teamTypeTag: {
    padding: '2px 8px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: '#deecf9',
    color: '#2b88d8',
    width: 'fit-content',
  },
  membersCell: {
    display: 'flex',
    alignItems: 'center',
  },
  memberCount: {
    marginLeft: '8px',
    fontSize: '12px',
    color: '#605e5c',
  },
});

// Team type options for the dropdown
const teamTypeOptions = [
  { key: 'ALL', text: 'All Types' },
  { key: 'OPERATIONS', text: 'Operations' },
  { key: 'SALES', text: 'Sales' },
  { key: 'SUPPORT', text: 'Support' },
  { key: 'PROJECT', text: 'Project' },
  { key: 'DEVELOPMENT', text: 'Development' },
  { key: 'ADMINISTRATIVE', text: 'Administrative' }
];

/**
 * Component for displaying and managing a list of teams.
 */
const TeamsList = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [departments, setDepartments] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0
  });
  
  // Load teams based on the current filters
  const loadTeams = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      // Handle different filter combinations
      if (searchQuery) {
        response = await TeamService.searchTeams(searchQuery, {
          page: pagination.page,
          size: pagination.size
        });
      } else if (typeFilter !== 'ALL') {
        response = await TeamService.getTeamsByType(typeFilter);
      } else {
        response = await TeamService.getAllTeams({
          page: pagination.page,
          size: pagination.size
        });
      }
      
      // Extract teams from response based on the API response structure
      let fetchedTeams = Array.isArray(response.data) 
        ? response.data 
        : (response.data.content || []);
      
      // Apply department filter client-side if needed
      if (departmentFilter !== 'ALL') {
        fetchedTeams = fetchedTeams.filter(team => team.department === departmentFilter);
      }
      
      setTeams(fetchedTeams);
      
      // Update pagination if response includes it
      if (response.data.totalElements !== undefined) {
        setPagination({
          ...pagination,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages
        });
      }
      
      // Extract unique departments for filter dropdown
      const uniqueDepartments = Array.from(
        new Set(fetchedTeams.map(team => team.department).filter(Boolean))
      );
      
      const departmentOptions = [
        { key: 'ALL', text: 'All Departments' },
        ...uniqueDepartments.map(dept => ({ key: dept, text: dept }))
      ];
      
      setDepartments(departmentOptions);
    } catch (err) {
      console.error('Error loading teams:', err);
      setError('An error occurred while loading teams. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [typeFilter, departmentFilter, searchQuery, pagination.page, pagination.size]);
  
  // Load teams on component mount and when filters change
  useEffect(() => {
    loadTeams();
  }, [loadTeams]);
  
  // Handle selection change
  const onSelectionChanged = (items) => {
    setSelectedItems(items);
  };
  
  // Handle item click
  const onItemClick = (item) => {
    navigate(`/teams/${item.id}`);
  };
  
  // Command bar items
  const commandBarItems = [
    {
// File continuation: frontend/src/components/teams/TeamsList.jsx

key: 'newItem',
text: 'New Team',
iconProps: { iconName: 'Add' },
onClick: () => navigate('/teams/new')
},
{
key: 'edit',
text: 'Edit',
iconProps: { iconName: 'Edit' },
onClick: () => navigate(`/teams/${selectedItems[0].id}/edit`),
disabled: selectedItems.length !== 1
},
{
key: 'delete',
text: 'Delete',
iconProps: { iconName: 'Delete' },
onClick: () => setDeleteDialogOpen(true),
disabled: selectedItems.length === 0
},
{
key: 'refresh',
text: 'Refresh',
iconProps: { iconName: 'Refresh' },
onClick: loadTeams
}
];

// Columns for the DetailsList
const columns = [
{
key: 'name',
name: 'Team Name',
fieldName: 'name',
minWidth: 200,
isResizable: true,
onRender: (item) => (
  <div>
    <Text className={styles.teamNameCell}>{item.name}</Text>
    {item.description && (
      <Text variant="small" style={{ color: '#605e5c', display: 'block' }}>
        {item.description.length > 60 
          ? `${item.description.substring(0, 60)}...` 
          : item.description}
      </Text>
    )}
  </div>
)
},
{
key: 'type',
name: 'Type',
fieldName: 'type',
minWidth: 120,
maxWidth: 120,
isResizable: true,
onRender: (item) => (
  <div className={styles.teamTypeTag}>
    {item.type}
  </div>
)
},
{
key: 'department',
name: 'Department',
fieldName: 'department',
minWidth: 150,
isResizable: true
},
{
key: 'functionalArea',
name: 'Functional Area',
fieldName: 'functionalArea',
minWidth: 150,
isResizable: true
},
{
key: 'manager',
name: 'Manager',
fieldName: 'managerName',
minWidth: 150,
isResizable: true,
onRender: (item) => (
  <div>
    {item.managerName || 'No manager assigned'}
  </div>
)
},
{
key: 'members',
name: 'Members',
minWidth: 150,
isResizable: true,
onRender: (item) => (
  <div className={styles.membersCell}>
    <Facepile
      personaSize={PersonaSize.size24}
      personas={item.members.slice(0, 5).map(member => ({
        personaName: member.name,
        imageInitials: member.name.split(' ').map(part => part[0]).join('')
      }))}
      maxDisplayablePersonas={5}
      overflowButtonType={item.members.length > 5 ? 0 : 3}
      overflowButtonProps={{
        ariaLabel: `${item.members.length - 5} more members`,
        styles: { root: { cursor: 'default' } }
      }}
    />
    <span className={styles.memberCount}>
      {item.memberCount || item.members.length}
    </span>
  </div>
)
},
{
key: 'status',
name: 'Status',
minWidth: 100,
maxWidth: 100,
isResizable: true,
onRender: (item) => (
  <div>
    <Icon
      iconName={item.active ? 'CircleFill' : 'StatusCircleBlock'}
      style={{ 
        color: item.active ? '#107c10' : '#a80000',
        marginRight: '4px'
      }}
    />
    {item.active ? 'Active' : 'Inactive'}
  </div>
)
}
];

// Delete the selected teams
const deleteSelectedTeams = async () => {
try {
for (const team of selectedItems) {
  await TeamService.deleteTeam(team.id);
}
setDeleteDialogOpen(false);
setSelectedItems([]);
loadTeams();
} catch (err) {
console.error('Error deleting teams:', err);
setError('An error occurred while deleting teams. Please try again later.');
}
};

// Custom row renderer for the DetailsList
const onRenderRow = (props) => {
return (
<DetailsRow
  {...props}
  onClick={() => onItemClick(props.item)}
  styles={{ root: { cursor: 'pointer' } }}
/>
);
};

// Handle next page
const handleNextPage = () => {
if (pagination.page < pagination.totalPages - 1) {
setPagination({
  ...pagination,
  page: pagination.page + 1
});
}
};

// Handle previous page
const handlePrevPage = () => {
if (pagination.page > 0) {
setPagination({
  ...pagination,
  page: pagination.page - 1
});
}
};

// Handle search query change
const handleSearchChange = (_, newValue) => {
setSearchQuery(newValue);
setPagination({
...pagination,
page: 0
});
};

// Handle search submit
const handleSearch = () => {
loadTeams();
};

return (
<div className={styles.container}>
{/* Header and command bar */}
<div className={styles.headerContainer}>
  <CommandBar items={commandBarItems} />
</div>

{/* Filters */}
<div className={styles.filtersContainer}>
  <Dropdown
    label="Team Type"
    selectedKey={typeFilter}
    onChange={(_, option) => setTypeFilter(option.key)}
    options={teamTypeOptions}
    styles={{ root: { width: 150 } }}
  />
  <Dropdown
    label="Department"
    selectedKey={departmentFilter}
    onChange={(_, option) => setDepartmentFilter(option.key)}
    options={departments}
    styles={{ root: { width: 150 } }}
  />
  <div className={styles.searchContainer}>
    <SearchBox
      placeholder="Search teams..."
      value={searchQuery}
      onChange={handleSearchChange}
      onSearch={handleSearch}
      underlined={false}
      iconProps={{ iconName: 'Search' }}
    />
  </div>
</div>

{/* Error message if any */}
{error && (
  <MessageBar
    messageBarType={MessageBarType.error}
    isMultiline={false}
    dismissButtonAriaLabel="Close"
    styles={{ root: { margin: '0 16px 16px' } }}
  >
    {error}
  </MessageBar>
)}

{/* Teams list */}
<div className={styles.listContainer}>
  {loading ? (
    <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100%' }}>
      <Spinner size={SpinnerSize.large} label="Loading teams..." />
    </Stack>
  ) : teams.length === 0 ? (
    <div className={styles.noResults}>
      <Stack horizontalAlign="center">
        <Icon iconName="People" style={{ fontSize: 42, marginBottom: 16, color: '#8a8886' }} />
        <Text variant="large">No teams found</Text>
        <Text variant="medium" style={{ marginTop: 8, color: '#605e5c' }}>
          {searchQuery ? 'Try adjusting your search or filters' : 'Create a new team to get started'}
        </Text>
        <PrimaryButton
          text="Create New Team"
          iconProps={{ iconName: 'Add' }}
          onClick={() => navigate('/teams/new')}
          style={{ marginTop: 16 }}
        />
      </Stack>
    </div>
  ) : (
    <DetailsList
      items={teams}
      columns={columns}
      setKey="id"
      layoutMode={DetailsListLayoutMode.justified}
      selectionMode={SelectionMode.multiple}
      selection={{
        getSelection: () => selectedItems,
        setItems: onSelectionChanged
      }}
      onRenderRow={onRenderRow}
    />
  )}
</div>

{/* Pagination footer */}
{!loading && teams.length > 0 && 'totalElements' in pagination && (
  <div className={styles.listFooter}>
    <Text>
      Showing {pagination.page * pagination.size + 1}-
      {Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} of{' '}
      {pagination.totalElements} teams
    </Text>
    <Stack horizontal tokens={{ childrenGap: 8 }}>
      <DefaultButton
        text="Previous"
        iconProps={{ iconName: 'ChevronLeft' }}
        onClick={handlePrevPage}
        disabled={pagination.page === 0}
      />
      <DefaultButton
        text="Next"
        iconProps={{ iconName: 'ChevronRight' }}
        onClick={handleNextPage}
        disabled={pagination.page >= pagination.totalPages - 1}
      />
    </Stack>
  </div>
)}

{/* Delete confirmation dialog */}
<Dialog
  hidden={!deleteDialogOpen}
  onDismiss={() => setDeleteDialogOpen(false)}
  dialogContentProps={{
    type: DialogType.normal,
    title: 'Delete Team',
    subText: `Are you sure you want to delete ${selectedItems.length === 1 ? 'this team' : 'these teams'}? This action cannot be undone.`
  }}
  modalProps={{
    isBlocking: true,
    styles: { main: { maxWidth: 450 } }
  }}
>
  <DialogFooter>
    <PrimaryButton onClick={deleteSelectedTeams} text="Delete" />
    <DefaultButton onClick={() => setDeleteDialogOpen(false)} text="Cancel" />
  </DialogFooter>
</Dialog>
</div>
);
};

export default TeamsList;