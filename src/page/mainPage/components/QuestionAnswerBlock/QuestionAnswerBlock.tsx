import style from './QuestionAnswerBlock.module.scss';
import classNames from "classnames";
import AppButton from "../../../../components/button/AppButton";
import BlockTitle from "../BlockTitles/BlockTitle";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


const QuestionAnswerBlock = () => {
  return (
    <div className={classNames(style.mainPageContainer, style.container, style.spacing_between_blocks)}>

      <BlockTitle value={"Вопрос-ответ"}/>
      <div>
        <Accordion className={style.questionAnswerAccordion}>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={style.questionAnswerAccordionIcon}
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={style.questionAnswerAccordion}>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default QuestionAnswerBlock;