import "./StatsCard.css";

const StatsCard = ({ title, value, color }) => {
  return (
    <div className="stats-card" style={{ borderLeft: `5px solid ${color}` }}>

        <h4>{title}</h4>
        <p>{value}</p>
    </div>
  );
};

export default StatsCard;