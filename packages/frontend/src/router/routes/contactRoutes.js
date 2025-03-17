import React from 'react';

// Lazy-load contact module components
const ContactsPage = React.lazy(() => import('../../modules/contacts/pages/ContactList'));
const ContactDetailPage = React.lazy(() => import('../../modules/contacts/pages/ContactDetail'));
const ContactFormPage = React.lazy(() => import('../../modules/contacts/pages/ContactForm'));
//const ContactImportPage = React.lazy(() => import('../../modules/contacts/pages/ContactImport'));
//const ContactMergePage = React.lazy(() => import('../../modules/contacts/pages/ContactMerge'));

/**
 * Contact module route configuration
 */
const contactRoutes = [
  {
    path: '/contacts',
    element: <ContactsPage />,
    exact: true
  },
  {
    path: '/contacts/new',
    element: <ContactFormPage mode="create" />,
    exact: true
  },
//  {
//    path: '/contacts/import',
//    element: <ContactImportPage />,
//    exact: true
//  },
//  {
//    path: '/contacts/merge',
//    element: <ContactMergePage />,
//    exact: true
//  },
  {
    path: '/contacts/:id',
    element: <ContactDetailPage />,
    exact: true
  },
  {
    path: '/contacts/:id/edit',
    element: <ContactFormPage mode="edit" />,
    exact: true
  }
];

export default contactRoutes;