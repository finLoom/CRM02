import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';

// Styling for the persona component
const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS
  },
  textBefore: {
    flexDirection: 'row-reverse'
  },
  avatarContainer: {
    display: 'flex'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  secondaryText: {
    color: tokens.colorNeutralForeground3
  }
});

/**
 * Function to get initials from a name
 * @param {string} name - The full name
 * @returns {string} - Initials (max 2 characters)
 */
const getInitials = (name) => {
  if (!name) return '';

  // Split the name and take the first letter of each part
  const parts = name.split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  // Take first letter of first and last parts
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * PersonaAvatar component - displays a user avatar with optional name and details
 */
const PersonaAvatar = ({
  name,
  title,
  imageUrl,
  size,
  textAlignment,
  showSecondaryText
}) => {
  const styles = useStyles();

  // Early return if no name
  if (!name) return null;

  const initials = getInitials(name);

  return (
    <div className={`${styles.container} ${textAlignment === 'before' ? styles.textBefore : ''}`}>
      <div className={styles.avatarContainer}>
        <Avatar
          name={name}
          image={imageUrl ? { src: imageUrl } : undefined}
          size={size}
          color="colorful"
        />
      </div>

      {(textAlignment === 'before' || textAlignment === 'after') && (
        <div className={styles.textContainer}>
          <Text size={size === 'tiny' ? 200 : 300} weight="semibold">{name}</Text>
          {showSecondaryText && title && (
            <Text size={size === 'tiny' ? 100 : 200} className={styles.secondaryText}>
              {title}
            </Text>
          )}
        </div>
      )}
    </div>
  );
};

PersonaAvatar.propTypes = {
  /** Person's name */
  name: PropTypes.string.isRequired,
  /** Person's title or role */
  title: PropTypes.string,
  /** URL to the person's avatar image */
  imageUrl: PropTypes.string,
  /** Size of the avatar */
  size: PropTypes.oneOf(['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large']),
  /** Alignment of the text relative to the avatar */
  textAlignment: PropTypes.oneOf(['none', 'before', 'after']),
  /** Whether to show the secondary text (title) */
  showSecondaryText: PropTypes.bool
};

PersonaAvatar.defaultProps = {
  size: 'medium',
  textAlignment: 'after',
  showSecondaryText: false
};

export default PersonaAvatar;