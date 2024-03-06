import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const SubcriteriaHelper = ({ deskripsi }) => {
  const isMobile = useMediaQuery({ maxWidth: 763 });
  const [placement, setPlacement] = useState("right");
  const [trigger, setTrigger] = useState("hover");

  useState(() => {
    if (isMobile) {
      setPlacement("top");
      setTrigger("click");
    } else {
      setPlacement("right");
      setTrigger(["hover", "focus"]);
    }
  });

  return (
    <>
      <OverlayTrigger
        trigger={trigger}
        placement={placement}
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
