import React, { Component } from 'react';
import CategoryList from '../../components/CategoryList';
import CmsBlock from '../../components/CmsBlock';

export default class CMS extends Component {
    render() {
        return (
            <div>
                <div>
                    <CmsBlock identifiers="privacy" />
                </div>
            </div>
        );
    }
}
