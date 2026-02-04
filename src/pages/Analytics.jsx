import { useContext } from "react";
import { TrackerContext } from "../context/TrackerContext";
import { calculateWeeklyTotals } from "../utils/analytics";

const COLORS = {
  Sleep: "#6366F1",
  Exercise: "#22C55E",
  Study: "#F59E0B",
  Leisure: "#EC4899",
  Projects: "#0EA5E9",
};

export default function Analytics() {
  const { weekData } = useContext(TrackerContext);

  const weeklyTotals = calculateWeeklyTotals(weekData);
  const totalHours = Object.values(weeklyTotals).reduce((a, b) => a + b, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics</h2>

      <h3>Weekly Breakdown</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
        }}
      >
        {Object.keys(COLORS).map((cat) => {
          const hrs = weeklyTotals[cat] || 0;
          const percent = totalHours ? ((hrs / totalHours) * 100).toFixed(1) : 0;

          return (
            <div
              key={cat}
              style={{
                background: COLORS[cat],
                padding: "14px",
                borderRadius: "8px",
                color: "#fff",
              }}
            >
              <strong>{cat}</strong>
              <div>{hrs} hrs</div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>{percent}%</div>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <h3 style={{ marginTop: 24 }}>Insights</h3>
      <ul>
        {(weeklyTotals.Study || 0) < 10 && <li>📘 Try to increase study time</li>}
        {(weeklyTotals.Sleep || 0) < 42 && <li>😴 You may be under-sleeping</li>}
        {(weeklyTotals.Exercise || 0) >= 5 && <li>💪 Great exercise consistency!</li>}
      </ul>
    </div>
  );
}
