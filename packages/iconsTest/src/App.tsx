import React from 'react';
import {
Person24Regular,
People24Regular,
PeopleAdd24Regular,
PersonAdd24Regular
} from '@fluentui/react-icons';

const App = () => {
  return (
    <div style={{ fontSize: 24, padding: '20px' }}>
      <p>Example Fluent UI Icon:</p>
    <p>Person24Regular: <Person24Regular /> </p>
      <People24Regular />
      <PeopleAdd24Regular />
      <PersonAdd24Regular />
    </div>
  );
};

export default App;
