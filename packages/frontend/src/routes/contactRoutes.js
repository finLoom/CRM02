// src/routes/contactRoutes.js
import ContactsPage from '../pages/ContactsPage';
import ContactFormPage from '../pages/ContactFormPage';
import ContactDetailPage from '../pages/ContactDetailPage';

const contactRoutes = [
  { path: "/contacts/new", element: <ContactFormPage /> },
  { path: "/contacts/:id/edit", element: <ContactFormPage /> },
  { path: "/contacts/:id", element: <ContactDetailPage /> },
  { path: "/contacts", element: <ContactsPage /> }
];

export default contactRoutes;