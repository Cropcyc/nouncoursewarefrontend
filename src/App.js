import React, {Component} from 'react'
import { Switch, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AddCourse from './components/add-course.component'
import Course from './components/course.component'
import CourseList from './components/courses-list.component'

class App extends Component {
  render(){
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-success">
          <a href="/courses" className="navbar-brand">
            NOUN Library
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/courses"} className="nav-link">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/courses"]} component={CourseList} />
            <Route exact path="/add" component={AddCourse} />
            <Route path="/courses/:id" component={Course} />
          </Switch>
        </div>
        
      </div>
    )

  }
}

export default App;