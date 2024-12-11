import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export default function AccordionUsage() {
  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            bgcolor: "#e4e4e4",
            fontSize: "1.2rem",
          }}>
          Learn Figma
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: "#e4e4e4",
            borderTop: "1px solid #ccc",
            my: 1,
            borderRadius: 1,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionDetails>
        <AccordionDetails
          sx={{
            bgcolor: "#e4e4e4",
            borderTop: "1px solid #ccc",
            my: 1,
            borderRadius: 1,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionDetails>
        <AccordionDetails
          sx={{
            bgcolor: "#e4e4e4",
            borderTop: "1px solid #ccc",
            my: 1,
            borderRadius: 1,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionDetails>
      </Accordion>
    </>
  );
}
