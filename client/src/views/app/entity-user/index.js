import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


const EntityList = React.lazy(() =>
    import('./entity-list')
);

const EntityDetail = React.lazy(() =>
    import('./entity-detail')
);

const EntityEdit = React.lazy(() =>
    import('./entity-edit')
);

const EntityCreate = React.lazy(() =>
    import('./entity-create')
);

const UserList = React.lazy(() =>
    import('./user-list')
);

const UserCreate = React.lazy(() =>
    import('./user-create')
);

const UserEdit = React.lazy(() =>
    import('./user-edit')
);

const UserDetail = React.lazy(() =>
    import('./user-detail')
);

const EntityUser = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/entity-list`} />
            <Route
                path={`${match.url}/entity-list`}
                render={props => <EntityList {...props} />}
            />
            <Route
                path={`${match.url}/entity-detail/:_id`}
                render={props => <EntityDetail {...props} />}
            />
            <Route
                path={`${match.url}/entity-edit/:_id`}
                render={props => <EntityEdit {...props} />}
            />
            <Route
                path={`${match.url}/entity-create`}
                render={props => <EntityCreate {...props} />}
            />
            <Route
                path={`${match.url}/user-list`}
                render={props => <UserList {...props} />}
            />
            <Route
                path={`${match.url}/user-create`}
                render={props => <UserCreate {...props} />}
            />
            <Route
                path={`${match.url}/user-edit/:_id`}
                render={props => <UserEdit {...props} />}
            />
            <Route
                path={`${match.url}/user-detail/:_id`}
                render={props => <UserDetail {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default EntityUser;
