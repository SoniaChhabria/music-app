import '../styles/modal.css';

function ModalComponent(props) {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {props.children}
          <button type="button" className="btn btn-outline-secondary" style={{margin:"10px"}} onClick={props.handleSave}>
            Save
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={props.handleClose}>
            Close
          </button>
        </section>
      </div>
    );   
}

export default ModalComponent