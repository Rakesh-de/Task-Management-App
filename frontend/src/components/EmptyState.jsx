const EmptyState = ({ title, message }) => {
  return (
    <div className="empty-state">

      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
        alt="Empty"
      />

      <h2>{title}</h2>

      <p>{message}</p>

    </div>
  );
};

export default EmptyState;