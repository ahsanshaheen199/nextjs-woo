import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { Product } from '../../../types/Product';

type Props = {
    product: Product
}

const TabList = ({product}: Props) => {
  return (
    <div className='pt-20'>
      <Tab.Group>
        <Tab.List className="flex justify-center space-x-7">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected ? 'text-lg uppercase text-[#ee4e23] border-b-2 border-[#ee4e23] border-solid' : 'text-lg uppercase'
                }
              >
                  Description
              </button>
            )}
          </Tab>
          { product.attributes.length !== 0 && ( 
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? 'text-lg uppercase text-[#ee4e23] border-b-2 border-[#ee4e23] border-solid' : 'text-lg uppercase'
                  }
                >
                    Additional Information
                </button>
              )}
            </Tab>
          )}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="pt-10">
            <div className="text-base text-[#676767]" dangerouslySetInnerHTML={{ __html: product && product.description }} />
          </Tab.Panel>
          { 
            product.attributes.length !== 0 && ( 
              <Tab.Panel className="pt-10">
                {
                  product.attributes.map( attribute => {
                    return (
                      <div key={attribute.id} className="grid grid-cols-2 py-3 border-b last:border-0">
                        <div>
                          <span className='text-sm font-medium'>{attribute.name}</span>
                        </div>
                        <div className='space-x-2'>
                          {
                            attribute.options.map( (option,index) => {
                              return (
                                <span className='text-xs' key={index}>{option}</span>
                              );
                            } )
                          }
                        </div>
                      </div>
                    );
                  } )
                }
              </Tab.Panel> 
            ) 
          }
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabList;