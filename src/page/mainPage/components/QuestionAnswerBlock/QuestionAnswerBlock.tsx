import * as React from 'react';
import style from './QuestionAnswerBlock.module.scss';
import classNames from "classnames";
import BlockTitle from "../BlockTitles/BlockTitle";
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: '1px solid #B7B7B7',
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: '2rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(135deg)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '12px 0px 0px',
  border: 'none',
}));

const QuestionAnswerBlock = () => {

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className={classNames(style.mainPageContainer, style.container, style.spacing_between_blocks)}>
    <BlockTitle value={"Вопрос-ответ"}/>
    <div className={style.questionAnswerAccordion}>
      <Accordion onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography className={classNames(style.questionAnswerAccordionHeadline, style.subtitle2)}>С какой суммы можно начать торговать и какая средняя прибыль?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classNames(style.questionAnswerAccordionText, style.text)}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography className={classNames(style.questionAnswerAccordionHeadline, style.subtitle2)}>Как часто появляются спреды, как долго они живут?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classNames(style.questionAnswerAccordionText, style.text)}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography className={classNames(style.questionAnswerAccordionHeadline, style.subtitle2)}>Как отбирать спреды, которые можно крутить?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classNames(style.questionAnswerAccordionText, style.text)}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography className={classNames(style.questionAnswerAccordionHeadline, style.subtitle2)}>Блокируют ли биржи аккаунт за частые переводы?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classNames(style.questionAnswerAccordionText, style.text)}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    </div>
  );

  // return (
  //   <div className={classNames(style.mainPageContainer, style.container, style.spacing_between_blocks)}>
  //
  //     <BlockTitle value={"Вопрос-ответ"}/>
  //     <div>
  //       <Accordion className={style.questionAnswerAccordion}>
  //         <AccordionSummary
  //           expandIcon={<AddIcon />}
  //           aria-controls="panel1a-content"
  //           id="panel1a-header"
  //         >
  //           <Typography>Accordion 1</Typography>
  //         </AccordionSummary>
  //         <AccordionDetails>
  //           <Typography>
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
  //             malesuada lacus ex, sit amet blandit leo lobortis eget.
  //           </Typography>
  //         </AccordionDetails>
  //       </Accordion>
  //       <Accordion className={style.questionAnswerAccordion}>
  //         <AccordionSummary
  //           expandIcon={<AddIcon />}
  //           aria-controls="panel2a-content"
  //           id="panel2a-header"
  //         >
  //           <Typography>Accordion 2</Typography>
  //         </AccordionSummary>
  //         <AccordionDetails>
  //           <Typography>
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
  //             malesuada lacus ex, sit amet blandit leo lobortis eget.
  //           </Typography>
  //         </AccordionDetails>
  //       </Accordion>
  //     </div>
  //   </div>
  // );
};

export default QuestionAnswerBlock;