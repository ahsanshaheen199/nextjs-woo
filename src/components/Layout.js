import Header from "./Header";
import Footer from "./shared/Footer";

const Layout = ( { children } ) => {
    return (
        <>
            <Header />
            <div className={'container mx-auto'}>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;