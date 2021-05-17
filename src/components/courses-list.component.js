import React, { Component } from 'react'
import CourseDataService from '../services/course.service'
import { Link } from 'react-router-dom'

export default class CourseList extends Component {
    constructor(props){
        super(props)

        this.state = {
            courses: [],
            currentCourse: null,
            currentIndex: -1,
            searchQuery: ''
        }

        this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this)
        this.retrieveCourses = this.retrieveCourses.bind(this)
        this.refreshCourseList = this.refreshCourseList.bind(this)
        this.setActiveCourse = this.setActiveCourse.bind(this)
        this.removeAllCourses = this.removeAllCourses.bind(this)
        this.searchQuery = this.searchQuery.bind(this)
    }


    componentDidMount(){
        this.retrieveCourses()
    }

    onChangeSearchQuery(e){
        const searchQuery = e.target.value

        this.setState({
            searchQuery: searchQuery
        })
    }

    retrieveCourses() {
        CourseDataService.getAll()
            .then(response => {
                this.setState({
                    courses: response.data
                })
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    refreshCourseList(){
        this.retrieveCourses()
        this.setState({
            currentCourse: null,
            index: -1
        })
    }

    setActiveCourse(course, index){
        this.setState({
            currentCourse: course,
            currentIndex: index
        })
    }

    removeAllCourses(){
        const result = window.confirm("Delete ALL courses?")
        result &&
        CourseDataService.deleteAll()
            .then(response => {
                console.log(response.data)
                this.refreshCourseList()
            })
            .catch(e => {
                console.log(e)
            })
    }

    searchQuery() {
        CourseDataService.findByTitle(this.state.searchQuery)
            .then(response => {
                this.setState({
                    courses: response.data
                })
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    render(){
        const { searchQuery, courses, currentCourse, currentIndex } = this.state

        return (
            <div className='list row'>
            <div className='col-md-8'>
                <div className='input-group mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Look up with course title'
                        value={searchQuery}
                        onChange={this.onChangeSearchQuery}
                    />
                    <div className='input-group-append'>
                        <button
                            className='btn btn-outline-secondary'
                            type='button'
                            onClick={this.searchQuery}
                        >
                            Look up
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <h4>Course List</h4>

                <ul className='list-group'>
                    {
                        courses && 
                            courses.map((course, index) => (
                                <li
                                 className={
                                     'list-group-item ' +
                                     (index === currentIndex ? 'active' : '')
                                 }
                                 onClick={() => this.setActiveCourse(course, index)}
                                 key={index}
                                >
                                    {course.title}
                                </li>
                        ))}
                </ul>

                <button 
                    className='m-3 btn btn-sm btn-danger'
                    onClick={this.removeAllCourses}
                >
                    Delete All
                </button>
            </div>
            <div className='col-md-6'>
                {currentCourse ? (
                    <div>
                        <h4>Course</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{' '}
                            {currentCourse.title}
                        </div>
                        <div>
                            <label>
                                <strong>Course Details:</strong>
                            </label>{' '}
                            {currentCourse.courseDetail}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{' '}
                            {currentCourse.published ? 'Published' : 'Pending'}
                        </div>

                        <Link
                            to={'/courses/' + currentCourse.id}
                            className='badge badge-warning'
                        >
                            Edit
                        </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Select course</p>
                        </div>
                    )}
            </div>
        </div>
        )
    }
}