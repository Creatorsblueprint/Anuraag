// The book title "You Will Not Fly" is shown with the word "Not" crossed out.
// This helper does that for any piece of text, so every place on the site
// that shows the title looks the same.
//
// Use:  {strikeNot('You Will Not Fly')}
//
// It finds the first whole word "Not" (or "NOT") and wraps it in a <span>
// with the "strikeNot" class. The look of that class is in index.css.
// Text without the word "Not" is returned unchanged.
export function strikeNot(text) {
  // \b means "word edge", so "Noun" or "Nothing" are not matched. "i" = any letter case.
  const match = text.match(/\bnot\b/i);
  if (!match) return text;

  const before = text.slice(0, match.index);
  const word = match[0];
  const after = text.slice(match.index + word.length);

  return (
    <>
      {before}
      <span className="strikeNot">{word}</span>
      {after}
    </>
  );
}
