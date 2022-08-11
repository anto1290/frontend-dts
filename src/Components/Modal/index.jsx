import { Modal } from "react-bootstrap"

export const ModalComponent = (props) => {
    const { children, title, show, handleClose } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>

        </Modal>
    )
}
