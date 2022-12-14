import CustomSelect from "../atoms/CustomSelect/CustomSelect";

export type Filter = {
  name: string;
  values: string[];
  selected?: string;
  callback: (value: any) => void;
};

const FilterByPanel = ({ filters }: { filters: Filter[] }) => {
  return (
    <div className="flex flex-row flex-wrap-1">
      {filters.map(({ name, values, selected, callback }, index) => (
        <div style={{ width: `300px` }} key={index}>
          <CustomSelect
            labelFn={(x) => x}
            keyFn={(x) => x}
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
