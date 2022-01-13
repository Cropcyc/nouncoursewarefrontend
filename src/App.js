import React, {Component} from 'react'
import { Routes, Route, Link} from 'react-router-dom'
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
          <a href="/" className="navbar-brand">
            NOUN Library
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
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
          <Routes>
            <Route path="/" element={<CourseList/>} />
            <Route path="/add" element={<AddCourse/>} />
            <Route path="/courses/:id" element={<Course/>} />
          </Routes>
        </div>
        
      </div>
    )

  }
}

export default App;