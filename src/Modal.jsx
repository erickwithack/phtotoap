import React from "react";

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div aria-hidden="false" role="dialog">
        <section class="modal">
          {this.props.children}

          <div className="footer">
            <button
              class="close"
              aria-label="Close the modal window"
              onClick={this.props.onClose}
            >
              Close
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default Modal;
