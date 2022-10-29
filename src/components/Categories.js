import React from 'react';
import Category from "./Category";

const Categories = ({ categories }) => {
    return (
        <>
            <div className={'flex flex-wrap -mx-4 pt-20'}>
                <div className={'w-full px-4 text-center'}>
                    <h2 className={'text-3xl text-[#484c51] leading-[1.5] mb-10'}>Categories</h2>
                </div>
            </div>
            <div className={'flex flex-wrap -mx-4 pb-10'}>
                {
                    categories.length > 0 ?

                        categories.map( category => {
                            return (
                                <div key={category.id} className={'w-4/12 px-4 mb-10'}>
                                    <Category category={category} />
                                </div>
                            )
                        } )

                        : <div className={'w-full text-center px-4'}><h2>No category Found</h2></div>
                }
            </div>
        </>
    );
};

export default Categories;