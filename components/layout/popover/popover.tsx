import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

type Props = {
    id: string;
    trigger: any;
    title?: string;
    body: string;
}

const PopOver:React.FC<Props> = ({id, trigger, title, body}) => {

  return (

        <OverlayTrigger trigger="click" key={id} placement="top" overlay={
            <Popover id={`popover-positioned-${id}`}>
              {title ? <Popover.Title>{title}</Popover.Title> : ""}
              <Popover.Content>{body}</Popover.Content>
            </Popover>
        }>
            {trigger}
        </OverlayTrigger>

  );
}

export default PopOver;