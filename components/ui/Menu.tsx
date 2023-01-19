import React, { useState } from 'react';

const Item = () => {
  return (
    <div className="cursor-pointer flex w-full justify-between ">
      <div>Icon</div>
      <div>Docs</div>
    </div>
  );
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prevState) => !prevState)}
        className="bg-slate-700 cursor-pointer w-14 h-14 flex items-center justify-center rounded-full"
      >
        ...
      </div>
      {isOpen && (
        <div className="absolute bg-slate-700 p-5 left-[-100%] rounded-xl">
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      )}
    </div>
  );
};

export default Menu;
