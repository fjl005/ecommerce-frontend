import NavbarApp from '../components/navbar/NavbarApp';
import Products from "../components/products/Products";
import welcomeBanner from '../img/welcomeBanner.png';

const HomePage = () => {
    return (
        <>
            <NavbarApp />
            <img
                src={welcomeBanner}
                alt={'Fetsy page banner'}
                style={{
                    width: '100%',
                    height: 'auto'
                }}
            />
            <Products />
        </>
    )
}

export default HomePage;