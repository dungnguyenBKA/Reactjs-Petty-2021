import { FC } from "react";
import { Props } from "./Props";


interface TabPanelProps extends Props<HTMLDivElement> {
    index: number;
    value: number;
}
  
  const TabPanel: FC<TabPanelProps> = (props) => {
    const { children, value, index } = props;
    return (
      <div 
      hidden={value !== index}
      {...props}
      >
        {value === index && children}
      </div>
    )
  }

export default TabPanel