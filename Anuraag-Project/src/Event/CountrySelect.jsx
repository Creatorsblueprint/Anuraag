import { useState } from 'react';
import styles from './EventPage.module.css';

// Makes text easy to compare: lowercase, and without accents,
// so typing "cote" still finds "Côte d'Ivoire".
function simplify(text) {
  return text
    .normalize('NFD') // splits "ô" into "o" + a separate accent mark
    .replace(/[̀-ͯ]/g, '') // removes those accent marks
    .toLowerCase()
    .trim();
}

/**
 * CountrySelect — a searchable dropdown.
 * The visitor types a few letters, the list below the box narrows down to
 * the matching options, and they pick one with the mouse or the keyboard
 * (arrow keys + Enter).
 *
 * Props:
 *   id          - id of the text box (so the <label> can point at it)
 *   value       - the current text (kept by the parent form)
 *   onChange    - called with the new text whenever it changes
 *   options     - the full list of choices (array of strings)
 *   disabled    - true while the form is being sent
 *   hasError    - true to show the red outline
 *   describedBy - id of the error message, for screen readers
 */
export default function CountrySelect({ id, value, onChange, options, disabled, hasError, describedBy }) {
  const [isOpen, setIsOpen] = useState(false); // is the list showing?
  const [activeIndex, setActiveIndex] = useState(-1); // option highlighted with the arrow keys (-1 = none)

  const listId = `${id}-list`;

  // Which options to show. When the box is empty, or already holds a complete
  // choice, show the whole list; otherwise only the options containing the typed text.
  const typed = simplify(value);
  const isCompleteChoice = options.some((option) => simplify(option) === typed);
  const visibleOptions =
    !typed || isCompleteChoice ? options : options.filter((option) => simplify(option).includes(typed));

  // The visitor picked an option: store it and close the list.
  const choose = (option) => {
    onChange(option);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); // keep the text cursor where it is
      setIsOpen(true);
      setActiveIndex((i) => Math.min(i + 1, visibleOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && isOpen && visibleOptions[activeIndex]) {
      e.preventDefault(); // choose the option instead of submitting the form
      choose(visibleOptions[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  // Leaving the box closes the list. If the typed text matches an option but
  // with different capitals or accents ("india"), switch to the list's spelling ("India").
  const handleBlur = () => {
    setIsOpen(false);
    setActiveIndex(-1);
    const match = options.find((option) => simplify(option) === typed);
    if (match && match !== value) onChange(match);
  };

  return (
    <div className={styles.combo}>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={isOpen && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        placeholder="Type to search, e.g. India"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${styles.input} ${hasError ? styles.inputError : ''}`}
        autoComplete="off"
        disabled={disabled}
        maxLength={60}
        required
      />

      {isOpen && !disabled && (
        <ul id={listId} role="listbox" className={styles.optionList}>
          {visibleOptions.length === 0 && <li className={styles.noOption}>No match found</li>}
          {visibleOptions.map((option, index) => (
            <li
              key={option}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={option === value}
              className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''}`}
              // onMouseDown (not onClick) with preventDefault keeps the text box
              // focused, so the list does not close before the choice is stored.
              onMouseDown={(e) => {
                e.preventDefault();
                choose(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
