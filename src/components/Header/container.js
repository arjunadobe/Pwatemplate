import { connect } from '@magento/venia-drivers';

import { toggleSearch } from 'parentSrc/actions/app';
import { getCartDetails, toggleCart } from 'parentSrc/actions/cart';

import Header from './header';

const mapStateToProps = ({ app, cart }) => {
    const { searchOpen } = app;

    return {
        cart,
        searchOpen
    };
};

const mapDispatchToProps = { getCartDetails, toggleCart, toggleSearch };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
