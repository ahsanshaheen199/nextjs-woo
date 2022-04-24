import React from 'react';

const Footer = () => {
    return (
        <footer className={'py-10 bg-[#f0f0f0]'}>
            <div className={'container mx-auto px-4'}>
                <div className={'flex flex-wrap -mx-4'}>
                    <div className={'w-full px-4 text-center'}>
                        <p className={'text-sm text-[#61656b]'}>&copy;2022 Nextjs WooCommerce</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;