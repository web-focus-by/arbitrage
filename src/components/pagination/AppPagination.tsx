import Pagination, { PaginationProps } from '@mui/material/Pagination';
import style from './appPagination.module.scss';
import classNames from 'classnames';
import { PaginationItem } from '@mui/material';
import { FC } from 'react';

const AppPagination: FC<PaginationProps> = (props) => {
  return (
    <Pagination
      {...props}
      shape="rounded"
      classes={{
        root: classNames(style.root),
        ul: classNames(style.ul, 'text2'),
      }}
      renderItem={(item) => {
        return (
          <PaginationItem
            {...item}
            classes={{
              text: classNames(style.text, 'table-headline'),
              selected: classNames(style.selected),
            }}
          />
        );
      }}
    />
  );
};
export default AppPagination;
