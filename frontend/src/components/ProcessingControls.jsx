
export default function ProcessingControls({
  targetColor,
  setTargetColor,
  threshold,
  setThreshold
}) {
  return (
    <section>
      <label htmlFor="targetColor">
        Target Color:
      </label>

      <input
        id="targetColor"
        type="color"
        value={targetColor}
        onChange={(e) => setTargetColor(e.target.value)}
      />

      <label htmlFor="threshold">
        Threshold: {threshold}
      </label>

      <input
        id="threshold"
        type="range"
        min="0"
        max="442"
        step="1"
        value={threshold}
        onChange={(e) => setThreshold(Number(e.target.value))}
      />
    </section>
  );
}
