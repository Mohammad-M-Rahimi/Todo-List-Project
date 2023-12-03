export default function TaskFilter({ showDone, showUndone, onToggleShowDone, onToggleShowUndone }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showDone}
          onChange={() => onToggleShowDone(!showDone)}
        />
        Show Done
      </label>
      <label>
        <input
          type="checkbox"
          checked={showUndone}
          onChange={() => onToggleShowUndone(!showUndone)}
        />
        Show Undone
      </label>
    </div>
  );
}
