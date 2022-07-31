import React from 'react';

const SectionTitle = ({ title }) => {
    return (
        <div className={'flex flex-wrap -mx-4'}>
            <div className={'w-full px-4 text-center'}>
                <h2 className={'text-3xl text-[#484c51] leading-[1.5] mb-10'}>{title}</h2>
            </div>
        </div>
    );
};

export default SectionTitle;