import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Navigation from './navigation'
import { SingleContent } from './contentTemplate.js'
import Dining from '../container/dining'
import Movie from '../container/movie'
import Expense from '../container/expense'
import ExpenseAnalysis from '../container/expenseAnalysis'
import Login from '../container/authentication/login'
import Register from '../container/authentication/register'
import AppAnalysis from '../container/admin/AppAnalysis'
import UserManagement from '../container/admin/UserManagement'
import storage from '../utils/Storage'
import UserProfile from '../container/userProfile'
import ActivityPage from '../container/activityPage'
import AllUserActivity from '../container/allUserActivity'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import FindUser from '../container/findUser'
import MutualFriends from '../container/mutualFriends'
import MyFavorite from '../container/myFavorite'
const { Content, Sider, Footer } = Layout
const MenuItemGroup = Menu.ItemGroup

export const BaseLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div>
          <Layout>
            <Navigation matchProps={matchProps} />
            <Layout>
              <Sider
                collapsible
                breakpoint='lg'
                collapsedWidth='0'
                width={170}
                style={{ background: '#fff' }}
              >
                <Menu
                  mode='inline'
                  defaultSelectedKeys={['1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  {matchProps.match.path.startsWith('/dining') &&
                    <MenuItemGroup title='Dining'>
                      <Menu.Item key='1'>
                        <Link to='/dining/find_restaurant'>
                          <Icon type='search' theme='outlined' />
                          Find Restaurants
                        </Link>
                      </Menu.Item>
                    </MenuItemGroup>}
                  {matchProps.match.path === '/movie' &&
                    <MenuItemGroup title='Movie'>
                      <Menu.Item key='3'>Find a movie</Menu.Item>
                    </MenuItemGroup>}
                  {matchProps.match.path.startsWith('/expense') &&
                    <MenuItemGroup title='Expense'>
                      <Menu.Item key='4'>
                        <Link to='/expense'>
                          <Icon type='dollar' />
                          All transactions
                        </Link>
                      </Menu.Item>
                      <Menu.Item key='5'>
                        <Link to='/expense/expense_analysis'>
                          <Icon type='line-chart' />
                          Expense Analysis
                        </Link>
                      </Menu.Item>
                    </MenuItemGroup>}
                  {matchProps.match.path.startsWith('/manage') &&
                    <MenuItemGroup title='Users'>
                      <Menu.Item key='manage-analysis'>
                        <Link to='/manage/analysis'>
                          <Icon type='line-chart' />
                          App Analysis
                        </Link>
                      </Menu.Item>
                      <Menu.Item key='manage-users'>
                        <Link to='/manage/users'>
                          <Icon type='user' />
                          User Management
                        </Link>
                      </Menu.Item>
                      <Menu.Item key='manage-all-user-activity'>
                        <Link to='/manage/all-user-activity'>
                          <Icon type='file-search' />
                          All Users Activities
                        </Link>
                      </Menu.Item>
                    </MenuItemGroup>}
                  {matchProps.match.path.startsWith('/find_user') &&
                    <MenuItemGroup title='Social'>
                      <Menu.Item key='6'>
                        <Link to='/find_user'>
                          Search User
                        </Link>
                      </Menu.Item>

                      <Menu.Item key='7'>
                        <Link to='/find_user/mutual_friends'>
                          Suggested Users
                        </Link>

                      </Menu.Item>

                    </MenuItemGroup>}
                  {matchProps.match.path.startsWith('/my_profile') &&
                    <MenuItemGroup title='User Profile'>

                      <Menu.Item key='8'>
                        <Link to='/my_profile'>
                          Account Info
                        </Link>
                      </Menu.Item>

                      <Menu.Item key='9'>
                        {' '}<Link to='/my_profile/favorite'>
                          My Favorite
                        </Link>
                      </Menu.Item>

                      <Menu.Item key='10'>
                        <Link to='/my_profile/activity'>
                          My Activities
                        </Link>
                      </Menu.Item>

                    </MenuItemGroup>}
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    marginTop: '30px',
                    minHeight: 880
                  }}
                >
                  <Component {...matchProps} />
                </Content>

                <Footer id='footer'>EMA from BigTeaRice</Footer>
              </Layout>

            </Layout>
          </Layout>
        </div>
      )}
    />
  )
}
const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <SingleContent size='s'>
        <h1
          style={{
            padding: '100px 0',
            color: '#bbb',
            fontWeight: '600'
          }}
        >
          The Page you are looking for does not exist!
        </h1>
      </SingleContent>
    </div>
  )
}

class PrivateRoute extends Component {
  render() {
    return (
      <div>
        <BaseLayout {...this.props} />
      </div>
    )
  }
}
export class ComponentRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path='/dining/find_restaurant' component={Dining} />
        <PrivateRoute
          exact
          path='/find_user/mutual_friends'
          component={MutualFriends}
        />

        <PrivateRoute
          exact
          path='/my_profile/favorite'
          component={MyFavorite}
        />
        <PrivateRoute exact path='/movie' component={Movie} />
        <PrivateRoute exact path='/find_user' component={FindUser} />
        <PrivateRoute exact path='/expense' component={Expense} />
        <PrivateRoute
          exact
          path='/expense/expense_analysis'
          component={ExpenseAnalysis}
        />
        <PrivateRoute exact path='/manage/analysis' component={AppAnalysis} />
        <PrivateRoute
          exact
          path='/manage/all-user-activity'
          component={AllUserActivity}
        />
        <PrivateRoute exact path='/manage/users' component={UserManagement} />
        <PrivateRoute exact path='/my_profile' component={UserProfile} />
        <PrivateRoute
          exact
          path='/my_profile/activity'
          component={ActivityPage}
        />
        <Redirect from='/' to='/dining/find_restaurant' />
        <Redirect from='/dinings' to='/dining/find_restaurant' />
        <Redirect from='/movies' to='/movie' />
        <Redirect from='/expenses' to='/expense' />

        <PrivateRoute component={NotFoundPage} />
      </Switch>
    )
  }
}

class AuthRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Redirect from='/' to='/login' />
      </Switch>
    )
  }
}

class Routing extends Component {
  render() {
    return (
      <div className='Routing'>
        <Router>
          <div>
            {storage.isLoggedIn() ? <ComponentRoutes /> : <AuthRoutes />}
          </div>
        </Router>
      </div>
    )
  }
}

export default Routing
