// /src/shared/components/layout/topbar/SearchBar.tsx
import * as React from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Input,
  Text,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  useId,
} from '@fluentui/react-components';
import { Search20Regular, Dismiss20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  searchContainer: {
    position: 'relative',
    width: '100%',
  },
  searchInput: {
    width: '100%',
  },
  searchTrigger: {
    width: '100%',
  },
  kbdShortcut: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
    gap: '2px',
  },
  keyboardKey: {
    display: 'inline-block',
    padding: '2px 5px',
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    borderRadius: tokens.borderRadiusSmall,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeAccessible),
    ...shorthands.margin(0, '2px'),
  },
  searchResults: {
    width: '600px',
    maxWidth: '100vw',
    maxHeight: '500px',
    overflowY: 'auto',
    ...shorthands.padding(tokens.spacingVerticalM),
  },
  resultCategory: {
    ...shorthands.margin(tokens.spacingVerticalS, 0),
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  resultItem: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  resultTitle: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
  },
  resultPath: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  noResults: {
    textAlign: 'center',
    color: tokens.colorNeutralForeground2,
    ...shorthands.padding(tokens.spacingVerticalL, 0),
  },
  clearButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    cursor: 'pointer',
    color: tokens.colorNeutralForeground3,
    '&:hover': {
      color: tokens.colorNeutralForeground2,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
  },
});

// Custom keyboard key component to replace Kbd
const KeyboardKey: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const styles = useStyles();
  return <span className={styles.keyboardKey}>{children}</span>;
};

export const SearchBar: React.FC = () => {
  const styles = useStyles();
  const searchInputId = useId('global-search');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Mock search results - in a real app, this would come from a search service
  const searchResults = React.useMemo(() => {
    if (!searchTerm) return [];

    // Mock filtering based on search term
    return [
      {
        category: 'Tickets',
        items: [
          { id: '1', title: 'Server issues in production', path: 'Tickets/IT/Server-01' },
          { id: '2', title: 'Customer payment failed', path: 'Tickets/Billing/Payment-15' },
        ].filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.path.toLowerCase().includes(searchTerm.toLowerCase())
        )
      },
      {
        category: 'Customers',
        items: [
          { id: '3', title: 'Acme Corporation', path: 'Customers/Enterprise/Acme' },
          { id: '4', title: 'TechStart Inc', path: 'Customers/SMB/TechStart' },
        ].filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.path.toLowerCase().includes(searchTerm.toLowerCase())
        )
      },
    ].filter(category => category.items.length > 0);
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsOpen(event.target.value.length > 0);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Implement keyboard shortcuts (Ctrl+K or Cmd+K to focus)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    // Close on escape key
    if (event.key === 'Escape') {
      handleClearSearch();
    }
  };

  // Add global event listener for keyboard shortcuts
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const hasResults = searchResults.length > 0;

  return (
    <div className={styles.searchContainer}>
      <Popover open={isOpen}>
        <PopoverTrigger disableButtonEnhancement>
          <div className={styles.searchTrigger}>
            <Input
              id={searchInputId}
              ref={inputRef}
              className={styles.searchInput}
              contentBefore={<Search20Regular />}
              placeholder="Search everything (Ctrl+K)"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />

            {!isSearchFocused && !searchTerm && (
              <div className={styles.kbdShortcut}>
                <KeyboardKey>Ctrl</KeyboardKey>+<KeyboardKey>K</KeyboardKey>
              </div>
            )}

            {searchTerm && (
              <div className={styles.clearButton} onClick={handleClearSearch}>
                <Dismiss20Regular />
              </div>
            )}
          </div>
        </PopoverTrigger>

        <PopoverSurface className={styles.searchResults}>
          {hasResults ? (
            <>
              {searchResults.map((category) => (
                <div key={category.category}>
                  <Text className={styles.resultCategory}>{category.category}</Text>
                  {category.items.map((item) => (
                    <div key={item.id} className={styles.resultItem}>
                      <Text className={styles.resultTitle}>{item.title}</Text>
                      <Text className={styles.resultPath}>{item.path}</Text>
                    </div>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <Text className={styles.noResults}>
              No results found for "{searchTerm}"
            </Text>
          )}
        </PopoverSurface>
      </Popover>
    </div>
  );
};