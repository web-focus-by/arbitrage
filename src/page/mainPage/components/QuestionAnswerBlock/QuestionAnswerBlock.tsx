import style from './QuestionAnswerBlock.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { useIntl } from 'react-intl';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} classes={{ root: style.accordionWrapper }} />
))(() => ({
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<AddIcon sx={{ fontSize: '2rem' }} />} {...props} />
))(() => ({
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(135deg)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '12px 0px 0px',
  border: 'none',
}));

const dataQuestionAnswer = [
  {
    id: '1',
    question: 'questionAnswer.question.amount.to.start.and.average.profit',
    answer: 'questionAnswer.answer.amount.to.start.and.average.profit',
  },
  {
    id: '2',
    question: 'questionAnswer.question.frequency.occurrence.spreads',
    answer: 'questionAnswer.answer.frequency.occurrence.spreads',
  },
  {
    id: '3',
    question: 'questionAnswer.question.request.spread',
    answer: 'questionAnswer.answer.request.spread',
  },
  {
    id: '4',
    question: 'questionAnswer.question.blocking.frequent.transfers',
    answer: 'questionAnswer.answer.blocking.frequent.transfers',
  },
];

const QuestionAnswerBlock = () => {
  const { formatMessage } = useIntl();
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
      <BlockTitle className={style.h2} value={'' + formatMessage({ id: 'questionAnswer.headline' })} />
      <div className={style.questionAnswerAccordion}>
        {dataQuestionAnswer.map((item) => (
          <Accordion key={item.id}>
            <AccordionSummary aria-controls={item.id} id={item.id}>
              <Typography className={classNames(style.questionAnswerAccordionHeadline, style.subtitle2)}>
                {formatMessage({ id: item.question })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classNames(style.questionAnswerAccordionText, style.text)}>
                {formatMessage({ id: item.answer })}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnswerBlock;
