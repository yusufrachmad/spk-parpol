import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Popover, OverlayTrigger } from "react-bootstrap";
const SubcriteriaHelper = ({ deskripsi }) => {
  return (
    <>
      <OverlayTrigger
        trigger="hover"
        placement="right"
        overlay={
          <Popover>
            <Popover.Body>{deskripsi}</Popover.Body>
          </Popover>
        }
      >
        <FontAwesomeIcon icon={faCircleInfo} />
      </OverlayTrigger>
    </>
  );
};

export default SubcriteriaHelper;
