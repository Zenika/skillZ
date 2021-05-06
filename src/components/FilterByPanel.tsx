import CustomSelect from "./CustomSelect";

export type Filter = {
  name: string;
  values: string[];
  selected?: string;
  callback: (value: any) => void;
};

const FilterByPanel = ({ filters }: { filters: Filter[] }) => {
  return (
    <div className="flex flex-row flex-wrap-1">
      {filters.map(({ name, values, selected, callback }) => (
        <div style={{ width: `300px` }}>
          <CustomSelect
            choices={values}
            placeholder={`Filter by ${name}`}
            selectedChoice={selected}
            onChange={callback}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterByPanel;
