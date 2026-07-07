import "./DeleteModal.css";

const DeleteModal = ({
    open,
    title = "Delete Project",
    message = "Are you sure ?",
    onClose,
    onDelete,
}) => {
    if (!open) return null;

    return (
        <div className="delete-overlay">
            <div className="delete-modal">
                <div className="delete-icon">🗑️</div>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="delete-buttons">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="delete-btn" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;