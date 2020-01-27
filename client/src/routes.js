import React, {Fragment} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import LinksPage from './pages/LinksPage'
import AuthPage from './pages/AuthPage'
import Navbar from './components/Navbar'

export const useRoutes = isAuthenticated => {
    console.log('isAuthenticated',isAuthenticated)
    if(isAuthenticated) {
        return (
            <Fragment>
                <Navbar />
                <Switch>
                    <Route path="/links" exact>
                        <LinksPage />
                    </Route>
                    <Route path="/create" exact>
                        <CreatePage />
                    </Route>
                    <Route path="/detail/:id">
                        <DetailPage />
                    </Route>
                    <Redirect to="/create" />
                </Switch>
            </Fragment>

        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}