import { FC } from 'react';
import { TableCell, TableCellProps } from '@mui/material';
import classNames from 'classnames';
import style from './appTableCell.module.scss';

type IAppTableCellProps = TableCellProps;
const AppTableCell: FC<IAppTableCellProps> = (props) => {
  const { children, classes, ...otherProps } = props;
  return (
    <TableCell
      {...otherProps}
      classes={{
        ...classes,
        head: classNames(classes?.head, style.tableHead, 'table-headline'),
        body: classNames(classes?.body, style.tableBody, 'text2'),
      }}
    >
      {children}
    </TableCell>
  );
};

export default AppTableCell;
