import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ImportFromCSV = React.lazy(() =>
    import(/* webpackChunkName: "start" */ './import-from-csv')
);

const CreateSite = React.lazy(() =>
    import('./create-site')
);

const SiteList = React.lazy(() =>
    import('./site-list')
);

const SiteDetail = React.lazy(() =>
    import('./site-detail')
);

const SiteAudit = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/import-from-csv`} />
            <Route
                path={`${match.url}/import-from-csv`}
                render={props => <ImportFromCSV {...props} />}
            />
            <Route
                path={`${match.url}/create-site`}
                render={props => <CreateSite {...props} />}
            />
            <Route
                path={`${match.url}/site-list`}
                render={props => <SiteList {...props} />}
            />
            <Route
                path={`${match.url}/site-detail/:_id`}
                render={props => <SiteDetail {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default SiteAudit;
