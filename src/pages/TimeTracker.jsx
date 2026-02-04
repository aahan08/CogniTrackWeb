import { useState } from "react";

const HOURS = Array.from({ length: 24 }, (_, i) => `${i}-${i + 1}`);

const CATEGORIES = [
  "Sleep",
  "Exercise",
  "Study",
  "Leisure",
  "Projects",
];

const DATES = ["01/02/26", "02/02/26", "03/02/26"];

export default function TimeTracker() {
  const [data, setData] = useState({});

  const handleChange = (date, hour, value) => {
    setData((prev) => ({
      ...prev,
      [date]: {
        ...(prev[date] || {}),
        [hour]: value,
      },
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Time Tracker</h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: "700px",
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>Hour</th>
              {DATES.map((date) => (
                <th key={date} style={cellStyle}>
                  {date}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour}>
                <td style={cellStyle}>{hour}</td>

                {DATES.map((date) => (
                  <td key={date} style={cellStyle}>
                    <select
                      style={{ width: "100%", fontSize: "12px" }}
                      value={data[date]?.[hour] || ""}
                      onChange={(e) =>
                        handleChange(date, hour, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />
      <button>Save</button>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "6px",
  textAlign: "center",
  fontSize: "13px",
};
