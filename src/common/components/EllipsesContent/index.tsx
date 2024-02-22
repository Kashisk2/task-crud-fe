import { Tooltip, Typography, TypographyProps } from "@mui/material";
import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";

type EllipsisContentProps = {
  text: string;
  maxTextWidth?: number;
} & TypographyProps;

export const EllipsisContent = (props: EllipsisContentProps) => {
  const [title, setTitle] = useState<string | number>("");
  const contentRef = useRef<any>();

  const tooltipHandler = useCallback(() => {
    // We will show the tooltip only when the text has exceeded its max length
    if (contentRef?.current?.scrollWidth <= contentRef?.current?.offsetWidth) {
      setTitle("");
    } else {
      setTitle(props.text);
    }
  }, [props.text]);
  useEffect(() => {
    setTimeout(() => {
      tooltipHandler();
    }, 500);
  }, [tooltipHandler]);
  return (
    <Tooltip arrow title={title} placement={"top"}>
      <Typography
        {...props}
        component="div"
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "max-content",
          ...props.sx,
        }}
        ref={contentRef}
      >
        {props.text}
      </Typography>
    </Tooltip>
  );
};
