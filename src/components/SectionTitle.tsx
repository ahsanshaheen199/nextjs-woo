import classNames from 'classnames';
import React from 'react';

type Props = {
  title: string;
  description?: string;
  margin?: string;
}

const SectionTitle = ({ title, description, margin }: Props) => {
  return (
    <div  className={classNames('container mx-auto px-4', margin && margin)}>
      <div className="text-center">
        <h2 className={'text-4xl text-black font-light mb-3'}>{title}</h2>
        { description && <p className={'text-lg text-[#676767] font-light'}>{description}</p> }
      </div>
    </div>
  );
};

export default SectionTitle;