import React from 'react';
import PropTypes from 'prop-types';
import { mergeClasses } from 'parentSrc/classify';
import logo from './logo.svg';

const Logo = props => {
    const classes = mergeClasses({}, props.classes);

    return (
        <img
            className={classes.logo}
            src={logo}
            height="60px"
            alt="Extended From Venia-UI"
            title="Extended From Venia-UI"
        />
    );
};

Logo.propTypes = {
    classes: PropTypes.shape({
        logo: PropTypes.string
    }),
    height: PropTypes.number
};

Logo.defaultProps = {
    height: 24
};

export default Logo;
