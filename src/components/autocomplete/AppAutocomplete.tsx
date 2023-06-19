import React, { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AppTextField from '../input/AppTextField.tsx';
import classNames from 'classnames';
import style from './appAutocomplete.module.scss';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type TAppAutocompleteOptions = { title: string; value: string };

interface IAppAutocomplete
  extends Omit<
    AutocompleteProps<TAppAutocompleteOptions, boolean | undefined, boolean | undefined, boolean | undefined>,
    'renderInput' | 'renderOption' | 'getOptionLabel'
  > {
  textFieldProps?: Omit<React.ComponentProps<typeof AppTextField>, 'onChange' | 'label'>;
}

const AppAutocomplete: FC<IAppAutocomplete> = (props) => {
  const { textFieldProps, ...otherProps } = props;
  return (
    <Autocomplete
      {...otherProps}
      options={props.options ?? []}
      limitTags={1}
      isOptionEqualToValue={(option, value) => {
        return option?.value === value?.value;
      }}
      disableCloseOnSelect
      classes={{ ...props.classes, root: classNames(props.classes?.root, style.wrapper) }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        return option.title;
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.title}
        </li>
      )}
      renderInput={(params) => {
        return (
          <AppTextField
            {...params}
            name={textFieldProps?.name ?? ''}
            value={textFieldProps?.value ?? ''}
            onBlur={textFieldProps?.onBlur}
            type={'text'}
            variant={'standard'}
            label={props['aria-label']}
            placeholder={props.placeholder}
            InputProps={{
              ...params.InputProps,
              inputRef: textFieldProps?.ref,
              classes: { input: classNames(style.input, 'text2'), root: classNames(style.textField) },
            }}
          />
        );
      }}
    />
  );
};
export default AppAutocomplete;
