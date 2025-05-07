import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Action } from "../types/modals"; // Asegúrate de que la ruta sea correcta

type Props = {
  show: boolean;
  title: string;
  message?: string;
  actions: Action[];
  onClose: () => void;
};

const ActionModal: React.FC<Props> = ({
  show,
  title,
  message,
  actions,
  onClose,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fs-3">{title}</Modal.Title>
      </Modal.Header>

      {message && (
        <Modal.Body>
          <p className="fs-5">{message}</p>
        </Modal.Body>
      )}

      <Modal.Body>
        <Row className="g-3">
          {actions.map((action, index) => (
            <Col xs={12} md={6} key={index}>
              <Button
                key={index}
                variant={action.variant}
                onClick={action.onClick}
                className={`w-100 py-3 fs-5 d-flex align-items-center justify-content-center gap-2 ${
                  action.className || ""
                }`}
              >
                {action.icon}
                {action.label}
              </Button>
            </Col>
          ))}
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
          className="w-100 py-3 fs-5"
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActionModal;
