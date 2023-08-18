import React, { useState } from "react";
import "../styles/DashBoard/UserEditDialog.css";
import FocusTrap from "focus-trap-react";

const UserEditDialog = React.forwardRef((props, ref) => {
  const { user, dispatch } = props;
  const [userData, setUserData] = useState(user);

  const editableDataFields = ["name", "email", "role"];

  const handleFieldChange = (event) => {
    setUserData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSaveEdits = () => {
    dispatch({ type: "EDITED_USER_DATA_UPDATE", payload: userData });
  };

  const hanldeCancelDialog = () => {
    dispatch({ type: "USER_DATA_EDIT_DIALOG_CLOSE" });
  };

  const dialogItems = editableDataFields.map((fieldData, index) => (
    <div className="dialog-content-item" key={index}>
      <label htmlFor={fieldData}>{fieldData}</label>
      <input
        type="text"
        id={fieldData}
        name={fieldData}
        onChange={handleFieldChange}
        value={userData[fieldData]}
        ref={index === 0 ? ref : null}
      ></input>
    </div>
  ));

  return (
    <FocusTrap>
      <div className="dialog-box-container">
        <div className="dialog">
          <div className="dialog-header">
            <h2 className="dialog-header-heading">Edit "{user.name}" Data</h2>
            <button
              className="dialog-header-btn"
              onClick={hanldeCancelDialog}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="dialog-content">{dialogItems}</div>

          <div className="dialog-actions">
            <button
              className="dialog-actions-btn dialog-actions-btn-save"
              onClick={handleSaveEdits}
            >
              Save
            </button>
            <button
              className="dialog-actions-btn dialog-actions-btn-cancel"
              onClick={hanldeCancelDialog}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
});

export default UserEditDialog;
