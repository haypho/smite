import React, { ChangeEvent } from "react";
import styles from "../styles/components/select.module.css";

export interface SelectProps {
  options: string[];
  defaultValue?: string;
  onChange?(option: string): void;
}

const Select: React.FC<SelectProps> = ({ options, onChange, defaultValue }) => (
  <select className={styles.select} onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange?.(event.target.value)} defaultValue={defaultValue}>
    {options.map((o: string) => <option className={styles.option} key={o} value={o}>{o}</option>)}
  </select>
);

export default Select;
