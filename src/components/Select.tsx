import type { Props as ReactSelectProps } from 'react-select';
import SelectTypeScript, { components } from 'react-select';
import { List } from 'react-virtualized';

interface ISelectProps extends ReactSelectProps {
  options: { value: string; label: string }[];
  styles: any;
}

const MenuList = (props: any) => {
  const rows = props.children;
  const rowRenderer = ({ key, index, style }: any) => (
    <div key={key} style={style} className="w-full truncate">
      {rows[index]}
    </div>
  );

  return (
    <List
      style={{ width: '100%' }}
      width={3000}
      height={rows.length * 40 > 240 ? 240 : rows.length * 40}
      rowHeight={40}
      rowCount={rows.length}
      rowRenderer={rowRenderer}
    />
  );
};

const NoOptionsMessage = (props: any) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span>Sem Resultados</span>
    </components.NoOptionsMessage>
  );
};

export const Select = (props: ISelectProps) => {
  return (
    <SelectTypeScript
      {...props}
      components={{ NoOptionsMessage, MenuList }}
      styles={{ ...props.styles, noOptionsMessage: (base) => ({ ...base }) }}
      isSearchable
    />
  );
};
