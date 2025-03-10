const PieCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "0.375rem 0.625rem",
          borderRadius: "0.625rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0em 0.5rem 1.5rem",
          color: "#000",
          zIndex: 2,
        }}
      >
        <p className="label">{`${payload[0].name} : ${payload[0].payload.labelVal}`}</p>
      </div>
    );
  }

  return null;
};

export default PieCustomTooltip;
