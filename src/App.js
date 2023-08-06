import React from 'react';
import './style.css';

const leftList = ['HTML', 'JavaScript', 'CSS', 'TypeScript'];

const rightList = ['React', 'Angular', 'Vue', 'Svelte'];

const convertToMap = (list) => {
  const map = new Map();
  list.forEach((item) => {
    map.set(item, false);
  });
  return map;
};

const CheckBoxItem = ({ label, checked, onChange }) => {
  const id = React.useId();
  return (
    <div className="transfer-list__section__items__item">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

const ItemList = ({ items, setItems }) => {
  return (
    <div className="transfer-list__section">
      <ul className="transfer-list__section__items">
        {Array.from(items.entries()).map(([label, isChecked]) => (
          <li key={label}>
            <CheckBoxItem
              label={label}
              checked={isChecked}
              onChange={() => {
                const newMap = new Map(items);
                newMap.set(label, !items.get(label));
                setItems(newMap);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const hasNoItemSelected = (items) => {
  const x = Array.from(items.values()).filter((val) => Boolean(val));
  return x.length === 0;
};

const transferAllItems = (src, setSrc, dest, setDest) => {
  setDest(new Map([...dest, ...src]));
  setSrc(new Map());
};

const transferSelectedItem = (src, setSrc, dest, setDest) => {
  const newSrc = new Map(src);
  const newDest = new Map(dest);
  Array.from(newSrc.entries()).forEach(([label, checked]) => {
    if (!checked) {
      return;
    }
    newDest.set(label, false);
    newSrc.delete(label);
  });

  setSrc(newSrc);
  setDest(newDest);
};

export default function App() {
  const [left, setLeft] = React.useState(convertToMap(leftList));
  const [right, setRight] = React.useState(convertToMap(rightList));

  return (
    <div className="transfer-list">
      <ItemList items={left} setItems={setLeft} />
      <div className="transfer-list__actions">
        <button
          aria-label="transfer left to right all"
          disabled={right.size === 0}
          onClick={() => {
            transferAllItems(right, setRight, left, setLeft);
          }}
        >
          <span aria-hidden={true}>&lt;&lt;</span>
        </button>
        <button
          aria-label="transfer right to left"
          disabled={hasNoItemSelected(right)}
          onClick={() => {
            transferSelectedItem(right, setRight, left, setLeft);
          }}
        >
          <span aria-hidden={true}>&lt;</span>
        </button>
        <button
          aria-label="transfer left to right"
          disabled={hasNoItemSelected(left)}
          onClick={() => {
            transferSelectedItem(left, setLeft, right, setRight);
          }}
        >
          <span aria-hidden={true}>&gt;</span>
        </button>
        <button
          aria-label="transfer right to left all"
          disabled={left.size === 0}
          onClick={() => {
            transferAllItems(left, setLeft, right, setRight);
          }}
        >
          <span aria-hidden={true}>&gt;&gt;</span>
        </button>
      </div>
      <ItemList items={right} setItems={setRight} />
    </div>
  );
}
