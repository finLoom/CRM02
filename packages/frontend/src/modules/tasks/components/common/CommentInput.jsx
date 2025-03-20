import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  makeStyles,
  Textarea,
  tokens
} from '@fluentui/react-components';
import { Send24Regular } from '@fluentui/react-icons';

// Styles for the comment input component
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    maxWidth: '600px',
    width: '100%',
    margin: `${tokens.spacingVerticalM} 0`
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

/**
 * CommentInput component - provides a textarea for entering comments
 */
const CommentInput = ({
  placeholder,
  onSubmit,
  buttonText,
  initialValue,
  rows,
  disabled
}) => {
  const styles = useStyles();
  const [comment, setComment] = useState(initialValue || '');

  const handleSubmit = () => {
    if (comment.trim() && onSubmit) {
      onSubmit(comment);
      setComment('');
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <Textarea
        placeholder={placeholder}
        value={comment}
        onChange={(e, data) => setComment(data.value)}
        onKeyDown={handleKeyDown}
        resize="vertical"
        rows={rows}
        disabled={disabled}
      />

      <div className={styles.actions}>
        <Button
          appearance="primary"
          icon={<Send24Regular />}
          onClick={handleSubmit}
          disabled={disabled || !comment.trim()}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

CommentInput.propTypes = {
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Submit callback function */
  onSubmit: PropTypes.func.isRequired,
  /** Text for the submit button */
  buttonText: PropTypes.string,
  /** Initial value for the textarea */
  initialValue: PropTypes.string,
  /** Number of visible text rows */
  rows: PropTypes.number,
  /** Whether the input is disabled */
  disabled: PropTypes.bool
};

CommentInput.defaultProps = {
  placeholder: 'Add a comment...',
  buttonText: 'Add Comment',
  rows: 3,
  disabled: false
};

export default CommentInput;