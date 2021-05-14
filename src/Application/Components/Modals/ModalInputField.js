import "./Modals.css";

const ModalInputField = ({ value, onChange, name, type = "text" }) => {
  return (
    <div className="modal-input-field-container">
      <input
        className="modal-input-field"
        type={type}
        placeholder={name}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default ModalInputField;
